---
title: 【goquery】 NewDocument() が非推奨となり、かわりのNewDocumentFromReader()の使い方を調べた
date: 2023-08-18
---


`goquery.NewDocument("url")` が非推奨となったみたいだったので、調べてみました。

```go
goquery.NewDocument is deprecated: Use the net/http standard library package to make the request and validate the response before calling goquery.NewDocumentFromReader with the response's body.deprecated(default)
func goquery.NewDocument(url string) (*goquery.Document, error)
NewDocument is a Document constructor that takes a string URL as argument. It loads the specified document, parses it, and stores the root Document node, ready to be manipulated.

Deprecated: Use the net/http standard library package to make the request and validate the response before calling goquery.NewDocumentFromReader with the response's body.
```

これまでは、以下のようにすることで対象のURLからGetでドキュメントを取得してくれましたが、これが非推奨となったため、上のあるように net/http  でリクエストを行い  `goquery.NewDocumentFromReader(body)` とする必要があるようです。

```go
func findBooks(url string) ([]Book, error) {
	doc, err := goquery.NewDocument(url)
	if err != nil {
		return nil, err
	}

  //...
}
```

`goquery.NewDocumentFromReader()` に変換

```go
func findBooks(url string) ([]Book, error) {
	res, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	
	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		return nil, err
	}
}
```

上記のようにリファクタリングすることで、非推奨のアラートは消えました。

参考

[https://pkg.go.dev/github.com/PuerkitoBio/goquery#NewDocument](https://pkg.go.dev/github.com/PuerkitoBio/goquery#NewDocument)<br>
[https://github.com/PuerkitoBio/goquery#examples](https://github.com/PuerkitoBio/goquery#examples)