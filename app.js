var app = app || {};

(function() {
    var router = Sammy(function () {

        var selector = "#selector";

        var requester = app.requester.config( 'kid_S1M3NSBU', '6121fe59e9ad4ecaac7158d0b94b54f1' );

        var userViewBag = app.userViews.load();
        var booksViewBag = app.booksViews.load();
    
        var userModel = app.userModel.load( requester );
        var booksModel = app.booksModel.load( requester );

        var userController = app.userController.load( userModel, userViewBag );
        var booksController = app.booksController.load( booksModel, booksViewBag );

        this.get('#/', function(){
            this.redirect('#/login');
        });

        this.get('#/login', function(){
            userController.showLogInPage(selector);
        });


        this.get('#/books', function(){
            booksController.showBooksPage(selector);
        });

        this.bind('redirectUrl', function(e, data){
            this.redirect(data.url);
        });

        this.bind('login', function(e, data){
            userController.logIn(data.username, data.password);
        });

        this.bind( 'add-book', function( e, data ){
            booksController.addBook( data );;
        });
       
       this.bind( 'show-add-book', function( e, data ){
            booksController.showAddBook( selector );;
        });
        

    });

    router.run('#/');
}());