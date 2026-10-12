import { config as shared } from './wdio.conf.js'

// Os valores abaixo podem ser trocados por variáveis de ambiente,
// assim cada pessoa usa o nome/versão do SEU emulador sem editar o código.
// Exemplo (PowerShell):
//   $env:ANDROID_DEVICE_NAME="Pixel_6"; $env:ANDROID_VERSION="14"; npm run wdio:android
export const config = {
    ...shared,
    specs: [
        '../test/specs/**/*.js'
    ],
    capabilities: [
        {
            "platformName": "Android",
            "appium:deviceName": process.env.ANDROID_DEVICE_NAME || "Medium Phone",
            "appium:automationName": "uiautomator2",
            "appium:app": "app/wdio.apk",
            "appium:platformVersion": process.env.ANDROID_VERSION || "9.0"
        }
    ]
}
