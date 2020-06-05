document.addEventListener('DOMContentLoaded', function () {
  const app = firebase.app();
  console.log({ app });

  const db = firebase.firestore();

  const myPost = db.collection('posts').doc('firstpost');
  const myRealTimePost = db.collection('posts').doc('realtimepost');

  //to read once and be done with it
  myPost.get().then(doc => {
    const data = doc.data();
    console.log(`single read:`, data);
    document.getElementById('singleread').innerText =
      data.title + ': \n' + data.views;
  });

  //to be able to listen to any changes on the retrieved document
  myRealTimePost.onSnapshot(doc => {
    const data = doc.data();
    console.log(`real time stream:`, data);
    document.getElementById('realtimestream').innerText =
      data.title + ': \n' + data.views;
  });

  //Querying a collection
  const products = db.collection('products');

  // const query = products.orderBy('price', 'desc').limit(2);
  const query = products.orderBy('price', 'desc');
  // const query = products.where('price', '>', 5);

  query.onSnapshot(products => {
    const productsP = document.getElementById('products');
    productsP.innerText = '';
    products.forEach(doc => {
      p = doc.data();
      productsP.innerText += p.name + ': ' + p.price + '\n';
    });
  });
});

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      document.getElementById(
        'username'
      ).innerText = `Hello, ${user.displayName}`;
      console.log(user);
    })
    .catch(console.error);
}

function updatePost(e) {
  const db = firebase.firestore();
  const myRealTimePost = db.collection('posts').doc('realtimepost');
  myRealTimePost.update({ title: e.target.value });
}

function uploadFile(files) {
  const storage = firebase.storage().ref();
  const imgRef = storage.child('image.jpg');

  const file = files.item(0);

  const task = imgRef.put(file);
  task.then(snapshot => {
    console.log('snapshot', snapshot);

    const url = snapshot.ref.getDownloadURL().then(url => {
      console.log('url', url);
      document.getElementById('imgUpload').setAttribute('src', url);
    });
  });
}
