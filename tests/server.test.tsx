import { app } from '../server/api/index';
const request = require('supertest');


describe('Connect to various API endpoints', () => {
    test('GET /rates' , async () => {
        const response = await request(app).get('/api/rates');
        expect(response.statusCode).toBe(200);
    })
})