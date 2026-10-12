import { config as shared} from './wdio.conf.js'

export const config = {
    ...shared, 
        specs: [
        '../test/specs/**/*.js'
    ],
        capabilities: [
        {
            "platformName": "Android",
            "appium:uuid": "R9XWB01N95N",
            "appium:automationName": "uiautomator2",
            "appium:app": "app/wdio.apk",
            "appium:platformVersion": "14"
        }
    ]
}