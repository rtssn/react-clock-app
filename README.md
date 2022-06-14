# react-clock-app

Reactを使った時計アプリです。
余ったスマホ（Rakuten mini)を車で時計表示として使いたいので作りました。

# OpenWeatherMapのAPIキー
srcディレクトリにあるConfig.tsにAPIキーを記述してください。

```typescript:Config.ts
class Config {
    /**
     * Open weather map API key.
     */
    public static readonly openWeatherMapApiKey = 'API key'
}
```