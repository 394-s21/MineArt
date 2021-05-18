const functions = require('firebase-functions');
const ResizeImages = require("./ResizeImages");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.resizeImages = functions.storage.object().onFinalize(ResizeImages);