var webpack = require('webpack');

module.exports = {
  devtool: "inline-sourcemap",
  entry: "./src/js/main.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs', 'transform-class-properties'],
        }
      },
      {
        test: /\.[scss$|css$]/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  output: {
    filename: "script.min.js"
  }
};
