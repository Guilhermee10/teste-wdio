import { expect } from '@wdio/globals'

describe('Validar ambiente', () => {
    it('Deve validar se abre o app na opção Login', async () => {
        const loginBtn = await $('~Login')
        await loginBtn.click()

        // Asserção: se a tela de Login abriu, o campo de e-mail aparece.
        // (substitui o browser.pause, que só esperava tempo fixo sem validar nada)
        await expect($('~input-email')).toBeDisplayed()
    })
})
