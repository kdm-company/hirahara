// 公開してはいけないパスを 404 にする（Cloudflare Pages Functions）。
const BLOCK = [/^\/\.git(\/|$)/, /^\/\.github(\/|$)/, /^\/\.wrangler(\/|$)/, /^\/functions(\/|$)/, /^\/node_modules(\/|$)/, /^\/\.(gitignore|env.*)$/, /\.md$/i, /^\/README\.txt$/i, /\.docx$/i, /^\/wrangler\.(jsonc?|toml)$/];
export async function onRequest(context) {
  const path = new URL(context.request.url).pathname;
  if (BLOCK.some((re) => re.test(path))) return new Response("Not Found", { status: 404 });
  return context.next();
}
