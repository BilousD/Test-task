const moviesDb = require('../services/movies-db');
const {writeResponseError} = require('../../errors');
const log = require('../../log').getLogger('CONTROLLER.MOVIES');

module.exports = {
    /**
     * Finds movies by query
     * Returns: successful operation
     */
    async findMovies(req, res) {
        try {
            let query = {
                years: req.swagger.params.years.value,
                genres: req.swagger.params.genres.value,
            }
            log.debug('controller findMovies', query);
            let result = await moviesDb.findMovies(req.swagger.params.size.value, req.swagger.params.from.value, query, req.swagger.params.strict.value);
            res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            const body = {data: result.result, status:{code: 200, message: 'successful'}, size: result.total};
            res.end(JSON.stringify(body));
            log.debug('response: %o', body);
        } catch (err) {
            log.error(err);
            writeResponseError(res, err);
        }
    }

}
