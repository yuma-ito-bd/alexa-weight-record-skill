## TODO
- [x] Google Fitから体重を取得する処理
- [ ] 認可
  - [x] 認可用のURLの作成
  - [x] URLにアクセスする
  - [x] リダイレクト時の処理（初回）
    - [x] アクセストークン、リフレッシュトークンの取得
  - [x] アクセストークンの更新
  - [ ] OpenId connectの利用
- [ ] インフラ構築
  - [ ] Lambda
    - [ ] 環境変数の設定(`DATA_SOURCE_ID, REFRESH_TOKEN, OAUTH2_CLIENT_ID, OAUTH2_CLIENT_SECRET, OAUTH2_REDIRECT_URI`)
  - [ ] Teraformで作成してみる（優先度低）
- [ ] Alexaスキルの設定
  - [ ] 呼び出すLambdaの設定
  - [ ] モデルの作成

## メモ
### OAuth2.0によってGoogle APIへリクエストするまでの流れ
1. 認可用のURLを作成する
2. ユーザーが認可用URLにアクセスする（させる）
3. ユーザーが許可をする
4. GoogleのOAuthサーバーからリダイレクトURLに対してリクエストを送る（コードが含まれている）
5. 認証コードをアクセストークン、リフレッシュトークンに変換するリクエストを送る（https://oauth2.googleapis.com/token）
6. アクセストークンを使ってGoogle APIにリクエストする

リフレッシュトークンをセットすればアクセストークンを自動で更新してくれる。

