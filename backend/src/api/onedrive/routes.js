const router = require("express").Router();
const controllers = require("./controllers")

router.get("/files", controllers.listFiles);

router.get("/files/users", controllers.listUsers);

module.exports = router;