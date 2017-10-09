(function() {
    const sammyApp = Sammy('#content', function() {
        firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                console.log(firebaseUser);
                toastr.success('You Are Loged In');
                $('#btn-logout').show();
                $('#nav-login').hide();
                $('#nav-singUp').hide();
            } else {
                $('#btn-logout').hide();
                $('#nav-login').show();
                $('#nav-singUp').show();
            }
        });

        document.getElementById('btn-logout').addEventListener('click', (e) => {
            e.preventDefault();
            firebase.auth().signOut();
            toastr.warning('You are loged out');
            window.location = window.location.origin + '#/home';
        });

        this.get('#/', function() {
            this.redirect('#/home');
        });
        this.get('#/home', homeController.all);

        this.get('#/logout', usersController.logout);
        this.get('#/register', usersController.register);
        this.get('#/login', usersController.login);

        this.get('#/materials', materialsController.all);
        this.get('#/portfolio', materialsController.portfolio);
        this.get('#/materials/add', materialsController.add);

        this.get('#/materials/:id', materialsController.one);
    });

    $(function() {
        sammyApp.run('#/');
    });
}());
