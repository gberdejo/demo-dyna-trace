/*app.js*/
const express = require("express");

const PORT = parseInt(process.env.PORT || "8080");
const app = express();

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get("/rolldice", (req, res) => {
  res.send(getRandomNumber(1, 6).toString());
});

app.post("/delayedPromise", (req, res) => {
  // Simulando una promesa que se resuelve después de un segundo
  const delayedPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("¡Promesa resuelta después de un segundo!");
    }, 1000);
  });

  delayedPromise.then((result) => {
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
