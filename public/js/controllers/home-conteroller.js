var homeController = (function() {
    function getTenPlaces() {
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
                getTenPlaces()
                    .then((landmarks) => {
                        var sliders = landmarks.slice(0, 7);
                        console.log(sliders);
                        console.log(landmarks);
                        context.$element().html(template({ landmarks, sliders }));
                        data.slides();
                    });
            });
    }
    return {
        all: all
    };
}());
