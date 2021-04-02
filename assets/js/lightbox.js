var initLightBox = function(selector) {

	var parseLightboxItems = function() {
		var thumbList = document.querySelectorAll(selector);
		var items = [];
		for (var i = 0; i < thumbList.length; i++) {
			var thumbItem = thumbList[i];
			var item = {
				src: thumbItem.getAttribute('src'),
				w: parseInt(thumbItem.naturalWidth, 10),
				h: parseInt(thumbItem.naturalHeight, 10),
				msrc: thumbItem.getAttribute('src'),
                title: thumbItem.getAttribute('alt'),
				el: thumbItem
			};
			items.push(item);
		}
		return items;
	}

    var openLightbox = function(target) {
    	var items = parseLightboxItems();
    	var index = -1;
    	for (var i = 0; i < items.length; i++) {
    		console.log(items[i].el);
    		if (target === items[i].el) {
    			index = i;
    			break;
    		}
    	}
    	if (index == -1) {
    		return;
    	}
		var options = {
			index: index,
			getThumbBoundsFn: function() {
				var thumbnail = items[index];
				var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
				var rect = thumbnail.el.getBoundingClientRect();
				return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
			}
		};
		var pswpElement = document.querySelectorAll('.pswp')[0];
		var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
    }

	var onImageClick = function(e) {
		openLightbox(e.target);
		return false;
	}

	// loop all lightbox elements and bind events
	var imageList = document.querySelectorAll(selector);
	for (var i = 0; i < imageList.length; i++) {
		imageList[i].onclick = onImageClick;
	}

}

initLightBox('article img');