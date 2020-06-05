document.addEventListener('DOMContentLoaded', function () {
  const app = firebase.app();
  console.log({ app });

  const db = firebase.firestore();

  const myPost = db.collection('posts').doc('firstpost');
  myPost.get().then(doc => {
    const data = doc.data();
    console.log(data);
    document.body.append(data.title + ': ');
    document.body.append(data.views);
  });
});

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      document.write(`Hello, ${user.displayName}`);
      console.log(user);
    })
    .catch(console.error);
}
