var app = app || {};

app.booksModel = (function(){
    function BooksModel( requester ){
        this._requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appKey + '/books';
    }

    BooksModel.prototype.getAllBooks = function(){
        return this._requester.makeRequest( 'GET', this.serviceUrl, null, true );
    };

    BooksModel.prototype.addBook = function( data ){ 
        return this._requester.makeRequest( 'POST', this.serviceUrl, { title: data.name }, true );
    };

    return {
        load: function( requester ){
            return new BooksModel( requester );
        }
    };
})();