import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import webRouter from "./routes/web";

let app = express();
let PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);

webRouter(app);

app.listen(PORT, () => {
    console.log(`App is running at the port ${PORT}`);
});
