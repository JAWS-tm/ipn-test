import bodyParser from "body-parser";
import express from "express";
import fs from "fs";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import router from "./ipn.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



const app = express();

app.use("/ipn", router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Logs : Génération de logs dans le fichier "access.log" à la racine
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

app.use(morgan("combined", { stream: accessLogStream }));

//Route test : requête get du serveur
app.get("/", function (req, res) {
  res.send("Bienvenue sur mon application !");
});


//ecoute des requetes POST à l'aide d'un listener
app.listen(3000, function () {
  console.log("Serveur démarré sur le port 3000");
});
