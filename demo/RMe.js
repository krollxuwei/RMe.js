/**
 * Created by xuwei on 15/4/16.
 */
(function () {

	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '*{border:0;margin:0;padding:0;font-family: Helvetica;-webkit-tap-highlight-color: transparent;}'
					+ '*:not(input,textarea) {-webkit-touch-callout: none;-webkit-user-select: none}'
					+ '._page_{position:absolute;top:0;left:0;width:100%;height:100%;}._page_.displayNone{display:none;}';
	document.getElementsByTagName('HEAD').item(0).appendChild(style);

	var that;

	var RMe = function (el) {
		that = this;
		that.container;
		that.pageCache = [];
		that.View = {};
		that._pageListener();
	}

	RMe.prototype = {
		_pageListener: function () {
			window.addEventListener('popstate', function (e) {
				if ($('._page_').length > 1) {
					that._popPage();
				}
			}, false);
		},
		_createPage: function () {
			$('._page_:last').addClass('displayNone');
			var div = document.createElement('div');
			div.className = "_page_";
			!that.container && (that.container = document.body);
			that.container.appendChild(div);
			return div;
		},
		_popPage: function () {
			that._removePage();

			var lastP = that._getLastPage();
			that._changeTitle(lastP.props.title);
			document.body.scrollTop = lastP.props.scrollTop;
		},
		_removePage:function(){
			React.unmountComponentAtNode($('._page_:last')[0]);
			$('._page_:last').remove();
			$('._page_.displayNone:last').removeClass('displayNone');
			that.pageCache.pop();
		},
		_getLastPage: function () {
			return that.pageCache[that.pageCache.length - 1];
		},
		_changeTitle: function (title) {
			//document.title = title;
		},
		define: function (obj) {
			if (!obj.displayName) {
				throw new Error("require displayName");
			}
			that.View[obj.displayName] = React.createClass(obj);
			return that.View[obj.displayName];
		},
		/**
		 * 显示页面
		 * @param options ｛component,data(title,onBeforeShow,onShow,onHide)｝
		 */
		show: function (options) {
			if (that.pageCache.length > 0) {
				var lastP = that._getLastPage();
				lastP.props.scrollTop = document.body.scrollTop;
			}

			!options.data && (options.data = {});

			var c = React.createElement(options.view, options.data);
			React.render(
				c,
				that._createPage()
			)
			that.pageCache.push(c);

			options.data.title && that._changeTitle(options.data.title);

			if (that.pageCache.length > 1) {
				history.pushState(null, '', '#' + new Date().getTime());
			}
		},
		replace:function(options){
			if (that.pageCache.length > 0) {
				that._removePage();
			}

			!options.data && (options.data = {});

			var c = React.createElement(options.view, options.data);
			React.render(
				c,
				that._createPage()
			)
			that.pageCache.push(c);

			options.data.title && that._changeTitle(options.data.title);

			if (that.pageCache.length > 1) {
				history.replaceState(null, '', '#' + new Date().getTime());
			}
		},

		hide: function () {
			history.back();
		}
	}
	window.RMe = new RMe();
})()