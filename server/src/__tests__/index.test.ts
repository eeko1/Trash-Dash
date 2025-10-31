import request from 'supertest';
import express from 'express';
import router from '../router.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use('/', router);

describe('API Routes', () => {
  describe('GET /wastetypes', () => {
    it('should return waste types', async () => {
      const response = await request(app).get('/wastetypes?lang=en');
      console.log(response.body)
      expect(response.status).toBe(200);
    });
  });
   describe('GET /wastetypes/:types', () => {
    it('should return waste types', async () => {
      const response = await request(app).get('/wastetypes/search=plastic?lang=en');
      console.log(response.body)
      expect(response.status).toBe(200);
    });
  });
  describe('GET /recyclingmethods', () => {
    it('should return waste types', async () => {
      const response = await request(app).get('/recyclingmethods?lang=en');
      console.log(response.body)
      expect(response.status).toBe(200);
    });
  });
    describe('GET /recyclingmethods/:method', () => {
    it('should return waste types', async () => {
      const response = await request(app).get('/recyclingmethods/search=Pharmacy?lang=en');
      console.log(response.body)
      expect(response.status).toBe(200);
    });
  });
  describe('GET /wastepages', () => {
    it('should return waste types', async () => {
      const response = await request(app).get('/wastepages?lang=en');
      console.log(response.body)
      expect(response.status).toBe(200);
    });
  });
  describe('GET /wastepages/:id', () => {
    it('works with both optional params', async () => {
      const response = await request(app).get('/wastepages/409?lang=en');
      console.log(response.body)
      expect(response.status).toBe(200);
    });
  });

  describe('GET /search/:q/:wastetype/:recyclingMethod', () => {
    it('should return waste types', async () => {
      const response = await request(app).get('/search/plastic?lang=en&wasteType=181&recyclingMethod=178');
      console.log(response.body)
      expect(response.status).toBe(200);
    });
      it('works with only recyclingMethod', async () => {
      const response = await request(app).get('/search/plastic?lang=en&recyclingMethod=178');
      console.log(response.body)
      expect(response.status).toBe(200);
    });
      it('works with only wasteType', async () => {
      const response = await request(app).get('/search/plastic?lang=en&wasteType=181');
      console.log(response.body)
      expect(response.status).toBe(200);
    });
  });
});
