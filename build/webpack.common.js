const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const webpack = require("webpack");
const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");
const { default: merge } = require("webpack-merge");

const commonConfig = {
  entry: {
    // lodash: "./src/lodash.js",
    main: "./src/index.js",
  },
  output: {
    // publicPath: "/",
    // filename: "[name].js",
    // 间接引入模块
    // chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            // 配置前往.babelrc查看
            // options: {
            // 组件使用场景，避免babel/polyfill污染全局环境
            // plugins: [
            //   [
            //     "@babel/plugin-transform-runtime",
            //     {
            //       corejs: 2,
            //       helpers: true,
            //       regenerator: true,
            //     },
            //   ],
            // ],
            // 业务代码场景
            //   presets: [
            //     [
            //       "@babel/preset-env",
            //       {
            //         useBuiltIns: "usage",  // 按需引用@babel/polyfill
            //       },
            //     ],
            //   ],
            // },
          },
          // {
          //   // 实现webpack不能实现的行为
          //   loader: "imports-loader?this=>window",
          // },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            // 占位符
            name: "[name]_[hash].[ext]",
            outputPath: "images/",
            limit: 8192, // 8kb
          },
        },
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: "file-loader",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    // 垫片 shimming
    // new webpack.ProvidePlugin({
    //   $: "jquery", // 自动帮你注入第三方模块
    // }),
  ],
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    usedExports: true, // 涉及到 tree shaking 需要配合package.json中 sideEffects:(false / [])，不对[]中的东西进行tree shaking，过滤不需要的tree Shaking
    splitChunks: {
      chunks: "all", // 对异步引入代码有效，对同步没有效果。
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1, // 模块至少被引入多少次之后，才会进行代码分割
      maxAsyncRequests: 30, // 代码被分割的最大数量 30个
      maxInitialRequests: 30, // 入口文件进行加载的时候，最多分割30个文件
      enforceSizeThreshold: 50000,
      cacheGroups: {
        // 同步代码走这
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 越大优先级越高
          reuseExistingChunk: true, //（重用现存的块）如果一个模块已经被打包过了，就选择忽略
          // filename: "[name].[contenthash].chunk.js",
        },
        // 所有模块都符合default的要求
        default: {
          // minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          filename: "common.js",
        },
      },
    },
  },
  /* webpack 与 code 分割无关；
   两种方式：
   1、同步代码：只需要在webpack配置中做optimization配置即可；
   2、异步代码（import）：异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中
   */
  performance: false,
};

module.exports = (production) => {
  if (production) {
    return merge(commonConfig, prodConfig);
  } else {
    return merge(commonConfig, devConfig);
  }
};
