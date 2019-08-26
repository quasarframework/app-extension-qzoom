/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const extendConf = function (conf) {
  // make sure qzoom boot file is registered
  conf.boot.push('~@quasar/quasar-app-extension-qzoom/src/boot/qzoom.js')
  console.log(` App Extension (qzoom) Info: 'Adding qzoom boot reference to your quasar.conf.js'`)

  // make sure boot & component files transpile
  conf.build.transpileDependencies.push(/quasar-app-extension-qzoom[\\/]src/)

  // qzoom is dependent on colorize mixin
  conf.build.transpileDependencies.push(/quasar-mixin-colorize[\\/]src/)

  // make sure these plugins are in the build
  // conf.framework.plugins.push('AppFullscreen')
  // conf.framework.plugins.push('Platform')
  // conf.framework.plugins.push('Screen')

  // conf.framework.directives.push('Scroll')

  // make sure qzoom css goes through webpack to avoid ssr issues
  conf.css.push('~@quasar/quasar-app-extension-qzoom/src/component/zoom.styl')
  conf.css.push('~quasar-mixin-colorize/src/qColors.styl')
  console.log(` App Extension (qzoom) Info: 'Adding zoom.styl css reference to your quasar.conf.js'`)
}

module.exports = function (api) {
  // quasar compatibility check
  api.compatibleWith('@quasar/app', '^1.0.0')

  // register JSON api
  // api.registerDescribeApi('QZoom', './component/QZoom.json')

  // extend quasar.conf
  api.extendQuasarConf(extendConf)
}
