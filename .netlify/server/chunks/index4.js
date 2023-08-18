import { c as create_ssr_component } from "./index2.js";
const metadata = {
  "title": "なんでやねん",
  "date": "2023-08-16T00:00:00.000Z",
  "headings": []
};
const Update_started = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p>Goの戻り値には名前をつけることができ、その場合は関数の先頭で定義された変数として扱われる。</p>
<p>これらの名前は、戻り値の意味を文章化するために使用される。そして、引数のない return 文 (ネイキッドリターン)を使うことで名前付きの戻り値を返すことができる。</p>
<pre class="language-go"><!-- HTML_TAG_START -->${`<code class="language-go"><span class="token comment">// 戻り値にx, yという名前を付けている</span>
<span class="token keyword">func</span> <span class="token function">split</span><span class="token punctuation">(</span>sum <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
	x <span class="token operator">=</span> sum <span class="token operator">*</span> <span class="token number">4</span> <span class="token operator">/</span> <span class="token number">9</span>
  y <span class="token operator">=</span> sum <span class="token operator">-</span> x
	<span class="token comment">// ネイキッドリターンすることで x, yが返される</span>
	<span class="token keyword">return</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token number">17</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>参考</p>
<p><a href="https://go.dev/tour/basics/7" rel="nofollow">https://go.dev/tour/basics/7</a></p>`;
});
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Update_started,
  metadata
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_6 as _
};
