const pool = require('./index');

const createTasksTableQuery = `
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT '',
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  );
`;

async function initializeDatabase() {
  await pool.query(createTasksTableQuery);
}

module.exports = {
  initializeDatabase,
};
