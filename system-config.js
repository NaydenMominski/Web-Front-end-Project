'use strict'
System.config({
    transpiler: 'plugin-babel',
    map: {
        // System.js files
        'plugin-babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'text': 'node_modules/systemjs-plugin-text/text.js',

        // App files
        'app': 'js/app.js',
        'userController': 'js/controllers/userController.js',

        // Library files

        'jquery': 'node_modules/jquery/dist/jquery.js',
        'handlebars': 'node_modules/handlebars/dist/handlebars.min.js',
        'sammy': '/node_modules/sammy/lib/sammy.js',
        'toastr': "node_modules/toastr/toastr.js",
    }
});

System.import('app');
