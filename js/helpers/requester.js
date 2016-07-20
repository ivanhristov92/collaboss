var app = app || {};

app.requester = ( function(){

    function Requester( appKey, appSecret ){
        this.appKey = appKey;
        this.appSecret = appSecret;
        this.baseUrl = "https://baas.kinvey.com/";
    }

    Requester.prototype.makeRequest = function( type, url, data, useSession ){
        var deferred = Q.defer(),
            _this = this,
            token,
            options = {
                method: type,
                url: url,
                data: JSON.stringify(data),
                success: function( res ){
                    deferred.resolve( res );
                },
                error: function( err ){
                    deferred.reject( err );
                }
            };

        $.ajaxSetup({
            beforeSend: function( xhr, settings ){
                if(!useSession){
                    token = _this.appKey  + ':' +  _this.appSecret;
                    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(token));
                } else {
                    token = sessionStorage['authToken'];
                    xhr.setRequestHeader('Authorization', 'Kinvey ' + token);
                }
                
                if (data){
                    xhr.setRequestHeader('Content-Type', 'application/JSON');
                }
            }
        });

        $.ajax(options);

        return deferred.promise;
    };


    return {
        config: function( appKey, appSecret ){
            return new Requester( appKey, appSecret );
        }
    };
})();