require('dotenv').config();
const server = require('./data/server');



const port = process.env.PORT || 5000;

server.get('/', (req, res) => {
    res.send(
        `<h1>Welcome to the posts api!</h1>`
    )
})

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`)
})