const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractSass = new ExtractTextPlugin({
   filename: "css/[name].css",
   disable: process.env.NODE_ENV === "development"
});

 module.exports = [
   {
     entry: {
         main: './src/js/main.js',
     },
     output: {
       filename: '[name].min.js',
       path: path.resolve(__dirname, 'public')
     },
     module: {
       rules: [
         {
           test: /\.js$/,
           exclude: /(node_modules|bower_components)/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: ['env'],
               minified: true,
               compact: true
             }
           }
         },
         {
           test: /\.scss$/,
           use: extractSass.extract({
               use: [{
                   loader: "css-loader"
               }, {
                   loader: "sass-loader",
                   options: {
                     outputStyle: "compressed"
                   }
               }],
               fallback: "style-loader"
           })
         }
       ]
     },
     resolve: {
       alias: {
         'vue$': 'vue/dist/vue.common.js'
       }
     },
     plugins: [
       extractSass,
       new CleanWebpackPlugin(['public']),
       new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"'
          }
        })
       //new UglifyJSPlugin()
     ]
   }
 ];
