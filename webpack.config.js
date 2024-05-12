const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
      },
      {
          //拡張子がpng,jpg,gif,svgを検知したら
          test: /\.(png|jpg|gif|svg)/,
          use: [
              {
                  loader: 'file-loader',
                  options: {
                      //[name]は画像名、[ext]は拡張子
                      name: 'images/[name].[ext]'
                  }
              }
          ]
      }
    ]
  }
};


module.exports = config;