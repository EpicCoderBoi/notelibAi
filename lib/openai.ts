import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function generateImagePrompt(name: string) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an innovative and helpful AI assistant capable of generating interesting thumbnail descriptions. Your output will be fed into the DALL-E API to generate a thumbnail. The description should be modern, sleek and flat-styled",
        },
        {
          role: "user",
          content: `Please generate a thumbnail description for my notebook titled ${name}`,
        },
      ],
    });

    // Check if response is successful
    if (!response.ok) {
      throw new Error(`OpenAI API request failed with status: ${response.status}`);
    }

    const data = await response.json();

    // Check if 'choices' property is present
    if (!data.choices || data.choices.length === 0) {
      throw new Error("Unexpected response format from OpenAI API: 'choices' property is missing or empty.");
    }

    const image_description = data.choices[0].message.content;
    console.log(image_description);
    return image_description as string;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function generateImage(image_description: string) {
    try {
      const response = await openai.createImage({
            prompt: image_description,
            n: 1,
            size: '256x256'
      })
      const data = await response.json()
      const image_url = data.data[0].url
      return image_url as string
    } catch(error) {
      console.log(error);
    }
}