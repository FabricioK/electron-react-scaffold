let dotenv = require('dotenv').config();
let env = dotenv.parsed;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: env.PORT,
        hot: true
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            title: env.TITULO,
            template: path.join(__dirname, "src", "index.html")
        }),
        new MiniCssExtractPlugin()
        //Caso precisar mover arquivos
        /*, new CopyPlugin({
             patterns: [
                 { from: 'assets', to: 'assets' },
             ],
         } )*/
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            }
        ],
    },
};