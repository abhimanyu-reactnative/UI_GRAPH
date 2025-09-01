const path = require('path');
const webpack = require('webpack');
 
module.exports = {
  mode: 'development',
  target: ['web', 'es5'],
 
  entry: './Secured/ApplicationBuilder.js', 
 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // <--- IMPORTANT: bundle.js will be served from the root (e.g., http://localhost:8081/bundle.js)
  },
 
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules\/(?!(\@maxgraph)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // --- Your mxGraph loaders (UNCHANGED) ---
      {
        test: /mxClient\.js$/,
        use: ['script-loader', 'expose-loader?mxClient'],
        include: [path.resolve(__dirname, 'src/mxgraph')],
      },
      {
        test: /mxUtils\.js$/,
        use: ['script-loader', 'expose-loader?mxUtils'],
        include: [path.resolve(__dirname, 'src/mxgraph')],
      },
     
      // --- Your CSS and Asset loaders (UNCHANGED) ---
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]'
        },
      },
    ],
  },
 
  plugins: [
    // --- REMOVE or COMMENT OUT HtmlWebpackPlugin for `Login.html` ---
    // If you need a separate `index.html` (e.g., for direct app access later),
    // you can define a new HtmlWebpackPlugin instance with filename: 'index.html'.
    /*
    new HtmlWebpackPlugin({
      filename: 'index.html', // This would be the name if you needed another entry page
      inject: 'body',
      title: 'Application Builder',
    }),
    */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
 
  devServer: {
    // --- Serve static content ---
    static: [
      {
        directory: path.resolve(__dirname, 'dist'), // For `bundle.js` and other bundled assets
        publicPath: '/', // `bundle.js` will be served as `/bundle.js`
      },
      {
        directory: path.resolve(__dirname, './'), // <--- Serve your project root (UI_again)
        publicPath: '/', // Makes files like `/Secured/Login.html` accessible directly from the root
      },
    ],
    port: 9000,
    // --- History API fallback for SPA routing ---
    historyApiFallback: {
      index: '/Secured//Login.html', // Directs requests to Login.html for SPA routing
      rewrites: [
        // Ensure that any paths under /Secured/ that should be handled by your SPA
        // also fallback to Login.html
        { from: /^\/Secured\/.*/, to: '/Secured/Login.html' }
      ]
    },
    // --- Proxy for API calls (UNCHANGED) ---
    proxy: {
      '/ADE': {
        target: 'http://localhost:8090/',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@mxgraph': path.resolve(__dirname, 'src/mxgraph'),
      '@js': path.resolve(__dirname, 'js'),
      '@refscripts': path.resolve(__dirname, 'ReferenceScript'),
    },
    extensions: ['.js', '.jsx', '.json', '.css'],
  },
};
 