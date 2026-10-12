class LoginPage {
    //Seletores
    get menuLogin() {
        return $('~Login')
    }
    get campoEmail() {
        return $('~input-email')
    }
    get campoSenha() {
        return $('~input-password')
    }
    get botaoLogin() {
        return $('~button-LOGIN')
    }
    get mensagem() {
        if (driver.isAndroid) {
            return $('id=android:id/message')
        }
        else {
            return $('//XCUIElementTypeStaticText[@name="You are logged in!"]')
        }
        
    }

    //Métodos / Ações 

    async abrirMenu() {
        await this.menuLogin.click()
    }

    async preencherLogin(email, senha) { 
        await this.campoEmail.clearValue()
        await this.campoEmail.setValue(email)
        await this.campoSenha.clearValue()
        await this.campoSenha.setValue(senha)
        await this.botaoLogin.click()
    }

    async mensagemAlerta() {
        return await this.mensagem.getText()
    }

    async mensagemErro(texto) {
        let elemento
        if (driver.isIOS) {
            elemento = $(`(//XCUIElementTypeStaticText[@name="${texto}"])[1]`)
        } else {
            elemento = $(`//android.widget.TextView[@text="${texto}"]`)
        }
        await expect(elemento).toHaveText(texto)
    }

    async reiniciarApp() {
        const packageName = await driver.getCurrentPackage()
        await driver.terminateApp(packageName)
        await driver.activateApp(packageName)
    }

}

export default new LoginPage()



