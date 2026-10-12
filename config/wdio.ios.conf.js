import { config as shared } from './wdio.conf.js'

export const config = {
    ...shared,
    specs: [
        '../test/specs/**/*.js'
    ],
    capabilities: [
        {
            platformName: 'iOS',
            'appium:app': './app/wdiodemoapp.app',
            'appium:deviceName': 'iPhone 16',
            'appium:platformVersion': '18.5',
            'appium:automationName': 'XCUITest'
        }
    ]
}