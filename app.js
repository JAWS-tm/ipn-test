import express from "express";
import morgan from "morgan";
import router from "./ipn.js";

const app = express();

// configure morgan
app.use(morgan("tiny"));

// app.use((req, res) => {
//   console.log(req.body);
// });

// configure parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/ipn", router);

//Route test : requête get du serveur
app.get("/", function (req, res) {
  res.send("Bienvenue sur mon application !");
});

// Turn on server
app.listen(3000, function () {
  console.log("Serveur démarré sur le port 3000");
});
