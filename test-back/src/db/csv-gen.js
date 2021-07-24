// generate movie list csv file
const csvWriter = require('csv-writer').createObjectCsvWriter({
    path: './src/db/movies.csv',
    header: [
        {id: 'id', title: 'id'},
        {id: 'name', title: 'name'},
        {id: 'genre1', title: 'genre1'},
        {id: 'genre2', title: 'genre2'},
        {id: 'year', title: 'year'},
    ]
});
const genresNum = 14;
function generateNum() {
    const a = Math.floor(1 + Math.random() * genresNum);
    let b = Math.floor(1 + Math.random() * genresNum);
    while (b === a) {
        b = Math.floor(1 + Math.random() * genresNum);
    }
    return [a,b];
}
const data = [];
for (let i = 0; i < 1000000; i++) {
    let movie = {id: i, name: 'Movie ' + i}
    movie.year = Math.floor(1970 + Math.random() * 51);
    let [a,b] = generateNum();
    movie.genre1 = 'Genre' + a;
    movie.genre2 = 'Genre' + b;
    data.push(movie);
}
csvWriter.writeRecords(data)
    .then(() => console.log('The CSV file was written successfully'));
