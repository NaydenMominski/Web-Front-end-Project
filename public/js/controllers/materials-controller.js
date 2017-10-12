let materialsController = (function() {

    function all(context) {

        templates.get('materials')
            .then(function(template) {
                data.getAllPlaces()
                    .then((landmarks) => {
                        console.log(landmarks);
                        context.$element().html(template(landmarks));
                    });
            });
    }

    function one(context) {
        let landmarkId = this.params.id;

        templates.get('matrial-details')
            .then(function(template) {
                data.getPlace(landmarkId)
                    .then((landmarks) => {

                        context.$element().html(template(landmarks));

                        $('.read-more-btn').click(function() {
                            $(this).parent().prev().toggleClass('crop-text');
                        });

                        $('#comment-submit').click(() => {
                            let today = new Date();

                            today = ((today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear());

                            console.log(today);
                            let comment = {
                                comment: $('#comment').val(),
                                date: today,
                                userName: data.getCurrentUserUserName(),
                                avatar: data.getCurrentUserAvatar() || '../../images/default-avatar.png'
                            };
                            // console.log(comment);
                            if (comment.comment) {
                                let comments = [];

                                if (landmarks.comments) {
                                    comments = landmarks.comments;
                                    comments.push(comment);
                                } else {
                                    comments.push(comment);
                                }
                                landmarks.comments = comments;
                                data.updatePost(comments, landmarkId)
                                    .then(() => {
                                        templates.get('comments')
                                            .then(function(t) {
                                                data.getPlace(landmarkId)
                                                    .then((place) => {
                                                        $('#comments-layer').html(t(place));

                                                        $('.read-more-btn').click(function() {
                                                            $(this).parent().prev().toggleClass('crop-text');
                                                        });

                                                    })
                                                    .then(() => {
                                                        toastr.success('comment Added!');
                                                        $('#comment').val('');
                                                    });

                                            })
                                            .catch((error) => console.log(error));
                                    });
                            }
                        });
                    });
            });
    }

    function add(context) {
        templates.get('material-add')
            .then(function(template) {
                context.$element().html(template());
                $('#btn-material-add').on('click', function() {
                    let today = new Date();
                    let options = { year: 'numeric', month: 'long', day: 'numeric' };
                    today = today.toLocaleDateString('en-US', options);
                    let newPlace = {

                        title: $('#tb-material-text').val(),
                        description: $('#tb-material-des').val(),
                        img: $('#tb-material-link').val() || '../../images/no-image-available.jpg',
                        date: today,
                        userName: data.getCurrentUserUserName()
                    };
                    let userId = firebase.auth().currentUser.uid;
                    data.writeNewPlace(newPlace, userId)
                        .then(() => {
                            toastr.success('Added!');
                            context.redirect('#/materials');
                        })
                        .catch((error) => console.log(error));
                });
            });
    }


    function portfolio(context) {
        const size = 2,
            page = +this.params.page || 0;

        templates.get('portfolio')
            .then(function(template) {
                data.getAllPlaces()
                    .then((data) => {

                        // pagination 

                        let pagesLen = Math.ceil(data.length / size),
                            pages = [],
                            currentPage = page + 1;

                        for (var i = 0; i < pagesLen; i += 1) {
                            pages.push({
                                page: i,
                                displayPage: i + 1
                            });
                        }

                        data = data.slice(page * size, (page + 1) * size);

                        let numberLinks = 5;
                        Handlebars.registerHelper('pagination', function(currentPage, totalPage, size, options) {
                            var startPage, endPage, context, totalPage;

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
                                endAtLastPage: false
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
}());
