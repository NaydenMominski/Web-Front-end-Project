(function() {
    // Initialize Firebase
    var config = {
        apiKey: 'AIzaSyCLzNe_qQiro6RcFmbcry4neOzEDNVKCXA',
        authDomain: 'my-test-6cbfa.firebaseapp.com',
        databaseURL: 'https://my-test-6cbfa.firebaseio.com',
        projectId: 'my-test-6cbfa',
        storageBucket: 'my-test-6cbfa.appspot.com',
        messagingSenderId: '185113493869'
    };
    firebase.initializeApp(config);

    //test firebase
    const dbRefObject = firebase.database().ref().child('obj');
    dbRefObject.on('value', snap => console.log(snap.val()));
}());
