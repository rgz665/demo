const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const prodConfig = {
  mode: "production",
  // devtool: 'cheap-module-eval-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      // 间接引用
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 将引入的css单独生成一个css文件
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  output: {
    // publicPath: "/",
    filename: "[name].[contenthash].js",
    // 间接引入模块
    chunkFilename: "[name].[contenthash].chunk.js",
  },
};

module.exports = prodConfig;
