import axios from "axios";

export const validateIpn = async (body) => {
  if (!body || Object.keys(body).length === 0) return false;

  // Construct validate request body
  let data = "cmd=_notify-validate";
  Object.keys(body).map((key) => {
    data += `&${key}=${body[key]}`;
  });
  // console.log("data:", data);

  // Send validate request
  const response = await axios
    .post("https://ipnpb.sandbox.paypal.com/cgi-bin/webscr", data, {
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": data.length,
      },
    })
    .catch((err) => err);

  console.log("Validate response : ", response.data);

  if (response.status === 200 && response.data.substring(0, 8) === "VERIFIED") {
    console.log("Validate IPN : OK");
    return true;
  } else {
    console.error("Validate IPN : error");
    return false;
  }
};
