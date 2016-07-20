var app = app || {};

app.userModel = (function(){

    function UserModel( requester ){
        this._requester = requester;
        this.serviceUrl = requester.baseUrl + 'user/' + requester.appKey;
    }

    UserModel.prototype.signIn = function( username, password ){
        return this._requester.makeRequest( 'POST', this.serviceUrl, {username: username, password: password} );
    };

    UserModel.prototype.logIn = function( username, password ){
        return this._requester.makeRequest( 'POST', this.serviceUrl + '/login', {username: username, password: password} );
    };
    
    UserModel.prototype.logOut = function(){
        return this._requester.makeRequest( 'POST', this.serviceUrl + '/_logout' );
    };

    return {
        load: function ( requester ){
            return new UserModel (  requester );
        }
    };

   

})();