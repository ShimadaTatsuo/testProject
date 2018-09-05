// normal change css

var ex1 = $('.js-ex > div');

$GN({
    state: {
        id: 'example',
        color: '#1075bf'
    },
    update: function(state) {
        this.elm.css('background', state.color);
    }
}).setEntry(ex1);
