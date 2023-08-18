---
title: title is english
date: 2023-08-16
---

## モックとは

モックは、テスト中に依存するオブジェクトやサービスをシミュレートした偽のオブジェクトのこと

例えば、データベースへの接続をモック化して、テスト中に実際のデータベースアクセスを行わず、固定のダミーデータを返すようにすることができる。

データベース接続をモック化して、テスト中にデータベースへの接続を行わず、固定のダミーデータを返す方法の例

以下のパッケージでは、データベース接続を抽象化する Database インターフェースとその実装であるMySQLDB 構造体を持っているとする

```go
// db.go
package db

// Databaseはデータベース接続を表すインターフェースです
type Database interface {
    Get(id int) string
}

// MySQLDBはMySQLデータベース接続を表す構造体です
type MySQLDB struct{}

// Getはデータベースからデータを取得します
func (db MySQLDB) Get(id int) string {
    // 実際のデータベース接続とクエリを実行するコード
    // ここではダミーデータを返します
    return "data from MySQL database"
}
```

このGetメソッドをテストするために、 MockDB構造体を定義してデータベースのモックを用意し、テスト対象である Get() にモックを渡している

こうすることで Get() はモックを受けっとて実際のデータベースに接続せずにデータを受け取り、テストできる

```go
// db_test.go
package db

import (
    "testing"
)

// MockDBはデータベース接続のモックです
type MockDB struct{}

// Getはデータベースからデータを取得します（モック）
func (db MockDB) Get(id int) string {
    return "mocked data"
}

func TestGetData(t *testing.T) {
    // テスト対象の関数で使用するデータベースインスタンスをモックに置き換える
    db := MockDB{}
    data := Get(db, 1)

    // 期待される結果と比較する
    expected := "mocked data"
    if data != expected {
        t.Errorf("Expected %q, but got %q", expected, data)
    }
}
```

## スタブとは

テスト中に特定のメソッドを呼び出す際に事前に決められた戻り値を返すオブジェクトのこと

例えば、外部APIへのリクエストをスタブ化して、テストが特定のAPI応答に対してどのように反応するかをテストすることができる。

以下の例は、外部のAPIリクエストをスタブ化して、テスト中に外部APIとの実際の通信を避ける方法

このパッケージは、外部のAPIにリクエストを送信する**`APIClient`**構造体を持っている

```go
// external_api.go
package externalapi

import "net/http"

// APIクライアントを表す構造体
type APIClient struct {
    baseURL string
}

// GetItemは外部APIからアイテムを取得します
func (c *APIClient) GetItem(itemID int) (string, error) {
    // 実際のAPIリクエストを行うコード
    // ここではダミーデータを返します
    return "item data", nil
}
```

テストでは、外部APIへのリクエストをスタブ化して、実際の通信を避けることができ、 **`APIClientStub`**という外部APIクライアントのスタブを定義し、テスト対象の関数である**`GetItem`**にスタブを渡しています。スタブは実際の外部APIと通信する代わりに、テスト用の固定のダミーデータを返す

これにより、テスト中に外部APIへのリクエストを避け、スタブデータを使用してテストすることができ、スタブを使うことで、外部リソースや依存関係を持つコードをより簡単にテストできるようになる

```go
// external_api_test.go
package externalapi

import (
    "testing"
)

// APIClientStubは外部APIクライアントのスタブです
type APIClientStub struct{}

// GetItemは外部APIからアイテムを取得します（スタブ）
func (c *APIClientStub) GetItem(itemID int) (string, error) {
    // テスト用に固定のダミーデータを返す
    return "mocked item data", nil
}

func TestGetItem(t *testing.T) {
    // テスト対象の関数で使用するAPIクライアントをスタブに置き換える
    client := APIClientStub{}
    itemData, err := client.GetItem(1)

    if err != nil {
        t.Errorf("Unexpected error: %v", err)
    }

    // 期待される結果と比較する
    expected := "mocked item data"
    if itemData != expected {
        t.Errorf("Expected %q, but got %q", expected, itemData)
    }
}
```

<aside>
💡 モックはテスト中の呼び出しを監視し、期待される呼び出しに対して事前に設定した振る舞いを返します。一方、スタブは特定の呼び出しに対して固定の戻り値を提供します。

これらのテストダブルを適切に使うことで、依存関係の切り離しやテストのコントロールをより容易にすることができます。テストダブルは、特に外部リソースやデータベースなどの依存関係があるコードのユニットテストや結合テストにおいて非常に有用です。

</aside>
