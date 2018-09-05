// multi element change css

var ex3 = $('.js-multi-div > div');

$GN({
    state: {
        id: 'ex3',
        padding: 16
    },
    update: function(state) {
        this.elm.css('padding-left', state.padding);
    }
}).setEntry(ex3);

