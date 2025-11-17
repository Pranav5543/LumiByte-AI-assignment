import express from 'express';
import cors from 'cors';
import { mockAnswers, sessions, getRandomAnswer, generateSessionId } from './mockData.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());


function getAnswerForQuestion(question) {
  question = question.toLowerCase();

  // Smartphones (index 0)
  if (question.includes("smartphone") || question.includes("phone") || question.includes("market share") || question.includes("shipment") || question.includes("samsung") || question.includes("apple") || question.includes("xiaomi")) {
    return mockAnswers[0];
  }

  // Renewable energy (1)
  if (question.includes("renewable") || question.includes("solar") || question.includes("wind") || question.includes("hydro") || question.includes("energy") || question.includes("china") || question.includes("usa") || question.includes("india")) {
    return mockAnswers[1];
  }

  // Financial markets (2)
  if (question.includes("financial") || question.includes("market") || question.includes("index") || question.includes("stock") || question.includes("s&p") || question.includes("nasdaq") || question.includes("nifty") || question.includes("ftse") || question.includes("nikkei")) {
    return mockAnswers[2];
  }

  // Health (3)
  if (question.includes("health") || question.includes("disease") || question.includes("recovery") || question.includes("cases") || question.includes("influenza") || question.includes("dengue") || question.includes("malaria") || question.includes("covid") || question.includes("tuberculosis")) {
    return mockAnswers[3];
  }

  // E-commerce (4)
  if (question.includes("ecommerce") || question.includes("e-commerce") || question.includes("amazon") || question.includes("platform") || question.includes("revenue") || question.includes("flipkart") || question.includes("alibaba") || question.includes("walmart") || question.includes("shopify")) {
    return mockAnswers[4];
  }

  // Sports (5)
  if (question.includes("sports") || question.includes("football") || question.includes("player") || question.includes("goals") || question.includes("assists") || question.includes("haaland") || question.includes("mbappe") || question.includes("kane") || question.includes("messi")) {
    return mockAnswers[5];
  }

  // Cybersecurity (6)
  if (question.includes("cybersecurity") || question.includes("threat") || question.includes("phishing") || question.includes("ransomware") || question.includes("malware") || question.includes("ddos") || question.includes("breach")) {
    return mockAnswers[6];
  }

  // Employment (7)
  if (question.includes("employment") || question.includes("job") || question.includes("sector") || question.includes("salary") || question.includes("demand") || question.includes("software") || question.includes("cybersecurity") || question.includes("data science") || question.includes("healthcare")) {
    return mockAnswers[7];
  }

  // Agriculture (8)
  if (question.includes("agriculture") || question.includes("crop") || question.includes("production") || question.includes("wheat") || question.includes("rice") || question.includes("corn") || question.includes("soybean") || question.includes("potato")) {
    return mockAnswers[8];
  }

  // AI adoption (9)
  if (question.includes("ai") || question.includes("artificial intelligence") || question.includes("adoption") || question.includes("industry") || question.includes("finance") || question.includes("healthcare") || question.includes("retail") || question.includes("manufacturing") || question.includes("education")) {
    return mockAnswers[9];
  }

  // fallback random answer
  return getRandomAnswer();
}


app.get('/', (req, res) => {
  res.json({ message: 'LumiByte AI Backend API', status: 'running' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/sessions', (req, res) => {
  const sessionsList = sessions.map(session => ({
    sessionId: session.sessionId,
    title: session.title,
    createdAt: session.createdAt,
    messageCount: session.messages.length
  }));

  res.json(sessionsList);
});


app.post('/api/new-chat', (req, res) => {
  const newSessionId = generateSessionId();
  const newSession = {
    sessionId: newSessionId,
    title: 'New Chat',
    createdAt: new Date().toISOString(),
    messages: []
  };

  sessions.push(newSession);
  res.json({ sessionId: newSessionId });
});


app.get('/api/session/:id', (req, res) => {
  const { id } = req.params;
  const session = sessions.find(s => s.sessionId === id);

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  res.json(session);
});

app.post('/api/chat/:id', (req, res) => {
  const { id } = req.params;
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  const session = sessions.find(s => s.sessionId === id);

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  // Add user message
  const userMessage = {
    type: 'user',
    question,
    timestamp: new Date().toISOString(),
    feedback: null
  };
  session.messages.push(userMessage);

  // Add bot response (correct answer)
  const botMessage = {
    type: 'bot',
    answer: getAnswerForQuestion(question),
    timestamp: new Date().toISOString(),
    feedback: null
  };
  session.messages.push(botMessage);

  // Update session title on first message
  if (session.messages.length === 2) {
    session.title = question.length > 40 ? question.substring(0, 40) + "..." : question;
  }

  res.json(session.messages);
});

app.put('/api/chat/:id/feedback', (req, res) => {
  const { id } = req.params;
  const { messageIndex, feedback } = req.body;

  if (messageIndex === undefined || !feedback) {
    return res.status(400).json({ error: 'messageIndex and feedback are required' });
  }

  const session = sessions.find(s => s.sessionId === id);

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  if (!session.messages[messageIndex]) {
    return res.status(400).json({ error: 'Invalid message index' });
  }

  session.messages[messageIndex].feedback = feedback;

  res.json(session.messages);
});

app.delete('/api/sessions', (req, res) => {
  try {
    sessions.length = 0; // Clear all sessions
    res.json({ message: 'All chat history deleted successfully' });
  } catch (error) {
    console.error('Error deleting chat history:', error);
    res.status(500).json({ error: 'Failed to delete chat history' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  GET    /api/sessions`);
  console.log(`  POST   /api/new-chat`);
  console.log(`  GET    /api/session/:id`);
  console.log(`  POST   /api/chat/:id`);
  console.log(`  PUT    /api/chat/:id/feedback`);
  console.log(`  DELETE /api/sessions`);
});
