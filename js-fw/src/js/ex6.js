// ajax template

var ajax2 = $('.js-ajax-list');

$GN({
    state: {
        id: 'ajax2',
        res: []
    },
    action: function() {
        var self = this;
        var load = function(res) {
            self.state.res = res.response.table_list;
        };
        var fail = function(res) {
            console.log('error');
        };
        $.when(self.crossGet('http://localhost:3001/json/test.json', {})).then(load, fail);
    },
    template: function() {
        return '<li><% RES | name %></li>';
    },
    update: function() {
        ajax2.append(this.html);
    }
}).setEntry(ajax2, 'ajax');

