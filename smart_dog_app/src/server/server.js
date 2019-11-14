const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "../../db.json"));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3006;
<<<<<<< HEAD
=======

const express = require("express");
const app = express();
>>>>>>> f690b32b38ebb219c967d2679676857d29163210

// Utilize Express to monitor the json server API
server.use(middlewares);
server.use("/", router);
server.listen(port, () => console.log(`Server started on port ${port}`));
<<<<<<< HEAD
// modify
=======
// //* modify
// console.log(path.join(__dirname, "../../build"));
// app.use(express.static(path.join(__dirname, "build")));
// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "../../build", "index.html"));
// });
>>>>>>> f690b32b38ebb219c967d2679676857d29163210
