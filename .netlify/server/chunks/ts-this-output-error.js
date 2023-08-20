import { c as create_ssr_component } from "./index2.js";
const metadata = {
  "title": "【TypeScript】メソッド内で使用しているthisをTypeScriptに認識させてエラーを出力してもらいたい",
  "date": "2020-06-17T00:00:00.000Z",
  "headings": [
    { "depth": 2, "value": "仕様", "id": "" },
    {
      "depth": 2,
      "value": "クラス外のオブジェクトでメソッドを呼び出す時もエラーを発生させたい",
      "id": ""
    }
  ]
};
const Ts_this_output_error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h2 id="仕様"><a href="#仕様">仕様</a></h2>
<p>TS/JS の<code>this</code>は定義時に参照するオブジェクトが決まるのではなく、<em>実行された場所</em>によって決まる。<br>
そしてTypeScriptはメソッドの中で<code>this</code>が使われていることを通常認識しないので思わぬ結果が表示されてしてしまう場面があります。</p>
<p>例としてPersonクラスを定義してその中で自己紹介をする<code>greeting</code>メソッドを定義したとします。</p>
<p>例)</p>
<pre class="language-typescript"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">&#123;</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  
  <span class="token function">constructor</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
  
  <span class="token function">greeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">こんにちは、私の名前は</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">です。</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">const</span> yamada <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'山田'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
yamada<span class="token punctuation">.</span><span class="token function">greeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code>`}<!-- HTML_TAG_END --></pre>
<br>
<ul><li>実行</li></ul>
<pre class="language-bash"><!-- HTML_TAG_START -->${`<code class="language-bash">$ tsc index.ts
$ <span class="token function">node</span> index.js
こんにちは、私の名前は山田です。</code>`}<!-- HTML_TAG_END --></pre>
<p>期待通りの内容が出力されます。</p>
<br>
<p>ここで<code>Person</code>クラス内の<code>name</code>プロパティをコメントアウトすると、当たり前ですが<code>name</code>プロパティが無いぞ！とエラーが発生します。</p>
<pre class="language-typescript"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">&#123;</span>
  <span class="token comment">// コメントアウトする</span>
  <span class="token comment">// name: string;</span>
  
  <span class="token function">constructor</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
  
  <span class="token function">greeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// thisが参照しているPersonクラスにnameプロパティが無いためエラーが発生する</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">こんにちは、私の名前は</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">です。</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">const</span> yamada <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'山田'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
yamada<span class="token punctuation">.</span><span class="token function">greeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}<!-- HTML_TAG_END --></pre>
<br>
<ul><li>実行</li></ul>
<pre class="language-bash"><!-- HTML_TAG_START -->${`<code class="language-bash">$ tsc index.ts
error TS2339: Property <span class="token string">'name'</span> does not exist on <span class="token builtin class-name">type</span> <span class="token string">'Person'</span><span class="token builtin class-name">.</span></code>`}<!-- HTML_TAG_END --></pre>
<p>ここでエラーに気づいて<code>name</code>プロパティを追加することができます。</p>
<br>
<h2 id="クラス外のオブジェクトでメソッドを呼び出す時もエラーを発生させたい"><a href="#クラス外のオブジェクトでメソッドを呼び出す時もエラーを発生させたい">クラス外のオブジェクトでメソッドを呼び出す時もエラーを発生させたい</a></h2>
<p><code>this</code>は定義時ではなく実行時に参照するオブジェクトが変化するため別のオブジェクト内でも<code>name</code>プロパティがない場合、同じように<code>name</code>プロパティが無いよ！と怒って欲しいがエラーを出力してくれません。</p>
<p>確認のため新たに別のオブジェクトを作成してPersonクラス内の<code>greeting()</code>メソッドを呼び出してみます。</p>
<br>
<pre class="language-typescript"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">&#123;</span>
  
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  
  <span class="token function">constructor</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
  
  <span class="token function">greeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">こんにちは、私の名前は</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">です。</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">const</span> yamada <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'山田'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 別のオブジェクトを作成する</span>
<span class="token keyword">const</span> fullName <span class="token operator">=</span> <span class="token punctuation">&#123;</span>
  fullNameGreeting<span class="token operator">:</span> yamada<span class="token punctuation">.</span>greeting
<span class="token punctuation">&#125;</span>
fullName<span class="token punctuation">.</span><span class="token function">fullNameGreeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code>`}<!-- HTML_TAG_END --></pre>
<br>
<ul><li>実行</li></ul>
<pre class="language-bash"><!-- HTML_TAG_START -->${`<code class="language-bash">$ tsc index.ts
$ <span class="token function">node</span> index.js
こんにちは、私の名前はundefinedです。</code>`}<!-- HTML_TAG_END --></pre>
<p>この場合、エラーが発生せず実行結果を見てみると<code>undefined</code>となっています。
なぜPerson内に<code>name</code>プロパティが無い時はエラーとなってくれたのに、作成した<code>fullName</code>内に<code>name</code>プロパティがなくてもエラーとならず<code>undefined</code>となってしまうのか。</p>
<p>TypeScriptはメソッドの中で<code>this</code>が使われていることを知らない（認識できていない）エラーとなってくれません<br>
そこで今回はTypeScriptに<code>greeting</code>メソッドの中で<code>this</code>が使われていることを明示的に認識させてあげます。</p>
<p>方法は次のとおりです。</p>
<br>
<p><code>greeting</code>メソッドの第1引数に<code>this: { name: string }</code>を入れてコンパイルしてみます。</p>
<pre class="language-typescript"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">&#123;</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  
  <span class="token function">constructor</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
  
  <span class="token comment">// 第一引数に this を入れて型を指定します</span>
  <span class="token function">greeting</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">こんにちは、わたしの名前は</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">です</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">const</span> yamada <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'山田'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
