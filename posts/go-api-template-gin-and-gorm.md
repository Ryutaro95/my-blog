---
title: GinとGORMを使ったGoのAPI開発用の設定をテンプレート化してみる
date: 2024-05-05
---



自己学習や業務での API を用意する際に、1 から Dockerfile や docker-compoes.yml 用意して、Gin の設定だったり色々毎回面倒だなと思っていたので、この機会にテンプレート化して見ようと思う

ディレクトリ構造は以下のようになっている

```bash
.
├── cmd
│  ├── app-batch
│  └── app-service
│     └── main.go
├── docker-compose.yml
├── Dockerfile
├── go.mod
├── go.sum
├── internal
│  ├── batch
│  ├── cli
│  ├── domain
│  │  ├── model
│  │  └── repository
│  ├── env
│  │  └── env.go
│  ├── errors
│  ├── handler
│  │  └── health_check.go
│  ├── infra
│  ├── middleware
│  ├── route
│  │  └── route.go
│  ├── server
│  │  └── server.go
│  └── usecase
└── README.md
```

基本的な実装は `internal` ディレクトリ配下に入れていく想定

実際の構造や実装は [gin-api-template - Ryutaro95 | Github](https://github.com/Ryutaro95/gin-api-template) に公開してます

## Dockerfile と docker-compose.yml

開発環境は Dockerfile と docker-compose.yml を用意する

```Dockerfile
# Dockerfile
FROM golang:1.22

ENV TZ="Asia/Tokyo"

WORKDIR /go/src/app

COPY go.mod go.sum ./
RUN go mod download

RUN go get -u github.com/cosmtrek/air@latest && \
  go build -o /go/bin/air github.com/cosmtrek/air

RUN useradd -m app
RUN chown -R app:app /go/pkg

USER app
```

Dockerfile で useradd -m app としているのは　、コンテナ内でアプリケーションを実行するためのユーザーを作成する  
セキュリティ上、ルートユーザーでアプリケーションを実行せず、特定のユーザーを作成して実行したいため

ホットリロードしたいので、Air を導入している

```yaml
# docker-compose.yml
version: '3'
services:
  go:
    build:
      context: ./
      dockerfile: Dockerfile
    container_name: app
    tty: true
    ports:
      - 80:8080
    volumes:
      - .:/go/src/app
    environment:
      APP_ENV: local
      APP_DATABASE_HOST: mysql
      APP_DATABASE_USERNAME: root
      APP_DATABASE_PASSWORD: mysql
      APP_DATABASE: app_db
      APP_DATABASE_HOST_RO: mysql
      APP_DATABASE_USERNAME_RO: root
      APP_DATABASE_PASSWORD_RO: mysql

      TZ: Asia/Tokyo
  mysql:
    image: mysql:8.0
    container_name: mysql
    environment:
      MYSQL_ROOT_PASSWORD: mysql
      MYSQL_DATABASE: app_db
      TZ: Asia/Tokyo
    ports:
      - '3306:3306'
    healthcheck:
      test: mysqladmin ping -h mysql -uroot -pmysql
      interval: 10s
      timeout: 5s
      retries: 5
```

go と mysql のコンテナを立ち上げる。  
DB の接続などアプリケーション内で利用するために環境変数適当な値で設定しておく。  
また、MySQL コンテナが正常に起動しているかを確認するために、ヘルスチェックを行う。  
具体的には MySQL サーバーが利用可能化を確認するためのテストコマンドと、ヘルスチェックの間隔、タイムアウト、リトライ回数を設定する

## API サーバーのエントリーポイント

`./cmd/app-service/main.go` で API サーバーを立ち上げるための処理がある。このエントリーポイントでは、環境変数の構造体を持つ `./internal/env/env.go` から値を取得して、サーバーを起動するために `./internal/server/server.go` に渡しているだけ

API サーバーを起動したい場合は、このファイルを `go run cmd/app-server/main.go` とする

```go
package main

import (
	"gin-api-template/internal/env"
	"gin-api-template/internal/server"
	"log"
)

func main() {
	env, err := env.NewValue()
	if err != nil {
		log.Fatal(err)
	}

	server.Run(env)
}
```

サーバーの設定と起動
`./internal/server/server.go`

```go
package server

import (
	"context"
	"fmt"
	"gin-api-template/internal/env"
	"gin-api-template/internal/route"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

func Run(env *env.Values) {
  // ログの設定
	logger, err := newLogger(env)
	if err != nil {
		log.Fatal(err)
	}
	defer func() { _ = logger.Sync() }()

	logger.Info("Server start", zap.Any("env", env))

    // MySQLのコネクション
	db := dbConnect(env, logger)
    // Ginでエンドポイントを作成して、リクエストをルーティングするための実装
	router := route.SetupRouter(env, db, logger)

    // リクエストを待ち受けるためのポートとルーティングを設定
	srv := &http.Server{
		Addr:    ":" + env.Port,
		Handler: router,
	}

    // 非同期でリクエストを待ち受ける
	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Fatal("Failure start server", zap.Error(err))
		}
	}()

    // アプリケーションが終了するシグナルを待ち受ける
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

    // 終了のシグナルを受け取ったらシャットダウンさせる
	ctx, cancel := context.WithTimeout(context.Background(), env.ShutdownTimeout)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		logger.Fatal("Server shutdown:", zap.Error(err))
	}
	logger.Info("Success server shutdown")

	<-ctx.Done()
	logger.Info(fmt.Sprintf("Timeout of %.0f seconds", env.ShutdownTimeout.Seconds()))

	logger.Info("Server exiting")
}

func newLogger(env *env.Values) (*zap.Logger, error) {
	logLevel := zap.InfoLevel
	if env.Debug {
		logLevel = zap.DebugLevel
	}

	encoderConfig := zap.NewProductionEncoderConfig()
	encoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder // これを入れないとタイムスタンプになる

	return zap.Config{
		Level:            zap.NewAtomicLevelAt(logLevel),
		Development:      env.Debug,
		Encoding:         "json",
		EncoderConfig:    encoderConfig,
		OutputPaths:      []string{"stdout"},
		ErrorOutputPaths: []string{"stderr"},
	}.Build()
}

func dbConnect(env *env.Values, logger *zap.Logger) *gorm.DB {
	username := env.DatabaseUsername
	password := env.DatabasePassword
	host := env.DatabaseHost
	database := env.Database
	port := env.DatabasePort

	dsn := username + ":" + password + "@tcp(" + host + ":" + port + ")" + "/" + database +
		"?charset=utf8mb4&parseTime=True&loc=Asia%2FTokyo"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
	})
	if err != nil {
		logger.Fatal("Failure DB Connection:", zap.Error(err))
	}
	return db
}
```

`server.go` では、ログと DB のコネクションとルーティングを設定して、リクエストを待ち受けるようにしている

これで、あとは処理を実装していくだけになるはずです。