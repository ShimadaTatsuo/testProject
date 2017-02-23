(function() {

    function extend(sub, sup) {
        sub.super_ = sup;
        var F = function F () {};
        F.prototype = sup.prototype;
        sub.prototype = new F();
        sub.prototype.constructor = sub;
    };

    // カスタムイベントオブジェクト
    function Events() {};

    Events.prototype.on = function(evName, func, elm) {
        this.elm = elm;
        this.elm.addEventListener(evName, func);
    };

    Events.prototype.trigger = function(evName) {
        var ev = document.createEvent('Event');
        ev.initEvent(evName, true, true);
        this.elm.dispatchEvent(ev);
    };


    // todo model
    function Todo() {};

    // todoにeventを継承
    extend(Todo, Events);

    Todo.prototype.set = function(data) {
        this.text = data.text;
    };

    // 新規追加メソッド
    Todo.add = function(text) {
        todo.set({text: text});
        (Todo.list = Todo.list || []).push(todo);
        todo.trigger('add');
    };

    var todo = new Todo();


    // todo 一覧管理
    function TodoFormView(elm) {
        var self = this;
        self.elm = elm;
        self.text = document.getElementById('text');
        self.elm.addEventListener('click', function() {
            self.onsubmit();
        });
    }

    // todo追加メソッド
    TodoFormView.prototype.onsubmit = function() {
        Todo.add(this.text.value);
    };

    // list view
    function TodoListView(list) {
        this.list = list;
        todo.on('add', this.add, this.list);
    }

    TodoListView.prototype.add = function() {
        var item = new TodoListItemView(todo);
        this.appendChild(item.text);
    }

    // todo要素を管理する
    function TodoListItemView(todo) {
        var li = document.createElement('li');
        var text = document.createTextNode(todo.text);
        li.appendChild(text);
        this.text = li;
    }

    // イベントハンドラ
    // TodoListItemView.prototype.onchangeCheckbox = function() {}

    new TodoFormView(document.getElementById('btn'));
    new TodoListView(document.getElementById('list'));

})();
