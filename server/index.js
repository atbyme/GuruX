// guru-server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: 'https://gurux-rho.vercel.app',
};

app.use(cors(corsOptions));

app.use(express.json());

// Health-Check Route
app.get('/', (req, res) => {
  res.send('✅ GuruX / KnowledgeFlow AI Server is running.');
});

// POST /api/ask – Handles both general and GuruX assistant queries
app.post('/api/ask', async (req, res) => {
  const { message, subject, className, question } = req.body;
  const userInput = question || message;

  if (!userInput || userInput.trim() === '') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const isGuruX = !!question;
  const systemPrompt = isGuruX
    ? {
        role: 'system',
        content:
          'You are HoloMentor, the AI holographic assistant of the GuruX app. Respond in a helpful, friendly, and knowledgeable manner.',
      }
    : null;

  const prompt = isGuruX
    ? userInput
    : `
${subject ? `Subject: ${subject}\n` : ''}
${className ? `Class: ${className}\n` : ''}
${userInput}
`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: isGuruX ? 'deepseek/deepseek-chat' : 'mistralai/mixtral-8x7b-instruct',
        messages: [
          ...(systemPrompt ? [systemPrompt] : []),
          { role: 'user', content: prompt },
        ],
        stream: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${isGuruX ? process.env.OPENROUTER_KEY_GURUX : process.env.OPENROUTER_KEY_KNOWLEDGEFLOW}`,
        },
      }
    );

    const aiResponse = response.data?.choices?.[0]?.message?.content || 'No response from AI.';
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('❌ OpenRouter API error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to fetch AI response. Please try again later.',
    });
  }
});

// POST /api/timeline – Generate learning timeline
app.post('/api/timeline', async (req, res) => {
  const { subject, className } = req.body;

  if (!subject || !className) {
    return res.status(400).json({ error: 'Subject and Class are required' });
  }

  try {
    const prompt = `Generate a detailed step-by-step learning timeline for the subject "${subject}" at the level "${className}". 
Each step should include a title, description, and estimated duration in minutes. Return the result as a JSON array.`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mixtral-8x7b-instruct',
        messages: [{ role: 'user', content: prompt }],
        stream: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENROUTER_KEY_KNOWLEDGEFLOW}`,
        },
      }
    );

    const aiText = response.data?.choices?.[0]?.message?.content || '';

    let timeline = [];
    try {
      timeline = JSON.parse(aiText);
    } catch (parseError) {
      console.warn('⚠️ Failed to parse timeline JSON, sending raw text');
      timeline = [
        {
          id: 0,
          title: 'Learning Timeline',
          description: aiText,
          duration: 'N/A',
        },
      ];
    }

    res.json({ timeline });
  } catch (error) {
    console.error('❌ OpenRouter API timeline error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to generate timeline. Please try again later.',
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 GuruX/KnowledgeFlow server running at http://localhost:${PORT}`);
});
