// guru-server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Whitelist of allowed origins (frontend URLs)
const whitelist = [
  'https://gurux-rho.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
];

// CORS options with dynamic origin check
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      // Allow non-browser requests like Postman, curl
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

// Health-Check Route
app.get('/', (req, res) => {
  res.send('✅ GuruX / KnowledgeFlow AI Server is running.');
});

// Helper: simple input validation
function validateString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

// POST /api/ask – Handles both general and GuruX assistant queries
app.post('/api/ask', async (req, res) => {
  const { message, subject, className, question } = req.body;
  const userInput = question || message;

  if (!validateString(userInput)) {
    return res.status(400).json({ error: 'Message or question is required' });
  }

  const isGuruX = !!question;

  if (!isGuruX) {
    if (subject && !validateString(subject)) {
      return res.status(400).json({ error: 'Invalid subject' });
    }
    if (className && !validateString(className)) {
      return res.status(400).json({ error: 'Invalid className' });
    }
  }

  const systemPrompt = isGuruX
    ? {
        role: 'system',
        content:
          'You are HoloMentor, the AI holographic assistant of the GuruX app. Respond in a helpful, friendly, and knowledgeable manner.',
      }
    : null;

  const prompt = isGuruX
    ? userInput
    : `Subject: ${subject || ''}\nClass: ${className || ''}\n${userInput}`;

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
          Authorization: `Bearer ${
            isGuruX ? process.env.OPENROUTER_KEY_GURUX : process.env.OPENROUTER_KEY_KNOWLEDGEFLOW
          }`,
        },
        timeout: 15000,
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

  if (!validateString(subject) || !validateString(className)) {
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
        timeout: 15000,
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

// POST /api/sparkhub – Idea feedback and suggestions
app.post('/api/sparkhub', async (req, res) => {
  const { idea } = req.body;

  if (!validateString(idea)) {
    return res.status(400).json({ error: 'Idea is required' });
  }

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mixtral-8x7b-instruct',
        messages: [
          {
            role: 'system',
            content:
              'You are a creative and practical assistant. When a user shares an idea, give brief and helpful feedback, suggestions, or inspiration related to that idea. Give in approx 6-7 points nice.',
          },
          {
            role: 'user',
            content: `Here’s an idea: "${idea}". What do you think about it?`,
          },
        ],
        stream: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENROUTER_KEY_GURUX}`,
        },
        timeout: 15000,
      }
    );

    const reply = response.data?.choices?.[0]?.message?.content || 'No insight generated.';
    res.json({ reply });
  } catch (error) {
    console.error('❌ OpenRouter API error (SparkHub):', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to generate insight from AI. Please try again later.',
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 GuruX/KnowledgeFlow server running at http://localhost:${PORT}`);
});
