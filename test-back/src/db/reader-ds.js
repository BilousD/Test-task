const fs = require('fs');
const csv = require('csv-parser');
const log = require('../../log').getLogger('READER.DS');

let data = [];
class ReaderDS {
    constructor() {
        fs.createReadStream('./src/db/movies.csv')
            .pipe(csv())
            .on('data', (d) => {
                data.push(d);
            })
            .on('end', () => {
                log.debug('File was read');
            })
            .on('error', (err) => {
                log.error('Failed to read csv file', err);
                process.exit(1);
            });
    }
    query(size = 10, from = 0, query, strict) {
        const result = [];
        for (const d of data) {
            if (query.year && !query.year.find(y => y === d.year)) {
                continue;
            }
            // continue if didnt find genres or if found 1 genre and only one needed
            if (strict && query.genres && !(query.genres.length === 1 && (query.genres.find(g => g.toLowerCase() === d.genre1.toLowerCase())
                || query.genres.find(g => g.toLowerCase() === d.genre2.toLowerCase()))) && !(query.genres.find(g => g.toLowerCase() === d.genre1.toLowerCase())
                && query.genres.find(g => g.toLowerCase() === d.genre2.toLowerCase())
            )) {
                continue;
            } else if (!strict && query.genres && !query.genres.find(g => d.genre1.toLowerCase().includes(g.toLowerCase())
                || d.genre2.toLowerCase().includes(g.toLowerCase()))) {
                continue;
            }
            result.push(d);
        }
        return {total: result.length, result: result.slice(from, from + size)};
    }
}
const readerDS = new ReaderDS();
module.exports = readerDS;
