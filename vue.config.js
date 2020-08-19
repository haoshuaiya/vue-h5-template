const ComressionPlugin = require("compression-webpack-plugin");
module.exports = {
	devServer: {
		// proxy: 'https://www.xiaobuhome.cn'
		proxy: {
			"/index": {
				target: "http://192.168.50.58"
				// target: "https://ddr.qjmy.cn"
			}
		}
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: "@import 'src/style/var.scss';"
			}
		},
		sourceMap: false,
		extract: process.env.NODE_ENV === "development" ? false : true
	},
	indexPath: "index.twig",
	// publicPath: "/catalog/view/theme/szrz/dist",
	publicPath:
		process.env.NODE_ENV == "development" ||
		process.env.VUE_APP_TYPE == "test"
			? "/catalog/view/theme/szrz/dist"
			: "https://qjmy-static.oss-accelerate.aliyuncs.com/szrz/dist_h5/",
	transpileDependencies: ["vue-echarts", "resize-detector"],
	productionSourceMap: false,
	crossorigin: "anonymous",
	integrity: true,
	chainWebpack: config => {
		// 最小化js文件
		config.optimization.minimize(true);
		// 图片压缩
		const imagesRule = config.module.rule("images");
		imagesRule
			.use("image-webpack-loader")
			.loader("image-webpack-loader")
			.options({
				bypassOnDebug: true
			})
			.end();
	},
	configureWebpack: () => {
		// 生产环境压缩js,css文件
		if (process.env.NODE_ENV === "production") {
			return {
				plugins: [
					new ComressionPlugin({
						test: /\.js$|\.css$/,
						threshold: 10240,
						deleteOriginalAssets: false
					})
				]
			};
		}
	}
};
