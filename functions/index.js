const functions = require("firebase-functions");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const { createRequestHandler } = require("@remix-run/express");

exports.app = functions.https.onRequest(createApp());

function createApp() {
  let app = express();
  app.use(compression());
  app.use(
    express.static("public", {
      immutable: true,
      maxAge: "1y",
    })
  );
  app.use(morgan("tiny"));
  app.all("*", createRequestHandler({ build: require("./build") }));
  return app;
}