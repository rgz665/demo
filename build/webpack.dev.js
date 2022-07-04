const path = require("path");
const { default: merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const devConfig = {
  mode: "development",
  // devtool: 'cheap-module-eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, "../dist"),
    },
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              // modules: true
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  output: {
    // publicPath: "/",
    filename: "[name].js",
    // 间接引入模块
    chunkFilename: "[name].chunk.js",
  },
};

module.exports = merge(commonConfig, devConfig);
