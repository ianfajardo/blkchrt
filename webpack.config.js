const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const webpackCopy = require("copy-webpack-plugin");

const extractSass = new MiniCssExtractPlugin({
  filename: "[name].min.css",
  chunkFilename: "[id].css"
});

var envmode = "development";

if (process.env.NODE_ENV === "production") {
  envmode = "production";
  console.log("production build");
}

module.exports = [
  {
    mode: envmode,
    entry: {
      main: "./src/js/main.js"
    },
    output: {
      filename: "[name].min.js",
      path: path.resolve(__dirname, "public")
    },
    devServer: {
      contentBase: path.join(__dirname, "src"),
      watchContentBase: true,
      hot: true,
      overlay: true,
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              minified: false,
              compact: false
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { url: false } },
            "sass-loader"
          ]
        },
        {
          test: /\.vue$/,
          loader: "vue-loader"
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                esModule: false,
                name: "[path][name].[ext]"
              }
            },
            {
              loader: "image-webpack-loader",
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 90
                },
                optipng: {
                  enabled: false
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4
                }
              }
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        vue: "vue/dist/vue.js"
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jquery: "jquery",
        "window.jQuery": "jquery",
        jQuery: "jquery"
      }),
      new webpack.HotModuleReplacementPlugin(),
      extractSass,
      new webpackCopy([
        {
          from: path.resolve(__dirname, "src/index.html"),
          to: path.resolve(__dirname, "public")
        },
        {
          from: path.resolve(__dirname, "_redirects"),
          to: path.resolve(__dirname, "public")
        }
      ])
    ]
  }
];