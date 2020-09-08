const crudControllers = require("../../utils/crud");
const Post = require("./posts.model");

module.exports = crudControllers(Post);
