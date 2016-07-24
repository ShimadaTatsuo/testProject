
var OnePageUrl = (function(){
    var  _idName    = ['urlBox', 'formMask'];
    var _attName   = ['data-page-id', 'data-service-name'];

    var OnePageUrl = function(){};
    OnePageUrl.prototype.displayShow = function(e){
        var elements;
        _showElement(elements);
        _adjustPosition(elements);
    };


    var _isArray = function(obj){
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    var _showElement = function(elm, property){
        if(_isArray(elm)){
            var num = elm.length
            for(var i=0; i<num; i++){
                elm[i].style.display = property;
            }
        }
        else{
            elm[i].style.display = property;
        }
    };

    var _adjustPosition = function(elm){
        var half   = window.innerHeight / 2;
        var scroll = document.body.scrollTop || document.documentElement.scrollTop;
        elm[0].style.top = (half + scroll) + "px";

        var h = document.documentElement.scrollHeight;
        elm[1].style.height = h + "px";
    };

    return new OnePageUrl();

})();

