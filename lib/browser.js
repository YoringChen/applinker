const navigator = window.navigator || {}
const UA = navigator.userAgent
const AppVersion = navigator.appVersion

class Browser {
  static isAndroid = !!UA.match(/Android/i)
  static isQQ = /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d.]+)/.test(UA) || /\bV1_AND_SQI?_([\d.]+)(.*? QQ\/([\d.]+))?/.test(UA)
  static isIOS = !!UA.match(/iPhone|iPad|iPod/i)
  static isSafari = /iPhone|iPad|iPod\/([\w.]+).*(safari).*/i.test(UA)
  static isWx = !!UA.match(/micromessenger/i)
  static isWb = !!UA.match(/weibo/i)
  static isAndroidChrome = !!(UA.match(/Chrome\/([\d.]+)/) || UA.match(/CriOS\/([\d.]+)/)) && isAndroid && !isQQ
  static isQZ = UA.indexOf('Qzone/') !== -1
  static isFirefox = !!UA.match(/[F|f]irefox\/([\d.]+)/)
  
  constructor () {}

  static getIOSVersion () {
    const ver = AppVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
    const version = parseInt(ver[1], 10)

    return +version
  }

  static getFireFoxVersion () {
    const version = (UA.match(/[F|f]irefox\/([\d.]+)/) || [])[1]

    return +version
  }
}

export default Browser