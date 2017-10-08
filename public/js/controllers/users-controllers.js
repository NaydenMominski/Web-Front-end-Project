var usersController = function() {


    //Get Elements

    function authentication(context) {
        templates.get('register')
            .then(function(template) {
                context.$element().html(template());

                //Get Elements
                const emailField = document.getElementById('tb-email');
                const passField = document.getElementById('tb-password');
                const usernameField = document.getElementById('tb-username');
                const avatarField = document.getElementById('tb-avatar');
                const btnRegister = document.getElementById('btn-register');

                //Add Signup event
                btnRegister.addEventListener('click', e => {
                    e.preventDefault();
                    //Get Email & Pass
                    const email = emailField.value;
                    const pass = passField.value;
                    const username = usernameField.value;
                    const avatar = avatarField.value;

                    let user;
                    firebase.auth().createUserWithEmailAndPassword(email, pass)
                        .then(function() {
                            user = firebase.auth().currentUser;
                            // user.sendEmailVerification();
                        })
                        .then(function() {
                            user.updateProfile({
                                displayName: username,
                                photoURL: avatar
                            });
                        })
                        .catch(e => toastr.error(e.message));

                    window.location = window.location.origin + '#/home';
                });

                // })
            });
    };

    function login(context) {
        templates.get('login')
            .then(function(template) {
                context.$element().html(template());

                const emailField = document.getElementById('tb-email');
                const passField = document.getElementById('tb-password');
                const btnLogin = document.getElementById('btn-login');

                //Add Login event
                btnLogin.addEventListener('click', e => {
                    e.preventDefault();
                    //Get Email & Pass
                    const email = emailField.value;
                    const pass = passField.value;
                    const auth = firebase.auth();
                    //Sign In
                    const promise = auth.signInWithEmailAndPassword(email, pass);
                    promise.catch(e => toastr.error(e.message));
                    window.location = window.location.origin + '#/home';
                });
            });
    };
    return {
        register: authentication,
        login: login
    };
}();
