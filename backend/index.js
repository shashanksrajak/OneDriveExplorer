const server = require("./src/server");

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})