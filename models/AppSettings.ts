interface IAppSettingsParams {
  allowNsfwImages: boolean
  apiKey: string
  enableNoSleep: boolean
  runInBackground: boolean
  saveInputOnCreate: boolean
  useBeta: boolean
  useTrusted: boolean
}

class AppSettings {
  allowNsfwImages: boolean
  apiKey: string
  enableNoSleep: boolean
  runInBackground: boolean
  saveInputOnCreate: boolean
  useBeta: boolean
  useTrusted: boolean

  constructor(params: IAppSettingsParams) {
    const {
      allowNsfwImages = false,
      apiKey = '',
      enableNoSleep = false,
      runInBackground = false,
      saveInputOnCreate = false,
      useBeta = false,
      useTrusted = true
    } = params

    this.allowNsfwImages = Boolean(allowNsfwImages)
    this.apiKey = String(apiKey)
    this.enableNoSleep = Boolean(enableNoSleep)
    this.runInBackground = Boolean(runInBackground)
    this.saveInputOnCreate = Boolean(saveInputOnCreate)
    this.useBeta = Boolean(useBeta)
    this.useTrusted = Boolean(useTrusted)
  }

  static get(item: string) {
    const data = this.load()

    return data[item]
  }

  static load() {
    try {
      const string = localStorage.getItem('appConfig') || ''
      const data = JSON.parse(string)

      return data
    } catch (err) {
      return {}
    }
  }

  static save(key: string, val: any) {
    const data = this.load()
    data[key] = val
    this.saveAll(data)
  }

  static saveAll(params: IAppSettingsParams) {
    try {
      // Save version in case we update settings params at a later time.
      const data = { v: '1', ...params }
      const string = JSON.stringify(data)
      localStorage.setItem('appConfig', string)
    } catch (err) {
      localStorage.setItem('appConfig', '{}')
    }
  }
}

export default AppSettings
