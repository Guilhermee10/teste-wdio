# iOS Test Automation Project - Copilot Instructions

## Project Overview
This is an **iOS mobile test automation project** using **WebdriverIO v9** with Appium/XCUITest. It runs end-to-end tests against a **native iOS app** (wdiodemoapp.app) on iPhone simulator. The architecture follows the **Page Object Model** pattern.

## Architecture & Patterns

### Page Object Model (POM)
- **Page objects**: [LoginPage](test/pageobjects/login.page.js), [CadastroPage](test/pageobjects/cadastro.page.js), [FormPage](test/pageobjects/form.page.js) 
- Each page object:
  - Exports a singleton instance (`export default new LoginPage()`)
  - Defines selectors as getter methods using **accessibility IDs** (e.g., `get menuLogin() { return $('~Login'); }`)
  - Encapsulates page-specific interactions (e.g., `async preencherLogin(email, senha)` method)
- **Selector strategies**: 
  - Primary: Accessibility IDs with `~` prefix (e.g., `$('~input-email')`)
  - iOS-specific: iOS Predicate Strings for dynamic text matching (e.g., `` `-ios predicate string:label == "${texto}"` ``)

### Test Specifications
- **Location**: [test/specs/](test/specs/) directory
- **Test files**: `login.spec.js`, `cadastro.spec.js`, `form.spec.js`
- **Framework**: **Mocha** with BDD syntax (`describe`, `it`)
- Tests import page objects and use async/await
- **Example flow**: Login test → `loginPage.abrirMenu()` → `loginPage.preencherLogin()` → assertions with `expect()`

## Critical Developer Workflows

### Running Tests
```bash
npm run wdio
```
- Launches Appium service on port 4723
- Targets native iOS app on iPhone simulator (XCUITest automation)
- Timeout: 60 seconds per test (configurable in `mochaOpts.timeout`)

### Configuration Files
- **Main config**: [config/wdio.ios.conf.js](config/wdio.ios.conf.js)
- **App path**: `./app/wdiodemoapp.app`
- **Platform**: iOS (iPhone Simulator, XCUITest)
- **Reporter**: Spec reporter (human-readable console output)
- **Services**: Appium auto-management enabled (port 4723)
- **Max instances**: 1 (single device testing)
- **Retries**: Connection retry count = 3, timeout = 120s
- **Hooks**: `beforeTest` relaunches app before each test file

## Best Practices

### Coding Standards
1. **Async/await**: All driver interactions must be awaited
2. **Singleton pattern**: Each page object is a singleton instance exported as default
3. **Method naming**: 
   - Selectors use getter methods (e.g., `get btnSubmit()`)
   - Actions use async methods (e.g., `async preencherLogin()`)
4. **Assertions**: Use `expect` from WebdriverIO with matchers like:
   - `toBeDisplayed()`
   - `toHaveText()`
   - `toEqual()`
5. **Native app navigation**: Use menu clicks and app relaunch instead of URL navigation
6. **Accessibility IDs**: Primary locator strategy - use `~` prefix for accessibility identifiers
7. **App lifecycle**: Tests use `driver.relaunchApp()` in hooks to reset state between tests

## Adding New Tests

### Step-by-Step Process
1. **Create a new page object** in [test/pageobjects/](test/pageobjects/):
   - Define as a class extending base page (if applicable)
   - Define selectors as getters (using `~` for accessibility IDs)
   - Create interaction methods
   - Export singleton instance: `export default new YourPage()`

2. **Create test spec** in [test/specs/](test/specs/):
   - Use `describe()` and `it()` blocks
   - Import required page objects
   - Use hooks: `beforeEach()` for setup (menu navigation), `afterEach()` for cleanup (app relaunch)

3. **Run tests**:
   ```bash
   npm run wdio
   ```

### Example Structure
```javascript
// page object
class MyPage {
  get myElement() { return $('~my-element-id'); }
  async myAction() { await this.myElement.click(); }
}
export default new MyPage();

// test spec
import myPage from '../pageobjects/my.page';

describe('My Feature', () => {
  it('should perform my action', async () => {
    await myPage.myAction();
    await expect(myPage.myElement).toBeDisplayed();
  });
});
```

## Key Test Features
- **Login tests**: Email/password validation with success and error scenarios
- **Cadastro (Sign-up) tests**: Form validation with email format and password confirmation checks
- **Form tests**: Text input, switch toggle, dropdown selection, and alert handling
- **iOS-specific**: Uses iOS Predicate Strings for dynamic text matching in error messages

## External Dependencies
- **Appium XCUITest Driver** (v10.19.1) - iOS automation engine
- **WebdriverIO v9** - Test framework and runner
- **Mocha** - Test framework (BDD interface)
- **Node.js** - Runtime environment

## Project Structure
```
ios-modelo/
├── app/
│   └── wdiodemoapp.app          # iOS app under test
├── config/
│   ├── wdio.conf.js             # Base configuration
│   ├── wdio.ios.conf.js         # iOS-specific config
│   └── wdio.android.conf.js     # Android-specific config
├── test/
│   ├── pageobjects/             # Page Object Model files
│   │   ├── login.page.js
│   │   ├── cadastro.page.js
│   │   └── form.page.js
│   └── specs/                   # Test specification files
│       ├── login.spec.js
│       ├── cadastro.spec.js
│       └── form.spec.js
└── allure-results/              # Test execution reports
```

## Common Commands
- `npm run wdio` - Run all tests
- `npm test` - Alternative test command (if configured)
- `npx wdio run config/wdio.ios.conf.js` - Run with specific config

## Troubleshooting Tips
1. **Appium not starting**: Ensure Appium is installed and port 4723 is available
2. **Simulator not found**: Verify iOS simulator is installed and platform version matches config
3. **Element not found**: Check accessibility IDs in the app using Appium Inspector
4. **Timeout errors**: Increase timeout in config or use explicit waits
5. **App not launching**: Verify app path is correct and app is properly signed
