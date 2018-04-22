import Browser from './browser.js'

class AppLinker {
  constructor (cfg = {}) {
    this.config = cfg
  }

  open (cfg) {
    const config = Object.assign({}, this.config, cfg)

    // 微信直接跳 应用宝
    if (Browser.isWx) return this.go(config.yyb)

    // QQ
    if (Browser.isQQ) {
      if (Browser.isIOS) {
        return this.checkOpen(isSuccess => {
          // iOS跳到AppStore
          if (!isSuccess) this.go(config.appstore)
        })
      }

      if (Browser.isAndroid) {
        // 使用scheme唤起
        this.tryCallApp(config.scheme)

        // 唤起失败 跳到应用宝
        return this.checkOpen(isSuccess => {
          if (!isSuccess) this.go(config.yyb)
        })
      }
    }

    // Weibo
    if (Browser.isWb) {
      // 使用scheme唤起
      return this.tryCallApp(config.scheme)
      // 微博：唤起失败，也不跳转，会有引导功能
    }

    // Safari
    if (Browser.isSafari) {
      // 使用scheme唤起
      return this.tryCallApp(config.scheme)
    }

    // AndroidChrome
    if (Browser.isAndroidChrome) {
      // 使用scheme唤起
      return this.tryCallApp(config.scheme)
    }

    // Firefox
    if (Browser.isFirefox) {
      const version = this.getFirefoxVersion()

      this.tryCallApp(config.scheme)
      // 低于56版本，检测是否跳转成功
      if (version < 56) {
        this.checkOpen(isSuccess => {
          if (!isSuccess) this.go(config.download)
        })
      }
    }

    // 其他情况，先尝试跳转，失败则跳指定下载页
    this.tryCallApp(config.scheme).checkOpen(isSuccess => {
      if (!isSuccess) this.go(config.download)
    })
  }

  checkOpen () {
    let statue = false
    let count = 0

    const inter = setInterval(() => {
      count++
      statue = document.hidden || document.webkitHidden
      if (statue || count > 40) {
        cb(statue)
        clearInterval(inter)
      }
    }, 50)

    return this
  }

  tryCallApp (scheme) {
    if (!scheme) return this

    const aLink = document.createElement('a')
    const body = document.body
    aLink.href = scheme
    body.appendChild(aLink)
    aLink.click()

    return this
  }

  go (url) {
    if (url) window.location.href = url

    return this
  }
}

export default AppLinker