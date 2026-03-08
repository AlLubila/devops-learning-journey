const request = require('supertest');
const app = require('../src/app');
const taskModel = require('../src/models/taskModel');

jest.mock('../src/models/taskModel');

describe('Task API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /tasks', () => {
    it('creates a task and returns 201', async () => {
      const mockTask = {
        id: 1,
        title: 'Ship MVP',
        description: 'Prepare launch checklist',
        completed: false,
        created_at: '2026-03-06T10:00:00.000Z',
      };

      taskModel.createTask.mockResolvedValue(mockTask);

      const response = await request(app).post('/tasks').send({
        title: 'Ship MVP',
        description: 'Prepare launch checklist',
      });

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(mockTask);
      expect(taskModel.createTask).toHaveBeenCalledTimes(1);
    });

    it('returns 400 when title is missing', async () => {
      const response = await request(app).post('/tasks').send({ description: 'No title' });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toMatch(/title is required/i);
    });
  });

  describe('GET /tasks', () => {
    it('returns all tasks', async () => {
      const mockTasks = [
        { id: 1, title: 'A', description: '', completed: false, created_at: '2026-03-06T10:00:00.000Z' },
        { id: 2, title: 'B', description: 'desc', completed: true, created_at: '2026-03-06T10:10:00.000Z' },
      ];

      taskModel.getAllTasks.mockResolvedValue(mockTasks);

      const response = await request(app).get('/tasks');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockTasks);
      expect(taskModel.getAllTasks).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /tasks/:id', () => {
    it('updates a task and returns 200', async () => {
      const updatedTask = {
        id: 1,
        title: 'Updated title',
        description: 'Updated description',
        completed: true,
        created_at: '2026-03-06T10:00:00.000Z',
      };

      taskModel.updateTaskById.mockResolvedValue(updatedTask);

      const response = await request(app).put('/tasks/1').send({
        title: 'Updated title',
        description: 'Updated description',
        completed: true,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(updatedTask);
      expect(taskModel.updateTaskById).toHaveBeenCalledWith(1, {
        title: 'Updated title',
        description: 'Updated description',
        completed: true,
      });
    });

    it('returns 404 when task does not exist', async () => {
      taskModel.updateTaskById.mockResolvedValue(null);

      const response = await request(app).put('/tasks/999').send({ title: 'Nope' });

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toMatch(/not found/i);
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('deletes a task and returns 204', async () => {
      taskModel.deleteTaskById.mockResolvedValue(true);

      const response = await request(app).delete('/tasks/1');

      expect(response.statusCode).toBe(204);
      expect(taskModel.deleteTaskById).toHaveBeenCalledWith(1);
    });

    it('returns 404 when deleting missing task', async () => {
      taskModel.deleteTaskById.mockResolvedValue(false);

      const response = await request(app).delete('/tasks/999');

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toMatch(/not found/i);
    });
  });
});
