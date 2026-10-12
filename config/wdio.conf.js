export const config = {
    // Executa os testes localmente.
    runner: 'local',

    // Porta padrão do servidor Appium.
    port: 4723,

    // Padrão dos arquivos de teste que serão executados.
    specs: [
        '../test/specs/**/*.js'
    ],

    // Lista de specs a excluir da execução.
    exclude: [
    ],

    // Quantidade máxima de sessões em paralelo.
    maxInstances: 1,

    // Nível de log exibido no console.
    logLevel: 'info',

    // Encerra a suíte após N falhas (0 = não encerra).
    bail: 0,

    // Timeout padrão dos comandos waitFor*.
    waitforTimeout: 10000,

    // Tempo limite para resposta de conexão/sessão.
    connectionRetryTimeout: 120000,

    // Número de tentativas de reconexão.
    connectionRetryCount: 3,

    // Serviços auxiliares usados durante a execução.
    services: ['appium'],

    // Framework de teste utilizado pelas specs.
    framework: 'mocha',

    // Relatórios exibidos no terminal e gerados em arquivo.
    reporters: ['spec', ['allure', { outputDir: 'allure-results' }]],

    // Opções globais de execução do Mocha.
    mochaOpts: {
        // Interface BDD com describe/it.
        ui: 'bdd',

        // Timeout máximo por teste (em ms).
        timeout: 60000
    },

    // Hook executado após cada teste finalizado.
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        // Captura screenshot automaticamente em caso de falha.
        if (!passed) {
            await browser.takeScreenshot();
        }
    },
}
