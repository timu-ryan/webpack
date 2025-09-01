import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";

export function buildLoaders({ mode }: BuildOptions): ModuleOptions['rules'] {
  const isProd = mode === 'production';

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      // Translates CSS into CommonJS
      "css-loader",
      // Compiles Sass to CSS
      "sass-loader",
    ],
  }

  const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'ts-loader',
      options: { transpileOnly: true },
    },
  }

  return [
    scssLoader,
    tsLoader,
  ]
}