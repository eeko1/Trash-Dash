import request from 'supertest';
import express from 'express';
import router from '../index.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use('/', router);

describe('API Routes', () => {
  describe('GET /wastetypes', () => {
    it('should return waste types', async () => {
      const response = await request(app).get('/wastetypes');
      expect(response.status).toBe(200);
    });
  });
  describe('GET /recyclingmethods', () => {
    it('should return waste types', async () => {
      const response = await request(app).get('/recyclingmethods');
      expect(response.status).toBe(200);
    });
  });
  describe('GET /wastepages', () => {
    it('should return waste types', async () => {
      const response = await request(app).get('/wastepages');
      expect(response.status).toBe(200);
    });
  });
  describe('GET /wastepages/:id', () => {
    it('should return waste types', async () => {
      const testId = '409';
      const response = await request(app).get(`/wastepages/${testId}`);
      expect(response.status).toBe(200);
    });
  });
  describe('GET /search', () => {
    it('should return waste types', async () => {
      const response = await request(app).get('/search');
      expect(response.status).toBe(200);
    });
  });
});
