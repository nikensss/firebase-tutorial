const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendMessage = functions.firestore
  .document('products/{productid}')
  .onCreate((snapshot, context) => {
    console.log('snapshot: ', snapshot);
    console.log('context: ', context);
    console.log('resource: ', context.resource);
    const docID = snapshot.ref.id;
    // const docID = context.params.productid;
    console.log('ID:', docID);
    console.log('data: ', snapshot.data());
    const productRef = snapshot.ref;
    const name = snapshot.data().name;
    console.log('name:', name);

    return productRef.update({
      message: `Nice ${name}! You gotta love cloud functions`
    });
  });
