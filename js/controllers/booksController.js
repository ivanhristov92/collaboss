var app = app || {};

app.booksController = (function(){
    function BooksController( model, viewBag ){
        this._model = model;
        this._viewBag = viewBag;
    }

    BooksController.prototype.showBooksPage = function( selector ){
        var _this = this;
        this._model.getAllBooks()
            .then( function( res ){
                console.log( res );
                
                var result = {
                    books: []
                };

                res.forEach( function(book){
                    result.books.push( { title: book.title } );
                });

                _this._viewBag.showBooksPage( selector, result );
                
            }, function(err){
                console.log( err );
            });
    };

    BooksController.prototype.addBook = function( data ){
        this._model.addBook( data )
            .then( function( res ){
                console.log( res );
                Sammy( function(){
                    this.trigger('redirectUrl', { url: '#/books' });
                });
            }, function ( err ){ 
                console.log( err );
            });
    };

    BooksController.prototype.showAddBook = function(){
        this._viewBag.showAddBook( selector );
    };

        return {
            load: function( model, viewBag ){
                return new BooksController( model, viewBag );
            }
        };
    
}());