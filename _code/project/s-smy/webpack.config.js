const path = require('path');
const isDev = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isDev ? 'production' : 'development',
    entry: './src/ts/script.ts',
    output: {
        filename: 'main.js',
        path: path.join(__dirname, isDev ? 'release/assets/js' : 'build/assets/js')
    },
    target: ['web', 'es5'], 
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          loader: "ts-loader"
        },
      ],
    },
    resolve: {
      extensions: [
        '.ts',
        '.js',
      ],
    }
  };
