const { azureListFiles, azureListPermissions } = require("../../libs/azure");
const logger = require("../../libs/logger");


exports.listFiles = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({ message: "Not authorised." })
        }

        const token = authHeader.split(" ")[1]
        const data = await azureListFiles(token);
        res.json(data)
    } catch (error) {
        logger.error('Error from listFiles');
        logger.error(error);
        next(error)
    }
}

exports.listUsers = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({ message: "Not authorised." })
        }

        const token = authHeader.split(" ")[1]
        const itemId = req.query.itemId;

        if (!itemId) {
            return res.status(400).json({ message: "itemId is required." })
        }

        const permissions = await azureListPermissions(token, itemId);
        res.json(permissions)
    } catch (error) {
        logger.error('Error from listFiles');
        logger.error(error);
        next(error);
    }
}