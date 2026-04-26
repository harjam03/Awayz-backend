import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const app = express();

// CORS (allow all for your project)
app.use(cors({ origin: '*' }));

app.use(express.json());

const API_URL = 'https://api.football-data.org/v4';

// Root route (so you can test if API is live)
app.get('/', (req, res) => {
  res.send('Awayz backend is running ');
});

// =============================
// Premier League Standings
// =============================
app.get('/api/v4/competitions/PL/standings', async (req, res) => {
  try {
    const response = await axios.get(
      `${API_URL}/competitions/PL/standings`,
      {
        headers: {
          'X-Auth-Token': process.env.API_KEY,
        },
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error('Standings error:', error.message);
    res.status(500).json({ error: 'API Request Failed' });
  }
});

// =============================
// Upcoming Fixtures
// =============================
app.get('/fixtures', async (req, res) => {
  try {
    const response = await axios.get(
      `${API_URL}/competitions/PL/matches?status=SCHEDULED`,
      {
        headers: {
          'X-Auth-Token': process.env.API_KEY
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error('Fixtures error:', error.message);
    res.status(500).json({ error: 'Fixture API request failed' });
  }
});

// =============================
// PORT (RENDER COMPATIBLE)
// =============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
