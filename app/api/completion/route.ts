import {Configuration, OpenAIApi} from "openai-edge"
import { OpenAIStream, StreamingTextResponse } from "ai"

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
    const {prompt} = await req.json();
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `You are a helpful AI embedded embedded in a text editor app that is used to autocomplete sentences
                      You possess expert knowledge, tight articulation, creativity, and profound intellect 
                      You are professional, courteous and extremely helpful
                      You are very friendly, inspiring and wise`,
            },
            {
                role: "user",
                content: `I am writing a piece of text in a text editor app.
                          Help me complete my train of thought here: ##${prompt}##
                          Keep the tone of the text consistent with the rest of the text.
                          Keep the response concise yet meaningful.`,
            },
        ],
        stream: true
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}