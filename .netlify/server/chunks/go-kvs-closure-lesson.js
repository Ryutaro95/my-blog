import { c as create_ssr_component } from "./index2.js";
const metadata = {
  "title": "【Go】クロージャで何が便利なのか理解するためにRedisのようなKVS機能を作る",
  "date": "2021-05-27T00:00:00.000Z",
  "headings": [
    {
      "depth": 2,
      "value": "Redis",
      "id": "redis"
    },
    {
      "depth": 2,
      "value": "クロージャでキーバリューストアを実装する",
      "id": ""
    },
    {
      "depth": 3,
      "value": "キーと値を格納する処理を実装する",
      "id": ""
    },
    {
      "depth": 3,
      "value": "格納した値を取得する",
      "id": ""
    },
    {
      "depth": 2,
      "value": "どの様な変数がクロージャに属するのか？",
      "id": ""
    },
    { "depth": 2, "value": "まとめ", "id": "" }
  ]
};
const Go_kvs_closure_lesson = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p>Goの学習をはじめてクロージャという概念の理解に苦しんでました。「クロージャってどんな場面で使うんだろう？何が嬉しくてクロージャを使っているんだろう？」</p>
<p>何に使うか理解出来なものを、理解できないので調べていたらクロージャを使うことでRedisのようなKVSをGoのクロージャで作ることができるようなので、クロージャの理解と合わせてRedisのようなKVSを作ってみます</p>
<h2 id="redis"><a href="#redis">Redis</a></h2>
<p>Redisとは、key - valueをペアとした値をメモリ上で永続化することができるツールです。
任意のkeyとvalueをセットすることで、あるvalueが必要なときにセットしたkeyを指定することで呼び出すことが出来ます。</p>
<pre class="language-bash"><!-- HTML_TAG_START -->${`<code class="language-bash"><span class="token comment"># key と valueをセット</span>
<span class="token operator">></span> <span class="token builtin class-name">set</span> mykey <span class="token string">"my value"</span>
OK

<span class="token comment"># keyに紐づくvalueを呼び出す</span>
<span class="token operator">></span> get mykey
<span class="token string">"my value"</span></code>`}<!-- HTML_TAG_END --></pre>
<p>この様な仕組みをGoのクロージャを用いることで実装することが出来ます。</p>
<h2 id="クロージャでキーバリューストアを実装する"><a href="#クロージャでキーバリューストアを実装する">クロージャでキーバリューストアを実装する</a></h2>
<p>まずは、任意のkeyとvalueを登録する機能をクロージャで実装してみます。
期待する動作を第1引数で渡し、第2引数と第3引数には key, valueを渡す実装を考えてみます
以下のように実行すれば、対応するkey, valueが保存される想定です。</p>
<pre class="language-go"><!-- HTML_TAG_START -->${`<code class="language-go">kvs <span class="token operator">:=</span> <span class="token function">closureKvs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// "命令", "キー", "値"</span>
<span class="token function">kvs</span><span class="token punctuation">(</span><span class="token string">"ADD"</span><span class="token punctuation">,</span> <span class="token string">"mykey"</span><span class="token punctuation">,</span> <span class="token string">"my value"</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p><code>closureKvs()</code> という関数は、戻り値として関数を返します。この関数は、命令・キー・値を引数として受け取り、どんな型でも返せるように <code>interface{}</code> 型を戻り値として返す関数です。</p>
<pre class="language-go"><!-- HTML_TAG_START -->${`<code class="language-go"><span class="token keyword">func</span> <span class="token function">closureKvs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token builtin">string</span><span class="token punctuation">,</span> key <span class="token builtin">string</span><span class="token punctuation">,</span> val <span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span> <span class="token punctuation">&#123;</span>

		store <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>

		<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token builtin">string</span><span class="token punctuation">,</span> key <span class="token builtin">string</span><span class="token punctuation">,</span> val <span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span> <span class="token punctuation">&#123;</span>
		<span class="token comment">// ...</span>
		<span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>第３引数の <code>val</code> では、string型でもint型でも受け取れるように <code>interface{}</code> としています。
そして、 <code>closureKvs()</code> 内に変数storeを作成します。変数storeに指定したキーと値を格納できるように、キーをstring型、値にinterface型を指定しています。</p>
<br>
<p>一見、変数storeはローカル変数に見えますが、内部的にはクロージャに属する変数として機能しています。クロージャに属する変数として機能するとは、変数storeが何かしらの形で参照され続ける限り、格納されている値が破棄されることがありません。</p>
<p>通常、関数内のローカル変数は、関数の実行が完了した時点で破棄されるためクロージャによって捕捉された場合の変数と挙動が異なります。</p>
<br>
<p>この挙動を理解できずに、クロージャの理解を苦しめていました。では、どの様な変数がクロージャに属する変数としてみなされるのか？という疑問が残りますが、後ほど説明したいと思います。</p>
<br>
<h3 id="キーと値を格納する処理を実装する"><a href="#キーと値を格納する処理を実装する">キーと値を格納する処理を実装する</a></h3>
<p>以下の処理を実行することで、キーと値を保持し続ける <code>closureKvs()</code> を実装していきます。</p>
<p><code>OK</code> と返ってこれば、保存は成功しているとみなします。</p>
<pre class="language-go"><!-- HTML_TAG_START -->${`<code class="language-go"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		kvs <span class="token operator">:=</span> <span class="token function">closureKvs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">// "命令", "キー", "値"</span>
		result <span class="token operator">:=</span> <span class="token function">kvs</span><span class="token punctuation">(</span><span class="token string">"ADD"</span><span class="token punctuation">,</span> <span class="token string">"mykey"</span><span class="token punctuation">,</span> <span class="token string">"my value"</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token comment">// => OK</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>switch文を使って、命令として受け取った文字列を判定して処理を分けていきます。</p>
<p>今回はキーと値を格納する処理なので <code>&quot;ADD&quot;</code> を受け取った場合は、 クロージャに属する変数storeに <code>store[key] = val</code> として値を代入しています。そして成功したことを知らせる文字列 <code>&quot;OK&quot;</code> を返しています。</p>
<pre class="language-go"><!-- HTML_TAG_START -->${`<code class="language-go"><span class="token keyword">func</span> <span class="token function">closureKvs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token builtin">string</span><span class="token punctuation">,</span> key <span class="token builtin">string</span><span class="token punctuation">,</span> val <span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span> <span class="token punctuation">&#123;</span>
	store <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>

	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token builtin">string</span><span class="token punctuation">,</span> key <span class="token builtin">string</span><span class="token punctuation">,</span> val <span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">switch</span> cmd <span class="token punctuation">&#123;</span>
		<span class="token keyword">case</span> <span class="token string">"ADD"</span><span class="token punctuation">:</span>
			store<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> val
			<span class="token keyword">return</span> <span class="token string">"OK"</span>
		<span class="token punctuation">&#125;</span>

		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>以下で処理確認することができるので任意のキーと値を指定して実行してみてください。</p>
<p>OKと標準出力されれば成功です。</p>
<p><a href="https://play.golang.org/p/g0fzf1gagBZ" rel="nofollow">https://play.golang.org/p/g0fzf1gagBZ</a></p>
<br>
<h3 id="格納した値を取得する"><a href="#格納した値を取得する">格納した値を取得する</a></h3>
<p>キーと値を保持する機能が作れたので、次はキーに紐づく値を取得できるようすることで、よりRedisらしくなっていきす。
値を取得したいので次は <code>&quot;GET&quot;</code> と命令して、取得したい キーを指定できるように実装していきます。</p>
<p>呼び出し側の処理はこんな感じです</p>
<pre class="language-go"><!-- HTML_TAG_START -->${`<code class="language-go"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		kvs <span class="token operator">:=</span> <span class="token function">closureKvs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		
		<span class="token comment">// キーと値を格納する</span>
		result <span class="token operator">:=</span> <span class="token function">kvs</span><span class="token punctuation">(</span><span class="token string">"ADD"</span><span class="token punctuation">,</span> <span class="token string">"mykey"</span><span class="token punctuation">,</span> <span class="token string">"my value"</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token comment">// => OK</span>

		<span class="token comment">// 取得したいキーを取得してGETと命令する</span>
		value <span class="token operator">:=</span> <span class="token function">kvs</span><span class="token punctuation">(</span><span class="token string">"GET"</span><span class="token punctuation">,</span> <span class="token string">"mykey"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token comment">// => my value</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>では、GETを渡したときの処理を追加していきます。</p>
<p><code>&quot;GET&quot;</code> という命令を受け取ったとき、変数storeからキーを取得してその値を返す処理を追加することで、対応するキーに対応する値を取得できるようになります。</p>
<pre class="language-go"><!-- HTML_TAG_START -->${`<code class="language-go"><span class="token keyword">func</span> <span class="token function">closureKvs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token builtin">string</span><span class="token punctuation">,</span> key <span class="token builtin">string</span><span class="token punctuation">,</span> val <span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span> <span class="token punctuation">&#123;</span>
	store <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>

	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token builtin">string</span><span class="token punctuation">,</span> key <span class="token builtin">string</span><span class="token punctuation">,</span> val <span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">switch</span> cmd <span class="token punctuation">&#123;</span>
		<span class="token keyword">case</span> <span class="token string">"ADD"</span><span class="token punctuation">:</span>
			store<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> val
			<span class="token keyword">return</span> <span class="token string">"OK"</span>
		<span class="token comment">// ここから</span>
		<span class="token keyword">case</span> <span class="token string">"GET"</span><span class="token punctuation">:</span>
			getVal <span class="token operator">:=</span> store<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
			<span class="token keyword">return</span> getVal
		<span class="token comment">// ここまでを追加</span>
		<span class="token punctuation">&#125;</span>

		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>ここで処理を確認できます。</p>
<p><a href="https://play.golang.org/p/ks4pIVqHPr8" rel="nofollow">https://play.golang.org/p/ks4pIVqHPr8</a></p>
<br>
<h2 id="どの様な変数がクロージャに属するのか"><a href="#どの様な変数がクロージャに属するのか">どの様な変数がクロージャに属するのか？</a></h2>
<p>先程、変数storeはクロージャに属する変数として捕捉され、通常のローカル関数とは挙動が異なると説明しましたが、ではどの様な状況で変数はクロージャに属するのかを見ていきます。</p>
<pre class="language-go"><!-- HTML_TAG_START -->${`<code class="language-go"><span class="token keyword">func</span> <span class="token function">closureKvs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token builtin">string</span><span class="token punctuation">,</span> key <span class="token builtin">string</span><span class="token punctuation">,</span> val <span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span> <span class="token punctuation">&#123;</span>

		<span class="token comment">// クロージャに属する変数</span>
		store <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>

		<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token builtin">string</span><span class="token punctuation">,</span> key <span class="token builtin">string</span><span class="token punctuation">,</span> val <span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span> <span class="token punctuation">&#123;</span>
		<span class="token comment">// ...</span>
		<span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>複数の変数を関数内に定義して、どの変数がクロージャに属し、どの変数が通常のローカル変数としてみなされるのか見ていきます。</p>
<pre class="language-go"><!-- HTML_TAG_START -->${`<code class="language-go"><span class="token keyword">func</span> <span class="token function">checkClosureVariable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">&#123;</span>
	a <span class="token operator">:=</span> <span class="token number">1</span>
	b <span class="token operator">:=</span> <span class="token number">5</span>
	c <span class="token operator">:=</span> <span class="token number">10</span>

	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">&#123;</span>
		c <span class="token operator">*=</span> <span class="token number">10</span>
		<span class="token keyword">return</span> c
	<span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>上記のクロージャを定義した場合、クロージャに属される変数と補足されるのは変数cのみです。</p>
<p>その他の変数a, cは <code>checkClosureVariable()</code> の処理が完了した時点でメモリ上から値が破棄されるが、クロージャに属される変数cは、何かしらの形で参照され続ける限り値を保持し続けます。</p>
<br>
<h2 id="まとめ"><a href="#まとめ">まとめ</a></h2>
<p>「Go クロージャ」と調べると、クロージャの説明はたくさんありましたが、実際にどの様な使い方ができるのかのイメージが出来ずに理解に苦しでいました。</p>
<p>ただ、クロージャを利用することでRedisのようなKVSを実装できることを知り、楽しみながらクロージャを理解できた気がします。</p>
<p>参考</p>
<p>書籍: スターティングGO言語</p>
<p><a href="https://www.okb-shelf.work/entry/2020/04/10/235523" rel="nofollow">https://www.okb-shelf.work/entry/2020/04/10/235523</a></p>`;
});
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Go_kvs_closure_lesson,
  metadata
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_1 as _
};
