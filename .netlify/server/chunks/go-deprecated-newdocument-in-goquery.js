import { c as create_ssr_component } from "./index2.js";
const metadata = {
  "title": "【Go】 goqueryのNewDocument() が非推奨となり、かわりのNewDocumentFromReader()の使い方を調べた",
  "date": "2023-08-18T00:00:00.000Z",
  "headings": []
};
const Go_deprecated_newdocument_in_goquery = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p><code>goquery.NewDocument(&quot;url&quot;)</code> が非推奨となったみたいだったので、調べてみました。</p>
<pre class="language-go"><!-- HTML_TAG_START -->${`<code class="language-go">goquery<span class="token punctuation">.</span>NewDocument is deprecated<span class="token punctuation">:</span> Use the net<span class="token operator">/</span>http standard library <span class="token keyword">package</span> to <span class="token builtin">make</span> the request and validate the response before calling goquery<span class="token punctuation">.</span>NewDocumentFromReader with the response's body<span class="token punctuation">.</span><span class="token function">deprecated</span><span class="token punctuation">(</span><span class="token keyword">default</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> goquery<span class="token punctuation">.</span><span class="token function">NewDocument</span><span class="token punctuation">(</span>url <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>goquery<span class="token punctuation">.</span>Document<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
NewDocument is a Document constructor that takes a <span class="token builtin">string</span> URL as argument<span class="token punctuation">.</span> It loads the specified document<span class="token punctuation">,</span> parses it<span class="token punctuation">,</span> and stores the root Document node<span class="token punctuation">,</span> ready to be manipulated<span class="token punctuation">.</span>

Deprecated<span class="token punctuation">:</span> Use the net<span class="token operator">/</span>http standard library <span class="token keyword">package</span> to <span class="token builtin">make</span> the request and validate the response before calling goquery<span class="token punctuation">.</span>NewDocumentFromReader with the response's body<span class="token punctuation">.</span></code>`}<!-- HTML_TAG_END --></pre>
<p>これまでは、以下のようにすることで対象のURLからGetでドキュメントを取得してくれましたが、これが非推奨となったため、上のあるように net/http  でリクエストを行い  <code>goquery.NewDocumentFromReader(body)</code> とする必要があるようです。</p>
<pre class="language-go"><!-- HTML_TAG_START -->${`<code class="language-go"><span class="token keyword">func</span> <span class="token function">findBooks</span><span class="token punctuation">(</span>url <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Book<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
	doc<span class="token punctuation">,</span> err <span class="token operator">:=</span> goquery<span class="token punctuation">.</span><span class="token function">NewDocument</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">&#125;</span>

  <span class="token comment">//...</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p><code>goquery.NewDocumentFromReader()</code> に変換</p>
<pre class="language-go"><!-- HTML_TAG_START -->${`<code class="language-go"><span class="token keyword">func</span> <span class="token function">findBooks</span><span class="token punctuation">(</span>url <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Book<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
	res<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">&#125;</span>
	<span class="token keyword">defer</span> res<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	
	doc<span class="token punctuation">,</span> err <span class="token operator">:=</span> goquery<span class="token punctuation">.</span><span class="token function">NewDocumentFromReader</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>Body<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>上記のようにリファクタリングすることで、非推奨のアラートは消えました。</p>
<p>参考</p>
<p><a href="https://pkg.go.dev/github.com/PuerkitoBio/goquery#NewDocument" rel="nofollow">https://pkg.go.dev/github.com/PuerkitoBio/goquery#NewDocument</a><br>
<a href="https://github.com/PuerkitoBio/goquery#examples" rel="nofollow">https://github.com/PuerkitoBio/goquery#examples</a></p>`;
});
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Go_deprecated_newdocument_in_goquery,
  metadata
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_0 as _
};
