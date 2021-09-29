const path = require('path');
const HtmlWebpackPlugin= require('html-webpack-plugin');
module.exports = {
//   mode: 'development',
  entry: {
      js:'./src/archivo.js',
      vanilla: './src/hello_vanilla.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
      rules: [
          {
              test: /\.(js)$/,
              exclude: /node_modules/,
              use:{
                  loader: 'babel-loader'
              }
          },
          {
              test: /\.html$/,
              use: [
                  {
                      loader: 'html-loader',
                      options: { minimize: true}
                  }
              ]
          },
          {
              test: /\.(css)$/,
              use: [
                  'style-loader',
              ]
          }
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: './src/prueba.html',
          filename: 'resultadoprueba.html'
      })
  ]
};
