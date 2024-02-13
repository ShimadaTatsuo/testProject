var $ = require("jquery");

$.fn.outputLog = function (arg) {
  return this.each(function () {
    new ABC().init($(this));
  });
};

function ABC() {
  console.log(1);
  this.name = "abc";
}

ABC.prototype = $.extend(
  {
    init: function (elm) {
      console.log(elm);
      console.log(this);
      console.log(this.name);
    },
    setOption: function (arg) {
      this.option = $.extend(
        {
          configName: "hoge",
          fuga: "fuga",
        },
        option
      );
    },
  },
  ABC.prototype
);

$(".title_h1").outputLog();
