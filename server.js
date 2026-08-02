require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const { filterCafes, sortByDistance } = require('./utils/filterCafes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const cafesPath = path.join(__dirname, 'data', 'cafes.json');

function loadCafes() {
  const raw = fs.readFileSync(cafesPath, 'utf-8');
  return JSON.parse(raw);
}

// GET /api/cafes?query=xyz&feature=wifi
app.get('/api/cafes', (req, res) => {
  const cafes = loadCafes();
  const { query = '', feature = 'all' } = req.query;
  res.json(filterCafes(cafes, { query, feature }));
});

// GET /api/cafes/near?lat=..&lng=..
app.get('/api/cafes/near', (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'lat and lng query params are required' });
  }
  const cafes = loadCafes();
  const sorted = sortByDistance(cafes, parseFloat(lat), parseFloat(lng));
  res.json(sorted);
});

// POST /api/ai-search { query: "quiet place with wifi near F-7" }
// asks Gemini to pick matching cafe ids from the free-text query, key stays server side
app.post('/api/ai-search', async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'query is required' });
  }
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not set on server' });
  }

  const cafes = loadCafes();
  // trim down what we send so we don't burn tokens on stuff the model doesn't need
  const trimmed = cafes.map(({ id, name, features, description, rating }) => ({
    id, name, features, description, rating,
  }));

  const prompt =
    `You are matching cafes to a user request. Cafes: ${JSON.stringify(trimmed)}. ` +
    `User wants: "${query}". Reply with ONLY a JSON array of matching cafe ids, ` +
    `most relevant first, nothing else. If nothing fits well, return the closest matches.`;

  try {
    const aiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent`,
      {
        method: 'POST',
        headers: {
          'x-goog-api-key': process.env.GEMINI_API_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await aiRes.json();

    // if Gemini returned an error (bad key, quota hit, bad model name, etc.)
    // surface it instead of quietly treating it as "no matches"
    if (data?.error) {
      console.error('gemini api error:', data.error);
      return res.status(502).json({ error: `AI request failed: ${data.error.message}` });
    }

    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '[]';
    // Gemini sometimes wraps JSON in ```json fences even when told not to,
    // strip those before parsing or JSON.parse blows up and we lose the whole result
    const cleaned = rawText.replace(/```json|```/g, '').trim();

    let ids = [];
    try {
      ids = JSON.parse(cleaned);
    } catch (e) {
      console.error('could not parse AI response as JSON:', rawText);
    }

    const matched = cafes.filter((c) => ids.includes(c.id));
    // preserve the order the model gave us
    matched.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));

    res.json(matched);
  } catch (err) {
    console.error('ai-search failed:', err.message);
    res.status(502).json({ error: 'AI search is unavailable right now' });
  }
});

app.listen(PORT, () => {
  console.log(`cafe finder backend running on http://localhost:${PORT}`);
});