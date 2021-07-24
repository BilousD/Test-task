const Code = require('@hapi/code');
const expect = Code.expect;
const dao = require('../../src/services/movies-db');

describe('Test movies-db', ()=>{
    it('findMovies', async ()=>{
        let result = await dao.findMovies(0, 0, "foobar", 0);
        expect(result).to.exist();
    });

});