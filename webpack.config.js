const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = (_, argv) => {
  const mode = argv.mode;
  const isDevelopment = mode === "development";
  return {
    mode: prod ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
      path: __dirname + '/dist/',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
          },
          use: 'ts-loader',
        },
      ]
    },
    devtool: prod ? undefined : 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),
      isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
  }
};
