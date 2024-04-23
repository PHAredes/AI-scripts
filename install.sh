#!/bin/bash

echo "Choose your shell (zsh/bash):"
read -r SHELL

for f in *.mjs; do
  chmod +x "$f"
done

# Get the current directory
DIR="$(pwd)"

# Add the current directory to the PATH for the chosen shell
case $SHELL in
  zsh) echo "export PATH=\"\$PATH:$DIR\"" >> ~/.zshrc ;;
  bash) echo "export PATH=\"\$PATH:$DIR\"" >> ~/.bashrc ;;
  *) echo "Invalid shell choice" ;;
esac
