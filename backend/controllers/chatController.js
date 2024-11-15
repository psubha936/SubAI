
const { getAIResponse } = require('../services/aiService');

// Controller for handling chat requests
const handleChatRequest = async (req, res, next) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    console.log(userMessage)
    const response = await getAIResponse(userMessage);
    res.json({ message: response });
  } catch (error) {
    next(error); // Pass errors to the error handler middleware
  }
};

module.exports = {
  handleChatRequest
};
