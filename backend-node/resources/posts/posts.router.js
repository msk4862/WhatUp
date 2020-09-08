const express = require("express");
const controller = require("./posts.controllers");

const router = express.Router();

router
    .route("/")
    .get(controller.getMany)
    // .post(controller.createOne)

router
    .route("/:id")
    .get(controller.getMany)
    // .put(controller.updateOne)
    // .delete(controller.removeOne)

module.exports = router;