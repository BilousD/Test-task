const Code = require('@hapi/code');
const expect = Code.expect;
const api = require('axios').create({
    baseURL: 'http://localhost:3000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer cdcba59b-7701-4322-ad57-bf86b927f218'
    }
});
describe('Test movies controller',()=>{
    it('findMovies', async ()=>{
        let result = await api.get('/movies?size=0&from=0&genre=foobar&year=0');
        result = result.data;
        expect(result).to.exist();
    });

});