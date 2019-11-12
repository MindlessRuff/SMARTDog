const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "../../db.json"));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3006;

// Utilize Express to monitor the json server API
server.use(middlewares);
server.use("/", router);
server.listen(port, () => console.log(`Server started on port ${port}`));
// modify
