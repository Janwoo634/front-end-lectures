//아까 설치했던 플러그인을 플러그인 array에서 여기서 다 설정해주면 된다
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: "./src/js/index.js",
    // entry:자바스크립트의 진입점을 나타내는 속성

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist"),
        clean: true
    },
    // path:번들 파일이 생설될 경로 설정해주는 속성
    // (path 속성에 상대경로는 쓰면 웹팩에서 경로를 찾을 수 없으므로 path라는 모듈을 불러와서
    // resolve라는 메소드를 사용해서 __dirname을 사용해서 웹팩이 절대경로를 찾을 수 있게 함)
    // clean: 번들 파일이 생성될 경로에 이미 다른 파일이 있다면 다 지우는 속성
    devtool: "source-map",
    //source-map:빌드한 파일과 원본 파일을 서로 연결시켜주는 기능
    mode: "development",
    //mode에는 development와 production이 있음
    devServer:{
        host:"localhost",
        port:8080,
        open:true,
        watchFiles: 'index.html'
        //open : 새 창의 브라우저를 열어라
        //watchFiles : html의 변화를 감지한다
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "keyboard",
            template: "./index.html",
            //상대경로로 입력해줌 & lodash문법 사용 가능
            inject: "body",
            //파일을 빌드했을 때 자바스크립트의 파일을 body부분에 넣어줄 거임
            favicon: "./favicon.ico"
        }),
        new MiniCssExtractPlugin({filename:"style.css"})
        //html에 css를 inject해주기 위함 모듈


    ],
    module:{
        //css파일을 이런 loader를 사용해서 읽어들이도록 하겠다
        rules:[
            {
                test:/\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    optimization: {
        minimizer:[
            new TerserPlugin(),
            new CssMinimizerWebpackPlugin()
        ]
    }

}