import CadastroPage from '../pageobjects/cadastro.page'

describe('Funcionalidade: Cadastro', () => {

    beforeEach( async () => {
        //await browser.relaunchActiveApp()
        await browser.reloadSession()
        await CadastroPage.open()
    });

    it('Deve preencher o formulário com sucesso', async () => {
        await CadastroPage.preencherFormulario('teste@teste.com', '123456789', '123456789')
        await expect(CadastroPage.msgSucesso).toBeDisplayed()
        await browser.acceptAlert()
    });

    it('Deve validar mensagem de erro ao inserir email inválido', async () => {
        await CadastroPage.preencherFormulario('teste.teste.com', '123456789', '123456789')
        await expect(CadastroPage.msgErroEmail).toBeDisplayed()

    });

    it('Deve validar mensagem de erro ao inserir senhas diferentes', async () => {
        await CadastroPage.preencherFormulario('teste@teste.com', '987654321', '123456789')
        await expect(CadastroPage.msgErroConfirmaSenha).toBeDisplayed()

    });

    it('Deve validar mensagem de erro ao inserir senha com menos de 8 caracteres', async () => {
        await CadastroPage.preencherFormulario('teste@teste.com', '1234', '1234')
        await expect(CadastroPage.msgErroSenha).toBeDisplayed()
    });
    
});