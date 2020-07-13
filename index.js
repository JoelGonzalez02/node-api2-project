const server = require('./data/server');

const PORT = 4000;

server.get('/', (req, res) => {
    res.send(
        `<h1>Welcome to the posts api!</h1>`
    )
})

server.listen(PORT, () => {
    console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`)
})