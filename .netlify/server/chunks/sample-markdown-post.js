import { c as create_ssr_component } from "./index2.js";
const metadata = {
  "title": "title is english",
  "date": "2023-08-16T00:00:00.000Z",
  "headings": [
    { "depth": 2, "value": "モックとは", "id": "" },
    { "depth": 2, "value": "スタブとは", "id": "" }
  ]
};
const Sample_markdown_post = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h2 id="モックとは"><a href="#モックとは">モックとは</a></h2>
<p>モックは、テスト中に依存するオブジェクトやサービスをシミュレートした偽のオブジェクトのこと</p>
<p>例えば、データベースへの接続をモック化して、テスト中に実際のデータベースアクセスを行わず、固定のダミーデータを返すようにすることができる。</p>
<p>データベース接続をモック化して、テスト中にデータベースへの接続を行わず、固定のダミーデータを返す方法の例</p>
<p>以下のパッケージでは、データベース接続を抽象化する Database インターフェースとその実装であるMySQLDB 構造体を持っているとする</p>
<pre class="language-go"><!-- HTML_TAG_START -->${`<code class="language-go"><span class="token comment">// db.go</span>
<span class="token keyword">package</span> db

<span class="token comment">// Databaseはデータベース接続を表すインターフェースです</span>
<span class="token keyword">type</span> Database <span class="token keyword">interface</span> <span class="token punctuation">&#123;</span>
    <span class="token function">Get</span><span class="token punctuation">(</span>id <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// MySQLDBはMySQLデータベース接続を表す構造体です</span>
<span class="token keyword">type</span> MySQLDB <span class="token keyword">struct</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>

<span class="token comment">// Getはデータベースからデータを取得します</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>db MySQLDB<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span>id <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// 実際のデータベース接続とクエリを実行するコード</span>
    <span class="token comment">// ここではダミーデータを返します</span>
    <span class="token keyword">return</span> <span class="token string">"data from MySQL database"</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>このGetメソッドをテストするために、 MockDB構造体を定義してデータベースのモックを用意し、テスト対象である Get() にモックを渡している</p>
<p>こうすることで Get() はモックを受けっとて実際のデータベースに接続せずにデータを受け取り、テストできる</p>
<pre class="language-go"><!-- HTML_TAG_START -->${`<code class="language-go"><span class="token comment">// db_test.go</span>
<span class="token keyword">package</span> db

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"testing"</span>
<span class="token punctuation">)</span>

<span class="token comment">// MockDBはデータベース接続のモックです</span>
<span class="token keyword">type</span> MockDB <span class="token keyword">struct</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>

<span class="token comment">// Getはデータベースからデータを取得します（モック）</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>db MockDB<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span>id <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token string">"mocked data"</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">func</span> <span class="token function">TestGetData</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// テスト対象の関数で使用するデータベースインスタンスをモックに置き換える</span>
    db <span class="token operator">:=</span> MockDB<span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>
    data <span class="token operator">:=</span> <span class="token function">Get</span><span class="token punctuation">(</span>db<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>

    <span class="token comment">// 期待される結果と比較する</span>
    expected <span class="token operator">:=</span> <span class="token string">"mocked data"</span>
    <span class="token keyword">if</span> data <span class="token operator">!=</span> expected <span class="token punctuation">&#123;</span>
        t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"Expected %q, but got %q"</span><span class="token punctuation">,</span> expected<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<h2 id="スタブとは"><a href="#スタブとは">スタブとは</a></h2>
<p>テスト中に特定のメソッドを呼び出す際に事前に決められた戻り値を返すオブジェクトのこと</p>
<p>例えば、外部APIへのリクエストをスタブ化して、テストが特定のAPI応答に対してどのように反応するかをテストすることができる。</p>
<p>以下の例は、外部のAPIリクエストをスタブ化して、テスト中に外部APIとの実際の通信を避ける方法</p>
<p>このパッケージは、外部のAPIにリクエストを送信する<strong><code>APIClient</code></strong>構造体を持っている</p>
<pre class="language-go"><!-- HTML_TAG_START -->${`<code class="language-go"><span class="token comment">// external_api.go</span>
<span class="token keyword">package</span> externalapi

<span class="token keyword">import</span> <span class="token string">"net/http"</span>

<span class="token comment">// APIクライアントを表す構造体</span>
<span class="token keyword">type</span> APIClient <span class="token keyword">struct</span> <span class="token punctuation">&#123;</span>
    baseURL <span class="token builtin">string</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// GetItemは外部APIからアイテムを取得します</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>APIClient<span class="token punctuation">)</span> <span class="token function">GetItem</span><span class="token punctuation">(</span>itemID <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// 実際のAPIリクエストを行うコード</span>
    <span class="token comment">// ここではダミーデータを返します</span>
    <span class="token keyword">return</span> <span class="token string">"item data"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>テストでは、外部APIへのリクエストをスタブ化して、実際の通信を避けることができ、 <strong><code>APIClientStub</code></strong>という外部APIクライアントのスタブを定義し、テスト対象の関数である<strong><code>GetItem</code></strong>にスタブを渡しています。スタブは実際の外部APIと通信する代わりに、テスト用の固定のダミーデータを返す</p>
<p>これにより、テスト中に外部APIへのリクエストを避け、スタブデータを使用してテストすることができ、スタブを使うことで、外部リソースや依存関係を持つコードをより簡単にテストできるようになる</p>
<pre class="language-go"><!-- HTML_TAG_START -->${`<code class="language-go"><span class="token comment">// external_api_test.go</span>
<span class="token keyword">package</span> externalapi

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"testing"</span>
<span class="token punctuation">)</span>

<span class="token comment">// APIClientStubは外部APIクライアントのスタブです</span>
<span class="token keyword">type</span> APIClientStub <span class="token keyword">struct</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>

<span class="token comment">// GetItemは外部APIからアイテムを取得します（スタブ）</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>APIClientStub<span class="token punctuation">)</span> <span class="token function">GetItem</span><span class="token punctuation">(</span>itemID <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// テスト用に固定のダミーデータを返す</span>
    <span class="token keyword">return</span> <span class="token string">"mocked item data"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">func</span> <span class="token function">TestGetItem</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// テスト対象の関数で使用するAPIクライアントをスタブに置き換える</span>
    client <span class="token operator">:=</span> APIClientStub<span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>
    itemData<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">GetItem</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">&#123;</span>
        t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"Unexpected error: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">// 期待される結果と比較する</span>
    expected <span class="token operator">:=</span> <span class="token string">"mocked item data"</span>
    <span class="token keyword">if</span> itemData <span class="token operator">!=</span> expected <span class="token punctuation">&#123;</span>
        t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"Expected %q, but got %q"</span><span class="token punctuation">,</span> expected<span class="token punctuation">,</span> itemData<span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<aside>💡 モックはテスト中の呼び出しを監視し、期待される呼び出しに対して事前に設定した振る舞いを返します。一方、スタブは特定の呼び出しに対して固定の戻り値を提供します。
<p>これらのテストダブルを適切に使うことで、依存関係の切り離しやテストのコントロールをより容易にすることができます。テストダブルは、特に外部リソースやデータベースなどの依存関係があるコードのユニットテストや結合テストにおいて非常に有用です。</p></aside>`;
});
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sample_markdown_post,
  metadata
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_4 as _
};
