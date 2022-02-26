# 体重記録Alexaスキル「たいレコ」

体重を記録できるAlexaスキル「たいレコ」です。（※スキルは非公開です）

Alexaに体重を伝えることでGoogle Fitに体重を記録することができます。([デモ](https://twitter.com/yuma_ito_bd/status/1497404842679369730?s=20&t=tvQKYsYbEtL2RIxPBlFq8w))

開発時のメモはこちら
- [Alexaスキル開発学習メモ](https://zenn.dev/yuma_ito_bd/scraps/28e66b52ab0032)
- [Google Fit APIで体重情報を取得・登録してみる](https://zenn.dev/yuma_ito_bd/scraps/5360873211bcad)



## How to Use

### OAuth2.0でGoogle APIのアクセストークン、リフレッシュトークンを取得したい場合
1. ```sh
   mkdir -p credentials
   ```
2. [firstAuthenticate.ts](https://github.com/yuma-ito-bd/alexa-weight-record-skill/blob/main/src/app/authentication/firstAuthenticate.ts)で必要なスコープを指定
3. ```sh
   npm run exec src/app/authentication/firstAuthenticate.ts
   ```
4. ブラウザが開くので、Googleでログインして権限を許可する
5. `credentials`フォルダ内にクレデンシャルが入ったJSONファイルが保存されています。（※リフレッシュトークンは初回の認証時のみ取得できるので注意。再取得したい場合は[こちら](https://myaccount.google.com/permissions?pli=1)から一度連携を外す必要があります。）

### Google Fit APIにリクエストするサンプルコード

[sample_call_goole_fit_apis.ts](https://github.com/yuma-ito-bd/alexa-weight-record-skill/blob/main/src/sample_call_goole_fit_apis.ts)をご覧ください。

