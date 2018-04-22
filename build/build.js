const webpack = require('webpack')
const config = require('../webpack.config.js')

webpack(config, function (err, stats) {
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (err || stats.compilation.errors.length) {
    console.log('\n\n  Tip: \n\n  build error, discontinued!  :( \n')
    throw err
  } else {
    console.log('  Build complete.\n')
  }
})