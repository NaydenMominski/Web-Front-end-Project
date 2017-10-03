(function(){
    var sammyApp = Sammy('#content', function(){
        this.get('#/', function(){
            this.redirect('#/home')
        });
        this.get('#/home', homeController.all);
        
        this.get('#/login', usersController.login);
        this.get('#/register', usersController.register);
        
        this.get('#/materials', materialsController.all);
        this.get('#/materials/add', materialsController.add);
        
        this.get('#/materials/:id', materialsController.one);
    })
    
    $(function(){
        sammyApp.run('#/');
    })
}());