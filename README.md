# Projeto base com Appium + Webdriver.IO + iOS

Projeto base para estudos de automação mobile com iOS usando WebdriverIO + Appium.
A ideia é servir como ponto de partida para alunos evoluírem o framework com novas páginas, cenários e boas práticas.

## Pré-requisitos

### macOS (execução iOS)
- Node.js LTS
- npm
- Xcode instalado
- iOS Simulator disponível
- Appium (via dependências do projeto)

### Windows (execução Android)
- Node.js LTS
- npm
- Android Studio
- Android SDK configurado (`ANDROID_HOME` e `platform-tools` no `PATH`)
- Emulador Android criado e disponível
- Appium (via dependências do projeto)

> Observação: iOS só executa em macOS. Em Windows, o fluxo recomendado é Android.

## 1) Criar sua cópia do projeto (Fork ou Clone)

### Opção A: Fork (recomendado para alunos)
1. Faça um fork deste repositório no GitHub.
2. Clone o seu fork localmente:

```bash
git clone https://github.com/<SEU_USUARIO>/teste-wdio-ios-android.git
cd teste-wdio-ios-android
```

### Opção B: Clone direto
```bash
git clone https://github.com/EBAC-QE/teste-wdio-ios-android.git
cd teste-wdio-ios-android
```

## 2) Instalação
Instale as dependências do projeto:

```bash
npm install
```

## 3) Validar simuladores disponíveis
Mantenha estas dicas para conferir ambientes iOS instalados:

```bash
xcrun simctl list runtimes
xcrun simctl list devices
```

Se estiver no Windows/Android, valide dispositivos com:

```bash
adb devices -l
```

Para saber a versão do Android SDK:

```bash
adb shell getprop ro.build.version.release
```

## 4) Baixar o app (APK) e colocar na pasta `app/`
O app fica fora do Git (`app/` está no `.gitignore`).

1. Baixe o APK Android na página de releases: https://github.com/webdriverio/native-demo-app/releases
2. Crie a pasta `app/` na raiz do projeto.
3. Salve o arquivo como `app/wdio.apk` (é o caminho usado em `config/wdio.android.conf.js`).

## 5) Executar os testes no emulador Android
Abra o emulador pelo Android Studio (Device Manager) e confira se ele aparece:

```bash
adb devices -l
```

O nome e a versão do emulador ficam em `config/wdio.android.conf.js`. Se os seus forem diferentes de
"Medium Phone" / Android 9.0, passe-os por variável de ambiente (PowerShell):

```powershell
$env:ANDROID_DEVICE_NAME="Pixel_6"
$env:ANDROID_VERSION="14"
npm run wdio:android
```

Em dispositivo real (conectado por USB com depuração ativada), ajuste o `uuid` em
`config/wdio.android-real.conf.js` e rode:

```bash
npm run wdio:android-real
```

## 6) Executar teste por arquivo
```bash
npx wdio run ./config/wdio.android.conf.js --spec test/specs/cadastro.spec.js
```

## Estrutura do projeto
- `config/`: configurações do WebdriverIO (base, Android, Android real, iOS).
- `test/pageobjects/`: Page Objects (`login.page.js`, `cadastro.page.js`) com seletores e ações da tela.
- `test/specs/`: cenários de teste (login, cadastro e validação de ambiente), sem seletores soltos.
- Seletores: `accessibilityId` (`~`) como padrão; `id` e `xpath` apenas onde o app não expõe accessibilityId (alertas e mensagens do Android).

## Referência do aplicativo base WebdriverIO
https://github.com/webdriverio/native-demo-app

## Próximos passos para evolução (alunos)
- Criar novos cenários em `test/specs`.
- Evoluir Page Objects em `test/pageobjects`.
- Melhorar assertions e tratamento de waits para reduzir flaky tests.
- Organizar massa de dados e preparar estrutura para execução futura em Android.