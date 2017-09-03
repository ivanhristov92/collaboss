var app = app || {};

app.userController = (function(){

    function UserController( model, viewBag ){
        this._model = model;
        this._viewBag = viewBag;
    }

    UserController.prototype.signIn = function( username, password ){
        this._model.signIn( username, password )
            .then(function( res ){
                    var auth = res._kmd.authtoken;
                    sessionStorage['authToken'] = auth;
                }, 
                function( err ){
                    console.log(err.responseText);
                });
    };

    UserController.prototype.logIn = function( username, password ){
        this._model.logIn( username, password )
            .then(function( res ){
                    console.log(res);
                    var auth = res._kmd.authtoken;
                    sessionStorage['authToken'] = auth;

                    Sammy(function(){
                        this.trigger('redirectUrl', {url: '#/books'});
                    });
                }, 
                function( err ){
                    console.log(err.responseText);
                });
    };

    UserController.prototype.logOut = function(){
        this._model.logOut()
            .then(function( res ){
                    sessionStorage.clear();
                }, 
                function( err ){
                    console.log('errrr', err.responseText);
                });
    };

    UserController.prototype.showLogInPage = function(selector){
        this._viewBag.showLogInPage(selector);
    };

    UserController.prototype.showBooksPage = function(selector){
        this._viewBag.showBooksPage(selector);
    };


    return {
        load: function( model, viewBag ){
           return new UserController( model, viewBag ); 
        }
    };
})();