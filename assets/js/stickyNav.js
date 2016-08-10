(function (window, document, undefined) {
	// helper functions

	var trim = function (str) {
	    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	};

	var hasClass = function (el, cn) {
	    return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
	};

	var addClass = function (el, cn) {
	    if (!hasClass(el, cn)) {
	        el.className = (el.className === '') ? cn : el.className + ' ' + cn;
	    }
	};

	var removeClass = function (el, cn) {
	    el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
	};

	var hasParent = function (el, id) {
	    if (el) {
	        do {
	            if (el.id === id) {
	                return true;
	            }
	            if (el.nodeType === 9) {
	                break;
	            }
	        }
	        while ((el = el.parentNode));
	    }
	    return false;
	};

	var doc = document.documentElement;

    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
console.log(scrollTop, left.offsetTop);
});