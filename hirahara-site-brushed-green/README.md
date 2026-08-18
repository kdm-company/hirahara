# 平原こうや 公式サイト — Git納品版

## 内容
- `index.html` — ブラッシュアップ済み本体
- `assets/images/hero.png` — メインビジュアル人物画像
- `assets/images/profile.jpg` — プロフィール画像
- `assets/svg/` — 装飾SVG 5点

## 今回の調整
- 既存の文章・リンク・ページ構成は維持
- 既存の強い発光・装飾を整理し、余白とタイポグラフィ中心に再設計
- グリーンを深め、赤をポイント使いに限定
- SVG装飾をヒーロー、区切り、プロフィール写真、余白、CTAに限定して配置
- 埋め込みBase64画像を外部ファイル化し、`index.html` を大幅に軽量化
- スマホ／PCレスポンシブを整理
- メニューの `aria-expanded`、Escキー閉じ、IntersectionObserver非対応時のフォールバックを追加
- 外部SNSリンクに `target="_blank" rel="noopener"` を統一

## GitHub Pagesへの反映
現在の公開フォルダに、以下を同じ階層構造のまま上書きしてください。

```text
index.html
assets/
  images/
    hero.png
    profile.jpg
  svg/
    hero-flow.svg
    section-divider.svg
    photo-orbit.svg
    dot-field.svg
    cta-flow.svg
```

既存の `index.html` だけをアップロードすると画像・SVGが表示されません。`assets` フォルダも必ず一緒にアップロードしてください。

## 注意
- note記事タイトル・日付・URLは納品時点の添付HTMLにある内容をそのまま維持しています。
- Google Fontsを使用しているため、閲覧時に外部通信があります。


## 更新内容（2026-08-18）
- サイトの基調アクセントカラーを `#3FD113` に変更
- プロフィール写真を最新の添付写真に差し替え
- SVG装飾のグリーン系カラーも合わせて更新
