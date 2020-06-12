const express = require("express");

const projectRouter = require("../routers/project-router");
const resourceRouter = require("../routers/resource-router");
const taskRouter = require("../routers/task-router");
const newtaskRouter = require("../routers/newtask-router");

const server = express();

server.use(express.json()); ///<<<< need to be on top - don't forget

server.use("/api/project", projectRouter);
server.use("/api/resource", resourceRouter);
server.use("/api/task", taskRouter);
server.use("/api/newtask", newtaskRouter);

module.exports = server;
