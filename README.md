# 平原こうや 公式サイト

大阪市港区で活動する平原こうやの公式サイトです。
フレームワークやビルド工具を使わない静的サイトなので、ファイルをそのままサーバーに置けば公開できます。

## ファイル構成

```
.
├─ index.html         トップ
├─ profile.html       プロフィール
├─ activity.html      活動
├─ support.html       応援・お問い合わせ
├─ privacy.html       プライバシーポリシー
├─ 404.html
├─ robots.txt / sitemap.xml
└─ assets/
   ├─ css/top.css     トップ専用（ヒーローを含む）
   ├─ css/pages.css   下層ページ共通
   ├─ css/polish.css  全ページ共通の仕上げ（必ず最後に読み込む）
   ├─ js/main.js      メニュー、横スワイプ、表示アニメ、活動の絞り込み
   └─ img/            写真・マーク・ファビコン
```

## ローカルでの確認

```bash
python3 -m http.server 8000
# http://localhost:8000/ を開く
```

## 公開手順

1. リポジトリにそのまま push（ビルド不要）。
2. Netlify / Vercel / GitHub Pages などで、公開ディレクトリをリポジトリ直下に指定。
3. 公開ドメインが決まったら、`https://example.com` を一括置換します。

```bash
grep -rl "https://example.com" . | xargs sed -i '' "s|https://example.com|https://本番ドメイン|g"
```

対象は各 HTML の canonical / og:url / og:image と、robots.txt、sitemap.xml です。

## 公開前に必要な作業

- [ ] お問い合わせフォームの送信先を `support.html` の `<form>` の `action` に設定（フォームサービスまたはサーバー側の窓口）
- [ ] 活動カードの日付（現在 `2026.00.00`）と記事タイトルを実データに差し替え
- [ ] プロフィールの学歴・職歴（現在「確認中」）を原稿で差し替え
- [ ] 寄付に関する法令表示とプライバシーポリシーの文言をリーガル確認
- [ ] LINE の受付 URL を確定して `support.html` に反映
- [ ] 写真を本番素材に差し替え（`assets/img/` のファイル名を維持すれば CSS の修正は不要）
- [ ] アクセス解析を入れる場合は各 HTML の `</head>` 直前にタグを記載

## 設計メモ

- カラーは `:root` に Primary / Secondary / Accent / Neutral の4層で定義しています。変更は変数だけで全体に反映されます。
- 余白は `--s-1`～`--s-7`、文字サイズは `--t-cap`～`--t-h1` のスケールを使います。
- ヒーローの斜線は `.hero::before` の1枚だけで、mask や clip-path は使いません（背景に段差を出さないため）。
- スマホは縦書きの名前と横書きのコピーで L 字をつくり、下端を揃えています。
- PC の人物は「文字ブロック右端〜画面右端」の余白の中央に中心軸が来るよう採寸しています。
- Yuji Syuku（署名の手書き風）のみ Google Fonts を後読みしています。読み込めない環境でも他の表示に影響はありません。

## ブラウザ対応

Chrome / Safari / Edge / Firefox の最新版と iOS Safari、Android Chrome。
