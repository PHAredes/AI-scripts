AI Scripts
===========

Este repositório contém um conjunto de scripts adaptados do [Taelin AI Script](https://github.com/VictorTaelin/AI-scripts) para uso diário, focados principalmente na modificação dos scripts originais do Taelin. Atualmente, isso suporta o Llama 3, Mixtral e Gemma por meio do Groq no Linux. Para suporte ao Windows e Mac ou acesso aos modelos relevantes da Anthropic e OpenAI, consulte o repositório original do Taelin.

- [AI Scripts](#ai-scripts)
  - [ChatSH](#chatsh)
    - [Comandos do CSH](#comandos-do-csh)
    - [Comportamento CSH](#comportamento-csh)
  - [Holefill](#holefill)
    - [Comportamento HF](#comportamento-hf)
    - [Uso do HF](#uso-do-hf)
    - [Integração do HF com o VSCode](#integração-do-hf-com-o-vscode)
  - [Requirements](#requirements)
    - [API Key Setup](#api-key-setup)
  - [Instalação](#instalação)

## ChatSH

Uma interface semelhante ao ChatGPT disponível no terminal.

### Comandos do CSH

- `chatsh <model>`

Modelos disponíveis:

- l: 'llama3-8b-8192'
- L: 'llama3-70b-8192'
- L2: 'llama2-70b-4096',
- m: 'mixtral-8x7b-32768',
- g: 'gemma-7b-it'

### Comportamento CSH

> [!CAUTION]
> NUNCA EXECUTE UM CÓDIGO QUE VOCÊ NÃO ENTENDE PLENAMENTE!!!

- Ao solicitar a execução de uma tarefa (escrever/modificar arquivos ou consultar APIs), o script gera um código de shell para a tarefa sem mais explicações. Você pode optar por executar o código gerado após revisão.
- Ao solicitar uma pergunta aberta, o script gera uma resposta de forma semelhante ao ChatGPT.

Às vezes, se a pergunta aberta for muito simples, o script fornecerá a resposta como um código de shell; afinal, AIs podem alucinar.

## Holefill

Ferramenta semelhante ao Copilot, não intrusiva, provavelmente inspirada por [typed holes](https://downloads.haskell.org/~ghc/7.10.1/docs/html/users_guide/typed-holes.html) presentes em linguagens como Lean, Agda e Kind.

### Comportamento HF

- Ele gera código assertivo para substituir todos os "buracos" (marcados como ??) dentro de um arquivo de código e aplica as alterações ao arquivo.
- Ele apenas substitui ?? por código, deixando o restante do arquivo intocado.

Observe que ele é capaz de gerar quantidades significativas de código; consulte o [script](holefill.mjs) para exemplos (este script é atribuído à constante `system`).

### Uso do HF

No seu arquivo, insira `??` onde você deseja que o script complete.

Em seguida, em um terminal de sua escolha, execute:

- `holefill <arquivo> <arquivo_reduzido> <modelo(opcional)>`

  - `<arquivo>`: O arquivo contendo os buracos a preencher; você pode usar tanto o caminho absoluto quanto o relativo (por exemplo, `./<nome_do_arquivo>`).
  - `<arquivo_reduzido>`: Uma versão reduzida do arquivo que pode excluir partes irrelevantes. Se estiver incerto, passe simplesmente o arquivo duas vezes como argumento; observe que isso é usado apenas como contexto para a tarefa.

Modelos disponíveis:

- `l`: 'llama3-8b-8192'
- `L`: 'llama3-70b-8192'
- `L2`: 'llama2-70b-4096'
- `m`: 'mixtral-8x7b-32768'
- `g`: 'gemma-7b-it'

Se nenhum modelo for especificado, ele usará `l` como padrão.

### Integração do HF com o VSCode

Você pode executar um script bash dentro do terminal do VSCode usando atalhos de teclado.

Para utilizar este script, adicione o seguinte ao seu arquivo `keybindings.json`:

```json
{
    "key": "alt+shift+;", // or any preferred keybind
    "command": "workbench.action.terminal.sendSequence",
    "args": {
      "text": "temp_file=$(mktemp) && echo '${selectedText}' > \"$PWD/tmpfileforholefill\"\u000Dholefill.mjs ${file} ./tmpfileforholefill\u000Drm tmpfileforholefill\u000D"
    },
    "when": "editorFocus && editorHasSelection"
  },
  {
    "key": "alt+shift+;", // or any preferred keybind
    "command": "workbench.action.terminal.sendSequence",
    "args": {
      "text": "holefill.mjs ${file} ${file}\u000D"
    },
    "when": "editorFocus && !editorHasSelection"
  }
```

Now, select the text relevant to fill a hole and press the keybind shortcut; it will create a temp file with the selected text and pass both the current file and the temp file as an argument to holefill, then it will delete the temp file

If no text is selected, it will use the whole current file as context (pass it twice to holefill)

## Requirements

- [Node.js](https://nodejs.org/pt/) na última versão estável
- [Git](https://git-scm.com/)
- Terminal a sua escolha
- [GroqCloud](https://console.groq.com), conta e chave

### API Key Setup

1. Siga a documentação do [GroqCloud Console](https://console.groq.com/docs/api-keys) para obter sua chave API
2. Defina uma variável de ambiente para a sua chave:

   `export GROQ_API_KEY=<your-api-key-here>`

   *Para que a chave persista, adicione o comando ao arquivo de configuração do seu shell*

   **zsh:**

   ```zsh
   echo "export GROQ_API_KEY=<your-api-key-here>" >> ~/.zshrc
   ```

   **bash:**

   ```bash
   echo "export GROQ_API_KEY=<your-api-key-here>" >> ~/.bashrc
   ```

## Instalação

```bash
git clone https://github.com/PHAredes/AI-scripts.git # Clone o repositório
cd AI-scripts # entra no diretorio
npm i # instala as dependências
chmod +x install.sh # torna install.sh um executável
./install.sh # executa o script de instalação
```
