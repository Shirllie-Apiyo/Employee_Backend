const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")
const cors = require("cors")


mongoose
    .connect("mongodb://localhost:27017/emp_db", { useNewUrlParser: true })
    .then(() => {
        const app = express()
        app.use(cors({
            origin: 'http://localhost:4200'
        }));
        app.use(express.json())
        app.use("/api", routes)
        app.listen(5000, () => {
            console.log("Server Running at http://127.0.0.1:5000")
        });
    });