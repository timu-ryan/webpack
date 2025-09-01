// запуск: NODE_OPTIONS='--loader ts-node/esm' webpack --env mode=development --config webpack.config.ts

import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface BuildEnv {
  mode?: 'development' | 'production' | 'none';
  port?: number | string;
  open?: boolean;
}

const makeDevServer = (env: BuildEnv = {}): DevServerConfiguration => {
  const port = typeof env.port === 'string' ? parseInt(env.port, 10) : env.port;

  const devServer = {
    port: port ?? 3000,
    open: env.open ?? true,
  };

  return devServer;
};

const config = (env: BuildEnv = {}): Configuration => {
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
    devServer: isProd ? undefined : makeDevServer(env),
  };

  return config;
};

export default config;