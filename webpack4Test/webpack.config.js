const {resolve}=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports={
    entry:'./src/index.js',
    output:{
        filename:'build.js',
        path:resolve(__dirname,'dist')
    },
    module:{
        rules:[
            // {
            //     test:/\.js$/,
            //     loader:'eslint-loader',
            //     exclude:/node_modules/,
            //     options:{
            //         fix:true
            //     }
            // },
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/,
                options:{
                    presets:[[
                        '@babel/preset-env',
                        {
                            useBuiltIns:'usage',
                            corejs:{
                                version: 3
                            },
                            targets:{
                                chrome:'58',
                                ie:'9'
                            }
                        }
                    ]]
                }
            },
            {
                test:/\.css$/,
                use:[
                    //'style-loader',
                    //提取css出来作为单独的css文件
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                    },
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            ident:'postcss',
                            plugins:()=>[
                                require('postcss-preset-env')()
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                    },
                    'css-loader',
                    'sass-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            ident:'postcss',
                            plugins:()=>[
                                require('postcss-preset-env')()
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.(jpg|png|gif|jpeg)$/,
                loader:'url-loader',
                options:{
                    limit: 10* 1024,
                    esModule:false,
                    name:'[hash:5].[ext]',
                    outputPath:'images',
                }
            },
            {
                test:/\.html$/,
                loader:'html-loader'
            },
            {
                exclude:/\.(html|jpg|png|gif|jpeg|scss|css|js)$/,
                loader:'file-loader',
                options:{
                    name:'[hash:5].[ext]',
                    outputPath:'fonts',
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:resolve(__dirname,'public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename:'css/build-[hash:5].css'
        }),
        new OptimizeCssAssetsPlugin()   //压缩css
    ],
    mode:'development',
    devServer:{
        //需要启用的目录
        contentBase:resolve(__dirname,'dist'),
        //启用gzip 压缩
        compress:true,
        //端口号
        port:888,
        hot:true
    }
}