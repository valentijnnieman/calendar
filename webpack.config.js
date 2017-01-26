module.exports = {
  module: { 
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  entry: './src/main.js',
  output: {
    filename: 'calendar.js',
    path: './'
  }
}
