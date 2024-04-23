AI Scripts
===========

em [pt-br](pt-br.md)

This repository contains a set of scripts adapted from [Taelin AI Script](https://github.com/VictorTaelin/AI-scripts) for daily usage, mainly focused on modifying Taelin's original scripts. This currently supports the Llama 3, Mixtral and Gemma through Groq on Linux. For Windows and Mac support or access to Anthropic and OpenAI relevant models, please refer to Taelin's original repository.

- [AI Scripts](#ai-scripts)
  - [ChatSH](#chatsh)
    - [CSH Commands](#csh-commands)
    - [CSH Behavior](#csh-behavior)
  - [Holefill](#holefill)
    - [HF Behavior](#hf-behavior)
    - [HF Usage](#hf-usage)
    - [HF VSCode Integration](#hf-vscode-integration)
  - [Requirements](#requirements)
    - [API Key Setup](#api-key-setup)
  - [Installation](#installation)


## ChatSH

A ChatGPT-like interface available in the terminal

### CSH Commands

- `chatsh <model>`

Avaliable models:

- l: 'llama3-8b-8192'
- L: 'llama3-70b-8192'
- L2: 'llama2-70b-4096',
- m: 'mixtral-8x7b-32768',
- g: 'gemma-7b-it'

### CSH Behavior

> [!CAUTION]
> NEVER RUN A CODE YOU DON'T FULLY UNDERSTAND!!!

- Upon request for task execution (writing/modifying files or querying APIs), the script generates a shell code for the task without further explanation. You can choose to run the generated code after review.
- Upon request for an open question, the script generates an answer similarly to ChatGPT

Sometimes if you open question is too small the script will provide you answer as a shell code; well, AIs can hallucinate

## Holefill

Non-intrusive copilot-like tool, probably drawns inspiration by [typed holes](https://downloads.haskell.org/~ghc/7.10.1/docs/html/users_guide/typed-holes.html) present in languages such as Lean, Agda and Kind

### HF Behavior

- It generates assertive code to replace all holes (marked as ??) within a code file and applies the changes to the file.
- It only replaces ?? with code, leaving the rest of the file untouched.

Note that it's capable of generating significant amounts of code; refer to the [script](holefill.mjs) for examples (this script is assigned to the const `system`)

### HF Usage

In your file, insert `??` wherever you want the script to complete.

Then in a terminal of your choice run:

- `holefill <file> <shortened_file> <model(optional)>`

  - `<file>`: The file containing the holes to fill; you can use either the absolute or relative path (e.g., `./<file_name>`).
  - `<shortened_file>`: A shortened version of the file that can exclude irrelevant parts. If uncertain, simply pass the file twice as an argument; note that this is used only as context for the task.

Available models:

- `l`: 'llama3-8b-8192'
- `L`: 'llama3-70b-8192'
- `L2`: 'llama2-70b-4096'
- `m`: 'mixtral-8x7b-32768'
- `g`: 'gemma-7b-it'

If no model is specified, it defaults to using `l`.

### HF VSCode Integration

You can run a bash script within the VSCode terminal using keybinding shortcuts.

To utilize this script, add the following to your `keybindings.json` file:

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

- [Node.js (last stable version)](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- A terminal of your choice
- [GroqCloud](https://console.groq.com) account

### API Key Setup

1. Follow the [API](https://console.groq.com/docs/api-keys) documentation to get your Groq API key
2. Set up an environment variable for the API key:

   `export GROQ_API_KEY=<your-api-key-here>`

   *For the API key to persist, add the command to your shell configuration file:*

   **zsh:**

   ```zsh
   echo "export GROQ_API_KEY=<your-api-key-here>" >> ~/.zshrc
   ```

   **bash:**

   ```bash
   echo "export GROQ_API_KEY=<your-api-key-here>" >> ~/.bashrc
   ```

## Installation

```bash
git clone https://github.com/PHAredes/AI-scripts.git #Clone the repository
cd AI-scripts # change to the repository directory
npm i # install dependencies
chmod +x install.sh # make install.sh an executable
./install.sh # run the install script
```
