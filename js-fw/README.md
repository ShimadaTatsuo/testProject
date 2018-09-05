js-kari-fw
====

jqueryつらい人向けの緩和策

## Description
ある程度記述を固定にして、ある程度自由に

## Demo
ローカルで確認してね

## Requirement
jquery入れて使ってね

## Install
    $ npm install

## Usage
基本的にはローカルでサンプルを見てね

引数のオブジェクトに使えそうなプロパティ
- state プロパティ群
- action stateを変更する
- template テンプレート
- upadate stateを変更すると実行される

関数内部で使えそうなプロパティ
- this.state プロパティの設定値
- this.html テンプレートをdom化したもの
- this.elm 登録element
- this.target event target

シンプルなtodo例
```
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
    update: function(state) {
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
```

## Licence
特になし

## Author
aaa


今時ステータス管理とかしないし、two-way bindでしょ？
そんなものありません
ABテストなど、domを改変する事がある場合や、ステータスによって更新方法を変更したい場合に対応したい
複数の要素を複数のイベントで操作する場合、、がありまして、その産物
