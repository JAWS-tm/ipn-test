import express from "express";
import { validateIpn } from "./utils.js";

const router = express.Router();

router.post("/", express.raw({ type: "*/*" }), function (req, res) {
  res.status(200).send("OK");
  res.end();

  const body = req.body;
  console.log("IPN request body : ", req.body);

  const isValid = validateIpn(body);

  if (!isValid) {
    console.error("IPN invalid");
    return;
  }

  // Valid IPN => process content

  // Vérifier que le statut du paiement est "Completed"
  // if (body.payment_status === "Completed") {
  //   // Traiter le paiement
  //   console.log("Paiement reçu");
  // } else {
  //   console.log("Statut de paiement invalide");
  // }

  // if (body && Object.prototype.hasOwnProperty.call(body, "txn_id")) {
  //   console.log("2");
  // } else {
  //   console.log("IPN invalide");
  // }
});

export default router;
