// запуск: NODE_OPTIONS='--loader ts-node/esm' webpack --env mode=development --config webpack.config.ts

import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration } from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface BuildEnv {
  mode?: 'development' | 'production' | 'none';
}

export default (env: BuildEnv = {}): Configuration => {
  const mode = env.mode ?? 'development';
  const isProd = mode === 'production';

  const config: Configuration = {
    mode,
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: isProd ? '[name].[contenthash].js' : '[name].js',
      clean: true,
    },
    devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
    ],
    cache: { type: 'filesystem' },
    stats: 'minimal',
    infrastructureLogging: { level: 'warn' },
  };

  return config;
};
