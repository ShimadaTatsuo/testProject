// sample todo list

var input = $('.js-box').find('input');
var button = $('.js-box').find('button');
var result = $('.js-box').find('.js-result');

$GN({
    state: {
        id: 'list',
        text: ''
    },
    action: function(state) {
        state.text = input.val();
    },
    template: function() {
        return '<li><input type="checkbox" class="js-checkbox"><% TEXT %></li>';
    },
    update: function() {
        result.append(this.html);
    }
}).setEntry(button, 'click');

$GN({
    state: {
        id: 'checkbox',
        color: ''
    },
    action: function(state) {
        if (this.target.prop('checked') === true) {
            state.color = '#eeeeee';
        } else {
            state.color = '#ffffff';
        }
    },
    update: function(state) {
        var li = this.target.parent();
        li.css('background', state.color);
    }
}).setEntry(result, 'click | input');

