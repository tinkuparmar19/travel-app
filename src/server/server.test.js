const server = require('./server.js')

    describe('Test, the function "fetchCityData()" should exist' , () => {
        test('It should return true', () => {
            expect('fetchCityData').toBeDefined();
        });
    });