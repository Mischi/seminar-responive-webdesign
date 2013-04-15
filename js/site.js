//http://net.tutsplus.com/tutorials/javascript-ajax/from-jquery-to-javascript-a-reference/

app = (function(skrollr) {

	var navLinks = document.querySelectorAll('.nav-container li');

	function navigateTo() {
		[].forEach.call(navLinks, function(navLink) {
			navLink.classList.remove('active');
		});
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
			[].forEach.call(navLinks, function(navLink) {
				navLink.addEventListener('click', navigateTo);
			});
		}
	};

})(skrollr);


(function(window) {
	window.onload = function() {
		app.initSkrollr();
		app.initMenu();
	}
})(window, app);