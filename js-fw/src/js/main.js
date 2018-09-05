// actionはeventに属する動作
// actionはあくまでstatusの変更のみ
// updateはstate changeした場合だけ実行されるもの

window.$ = require('jquery');
window.$GN = function(obj){ return new $GN.prototype.init(obj); };

$GN.prototype.init = function(obj){
    this.num = 0;
    $.each(obj, function(key, val) {
        this['set' + key.charAt(0).toUpperCase() + key.slice(1)](val);
    }.bind(this));
    return this;
};

$GN.prototype.setState = function(stateObj){
    var self = this;
    self.state = $.extend(true, {}, stateObj);
    $.each(self.state, function(key, val) {
        Object.defineProperty(self.state, key, (function () {
            var res = self.state[key];
            return {
                get: function () {
                    return res;
                },
                set: function (value) {
                    res = value;
                    self.render();
                },
                enumerable: true,
                configurable: true
            };
        })());
    });
    return this;
};
$GN.prototype.setAction = function(func){
    this.action = func;
    return this;
};
$GN.prototype.setUpdate = function(func){
    this.update = func;
    return this;
};
$GN.prototype.setEntry = function(elm, ev){
    this.elm = elm;
    if (ev) {
        if (ev === 'each') {
            this.loopAction();
        } else if (ev === 'ajax') {
            this.action();
        } else {
            if (~ev.indexOf(' | ')) {
                var arr = ev.split(' | ');
                elm.on(arr[0], arr[1], this.normalAction());
            } else {
                elm.on(ev, this.normalAction());
            }
        }
    } else {
        // eventがセットされていない = actionが必要ない // そのまま実行
        this.render();
    }
    return this;
};

$GN.prototype.normalAction = function(){
    var self = this;
    return function() {
        self.target = $(this);
        self.action(self.state);
    };
};
$GN.prototype.loopAction = function(){
    var self = this;
    this.elm.each(function(key, val) {
        self.target = $(this);
        self.key = key;
        self.val = $(val);
        self.action(self.state);
        self.render();
    });
};
$GN.prototype.render = function(){
    if (this.tmp) {
        this.templateBuild();
    }
    this.update(this.state);
};

$GN.prototype.setTemplate = function(func) {
    this.tmp = func();
    return this;
};
$GN.prototype.templateBuild = function() {
    var self = this;
    var $html = $();
    var tmp = '';
    $.each(self.state, function(key, val) {
        if (~self.tmp.indexOf(key.toUpperCase())) {
            if (val instanceof Array) {
                var p = self.tmp.match(/<% (.*?) %>/g);
                var r = p[0].replace(/<% /g, "").replace(/ %>/g, "");
                var a = r.split(" | ");
                $.each(val, function(i, obj) {
                    tmp = self.tmp.replace(p[0], obj[a[1]]);
                    $html = self.addCustomAttr($html, tmp);
                });
            } else {
                tmp = self.tmp.replace(new RegExp('<% ' + key.toUpperCase() + ' %>', 'g'), val);
                $html = self.addCustomAttr($html, tmp);
            }
        }
    });
    self.html = $html;
    return this;
};
$GN.prototype.addCustomAttr = function(base, tmp) {
    var $el = $(tmp);
    if ($el.length) {
        $el.attr('data-' + this.state.id + '-id', this.num++);
    }
    return base.add($el);
};


// domainが異なり、ie9の場合だけxdomainを使う必要がある xdomain自体ie8,9だけ
$GN.prototype.isXhr = function(url) {
    var res = true;
    var apiDomain = url.split('/')[2];
    var currentDomain = location.href.split('/')[2];
    var isIE9 = document.uniqueID && typeof window.matchMedia == "undefined";
    var isCrossDomain = ~url.indexOf(currentDomain) && apiDomain !== currentDomain;
    if((isIE9 && isCrossDomain) || !window.XMLHttpRequest) res = false;
    return res;
};
$GN.prototype.parseJson = function(str) {
    return JSON.parse ? JSON.parse(str) : (new Function('return ' + str ))();
};
$GN.prototype.qsStringify = function(o, isEncode) {
    var encode = isEncode ? encodeURIComponent : function(a) { return a; };
    var queries = [];
    for (var k in o) {
        queries.push(k + '=' + encode(o[k]));
    }
    return queries.join('&');
};
$GN.prototype.setTimeStamp = function(query, cache) {
    if (!cache) query.t = new Date().getTime().toString();
    return query;
};
$GN.prototype.request = function(url, options) {
    var self = this;
    var url = url;
    var type = options.type || 'GET';
    var cache = options.cache || false;
    var query = options.query || {};
    var timeout = options.timeout || 3000;
    var encode = options.encode || true;
    var error = options.errorCallback || function() {};
    var success = options.successCallback || function() {};
    var xhr = self.isXhr(url) ? new XMLHttpRequest() : new XDomainRequest();
    if (self.isXhr(url)) {
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    success(self.parseJson(xhr.responseText));
                } else {
                    error({ type: xhr.status.toString() });
                }
            }
        };
    } else {
        xhr.onload = function() { success(self.parseJson(xhr.responseText)); };
        xhr.onprogress = function() {};
    }
    xhr.open(type, url + '?' + self.qsStringify(self.setTimeStamp(query, cache), encode));
    xhr.timeout = timeout;
    xhr.ontimeout = function(e) { error({ type: 'timeout' }); };
    xhr.onerror = function(e) { error({ type: 'error' }); };
    self.isXhr(url) ? xhr.send() : setTimeout(function() { xhr.send(); }, 0);
    return xhr;
};
$GN.prototype.crossGet = function(url, param) {
    var d = $.Deferred();
    this.request(url, {
        type: 'GET',
        cache: false,
        query: param,
        timeout: 5000,
        errorCallback: function(res) { d.reject(res); },
        successCallback: function(res) { d.resolve(res); }
    });
    return d.promise();
};

$GN.prototype.init.prototype = $GN.prototype;

