const data = (function() {
    function getAllPlaces() {
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

    function getPlace(id) {
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

    function slides() {
        const $frames = $('#slide-main .slide-frame');
        const $left = $('#slide-main .slide-left-arrow');
        const $right = $('#slide-main .slide-right-arrow');
        const len = $frames.length;

        $left.click(function(ev) {
            moveFrames('left');
        });

        $right.click(function(ev) {
            moveFrames('right');
        });

        function moveFrames(dir) {
            for (let i = 0; i < len; i++) {
                const frame = $($frames[i]);
                const cls = frame.attr('class')
                    .split(' ')
                    .find(function(x) {
                        return (x.indexOf('frame-') >= 0);
                    });

                const num = +cls.split('-')[1];

                $(frame).removeClass(cls);

                if (dir === 'left') {
                    if (num === 0) {
                        $(frame).addClass('frame-' + (len - 1));
                    } else {
                        $(frame).addClass('frame-' + (num - 1));
                    }
                } else {
                    if (num === len - 1) {
                        $(frame).addClass('frame-' + 0);
                    } else {
                        $(frame).addClass('frame-' + (num + 1));
                    }
                }
            }
        }
    }

    return {
        getAllPlaces: getAllPlaces,
        updatePost: updatePost,
        writeNewPlace: writeNewPlace,
        getPlace: getPlace,
        getCurrentUserUserName: getCurrentUserUserName,
        getCurrentUserAvatar: getCurrentUserAvatar,
        slides: slides
    };
}());
