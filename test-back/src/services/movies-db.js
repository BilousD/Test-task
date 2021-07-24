const readerDS = require('../db/reader-ds');
const log = require('../../log').getLogger('SERVICE.MOVIES');

class MoviesDb {
    /**
     * Finds movies by query
     */
    async findMovies(size, from, query, strict) {
        let result;
        log.debug(`findMovies with query ${query}`);
        result = readerDS.query(size, from, query, strict);
        return result;
    }

}

const moviesDb = new MoviesDb()
module.exports = moviesDb;
