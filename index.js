import AppLinker from './lib/applinker.js'

AppLinker.install = (Vue, cfg) => {
  const aplk = new AppLinker(cfg)

  Vue.prototype.$appLink = function (config) {
    return aplk.open(config)
  }
}

const Vue = window.Vue || global.Vue || null

if (Vue) Vue.use(AppLinker)

export default AppLinker