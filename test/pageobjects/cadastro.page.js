class CadastroPage {
    // Seletores
    get menuLogin() { return $('~Login') }
    get menuSignUp() { 
        if (driver.isAndroid) {
            return $('//android.widget.TextView[@text="Sign up"]')
        }
        return $('~Sign up') 
    }
    get campoEmail() { return $('~input-email') }
    get campoSenha() { return $('~input-password') }
    get campoConfirmaSenha() { return $('~input-repeat-password') }
    get btnCadastrar() { 
        if (driver.isAndroid) {
            return $('//android.widget.TextView[@text="SIGN UP"]')
        } else {    
            return $('~SIGN UP') }
    }
    get msgSucesso () { 
        if (driver.isAndroid) {
            return $('//android.widget.TextView[@resource-id="android:id/alertTitle"]')
        } else {
        return $('~Signed Up!')}
        
    }
    get msgErroEmail () {
        if (driver.isAndroid) {
            return $('//android.widget.TextView[@text="Please enter a valid email address"]')
        } else {        
                return $('~Please enter a valid email address')}
    }
    get msgErroConfirmaSenha () {
        if (driver.isAndroid) {
            return $('//android.widget.TextView[@text="Please enter the same password"]')
        } else {    
        return $('~Please enter the same password')}
    }
    get msgErroSenha () {   
        if (driver.isAndroid) {
            return $('//android.widget.TextView[@text="Please enter at least 8 characters"]')
        } else {
            return $('~Please enter at least 8 characters')
        }
    }

    // Ações
    async open() {
        await this.menuLogin.click()
        console.log('Clicou no menu Login')
        await this.menuSignUp.click()
        console.log('Clicou no menu Sign Up')
    }

    async preencherFormulario(email, senha, confirmarSenha) {
        await this.campoEmail.clearValue()
        //await this.campoEmail.setValue(email)
        await this.campoEmail.addValue(email) //Outra forma de preencher 

        await this.campoSenha.clearValue()
        await this.campoSenha.addValue(senha)

        await this.campoConfirmaSenha.clearValue()
        await this.campoConfirmaSenha.addValue(confirmarSenha)

        await this.btnCadastrar.click()
    }



}

export default new CadastroPage()