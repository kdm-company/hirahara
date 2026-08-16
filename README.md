# 平原こうや 公式サイト

静的HTMLサイト（全5ページ）。画像はすべて各HTMLファイルにBase64で埋め込み済みのため、外部アセットなしでそのまま公開できます。

## ページ構成

| ファイル | ページ |
| --- | --- |
| `index.html` | トップ |
| `profile.html` | プロフィール |
| `activity.html` | 活動 |
| `support.html` | ご支援・お問い合わせ |
| `privacy.html` | プライバシーポリシー |

## ローカル確認

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000/index.html` を開く。

## 公開前の残課題

- お問い合わせフォームの送信先設定（現状はダミー）
- YouTube・LINEの正式URL差し替え（現状は仮リンク）
- お知らせ・活動報告の内容最新化
- 寄付導線は法令確認後に追加検討
