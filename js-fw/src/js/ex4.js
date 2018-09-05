// find each

var ex2 = $('.js-list > ul > li');

$GN({
    state: {
        id: 'ex2',
        text: {}
    },
    action: function(state) {
        state.text[this.key] = decodeURIComponent(this.val.data('example-li'));
    },
    update: function(state) {
        this.val.text(state.text[this.key]);
    }
}).setEntry(ex2, 'each');

