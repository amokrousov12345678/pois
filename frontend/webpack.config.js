const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const babelPlugins = ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"];

module.exports = {
	entry: "./src/roots/index.tsx",
	devtool: "eval",
	output: {
    	filename: "./bundle.js"
	},
	mode: "production",
	module: {
	    rules: [
	    	{
	        	test: /\.js$/,
	        	exclude: /(node_modules)/,
	        	use: {
	        		loader: "babel-loader",
	        		options: {presets: ["@babel/env"], plugins: babelPlugins}
	        	}
	      	},
	    	{

	        	test: /\.jsx$/,
	        	exclude: /(node_modules)/,
	        	use: {
	        		loader: "babel-loader",
	        		options: {presets: ["@babel/env", "@babel/react"], plugins: babelPlugins}
	        	}
	      	},
	      	{
	        	test: /\.ts$/,
	        	use: {
	        		loader: "babel-loader",
	        		options: {presets: ["@babel/typescript", "@babel/env"], plugins: babelPlugins}
	        	}
	      	},
	      	{
	      		test: /\.tsx$/,
	        	use: {
	        		loader: "babel-loader",
	        		options: {presets: ["@babel/typescript", "@babel/env", "@babel/react"], plugins: babelPlugins}
	        	}
	      	},
	        {
	        	test: /\.scss$/,
	        	use: [
				{
				    loader: "style-loader"
				},
				{
				    loader: "css-loader",
				    options: {
				        sourceMap: true,
				        modules: true,
				    }
				},
				{
				     loader: "sass-loader",
				     options: {
				         sourceMap: true
				     }
				}]
	        },
	        {
	        	test: /\.css$/,
	        	use: [
	        	{
				    loader: "style-loader"
				},
				{
				    loader: "css-loader",
				    options: {
				        sourceMap: true,
				    }
				}]
	        },
      		{
        		  test: /\.(png|woff|woff2|eot|ttf|svg)$/,
  					loader: "url-loader?limit=100000&esModule=false"
      		},
	    ],
	},
	devServer: {
    	contentBase: path.join(__dirname, "dist"),
    	compress: true,
    	historyApiFallback: true, //fallback to index.html (any route is served by bundle)
    	progress: true,
    	port: 9000,
    	watchContentBase: true,
    	writeToDisk: true, //to create bundle even if build in dev mode
  	},
  	plugins: [
  		new HtmlWebpackPlugin({
  			title: "Система управления проектной организацией",
  		})
  	],
  	resolve: {
  		extensions: [".ts", ".tsx", ".js", ".jsx"] //for imports without extensions
  	},
}
