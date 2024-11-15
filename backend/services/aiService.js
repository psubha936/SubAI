
const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

const getAIResponse = async (message) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'nvidia/llama-3.1-nemotron-70b-instruct', 
      messages: [{ role: 'user', content: message }],
      temperature: 0.5,  // Control randomness
      top_p: 1,          // Top probability
      max_tokens: 1024,  // Max token limit
      stream: false,     // Use false for non-streaming response
    });
    return completion.choices[0]?.message?.content || 'No response from AI';

  } catch (error) {
    console.error('Error in getting AI response:', error);
    throw new Error('Failed to get response from AI API');
  }
};

module.exports = { getAIResponse }; 