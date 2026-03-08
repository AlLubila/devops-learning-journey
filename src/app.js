require('dotenv').config();

const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const { initializeDatabase } = require('./db/init');
const pool = require('./db');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = Number(process.env.PORT || 3000);

if (require.main === module) {
  initializeDatabase()
    .then(() => {
      app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Task API running on port ${PORT}`);
      });
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Failed to initialize database:', error.message);
      process.exit(1);
    });

  process.on('SIGINT', async () => {
    await pool.end();
    process.exit(0);
  });
}

module.exports = app;
