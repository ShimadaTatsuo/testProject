(function(){
	var func = function(){

		var item = {};

		var $JQ = function(str){ return new $JQ.prototype.init(str); };

		$JQ.prototype = {
			init : function(str){
				this.elm = document.getElementById(str);
				return this;
			},
			enable : function(){
				this.elm.disabled = false;
				return this;
			},
			disabled : function(){
				this.elm.disabled = true;
				return this;
			},
			radioOn : function(){
				this.elm.checked = true;
				return this;
			},
			radioOff : function(){
				this.elm.checked = false;
				return this;
			},
			show : function(){
				this.elm.style.display = '';
				return this;
			},
			hide : function(){
				this.elm.style.display = 'none';
				return this;
			},
			click : function(func){
				this.addEvent('click', func);
			},
			change : function(func){
				this.addEvent('change', func);
			},
			addEvent : function(evt, func){
				if(window.addEventListener) {
					this.elm.addEventListener(evt, func, false);
				} else if(window.attachEvent){
					this.elm.attachEvent("on"+evt, func);
				}
				return this;
			},
			itemRoop : function(itemName, func){
				for(var i=0; i<itemName.length; i++){
					func(itemName[i]);
				}
				return this;
			}
		};
		$JQ.prototype.init.prototype = $JQ.prototype;

		function init(){}
		init();

	};

	if(window.addEventListener) {
		window.addEventListener("load", func, false);
	} else if(window.attachEvent){
		window.attachEvent("onload", func);
	}

})();

