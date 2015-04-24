/**
 * Created by xuwei on 15/4/15.
 */
(function () {
	var that;
	var Util = function () {
		that = this;
		that.ajaxCount = 0;
	}

	Util.prototype = {
		getQueryString: function (name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return '';
		},
		getApiUrl: function (root, method, param) {
			var url = root.replace('{p}', method) + '?is_ajax=1';
			if (param) {
				for (var key in param) {
					url += '&' + key + '=' + param[key];
				}
			}
			return url;
		},
		deepCopy: function (json) {
			if (typeof json == 'number' || typeof json == 'string' || typeof json == 'boolean') {
				return json;
			} else if (typeof json == 'object') {
				if (json instanceof Array) {
					var newArr = [], i, len = json.length;
					for (i = 0; i < len; i++) {
						newArr[i] = arguments.callee(json[i]);
					}
					return newArr;
				} else {
					var newObj = {};
					for (var name in json) {
						newObj[name] = arguments.callee(json[name]);
					}
					return newObj;
				}
			}
		},
		ajax: function (option, callback, noLoading) {
			if (!noLoading)
				this.showLoading();
			if (option.type && option.type.toLowerCase() == 'get') {
				option.url += option.url.indexOf('?') == -1 ? '?' : '&';
				option.url += 'accessToken=' + window.accessToken;
			} else {
				option.data = option.data || {};
				option.data.accessToken = window.accessToken;
			}

			$.ajax({
				url: option.url,
				type: option.type || 'POST',
				data: option.data,
				success: function (res) {
					if (!noLoading)
						that.hideLoading();

					that.log('ajax success', ['url=' + option.url, 'data=' + JSON.stringify(res)]);
					if (res.Result) {
						if (callback) callback(res.Data);
					} else {
						that.info(res.Data + (res.ErrorCode ? 'code=' + res.ErrorCode : '') || '请重试');
					}
				},
				error: function (e) {
					if (!noLoading)
						that.hideLoading();
					that.log('ajax error', ['url=' + option.url, 'message=' + e.Message]);
				}
			})
		},

		showLoading: function () {
			this.ajaxCount++;

			var loading = top.document.getElementById("loading_page");
			if (!loading) {
				loading = document.createElement("div");
				loading.id = "loading_page";
				loading.innerHTML = '<div class="spinner">							   '
                + '  <div class="spinner-container container1">	   '
                + '	<div class="circle1"></div>					   '
                + '	<div class="circle2"></div>					   '
                + '	<div class="circle3"></div>					   '
                + '	<div class="circle4"></div>					   '
                + '  </div>										   '
                + '  <div class="spinner-container container2">	   '
                + '	<div class="circle1"></div>					   '
                + '	<div class="circle2"></div>					   '
                + '	<div class="circle3"></div>					   '
                + '	<div class="circle4"></div>					   '
                + '  </div>										   '
                + '  <div class="spinner-container container3">	   '
                + '	<div class="circle1"></div>					   '
                + '	<div class="circle2"></div>					   '
                + '	<div class="circle3"></div>					   '
                + '	<div class="circle4"></div>					   '
                + '  </div>										   '
                + '</div>										   ';
				top.document.body.appendChild(loading);
				$(loading).prependTo($('body'));
			}
		},
		hideLoading: function () {
			this.ajaxCount--;
			if (this.ajaxCount <= 0) {
				var loading = top.document.getElementById("loading_page");
				if (loading) {
					$(loading).remove();
				}
				this.ajaxCount = 0;
			}
		},

		info: function (msg, callback) {
			var err = document.getElementById('_error-messge_');
			if (err) {
				$(err).remove();
			}
			var html = $('<div id="_error-messge_" class="error-message show">' + msg + '</div>');
			html.prependTo($('body'));
			setTimeout(function () {
				html.removeClass('show');
				if (callback)
					callback();
			}, 2000)
		},

		confirm:function(message,callback){
			var _comfirm_ = document.getElementById('_confirm_');
			if (_comfirm_) {
				$(_comfirm_).remove();
			}
			var html = $('<div id="_comfirm_" class="_confirm_">'
							+'<div class="_confirm_mask" ontouchmove="event.preventDefault()"></div>'
							+'<div class="_confirm_body">'
							+'	<div class="_confirm_content">'
							+'		<div class="_confirm_title">'+message+'</div>'
							+'		<div class="_confirm_btns">'
							+'			<ul>'
							+'				<li id="_confirm_cancel_">取消</li>'
							+'				<li id="_confirm_ok_">确定</li>'
							+'			</ul>'
							+'			<div style="clear:both"></div>'
							+'		</div>'
							+'	</div>'
							+'</div>'
							+ '</div>');
			
			html.prependTo($('body'));
			html.find('#_confirm_cancel_').click(function () {
				$('#_comfirm_').remove();
				callback(false);
			})
			html.find('#_confirm_ok_').click(function () {
				$('#_comfirm_').remove();
				callback(true);
			})
		},

		log: function (title, messages) {
			console.group(title);
			if (typeof messages == 'string') {
				console.log(messages);
			} else {
				for (var i = 0; i < messages.length; i++) {
					console.log(messages[i]);
				}
			}

			console.groupEnd();
		}

	}

	window.Util = new Util();
})()