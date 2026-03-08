const pool = require('../db');

async function createTask({ title, description, completed = false }) {
  const query = `
    INSERT INTO tasks (title, description, completed)
    VALUES ($1, $2, $3)
    RETURNING id, title, description, completed, created_at;
  `;
  const values = [title, description || '', completed];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function getAllTasks() {
  const query = `
    SELECT id, title, description, completed, created_at
    FROM tasks
    ORDER BY created_at DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

async function updateTaskById(id, payload) {
  const query = `
    UPDATE tasks
    SET
      title = COALESCE($2, title),
      description = COALESCE($3, description),
      completed = COALESCE($4, completed)
    WHERE id = $1
    RETURNING id, title, description, completed, created_at;
  `;
  const values = [id, payload.title ?? null, payload.description ?? null, payload.completed ?? null];
  const { rows } = await pool.query(query, values);
  return rows[0] || null;
}

async function deleteTaskById(id) {
  const query = `
    DELETE FROM tasks
    WHERE id = $1
    RETURNING id;
  `;
  const { rowCount } = await pool.query(query, [id]);
  return rowCount > 0;
}

module.exports = {
  createTask,
  getAllTasks,
  updateTaskById,
  deleteTaskById,
};
