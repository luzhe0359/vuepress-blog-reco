import{_ as t,r as o,o as c,c as i,a as s,b as n,d as e,e as p}from"./app-wc4Qvs9_.js";const l={},r=p(`<blockquote><p>简单聊一聊我在项目中是如何封装 axios 以及如何统一管理 api 接口，其主要目的是简化代码，使代码结构更清晰，便于后期更新维护。</p></blockquote><h2 id="一、初识-axios" tabindex="-1"><a class="header-anchor" href="#一、初识-axios" aria-hidden="true">#</a> 一、初识 axios</h2><p><code>axios</code> - 一个易用、简洁且高效的 http 库</p><p>它具有以下几个优点</p><ul><li>支持<code>node</code>端和浏览器端 - 同样的 API，<code>node</code>和浏览器全支持，平台切换无压力</li><li>支持 <code>Promise</code> - 使用<code>Promise</code>管理异步，告别传统<code>callback</code>方式</li><li>丰富的配置项 - 支持拦截器等高级配置</li><li>社区支持 - <code>axios</code>相关的<code>npm</code>包数量一直在增长</li></ul><p>优点还挺多，上手试试。</p><h2 id="二、封装-axios" tabindex="-1"><a class="header-anchor" href="#二、封装-axios" aria-hidden="true">#</a> 二、封装 axios</h2><h3 id="_1-安装依赖" tabindex="-1"><a class="header-anchor" href="#_1-安装依赖" aria-hidden="true">#</a> 1. 安装依赖</h3><p>可以使用 npm、yarn 等进行安装，这里我使用 <code>yarn</code>。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> axios
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>引入<code>axios</code>。我一般是在<code>src</code>下创建一个<code>utils</code>文件夹，在其中新建一个<code>request.js</code>放置封装好的<code>axios</code>。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-创建实例" tabindex="-1"><a class="header-anchor" href="#_2-创建实例" aria-hidden="true">#</a> 2. 创建实例</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 创建实例</span>
<span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 创建实例后修改默认值</span>
axios<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>baseURL <span class="token operator">=</span>
  process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">==</span> <span class="token string">&#39;development&#39;</span>
    <span class="token operator">?</span> <span class="token string">&#39;http://127.0.0.1:8081&#39;</span>
    <span class="token operator">:</span> <span class="token string">&#39;https://api.example.com&#39;</span> <span class="token comment">// 默认请求地址，需根据环境判断请求的路径</span>
axios<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>timeout <span class="token operator">=</span> <span class="token number">10000</span> <span class="token comment">// 超时时间，单位毫秒</span>
axios<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>post<span class="token punctuation">[</span><span class="token string">&#39;Content-Type&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span>
  <span class="token string">&#39;application/x-www-form-urlencoded&#39;</span> <span class="token comment">// post请求头的设置</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-请求拦截" tabindex="-1"><a class="header-anchor" href="#_3-请求拦截" aria-hidden="true">#</a> 3. 请求拦截</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */</span>
axios<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
  <span class="token parameter">config</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    LoadingBar<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 添加token</span>
    <span class="token keyword">const</span> token <span class="token operator">=</span> <span class="token function">getToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    token <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>Authorization <span class="token operator">=</span> <span class="token string">&#39;Bearer &#39;</span> <span class="token operator">+</span> token<span class="token punctuation">)</span>
    <span class="token keyword">return</span> config
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token parameter">error</span> <span class="token operator">=&gt;</span> Promise<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-响应拦截" tabindex="-1"><a class="header-anchor" href="#_4-响应拦截" aria-hidden="true">#</a> 4. 响应拦截</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 响应拦截器
 * 每次请求后，判断请求状态码是否正确，及数据做处理
 */</span>
axios<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
  <span class="token doc-comment comment">/**
   * 传输层：接口正常或异常，用http状态码
   * 业务层：业务正常或异常，用自定义状态码
   */</span>
  <span class="token comment">// 请求成功</span>
  <span class="token parameter">res</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    LoadingBar<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// HTTP 状态码</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>status <span class="token operator">!==</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 业务状态码</span>
    <span class="token keyword">let</span> code <span class="token operator">=</span> res<span class="token punctuation">.</span>data<span class="token punctuation">.</span>code
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>code <span class="token operator">||</span> code <span class="token operator">===</span> <span class="token number">2000</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 无code，则请求的是html页面；有code，则返回请求的数据</span>
      <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">errorHandle</span><span class="token punctuation">(</span>code<span class="token punctuation">,</span> res<span class="token punctuation">.</span>data<span class="token punctuation">.</span>msg<span class="token punctuation">)</span>
    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 请求失败</span>
  <span class="token parameter">error</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    LoadingBar<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> response <span class="token punctuation">}</span> <span class="token operator">=</span> error
    <span class="token keyword">if</span> <span class="token punctuation">(</span>response<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 请求已发出，但是不在2xx的范围</span>
      <span class="token function">errorHandle</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>status<span class="token punctuation">,</span> response<span class="token punctuation">.</span>data<span class="token punctuation">.</span>message<span class="token punctuation">)</span>
      <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">tip</span><span class="token punctuation">(</span><span class="token string">&#39;网络出现故障,请稍后再试&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-错误处理" tabindex="-1"><a class="header-anchor" href="#_5-错误处理" aria-hidden="true">#</a> 5. 错误处理</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 请求失败后的错误统一处理
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Number<span class="token punctuation">}</span></span> <span class="token parameter">status</span> 请求失败的状态码
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">errorHandle</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">status<span class="token punctuation">,</span> msg</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 状态码判断</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>status<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 2002: 用户名/密码错误</span>
        <span class="token keyword">case</span> <span class="token number">2002</span><span class="token operator">:</span>
            <span class="token function">tip</span><span class="token punctuation">(</span><span class="token string">&#39;用户名或密码错误!&#39;</span><span class="token punctuation">)</span>
            <span class="token keyword">break</span>
        <span class="token comment">// 4003: token过期，清除token并跳转登录页</span>
        <span class="token keyword">case</span> <span class="token number">4003</span><span class="token operator">:</span>
            <span class="token function">toLogin</span><span class="token punctuation">(</span><span class="token string">&quot;登录信息过期&quot;</span><span class="token punctuation">)</span>
            <span class="token keyword">break</span>
        <span class="token comment">// 其他状态码</span>
        <span class="token operator">...</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token function">tip</span><span class="token punctuation">(</span><span class="token string">&#39;后台维护中，请稍后再试&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
* 提示函数
*/</span>
<span class="token keyword">const</span> <span class="token function-variable function">tip</span> <span class="token operator">=</span> <span class="token parameter">msg</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 使用UI框架自带的错误弹框即可</span>
    <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$msg<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 跳转登录页
 * 携带当前页面路由，以便在登录完成登录后返回当前页面
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">toLogin</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">msg</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 移除token、用户信息</span>

    <span class="token comment">// 跳转登录页</span>
    router<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/login&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">query</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">redirect</span><span class="token operator">:</span> router<span class="token punctuation">.</span>currentRoute<span class="token punctuation">.</span>fullPath
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、使用-axios" tabindex="-1"><a class="header-anchor" href="#三、使用-axios" aria-hidden="true">#</a> 三、使用 axios</h2><h3 id="_1-创建-api-接口" tabindex="-1"><a class="header-anchor" href="#_1-创建-api-接口" aria-hidden="true">#</a> 1. 创建 api 接口</h3><p>以<code>user</code>模块为例，在<code>src</code>目录下新建<code>api</code>文件夹，用来存放项目的所有接口请求，新建<code>user.js</code>，代码如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;@/utils/request&#39;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span>: 用户登录
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>String<span class="token punctuation">}</span></span> <span class="token parameter">username</span> 用户名
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>String<span class="token punctuation">}</span></span> <span class="token parameter">password</span> 密码(aes加密)
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">userLogin</span> <span class="token operator">=</span> <span class="token parameter">params</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&#39;/user/login&#39;</span><span class="token punctuation">,</span> params<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 其他user接口</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-在页面使用" tabindex="-1"><a class="header-anchor" href="#_2-在页面使用" aria-hidden="true">#</a> 2. 在页面使用</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> userLogin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@/api/user&#39;</span>

<span class="token function">userLogin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">username</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>username<span class="token punctuation">,</span>
  <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>password <span class="token comment">// 记得加密QAQ</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>$msg<span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token string">&#39;登录成功&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、api-进阶" tabindex="-1"><a class="header-anchor" href="#四、api-进阶" aria-hidden="true">#</a> 四、api 进阶</h2><p>很多项目都是通过以上方式来调用接口的，但是这种方式有个弊端，在每个页面都得引入需要的 API，如果某个界面用到不同模块的接口，得引入好几次，造成代码冗余。</p><p>在 B 站自学的时候，发现了一个更合适的方法，下面就来详细讲解一下。</p><h3 id="_1-创建-api-接口-1" tabindex="-1"><a class="header-anchor" href="#_1-创建-api-接口-1" aria-hidden="true">#</a> 1. 创建 api 接口</h3><p>将<code>user</code>模块作为一个整体导出。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;@/utils/request&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@description</span>: 用户登录
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>String<span class="token punctuation">}</span></span> <span class="token parameter">username</span> 用户名
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>String<span class="token punctuation">}</span></span> <span class="token parameter">password</span> 密码(aes加密)
     */</span>
    <span class="token function">userLogin</span><span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&#39;/user/login&#39;</span><span class="token punctuation">,</span> params<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 其他user接口</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-创建-index-js" tabindex="-1"><a class="header-anchor" href="#_2-创建-index-js" aria-hidden="true">#</a> 2. 创建 index.js</h3><p>在使用 api 时，经常需要<code>import</code>或<code>export</code>各种模块，那么有没有什么办法可以简化这种操作呢？答案是肯定的，下面就为大家介绍一下<code>require.context</code>的基本使用方法：</p><p>require.context(directory，useSubdirectories，regExp)，三个参数分别如下：</p><ul><li>directory 要查找的文件路径</li><li>useSubdirectories 是否查找子目录</li><li>regExp 要匹配文件的正则</li></ul>`,36),u={href:"https://zhuanlan.zhihu.com/p/59564277",target:"_blank",rel:"noopener noreferrer"},d=s("code",null,"require.context",-1),k={href:"https://webpack.js.org/guides/dependency-management/#requirecontext",target:"_blank",rel:"noopener noreferrer"},v=p(`<p>本案例使用如下，将所有<code>index.js</code>同级 api 导入，导入后统一导出，最后在<code>main.js</code>将所有 api 挂载到<code>vue</code>中</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 批量导出文件</span>
<span class="token keyword">const</span> requireApi <span class="token operator">=</span> require<span class="token punctuation">.</span><span class="token function">context</span><span class="token punctuation">(</span>
  <span class="token comment">// api 目录的相对路径</span>
  <span class="token string">&#39;.&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// 是否查询子目录</span>
  <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 查询文件的一个后缀</span>
  <span class="token operator">/</span><span class="token punctuation">.</span>js$<span class="token operator">/</span>
<span class="token punctuation">)</span>

<span class="token keyword">let</span> module <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
requireApi<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> <span class="token string">&#39;./index.js&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>
  Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>module<span class="token punctuation">,</span> <span class="token function">requireApi</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> module
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-引入及使用" tabindex="-1"><a class="header-anchor" href="#_3-引入及使用" aria-hidden="true">#</a> 3. 引入及使用</h3><p>在<code>main.js</code>引入所有 api</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> api <span class="token keyword">from</span> <span class="token string">&#39;@/api&#39;</span>

<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$api <span class="token operator">=</span> api
<span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>$api<span class="token punctuation">.</span>user<span class="token punctuation">.</span><span class="token function">userLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// 接口响应成功后的一些处理...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、总结" tabindex="-1"><a class="header-anchor" href="#五、总结" aria-hidden="true">#</a> 五、总结</h2><p>完结撒花 😁😁😁</p>`,9),m={href:"https://zugelu.com/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://juejin.cn/user/1151943917971031",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.zhihu.com/people/zugelu",target:"_blank",rel:"noopener noreferrer"},g={href:"https://blog.csdn.net/weixin_44388523",target:"_blank",rel:"noopener noreferrer"},f=s("strong",null,"关注足各路、前端不迷路！",-1);function x(y,w){const a=o("ExternalLinkIcon");return c(),i("div",null,[r,s("p",null,[n("具体使用方式见："),s("a",u,[n("webpack 中 require.context 的作用"),e(a)]),d,n("官网地址："),s("a",k,[n("webpack-requirecontext"),e(a)])]),v,s("p",null,[n("本文首发于"),s("a",m,[n("足各路的博客"),e(a)]),n("，后续会同步更新到"),s("a",b,[n("掘金"),e(a)]),n("、"),s("a",h,[n("知乎"),e(a)]),n("、"),s("a",g,[n("CSDN"),e(a)]),n("。"),f])])}const j=t(l,[["render",x],["__file","003.html.vue"]]);export{j as default};
