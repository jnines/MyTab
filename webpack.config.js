const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    path: path.resolve(__dirname, './src/js/main.js'),
  },
  devtool: 'source-map',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'app'),
    publicPath: '/app',
  },
  /*   optimization: {
    minimize: false,
  }, */

  plugins: [
    new MiniCssExtractPlugin({
      filename: '../app/app.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            /*             options: {
              sassOptions: {
                outputStyle: 'expanded',
              },
            }, */
          },
        ],
      },
    ],
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
};
