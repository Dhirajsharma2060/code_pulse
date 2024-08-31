const request = require('supertest');
const app = require('../src/server'); // Adjust the path if necessary

describe('POST /api/editorData', () => {
    it('should return a 200 status code', async () => {
        const response = await request(app)
            .post('/api/editorData')
            .send({ key: 'value' });
        
        expect(response.statusCode).toBe(200);
        // Add more assertions based on your API response
    });
});
