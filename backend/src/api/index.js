const router = require("express").Router()
const onedriveRoutes = require("./onedrive/routes");

router.use("/v1/onedrive", onedriveRoutes);

module.exports = router;


