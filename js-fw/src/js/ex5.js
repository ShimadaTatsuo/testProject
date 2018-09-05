// ajax
// ajaxの場合だけactionでデータ取得処理を行う必要がある

var ajax = $('.js-ajax');

$GN({
    state: {
        id: 'ajax',
        res: {}
    },
    action: function(state) {
        var self = this;
        var load = function(res) {
            self.state.res = res;
        };
        var fail = function(res) {
            console.log('error');
        };
        $.when(self.crossGet('http://localhost:3001/json/test.json', {})).then(load, fail);
    },
    update: function(state) {
        ajax.html(state.res.head.status);
    }
}).setEntry(ajax, 'ajax');

