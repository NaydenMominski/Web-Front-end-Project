var homeController = function() {
    function getTenMovies() {
        const promise = new Promise((resolve, reject) => {
            const database = firebase.database().ref('/posts/');
            let landmarks = [];

            database.limitToFirst(10).on('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childData = childSnapshot.val();
                    childData.key = childSnapshot.key;
                    landmarks.push(childData);
                });
                resolve(landmarks);
            });
        });

        return promise;
    }

    function all(context) {

        templates.get('home')
            .then(function(template) {
                getTenMovies()
                    .then((landmarks) => {
                        console.log(landmarks);
                        context.$element().html(template(landmarks));
                    });
            });
    }
    return {
        all: all
    };
}();
