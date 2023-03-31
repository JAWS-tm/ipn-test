import express from "express";
import axios from "./node_modules/axios/index.js";

const router = express.Router();

router.post("/", function (req, res) {
  // Vérifier que la notification provient de PayPal
  const body = req.body;
  console.log("IPN request : ", req.body);

  res.sendStatus(200).end();


  if (body && Object.prototype.hasOwnProperty.call(body, "txn_id")) {
    console.log("2");

    let data = "cmd=_notify-validate";
    Object.keys(body).map((key) => {
      data += `&${key}=${body[key]}`;
    });

    // Envoyer une requête de vérification à PayPal
    axios
      .post("https://ipnpb.sandbox.paypal.com/cgi-bin/webscr", data, {
        headers: {
          "Content-Length": data.length,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.substring(0, 8) === "VERIFIED") {
          // Vérifier que le statut du paiement est "Completed"
          if (body.payment_status === "Completed") {
            // Traiter le paiement
            console.log("Paiement reçu");
          } else {
            console.log("Statut de paiement invalide");
          }
        } else {
          console.log("IPN invalide");
        }
      });
  } else {
    console.log("IPN invalide");
  }

});

export default router;
