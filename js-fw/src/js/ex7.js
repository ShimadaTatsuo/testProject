// multi element combination

var multi = $('.js-multi-combination');
var number = multi.find('.js-select-number');
var numButton = multi.find('.js-number-button');
var fruits = multi.find('.js-select-fruits');
var display = multi.find('.js-display-box');
var listButton = multi.find('.js-parts-list');

$GN({
    state: {
        id: 'number',
        value: '0',
        display: 'none'
    },
    action: function(state) {
        state.value = number.val();
        state.display = 'block';
    },
    template: function() {
        return '<div><% VALUE %></div>';
    },
    update: function(state) {
        numButton.css('display', state.display);
        display.html(this.html);
    }
}).setEntry(number, 'change');

$GN({
    state: {
        id: 'fruits',
        value: 'apple'
    },
    action: function(state) {
        state.value = fruits.val();
    },
    template: function() {
        return '<div><% VALUE %></div>';
    },
    update: function(state) {
        display.html(this.html);
    }
}).setEntry(fruits, 'change');

$GN({
    state: {
        id: 'numButton',
        disabled: true,
        display: ''
    },
    action: function(state) {
        state.disabled = false;
        state.display = 'none';
    },
    update: function(state) {
        fruits.prop('disabled', state.disabled);
        numButton.css('display', state.display);
    }
}).setEntry(numButton, 'click');

$GN({
    state: {
        id: 'listButton',
        className: ''
    },
    action: function(state) {
        state.className = 'is-active';
    },
    update: function(state) {
        // index()は取得可能
        listButton.find('li').removeClass(state.className)
        this.target.addClass(state.className);
    }
}).setEntry(listButton, 'click | li');

