var app = app || {};

app.booksViews = (function(){


    function showBooksPage( selector, data ){
        $.get('templates/books-page.html', function( templ ){
            var rendered = Mustache.render(templ, data);
            $( selector ).html( rendered );
            $( '#addBook' ).on( 'click', function(){
                Sammy( function(){
                    this.trigger( 'show-add-book' );
                });
            });
        });
    }

    function showAddBook( selector ) {
        $.get( 'templates/show-add-book.html', function( templ ){
            $( selector ).html(templ);
            var btn = $( '#addBookButton' );
            var val;
            btn.on( 'click', function(){
                val = $( '#addBookInput' ).val();
                Sammy ( function(){
                    this.trigger( 'add-book', { name: val } );
                });
            });
        });
    }

    return {
        load: function(){
            return {
                showBooksPage: showBooksPage,
                showAddBook: showAddBook
            };
        }
    };
})();