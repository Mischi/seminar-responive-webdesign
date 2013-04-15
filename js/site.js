//http://net.tutsplus.com/tutorials/javascript-ajax/from-jquery-to-javascript-a-reference/

app = (function(skrollr) {

	var navLinks = document.querySelectorAll('.nav-container li');

	function navigateTo() {
		for (var i = 0; i < navLinks.length; i++) {
			navLinks[i].classList.remove('active');
		};
		this.classList.add('active');
	}

	return {
		initSkrollr: function() {
			var s = skrollr.init({
				forceHeight: false
			});

			skrollr.menu.init(s);
		},
		initMenu: function() {
			for (var i = 0; i < navLinks.length; i++) {
				navLinks[i].addEventListener('click', navigateTo);
			};
		}
	};

})(skrollr);


(function(window) {
	window.onload = function() {
		app.initSkrollr();
		app.initMenu();
	}
})(window, app);