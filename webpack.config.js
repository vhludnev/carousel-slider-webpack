const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.[chunkhash].js'
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HTMLPlugin({
            template: './src/index.html'
        }),
		new CopyPlugin({
			patterns: [
			  { from: path.resolve(__dirname, 'src', 'images'), to: 'images' },
			  { from: path.resolve(__dirname, 'src', 'icons'), to: 'icons' },
			],
		}),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
				  {
					loader: 'babel-loader',
					options: {
						presets: [
						  ['@babel/preset-env', { targets: "> 0.25%, not dead" }]
						]
					  }
				  }
				]
			}
        ],
    },
	resolve: {
		extensions: ['*', '.js']
	}
} 