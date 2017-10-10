const data = (function() {
    function getAllMovies() {
        const promise = new Promise((resolve, reject) => {
            const database = firebase.database().ref('/posts/');
            let landmarks = [];

            database.on('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    let childData = childSnapshot.val();
                    childData.key = childSnapshot.key;
                    landmarks.push(childData);
                });
                resolve(landmarks);
            });
        });

        return promise;
    }

    function updatePost(posts, postId) {
        return firebase.database().ref('/posts/' + postId + '/comments').set(posts);
    }

    function writeNewPlace(todo, userId) {

        let postData = todo;

        // Get a key for a new Post.
        let newPostKey = firebase.database().ref().child('posts').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        let updates = {};
        updates['/posts/' + newPostKey] = postData;
        updates['/user-posts/' + userId + '/' + newPostKey] = postData;

        return firebase.database().ref().update(updates);
    }

    function getMovie(id) {
        return promise = new Promise((resolve, reject) => {
            const database = firebase.database().ref('/posts/');
            let landmark;

            database.on('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    let childData = childSnapshot.val();
                    childDataKey = childSnapshot.key;

                    if (childDataKey === id) {
                        landmark = childData;
                    }

                });
                resolve(landmark);
            });
        });
    }

    function getCurrentUserUserName() {
        return firebase.auth().currentUser.displayName;
    }

    function getCurrentUserAvatar() {
        return firebase.auth().currentUser.photoURL;

    }

    return {
        getAllMovies: getAllMovies,
        updatePost: updatePost,
        writeNewPlace: writeNewPlace,
        getMovie: getMovie,
        getCurrentUserUserName: getCurrentUserUserName,
        getCurrentUserAvatar: getCurrentUserAvatar
    };
}());
