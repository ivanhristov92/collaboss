var app = app || {};

app.userViews = (function(){
    function showLogInPage(selector){

        $.get('templates/login.html', function(templ) {        
            $(selector).html(templ);
            $('#logIn').on('click', function(){
                Sammy(function(){
                    var username = $('#username').val();
                    var password = $('#password').val();
                    this.trigger('login', {username: username, password: password});
                });
            });
        });
    }

    

    return {
        load: function(){
            return {
                showLogInPage: showLogInPage
            };
        }
    };
})();