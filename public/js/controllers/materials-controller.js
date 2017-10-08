var materialsController = function() {

    function getAllMovies() {
        const promise = new Promise((resolve, reject) => {
            const database = firebase.database().ref('/posts/');
            let landmarks = [];

            database.on('value', function(snapshot) {
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

    function getMovie(id) {
        return promise = new Promise((resolve, reject) => {
            const database = firebase.database().ref('/posts/');
            let landmark;

            database.on('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childData = childSnapshot.val();
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

    function all(context) {

        templates.get('materials')
            .then(function(template) {
                getAllMovies()
                    .then((landmarks) => {
                        console.log(landmarks);
                        context.$element().html(template(landmarks));
                    });
            });
    }

    function one(context) {
        let landmarkId = this.params['id'];

        templates.get('matrial-details')
            .then(function(template) {
                getMovie(landmarkId)
                    .then((landmarks) => {

                        context.$element().html(template(landmarks));

                        $('.read-more-btn').click(function() {
                            $(this).parent().prev().toggleClass("crop-text");
                        });

                        $('#comment-submit').click(() => {
                            let today = new Date();

                            today = ((today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear());


                            var comment = {
                                comment: $('#comment').val(),
                                date: today,
                                userName: getCurrentUserUserName(),
                                avatar: getCurrentUserAvatar()
                            };
                            console.log(comment);

                            let comments = [];

                            if (landmarks.comments) {
                                comments = landmarks.comments;
                                comments.push(comment);
                            } else {
                                comments.push(comment);
                            }
                            landmarks.comments = comments;

                            var userId = firebase.auth().currentUser.uid;

                            function updatePost(comment) {

                                let postData = comment;

                                // Get a key for a new Post.
                                var newPostKey = firebase.database().ref().child('posts').push().key;
                                let postId = landmarkId;
                                // Write the new post's data simultaneously in the posts list and the user's post list.
                                var updates = {};
                                updates['/posts/' + postId + '/comments'] = postData;
                                return firebase.database().ref('/posts/' + postId + '/comments').set(comments);
                            }

                            updatePost(comment)
                                .then(() => {
                                    templates.get('comments')
                                        .then(function(template) {
                                            getMovie(landmarkId)
                                                .then((landmarks) => {
                                                    $("#comments-layer").html(template(landmarks));

                                                    $('.read-more-btn').click(function() {
                                                        $(this).parent().prev().toggleClass("crop-text");
                                                    });

                                                })
                                                .then(() => {
                                                    toastr.success('comment Added!');
                                                    $('#comment').val('');
                                                });

                                        })
                                        .catch((error) => console.log(error));
                                });
                        });
                    });
            });
    };

    function add(context) {
        templates.get('material-add')
            .then(function(template) {
                context.$element().html(template());
                $('#btn-material-add').on('click', function() {
                    let today = new Date();
                    var options = { year: 'numeric', month: 'long', day: 'numeric' };
                    today = today.toLocaleDateString('en-US', options);
                    var todo = {

                        title: $('#tb-material-text').val(),
                        description: $('#tb-material-des').val(),
                        img: $('#tb-material-link').val(),
                        date: today,
                        userName: getCurrentUserUserName(),
                    };
                    var userId = firebase.auth().currentUser.uid;

                    function writeNewPost(todo) {

                        let postData = todo;

                        // Get a key for a new Post.
                        var newPostKey = firebase.database().ref().child('posts').push().key;

                        // Write the new post's data simultaneously in the posts list and the user's post list.
                        var updates = {};
                        updates['/posts/' + newPostKey] = postData;
                        updates['/user-posts/' + userId + '/' + newPostKey] = postData;

                        return firebase.database().ref().update(updates);
                    }

                    console.log(todo);
                    writeNewPost(todo)
                        .then(function(todo) {

                            toastr.success('Added!');
                            context.redirect('#/materials');
                        })
                        .catch((error) => console.log(error));
                });
            });
    }


    function portfolio(context) {
        size = 2,
            page = +this.params.page || 0,

            templates.get('portfolio')
            .then(function(template) {
                getAllMovies()
                    .then((data) => {

                        // pagination 

                        var pagesLen = Math.ceil(data.length / size),
                            pages = [],
                            currentPage = page + 1;

                        for (var i = 0; i < pagesLen; i += 1) {
                            pages.push({
                                page: i,
                                displayPage: i + 1
                            });
                        }

                        data = data.slice(page * size, (page + 1) * size);

                        var numberLinks = 5;
                        Handlebars.registerHelper('pagination', function(currentPage, totalPage, size, options) {
                            var startPage, endPage, context, totalPage = totalPage - 1;

                            if (arguments.length === 3) {
                                options = size;
                                size = 5;
                            }

                            startPage = currentPage - Math.floor(size / 2);
                            endPage = currentPage + Math.floor(size / 2);

                            if (startPage <= 0) {
                                endPage -= (startPage - 1);
                                startPage = 0;
                                endPage = endPage - 1;
                            }

                            if (endPage > totalPage) {
                                endPage = totalPage;
                                if (endPage - size + 1 > 0) {
                                    startPage = endPage - size + 1;
                                } else {
                                    startPage = 0;
                                }
                            }

                            context = {
                                startFromFirstPage: false,
                                pages: [],
                                endAtLastPage: false,
                            };
                            if (startPage === 0) {
                                context.startFromFirstPage = true;
                            }

                            for (var i = startPage; i <= endPage; i++) {
                                context.pages.push({
                                    page: i,
                                    display: i + 1,
                                    isCurrent: i === currentPage
                                });
                            }
                            if (endPage === totalPage) {
                                context.endAtLastPage = true;
                            }
                            return options.fn(context);
                        });

                        context.$element().html(template({
                            data: data,
                            pages: pages,
                            page: page,
                            pagesLen: pagesLen,
                            numberLinks: numberLinks,
                            currentPage: currentPage
                        }));
                    });
            });
    }
    return {
        all: all,
        add: add,
        one: one,
        portfolio: portfolio

    };
}();
