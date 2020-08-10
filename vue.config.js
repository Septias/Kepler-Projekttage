// const IS_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  css: {
    loaderOptions: {
      // pass options to sass-loader
      // @/ is an alias to src/
      // so this assumes you have a file named `src/variables.sass`
      // Note: this option is named as "prependData" in sass-loader v8
      sass: {

        additionalData: '@import "~@/variables.sass"'

      }
    }
  }
}
