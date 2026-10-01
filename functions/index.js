// トップページ（/）の「最新の発信」に note の最新記事を差し込む（Cloudflare Pages Functions）。
//
// note 公式ヘルプの案内どおり、RSS はサーバー側（Cloudflare）で取り込む。
// 取り込んだ結果は1時間キャッシュするので、note への問い合わせはおおむね1時間に1回。
// note を更新すると、遅くとも1時間ほどでHPに反映される。
// RSS が取れないときは、index.html に書かれている一覧をそのまま表示する。

const FEED = 'https://note.com/hirahara508/rss';
const LIMIT = 3;
const TTL = 3600;          // 取得成功時のキャッシュ（秒）
const RETRY_TTL = 300;     // 取得失敗時は5分あけて再挑戦
const CACHE_KEY = 'https://hiraharakouya.com/__cache/note-feed-v1';
const LINK_RE = /^https:\/\/note\.com\/hirahara508\/n\/[A-Za-z0-9]+$/;

export async function onRequestGet(context) {
  // 一覧の中身が変わっても静的ファイルの ETag は変わらないため、条件付きリクエストは使わない
  const req = new Request(context.request);
  req.headers.delete('If-None-Match');
  req.headers.delete('If-Modified-Since');
  const res = await context.next(req);

  if (res.status !== 200 || !(res.headers.get('content-type') || '').includes('text/html')) return res;

  let items = null;
  try {
    items = await loadItems(context);
  } catch (e) {
    items = null;
  }
  if (!items || !items.length) return res;

  const html = items.map(render).join('');
  const headers = new Headers(res.headers);
  headers.delete('ETag');
  headers.delete('Last-Modified');
  headers.delete('Content-Length');
  const out = new Response(res.body, { status: 200, headers });
  return new HTMLRewriter()
    .on('#note-feed', { element(el) { el.setInnerContent(html, { html: true }); } })
    .transform(out);
}

async function loadItems(context) {
  const cache = caches.default;
  const key = new Request(CACHE_KEY);
  const hit = await cache.match(key);
  if (hit) return hit.json();

  let items = [];
  try {
    const r = await fetch(FEED, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; hiraharakouya.com note-feed)' } });
    if (r.ok) items = parse(await r.text());
  } catch (e) {
    items = [];
  }
  const ttl = items.length ? TTL : RETRY_TTL;
  context.waitUntil(cache.put(key, new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'max-age=' + ttl },
  })));
  return items;
}

export function parse(xml) {
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = re.exec(xml))) {
    const body = m[1];
    const title = text(body, 'title');
    const link = text(body, 'link').split(/[?#]/)[0];
    const pub = Date.parse(text(body, 'pubDate'));
    if (!title || !LINK_RE.test(link) || Number.isNaN(pub)) continue;
    items.push({ title, link, time: pub });
  }
  items.sort((a, b) => b.time - a.time);
  return items.slice(0, LIMIT);
}

function text(body, tag) {
  const m = body.match(new RegExp('<' + tag + '>([\\s\\S]*?)</' + tag + '>'));
  if (!m) return '';
  let v = m[1].trim();
  const cdata = v.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
  if (cdata) return cdata[1].trim();
  return v
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// 日付は日本時間で表示する
function jstDate(ms) {
  const d = new Date(ms + 9 * 3600 * 1000);
  const p = (n) => String(n).padStart(2, '0');
  return d.getUTCFullYear() + '.' + p(d.getUTCMonth() + 1) + '.' + p(d.getUTCDate());
}

// index.html の既存マークアップと同じ形で出力する
export function render(item, i) {
  return '<li><a href="' + esc(item.link) + '" target="_blank" rel="noopener"><time>' + jstDate(item.time) + '</time>'
    + (i === 0 ? '<span class="tag new">NEW</span>' : '')
    + '<span class="tag">note</span><span class="t">' + esc(item.title) + '</span></a></li>';
}
