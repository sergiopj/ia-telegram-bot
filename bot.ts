import { Telegraf } from "telegraf";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN ?? "");

const responseText = async (prompt: string) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion(
      {
        model: "text-davinci-003",
        prompt,
        max_tokens: 2000,
      }
    );    
    return completion.data.choices[0].text;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

bot.on("text", async (ctx) => {
  const resText: any = await responseText(`${ctx.update.message.text}`);  
  ctx.reply(resText);  
});

bot.launch();