yamada<span class="token punctuation">.</span><span class="token function">greeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> fullName <span class="token operator">=</span> <span class="token punctuation">&#123;</span>
  fullNameGreeting<span class="token operator">:</span> yamada<span class="token punctuation">.</span>greeting
<span class="token punctuation">&#125;</span>
fullName<span class="token punctuation">.</span><span class="token function">fullNameGreeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}<!-- HTML_TAG_END --></pre>
<br>
<ul><li>実行</li></ul>
<pre class="language-bash"><!-- HTML_TAG_START -->${`<code class="language-bash">$ tsc index.ts
error TS2684: The <span class="token string">'this'</span> context of <span class="token builtin class-name">type</span> <span class="token string">'&#123; fullNameGreeting: (this: &#123; name: string; &#125;) => void; &#125;'</span> is not assignable to method<span class="token string">'s '</span>this<span class="token string">' of type '</span><span class="token punctuation">&#123;</span> name: string<span class="token punctuation">;</span> <span class="token punctuation">&#125;</span><span class="token string">'.
  Property '</span>name<span class="token string">' is missing in type '</span><span class="token punctuation">&#123;</span> fullNameGreeting: <span class="token punctuation">(</span>this: <span class="token punctuation">&#123;</span> name: string<span class="token punctuation">;</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> void<span class="token punctuation">;</span> <span class="token punctuation">&#125;</span><span class="token string">' but required in type '</span><span class="token punctuation">&#123;</span> name: string<span class="token punctuation">;</span> <span class="token punctuation">&#125;</span>'.</code>`}<!-- HTML_TAG_END --></pre>
<p>エラーとなってくれました！これで「あっ!nameプロパティ入れ忘れた」または「呼び出し側のnameプロパティを探しちゃってるじゃん」となれるわけです。<br>
確認のため<code>name</code>プロパティを追加して実行がしてみます</p>
<pre class="language-typescript"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">&#123;</span>
 <span class="token punctuation">.</span>
 <span class="token punctuation">.</span>
 <span class="token punctuation">.</span>
  <span class="token comment">// 第一引数に this を入れて型を指定します</span>
  <span class="token function">greeting</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">こんにちは、わたしの名前は</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">です</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">const</span> yamada <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'山田'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> fullName <span class="token operator">=</span> <span class="token punctuation">&#123;</span>
  <span class="token comment">// エラーが出たのでnameプロパティを追加</span>
  name<span class="token operator">:</span> <span class="token string">"山田 太郎"</span><span class="token punctuation">,</span>
  fullNameGreeting<span class="token operator">:</span> yamada<span class="token punctuation">.</span>greeting
<span class="token punctuation">&#125;</span>
fullName<span class="token punctuation">.</span><span class="token function">fullNameGreeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}<!-- HTML_TAG_END --></pre>
<br>
<ul><li>実行</li></ul>
<pre class="language-bash"><!-- HTML_TAG_START -->${`<code class="language-bash">$ tsc index.ts
$ <span class="token function">node</span> index.js
こんにちは、わたしの名前は山田 太郎です</code>`}<!-- HTML_TAG_END --></pre>
<p>コンパイル時にエラーが表示されることで、未然に<code>undefined</code>を防ぐことができました。</p>`;
});
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ts_this_output_error,
  metadata
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_2 as _
};
