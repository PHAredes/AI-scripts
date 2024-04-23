import { Groq } from "groq-sdk";
import { encode } from "gpt-tokenizer/esm/model/davinci-codex"; // tokenizer

// Map of model shortcodes to full model names
export const MODELS = {
  l: 'llama3-8b-8192',
  L: 'llama3-70b-8192'
};

// Utility function to read the Groq API token
async function getGroqToken() {
  return process.env.GROQ_API_KEY;
}

// Factory function to create a stateful asker
export function asker() {
  const messages = [];

  // Asker function that maintains conversation state
  async function ask(userMessage, { system, model, temperature = 0.0, max_tokens = 4096 }) {
    model = MODELS[model] || model;
    const isGroq = model.startsWith('llama', 'mixtral');

    let client;
    if (isGroq) {
      client = new Groq({ apiKey: await getGroqToken() });
    } else {
      throw new Error(`Unsupported model: ${model}`);
    }

    if (messages.length === 0) {
      messages.push({ role: "system", content: system });
    }

    messages.push({ role: "user", content: userMessage });

    const params = {
      system: undefined,
      model,
      temperature,
      max_tokens,
      stream: true,
    };

    let result = "";

   if (isGroq) {
      params.messages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const stream = await client.chat.completions.create(params);

      //await fs.writeFile(".fill.json.tmp", JSON.stringify(params,null,2));

      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || "";
        process.stdout.write(text);
        result += text;
      }
    }

    messages.push({ role: 'assistant', content: result });

    return result;
  }

  return ask;
}

export function token_count(inputText) {
  // Encode the input string into tokens
  const tokens = encode(inputText);

  // Get the number of tokens 
  const numberOfTokens = tokens.length;

  // Return the number of tokens
  return numberOfTokens;
}
