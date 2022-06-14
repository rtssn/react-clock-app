# react-clock-app

Reactを使った時計アプリです。
余ったスマホ（Rakuten mini)を車で時計表示として使いたいので作りました。

# OpenWeatherMapのAPIキー
srcディレクトリにconfig.tsファイルを生成し、以下のクラスを追加してください。

```typescript:config.ts
class Config {
    /**
     * Open weather map API key.
     */
    public static readonly openWeatherMapApiKey = 'API key'
}
```