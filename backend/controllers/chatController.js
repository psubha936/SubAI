
const { getAIResponse } = require('../services/aiService');
const developerQuestions = [
  'Who developed you',
  'who is developed you',
  'who created you',
  'who made you',
  'developer of you',
  'creator of you',
  'who is your developer',
  'who coded you',
  'who built you',
  'who programmed you',
  'who designed you',
  'who invented you',
  'your developer name',
  'your creator',
  'who is your maker',
  'who is your creator',
  'made by whom',
  'who is the brain behind you',
  'developer details',
  'creator details',
  'who architected you',
  'who engineered you',
  'creator information',
  'developer information',
  'who owns you',
  'who constructed you',
  'your designer',
  'your engineer'
];

const developerResponse = {
  message: `It seems you're asking about my creator. I was developed by Subhaprakash Nayak. Here's a quote: "Innovation distinguishes between a leader and a follower." - Subhaprakash Nayak. You can connect with him on LinkedIn: [Subhaprakash Nayak](https://www.linkedin.com/in/subhaprakash-nayak)`
};
// Controller for handling chat requests
const handleChatRequest = async (req, res, next) => {
  const userMessage = req.body.message;
  const isDeveloperQuestion = developerQuestions.some((question) =>
    userMessage.toLowerCase().includes(question.toLowerCase())
  );

  if (isDeveloperQuestion) {
    return res.json(developerResponse);
  }
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
