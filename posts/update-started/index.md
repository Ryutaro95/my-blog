---
title: なんでやねん
date: 2023-08-16
---

Goの戻り値には名前をつけることができ、その場合は関数の先頭で定義された変数として扱われる。

これらの名前は、戻り値の意味を文章化するために使用される。そして、引数のない return 文 (ネイキッドリターン)を使うことで名前付きの戻り値を返すことができる。

```go
// 戻り値にx, yという名前を付けている
func split(sum int) (x, y int) {
	x = sum * 4 / 9
  y = sum - x
	// ネイキッドリターンすることで x, yが返される
	return
}

func main() {
	fmt.Println(split(17))
}
```

参考

https://go.dev/tour/basics/7
