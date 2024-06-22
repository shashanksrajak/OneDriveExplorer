const app = require("express")();
const http = require('http');
require("dotenv").config();
const socketIo = require('socket.io');
const cors = require("cors");

app.use(cors({ origin: '*' }))

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*"
    }
});

const apiRoutes = require("./api/index");
const { azureListPermissions } = require("./libs/azure");
const logger = require("./libs/logger");

app.get("/health", (req, res, next) => {
    res.json({
        statusCode: 200,
        message: "Server is running healthy."
    })
})

app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Internal server error!');
});
// WebSocket connection for real-time updates
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    // Listen for the event and process the payload
    socket.on('updatePermissions', async (data) => {
        const { token, fileId } = data;
        // Simulated real-time update mechanism
        setInterval(async () => {
            const permissions = await azureListPermissions(token, fileId);
            socket.emit('permissionsUpdated', permissions);
        }, 10000); // Polling every 10 seconds for demo purposes
    });
});



module.exports = server;