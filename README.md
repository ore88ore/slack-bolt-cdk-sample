# 概要

AWS CDK で API Gateway + Lambda で Slack Bolt をデプロイするシンプルなプロジェクトです。

[Bolt](https://slack.dev/bolt-js/ja-jp/tutorial/getting-started) の入門ガイドで作成したアプリを AWS CDK でデプロイすることができます。

## コマンド

- `npm run build` TypeScriptをコンパイル
- `npm run watch` 変更をウォッチしてコンパイル
- `npm run test` ユニットテストを実行
- `npm run bootstrap` AWS CDKのbootstrapを実行
- `npm run deploy` デプロイ
- `npm run dev` ローカルでサーバーを起動

## デプロイ手順

### AWS CDKをインストール

```
npm install -g aws-cdk
```

### Build

```
npm run build
```

### Bootstrapping an environment

デプロイ対象のアカウント/リージョンに初めてデプロイする際は、"bootstrap stack"をインストールする必要があります。（初回のみ）
```
npm run bootstrap
```

### Deploy

```
export SLACK_SIGNING_SECRET=<your-signing-secret>
export SLACK_BOT_TOKEN=xoxb-<your-bot-token>
# 必要に応じてデプロイ対象のAWSアカウントを設定
export AWS_ACCESS_KEY_ID=XXXXX
export AWS_SECRET_ACCESS_KEY=YYYYY
npm run deploy
```

## ローカル起動

ngrokでフォワードされるURLをSlackアプリに設定する。

```
npm run dev
ngrok http 3000
```
