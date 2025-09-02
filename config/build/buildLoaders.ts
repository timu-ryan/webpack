import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { ModuleOptions, RuleSetRule } from "webpack";
import type { BuildOptions } from "./types/types";

export function buildLoaders({ mode }: BuildOptions): ModuleOptions['rules'] {
  const isProd = mode === 'production';

  const cssLoader: RuleSetRule['use'] = {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      modules: {
        auto: /\.module\.\w+$/i,
        mode: 'local',
        localIdentName: isProd ? '[hash:base64:8]' : '[path][name]__[local]',
        namedExport: false,
      },
    },
  };

  const postcssLoader = { 
    loader: 'postcss-loader',
  };

  const sassLoader = {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  };

  const styleRule: RuleSetRule = {
    test: /\.(sa|sc|c)ss$/,
    use: [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader', 
      cssLoader, 
      postcssLoader, 
      sassLoader,
    ],
  };

  const tsRule: RuleSetRule = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: { 
      loader: 'ts-loader', 
      options: { transpileOnly: true } 
    },
  };

  return [
    tsRule,
    styleRule,
  ]
}