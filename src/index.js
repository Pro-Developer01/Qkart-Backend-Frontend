const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

let server;

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port
// mongoose
//   .connect("mongodb://127.0.0.1:27017/qkart")
//   .then((res) => {})
//   .catch((err) => console.log("err", err));
// app.listen(8082, () => console.log("listenning"));

const port = config.port;

mongoose 
.connect(config.mongoose.url, config.mongoose.options)
.then(() => {
    console.log("Connected to database")
    server = app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    })
})
.catch((err) => console.log(err));
