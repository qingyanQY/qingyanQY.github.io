/*!

 * bootstrap-fileinput v4.4.9

 * http://plugins.krajee.com/file-input

 *

 * Author: Kartik Visweswaran

 * Copyright: 2014 - 2018, Kartik Visweswaran, Krajee.com

 *

 * Licensed under the BSD 3-Clause

 * https://github.com/kartik-v/bootstrap-fileinput/blob/master/LICENSE.md

 */

! function(e) {

	"use strict";

	"function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ?

		module.exports = e(require("jquery")) : e(window.jQuery)

}(function(e) {

	"use strict";

	e.fn.fileinputLocales = {}, e.fn.fileinputThemes = {}, String.prototype.setTokens = function(e) {

		var t, i, a = this.toString();

		for (t in e) e.hasOwnProperty(t) && (i = new RegExp("{" + t + "}", "g"), a = a.replace(i, e[t]));

		return a

	};

	var t, i;

	t = {

		FRAMES: ".kv-preview-thumb",

		SORT_CSS: "file-sortable",

		OBJECT_PARAMS: '<param name="controller" value="true" />\n<param name="allowFullScreen" value="true" />\n<param name="allowScriptAccess" value="always" />\n<param name="autoPlay" value="false" />\n<param name="autoStart" value="false" />\n<param name="quality" value="high" />\n',

		DEFAULT_PREVIEW: '<div class="file-preview-other">\n<span class="{previewFileIconClass}">{previewFileIcon}</span>\n</div>',

		MODAL_ID: "kvFileinputModal",

		MODAL_EVENTS: ["show", "shown", "hide", "hidden", "loaded"],

		objUrl: window.URL || window.webkitURL,

		compare: function(e, t, i) {

			return void 0 !== e && (i ? e === t : e.match(t))

		},

		isIE: function(e) {

			if ("Microsoft Internet Explorer" !== navigator.appName) return !1;

			if (10 === e) return new RegExp("msie\\s" + e, "i").test(navigator.userAgent);

			var t, i = document.createElement("div");

			return i.innerHTML = "<!--[if IE " + e + "]> <i></i> <![endif]-->", t = i.getElementsByTagName("i").length,

				document.body.appendChild(i), i.parentNode.removeChild(i), t

		},

		canAssignFilesToInput: function() {

			var e = document.createElement("input");

			try {

				return e.type = "file", e.files = null, !0

			} catch (t) {

				return !1

			}

		},

		getDragDropFolders: function(e) {

			var t, i, a = e.length,

				r = 0;

			if (a > 0 && e[0].webkitGetAsEntry())

				for (t = 0; a > t; t++) i = e[t].webkitGetAsEntry(), i && i.isDirectory && r++;

			return r

		},

		initModal: function(t) {

			var i = e("body");

			i.length && t.appendTo(i)

		},

		isEmpty: function(t, i) {

			return void 0 === t || null === t || 0 === t.length || i && "" === e.trim(t)

		},

		isArray: function(e) {

			return Array.isArray(e) || "[object Array]" === Object.prototype.toString.call(e)

		},

		ifSet: function(e, t, i) {

			return i = i || "", t && "object" == typeof t && e in t ? t[e] : i

		},

		cleanArray: function(e) {

			return e instanceof Array || (e = []), e.filter(function(e) {

				return void 0 !== e && null !== e

			})

		},

		spliceArray: function(t, i, a) {

			var r, n, o = 0,

				l = [];

			if (!(t instanceof Array)) return [];

			for (n = e.extend(!0, [], t), a && n.reverse(), r = 0; r < n.length; r++) r !== i && (l[o] = n[r], o++);

			return a && l.reverse(), l

		},

		getNum: function(e, t) {

			return t = t || 0, "number" == typeof e ? e : ("string" == typeof e && (e = parseFloat(e)), isNaN(e) ? t : e)

		},

		hasFileAPISupport: function() {

			return !(!window.File || !window.FileReader)

		},

		hasDragDropSupport: function() {

			var e = document.createElement("div");

			return !t.isIE(9) && (void 0 !== e.draggable || void 0 !== e.ondragstart && void 0 !== e.ondrop)

		},

		hasFileUploadSupport: function() {

			return t.hasFileAPISupport() && window.FormData

		},

		hasBlobSupport: function() {

			try {

				return !!window.Blob && Boolean(new Blob)

			} catch (e) {

				return !1

			}

		},

		hasArrayBufferViewSupport: function() {

			try {

				return 100 === new Blob([new Uint8Array(100)]).size

			} catch (e) {

				return !1

			}

		},

		dataURI2Blob: function(e) {

			var i, a, r, n, o, l, s = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,

				d = t.hasBlobSupport(),

				c = (d || s) && window.atob && window.ArrayBuffer && window.Uint8Array;

			if (!c) return null;

			for (i = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : decodeURIComponent(e.split(",")[1]), a =

				new ArrayBuffer(i.length), r = new Uint8Array(a), n = 0; n < i.length; n += 1) r[n] = i.charCodeAt(n);

			return o = e.split(",")[0].split(":")[1].split(";")[0], d ? new Blob([t.hasArrayBufferViewSupport() ? r : a], {

				type: o

			}) : (l = new s, l.append(a), l.getBlob(o))

		},

		arrayBuffer2String: function(e) {

			if (window.TextDecoder) return new TextDecoder("utf-8").decode(e);

			var t, i, a, r, n = Array.prototype.slice.apply(new Uint8Array(e)),

				o = "",

				l = 0;

			for (t = n.length; t > l;) switch (i = n[l++], i >> 4) {

				case 0:

				case 1:

				case 2:

				case 3:

				case 4:

				case 5:

				case 6:

				case 7:

					o += String.fromCharCode(i);

					break;

				case 12:

				case 13:

					a = n[l++], o += String.fromCharCode((31 & i) << 6 | 63 & a);

					break;

				case 14:

					a = n[l++], r = n[l++], o += String.fromCharCode((15 & i) << 12 | (63 & a) << 6 | (63 & r) << 0)

			}

			return o

		},

		isHtml: function(e) {

			var t = document.createElement("div");

			t.innerHTML = e;

			for (var i = t.childNodes, a = i.length; a--;)

				if (1 === i[a].nodeType) return !0;

			return !1

		},

		isSvg: function(e) {

			return e.match(/^\s*<\?xml/i) && (e.match(/<!DOCTYPE svg/i) || e.match(/<svg/i))

		},

		getMimeType: function(e, t, i) {

			switch (e) {

				case "ffd8ffe0":

				case "ffd8ffe1":

				case "ffd8ffe2":

					return "image/jpeg";

				case "89504E47":

					return "image/png";

				case "47494638":

					return "image/gif";

				case "49492a00":

					return "image/tiff";

				case "52494646":

					return "image/webp";

				case "66747970":

					return "video/3gp";

				case "4f676753":

					return "video/ogg";

				case "1a45dfa3":

					return "video/mkv";

				case "000001ba":

				case "000001b3":

					return "video/mpeg";

				case "3026b275":

					return "video/wmv";

				case "25504446":

					return "application/pdf";

				case "25215053":

					return "application/ps";

				case "504b0304":

				case "504b0506":

				case "504b0508":

					return "application/zip";

				case "377abcaf":

					return "application/7z";

				case "75737461":

					return "application/tar";

				case "7801730d":

					return "application/dmg";

				default:

					switch (e.substring(0, 6)) {

						case "435753":

							return "application/x-shockwave-flash";

						case "494433":

							return "audio/mp3";

						case "425a68":

							return "application/bzip";

						default:

							switch (e.substring(0, 4)) {

								case "424d":

									return "image/bmp";

								case "fffb":

									return "audio/mp3";

								case "4d5a":

									return "application/exe";

								case "1f9d":

								case "1fa0":

									return "application/zip";

								case "1f8b":

									return "application/gzip";

								default:

									return t && !t.match(/[^\u0000-\u007f]/) ? "application/text-plain" : i

							}

					}

			}

		},

		addCss: function(e, t) {

			e.removeClass(t).addClass(t)

		},

		getElement: function(i, a, r) {

			return t.isEmpty(i) || t.isEmpty(i[a]) ? r : e(i[a])

		},

		uniqId: function() {

			return Math.round((new Date).getTime()) + "_" + Math.round(100 * Math.random())

		},

		htmlEncode: function(e) {

			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g,

				"&apos;")

		},

		replaceTags: function(t, i) {

			var a = t;

			return i ? (e.each(i, function(e, t) {

				"function" == typeof t && (t = t()), a = a.split(e).join(t)

			}), a) : a

		},

		cleanMemory: function(e) {

			var i = e.is("img") ? e.attr("src") : e.find("source").attr("src");

			t.objUrl.revokeObjectURL(i)

		},

		findFileName: function(e) {

			var t = e.lastIndexOf("/");

			return -1 === t && (t = e.lastIndexOf("\\")), e.split(e.substring(t, t + 1)).pop()

		},

		checkFullScreen: function() {

			return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement ||

				document.msFullscreenElement

		},

		toggleFullScreen: function(e) {

			var i = document,

				a = i.documentElement;

			a && e && !t.checkFullScreen() ? a.requestFullscreen ? a.requestFullscreen() : a.msRequestFullscreen ? a.msRequestFullscreen() :

				a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen && a.webkitRequestFullscreen(

					Element.ALLOW_KEYBOARD_INPUT) : i.exitFullscreen ? i.exitFullscreen() : i.msExitFullscreen ? i.msExitFullscreen() :

				i.mozCancelFullScreen ? i.mozCancelFullScreen() : i.webkitExitFullscreen && i.webkitExitFullscreen()

		},

		moveArray: function(t, i, a, r) {

			var n = e.extend(!0, [], t);

			if (r && n.reverse(), a >= n.length)

				for (var o = a - n.length; o-- + 1;) n.push(void 0);

			return n.splice(a, 0, n.splice(i, 1)[0]), r && n.reverse(), n

		},

		cleanZoomCache: function(e) {

			var t = e.closest(".kv-zoom-cache-theme");

			t.length || (t = e.closest(".kv-zoom-cache")), t.remove()

		},

		closeButton: function(e) {

			return e = e ? "close " + e : "close", '<button type="button" class="' + e +

				'" aria-label="Close">\n  <span aria-hidden="true">&times;</span>\n</button>'

		},

		getRotation: function(e) {

			switch (e) {

				case 2:

					return "rotateY(180deg)";

				case 3:

					return "rotate(180deg)";

				case 4:

					return "rotate(180deg) rotateY(180deg)";

				case 5:

					return "rotate(270deg) rotateY(180deg)";

				case 6:

					return "rotate(90deg)";

				case 7:

					return "rotate(90deg) rotateY(180deg)";

				case 8:

					return "rotate(270deg)";

				default:

					return ""

			}

		},

		setTransform: function(e, t) {

			e && (e.style.transform = t, e.style.webkitTransform = t, e.style["-moz-transform"] = t, e.style["-ms-transform"] =

				t, e.style["-o-transform"] = t)

		},

		setImageOrientation: function(e, i, a) {

			if (e && e.length) {

				var r = "load.fileinputimageorient";

				e.off(r).on(r, function() {

					var r = e.get(0),

						n = i && i.length ? i.get(0) : null,

						o = r.offsetHeight,

						l = r.offsetWidth,

						s = t.getRotation(a);

					if (e.data("orientation", a), n && i.data("orientation", a), 5 > a) return t.setTransform(r, s), void t.setTransform(

						n, s);

					var d = Math.atan(l / o),

						c = Math.sqrt(Math.pow(o, 2) + Math.pow(l, 2)),

						p = c ? o / Math.cos(Math.PI / 2 + d) / c : 1,

						u = " scale(" + Math.abs(p) + ")";

					t.setTransform(r, s + u), t.setTransform(n, s + u)

				})

			}

		}

	}, i = function(i, a) {

		var r = this;

		r.$element = e(i), r.$parent = r.$element.parent(), r._validate() && (r.isPreviewable = t.hasFileAPISupport(), r.isIE9 =

			t.isIE(9), r.isIE10 = t.isIE(10), (r.isPreviewable || r.isIE9) && (r._init(a), r._listen()), r.$element.removeClass(

				"file-loading"))

	}, i.prototype = {

		constructor: i,

		_cleanup: function() {

			var e = this;

			e.reader = null, e.formdata = {}, e.uploadCount = 0, e.uploadStatus = {}, e.uploadLog = [], e.uploadAsyncCount =

				0, e.loadedImages = [], e.totalImagesCount = 0, e.ajaxRequests = [], e.clearStack(), e.fileBatchCompleted = !0,

				e.isPreviewable || (e.showPreview = !1), e.isError = !1, e.ajaxAborted = !1, e.cancelling = !1

		},

		_init: function(i, a) {

			var r, n, o, l, s = this,

				d = s.$element;

			s.options = i, e.each(i, function(e, i) {

					switch (e) {

						case "minFileCount":

						case "maxFileCount":

						case "minFileSize":

						case "maxFileSize":

						case "maxFilePreviewSize":

						case "resizeImageQuality":

						case "resizeIfSizeMoreThan":

						case "progressUploadThreshold":

						case "initialPreviewCount":

						case "zoomModalHeight":

						case "minImageHeight":

						case "maxImageHeight":

						case "minImageWidth":

						case "maxImageWidth":

							s[e] = t.getNum(i);

							break;

						default:

							s[e] = i

					}

				}), s.rtl && (l = s.previewZoomButtonIcons.prev, s.previewZoomButtonIcons.prev = s.previewZoomButtonIcons.next,

					s.previewZoomButtonIcons.next = l), a || s._cleanup(), s.$form = d.closest("form"), s._initTemplateDefaults(),

				s.uploadFileAttr = t.isEmpty(d.attr("name")) ? "file_data" : d.attr("name"), o = s._getLayoutTemplate("progress"),

				s.progressTemplate = o.replace("{class}", s.progressClass), s.progressCompleteTemplate = o.replace("{class}", s.progressCompleteClass),

				s.progressErrorTemplate = o.replace("{class}", s.progressErrorClass), s.isDisabled = d.attr("disabled") || d.attr(

					"readonly"), s.isDisabled && d.attr("disabled", !0), s.isAjaxUpload = t.hasFileUploadSupport() && !t.isEmpty(s.uploadUrl),

				s.dropZoneEnabled = t.hasDragDropSupport() && s.dropZoneEnabled, s.isAjaxUpload || (s.dropZoneEnabled = s.dropZoneEnabled &&

					t.canAssignFilesToInput()), s.isClickable = s.browseOnZoneClick && s.showPreview && (s.dropZoneEnabled || !t.isEmpty(

					s.defaultPreviewContent)), s.slug = "function" == typeof i.slugCallback ? i.slugCallback : s._slugDefault, s.mainTemplate =

				s.showCaption ? s._getLayoutTemplate("main1") : s._getLayoutTemplate("main2"), s.captionTemplate = s._getLayoutTemplate(

					"caption"), s.previewGenericTemplate = s._getPreviewTemplate("generic"), !s.imageCanvas && s.resizeImage && (s.maxImageWidth ||

					s.maxImageHeight) && (s.imageCanvas = document.createElement("canvas"), s.imageCanvasContext = s.imageCanvas.getContext(

					"2d")), t.isEmpty(d.attr("id")) && d.attr("id", t.uniqId()), s.namespace = ".fileinput_" + d.attr("id").replace(

					/-/g, "_"), void 0 === s.$container ? s.$container = s._createContainer() : s._refreshContainer(), n = s.$container,

				s.$dropZone = n.find(".file-drop-zone"), s.$progress = n.find(".kv-upload-progress"), s.$btnUpload = n.find(

					".fileinput-upload"), s.$captionContainer = t.getElement(i, "elCaptionContainer", n.find(".file-caption")), s.$caption =

				t.getElement(i, "elCaptionText", n.find(".file-caption-name")), t.isEmpty(s.msgPlaceholder) || (r = d.attr(

					"multiple") ? s.filePlural : s.fileSingle, s.$caption.attr("placeholder", s.msgPlaceholder.replace("{files}",

					r))), s.$captionIcon = s.$captionContainer.find(".file-caption-icon"), s.$previewContainer = t.getElement(i,

					"elPreviewContainer", n.find(".file-preview")), s.$preview = t.getElement(i, "elPreviewImage", n.find(

					".file-preview-thumbnails")), s.$previewStatus = t.getElement(i, "elPreviewStatus", n.find(

					".file-preview-status")), s.$errorContainer = t.getElement(i, "elErrorContainer", s.$previewContainer.find(

					".kv-fileinput-error")), s._validateDisabled(), t.isEmpty(s.msgErrorClass) || t.addCss(s.$errorContainer, s.msgErrorClass),

				a ? s._errorsExist() || s.$errorContainer.hide() : (s.$errorContainer.hide(), s.previewInitId = "preview-" + t.uniqId(),

					s._initPreviewCache(), s._initPreview(!0), s._initPreviewActions(), s.$parent.hasClass("file-loading") && (s.$container

						.insertBefore(s.$parent), s.$parent.remove())), s._setFileDropZoneTitle(), d.attr("disabled") && s.disable(),

				s._initZoom(), s.hideThumbnailContent && t.addCss(s.$preview, "hide-content")

		},

		_initTemplateDefaults: function() {

			var i, a, r, n, o, l, s, d, c, p, u, f, m, v, g, h, w, _, b, C, y, x, T, E, S, k, F, P, I, A, D, z, $, j, U, B, R,

				O, L, M, Z = this;

			i =

				'{preview}\n<div class="kv-upload-progress kv-hidden"></div><div class="clearfix"></div>\n<div class="input-group {class}">\n  {caption}\n<div class="input-group-btn input-group-append">\n      {remove}\n      {cancel}\n      {upload}\n      {browse}\n    </div>\n</div>',

				a =

				'{preview}\n<div class="kv-upload-progress kv-hidden"></div>\n<div class="clearfix"></div>\n{remove}\n{cancel}\n{upload}\n{browse}\n',

				r =

				'<div class="file-preview {class}">\n    {close}    <div class="{dropClass}">\n    <div class="file-preview-thumbnails">\n    </div>\n    <div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div>\n    <div class="kv-fileinput-error"></div>\n    </div>\n</div>',

				o = t.closeButton("fileinput-remove"), n = '<i class="glyphicon glyphicon-file"></i>', l =

				'<div class="file-caption form-control {class}" tabindex="500">\n  <span class="file-caption-icon"></span>\n  <input class="file-caption-name" onkeydown="return false;" onpaste="return false;">\n</div>',

				s = '<button type="{type}" tabindex="500" title="{title}" class="{css}" {status}>{icon} {label}</button>', d =

				'<a href="{href}" tabindex="500" title="{title}" class="{css}" {status}>{icon} {label}</a>', c =

				'<div tabindex="500" class="{css}" {status}>{icon} {label}</div>', p = '<div id="' + t.MODAL_ID +

				'" class="file-zoom-dialog modal fade" tabindex="-1" aria-labelledby="' + t.MODAL_ID + 'Label"></div>', u =

				'<div class="modal-dialog modal-lg{rtl}" role="document">\n  <div class="modal-content">\n    <div class="modal-header">\n      <h5 class="modal-title">{heading}</h5>\n      <span class="kv-zoom-title"></span>\n      <div class="kv-zoom-actions">{toggleheader}{fullscreen}{borderless}{close}</div>\n    </div>\n    <div class="modal-body">\n      <div class="floating-buttons"></div>\n      <div class="kv-zoom-body file-zoom-content {zoomFrameClass}"></div>\n{prev} {next}\n    </div>\n  </div>\n</div>\n',

				f =

				'<div class="progress">\n    <div class="{class}" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n        {status}\n     </div>\n</div>',

				m = " <samp>({sizeText})</samp>", v =

				'<div class="file-thumbnail-footer">\n    <div class="file-footer-caption" title="{caption}">\n        <div class="file-caption-info">{caption}</div>\n        <div class="file-size-info">{size}</div>\n    </div>\n    {progress}\n{indicator}\n{actions}\n</div>',

				g =

				'<div class="file-actions">\n    <div class="file-footer-buttons">\n        {download} {upload} {delete} {zoom} {other}    </div>\n</div>\n{drag}\n<div class="clearfix"></div>',

				h =

				'<button type="button" class="kv-file-remove {removeClass}" title="{removeTitle}" {dataUrl}{dataKey}>{removeIcon}</button>\n',

				w = '<button type="button" class="kv-file-upload {uploadClass}" title="{uploadTitle}">{uploadIcon}</button>', _ =

				'<a class="kv-file-download {downloadClass}" title="{downloadTitle}" href="{downloadUrl}" download="{caption}" target="_blank">{downloadIcon}</a>',

				b = '<button type="button" class="kv-file-zoom {zoomClass}" title="{zoomTitle}">{zoomIcon}</button>', C =

				'<span class="file-drag-handle {dragClass}" title="{dragTitle}">{dragIcon}</span>', y =

				'<div class="file-upload-indicator" title="{indicatorTitle}">{indicator}</div>', x =

				'<div class="file-preview-frame {frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}"',

				T = x + '><div class="kv-file-content">\n', E = x + ' title="{caption}"><div class="kv-file-content">\n', S =

				"</div>{footer}\n</div>\n", k = "{content}\n", O = " {style}", F =

				'<div class="kv-preview-data file-preview-html" title="{caption}"' + O + ">{data}</div>\n", P =

				'<img src="{data}" class="file-preview-image kv-preview-data" title="{caption}" alt="{caption}"' + O + ">\n", I =

				'<textarea class="kv-preview-data file-preview-text" title="{caption}" readonly' + O + ">{data}</textarea>\n", A =

				'<iframe class="kv-preview-data file-preview-office" src="https://view.officeapps.live.com/op/embed.aspx?src={data}"' +

				O + "></iframe>", D =

				'<iframe class="kv-preview-data file-preview-gdocs" src="https://docs.google.com/gview?url={data}&embedded=true"' +

				O + "></iframe>", z = '<video class="kv-preview-data file-preview-video" controls' + O +

				'>\n<source src="{data}" type="{type}">\n' + t.DEFAULT_PREVIEW + "\n</video>\n", $ =

				'<!--suppress ALL --><audio class="kv-preview-data file-preview-audio" controls' + O +

				'>\n<source src="{data}" type="{type}">\n' + t.DEFAULT_PREVIEW + "\n</audio>\n", j =

				'<embed class="kv-preview-data file-preview-flash" src="{data}" type="application/x-shockwave-flash"' + O +

				">\n", B = '<embed class="kv-preview-data file-preview-pdf" src="{data}" type="application/pdf"' + O + ">\n", U =

				'<object class="kv-preview-data file-preview-object file-object {typeCss}" data="{data}" type="{type}"' + O +

				'>\n<param name="movie" value="{caption}" />\n' + t.OBJECT_PARAMS + " " + t.DEFAULT_PREVIEW + "\n</object>\n", R =

				'<div class="kv-preview-data file-preview-other-frame"' + O + ">\n" + t.DEFAULT_PREVIEW + "\n</div>\n", L =

				'<div class="kv-zoom-cache" style="display:none">{zoomContent}</div>', M = {

					width: "100%",

					height: "100%",

					"min-height": "480px"

				}, Z._isPdfRendered() && (B = Z.pdfRendererTemplate.replace("{renderer}", Z.pdfRendererUrl)), Z.defaults = {

					layoutTemplates: {

						main1: i,

						main2: a,

						preview: r,

						close: o,

						fileIcon: n,

						caption: l,

						modalMain: p,

						modal: u,

						progress: f,

						size: m,

						footer: v,

						indicator: y,

						actions: g,

						actionDelete: h,

						actionUpload: w,

						actionDownload: _,

						actionZoom: b,

						actionDrag: C,

						btnDefault: s,

						btnLink: d,

						btnBrowse: c,

						zoomCache: L

					},

					previewMarkupTags: {

						tagBefore1: T,

						tagBefore2: E,

						tagAfter: S

					},

					previewContentTemplates: {

						generic: k,

						html: F,

						image: P,

						text: I,

						office: A,

						gdocs: D,

						video: z,

						audio: $,

						flash: j,

						object: U,

						pdf: B,

						other: R

					},

					allowedPreviewTypes: ["image", "html", "text", "video", "audio", "flash", "pdf", "object"],

					previewTemplates: {},

					previewSettings: {

						image: {

							width: "auto",

							height: "auto",

							"max-width": "100%",

							"max-height": "100%"

						},

						html: {

							width: "213px",

							height: "160px"

						},

						text: {

							width: "213px",

							height: "160px"

						},

						office: {

							width: "213px",

							height: "160px"

						},

						gdocs: {

							width: "213px",

							height: "160px"

						},

						video: {

							width: "213px",

							height: "160px"

						},

						audio: {

							width: "100%",

							height: "30px"

						},

						flash: {

							width: "213px",

							height: "160px"

						},

						object: {

							width: "213px",

							height: "160px"

						},

						pdf: {

							width: "100%",

							height: "160px"

						},

						other: {

							width: "213px",

							height: "160px"

						}

					},

					previewSettingsSmall: {

						image: {

							width: "auto",

							height: "auto",

							"max-width": "100%",

							"max-height": "100%"

						},

						html: {

							width: "100%",

							height: "160px"

						},

						text: {

							width: "100%",

							height: "160px"

						},

						office: {

							width: "100%",

							height: "160px"

						},

						gdocs: {

							width: "100%",

							height: "160px"

						},

						video: {

							width: "100%",

							height: "auto"

						},

						audio: {

							width: "100%",

							height: "30px"

						},

						flash: {

							width: "100%",

							height: "auto"

						},

						object: {

							width: "100%",

							height: "auto"

						},

						pdf: {

							width: "100%",

							height: "160px"

						},

						other: {

							width: "100%",

							height: "160px"

						}

					},

					previewZoomSettings: {

						image: {

							width: "auto",

							height: "auto",

							"max-width": "100%",

							"max-height": "100%"

						},

						html: M,

						text: M,

						office: {

							width: "100%",

							height: "100%",

							"max-width": "100%",

							"min-height": "480px"

						},

						gdocs: {

							width: "100%",

							height: "100%",

							"max-width": "100%",

							"min-height": "480px"

						},

						video: {

							width: "auto",

							height: "100%",

							"max-width": "100%"

						},

						audio: {

							width: "100%",

							height: "30px"

						},

						flash: {

							width: "auto",

							height: "480px"

						},

						object: {

							width: "auto",

							height: "100%",

							"max-width": "100%",

							"min-height": "480px"

						},

						pdf: M,

						other: {

							width: "auto",

							height: "100%",

							"min-height": "480px"

						}

					},

					fileTypeSettings: {

						image: function(e, i) {

							return t.compare(e, "image.*") && !t.compare(e, /(tiff?|wmf)$/i) || t.compare(i, /\.(gif|png|jpe?g)$/i)

						},

						html: function(e, i) {

							return t.compare(e, "text/html") || t.compare(i, /\.(htm|html)$/i)

						},

						office: function(e, i) {

							return t.compare(e, /(word|excel|powerpoint|office)$/i) || t.compare(i, /\.(docx?|xlsx?|pptx?|pps|potx?)$/i)

						},

						gdocs: function(e, i) {

							return t.compare(e, /(word|excel|powerpoint|office|iwork-pages|tiff?)$/i) || t.compare(i,

								/\.(docx?|xlsx?|pptx?|pps|potx?|rtf|ods|odt|pages|ai|dxf|ttf|tiff?|wmf|e?ps)$/i)

						},

						text: function(e, i) {

							return t.compare(e, "text.*") || t.compare(i, /\.(xml|javascript)$/i) || t.compare(i,

								/\.(txt|md|csv|nfo|ini|json|php|js|css)$/i)

						},

						video: function(e, i) {

							return t.compare(e, "video.*") && (t.compare(e, /(ogg|mp4|mp?g|mov|webm|3gp)$/i) || t.compare(i,

								/\.(og?|mp4|webm|mp?g|mov|3gp)$/i))

						},

						audio: function(e, i) {

							return t.compare(e, "audio.*") && (t.compare(i, /(ogg|mp3|mp?g|wav)$/i) || t.compare(i,

								/\.(og?|mp3|mp?g|wav)$/i))

						},

						flash: function(e, i) {

							return t.compare(e, "application/x-shockwave-flash", !0) || t.compare(i, /\.(swf)$/i)

						},

						pdf: function(e, i) {

							return t.compare(e, "application/pdf", !0) || t.compare(i, /\.(pdf)$/i)

						},

						object: function() {

							return !0

						},

						other: function() {

							return !0

						}

					},

					fileActionSettings: {

						showRemove: !0,

						showUpload: !0,

						showDownload: !0,

						showZoom: !0,

						showDrag: !0,

						removeIcon: '<i class="glyphicon glyphicon-trash"></i>',

						removeClass: "btn btn-sm btn-kv btn-default btn-outline-secondary",

						removeErrorClass: "btn btn-sm btn-kv btn-danger",

						removeTitle: "Remove file",

						uploadIcon: '<i class="glyphicon glyphicon-upload"></i>',

						uploadClass: "btn btn-sm btn-kv btn-default btn-outline-secondary",

						uploadTitle: "Upload file",

						uploadRetryIcon: '<i class="glyphicon glyphicon-repeat"></i>',

						uploadRetryTitle: "Retry upload",

						downloadIcon: '<i class="glyphicon glyphicon-download"></i>',

						downloadClass: "btn btn-sm btn-kv btn-default btn-outline-secondary",

						downloadTitle: "Download file",

						zoomIcon: '<i class="glyphicon glyphicon-zoom-in"></i>',

						zoomClass: "btn btn-sm btn-kv btn-default btn-outline-secondary",

						zoomTitle: "View Details",

						dragIcon: '<i class="glyphicon glyphicon-move"></i>',

						dragClass: "text-info",

						dragTitle: "Move / Rearrange",

						dragSettings: {},

						indicatorNew: '<i class="glyphicon glyphicon-plus-sign text-warning"></i>',

						indicatorSuccess: '<i class="glyphicon glyphicon-ok-sign text-success"></i>',

						indicatorError: '<i class="glyphicon glyphicon-exclamation-sign text-danger"></i>',

						indicatorLoading: '<i class="glyphicon glyphicon-hourglass text-muted"></i>',

						indicatorNewTitle: "Not uploaded yet",

						indicatorSuccessTitle: "Uploaded",

						indicatorErrorTitle: "Upload Error",

						indicatorLoadingTitle: "Uploading ..."

					}

				}, e.each(Z.defaults, function(t, i) {

					return "allowedPreviewTypes" === t ? void(void 0 === Z.allowedPreviewTypes && (Z.allowedPreviewTypes = i)) :

						void(Z[t] = e.extend(!0, {}, i, Z[t]))

				}), Z._initPreviewTemplates()

		},

		_initPreviewTemplates: function() {

			var i, a = this,

				r = a.previewMarkupTags,

				n = r.tagAfter;

			e.each(a.previewContentTemplates, function(e, o) {

				t.isEmpty(a.previewTemplates[e]) && (i = r.tagBefore2, "generic" !== e && "image" !== e && "html" !== e &&

					"text" !== e || (i = r.tagBefore1), a._isPdfRendered() && "pdf" === e && (i = i.replace("kv-file-content",

						"kv-file-content kv-pdf-rendered")), a.previewTemplates[e] = i + o + n)

			})

		},

		_initPreviewCache: function() {

			var i = this;

			i.previewCache = {

				data: {},

				init: function() {

					var e = i.initialPreview;

					e.length > 0 && !t.isArray(e) && (e = e.split(i.initialPreviewDelimiter)), i.previewCache.data = {

						content: e,

						config: i.initialPreviewConfig,

						tags: i.initialPreviewThumbTags

					}

				},

				count: function() {

					return i.previewCache.data && i.previewCache.data.content ? i.previewCache.data.content.length : 0

				},

				get: function(a, r) {

					var n, o, l, s, d, c, p, u = "init_" + a,

						f = i.previewCache.data,

						m = f.config[a],

						v = f.content[a],

						g = i.previewInitId + "-" + u,

						h = t.ifSet("previewAsData", m, i.initialPreviewAsData),

						w = function(e, a, r, n, o, l, s, d, c) {

							return d = " file-preview-initial " + t.SORT_CSS + (d ? " " + d : ""), i._generatePreviewTemplate(e, a, r,

								n, o, !1, null, d, l, s, c)

						};

					return v ? (r = void 0 === r ? !0 : r, l = t.ifSet("type", m, i.initialPreviewFileType || "generic"), d = t.ifSet(

							"filename", m, t.ifSet("caption", m)), c = t.ifSet("filetype", m, l), s = i.previewCache.footer(a, r, m &&

							m.size || null), p = t.ifSet("frameClass", m), n = h ? w(l, v, d, c, g, s, u, p) : w("generic", v, d, c, g,

							s, u, p, l).setTokens({

							content: f.content[a]

						}), f.tags.length && f.tags[a] && (n = t.replaceTags(n, f.tags[a])), t.isEmpty(m) || t.isEmpty(m.frameAttr) ||

						(o = e(document.createElement("div")).html(n), o.find(".file-preview-initial").attr(m.frameAttr), n = o.html(),

							o.remove()), n) : ""

				},

				add: function(e, a, r, n) {

					var o, l = i.previewCache.data;

					return t.isArray(e) || (e = e.split(i.initialPreviewDelimiter)), n ? (o = l.content.push(e) - 1, l.config[o] =

						a, l.tags[o] = r) : (o = e.length - 1, l.content = e, l.config = a, l.tags = r), i.previewCache.data = l, o

				},

				set: function(e, a, r, n) {

					var o, l, s = i.previewCache.data;

					if (e && e.length && (t.isArray(e) || (e = e.split(i.initialPreviewDelimiter)), l = e.filter(function(e) {

							return null !== e

						}), l.length)) {

						if (void 0 === s.content && (s.content = []), void 0 === s.config && (s.config = []), void 0 === s.tags && (

								s.tags = []), n) {

							for (o = 0; o < e.length; o++) e[o] && s.content.push(e[o]);

							for (o = 0; o < a.length; o++) a[o] && s.config.push(a[o]);

							for (o = 0; o < r.length; o++) r[o] && s.tags.push(r[o])

						} else s.content = e, s.config = a, s.tags = r;

						i.previewCache.data = s

					}

				},

				unset: function(e) {

					var a = i.previewCache.count(),

						r = i.reversePreviewOrder;

					if (a) {

						if (1 === a) return i.previewCache.data.content = [], i.previewCache.data.config = [], i.previewCache.data.tags = [],

							i.initialPreview = [], i.initialPreviewConfig = [], void(i.initialPreviewThumbTags = []);

						i.previewCache.data.content = t.spliceArray(i.previewCache.data.content, e, r), i.previewCache.data.config =

							t.spliceArray(i.previewCache.data.config, e, r), i.previewCache.data.tags = t.spliceArray(i.previewCache.data

								.tags, e, r)

					}

				},

				out: function() {

					var e, t, a, r = "",

						n = i.previewCache.count();

					if (0 === n) return {

						content: "",

						caption: ""

					};

					for (t = 0; n > t; t++) a = i.previewCache.get(t), r = i.reversePreviewOrder ? a + r : r + a;

					return e = i._getMsgSelected(n), {

						content: r,

						caption: e

					}

				},

				footer: function(e, a, r) {

					var n = i.previewCache.data || {};

					if (t.isEmpty(n.content)) return "";

					(t.isEmpty(n.config) || t.isEmpty(n.config[e])) && (n.config[e] = {}), a = void 0 === a ? !0 : a;

					var o, l = n.config[e],

						s = t.ifSet("caption", l),

						d = t.ifSet("width", l, "auto"),

						c = t.ifSet("url", l, !1),

						p = t.ifSet("key", l, null),

						u = i.fileActionSettings,

						f = i.initialPreviewShowDelete || !1,

						m = l.downloadUrl || i.initialPreviewDownloadUrl || "",

						v = l.filename || l.caption || "",

						g = !!m,

						h = t.ifSet("showRemove", l, t.ifSet("showRemove", u, f)),

						w = t.ifSet("showDownload", l, t.ifSet("showDownload", u, g)),

						_ = t.ifSet("showZoom", l, t.ifSet("showZoom", u, !0)),

						b = t.ifSet("showDrag", l, t.ifSet("showDrag", u, !0)),

						C = c === !1 && a;

					return w = w && l.downloadUrl !== !1 && !!m, o = i._renderFileActions(!1, w, h, _, b, C, c, p, !0, m, v), i._getLayoutTemplate(

						"footer").setTokens({

						progress: i._renderThumbProgress(),

						actions: o,

						caption: s,

						size: i._getSize(r),

						width: d,

						indicator: ""

					})

				}

			}, i.previewCache.init()

		},

		_isPdfRendered: function() {

			var e = this,

				t = e.usePdfRenderer,

				i = "function" == typeof t ? t() : !!t;

			return i && e.pdfRendererUrl

		},

		_handler: function(e, t, i) {

			var a = this,

				r = a.namespace,

				n = t.split(" ").join(r + " ") + r;

			e && e.length && e.off(n).on(n, i)

		},

		_log: function(e) {

			var t = this,

				i = t.$element.attr("id");

			i && (e = '"' + i + '": ' + e), e = "bootstrap-fileinput: " + e, "undefined" != typeof window.console.log ?

				window.console.log(e) : window.alert(e)

		},

		_validate: function() {

			var e = this,

				t = "file" === e.$element.attr("type");

			return t || e._log('The input "type" must be set to "file" for initializing the "bootstrap-fileinput" plugin.'),

				t

		},

		_errorsExist: function() {

			var t, i = this,

				a = i.$errorContainer.find("li");

			return a.length ? !0 : (t = e(document.createElement("div")).html(i.$errorContainer.html()), t.find(

				".kv-error-close").remove(), t.find("ul").remove(), !!e.trim(t.text()).length)

		},

		_errorHandler: function(e, t) {

			var i = this,

				a = e.target.error,

				r = function(e) {

					i._showError(e.replace("{name}", t))

				};

			r(a.code === a.NOT_FOUND_ERR ? i.msgFileNotFound : a.code === a.SECURITY_ERR ? i.msgFileSecured : a.code === a.NOT_READABLE_ERR ?

				i.msgFileNotReadable : a.code === a.ABORT_ERR ? i.msgFilePreviewAborted : i.msgFilePreviewError)

		},

		_addError: function(e) {

			var t = this,

				i = t.$errorContainer;

			e && i.length && (i.html(t.errorCloseButton + e), t._handler(i.find(".kv-error-close"), "click", function() {

				setTimeout(function() {

					t.showPreview && !t.getFrames().length && t.clear(), i.fadeOut("slow")

				}, 10)

			}))

		},

		_setValidationError: function(e) {

			var i = this;

			e = (e ? e + " " : "") + "has-error", i.$container.removeClass(e).addClass("has-error"), t.addCss(i.$captionContainer,

				"is-invalid")

		},

		_resetErrors: function(e) {

			var t = this,

				i = t.$errorContainer;

			t.isError = !1, t.$container.removeClass("has-error"), t.$captionContainer.removeClass("is-invalid"), i.html(""),

				e ? i.fadeOut("slow") : i.hide()

		},

		_showFolderError: function(e) {

			var t, i = this,

				a = i.$errorContainer;

			e && (i.isAjaxUpload || i._clearFileInput(), t = i.msgFoldersNotAllowed.replace("{n}", e), i._addError(t), i._setValidationError(),

				a.fadeIn(800), i._raise("filefoldererror", [e, t]))

		},

		_showUploadError: function(e, t, i) {

			var a = this,

				r = a.$errorContainer,

				n = i || "fileuploaderror",

				o = t && t.id ? '<li data-file-id="' + t.id + '">' + e + "</li>" : "<li>" + e + "</li>";

			return 0 === r.find("ul").length ? a._addError("<ul>" + o + "</ul>") : r.find("ul").append(o), r.fadeIn(800), a._raise(

				n, [t, e]), a._setValidationError("file-input-new"), !0

		},

		_showError: function(e, t, i) {

			var a = this,

				r = a.$errorContainer,

				n = i || "fileerror";

			return t = t || {}, t.reader = a.reader, a._addError(e), r.fadeIn(800), a._raise(n, [t, e]), a.isAjaxUpload || a._clearFileInput(),

				a._setValidationError("file-input-new"), a.$btnUpload.attr("disabled", !0), !0

		},

		_noFilesError: function(e) {

			var t = this,

				i = t.minFileCount > 1 ? t.filePlural : t.fileSingle,

				a = t.msgFilesTooLess.replace("{n}", t.minFileCount).replace("{files}", i),

				r = t.$errorContainer;

			t._addError(a), t.isError = !0, t._updateFileDetails(0), r.fadeIn(800), t._raise("fileerror", [e, a]), t._clearFileInput(),

				t._setValidationError()

		},

		_parseError: function(t, i, a, r) {

			var n, o = this,

				l = e.trim(a + ""),

				s = void 0 !== i.responseJSON && void 0 !== i.responseJSON.error ? i.responseJSON.error : i.responseText;

			return o.cancelling && o.msgUploadAborted && (l = o.msgUploadAborted), o.showAjaxErrorDetails && s && (s = e.trim(

				s.replace(/\n\s*\n/g, "\n")), n = s.length ? "<pre>" + s + "</pre>" : "", l += l ? n : s), l || (l = o.msgAjaxError

				.replace("{operation}", t)), o.cancelling = !1, r ? "<b>" + r + ": </b>" + l : l

		},

		_parseFileType: function(e, i) {

			var a, r, n, o, l = this,

				s = l.allowedPreviewTypes || [];

			if ("application/text-plain" === e) return "text";

			for (o = 0; o < s.length; o++)

				if (n = s[o], a = l.fileTypeSettings[n], r = a(e, i) ? n : "", !t.isEmpty(r)) return r;

			return "other"

		},

		_getPreviewIcon: function(t) {

			var i, a = this,

				r = null;

			return t && t.indexOf(".") > -1 && (i = t.split(".").pop(), a.previewFileIconSettings && (r = a.previewFileIconSettings[

				i] || a.previewFileIconSettings[i.toLowerCase()] || null), a.previewFileExtSettings && e.each(a.previewFileExtSettings,

				function(e, t) {

					return a.previewFileIconSettings[e] && t(i) ? void(r = a.previewFileIconSettings[e]) : void 0

				})), r

		},

		_parseFilePreviewIcon: function(e, t) {

			var i = this,

				a = i._getPreviewIcon(t) || i.previewFileIcon,

				r = e;

			return r.indexOf("{previewFileIcon}") > -1 && (r = r.setTokens({

				previewFileIconClass: i.previewFileIconClass,

				previewFileIcon: a

			})), r

		},

		_raise: function(t, i) {

			var a = this,

				r = e.Event(t);

			if (void 0 !== i ? a.$element.trigger(r, i) : a.$element.trigger(r), r.isDefaultPrevented() || r.result === !1)

				return !1;

			switch (t) {

				case "filebatchuploadcomplete":

				case "filebatchuploadsuccess":

				case "fileuploaded":

				case "fileclear":

				case "filecleared":

				case "filereset":

				case "fileerror":

				case "filefoldererror":

				case "fileuploaderror":

				case "filebatchuploaderror":

				case "filedeleteerror":

				case "filecustomerror":

				case "filesuccessremove":

					break;

				default:

					a.ajaxAborted || (a.ajaxAborted = r.result)

			}

			return !0

		},

		_listenFullScreen: function(e) {

			var t, i, a = this,

				r = a.$modal;

			r && r.length && (t = r && r.find(".btn-fullscreen"), i = r && r.find(".btn-borderless"), t.length && i.length &&

				(t.removeClass("active").attr("aria-pressed", "false"), i.removeClass("active").attr("aria-pressed", "false"),

					e ? t.addClass("active").attr("aria-pressed", "true") : i.addClass("active").attr("aria-pressed", "true"), r.hasClass(

						"file-zoom-fullscreen") ? a._maximizeZoomDialog() : e ? a._maximizeZoomDialog() : i.removeClass("active").attr(

						"aria-pressed", "false")))

		},

		_listen: function() {

			var i, a = this,

				r = a.$element,

				n = a.$form,

				o = a.$container;

			a._handler(r, "click", function(e) {

					r.hasClass("file-no-browse") && (r.data("zoneClicked") ? r.data("zoneClicked", !1) : e.preventDefault())

				}), a._handler(r, "change", e.proxy(a._change, a)), a.showBrowse && a._handler(a.$btnFile, "click", e.proxy(a._browse,

					a)), a._handler(o.find(".fileinput-remove:not([disabled])"), "click", e.proxy(a.clear, a)), a._handler(o.find(

					".fileinput-cancel"), "click", e.proxy(a.cancel, a)), a._initDragDrop(), a._handler(n, "reset", e.proxy(a.clear,

					a)), a.isAjaxUpload || a._handler(n, "submit", e.proxy(a._submitForm, a)), a._handler(a.$container.find(

					".fileinput-upload"), "click", e.proxy(a._uploadClick, a)), a._handler(e(window), "resize", function() {

					a._listenFullScreen(screen.width === window.innerWidth && screen.height === window.innerHeight)

				}), i = "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", a._handler(e(document),

					i,

					function() {

						a._listenFullScreen(t.checkFullScreen())

					}), a._autoFitContent(), a._initClickable(),

				a._refreshPreview()

		},

		_autoFitContent: function() {

			var t, i = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,

				a = this,

				r = 400 > i ? a.previewSettingsSmall || a.defaults.previewSettingsSmall : a.previewSettings || a.defaults.previewSettings;

			e.each(r, function(e, i) {

				t = ".file-preview-frame .file-preview-" + e, a.$preview.find(t + ".kv-preview-data," + t +

					" .kv-preview-data").css(i)

			})

		},

		_scanDroppedItems: function(e, t, i) {

			i = i || "";

			var a, r, n, o = this,

				l = function(e) {

					o._log("Error scanning dropped files!"), o._log(e)

				};

			e.isFile ? e.file(function(e) {

				t.push(e)

			}, l) : e.isDirectory && (r = e.createReader(), (n = function() {

				r.readEntries(function(r) {

					if (r && r.length > 0) {

						for (a = 0; a < r.length; a++) o._scanDroppedItems(r[a], t, i + e.name + "/");

						n()

					}

					return null

				}, l)

			})())

		},

		_initDragDrop: function() {

			var t = this,

				i = t.$dropZone;

			t.dropZoneEnabled && t.showPreview && (t._handler(i, "dragenter dragover", e.proxy(t._zoneDragEnter, t)), t._handler(

				i, "dragleave", e.proxy(t._zoneDragLeave, t)), t._handler(i, "drop", e.proxy(t._zoneDrop, t)), t._handler(e(

				document), "dragenter dragover drop", t._zoneDragDropInit))

		},

		_zoneDragDropInit: function(e) {

			e.stopPropagation(), e.preventDefault()

		},

		_zoneDragEnter: function(i) {

			var a = this,

				r = e.inArray("Files", i.originalEvent.dataTransfer.types) > -1;

			return a._zoneDragDropInit(i), a.isDisabled || !r ? (i.originalEvent.dataTransfer.effectAllowed = "none", void(i.originalEvent

				.dataTransfer.dropEffect = "none")) : void t.addCss(a.$dropZone, "file-highlighted")

		},

		_zoneDragLeave: function(e) {

			var t = this;

			t._zoneDragDropInit(e), t.isDisabled || t.$dropZone.removeClass("file-highlighted")

		},

		_zoneDrop: function(e) {

			var i, a = this,

				r = a.$element,

				n = e.originalEvent.dataTransfer,

				o = n.files,

				l = n.items,

				s = t.getDragDropFolders(l),

				d = function() {

					a.isAjaxUpload ? a._change(e, o) : (a.changeTriggered = !0, r.get(0).files = o, setTimeout(function() {

						a.changeTriggered = !1, r.trigger("change" + a.namespace)

					}, 10)), a.$dropZone.removeClass("file-highlighted")

				};

			if (e.preventDefault(), !a.isDisabled && !t.isEmpty(o))

				if (s > 0) {

					if (!a.isAjaxUpload) return void a._showFolderError(s);

					for (o = [], i = 0; i < l.length; i++) {

						var c = l[i].webkitGetAsEntry();

						c && a._scanDroppedItems(c, o)

					}

					setTimeout(function() {

						d()

					}, 500)

				} else d()

		},

		_uploadClick: function(e) {

			var i, a = this,

				r = a.$container.find(".fileinput-upload"),

				n = !r.hasClass("disabled") && t.isEmpty(r.attr("disabled"));

			if (!e || !e.isDefaultPrevented()) {

				if (!a.isAjaxUpload) return void(n && "submit" !== r.attr("type") && (i = r.closest("form"), i.length && i.trigger(

					"submit"), e.preventDefault()));

				e.preventDefault(), n && a.upload()

			}

		},

		_submitForm: function() {

			var e = this;

			return e._isFileSelectionValid() && !e._abort({})

		},

		_clearPreview: function() {

			var i = this,

				a = i.$preview,

				r = i.showUploadedThumbs ? i.getFrames(":not(.file-preview-success)") : i.getFrames();

			r.each(function() {

				var i = e(this);

				i.remove(), t.cleanZoomCache(a.find("#zoom-" + i.attr("id")))

			}), i.getFrames().length && i.showPreview || i._resetUpload(), i._validateDefaultPreview()

		},

		_initSortable: function() {

			var i, a = this,

				r = a.$preview,

				n = "." + t.SORT_CSS,

				o = a.reversePreviewOrder;

			window.KvSortable && 0 !== r.find(n).length && (i = {

				handle: ".drag-handle-init",

				dataIdAttr: "data-preview-id",

				scroll: !1,

				draggable: n,

				onSort: function(i) {

					var r = i.oldIndex,

						n = i.newIndex,

						l = 0;

					a.initialPreview = t.moveArray(a.initialPreview, r, n, o), a.initialPreviewConfig = t.moveArray(a.initialPreviewConfig,

						r, n, o), a.previewCache.init(), a.getFrames(".file-preview-initial").each(function() {

						e(this).attr("data-fileindex", "init_" + l), l++

					}), a._raise("filesorted", {

						previewId: e(i.item).attr("id"),

						oldIndex: r,

						newIndex: n,

						stack: a.initialPreviewConfig

					})

				}

			}, r.data("kvsortable") && r.kvsortable("destroy"), e.extend(!0, i, a.fileActionSettings.dragSettings), r.kvsortable(

				i))

		},

		_setPreviewContent: function(e) {

			var t = this;

			t.$preview.html(e), t._autoFitContent()

		},

		_initPreview: function(e) {

			var i, a = this,

				r = a.initialCaption || "";

			return a.previewCache.count() ? (i = a.previewCache.out(), r = e && a.initialCaption ? a.initialCaption : i.caption,

				a._setPreviewContent(i.content), a._setInitThumbAttr(), a._setCaption(r), a._initSortable(), void(t.isEmpty(i.content) ||

					a.$container.removeClass("file-input-new"))) : (a._clearPreview(), void(e ? a._setCaption(r) : a._initCaption()))

		},

		_getZoomButton: function(e) {

			var t = this,

				i = t.previewZoomButtonIcons[e],

				a = t.previewZoomButtonClasses[e],

				r = ' title="' + (t.previewZoomButtonTitles[e] || "") + '" ',

				n = r + ("close" === e ? ' data-dismiss="modal" aria-hidden="true"' : "");

			return "fullscreen" !== e && "borderless" !== e && "toggleheader" !== e || (n +=

					' data-toggle="button" aria-pressed="false" autocomplete="off"'), '<button type="button" class="' + a + " btn-" +

				e + '"' + n + ">" + i + "</button>"

		},

		_getModalContent: function() {

			var e = this;

			return e._getLayoutTemplate("modal").setTokens({

				rtl: e.rtl ? " kv-rtl" : "",

				zoomFrameClass: e.frameClass,

				heading: e.msgZoomModalHeading,

				prev: e._getZoomButton("prev"),

				next: e._getZoomButton("next"),

				toggleheader: e._getZoomButton("toggleheader"),

				fullscreen: e._getZoomButton("fullscreen"),

				borderless: e._getZoomButton("borderless"),

				close: e._getZoomButton("close")

			})

		},

		_listenModalEvent: function(e) {

			var i = this,

				a = i.$modal,

				r = function(e) {

					return {

						sourceEvent: e,

						previewId: a.data("previewId"),

						modal: a

					}

				};

			a.on(e + ".bs.modal", function(n) {

				var o = a.find(".btn-fullscreen"),

					l = a.find(".btn-borderless");

				i._raise("filezoom" + e, r(n)), "shown" === e && (l.removeClass("active").attr("aria-pressed", "false"), o.removeClass(

					"active").attr("aria-pressed", "false"), a.hasClass("file-zoom-fullscreen") && (i._maximizeZoomDialog(), t.checkFullScreen() ?

					o.addClass("active").attr("aria-pressed", "true") : l.addClass("active").attr("aria-pressed", "true")))

			})

		},

		_initZoom: function() {

			var i, a = this,

				r = a._getLayoutTemplate("modalMain"),

				n = "#" + t.MODAL_ID;

			a.showPreview && (a.$modal = e(n), a.$modal && a.$modal.length || (i = e(document.createElement("div")).html(r).insertAfter(

					a.$container), a.$modal = e(n).insertBefore(i), i.remove()), t.initModal(a.$modal), a.$modal.html(a._getModalContent()),

				e.each(t.MODAL_EVENTS, function(e, t) {

					a._listenModalEvent(t)

				}))

		},

		_initZoomButtons: function() {

			var t, i, a = this,

				r = a.$modal.data("previewId") || "",

				n = a.getFrames().toArray(),

				o = n.length,

				l = a.$modal.find(".btn-prev"),

				s = a.$modal.find(".btn-next");

			return n.length < 2 ? (l.hide(), void s.hide()) : (l.show(), s.show(), void(o && (t = e(n[0]), i = e(n[o - 1]), l

				.removeAttr("disabled"), s.removeAttr("disabled"), t.length && t.attr("id") === r && l.attr("disabled", !0),

				i.length && i.attr("id") === r && s.attr("disabled", !0))))

		},

		_maximizeZoomDialog: function() {

			var t = this,

				i = t.$modal,

				a = i.find(".modal-header:visible"),

				r = i.find(".modal-footer:visible"),

				n = i.find(".modal-body"),

				o = e(window).height(),

				l = 0;

			i.addClass("file-zoom-fullscreen"), a && a.length && (o -= a.outerHeight(!0)), r && r.length && (o -= r.outerHeight(

				!0)), n && n.length && (l = n.outerHeight(!0) - n.height(), o -= l), i.find(".kv-zoom-body").height(o)

		},

		_resizeZoomDialog: function(e) {

			var i = this,

				a = i.$modal,

				r = a.find(".btn-fullscreen"),

				n = a.find(".btn-borderless");

			if (a.hasClass("file-zoom-fullscreen")) t.toggleFullScreen(!1), e ? r.hasClass("active") || (a.removeClass(

				"file-zoom-fullscreen"), i._resizeZoomDialog(!0), n.hasClass("active") && n.removeClass("active").attr(

				"aria-pressed", "false")) : r.hasClass("active") ? r.removeClass("active").attr("aria-pressed", "false") : (a.removeClass(

				"file-zoom-fullscreen"), i.$modal.find(".kv-zoom-body").css("height", i.zoomModalHeight));

			else {

				if (!e) return void i._maximizeZoomDialog();

				t.toggleFullScreen(!0)

			}

			a.focus()

		},

		_setZoomContent: function(i, a) {

			var r, n, o, l, s, d, c, p, u, f, m = this,

				v = i.attr("id"),

				g = m.$modal,

				h = g.find(".btn-prev"),

				w = g.find(".btn-next"),

				_ = g.find(".btn-fullscreen"),

				b = g.find(".btn-borderless"),

				C = g.find(".btn-toggleheader"),

				y = m.$preview.find("#zoom-" + v);

			n = y.attr("data-template") || "generic", r = y.find(".kv-file-content"), o = r.length ? r.html() : "", u = i.data(

				"caption") || "", f = i.data("size") || "", l = u + " " + f, g.find(".kv-zoom-title").attr("title", e("<div/>")

				.html(l).text()).html(l), s = g.find(".kv-zoom-body"), g.removeClass("kv-single-content"), a ? (p = s.addClass(

				"file-thumb-loading").clone().insertAfter(s), s.html(o).hide(), p.fadeOut("fast", function() {

				s.fadeIn("fast", function() {

					s.removeClass("file-thumb-loading")

				}), p.remove()

			})) : s.html(o), c = m.previewZoomSettings[n], c && (d = s.find(".kv-preview-data"), t.addCss(d,

				"file-zoom-detail"), e.each(c, function(e, t) {

				d.css(e, t), (d.attr("width") && "width" === e || d.attr("height") && "height" === e) && d.removeAttr(e)

			})), g.data("previewId", v), m._handler(h, "click", function() {

				m._zoomSlideShow("prev", v)

			}), m._handler(w, "click", function() {

				m._zoomSlideShow("next", v)

			}), m._handler(_, "click", function() {

				m._resizeZoomDialog(!0)

			}), m._handler(b, "click", function() {

				m._resizeZoomDialog(!1)

			}), m._handler(C, "click", function() {

				var e, t = g.find(".modal-header"),

					i = g.find(".modal-body .floating-buttons"),

					a = t.find(".kv-zoom-actions"),

					r = function(e) {

						var i = m.$modal.find(".kv-zoom-body"),

							a = m.zoomModalHeight;

						g.hasClass("file-zoom-fullscreen") && (a = i.outerHeight(!0), e || (a -= t.outerHeight(!0))), i.css("height",

							e ? a + e : a)

					};

				t.is(":visible") ? (e = t.outerHeight(!0), t.slideUp("slow", function() {

					a.find(".btn").appendTo(i), r(e)

				})) : (i.find(".btn").appendTo(a), t.slideDown("slow", function() {

					r()

				})), g.focus()

			}), m._handler(g, "keydown", function(e) {

				var t = e.which || e.keyCode;

				37 !== t || h.attr("disabled") || m._zoomSlideShow("prev", v), 39 !== t || w.attr("disabled") || m._zoomSlideShow(

					"next", v)

			})

		},

		_zoomPreview: function(e) {

			var i, a = this,

				r = a.$modal;

			if (!e.length) throw "Cannot zoom to detailed preview!";

			t.initModal(r), r.html(a._getModalContent()), i = e.closest(t.FRAMES), a._setZoomContent(i), r.modal("show"), a._initZoomButtons()

		},

		_zoomSlideShow: function(t, i) {

			var a, r, n, o = this,

				l = o.$modal.find(".kv-zoom-actions .btn-" + t),

				s = o.getFrames().toArray(),

				d = s.length;

			if (!l.attr("disabled")) {

				for (r = 0; d > r; r++)

					if (e(s[r]).attr("id") === i) {

						n = "prev" === t ? r - 1 : r + 1;

						break

					} 0 > n || n >= d || !s[n] || (a = e(s[n]), a.length && o._setZoomContent(a, !0), o._initZoomButtons(), o._raise(

					"filezoom" + t, {

						previewId: i,

						modal: o.$modal

					}))

			}

		},

		_initZoomButton: function() {

			var t = this;

			t.$preview.find(".kv-file-zoom").each(function() {

				var i = e(this);

				t._handler(i, "click", function() {

					t._zoomPreview(i)

				})

			})

		},

		_inputFileCount: function() {

			return this.$element.get(0).files.length

		},

		_refreshPreview: function() {

			var e, t = this;

			t._inputFileCount() && t.showPreview && t.isPreviewable && (t.isAjaxUpload ? (e = t.getFileStack(), t.filestack = [],

					e.length ? t._clearFileInput() : e = t.$element.get(0).files) : e = t.$element.get(0).files, e && e.length &&

				(t.readFiles(e), t._setFileDropZoneTitle()))

		},

		_clearObjects: function(t) {

			t.find("video audio").each(function() {

				this.pause(), e(this).remove()

			}), t.find("img object div").each(function() {

				e(this).remove()

			})

		},

		_clearFileInput: function() {

			var t, i, a, r = this,

				n = r.$element;

			r._inputFileCount() && (t = n.closest("form"), i = e(document.createElement("form")), a = e(document.createElement(

					"div")), n.before(a), t.length ? t.after(i) : a.after(i), i.append(n).trigger("reset"), a.before(n).remove(),

				i.remove())

		},

		_resetUpload: function() {

			var e = this;

			e.uploadCache = {

					content: [],

					config: [],

					tags: [],

					append: !0

				}, e.uploadCount = 0, e.uploadStatus = {}, e.uploadLog = [], e.uploadAsyncCount = 0, e.loadedImages = [], e.totalImagesCount =

				0, e.$btnUpload.removeAttr("disabled"), e._setProgress(0), e.$progress.hide(), e._resetErrors(!1), e.ajaxAborted = !

				1, e.ajaxRequests = [], e._resetCanvas(), e.cacheInitialPreview = {}, e.overwriteInitial && (e.initialPreview = [],

					e.initialPreviewConfig = [], e.initialPreviewThumbTags = [], e.previewCache.data = {

						content: [],

						config: [],

						tags: []

					})

		},

		_resetCanvas: function() {

			var e = this;

			e.canvas && e.imageCanvasContext && e.imageCanvasContext.clearRect(0, 0, e.canvas.width, e.canvas.height)

		},

		_hasInitialPreview: function() {

			var e = this;

			return !e.overwriteInitial && e.previewCache.count()

		},

		_resetPreview: function() {

			var e, t, i = this;

			i.previewCache.count() ? (e = i.previewCache.out(), i._setPreviewContent(e.content), i._setInitThumbAttr(), t = i

					.initialCaption ? i.initialCaption : e.caption, i._setCaption(t)) : (i._clearPreview(), i._initCaption()), i.showPreview &&

				(i._initZoom(), i._initSortable())

		},

		_clearDefaultPreview: function() {

			var e = this;

			e.$preview.find(".file-default-preview").remove()

		},

		_validateDefaultPreview: function() {

			var e = this;

			e.showPreview && !t.isEmpty(e.defaultPreviewContent) && (e._setPreviewContent(

				'<div class="file-default-preview">' + e.defaultPreviewContent + "</div>"), e.$container.removeClass(

				"file-input-new"), e._initClickable())

		},

		_resetPreviewThumbs: function(e) {

			var t, i = this;

			return e ? (i._clearPreview(), void i.clearStack()) : void(i._hasInitialPreview() ? (t = i.previewCache.out(), i._setPreviewContent(

				t.content), i._setInitThumbAttr(), i._setCaption(t.caption), i._initPreviewActions()) : i._clearPreview())

		},

		_getLayoutTemplate: function(e) {

			var i = this,

				a = i.layoutTemplates[e];

			return t.isEmpty(i.customLayoutTags) ? a : t.replaceTags(a, i.customLayoutTags)

		},

		_getPreviewTemplate: function(e) {

			var i = this,

				a = i.previewTemplates[e];

			return t.isEmpty(i.customPreviewTags) ? a : t.replaceTags(a, i.customPreviewTags)

		},

		_getOutData: function(e, t, i) {

			var a = this;

			return e = e || {}, t = t || {}, i = i || a.filestack.slice(0) || {}, {

				form: a.formdata,

				files: i,

				filenames: a.filenames,

				filescount: a.getFilesCount(),

				extra: a._getExtraData(),

				response: t,

				reader: a.reader,

				jqXHR: e

			}

		},

		_getMsgSelected: function(e) {

			var t = this,

				i = 1 === e ? t.fileSingle : t.filePlural;

			return e > 0 ? t.msgSelected.replace("{n}", e).replace("{files}", i) : t.msgNoFilesSelected

		},

		_getFrame: function(t) {

			var i = this,

				a = e("#" + t);

			return a.length ? a : (i._log('Invalid thumb frame with id: "' + t + '".'), null)

		},

		_getThumbs: function(e) {

			return e = e || "", this.getFrames(":not(.file-preview-initial)" + e)

		},

		_getExtraData: function(e, t) {

			var i = this,

				a = i.uploadExtraData;

			return "function" == typeof i.uploadExtraData && (a = i.uploadExtraData(e, t)), a

		},

		_initXhr: function(e, t, i) {

			var a = this;

			return e.upload && e.upload.addEventListener("progress", function(e) {

				var r = 0,

					n = e.total,

					o = e.loaded || e.position;

				e.lengthComputable && (r = Math.floor(o / n * 100)), t ? a._setAsyncUploadStatus(t, r, i) : a._setProgress(r)

			}, !1), e

		},

		_initAjaxSettings: function() {

			var t = this;

			t._ajaxSettings = e.extend(!0, {}, t.ajaxSettings), t._ajaxDeleteSettings = e.extend(!0, {}, t.ajaxDeleteSettings)

		},

		_mergeAjaxCallback: function(e, t, i) {

			var a, r = this,

				n = r._ajaxSettings,

				o = r.mergeAjaxCallbacks;

			"delete" === i && (n = r._ajaxDeleteSettings, o = r.mergeAjaxDeleteCallbacks), a = n[e], o && "function" ==

				typeof a ? "before" === o ? n[e] = function() {

					a.apply(this, arguments), t.apply(this, arguments)

				} : n[e] = function() {

					t.apply(this, arguments), a.apply(this, arguments)

				} : n[e] = t

		},

		_ajaxSubmit: function(t, i, a, r, n, o) {

			var l, s = this;

			s._raise("filepreajax", [n, o]) && (s._uploadExtra(n, o), s._initAjaxSettings(), s._mergeAjaxCallback(

				"beforeSend", t), s._mergeAjaxCallback("success", i), s._mergeAjaxCallback("complete", a), s._mergeAjaxCallback(

				"error", r), l = e.extend(!0, {}, {

				xhr: function() {

					var t = e.ajaxSettings.xhr();

					return s._initXhr(t, n, s.getFileStack().length)

				},

				url: o && s.uploadUrlThumb ? s.uploadUrlThumb : s.uploadUrl,

				type: "POST",

				dataType: "json",

				data: s.formdata,

				cache: !1,

				processData: !1,

				contentType: !1

			}, s._ajaxSettings), s.ajaxRequests.push(e.ajax(l)))

		},

		_mergeArray: function(e, i) {

			var a = this,

				r = t.cleanArray(a[e]),

				n = t.cleanArray(i);

			a[e] = r.concat(n)

		},

		_initUploadSuccess: function(i, a, r) {

			var n, o, l, s, d, c, p, u, f, m = this;

			m.showPreview && "object" == typeof i && !e.isEmptyObject(i) && void 0 !== i.initialPreview && i.initialPreview.length >

				0 && (m.hasInitData = !0, c = i.initialPreview || [], p = i.initialPreviewConfig || [], u = i.initialPreviewThumbTags ||

					[], n = void 0 === i.append || i.append, c.length > 0 && !t.isArray(c) && (c = c.split(m.initialPreviewDelimiter)),

					m._mergeArray("initialPreview", c), m._mergeArray("initialPreviewConfig", p), m._mergeArray(

						"initialPreviewThumbTags", u), void 0 !== a ? r ? (f = a.attr("data-fileindex"), m.uploadCache.content[f] = c[

						0], m.uploadCache.config[f] = p[0] || [], m.uploadCache.tags[f] = u[0] || [], m.uploadCache.append = n) : (l =

						m.previewCache.add(c, p[0], u[0], n), o = m.previewCache.get(l, !1), s = e(document.createElement("div")).html(

							o).hide().insertAfter(a), d = s.find(".kv-zoom-cache"), d && d.length && d.insertAfter(a), a.fadeOut("slow",

							function() {

								var e = s.find(".file-preview-frame");

								e && e.length && e.insertBefore(a).fadeIn("slow").css("display:inline-block"), m._initPreviewActions(), m._clearFileInput(),

									t.cleanZoomCache(m.$preview.find("#zoom-" + a.attr("id"))), a.remove(), s.remove(), m._initSortable()

							})) : (m.previewCache.set(c, p, u, n), m._initPreview(), m._initPreviewActions()))

		},

		_initSuccessThumbs: function() {

			var i = this;

			i.showPreview && i._getThumbs(t.FRAMES + ".file-preview-success").each(function() {

				var a = e(this),

					r = i.$preview,

					n = a.find(".kv-file-remove");

				n.removeAttr("disabled"), i._handler(n, "click", function() {

					var e = a.attr("id"),

						n = i._raise("filesuccessremove", [e, a.attr("data-fileindex")]);

					t.cleanMemory(a), n !== !1 && a.fadeOut("slow", function() {

						t.cleanZoomCache(r.find("#zoom-" + e)), a.remove(), i.getFrames().length || i.reset()

					})

				})

			})

		},

		_checkAsyncComplete: function() {

			var t, i, a = this;

			for (i = 0; i < a.filestack.length; i++)

				if (a.filestack[i] && (t = a.previewInitId + "-" + i, -1 === e.inArray(t, a.uploadLog))) return !1;

			return a.uploadAsyncCount === a.uploadLog.length

		},

		_uploadExtra: function(t, i) {

			var a = this,

				r = a._getExtraData(t, i);

			0 !== r.length && e.each(r, function(e, t) {

				a.formdata.append(e, t)

			})

		},

		_uploadSingle: function(i, a) {

			var r, n, o, l, s, d, c, p, u, f, m, v = this,

				g = v.getFileStack().length,

				h = new FormData,

				w = v.previewInitId + "-" + i,

				_ = v.filestack.length > 0 || !e.isEmptyObject(v.uploadExtraData),

				b = e("#" + w).find(".file-thumb-progress"),

				C = {

					id: w,

					index: i

				};

			v.formdata = h, v.showPreview && (n = e("#" + w + ":not(.file-preview-initial)"), l = n.find(".kv-file-upload"),

				s = n.find(".kv-file-remove"), b.show()), 0 === g || !_ || l && l.hasClass("disabled") || v._abort(C) || (m =

				function(e, t) {

					d || v.updateStack(e, void 0), v.uploadLog.push(t), v._checkAsyncComplete() && (v.fileBatchCompleted = !0)

				}, o = function() {

					var e, i, a, r = v.uploadCache,

						n = 0,

						o = v.cacheInitialPreview;

					v.fileBatchCompleted && (o && o.content && (n = o.content.length), setTimeout(function() {

						var l = 0 === v.getFileStack(!0).length;

						if (v.showPreview) {

							if (v.previewCache.set(r.content, r.config, r.tags, r.append), n) {

								for (i = 0; i < r.content.length; i++) a = i + n, o.content[a] = r.content[i], o.config.length && (o.config[

									a] = r.config[i]), o.tags.length && (o.tags[a] = r.tags[i]);

								v.initialPreview = t.cleanArray(o.content), v.initialPreviewConfig = t.cleanArray(o.config), v.initialPreviewThumbTags =

									t.cleanArray(o.tags)

							} else v.initialPreview = r.content, v.initialPreviewConfig = r.config, v.initialPreviewThumbTags = r.tags;

							v.cacheInitialPreview = {}, v.hasInitData && (v._initPreview(), v._initPreviewActions())

						}

						v.unlock(l), l && v._clearFileInput(), e = v.$preview.find(".file-preview-initial"), v.uploadAsync && e.length &&

							(t.addCss(e, t.SORT_CSS), v._initSortable()), v._raise("filebatchuploadcomplete", [v.filestack, v._getExtraData()]),

							v.uploadCount = 0, v.uploadStatus = {}, v.uploadLog = [], v._setProgress(101), v.ajaxAborted = !1

					}, 100))

				}, c = function(o) {

					r = v._getOutData(o), v.fileBatchCompleted = !1, a || (v.ajaxAborted = !1), v.showPreview && (n.hasClass(

						"file-preview-success") || (v._setThumbStatus(n, "Loading"), t.addCss(n, "file-uploading")), l.attr(

						"disabled", !0), s.attr("disabled", !0)), a || v.lock(), v._raise("filepreupload", [r, w, i]), e.extend(!0,

						C, r), v._abort(C) && (o.abort(), a || (v._setThumbStatus(n, "New"), n.removeClass("file-uploading"), l.removeAttr(

						"disabled"), s.removeAttr("disabled"), v.unlock()), v._setProgressCancelled())

				}, p = function(o, s, c) {

					var p = v.showPreview && n.attr("id") ? n.attr("id") : w;

					r = v._getOutData(c, o), e.extend(!0, C, r), setTimeout(function() {

						t.isEmpty(o) || t.isEmpty(o.error) ? (v.showPreview && (v._setThumbStatus(n, "Success"), l.hide(), v._initUploadSuccess(

							o, n, a), v._setProgress(101, b)), v._raise("fileuploaded", [r, p, i]), a ? m(i, p) : v.updateStack(i,

							void 0)) : (d = !0, v._showUploadError(o.error, C), v._setPreviewError(n, i, v.filestack[i], v.retryErrorUploads),

							v.retryErrorUploads || l.hide(), a && m(i, p), v._setProgress(101, e("#" + p).find(".file-thumb-progress"),

								v.msgUploadError))

					}, 100)

				}, u = function() {

					setTimeout(function() {

						v.showPreview && (l.removeAttr("disabled"), s.removeAttr("disabled"), n.removeClass("file-uploading")), a ?

							o() : (v.unlock(!1), v._clearFileInput()), v._initSuccessThumbs()

					}, 100)

				}, f = function(t, r, o) {

					var s = v.ajaxOperations.uploadThumb,

						c = v._parseError(s, t, o, a && v.filestack[i].name ? v.filestack[i].name : null);

					d = !0, setTimeout(function() {

						a && m(i, w), v.uploadStatus[w] = 100, v._setPreviewError(n, i, v.filestack[i], v.retryErrorUploads), v.retryErrorUploads ||

							l.hide(), e.extend(!0, C, v._getOutData(t)), v._setProgress(101, b, v.msgAjaxProgressError.replace(

								"{operation}", s)), v._setProgress(101, e("#" + w).find(".file-thumb-progress"), v.msgUploadError), v._showUploadError(

								c, C)

					}, 100)

				}, h.append(v.uploadFileAttr, v.filestack[i], v.filenames[i]), h.append("file_id", i), v._ajaxSubmit(c, p, u, f,

					w, i))

		},

		_uploadBatch: function() {

			var i, a, r, n, o, l = this,

				s = l.filestack,

				d = s.length,

				c = {},

				p = l.filestack.length > 0 || !e.isEmptyObject(l.uploadExtraData);

			l.formdata = new FormData, 0 !== d && p && !l._abort(c) && (o = function() {

				e.each(s, function(e) {

					l.updateStack(e, void 0)

				}), l._clearFileInput()

			}, i = function(i) {

				l.lock();

				var a = l._getOutData(i);

				l.ajaxAborted = !1, l.showPreview && l._getThumbs().each(function() {

					var i = e(this),

						a = i.find(".kv-file-upload"),

						r = i.find(".kv-file-remove");

					i.hasClass("file-preview-success") || (l._setThumbStatus(i, "Loading"), t.addCss(i, "file-uploading")), a.attr(

						"disabled", !0), r.attr("disabled", !0)

				}), l._raise("filebatchpreupload", [a]), l._abort(a) && (i.abort(), l._getThumbs().each(function() {

					var t = e(this),

						i = t.find(".kv-file-upload"),

						a = t.find(".kv-file-remove");

					t.hasClass("file-preview-loading") && (l._setThumbStatus(t, "New"), t.removeClass("file-uploading")), i.removeAttr(

						"disabled"), a.removeAttr("disabled")

				}), l._setProgressCancelled())

			}, a = function(i, a, r) {

				var n = l._getOutData(r, i),

					s = 0,

					d = l._getThumbs(":not(.file-preview-success)"),

					c = t.isEmpty(i) || t.isEmpty(i.errorkeys) ? [] : i.errorkeys;

				t.isEmpty(i) || t.isEmpty(i.error) ? (l._raise("filebatchuploadsuccess", [n]), o(), l.showPreview ? (d.each(

					function() {

						var t = e(this);

						l._setThumbStatus(t, "Success"), t.removeClass("file-uploading"), t.find(".kv-file-upload").hide().removeAttr(

							"disabled")

					}), l._initUploadSuccess(i)) : l.reset(), l._setProgress(101)) : (l.showPreview && (d.each(function() {

					var t = e(this),

						i = t.attr("data-fileindex");

					t.removeClass("file-uploading"), t.find(".kv-file-upload").removeAttr("disabled"), t.find(

						".kv-file-remove").removeAttr("disabled"), 0 === c.length || -1 !== e.inArray(s, c) ? (l._setPreviewError(

						t, i, l.filestack[i], l.retryErrorUploads), l.retryErrorUploads || (t.find(".kv-file-upload").hide(),

						l.updateStack(i, void 0))) : (t.find(".kv-file-upload").hide(), l._setThumbStatus(t, "Success"), l.updateStack(

						i, void 0)), t.hasClass("file-preview-error") && !l.retryErrorUploads || s++

				}), l._initUploadSuccess(i)), l._showUploadError(i.error, n, "filebatchuploaderror"), l._setProgress(101, l.$progress,

					l.msgUploadError))

			}, n = function() {

				l.unlock(), l._initSuccessThumbs(), l._clearFileInput(), l._raise("filebatchuploadcomplete", [l.filestack, l._getExtraData()])

			}, r = function(t, i, a) {

				var r = l._getOutData(t),

					n = l.ajaxOperations.uploadBatch,

					o = l._parseError(n, t, a);

				l._showUploadError(o, r, "filebatchuploaderror"), l.uploadFileCount = d - 1, l.showPreview && (l._getThumbs().each(

						function() {

							var t = e(this),

								i = t.attr("data-fileindex");

							t.removeClass("file-uploading"), void 0 !== l.filestack[i] && l._setPreviewError(t)

						}), l._getThumbs().removeClass("file-uploading"), l._getThumbs(" .kv-file-upload").removeAttr("disabled"),

					l._getThumbs(" .kv-file-delete").removeAttr("disabled"), l._setProgress(101, l.$progress, l.msgAjaxProgressError

						.replace("{operation}", n)))

			}, e.each(s, function(e, i) {

				t.isEmpty(s[e]) || l.formdata.append(l.uploadFileAttr, i, l.filenames[e])

			}), l._ajaxSubmit(i, a, n, r))

		},

		_uploadExtraOnly: function() {

			var e, i, a, r, n = this,

				o = {};

			n.formdata = new FormData, n._abort(o) || (e = function(e) {

				n.lock();

				var t = n._getOutData(e);

				n._raise("filebatchpreupload", [t]), n._setProgress(50), o.data = t, o.xhr = e, n._abort(o) && (e.abort(), n._setProgressCancelled())

			}, i = function(e, i, a) {

				var r = n._getOutData(a, e);

				t.isEmpty(e) || t.isEmpty(e.error) ? (n._raise("filebatchuploadsuccess", [r]), n._clearFileInput(), n._initUploadSuccess(

					e), n._setProgress(101)) : n._showUploadError(e.error, r, "filebatchuploaderror")

			}, a = function() {

				n.unlock(), n._clearFileInput(), n._raise("filebatchuploadcomplete", [n.filestack, n._getExtraData()])

			}, r = function(e, t, i) {

				var a = n._getOutData(e),

					r = n.ajaxOperations.uploadExtra,

					l = n._parseError(r, e, i);

				o.data = a, n._showUploadError(l, a, "filebatchuploaderror"), n._setProgress(101, n.$progress, n.msgAjaxProgressError

					.replace("{operation}", r))

			}, n._ajaxSubmit(e, i, a, r))

		},

		_deleteFileIndex: function(i) {

			var a = this,

				r = i.attr("data-fileindex"),

				n = a.reversePreviewOrder;

			"init_" === r.substring(0, 5) && (r = parseInt(r.replace("init_", "")), a.initialPreview = t.spliceArray(a.initialPreview,

				r, n), a.initialPreviewConfig = t.spliceArray(a.initialPreviewConfig, r, n), a.initialPreviewThumbTags = t.spliceArray(

				a.initialPreviewThumbTags, r, n), a.getFrames().each(function() {

				var t = e(this),

					i = t.attr("data-fileindex");

				"init_" === i.substring(0, 5) && (i = parseInt(i.replace("init_", "")), i > r && (i--, t.attr(

					"data-fileindex", "init_" + i)))

			}), a.uploadAsync && (a.cacheInitialPreview = a.getPreview()))

		},

		_initFileActions: function() {

			var i = this,

				a = i.$preview;

			i.showPreview && (i._initZoomButton(), i.getFrames(" .kv-file-remove").each(function() {

				var r, n, o, l, s = e(this),

					d = s.closest(t.FRAMES),

					c = d.attr("id"),

					p = d.attr("data-fileindex");

				i._handler(s, "click", function() {

					return l = i._raise("filepreremove", [c, p]), l !== !1 && i._validateMinCount() ? (r = d.hasClass(

						"file-preview-error"), t.cleanMemory(d), void d.fadeOut("slow", function() {

						t.cleanZoomCache(a.find("#zoom-" + c)), i.updateStack(p, void 0), i._clearObjects(d), d.remove(), c &&

							r && i.$errorContainer.find('li[data-file-id="' + c + '"]').fadeOut("fast", function() {

								e(this).remove(), i._errorsExist() || i._resetErrors()

							}), i._clearFileInput();

						var l = i.getFileStack(!0),

							s = i.previewCache.count(),

							u = l.length,

							f = i.showPreview && i.getFrames().length;

						0 !== u || 0 !== s || f ? (n = s + u, o = n > 1 ? i._getMsgSelected(n) : l[0] ? i._getFileNames()[0] :

							"", i._setCaption(o)) : i.reset(), i._raise("fileremoved", [c, p])

					})) : !1

				})

			}), i.getFrames(" .kv-file-upload").each(function() {

				var a = e(this);

				i._handler(a, "click", function() {

					var e = a.closest(t.FRAMES),

						r = e.attr("data-fileindex");

					i.$progress.hide(), e.hasClass("file-preview-error") && !i.retryErrorUploads || i._uploadSingle(r, !1)

				})

			}))

		},

		_initPreviewActions: function() {

			var i = this,

				a = i.$preview,

				r = i.deleteExtraData || {},

				n = t.FRAMES + " .kv-file-remove",

				o = i.fileActionSettings,

				l = o.removeClass,

				s = o.removeErrorClass,

				d = function() {

					var e = i.isAjaxUpload ? i.previewCache.count() : i._inputFileCount();

					a.find(t.FRAMES).length || e || (i._setCaption(""), i.reset(), i.initialCaption = "")

				};

			i._initZoomButton(), a.find(n).each(function() {

				var n, o, c, p = e(this),

					u = p.data("url") || i.deleteUrl,

					f = p.data("key");

				if (!t.isEmpty(u) && void 0 !== f) {

					var m, v, g, h, w = p.closest(t.FRAMES),

						_ = i.previewCache.data,

						b = w.attr("data-fileindex");

					b = parseInt(b.replace("init_", "")), g = t.isEmpty(_.config) && t.isEmpty(_.config[b]) ? null : _.config[b],

						h = t.isEmpty(g) || t.isEmpty(g.extra) ? r : g.extra, "function" == typeof h && (h = h()), v = {

							id: p.attr("id"),

							key: f,

							extra: h

						}, n = function(e) {

							i.ajaxAborted = !1, i._raise("filepredelete", [f, e, h]), i._abort() ? e.abort() : (p.removeClass(s), t.addCss(

								w, "file-uploading"), t.addCss(p, "disabled " + l))

						}, o = function(e, r, n) {

							var o, c;

							return t.isEmpty(e) || t.isEmpty(e.error) ? (w.removeClass("file-uploading").addClass("file-deleted"), void w

								.fadeOut("slow", function() {

									b = parseInt(w.attr("data-fileindex").replace("init_", "")), i.previewCache.unset(b), i._deleteFileIndex(

											w), o = i.previewCache.count(), c = o > 0 ? i._getMsgSelected(o) : "", i._setCaption(c), i._raise(

											"filedeleted", [f, n, h]), t.cleanZoomCache(a.find("#zoom-" + w.attr("id"))), i._clearObjects(w), w.remove(),

										d()

								})) : (v.jqXHR = n, v.response = e, i._showError(e.error, v, "filedeleteerror"), w.removeClass(

								"file-uploading"), p.removeClass("disabled " + l).addClass(s), void d())

						}, c = function(e, t, a) {

							var r = i.ajaxOperations.deleteThumb,

								n = i._parseError(r, e, a);

							v.jqXHR = e, v.response = {}, i._showError(n, v, "filedeleteerror"), w.removeClass("file-uploading"), p.removeClass(

								"disabled " + l).addClass(s), d()

						}, i._initAjaxSettings(), i._mergeAjaxCallback("beforeSend", n, "delete"), i._mergeAjaxCallback("success", o,

							"delete"), i._mergeAjaxCallback("error", c, "delete"), m = e.extend(!0, {}, {

							url: u,

							type: "POST",

							dataType: "json",

							data: e.extend(!0, {}, {

								key: f

							}, h)

						}, i._ajaxDeleteSettings), i._handler(p, "click", function() {

							return i._validateMinCount() ? (i.ajaxAborted = !1, i._raise("filebeforedelete", [f, h]), void(i.ajaxAborted instanceof Promise ?

								i.ajaxAborted.then(function(t) {

									t || e.ajax(m)

								}) : i.ajaxAborted || e.ajax(m))) : !1

						})

				}

			})

		},

		_hideFileIcon: function() {

			var e = this;

			e.overwriteInitial && e.$captionContainer.removeClass("icon-visible")

		},

		_showFileIcon: function() {

			var e = this;

			t.addCss(e.$captionContainer, "icon-visible")

		},

		_getSize: function(t) {

			var i, a, r, n = this,

				o = parseFloat(t),

				l = n.fileSizeGetter;

			return e.isNumeric(t) && e.isNumeric(o) ? ("function" == typeof l ? r = l(o) : 0 === o ? r = "0.00 B" : (i = Math

				.floor(Math.log(o) / Math.log(1024)), a = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], r = 1 * (o /

					Math.pow(1024, i)).toFixed(2) + " " + a[i]), n._getLayoutTemplate("size").replace("{sizeText}", r)) : ""

		},

		_generatePreviewTemplate: function(i, a, r, n, o, l, s, d, c, p, u) {

			var f, m, v = this,

				g = v.slug(r),

				h = "",

				w = "",

				_ = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,

				b = 400 > _ ? v.previewSettingsSmall[i] || v.defaults.previewSettingsSmall[i] : v.previewSettings[i] || v.defaults

				.previewSettings[i],

				C = c || v._renderFileFooter(g, s, "auto", l),

				y = v._getPreviewIcon(r),

				x = "type-default",

				T = y && v.preferIconicPreview,

				E = y && v.preferIconicZoomPreview;

			return b && e.each(b, function(e, t) {

				w += e + ":" + t + ";"

			}), m = function(a, l, s, c) {

				var f = s ? "zoom-" + o : o,

					m = v._getPreviewTemplate(a),

					h = (d || "") + " " + c;

				return v.frameClass && (h = v.frameClass + " " + h), s && (h = h.replace(" " + t.SORT_CSS, "")), m = v._parseFilePreviewIcon(

					m, r), "text" === a && (l = t.htmlEncode(l)), "object" !== i || n || e.each(v.defaults.fileTypeSettings,

					function(e, t) {

						"object" !== e && "other" !== e && t(r, n) && (x = "type-" + e)

					}), m.setTokens({

					previewId: f,

					caption: g,

					frameClass: h,

					type: n,

					fileindex: p,

					typeCss: x,

					footer: C,

					data: l,

					template: u || i,

					style: w ? 'style="' + w + '"' : ""

				})

			}, p = p || o.slice(o.lastIndexOf("-") + 1), v.fileActionSettings.showZoom && (h = m(E ? "other" : i, a, !0,

				"kv-zoom-thumb")), h = "\n" + v._getLayoutTemplate("zoomCache").replace("{zoomContent}", h), f = m(T ? "other" :

				i, a, !1, "kv-preview-thumb"), f + h

		},

		_addToPreview: function(e, t) {

			var i = this;

			return i.reversePreviewOrder ? e.prepend(t) : e.append(t)

		},

		_previewDefault: function(i, a, r) {

			var n = this,

				o = n.$preview;

			if (n.showPreview) {

				var l, s = i ? i.name : "",

					d = i ? i.type : "",

					c = i.size || 0,

					p = n.slug(s),

					u = r === !0 && !n.isAjaxUpload,

					f = t.objUrl.createObjectURL(i);

				n._clearDefaultPreview(), l = n._generatePreviewTemplate("other", f, s, d, a, u, c), n._addToPreview(o, l), n._setThumbAttr(

					a, p, c), r === !0 && n.isAjaxUpload && n._setThumbStatus(e("#" + a), "Error")

			}

		},

		_previewFile: function(e, t, i, a, r, n) {

			if (this.showPreview) {

				var o, l = this,

					s = t ? t.name : "",

					d = n.type,

					c = n.name,

					p = l._parseFileType(d, s),

					u = l.allowedPreviewTypes,

					f = l.allowedPreviewMimeTypes,

					m = l.$preview,

					v = t.size || 0,

					g = u && u.indexOf(p) >= 0,

					h = f && -1 !== f.indexOf(d),

					w = "text" === p || "html" === p || "image" === p ? i.target.result : r;

				if ("html" === p && l.purifyHtml && window.DOMPurify && (w = window.DOMPurify.sanitize(w)), g || h) {

					o = l._generatePreviewTemplate(p, w, s, d, a, !1, v), l._clearDefaultPreview(), l._addToPreview(m, o);

					var _ = m.find("#" + a + " img");

					l._validateImageOrientation(_, t, a, c, d, v, w)

				} else l._previewDefault(t, a);

				l._setThumbAttr(a, c, v), l._initSortable()

			}

		},

		_setThumbAttr: function(t, i, a) {

			var r = this,

				n = e("#" + t);

			n.length && (a = a && a > 0 ? r._getSize(a) : "", n.data({

				caption: i,

				size: a

			}))

		},

		_setInitThumbAttr: function() {

			var e, i, a, r, n = this,

				o = n.previewCache.data,

				l = n.previewCache.count();

			if (0 !== l)

				for (var s = 0; l > s; s++) e = o.config[s], r = n.previewInitId + "-init_" + s, i = t.ifSet("caption", e, t.ifSet(

					"filename", e)), a = t.ifSet("size", e), n._setThumbAttr(r, i, a)

		},

		_slugDefault: function(e) {

			return t.isEmpty(e) ? "" : String(e).replace(/[\[\]\/\{}:;#%=\(\)\*\+\?\\\^\$\|<>&"']/g, "_")

		},

		_updateFileDetails: function(e) {

			var i = this,

				a = i.$element,

				r = i.getFileStack(),

				n = t.isIE(9) && t.findFileName(a.val()) || a[0].files[0] && a[0].files[0].name || r.length && r[0].name || "",

				o = i.slug(n),

				l = i.isAjaxUpload ? r.length : e,

				s = i.previewCache.count() + l,

				d = 1 === l ? o : i._getMsgSelected(s);

			i.isError ? (i.$previewContainer.removeClass("file-thumb-loading"), i.$previewStatus.html(""), i.$captionContainer

					.removeClass("icon-visible")) : i._showFileIcon(), i._setCaption(d, i.isError), i.$container.removeClass(

					"file-input-new file-input-ajax-new"), 1 === arguments.length && i._raise("fileselect", [e, o]), i.previewCache

				.count() && i._initPreviewActions()

		},

		_setThumbStatus: function(e, t) {

			var i = this;

			if (i.showPreview) {

				var a = "indicator" + t,

					r = a + "Title",

					n = "file-preview-" + t.toLowerCase(),

					o = e.find(".file-upload-indicator"),

					l = i.fileActionSettings;

				e.removeClass("file-preview-success file-preview-error file-preview-loading"), "Success" === t && e.find(

						".file-drag-handle").remove(), o.html(l[a]), o.attr("title", l[r]), e.addClass(n), "Error" !== t || i.retryErrorUploads ||

					e.find(".kv-file-upload").attr("disabled", !0)

			}

		},

		_setProgressCancelled: function() {

			var e = this;

			e._setProgress(101, e.$progress, e.msgCancelled)

		},

		_setProgress: function(e, i, a) {

			var r, n = this,

				o = Math.min(e, 100),

				l = n.progressUploadThreshold,

				s = 100 >= e ? n.progressTemplate : n.progressCompleteTemplate,

				d = 100 > o ? n.progressTemplate : a ? n.progressErrorTemplate : s;

			i = i || n.$progress, t.isEmpty(d) || (r = l && o > l && 100 >= e ? d.setTokens({

				percent: l,

				status: n.msgUploadThreshold

			}) : d.setTokens({

				percent: o,

				status: e > 100 ? n.msgUploadEnd : o + "%"

			}), i.html(r), a && i.find('[role="progressbar"]').html(a))

		},

		_setFileDropZoneTitle: function() {

			var e, i = this,

				a = i.$container.find(".file-drop-zone"),

				r = i.dropZoneTitle;

			i.isClickable && (e = t.isEmpty(i.$element.attr("multiple")) ? i.fileSingle : i.filePlural, r += i.dropZoneClickTitle

					.replace("{files}", e)), a.find("." + i.dropZoneTitleClass).remove(), !i.showPreview || 0 === a.length || i.getFileStack()

				.length > 0 || !i.dropZoneEnabled || !i.isAjaxUpload && i.$element.files || (0 === a.find(t.FRAMES).length && t.isEmpty(

						i.defaultPreviewContent) && a.prepend('<div class="' + i.dropZoneTitleClass + '">' + r + "</div>"), i.$container

					.removeClass("file-input-new"), t.addCss(i.$container, "file-input-ajax-new"))

		},

		_setAsyncUploadStatus: function(t, i, a) {

			var r = this,

				n = 0;

			r._setProgress(i, e("#" + t).find(".file-thumb-progress")), r.uploadStatus[t] = i, e.each(r.uploadStatus,

				function(e, t) {

					n += t

				}), r._setProgress(Math.floor(n / a))

		},

		_validateMinCount: function() {

			var e = this,

				t = e.isAjaxUpload ? e.getFileStack().length : e._inputFileCount();

			return e.validateInitialCount && e.minFileCount > 0 && e._getFileCount(t - 1) < e.minFileCount ? (e._noFilesError({}),

				!1) : !0

		},

		_getFileCount: function(e) {

			var t = this,

				i = 0;

			return t.validateInitialCount && !t.overwriteInitial && (i = t.previewCache.count(), e += i), e

		},

		_getFileId: function(e) {

			var t, i = this,

				a = i.generateFileId;

			return "function" == typeof a ? a(e, event) : e ? (t = String(e.webkitRelativePath || e.fileName || e.name ||

				null), t ? e.size + "-" + t.replace(/[^0-9a-zA-Z_-]/gim, "") : null) : null

		},

		_getFileName: function(e) {

			return e && e.name ? this.slug(e.name) : void 0

		},

		_getFileIds: function(e) {

			var t = this;

			return t.fileids.filter(function(t) {

				return e ? void 0 !== t : void 0 !== t && null !== t

			})

		},

		_getFileNames: function(e) {

			var t = this;

			return t.filenames.filter(function(t) {

				return e ? void 0 !== t : void 0 !== t && null !== t

			})

		},

		_setPreviewError: function(e, t, i, a) {

			var r = this;

			if (void 0 !== t && r.updateStack(t, i), r.showPreview) {

				if (r.removeFromPreviewOnError && !a) return void e.remove();

				r._setThumbStatus(e, "Error"), r._refreshUploadButton(e, a)

			}

		},

		_refreshUploadButton: function(e, t) {

			var i = this,

				a = e.find(".kv-file-upload"),

				r = i.fileActionSettings,

				n = r.uploadIcon,

				o = r.uploadTitle;

			a.length && (t && (n = r.uploadRetryIcon, o = r.uploadRetryTitle), a.attr("title", o).html(n))

		},

		_checkDimensions: function(e, i, a, r, n, o, l) {

			var s, d, c, p, u = this,

				f = "Small" === i ? "min" : "max",

				m = u[f + "Image" + o];

			!t.isEmpty(m) && a.length && (c = a[0], d = "Width" === o ? c.naturalWidth || c.width : c.naturalHeight || c.height,

				p = "Small" === i ? d >= m : m >= d, p || (s = u["msgImage" + o + i].setTokens({

					name: n,

					size: m

				}), u._showUploadError(s, l), u._setPreviewError(r, e, null)))

		},

		_getExifObj: function(e) {

			var t = this,

				i = null;

			try {

				i = window.piexif ? window.piexif.load(e) : null

			} catch (a) {

				i = null

			}

			return i || t._log("Error loading the piexif.js library."), i

		},

		_validateImageOrientation: function(e, i, a, r, n, o, l) {

			var s = this,

				d = s._getExifObj(l),

				c = null;

			return e.length && s.autoOrientImage && d && (c = d["0th"][piexif.ImageIFD.Orientation]), c ? (t.setImageOrientation(

				e, s.$preview.find("#zoom-" + a + " img"), c), s._raise("fileimageoriented", {

				$img: e,

				file: i

			}), void s._validateImage(a, r, n, o, l, d)) : void s._validateImage(a, r, n, o, l, d)

		},

		_validateImage: function(t, i, a, r, n, o) {

			var l, s, d, c = this,

				p = c.$preview,

				u = p.find("#" + t),

				f = u.attr("data-fileindex"),

				m = u.find("img");

			i = i || "Untitled", m.one("load", function() {

				s = u.width(), d = p.width(), s > d && m.css("width", "100%"), l = {

						ind: f,

						id: t

					}, c._checkDimensions(f, "Small", m, u, i, "Width", l), c._checkDimensions(f, "Small", m, u, i, "Height", l),

					c.resizeImage || (c._checkDimensions(f, "Large", m, u, i, "Width", l), c._checkDimensions(f, "Large", m, u, i,

						"Height", l)), c._raise("fileimageloaded", [t]), c.loadedImages.push({

						ind: f,

						img: m,

						thumb: u,

						pid: t,

						typ: a,

						siz: r,

						validated: !1,

						imgData: n,

						exifObj: o

					}), u.data("exif", o), c._validateAllImages()

			}).one("error", function() {

				c._raise("fileimageloaderror", [t])

			}).each(function() {

				this.complete ? e(this).trigger("load") : this.error && e(this).trigger("error")

			})

		},

		_validateAllImages: function() {

			var e, t, i, a = this,

				r = {

					val: 0

				},

				n = a.loadedImages.length,

				o = a.resizeIfSizeMoreThan;

			if (n === a.totalImagesCount && (a._raise("fileimagesloaded"), a.resizeImage))

				for (e = 0; e < a.loadedImages.length; e++) t = a.loadedImages[e], t.validated || (i = t.siz, i && i > 1e3 * o &&

					a._getResizedImage(t, r, n), a.loadedImages[e].validated = !0)

		},

		_getResizedImage: function(i, a, r) {

			var n, o, l, s, d, c, p, u = this,

				f = e(i.img)[0],

				m = f.naturalWidth,

				v = f.naturalHeight,

				g = 1,

				h = u.maxImageWidth || m,

				w = u.maxImageHeight || v,

				_ = !(!m || !v),

				b = u.imageCanvas,

				C = u.imageCanvasContext,

				y = i.typ,

				x = i.pid,

				T = i.ind,

				E = i.thumb,

				S = i.exifObj;

			if (d = function(e, t, i) {

					u.isAjaxUpload ? u._showUploadError(e, t, i) : u._showError(e, t, i), u._setPreviewError(E, T)

				}, (!u.filestack[T] || !_ || h >= m && w >= v) && (_ && u.filestack[T] && u._raise("fileimageresized", [x, T]),

					a.val++, a.val === r && u._raise("fileimagesresized"), !_)) return void d(u.msgImageResizeError, {

				id: x,

				index: T

			}, "fileimageresizeerror");

			y = y || u.resizeDefaultImageType, o = m > h, l = v > w, g = "width" === u.resizePreference ? o ? h / m : l ? w /

				v : 1 : l ? w / v : o ? h / m : 1, u._resetCanvas(), m *= g, v *= g, b.width = m, b.height = v;

			try {

				C.drawImage(f, 0, 0, m, v), s = b.toDataURL(y, u.resizeQuality), S && (p = window.piexif.dump(S), s = window.piexif

						.insert(p, s)), n = t.dataURI2Blob(s), u.filestack[T] = n, u._raise("fileimageresized", [x, T]), a.val++, a.val ===

					r && u._raise("fileimagesresized", [void 0, void 0]), n instanceof Blob || d(u.msgImageResizeError, {

						id: x,

						index: T

					}, "fileimageresizeerror")

			} catch (k) {

				a.val++, a.val === r && u._raise("fileimagesresized", [void 0, void 0]), c = u.msgImageResizeException.replace(

					"{errors}", k.message), d(c, {

					id: x,

					index: T

				}, "fileimageresizeexception")

			}

		},

		_initBrowse: function(e) {

			var i = this,

				a = i.$element;

			i.showBrowse ? i.$btnFile = e.find(".btn-file").append(a) : (a.appendTo(e).attr("tabindex", -1), t.addCss(a,

				"file-no-browse"))

		},

		_initClickable: function() {

			var i, a = this;

			a.isClickable && (i = a.isAjaxUpload ? a.$dropZone : a.$preview.find(".file-default-preview"), t.addCss(i,

				"clickable"), i.attr("tabindex", -1), a._handler(i, "click", function(t) {

				var r = e(t.target);

				e(a.elErrorContainer + ":visible").length || r.parents(".file-preview-thumbnails").length && !r.parents(

					".file-default-preview").length || (a.$element.data("zoneClicked", !0).trigger("click"), i.blur())

			}))

		},

		_initCaption: function() {

			var e = this,

				i = e.initialCaption || "";

			return e.overwriteInitial || t.isEmpty(i) ? (e.$caption.val(""), !1) : (e._setCaption(i), !0)

		},

		_setCaption: function(i, a) {

			var r, n, o, l, s, d = this,

				c = d.getFileStack();

			if (d.$caption.length) {

				if (d.$captionContainer.removeClass("icon-visible"), a) r = e("<div>" + d.msgValidationError + "</div>").text(),

					l = c.length, s = l ? 1 === l && c[0] ? d._getFileNames()[0] : d._getMsgSelected(l) : d._getMsgSelected(d.msgNo),

					n = t.isEmpty(i) ? s : i, o = '<span class="' + d.msgValidationErrorClass + '">' + d.msgValidationErrorIcon +

					"</span>";

				else {

					if (t.isEmpty(i)) return;

					r = e("<div>" + i + "</div>").text(), n = r, o = d._getLayoutTemplate("fileIcon")

				}

				d.$captionContainer.addClass("icon-visible"), d.$caption.attr("title", r).val(n), d.$captionIcon.html(o)

			}

		},

		_createContainer: function() {

			var t = this,

				i = {

					"class": "file-input file-input-new" + (t.rtl ? " kv-rtl" : "")

				},

				a = e(document.createElement("div")).attr(i).html(t._renderMain());

			return a.insertBefore(t.$element), t._initBrowse(a), t.theme && a.addClass("theme-" + t.theme), a

		},

		_refreshContainer: function() {

			var e = this,

				t = e.$container,

				i = e.$element;

			i.insertAfter(t), t.html(e._renderMain()), e._initBrowse(t), e._validateDisabled()

		},

		_validateDisabled: function() {

			var e = this;

			e.$caption.attr({

				readonly: e.isDisabled

			})

		},

		_renderMain: function() {

			var e = this,

				t = e.dropZoneEnabled ? " file-drop-zone" : "file-drop-disabled",

				i = e.showClose ? e._getLayoutTemplate("close") : "",

				a = e.showPreview ? e._getLayoutTemplate("preview").setTokens({

					"class": e.previewClass,

					dropClass: t

				}) : "",

				r = e.isDisabled ? e.captionClass + " file-caption-disabled" : e.captionClass,

				n = e.captionTemplate.setTokens({

					"class": r + " kv-fileinput-caption"

				});

			return e.mainTemplate.setTokens({

				"class": e.mainClass + (!e.showBrowse && e.showCaption ? " no-browse" : ""),

				preview: a,

				close: i,

				caption: n,

				upload: e._renderButton("upload"),

				remove: e._renderButton("remove"),

				cancel: e._renderButton("cancel"),

				browse: e._renderButton("browse")

			})

		},

		_renderButton: function(e) {

			var i = this,

				a = i._getLayoutTemplate("btnDefault"),

				r = i[e + "Class"],

				n = i[e + "Title"],

				o = i[e + "Icon"],

				l = i[e + "Label"],

				s = i.isDisabled ? " disabled" : "",

				d = "button";

			switch (e) {

				case "remove":

					if (!i.showRemove) return "";

					break;

				case "cancel":

					if (!i.showCancel) return "";

					r += " kv-hidden";

					break;

				case "upload":

					if (!i.showUpload) return "";

					i.isAjaxUpload && !i.isDisabled ? a = i._getLayoutTemplate("btnLink").replace("{href}", i.uploadUrl) : d =

						"submit";

					break;

				case "browse":

					if (!i.showBrowse) return "";

					a = i._getLayoutTemplate("btnBrowse");

					break;

				default:

					return ""

			}

			return r += "browse" === e ? " btn-file" : " fileinput-" + e + " fileinput-" + e + "-button", t.isEmpty(l) || (l =

				' <span class="' + i.buttonLabelClass + '">' + l + "</span>"), a.setTokens({

				type: d,

				css: r,

				title: n,

				status: s,

				icon: o,

				label: l

			})

		},

		_renderThumbProgress: function() {

			var e = this;

			return '<div class="file-thumb-progress kv-hidden">' + e.progressTemplate.setTokens({

				percent: "0",

				status: e.msgUploadBegin

			}) + "</div>"

		},

		_renderFileFooter: function(e, i, a, r) {

			var n, o = this,

				l = o.fileActionSettings,

				s = l.showRemove,

				d = l.showDrag,

				c = l.showUpload,

				p = l.showZoom,

				u = o._getLayoutTemplate("footer"),

				f = o._getLayoutTemplate("indicator"),

				m = r ? l.indicatorError : l.indicatorNew,

				v = r ? l.indicatorErrorTitle : l.indicatorNewTitle,

				g = f.setTokens({

					indicator: m,

					indicatorTitle: v

				});

			return i = o._getSize(i), n = o.isAjaxUpload ? u.setTokens({

				actions: o._renderFileActions(c, !1, s, p, d, !1, !1, !1),

				caption: e,

				size: i,

				width: a,

				progress: o._renderThumbProgress(),

				indicator: g

			}) : u.setTokens({

				actions: o._renderFileActions(!1, !1, !1, p, d, !1, !1, !1),

				caption: e,

				size: i,

				width: a,

				progress: "",

				indicator: g

			}), n = t.replaceTags(n, o.previewThumbTags)

		},

		_renderFileActions: function(e, t, i, a, r, n, o, l, s, d, c) {

			if (!(e || t || i || a || r)) return "";

			var p, u = this,

				f = o === !1 ? "" : ' data-url="' + o + '"',

				m = l === !1 ? "" : ' data-key="' + l + '"',

				v = "",

				g = "",

				h = "",

				w = "",

				_ = "",

				b = u._getLayoutTemplate("actions"),

				C = u.fileActionSettings,

				y = u.otherActionButtons.setTokens({

					dataKey: m,

					key: l

				}),

				x = n ? C.removeClass + " disabled" : C.removeClass;

			return i && (v = u._getLayoutTemplate("actionDelete").setTokens({

				removeClass: x,

				removeIcon: C.removeIcon,

				removeTitle: C.removeTitle,

				dataUrl: f,

				dataKey: m,

				key: l

			})), e && (g = u._getLayoutTemplate("actionUpload").setTokens({

				uploadClass: C.uploadClass,

				uploadIcon: C.uploadIcon,

				uploadTitle: C.uploadTitle

			})), t && (h = u._getLayoutTemplate("actionDownload").setTokens({

				downloadClass: C.downloadClass,

				downloadIcon: C.downloadIcon,

				downloadTitle: C.downloadTitle,

				downloadUrl: d || u.initialPreviewDownloadUrl

			}), h = h.setTokens({

				filename: c,

				key: l

			})), a && (w = u._getLayoutTemplate("actionZoom").setTokens({

				zoomClass: C.zoomClass,

				zoomIcon: C.zoomIcon,

				zoomTitle: C.zoomTitle

			})), r && s && (p = "drag-handle-init " + C.dragClass, _ = u._getLayoutTemplate("actionDrag").setTokens({

				dragClass: p,

				dragTitle: C.dragTitle,

				dragIcon: C.dragIcon

			})), b.setTokens({

				"delete": v,

				upload: g,

				download: h,

				zoom: w,

				drag: _,

				other: y

			})

		},

		_browse: function(e) {

			var t = this;

			t._raise("filebrowse"), e && e.isDefaultPrevented() || (t.isError && !t.isAjaxUpload && t.clear(), t.$captionContainer

				.focus())

		},

		_filterDuplicate: function(e, t, i) {

			var a = this,

				r = a._getFileId(e);

			r && i && i.indexOf(r) > -1 || (i || (i = []), t.push(e), i.push(r))

		},

		_change: function(i) {

			var a = this;

			if (!a.changeTriggered) {

				var r, n, o = a.$element,

					l = arguments.length > 1,

					s = a.isAjaxUpload,

					d = [],

					c = l ? arguments[1] : o.get(0).files,

					p = !s && t.isEmpty(o.attr("multiple")) ? 1 : a.maxFileCount,

					u = a.filestack.length,

					f = t.isEmpty(o.attr("multiple")),

					m = f && u > 0,

					v = a._getFileIds(),

					g = function(t, i, r, n) {

						var o = e.extend(!0, {}, a._getOutData({}, {}, c), {

								id: r,

								index: n

							}),

							l = {

								id: r,

								index: n,

								file: i,

								files: c

							};

						return s ? a._showUploadError(t, o) : a._showError(t, l)

					},

					h = function(e, t) {

						var i = a.msgFilesTooMany.replace("{m}", t).replace("{n}", e);

						a.isError = g(i, null, null, null), a.$captionContainer.removeClass("icon-visible"), a._setCaption("", !0), a.$container

							.removeClass("file-input-new file-input-ajax-new")

					};

				if (a.reader = null, a._resetUpload(), a._hideFileIcon(), a.dropZoneEnabled && a.$container.find(

						".file-drop-zone ." + a.dropZoneTitleClass).remove(), s ? e.each(c, function(e, t) {

						a._filterDuplicate(t, d, v)

					}) : (c = i.target && void 0 === i.target.files ? i.target.value ? [{

						name: i.target.value.replace(/^.+\\/, "")

					}] : [] : i.target.files || {}, d = c), t.isEmpty(d) || 0 === d.length) return s || a.clear(), void a._raise(

					"fileselectnone");

				if (a._resetErrors(), n = d.length, r = a._getFileCount(s ? a.getFileStack().length + n : n), p > 0 && r > p) {

					if (!a.autoReplace || n > p) return void h(a.autoReplace && n > p ? n : r, p);

					r > p && a._resetPreviewThumbs(s)

				} else !s || m ? (a._resetPreviewThumbs(!1), m && a.clearStack()) : !s || 0 !== u || a.previewCache.count() && !

					a.overwriteInitial || a._resetPreviewThumbs(!0);

				a.isPreviewable ? a.readFiles(d) : a._updateFileDetails(1)

			}

		},

		_abort: function(t) {

			var i, a = this;

			return a.ajaxAborted && "object" == typeof a.ajaxAborted && void 0 !== a.ajaxAborted.message ? (i = e.extend(!0, {},

					a._getOutData(), t), i.abortData = a.ajaxAborted.data || {}, i.abortMessage = a.ajaxAborted.message, a._setProgress(

					101, a.$progress, a.msgCancelled), a._showUploadError(a.ajaxAborted.message, i, "filecustomerror"), a.cancel(),

				!0) : !!a.ajaxAborted

		},

		_resetFileStack: function() {

			var i = this,

				a = 0,

				r = [],

				n = [],

				o = [];

			i._getThumbs().each(function() {

				var l = e(this),

					s = l.attr("data-fileindex"),

					d = i.filestack[s],

					c = l.attr("id");

				"-1" !== s && -1 !== s && (void 0 !== d ? (r[a] = d, n[a] = i._getFileName(d), o[a] = i._getFileId(d), l.attr({

					id: i.previewInitId + "-" + a,

					"data-fileindex": a

				}), a++) : l.attr({

					id: "uploaded-" + t.uniqId(),

					"data-fileindex": "-1"

				}), i.$preview.find("#zoom-" + c).attr({

					id: "zoom-" + l.attr("id"),

					"data-fileindex": l.attr("data-fileindex")

				}))

			}), i.filestack = r, i.filenames = n, i.fileids = o

		},

		_isFileSelectionValid: function(e) {

			var t = this;

			return e = e || 0, t.required && !t.getFilesCount() ? (t.$errorContainer.html(""), t._showUploadError(t.msgFileRequired),

				!1) : t.minFileCount > 0 && t._getFileCount(e) < t.minFileCount ? (t._noFilesError({}), !1) : !0

		},

		clearStack: function() {

			var e = this;

			return e.filestack = [], e.filenames = [], e.fileids = [], e.$element

		},

		updateStack: function(e, t) {

			var i = this;

			return i.filestack[e] = t, i.filenames[e] = i._getFileName(t), i.fileids[e] = t && i._getFileId(t) || null, i.$element

		},

		addToStack: function(e) {

			var t = this;

			return t.filestack.push(e), t.filenames.push(t._getFileName(e)), t.fileids.push(t._getFileId(e)), t.$element

		},

		getFileStack: function(e) {

			var t = this;

			return t.filestack.filter(function(t) {

				return e ? void 0 !== t : void 0 !== t && null !== t

			})

		},

		getFilesCount: function() {

			var e = this,

				t = e.isAjaxUpload ? e.getFileStack().length : e._inputFileCount();

			return e._getFileCount(t)

		},

		readFiles: function(i) {

			this.reader = new FileReader;

			var a, r = this,

				n = r.$element,

				o = r.$preview,

				l = r.reader,

				s = r.$previewContainer,

				d = r.$previewStatus,

				c = r.msgLoading,

				p = r.msgProgress,

				u = r.previewInitId,

				f = i.length,

				m = r.fileTypeSettings,

				v = r.filestack.length,

				g = r.allowedFileTypes,

				h = g ? g.length : 0,

				w = r.allowedFileExtensions,

				_ = t.isEmpty(w) ? "" : w.join(", "),

				b = r.maxFilePreviewSize && parseFloat(r.maxFilePreviewSize),

				C = o.length && (!b || isNaN(b)),

				y = function(t, n, o, l) {

					var s, d = e.extend(!0, {}, r._getOutData({}, {}, i), {

							id: o,

							index: l

						}),

						c = {

							id: o,

							index: l,

							file: n,

							files: i

						};

					r._previewDefault(n, o, !0), r.isAjaxUpload ? (r.addToStack(void 0), setTimeout(function() {

							a(l + 1)

						}, 100)) : f = 0, r._initFileActions(), s = e("#" + o), s.find(".kv-file-upload").hide(), r.removeFromPreviewOnError &&

						s.remove(), r.isError = r.isAjaxUpload ? r._showUploadError(t, d) : r._showError(t, c), r._updateFileDetails(f)

				};

			r.loadedImages = [], r.totalImagesCount = 0, e.each(i, function(e, t) {

				var i = r.fileTypeSettings.image;

				i && i(t.type) && r.totalImagesCount++

			}), a = function(x) {

				if (t.isEmpty(n.attr("multiple")) && (f = 1), x >= f) return r.isAjaxUpload && r.filestack.length > 0 ? r._raise(

					"filebatchselected", [r.getFileStack()]) : r._raise("filebatchselected", [i]), s.removeClass(

					"file-thumb-loading"), void d.html("");

				var T, E, S, k, F, P, I, A, D, z, $, j, U = v + x,

					B = u + "-" + U,

					R = i[x],

					O = m.text,

					L = m.image,

					M = m.html,

					Z = R && R.name ? r.slug(R.name) : "",

					N = (R && R.size || 0) / 1e3,

					H = "",

					W = R ? t.objUrl.createObjectURL(R) : null,

					q = 0,

					V = "",

					K = 0,

					Y = function() {

						var e = p.setTokens({

							index: x + 1,

							files: f,

							percent: 50,

							name: Z

						});

						setTimeout(function() {

							d.html(e), r._updateFileDetails(f), a(x + 1)

						}, 100), r._raise("fileloaded", [R, B, x, l])

					};

				if (R) {

					if (h > 0)

						for (E = 0; h > E; E++) P = g[E], I = r.msgFileTypes[P] || P, V += 0 === E ? I : ", " + I;

					if (Z === !1) return void a(x + 1);

					if (0 === Z.length) return S = r.msgInvalidFileName.replace("{name}", t.htmlEncode(R.name)), void y(S, R, B, x);

					if (t.isEmpty(w) || (H = new RegExp("\\.(" + w.join("|") + ")$", "i")), T = N.toFixed(2), r.maxFileSize > 0 &&

						N > r.maxFileSize) return S = r.msgSizeTooLarge.setTokens({

						name: Z,

						size: T,

						maxSize: r.maxFileSize

					}), void y(S, R, B, x);

					if (null !== r.minFileSize && N <= t.getNum(r.minFileSize)) return S = r.msgSizeTooSmall.setTokens({

						name: Z,

						size: T,

						minSize: r.minFileSize

					}), void y(S, R, B, x);

					if (!t.isEmpty(g) && t.isArray(g)) {

						for (E = 0; E < g.length; E += 1) k = g[E], A = m[k], q += A && "function" == typeof A && A(R.type, R.name) ?

							1 : 0;

						if (0 === q) return S = r.msgInvalidFileType.setTokens({

							name: Z,

							types: V

						}), void y(S, R, B, x)

					}

					if (0 === q && !t.isEmpty(w) && t.isArray(w) && !t.isEmpty(H) && (F = t.compare(Z, H), q += t.isEmpty(F) ? 0 :

							F.length, 0 === q)) return S = r.msgInvalidFileExtension.setTokens({

						name: Z,

						extensions: _

					}), void y(S, R, B, x);

					if (!r.showPreview) return r.isAjaxUpload && r.addToStack(R), setTimeout(function() {

						a(x + 1), r._updateFileDetails(f)

					}, 100), void r._raise("fileloaded", [R, B, x, l]);

					if (!C && N > b) return r.addToStack(R), s.addClass("file-thumb-loading"), r._previewDefault(R, B), r._initFileActions(),

						r._updateFileDetails(f), void a(x + 1);

					o.length && void 0 !== FileReader ? (D = O(R.type, Z), z = M(R.type, Z), $ = L(R.type, Z), d.html(c.replace(

						"{index}", x + 1).replace("{files}", f)), s.addClass("file-thumb-loading"), l.onerror = function(e) {

						r._errorHandler(e, Z)

					}, l.onload = function(i) {

						var a, n, o, s, d, c, p = [],

							u = function(e) {

								var t = new FileReader;

								t.onerror = function(e) {

									r._errorHandler(e, Z)

								}, t.onload = function(e) {

									r._previewFile(x, R, e, B, W, n), r._initFileActions(), Y()

								}, e ? t.readAsText(R, r.textEncoding) : t.readAsDataURL(R)

							};

						if (n = {

								name: Z,

								type: R.type

							}, e.each(m, function(e, t) {

								"object" !== e && "other" !== e && t(R.type, Z) && K++

							}), 0 === K) {

							for (o = new Uint8Array(i.target.result), E = 0; E < o.length; E++) s = o[E].toString(16), p.push(s);

							if (a = p.join("").toLowerCase().substring(0, 8), c = t.getMimeType(a, "", ""), t.isEmpty(c) && (d = t.arrayBuffer2String(

									l.result), c = t.isSvg(d) ? "image/svg+xml" : t.getMimeType(a, d, R.type)), n = {

									name: Z,

									type: c

								}, D = O(c, ""), z = M(c, ""), $ = L(c, ""), j = D || z, j || $) return void u(j)

						}

						r._previewFile(x, R, i, B, W, n), r._initFileActions(), Y()

					}, l.onprogress = function(e) {

						if (e.lengthComputable) {

							var t = e.loaded / e.total * 100,

								i = Math.ceil(t);

							S = p.setTokens({

								index: x + 1,

								files: f,

								percent: i,

								name: Z

							}), setTimeout(function() {

								d.html(S)

							}, 100)

						}

					}, D || z ? l.readAsText(R, r.textEncoding) : $ ? l.readAsDataURL(R) : l.readAsArrayBuffer(R)) : (r._previewDefault(

						R, B), setTimeout(function() {

						a(x + 1), r._updateFileDetails(f)

					}, 100), r._raise("fileloaded", [R, B, x, l])), r.addToStack(R)

				}

			}, a(0), r._updateFileDetails(f, !1)

		},

		lock: function() {

			var e = this;

			return e._resetErrors(), e.disable(), e.showRemove && e.$container.find(".fileinput-remove").hide(), e.showCancel &&

				e.$container.find(".fileinput-cancel").show(), e._raise("filelock", [e.filestack, e._getExtraData()]), e.$element

		},

		unlock: function(e) {

			var t = this;

			return void 0 === e && (e = !0), t.enable(), t.showCancel && t.$container.find(".fileinput-cancel").hide(), t.showRemove &&

				t.$container.find(".fileinput-remove").show(), e && t._resetFileStack(), t._raise("fileunlock", [t.filestack, t._getExtraData()]),

				t.$element

		},

		cancel: function() {

			var t, i = this,

				a = i.ajaxRequests,

				r = a.length;

			if (r > 0)

				for (t = 0; r > t; t += 1) i.cancelling = !0, a[t].abort();

			return i._setProgressCancelled(), i._getThumbs().each(function() {

				var t = e(this),

					a = t.attr("data-fileindex");

				t.removeClass("file-uploading"), void 0 !== i.filestack[a] && (t.find(".kv-file-upload").removeClass(

						"disabled").removeAttr("disabled"), t.find(".kv-file-remove").removeClass("disabled").removeAttr("disabled")),

					i.unlock()

			}), i.$element

		},

		clear: function() {

			var i, a = this;

			if (a._raise("fileclear")) return a.$btnUpload.removeAttr("disabled"), a._getThumbs().find("video,audio,img").each(

					function() {

						t.cleanMemory(e(this))

					}), a._clearFileInput(), a._resetUpload(), a.clearStack(), a._resetErrors(!0), a._hasInitialPreview() ? (a._showFileIcon(),

					a._resetPreview(), a._initPreviewActions(), a.$container.removeClass("file-input-new")) : (a._getThumbs().each(

						function() {

							a._clearObjects(e(this))

						}), a.isAjaxUpload && (a.previewCache.data = {}), a.$preview.html(""), i = !a.overwriteInitial && a.initialCaption

					.length > 0 ? a.initialCaption : "", a.$caption.attr("title", "").val(i), t.addCss(a.$container,

						"file-input-new"), a._validateDefaultPreview()), 0 === a.$container.find(t.FRAMES).length && (a._initCaption() ||

					a.$captionContainer.removeClass("icon-visible")), a._hideFileIcon(), a._raise("filecleared"), a.$captionContainer

				.focus(), a._setFileDropZoneTitle(), a.$element

		},

		reset: function() {

			var e = this;

			if (e._raise("filereset")) return e._resetPreview(), e.$container.find(".fileinput-filename").text(""), t.addCss(

				e.$container, "file-input-new"), (e.getFrames().length || e.dropZoneEnabled) && e.$container.removeClass(

				"file-input-new"), e.clearStack(), e.formdata = {}, e._setFileDropZoneTitle(), e.$element

		},

		disable: function() {

			var e = this;

			return e.isDisabled = !0, e._raise("filedisabled"), e.$element.attr("disabled", "disabled"), e.$container.find(

				".kv-fileinput-caption").addClass("file-caption-disabled"), e.$container.find(

				".fileinput-remove, .fileinput-upload, .file-preview-frame button").attr("disabled", !0), t.addCss(e.$container

				.find(".btn-file"), "disabled"), e._initDragDrop(), e.$element

		},

		enable: function() {

			var e = this;

			return e.isDisabled = !1, e._raise("fileenabled"), e.$element.removeAttr("disabled"), e.$container.find(

				".kv-fileinput-caption").removeClass("file-caption-disabled"), e.$container.find(

				".fileinput-remove, .fileinput-upload, .file-preview-frame button").removeAttr("disabled"), e.$container.find(

				".btn-file").removeClass("disabled"), e._initDragDrop(), e.$element

		},

		upload: function() {

			var i, a, r, n = this,

				o = n.getFileStack().length,

				l = !e.isEmptyObject(n._getExtraData());

			if (n.isAjaxUpload && !n.isDisabled && n._isFileSelectionValid(o)) {

				if (n._resetUpload(), 0 === o && !l) return void n._showUploadError(n.msgUploadEmpty);

				if (n.$progress.show(), n.uploadCount = 0, n.uploadStatus = {}, n.uploadLog = [], n.lock(), n._setProgress(2), 0 ===

					o && l) return void n._uploadExtraOnly();

				if (r = n.filestack.length, n.hasInitData = !1, !n.uploadAsync) return n._uploadBatch(), n.$element;

				for (a = n._getOutData(), n._raise("filebatchpreupload", [a]), n.fileBatchCompleted = !1, n.uploadCache = {

						content: [],

						config: [],

						tags: [],

						append: !0

					}, n.uploadAsyncCount = n.getFileStack().length, i = 0; r > i; i++) n.uploadCache.content[i] = null, n.uploadCache

					.config[i] = null, n.uploadCache.tags[i] = null;

				for (n.$preview.find(".file-preview-initial").removeClass(t.SORT_CSS), n._initSortable(), n.cacheInitialPreview =

					n.getPreview(), i = 0; r > i; i++) n.filestack[i] && n._uploadSingle(i, !0)

			}

		},

		destroy: function() {

			var t = this,

				i = t.$form,

				a = t.$container,

				r = t.$element,

				n = t.namespace;

			return e(document).off(n), e(window).off(n), i && i.length && i.off(n), t.isAjaxUpload && t._clearFileInput(), t._cleanup(),

				t._initPreviewCache(), r.insertBefore(a).off(n).removeData(), a.off().remove(), r

		},

		refresh: function(i) {

			var a = this,

				r = a.$element;

			return i = "object" != typeof i || t.isEmpty(i) ? a.options : e.extend(!0, {}, a.options, i), a._init(i, !0), a._listen(),

				r

		},

		zoom: function(e) {

			var i = this,

				a = i._getFrame(e),

				r = i.$modal;

			a && (t.initModal(r), r.html(i._getModalContent()), i._setZoomContent(a), r.modal("show"), i._initZoomButtons())

		},

		getExif: function(e) {

			var t = this,

				i = t._getFrame(e);

			return i && i.data("exif") || null

		},

		getFrames: function(i) {

			var a, r = this;

			return i = i || "", a = r.$preview.find(t.FRAMES + i), r.reversePreviewOrder && (a = e(a.get().reverse())), a

		},

		getPreview: function() {

			var e = this;

			return {

				content: e.initialPreview,

				config: e.initialPreviewConfig,

				tags: e.initialPreviewThumbTags

			}

		}

	}, e.fn.fileinput = function(a) {

		if (t.hasFileAPISupport() || t.isIE(9)) {

			var r = Array.apply(null, arguments),

				n = [];

			switch (r.shift(), this.each(function() {

				var o, l = e(this),

					s = l.data("fileinput"),

					d = "object" == typeof a && a,

					c = d.theme || l.data("theme"),

					p = {},

					u = {},

					f = d.language || l.data("language") || e.fn.fileinput.defaults.language || "en";

				s || (c && (u = e.fn.fileinputThemes[c] || {}), "en" === f || t.isEmpty(e.fn.fileinputLocales[f]) || (p = e.fn.fileinputLocales[

						f] || {}), o = e.extend(!0, {}, e.fn.fileinput.defaults, u, e.fn.fileinputLocales.en, p, d, l.data()), s =

					new i(this, o), l.data("fileinput", s)), "string" == typeof a && n.push(s[a].apply(s, r))

			}), n.length) {

				case 0:

					return this;

				case 1:

					return n[0];

				default:

					return n

			}

		}

	}, e.fn.fileinput.defaults = {

		language: "en",

		showCaption: !0,

		showBrowse: !0,

		showPreview: !0,

		showRemove: !0,

		showUpload: !0,

		showCancel: !0,

		showClose: !0,

		showUploadedThumbs: !0,

		browseOnZoneClick: !1,

		autoReplace: !1,

		autoOrientImage: !0,

		required: !1,

		rtl: !1,

		hideThumbnailContent: !1,

		generateFileId: null,

		previewClass: "",

		captionClass: "",

		frameClass: "krajee-default",

		mainClass: "file-caption-main",

		mainTemplate: null,

		purifyHtml: !0,

		fileSizeGetter: null,

		initialCaption: "",

		initialPreview: [],

		initialPreviewDelimiter: "*$$*",

		initialPreviewAsData: !1,

		initialPreviewFileType: "image",

		initialPreviewConfig: [],

		initialPreviewThumbTags: [],

		previewThumbTags: {},

		initialPreviewShowDelete: !0,

		initialPreviewDownloadUrl: "",

		removeFromPreviewOnError: !1,

		deleteUrl: "",

		deleteExtraData: {},

		overwriteInitial: !0,

		previewZoomButtonIcons: {

			prev: '<i class="glyphicon glyphicon-triangle-left"></i>',

			next: '<i class="glyphicon glyphicon-triangle-right"></i>',

			toggleheader: '<i class="glyphicon glyphicon-resize-vertical"></i>',

			fullscreen: '<i class="glyphicon glyphicon-fullscreen"></i>',

			borderless: '<i class="glyphicon glyphicon-resize-full"></i>',

			close: '<i class="glyphicon glyphicon-remove"></i>'

		},

		previewZoomButtonClasses: {

			prev: "btn btn-navigate",

			next: "btn btn-navigate",

			toggleheader: "btn btn-sm btn-kv btn-default btn-outline-secondary",

			fullscreen: "btn btn-sm btn-kv btn-default btn-outline-secondary",

			borderless: "btn btn-sm btn-kv btn-default btn-outline-secondary",

			close: "btn btn-sm btn-kv btn-default btn-outline-secondary"

		},

		previewTemplates: {},

		previewContentTemplates: {},

		preferIconicPreview: !1,

		preferIconicZoomPreview: !1,

		allowedPreviewTypes: void 0,

		allowedPreviewMimeTypes: null,

		allowedFileTypes: null,

		allowedFileExtensions: null,

		defaultPreviewContent: null,

		customLayoutTags: {},

		customPreviewTags: {},

		previewFileIcon: '<i class="glyphicon glyphicon-file"></i>',

		previewFileIconClass: "file-other-icon",

		previewFileIconSettings: {},

		previewFileExtSettings: {},

		buttonLabelClass: "hidden-xs",

		browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>&nbsp;',

		browseClass: "btn btn-primary",

		removeIcon: '<i class="glyphicon glyphicon-trash"></i>',

		removeClass: "btn btn-default btn-secondary",

		cancelIcon: '<i class="glyphicon glyphicon-ban-circle"></i>',

		cancelClass: "btn btn-default btn-secondary",

		uploadIcon: '<i class="glyphicon glyphicon-upload"></i>',

		uploadClass: "btn btn-default btn-secondary",

		uploadUrl: null,

		uploadUrlThumb: null,

		uploadAsync: !0,

		uploadExtraData: {},

		zoomModalHeight: 480,

		minImageWidth: null,

		minImageHeight: null,

		maxImageWidth: null,

		maxImageHeight: null,

		resizeImage: !1,

		resizePreference: "width",

		resizeQuality: .92,

		resizeDefaultImageType: "image/jpeg",

		resizeIfSizeMoreThan: 0,

		minFileSize: 0,

		maxFileSize: 0,

		maxFilePreviewSize: 25600,

		minFileCount: 0,

		maxFileCount: 0,

		validateInitialCount: !1,

		msgValidationErrorClass: "text-danger",

		msgValidationErrorIcon: '<i class="glyphicon glyphicon-exclamation-sign"></i> ',

		msgErrorClass: "file-error-message",

		progressThumbClass: "progress-bar bg-success progress-bar-success progress-bar-striped active",

		progressClass: "progress-bar bg-success progress-bar-success progress-bar-striped active",

		progressCompleteClass: "progress-bar bg-success progress-bar-success",

		progressErrorClass: "progress-bar bg-danger progress-bar-danger",

		progressUploadThreshold: 99,

		previewFileType: "image",

		elCaptionContainer: null,

		elCaptionText: null,

		elPreviewContainer: null,

		elPreviewImage: null,

		elPreviewStatus: null,

		elErrorContainer: null,

		errorCloseButton: t.closeButton("kv-error-close"),

		slugCallback: null,

		dropZoneEnabled: !0,

		dropZoneTitleClass: "file-drop-zone-title",

		fileActionSettings: {},

		otherActionButtons: "",

		textEncoding: "UTF-8",

		ajaxSettings: {},

		ajaxDeleteSettings: {},

		showAjaxErrorDetails: !0,

		mergeAjaxCallbacks: !1,

		mergeAjaxDeleteCallbacks: !1,

		retryErrorUploads: !0,

		reversePreviewOrder: !1

	}, e.fn.fileinputLocales.en = {

		fileSingle: "file",

		filePlural: "files",

		browseLabel: "Browse &hellip;",

		removeLabel: "Remove",

		removeTitle: "Clear selected files",

		cancelLabel: "Cancel",

		cancelTitle: "Abort ongoing upload",

		uploadLabel: "Upload",

		uploadTitle: "Upload selected files",

		msgNo: "No",

		msgNoFilesSelected: "No files selected",

		msgCancelled: "Cancelled",

		msgPlaceholder: "Select {files}...",

		msgZoomModalHeading: "Detailed Preview",

		msgFileRequired: "You must select a file to upload.",

		msgSizeTooSmall: 'File "{name}" (<b>{size} KB</b>) is too small and must be larger than <b>{minSize} KB</b>.',

		msgSizeTooLarge: 'File "{name}" (<b>{size} KB</b>) exceeds maximum allowed upload size of <b>{maxSize} KB</b>.',

		msgFilesTooLess: "You must select at least <b>{n}</b> {files} to upload.",

		msgFilesTooMany: "Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>.",

		msgFileNotFound: 'File "{name}" not found!',

		msgFileSecured: 'Security restrictions prevent reading the file "{name}".',

		msgFileNotReadable: 'File "{name}" is not readable.',

		msgFilePreviewAborted: 'File preview aborted for "{name}".',

		msgFilePreviewError: 'An error occurred while reading the file "{name}".',

		msgInvalidFileName: 'Invalid or unsupported characters in file name "{name}".',

		msgInvalidFileType: 'Invalid type for file "{name}". Only "{types}" files are supported.',

		msgInvalidFileExtension: 'Invalid extension for file "{name}". Only "{extensions}" files are supported.',

		msgFileTypes: {

			image: "image",

			html: "HTML",

			text: "text",

			video: "video",

			audio: "audio",

			flash: "flash",

			pdf: "PDF",

			object: "object"

		},

		msgUploadAborted: "The file upload was aborted",

		msgUploadThreshold: "Processing...",

		msgUploadBegin: "Initializing...",

		msgUploadEnd: "Done",

		msgUploadEmpty: "No valid data available for upload.",

		msgUploadError: "Error",

		msgValidationError: "Validation Error",

		msgLoading: "Loading file {index} of {files} &hellip;",

		msgProgress: "Loading file {index} of {files} - {name} - {percent}% completed.",

		msgSelected: "{n} {files} selected",

		msgFoldersNotAllowed: "Drag & drop files only! {n} folder(s) dropped were skipped.",

		msgImageWidthSmall: 'Width of image file "{name}" must be at least {size} px.',

		msgImageHeightSmall: 'Height of image file "{name}" must be at least {size} px.',

		msgImageWidthLarge: 'Width of image file "{name}" cannot exceed {size} px.',

		msgImageHeightLarge: 'Height of image file "{name}" cannot exceed {size} px.',

		msgImageResizeError: "Could not get the image dimensions to resize.",

		msgImageResizeException: "Error while resizing the image.<pre>{errors}</pre>",

		msgAjaxError: "Something went wrong with the {operation} operation. Please try again later!",

		msgAjaxProgressError: "{operation} failed",

		ajaxOperations: {

			deleteThumb: "file delete",

			uploadThumb: "file upload",

			uploadBatch: "batch file upload",

			uploadExtra: "form data upload"

		},

		dropZoneTitle: "Drag & drop files here &hellip;",

		dropZoneClickTitle: "<br>(or click to select {files})",

		previewZoomButtonTitles: {

			prev: "View previous file",

			next: "View next file",

			toggleheader: "Toggle header",

			fullscreen: "Toggle full screen",

			borderless: "Toggle borderless mode",

			close: "Close detailed preview"

		},

		usePdfRenderer: function() {

			return !!navigator.userAgent.match(/(iPod|iPhone|iPad)/)

		},

		pdfRendererUrl: "",

		pdfRendererTemplate: '<iframe class="kv-preview-data file-preview-pdf" src="{renderer}?file={data}" {style}></iframe>'

	}, e.fn.fileinput.Constructor = i, e(document).ready(function() {

		var t = e("input.file[type=file]");

		t.length && t.fileinput()

	})

});

/*! iCheck v1.0.2 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */

(function(f) {

	function A(a, b, d) {

		var c = a[0],

			g = /er/.test(d) ? _indeterminate : /bl/.test(d) ? n : k,

			e = d == _update ? {

				checked: c[k],

				disabled: c[n],

				indeterminate: "true" == a.attr(_indeterminate) || "false" == a.attr(_determinate)

			} : c[g];

		if (/^(ch|di|in)/.test(d) && !e) x(a, g);

		else if (/^(un|en|de)/.test(d) && e) q(a, g);

		else if (d == _update)

			for (var f in e) e[f] ? x(a, f, !0) : q(a, f, !0);

		else if (!b || "toggle" == d) {

			if (!b) a[_callback]("ifClicked");

			e ? c[_type] !== r && q(a, g) : x(a, g)

		}

	}



	function x(a, b, d) {

		var c = a[0],

			g = a.parent(),

			e = b == k,

			u = b == _indeterminate,

			v = b == n,

			s = u ? _determinate : e ? y : "enabled",

			F = l(a, s + t(c[_type])),

			B = l(a, b + t(c[_type]));

		if (!0 !== c[b]) {

			if (!d && b == k && c[_type] == r && c.name) {

				var w = a.closest("form"),

					p = 'input[name="' + c.name + '"]',

					p = w.length ? w.find(p) : f(p);

				p.each(function() {

					this !== c && f(this).data(m) && q(f(this), b)

				})

			}

			u ? (c[b] = !0, c[k] && q(a, k, "force")) : (d || (c[b] = !0), e && c[_indeterminate] && q(a, _indeterminate, !1));

			D(a, e, b, d)

		}

		c[n] && l(a, _cursor, !0) && g.find("." + C).css(_cursor, "default");

		g[_add](B || l(a, b) || "");

		g.attr("role") && !u && g.attr("aria-" + (v ? n : k), "true");

		g[_remove](F || l(a, s) || "")

	}



	function q(a, b, d) {

		var c = a[0],

			g = a.parent(),

			e = b == k,

			f = b == _indeterminate,

			m = b == n,

			s = f ? _determinate : e ? y : "enabled",

			q = l(a, s + t(c[_type])),

			r = l(a, b + t(c[_type]));

		if (!1 !== c[b]) {

			if (f || !d || "force" == d) c[b] = !1;

			D(a, e, s, d)

		}!c[n] && l(a, _cursor, !0) && g.find("." + C).css(_cursor, "pointer");

		g[_remove](r || l(a, b) || "");

		g.attr("role") && !f && g.attr("aria-" + (m ? n : k), "false");

		g[_add](q || l(a, s) || "")

	}



	function E(a, b) {

		if (a.data(m)) {

			a.parent().html(a.attr("style", a.data(m).s || ""));

			if (b) a[_callback](b);

			a.off(".i").unwrap();

			f(_label + '[for="' + a[0].id + '"]').add(a.closest(_label)).off(".i")

		}

	}



	function l(a, b, f) {

		if (a.data(m)) return a.data(m).o[b + (f ? "" : "Class")]

	}



	function t(a) {

		return a.charAt(0).toUpperCase() + a.slice(1)

	}



	function D(a, b, f, c) {

		if (!c) {

			if (b) a[_callback]("ifToggled");

			a[_callback]("ifChanged")[_callback]("if" + t(f))

		}

	}

	var m = "iCheck",

		C = m + "-helper",

		r = "radio",

		k = "checked",

		y = "un" + k,

		n = "disabled";

	_determinate = "determinate";

	_indeterminate = "in" + _determinate;

	_update = "update";

	_type = "type";

	_click = "click";

	_touch = "touchbegin.i touchend.i";

	_add = "addClass";

	_remove = "removeClass";

	_callback = "trigger";

	_label = "label";

	_cursor = "cursor";

	_mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);

	f.fn[m] = function(a, b) {

		var d = 'input[type="checkbox"], input[type="' + r + '"]',

			c = f(),

			g = function(a) {

				a.each(function() {

					var a = f(this);

					c = a.is(d) ? c.add(a) : c.add(a.find(d))

				})

			};

		if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(a)) return a = a.toLowerCase(),

			g(this), c.each(function() {

				var c =

					f(this);

				"destroy" == a ? E(c, "ifDestroyed") : A(c, !0, a);

				f.isFunction(b) && b()

			});

		if ("object" != typeof a && a) return this;

		var e = f.extend({

				checkedClass: k,

				disabledClass: n,

				indeterminateClass: _indeterminate,

				labelHover: !0

			}, a),

			l = e.handle,

			v = e.hoverClass || "hover",

			s = e.focusClass || "focus",

			t = e.activeClass || "active",

			B = !!e.labelHover,

			w = e.labelHoverClass || "hover",

			p = ("" + e.increaseArea).replace("%", "") | 0;

		if ("checkbox" == l || l == r) d = 'input[type="' + l + '"]'; - 50 > p && (p = -50);

		g(this);

	}

})(window.jQuery || window.Zepto);





! function(e) {

	e(["jquery"], function(e) {

		return function() {

			function t(e, t, n) {

				return g({

					type: O.error,

					iconClass: m().iconClasses.error,

					message: e,

					optionsOverride: n,

					title: t

				})

			}



			function n(t, n) {

				return t || (t = m()), v = e("#" + t.containerId), v.length ? v : (n && (v = d(t)), v)

			}



			function o(e, t, n) {

				return g({

					type: O.info,

					iconClass: m().iconClasses.info,

					message: e,

					optionsOverride: n,

					title: t

				})

			}



			function s(e) {

				C = e

			}



			function i(e, t, n) {

				return g({

					type: O.success,

					iconClass: m().iconClasses.success,

					message: e,

					optionsOverride: n,

					title: t

				})

			}



			function a(e, t, n) {

				return g({

					type: O.warning,

					iconClass: m().iconClasses.warning,

					message: e,

					optionsOverride: n,

					title: t

				})

			}



			function r(e, t) {

				var o = m();

				v || n(o), u(e, o, t) || l(o)

			}



			function c(t) {

				var o = m();

				return v || n(o), t && 0 === e(":focus", t).length ? void h(t) : void(v.children().length && v.remove())

			}



			function l(t) {

				for (var n = v.children(), o = n.length - 1; o >= 0; o--) u(e(n[o]), t)

			}



			function u(t, n, o) {

				var s = !(!o || !o.force) && o.force;

				return !(!t || !s && 0 !== e(":focus", t).length) && (t[n.hideMethod]({

					duration: n.hideDuration,

					easing: n.hideEasing,

					complete: function() {

						h(t)

					}

				}), !0)

			}



			function d(t) {

				return v = e("<div/>").attr("id", t.containerId).addClass(t.positionClass), v.appendTo(e(t.target)), v

			}



			function p() {

				return {

					tapToDismiss: !0,

					toastClass: "toast",

					containerId: "toast-container",

					debug: !1,

					showMethod: "fadeIn",

					showDuration: 300,

					showEasing: "swing",

					onShown: void 0,

					hideMethod: "fadeOut",

					hideDuration: 1e3,

					hideEasing: "swing",

					onHidden: void 0,

					closeMethod: !1,

					closeDuration: !1,

					closeEasing: !1,

					closeOnHover: !0,

					extendedTimeOut: 1e3,

					iconClasses: {

						error: "toast-error",

						info: "toast-info",

						success: "toast-success",

						warning: "toast-warning"

					},

					iconClass: "toast-info",

					positionClass: "toast-top-right",

					timeOut: 5e3,

					titleClass: "toast-title",

					messageClass: "toast-message",

					escapeHtml: !1,

					target: "body",

					closeHtml: '<button type="button">&times;</button>',

					closeClass: "toast-close-button",

					newestOnTop: !0,

					preventDuplicates: !1,

					progressBar: !1,

					progressClass: "toast-progress",

					rtl: !1

				}

			}



			function f(e) {

				C && C(e)

			}



			function g(t) {

				function o(e) {

					return null == e && (e = ""), e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(

						/</g, "&lt;").replace(/>/g, "&gt;")

				}



				function s() {

					c(), u(), d(), p(), g(), C(), l(), i()

				}



				function i() {

					var e = "";

					switch (t.iconClass) {

						case "toast-success":

						case "toast-info":

							e = "polite";

							break;

						default:

							e = "assertive"

					}

					I.attr("aria-live", e)

				}



				function a() {

					E.closeOnHover && I.hover(H, D), !E.onclick && E.tapToDismiss && I.click(b), E.closeButton && j && j.click(

						function(e) {

							e.stopPropagation ? e.stopPropagation() : void 0 !== e.cancelBubble && e.cancelBubble !== !0 && (e.cancelBubble = !

								0), E.onCloseClick && E.onCloseClick(e), b(!0)

						}), E.onclick && I.click(function(e) {

						E.onclick(e), b()

					})

				}



				function r() {

					I.hide(), I[E.showMethod]({

						duration: E.showDuration,

						easing: E.showEasing,

						complete: E.onShown

					}), E.timeOut > 0 && (k = setTimeout(b, E.timeOut), F.maxHideTime = parseFloat(E.timeOut), F.hideEta = (new Date)

						.getTime() + F.maxHideTime, E.progressBar && (F.intervalId = setInterval(x, 10)))

				}



				function c() {

					t.iconClass && I.addClass(E.toastClass).addClass(y)

				}



				function l() {

					E.newestOnTop ? v.prepend(I) : v.append(I)

				}



				function u() {

					if (t.title) {

						var e = t.title;

						E.escapeHtml && (e = o(t.title)), M.append(e).addClass(E.titleClass), I.append(M)

					}

				}



				function d() {

					if (t.message) {

						var e = t.message;

						E.escapeHtml && (e = o(t.message)), B.append(e).addClass(E.messageClass), I.append(B)

					}

				}



				function p() {

					E.closeButton && (j.addClass(E.closeClass).attr("role", "button"), I.prepend(j))

				}



				function g() {

					E.progressBar && (q.addClass(E.progressClass), I.prepend(q))

				}



				function C() {

					E.rtl && I.addClass("rtl")

				}



				function O(e, t) {

					if (e.preventDuplicates) {

						if (t.message === w) return !0;

						w = t.message

					}

					return !1

				}



				function b(t) {

					var n = t && E.closeMethod !== !1 ? E.closeMethod : E.hideMethod,

						o = t && E.closeDuration !== !1 ? E.closeDuration : E.hideDuration,

						s = t && E.closeEasing !== !1 ? E.closeEasing : E.hideEasing;

					if (!e(":focus", I).length || t) return clearTimeout(F.intervalId), I[n]({

						duration: o,

						easing: s,

						complete: function() {

							h(I), clearTimeout(k), E.onHidden && "hidden" !== P.state && E.onHidden(), P.state = "hidden", P.endTime =

								new Date, f(P)

						}

					})

				}



				function D() {

					(E.timeOut > 0 || E.extendedTimeOut > 0) && (k = setTimeout(b, E.extendedTimeOut), F.maxHideTime = parseFloat(E

						.extendedTimeOut), F.hideEta = (new Date).getTime() + F.maxHideTime)

				}



				function H() {

					clearTimeout(k), F.hideEta = 0, I.stop(!0, !0)[E.showMethod]({

						duration: E.showDuration,

						easing: E.showEasing

					})

				}



				function x() {

					var e = (F.hideEta - (new Date).getTime()) / F.maxHideTime * 100;

					q.width(e + "%")

				}

				var E = m(),

					y = t.iconClass || E.iconClass;

				if ("undefined" != typeof t.optionsOverride && (E = e.extend(E, t.optionsOverride), y = t.optionsOverride.iconClass ||

						y), !O(E, t)) {

					T++, v = n(E, !0);

					var k = null,

						I = e("<div/>"),

						M = e("<div/>"),

						B = e("<div/>"),

						q = e("<div/>"),

						j = e(E.closeHtml),

						F = {

							intervalId: null,

							hideEta: null,

							maxHideTime: null

						},

						P = {

							toastId: T,

							state: "visible",

							startTime: new Date,

							options: E,

							map: t

						};

					return s(), r(), a(), f(P), E.debug && console && console.log(P), I

				}

			}



			function m() {

				return e.extend({}, p(), b.options)

			}



			function h(e) {

				v || (v = n()), e.is(":visible") || (e.remove(), e = null, 0 === v.children().length && (v.remove(), w = void 0))

			}

			var v, C, w, T = 0,

				O = {

					error: "error",

					info: "info",

					success: "success",

					warning: "warning"

				},

				b = {

					clear: r,

					remove: c,

					error: t,

					getContainer: n,

					info: o,

					options: {},

					subscribe: s,

					success: i,

					version: "2.1.4",

					warning: a

				};

			return b

		}()

	})

}("function" == typeof define && define.amd ? define : function(e, t) {

	"undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : window.toastr = t(window.jQuery)

});





! function(t, e) {

	"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define &&

		define.amd ? define(e) : t.ES6Promise = e()

}(this, function() {

	"use strict";



	function t(t) {

		var e = typeof t;

		return null !== t && ("object" === e || "function" === e)

	}



	function e(t) {

		return "function" == typeof t

	}



	function n(t) {

		B = t

	}



	function r(t) {

		G = t

	}



	function o() {

		return function() {

			return process.nextTick(a)

		}

	}



	function i() {

		return "undefined" != typeof z ? function() {

			z(a)

		} : c()

	}



	function s() {

		var t = 0,

			e = new J(a),

			n = document.createTextNode("");

		return e.observe(n, {

				characterData: !0

			}),

			function() {

				n.data = t = ++t % 2

			}

	}



	function u() {

		var t = new MessageChannel;

		return t.port1.onmessage = a,

			function() {

				return t.port2.postMessage(0)

			}

	}



	function c() {

		var t = setTimeout;

		return function() {

			return t(a, 1)

		}

	}



	function a() {

		for (var t = 0; t < W; t += 2) {

			var e = V[t],

				n = V[t + 1];

			e(n), V[t] = void 0, V[t + 1] = void 0

		}

		W = 0

	}



	function f() {

		try {

			var t = Function("return this")().require("vertx");

			return z = t.runOnLoop || t.runOnContext, i()

		} catch (e) {

			return c()

		}

	}



	function l(t, e) {

		var n = this,

			r = new this.constructor(p);

		void 0 === r[Z] && O(r);

		var o = n._state;

		if (o) {

			var i = arguments[o - 1];

			G(function() {

				return P(o, r, i, n._result)

			})

		} else E(n, r, t, e);

		return r

	}



	function h(t) {

		var e = this;

		if (t && "object" == typeof t && t.constructor === e) return t;

		var n = new e(p);

		return g(n, t), n

	}



	function p() {}



	function v() {

		return new TypeError("You cannot resolve a promise with itself")

	}



	function d() {

		return new TypeError("A promises callback cannot return that same promise.")

	}



	function _(t) {

		try {

			return t.then

		} catch (e) {

			return nt.error = e, nt

		}

	}



	function y(t, e, n, r) {

		try {

			t.call(e, n, r)

		} catch (o) {

			return o

		}

	}



	function m(t, e, n) {

		G(function(t) {

			var r = !1,

				o = y(n, e, function(n) {

					r || (r = !0, e !== n ? g(t, n) : S(t, n))

				}, function(e) {

					r || (r = !0, j(t, e))

				}, "Settle: " + (t._label || " unknown promise"));

			!r && o && (r = !0, j(t, o))

		}, t)

	}



	function b(t, e) {

		e._state === tt ? S(t, e._result) : e._state === et ? j(t, e._result) : E(e, void 0, function(e) {

			return g(t, e)

		}, function(e) {

			return j(t, e)

		})

	}



	function w(t, n, r) {

		n.constructor === t.constructor && r === l && n.constructor.resolve === h ? b(t, n) : r === nt ? (j(t, nt.error), nt

			.error = null) : void 0 === r ? S(t, n) : e(r) ? m(t, n, r) : S(t, n)

	}



	function g(e, n) {

		e === n ? j(e, v()) : t(n) ? w(e, n, _(n)) : S(e, n)

	}



	function A(t) {

		t._onerror && t._onerror(t._result), T(t)

	}



	function S(t, e) {

		t._state === $ && (t._result = e, t._state = tt, 0 !== t._subscribers.length && G(T, t))

	}



	function j(t, e) {

		t._state === $ && (t._state = et, t._result = e, G(A, t))

	}



	function E(t, e, n, r) {

		var o = t._subscribers,

			i = o.length;

		t._onerror = null, o[i] = e, o[i + tt] = n, o[i + et] = r, 0 === i && t._state && G(T, t)

	}



	function T(t) {

		var e = t._subscribers,

			n = t._state;

		if (0 !== e.length) {

			for (var r = void 0, o = void 0, i = t._result, s = 0; s < e.length; s += 3) r = e[s], o = e[s + n], r ? P(n, r, o,

				i) : o(i);

			t._subscribers.length = 0

		}

	}



	function M(t, e) {

		try {

			return t(e)

		} catch (n) {

			return nt.error = n, nt

		}

	}



	function P(t, n, r, o) {

		var i = e(r),

			s = void 0,

			u = void 0,

			c = void 0,

			a = void 0;

		if (i) {

			if (s = M(r, o), s === nt ? (a = !0, u = s.error, s.error = null) : c = !0, n === s) return void j(n, d())

		} else s = o, c = !0;

		n._state !== $ || (i && c ? g(n, s) : a ? j(n, u) : t === tt ? S(n, s) : t === et && j(n, s))

	}



	function x(t, e) {

		try {

			e(function(e) {

				g(t, e)

			}, function(e) {

				j(t, e)

			})

		} catch (n) {

			j(t, n)

		}

	}



	function C() {

		return rt++

	}



	function O(t) {

		t[Z] = rt++, t._state = void 0, t._result = void 0, t._subscribers = []

	}



	function k() {

		return new Error("Array Methods must be provided an Array")

	}



	function F(t) {

		return new ot(this, t).promise

	}



	function Y(t) {

		var e = this;

		return new e(U(t) ? function(n, r) {

			for (var o = t.length, i = 0; i < o; i++) e.resolve(t[i]).then(n, r)

		} : function(t, e) {

			return e(new TypeError("You must pass an array to race."))

		})

	}



	function q(t) {

		var e = this,

			n = new e(p);

		return j(n, t), n

	}



	function D() {

		throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")

	}



	function K() {

		throw new TypeError(

			"Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."

		)

	}



	function L() {

		var t = void 0;

		if ("undefined" != typeof global) t = global;

		else if ("undefined" != typeof self) t = self;

		else try {

			t = Function("return this")()

		} catch (e) {

			throw new Error("polyfill failed because global object is unavailable in this environment")

		}

		var n = t.Promise;

		if (n) {

			var r = null;

			try {

				r = Object.prototype.toString.call(n.resolve())

			} catch (e) {}

			if ("[object Promise]" === r && !n.cast) return

		}

		t.Promise = it

	}

	var N = void 0;

	N = Array.isArray ? Array.isArray : function(t) {

		return "[object Array]" === Object.prototype.toString.call(t)

	};

	var U = N,

		W = 0,

		z = void 0,

		B = void 0,

		G = function(t, e) {

			V[W] = t, V[W + 1] = e, W += 2, 2 === W && (B ? B(a) : X())

		},

		H = "undefined" != typeof window ? window : void 0,

		I = H || {},

		J = I.MutationObserver || I.WebKitMutationObserver,

		Q = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process),

		R = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,

		V = new Array(1e3),

		X = void 0;

	X = Q ? o() : J ? s() : R ? u() : void 0 === H && "function" == typeof require ? f() : c();

	var Z = Math.random().toString(36).substring(2),

		$ = void 0,

		tt = 1,

		et = 2,

		nt = {

			error: null

		},

		rt = 0,

		ot = function() {

			function t(t, e) {

				this._instanceConstructor = t, this.promise = new t(p), this.promise[Z] || O(this.promise), U(e) ? (this.length =

					e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? S(this.promise,

						this._result) : (this.length = this.length || 0, this._enumerate(e), 0 === this._remaining && S(this.promise,

						this._result))) : j(this.promise, k())

			}

			return t.prototype._enumerate = function(t) {

				for (var e = 0; this._state === $ && e < t.length; e++) this._eachEntry(t[e], e)

			}, t.prototype._eachEntry = function(t, e) {

				var n = this._instanceConstructor,

					r = n.resolve;

				if (r === h) {

					var o = _(t);

					if (o === l && t._state !== $) this._settledAt(t._state, e, t._result);

					else if ("function" != typeof o) this._remaining--, this._result[e] = t;

					else if (n === it) {

						var i = new n(p);

						w(i, t, o), this._willSettleAt(i, e)

					} else this._willSettleAt(new n(function(e) {

						return e(t)

					}), e)

				} else this._willSettleAt(r(t), e)

			}, t.prototype._settledAt = function(t, e, n) {

				var r = this.promise;

				r._state === $ && (this._remaining--, t === et ? j(r, n) : this._result[e] = n), 0 === this._remaining && S(r,

					this._result)

			}, t.prototype._willSettleAt = function(t, e) {

				var n = this;

				E(t, void 0, function(t) {

					return n._settledAt(tt, e, t)

				}, function(t) {

					return n._settledAt(et, e, t)

				})

			}, t

		}(),

		it = function() {

			function t(e) {

				this[Z] = C(), this._result = this._state = void 0, this._subscribers = [], p !== e && ("function" != typeof e &&

					D(), this instanceof t ? x(this, e) : K())

			}

			return t.prototype["catch"] = function(t) {

				return this.then(null, t)

			}, t.prototype["finally"] = function(t) {

				var e = this,

					n = e.constructor;

				return e.then(function(e) {

					return n.resolve(t()).then(function() {

						return e

					})

				}, function(e) {

					return n.resolve(t()).then(function() {

						throw e

					})

				})

			}, t

		}();

	return it.prototype.then = l, it.all = F, it.race = Y, it.resolve = h, it.reject = q, it._setScheduler = n, it._setAsap =

		r, it._asap = G, it.polyfill = L, it.Promise = it, it.polyfill(), it

});

! function(e, t) {

	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define &&

		define.amd ? define(t) : e.Sweetalert2 = t()

}(this, function() {

	"use strict";

	var e = {

			title: "",

			titleText: "",

			text: "",

			html: "",

			type: null,

			customClass: "",

			target: "body",

			animation: !0,

			allowOutsideClick: !0,

			allowEscapeKey: !0,

			allowEnterKey: !0,

			showConfirmButton: !0,

			showCancelButton: !1,

			preConfirm: null,

			confirmButtonText: "OK",

			confirmButtonAriaLabel: "",

			confirmButtonColor: "#3085d6",

			confirmButtonClass: null,

			cancelButtonText: "Cancel",

			cancelButtonAriaLabel: "",

			cancelButtonColor: "#aaa",

			cancelButtonClass: null,

			buttonsStyling: !0,

			reverseButtons: !1,

			focusConfirm: !0,

			focusCancel: !1,

			showCloseButton: !1,

			closeButtonAriaLabel: "Close this dialog",

			showLoaderOnConfirm: !1,

			imageUrl: null,

			imageWidth: null,

			imageHeight: null,

			imageAlt: "",

			imageClass: null,

			timer: null,

			width: 500,

			padding: 20,

			background: "#fff",

			input: null,

			inputPlaceholder: "",

			inputValue: "",

			inputOptions: {},

			inputAutoTrim: !0,

			inputClass: null,

			inputAttributes: {},

			inputValidator: null,

			grow: !1,

			position: "center",

			progressSteps: [],

			currentProgressStep: null,

			progressStepsDistance: "40px",

			onBeforeOpen: null,

			onOpen: null,

			onClose: null,

			useRejections: !0

		},

		t = function(e) {

			var t = {};

			for (var n in e) t[e[n]] = "swal2-" + e[n];

			return t

		},

		n = t(["container", "shown", "iosfix", "modal", "overlay", "fade", "show", "hide", "noanimation", "close", "title",

			"content", "buttonswrapper", "confirm", "cancel", "icon", "image", "input", "file", "range", "select", "radio",

			"checkbox", "textarea", "inputerror", "validationerror", "progresssteps", "activeprogressstep", "progresscircle",

			"progressline", "loading", "styled", "top", "top-left", "top-right", "center", "center-left", "center-right",

			"bottom", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen"

		]),

		o = t(["success", "warning", "info", "question", "error"]),

		r = function(e, t) {

			(e = String(e).replace(/[^0-9a-f]/gi, "")).length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), t = t || 0;

			for (var n = "#", o = 0; o < 3; o++) {

				var r = parseInt(e.substr(2 * o, 2), 16);

				n += ("00" + (r = Math.round(Math.min(Math.max(0, r + r * t), 255)).toString(16))).substr(r.length)

			}

			return n

		},

		i = function(e) {

			console.warn("SweetAlert2: " + e)

		},

		a = function(e) {

			console.error("SweetAlert2: " + e)

		},

		l = {

			previousWindowKeyDown: null,

			previousActiveElement: null,

			previousBodyPadding: null

		},

		s = function(e) {

			var t = c();

			t && t.parentNode.removeChild(t); {

				if ("undefined" != typeof document) {

					var o = document.createElement("div");

					o.className = n.container, o.innerHTML = u;

					("string" == typeof e.target ? document.querySelector(e.target) : e.target).appendChild(o);

					var r = d(),

						i = E(r, n.input),

						l = E(r, n.file),

						s = r.querySelector("." + n.range + " input"),

						p = r.querySelector("." + n.range + " output"),

						f = E(r, n.select),

						m = r.querySelector("." + n.checkbox + " input"),

						g = E(r, n.textarea);

					return i.oninput = function() {

						I.resetValidationError()

					}, l.onchange = function() {

						I.resetValidationError()

					}, s.oninput = function() {

						I.resetValidationError(), p.value = s.value

					}, s.onchange = function() {

						I.resetValidationError(), s.previousSibling.value = s.value

					}, f.onchange = function() {

						I.resetValidationError()

					}, m.onchange = function() {

						I.resetValidationError()

					}, g.oninput = function() {

						I.resetValidationError()

					}, r

				}

				a("SweetAlert2 requires document to initialize")

			}

		},

		u = ('\n <div role="dialog" aria-modal="true" aria-labelledby="' + n.title + '" aria-describedby="' + n.content +

			'" class="' + n.modal + '" tabindex="-1">\n   <ul class="' + n.progresssteps + '"></ul>\n   <div class="' + n.icon +

			" " + o.error +

			'">\n     <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n   </div>\n   <div class="' +

			n.icon + " " + o.question + '">?</div>\n   <div class="' + n.icon + " " + o.warning + '">!</div>\n   <div class="' +

			n.icon + " " + o.info + '">i</div>\n   <div class="' + n.icon + " " + o.success +

			'">\n     <div class="swal2-success-circular-line-left"></div>\n     <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n     <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n     <div class="swal2-success-circular-line-right"></div>\n   </div>\n   <img class="' +

			n.image + '" />\n   <h2 class="' + n.title + '" id="' + n.title + '"></h2>\n   <div id="' + n.content + '" class="' +

			n.content + '"></div>\n   <input class="' + n.input + '" />\n   <input type="file" class="' + n.file +

			'" />\n   <div class="' + n.range +

			'">\n     <output></output>\n     <input type="range" />\n   </div>\n   <select class="' + n.select +

			'"></select>\n   <div class="' + n.radio + '"></div>\n   <label for="' + n.checkbox + '" class="' + n.checkbox +

			'">\n     <input type="checkbox" />\n   </label>\n   <textarea class="' + n.textarea +

			'"></textarea>\n   <div class="' + n.validationerror + '" id="' + n.validationerror + '"></div>\n   <div class="' +

			n.buttonswrapper + '">\n     <button type="button" class="' + n.confirm +

			'">OK</button>\n     <button type="button" class="' + n.cancel +

			'">Cancel</button>\n   </div>\n   <button type="button" class="' + n.close + '">×</button>\n </div>\n').replace(

			/(^|\n)\s*/g, ""),

		c = function() {

			return document.body.querySelector("." + n.container)

		},

		d = function() {

			return c() ? c().querySelector("." + n.modal) : null

		},

		p = function(e) {

			return c() ? c().querySelector("." + e) : null

		},

		f = function() {

			return p(n.title)

		},

		m = function() {

			return p(n.content)

		},

		g = function() {

			return p(n.image)

		},

		b = function() {

			return p(n.progresssteps)

		},

		v = function() {

			return p(n.validationerror)

		},

		h = function() {

			return p(n.confirm)

		},

		y = function() {

			return p(n.cancel)

		},

		w = function() {

			return p(n.buttonswrapper)

		},

		C = function() {

			return p(n.close)

		},

		k = function() {

			var e = Array.from(d().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(function(e, t) {

					return e = parseInt(e.getAttribute("tabindex")), t = parseInt(t.getAttribute("tabindex")), e > t ? 1 : e < t ? -

						1 : 0

				}),

				t = Array.prototype.slice.call(d().querySelectorAll(

					'button, input:not([type=hidden]), textarea, select, a, [tabindex="0"]'));

			return function(e) {

				var t = [];

				for (var n in e) - 1 === t.indexOf(e[n]) && t.push(e[n]);

				return t

			}(e.concat(t))

		},

		x = function(e, t) {

			return !!e.classList && e.classList.contains(t)

		},

		S = function(e) {

			if (e.focus(), "file" !== e.type) {

				var t = e.value;

				e.value = "", e.value = t

			}

		},

		A = function(e, t) {

			if (e && t) {

				t.split(/\s+/).filter(Boolean).forEach(function(t) {

					e.classList.add(t)

				})

			}

		},

		B = function(e, t) {

			if (e && t) {

				t.split(/\s+/).filter(Boolean).forEach(function(t) {

					e.classList.remove(t)

				})

			}

		},

		E = function(e, t) {

			for (var n = 0; n < e.childNodes.length; n++)

				if (x(e.childNodes[n], t)) return e.childNodes[n]

		},

		P = function(e, t) {

			t || (t = "block"), e.style.opacity = "", e.style.display = t

		},

		L = function(e) {

			e.style.opacity = "", e.style.display = "none"

		},

		T = function(e) {

			return e.offsetWidth || e.offsetHeight || e.getClientRects().length

		},

		q = function() {

			var e = document.createElement("div"),

				t = {

					WebkitAnimation: "webkitAnimationEnd",

					OAnimation: "oAnimationEnd oanimationend",

					animation: "animationend"

				};

			for (var n in t)

				if (t.hasOwnProperty(n) && void 0 !== e.style[n]) return t[n];

			return !1

		}(),

		V = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {

			return typeof e

		} : function(e) {

			return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e

		},

		O = Object.assign || function(e) {

			for (var t = 1; t < arguments.length; t++) {

				var n = arguments[t];

				for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])

			}

			return e

		},

		M = O({}, e),

		N = [];

	"undefined" == typeof Promise && a(

		"This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/limonte/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)"

	);

	var H = function(e) {

			("string" == typeof e.target && !document.querySelector(e.target) || "string" != typeof e.target && !e.target.appendChild) &&

			(i('Target parameter is not valid, defaulting to "body"'), e.target = "body");

			var t = void 0,

				r = d(),

				l = "string" == typeof e.target ? document.querySelector(e.target) : e.target;

			t = r && l && r.parentNode !== l.parentNode ? s(e) : r || s(e);

			for (var u in e) I.isValidParameter(u) || i('Unknown parameter "' + u + '"');

			t.style.width = "number" == typeof e.width ? e.width + "px" : e.width, t.style.padding = e.padding + "px", t.style.background =

				e.background;

			for (var p = t.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"), v = 0; v < p.length; v++)

				p[v].style.background = e.background;

			var k = c(),

				x = f(),

				S = m(),

				E = w(),

				T = h(),

				q = y(),

				O = C();

			if (e.titleText ? x.innerText = e.titleText : x.innerHTML = e.title.split("\n").join("<br />"), e.text || e.html) {

				if ("object" === V(e.html))

					if (S.innerHTML = "", 0 in e.html)

						for (var M = 0; M in e.html; M++) S.appendChild(e.html[M].cloneNode(!0));

					else S.appendChild(e.html.cloneNode(!0));

				else e.html ? S.innerHTML = e.html : e.text && (S.textContent = e.text);

				P(S)

			} else L(S);

			if (e.position in n && A(k, n[e.position]), e.grow && "string" == typeof e.grow) {

				var N = "grow-" + e.grow;

				N in n && A(k, n[N])

			}

			e.showCloseButton ? (O.setAttribute("aria-label", e.closeButtonAriaLabel), P(O)) : L(O), t.className = n.modal, e.customClass &&

				A(t, e.customClass);

			var H = b(),

				j = parseInt(null === e.currentProgressStep ? I.getQueueStep() : e.currentProgressStep, 10);

			e.progressSteps.length ? (P(H), function(e) {

				for (; e.firstChild;) e.removeChild(e.firstChild)

			}(H), j >= e.progressSteps.length && i(

				"Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"

			), e.progressSteps.forEach(function(t, o) {

				var r = document.createElement("li");

				if (A(r, n.progresscircle), r.innerHTML = t, o === j && A(r, n.activeprogressstep), H.appendChild(r), o !== e.progressSteps

					.length - 1) {

					var i = document.createElement("li");

					A(i, n.progressline), i.style.width = e.progressStepsDistance, H.appendChild(i)

				}

			})) : L(H);

			for (var R = d().querySelectorAll("." + n.icon), U = 0; U < R.length; U++) L(R[U]);

			if (e.type) {

				var W = !1;

				for (var D in o)

					if (e.type === D) {

						W = !0;

						break

					} if (!W) return a("Unknown alert type: " + e.type), !1;

				var K = t.querySelector("." + n.icon + "." + o[e.type]);

				if (P(K), e.animation) switch (e.type) {

					case "success":

						A(K, "swal2-animate-success-icon"), A(K.querySelector(".swal2-success-line-tip"),

							"swal2-animate-success-line-tip"), A(K.querySelector(".swal2-success-line-long"),

							"swal2-animate-success-line-long");

						break;

					case "error":

						A(K, "swal2-animate-error-icon"), A(K.querySelector(".swal2-x-mark"), "swal2-animate-x-mark")

				}

			}

			var z = g();

			e.imageUrl ? (z.setAttribute("src", e.imageUrl), z.setAttribute("alt", e.imageAlt), P(z), e.imageWidth ? z.setAttribute(

						"width", e.imageWidth) : z.removeAttribute("width"), e.imageHeight ? z.setAttribute("height", e.imageHeight) : z

					.removeAttribute("height"), z.className = n.image, e.imageClass && A(z, e.imageClass)) : L(z), e.showCancelButton ?

				q.style.display = "inline-block" : L(q), e.showConfirmButton ? function(e, t) {

					e.style.removeProperty ? e.style.removeProperty(t) : e.style.removeAttribute(t)

				}(T, "display") : L(T), e.showConfirmButton || e.showCancelButton ? P(E) : L(E), T.innerHTML = e.confirmButtonText,

				q.innerHTML = e.cancelButtonText, T.setAttribute("aria-label", e.confirmButtonAriaLabel), q.setAttribute(

					"aria-label", e.cancelButtonAriaLabel), e.buttonsStyling && (T.style.backgroundColor = e.confirmButtonColor, q.style

					.backgroundColor = e.cancelButtonColor), T.className = n.confirm, A(T, e.confirmButtonClass), q.className = n.cancel,

				A(q, e.cancelButtonClass), e.buttonsStyling ? (A(T, n.styled), A(q, n.styled)) : (B(T, n.styled), B(q, n.styled),

					T.style.backgroundColor = T.style.borderLeftColor = T.style.borderRightColor = "", q.style.backgroundColor = q.style

					.borderLeftColor = q.style.borderRightColor = ""), !0 === e.animation ? B(t, n.noanimation) : A(t, n.noanimation),

				e.showLoaderOnConfirm && !e.preConfirm && i(

					"showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://limonte.github.io/sweetalert2/#ajax-request"

				)

		},

		j = function() {

			null === l.previousBodyPadding && document.body.scrollHeight > window.innerHeight && (l.previousBodyPadding =

				document.body.style.paddingRight, document.body.style.paddingRight = function() {

					if ("ontouchstart" in window || navigator.msMaxTouchPoints) return 0;

					var e = document.createElement("div");

					e.style.width = "50px", e.style.height = "50px", e.style.overflow = "scroll", document.body.appendChild(e);

					var t = e.offsetWidth - e.clientWidth;

					return document.body.removeChild(e), t

				}() + "px")

		},

		R = function() {

			if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && !x(document.body, n.iosfix)) {

				var e = document.body.scrollTop;

				document.body.style.top = -1 * e + "px", A(document.body, n.iosfix)

			}

		},

		I = function e() {

			for (var t = arguments.length, o = Array(t), i = 0; i < t; i++) o[i] = arguments[i];

			if (void 0 === o[0]) return a("SweetAlert2 expects at least 1 attribute!"), !1;

			var s = O({}, M);

			switch (V(o[0])) {

				case "string":

					s.title = o[0], s.html = o[1], s.type = o[2];

					break;

				case "object":

					O(s, o[0]), s.extraParams = o[0].extraParams, "email" === s.input && null === s.inputValidator && (s.inputValidator =

						function(e) {

							return new Promise(function(t, n) {

								/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(e) ? t() : n("Invalid email address")

							})

						}), "url" === s.input && null === s.inputValidator && (s.inputValidator = function(e) {

						return new Promise(function(t, n) {

							/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(e) ? t() :

								n("Invalid URL")

						})

					});

					break;

				default:

					return a('Unexpected type of argument! Expected "string" or "object", got ' + V(o[0])), !1

			}

			H(s);

			var u = c(),

				p = d();

			return new Promise(function(t, o) {

				s.timer && (p.timeout = setTimeout(function() {

					e.closeModal(s.onClose), s.useRejections ? o("timer") : t({

						dismiss: "timer"

					})

				}, s.timer));

				var i = function(e) {

					if (!(e = e || s.input)) return null;

					switch (e) {

						case "select":

						case "textarea":

						case "file":

							return E(p, n[e]);

						case "checkbox":

							return p.querySelector("." + n.checkbox + " input");

						case "radio":

							return p.querySelector("." + n.radio + " input:checked") || p.querySelector("." + n.radio +

								" input:first-child");

						case "range":

							return p.querySelector("." + n.range + " input");

						default:

							return E(p, n.input)

					}

				};

				s.input && setTimeout(function() {

					var e = i();

					e && S(e)

				}, 0);

				for (var O = function(n) {

						s.showLoaderOnConfirm && e.showLoading(), s.preConfirm ? s.preConfirm(n, s.extraParams).then(function(o) {

							e.closeModal(s.onClose), t(o || n)

						}, function(t) {

							e.hideLoading(), t && e.showValidationError(t)

						}) : (e.closeModal(s.onClose), t(s.useRejections ? n : {

							value: n

						}))

					}, M = function(n) {

						var a = n || window.event,

							l = a.target || a.srcElement,

							u = h(),

							c = y(),

							d = u && (u === l || u.contains(l)),

							p = c && (c === l || c.contains(l));

						switch (a.type) {

							case "mouseover":

							case "mouseup":

								s.buttonsStyling && (d ? u.style.backgroundColor = r(s.confirmButtonColor, -.1) : p && (c.style.backgroundColor =

									r(s.cancelButtonColor, -.1)));

								break;

							case "mouseout":

								s.buttonsStyling && (d ? u.style.backgroundColor = s.confirmButtonColor : p && (c.style.backgroundColor = s

									.cancelButtonColor));

								break;

							case "mousedown":

								s.buttonsStyling && (d ? u.style.backgroundColor = r(s.confirmButtonColor, -.2) : p && (c.style.backgroundColor =

									r(s.cancelButtonColor, -.2)));

								break;

							case "click":

								if (d && e.isVisible())

									if (e.disableButtons(), s.input) {

										var f = function() {

											var e = i();

											if (!e) return null;

											switch (s.input) {

												case "checkbox":

													return e.checked ? 1 : 0;

												case "radio":

													return e.checked ? e.value : null;

												case "file":

													return e.files.length ? e.files[0] : null;

												default:

													return s.inputAutoTrim ? e.value.trim() : e.value

											}

										}();

										s.inputValidator ? (e.disableInput(), s.inputValidator(f, s.extraParams).then(function() {

											e.enableButtons(), e.enableInput(), O(f)

										}, function(t) {

											e.enableButtons(), e.enableInput(), t && e.showValidationError(t)

										})) : O(f)

									} else O(!0);

								else p && e.isVisible() && (e.disableButtons(), e.closeModal(s.onClose), s.useRejections ? o("cancel") : t({

									dismiss: "cancel"

								}))

						}

					}, N = p.querySelectorAll("button"), I = 0; I < N.length; I++) N[I].onclick = M, N[I].onmouseover = M, N[I].onmouseout =

					M, N[I].onmousedown = M;

				C().onclick = function() {

					e.closeModal(s.onClose), s.useRejections ? o("close") : t({

						dismiss: "close"

					})

				}, u.onclick = function(n) {

					n.target === u && s.allowOutsideClick && (e.closeModal(s.onClose), s.useRejections ? o("overlay") : t({

						dismiss: "overlay"

					}))

				};

				var U = w(),

					W = h(),

					D = y();

				s.reverseButtons ? W.parentNode.insertBefore(D, W) : W.parentNode.insertBefore(W, D);

				var K = function(e, t) {

						for (var n = k(s.focusCancel), o = 0; o < n.length; o++) {

							(e += t) === n.length ? e = 0 : -1 === e && (e = n.length - 1);

							var r = n[e];

							if (T(r)) return r.focus()

						}

					},

					z = function(n) {

						var r = n || window.event;

						if ("Enter" === r.key) {

							if (r.target === i()) {

								if ("textarea" === r.target.tagName.toLowerCase()) return;

								e.clickConfirm(), r.preventDefault()

							}

						} else if ("Tab" === r.key) {

							for (var a = r.target || r.srcElement, l = k(s.focusCancel), u = -1, c = 0; c < l.length; c++)

								if (a === l[c]) {

									u = c;

									break

								} r.shiftKey ? K(u, -1) : K(u, 1), r.stopPropagation(), r.preventDefault()

						} else -1 !== ["ArrowLeft", "ArrowRight", "ArrowUp", "Arrowdown"].indexOf(r.key) ? document.activeElement ===

							W && T(D) ? D.focus() : document.activeElement === D && T(W) && W.focus() : "Escape" !== r.key && "Esc" !==

							r.key || !0 !== s.allowEscapeKey || (e.closeModal(s.onClose), s.useRejections ? o("esc") : t({

								dismiss: "esc"

							}))

					};

				window.onkeydown && window.onkeydown.toString() === z.toString() || (l.previousWindowKeyDown = window.onkeydown,

					window.onkeydown = z), s.buttonsStyling && (W.style.borderLeftColor = s.confirmButtonColor, W.style.borderRightColor =

					s.confirmButtonColor), e.hideLoading = e.disableLoading = function() {

					s.showConfirmButton || (L(W), s.showCancelButton || L(w())), B(U, n.loading), B(p, n.loading), p.removeAttribute(

						"aria-busy"), W.disabled = !1, D.disabled = !1

				}, e.getTitle = function() {

					return f()

				}, e.getContent = function() {

					return m()

				}, e.getInput = function() {

					return i()

				}, e.getImage = function() {

					return g()

				}, e.getButtonsWrapper = function() {

					return w()

				}, e.getConfirmButton = function() {

					return h()

				}, e.getCancelButton = function() {

					return y()

				}, e.enableButtons = function() {

					W.disabled = !1, D.disabled = !1

				}, e.disableButtons = function() {

					W.disabled = !0, D.disabled = !0

				}, e.enableConfirmButton = function() {

					W.disabled = !1

				}, e.disableConfirmButton = function() {

					W.disabled = !0

				}, e.enableInput = function() {

					var e = i();

					if (!e) return !1;

					if ("radio" === e.type)

						for (var t = e.parentNode.parentNode.querySelectorAll("input"), n = 0; n < t.length; n++) t[n].disabled = !1;

					else e.disabled = !1

				}, e.disableInput = function() {

					var e = i();

					if (!e) return !1;

					if (e && "radio" === e.type)

						for (var t = e.parentNode.parentNode.querySelectorAll("input"), n = 0; n < t.length; n++) t[n].disabled = !0;

					else e.disabled = !0

				}, e.showValidationError = function(e) {

					var t = v();

					t.innerHTML = e, P(t);

					var o = i();

					o && (o.setAttribute("aria-invalid", !0), o.setAttribute("aria-describedBy", n.validationerror), S(o), A(o, n.inputerror))

				}, e.resetValidationError = function() {

					var e = v();

					L(e);

					var t = i();

					t && (t.removeAttribute("aria-invalid"), t.removeAttribute("aria-describedBy"), B(t, n.inputerror))

				}, e.getProgressSteps = function() {

					return s.progressSteps

				}, e.setProgressSteps = function(e) {

					s.progressSteps = e, H(s)

				}, e.showProgressSteps = function() {

					P(b())

				}, e.hideProgressSteps = function() {

					L(b())

				}, e.enableButtons(), e.hideLoading(), e.resetValidationError();

				for (var Z = ["input", "file", "range", "select", "radio", "checkbox", "textarea"], Q = void 0, Y = 0; Y < Z.length; Y++) {

					var _ = n[Z[Y]],

						$ = E(p, _);

					if (Q = i(Z[Y])) {

						for (var J in Q.attributes)

							if (Q.attributes.hasOwnProperty(J)) {

								var X = Q.attributes[J].name;

								"type" !== X && "value" !== X && Q.removeAttribute(X)

							} for (var F in s.inputAttributes) Q.setAttribute(F, s.inputAttributes[F])

					}

					$.className = _, s.inputClass && A($, s.inputClass), L($)

				}

				var G = void 0;

				switch (s.input) {

					case "text":

					case "email":

					case "password":

					case "number":

					case "tel":

					case "url":

						(Q = E(p, n.input)).value = s.inputValue, Q.placeholder = s.inputPlaceholder, Q.type = s.input, P(Q);

						break;

					case "file":

						(Q = E(p, n.file)).placeholder = s.inputPlaceholder, Q.type = s.input, P(Q);

						break;

					case "range":

						var ee = E(p, n.range),

							te = ee.querySelector("input"),

							ne = ee.querySelector("output");

						te.value = s.inputValue, te.type = s.input, ne.value = s.inputValue, P(ee);

						break;

					case "select":

						var oe = E(p, n.select);

						if (oe.innerHTML = "", s.inputPlaceholder) {

							var re = document.createElement("option");

							re.innerHTML = s.inputPlaceholder, re.value = "", re.disabled = !0, re.selected = !0, oe.appendChild(re)

						}

						G = function(e) {

							for (var t in e) {

								var n = document.createElement("option");

								n.value = t, n.innerHTML = e[t], s.inputValue.toString() === t && (n.selected = !0), oe.appendChild(n)

							}

							P(oe), oe.focus()

						};

						break;

					case "radio":

						var ie = E(p, n.radio);

						ie.innerHTML = "", G = function(e) {

							for (var t in e) {

								var o = document.createElement("input"),

									r = document.createElement("label"),

									i = document.createElement("span");

								o.type = "radio", o.name = n.radio, o.value = t, s.inputValue.toString() === t && (o.checked = !0), i.innerHTML =

									e[t], r.appendChild(o), r.appendChild(i), r.for = o.id, ie.appendChild(r)

							}

							P(ie);

							var a = ie.querySelectorAll("input");

							a.length && a[0].focus()

						};

						break;

					case "checkbox":

						var ae = E(p, n.checkbox),

							le = i("checkbox");

						le.type = "checkbox", le.value = 1, le.id = n.checkbox, le.checked = Boolean(s.inputValue);

						var se = ae.getElementsByTagName("span");

						se.length && ae.removeChild(se[0]), (se = document.createElement("span")).innerHTML = s.inputPlaceholder, ae.appendChild(

							se), P(ae);

						break;

					case "textarea":

						var ue = E(p, n.textarea);

						ue.value = s.inputValue, ue.placeholder = s.inputPlaceholder, P(ue);

						break;

					case null:

						break;

					default:

						a(

							'Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' +

							s.input + '"')

				}

				"select" !== s.input && "radio" !== s.input || (s.inputOptions instanceof Promise ? (e.showLoading(), s.inputOptions

						.then(function(t) {

							e.hideLoading(), G(t)

						})) : "object" === V(s.inputOptions) ? G(s.inputOptions) : a(

						"Unexpected type of inputOptions! Expected object or Promise, got " + V(s.inputOptions))),

					function(e, t, o) {

						var r = c(),

							i = d();

						null !== t && "function" == typeof t && t(i), e ? (A(i, n.show), A(r, n.fade), B(i, n.hide)) : B(i, n.fade), P(

								i), r.style.overflowY = "hidden", q && !x(i, n.noanimation) ? i.addEventListener(q, function e() {

								i.removeEventListener(q, e), r.style.overflowY = "auto"

							}) : r.style.overflowY = "auto", A(document.documentElement, n.shown), A(document.body, n.shown), A(r, n.shown),

							j(), R(), l.previousActiveElement = document.activeElement, null !== o && "function" == typeof o &&

							setTimeout(function() {

								o(i)

							})

					}(s.animation, s.onBeforeOpen, s.onOpen), s.allowEnterKey ? s.focusCancel && T(D) ? D.focus() : s.focusConfirm &&

					T(W) ? W.focus() : K(-1, 1) : document.activeElement && document.activeElement.blur(), c().scrollTop = 0

			})

		};

	return I.isVisible = function() {

		return !!d()

	}, I.queue = function(e) {

		N = e;

		var t = function() {

				N = [], document.body.removeAttribute("data-swal2-queue-step")

			},

			n = [];

		return new Promise(function(e, o) {

			! function r(i, a) {

				i < N.length ? (document.body.setAttribute("data-swal2-queue-step", i), I(N[i]).then(function(e) {

					n.push(e), r(i + 1, a)

				}, function(e) {

					t(), o(e)

				})) : (t(), e(n))

			}(0)

		})

	}, I.getQueueStep = function() {

		return document.body.getAttribute("data-swal2-queue-step")

	}, I.insertQueueStep = function(e, t) {

		return t && t < N.length ? N.splice(t, 0, e) : N.push(e)

	}, I.deleteQueueStep = function(e) {

		void 0 !== N[e] && N.splice(e, 1)

	}, I.close = I.closeModal = function(e) {

		var t = c(),

			o = d();

		if (o) {

			B(o, n.show), A(o, n.hide), clearTimeout(o.timeout),

				function() {

					if (window.onkeydown = l.previousWindowKeyDown, l.previousActiveElement && l.previousActiveElement.focus) {

						var e = window.scrollX,

							t = window.scrollY;

						l.previousActiveElement.focus(), e && t && window.scrollTo(e, t)

					}

				}();

			var r = function() {

				t.parentNode && t.parentNode.removeChild(t), B(document.documentElement, n.shown), B(document.body, n.shown),

					null !== l.previousBodyPadding && (document.body.style.paddingRight = l.previousBodyPadding, l.previousBodyPadding =

						null),

					function() {

						if (x(document.body, n.iosfix)) {

							var e = parseInt(document.body.style.top, 10);

							B(document.body, n.iosfix), document.body.style.top = "", document.body.scrollTop = -1 * e

						}

					}()

			};

			q && !x(o, n.noanimation) ? o.addEventListener(q, function e() {

				o.removeEventListener(q, e), x(o, n.hide) && r()

			}) : r(), null !== e && "function" == typeof e && setTimeout(function() {

				e(o)

			})

		}

	}, I.clickConfirm = function() {

		return h().click()

	}, I.clickCancel = function() {

		return y().click()

	}, I.showLoading = I.enableLoading = function() {

		var e = d();

		e || I(""), e = d();

		var t = w(),

			o = h(),

			r = y();

		P(t), P(o, "inline-block"), A(t, n.loading), A(e, n.loading), o.disabled = !0, r.disabled = !0, e.setAttribute(

			"aria-busy", !0), e.focus()

	}, I.isValidParameter = function(t) {

		return e.hasOwnProperty(t) || "extraParams" === t

	}, I.setDefaults = function(e) {

		if (!e || "object" !== (void 0 === e ? "undefined" : V(e))) return a(

			"the argument for setDefaults() is required and has to be a object");

		for (var t in e) I.isValidParameter(t) || (i('Unknown parameter "' + t + '"'), delete e[t]);

		O(M, e)

	}, I.resetDefaults = function() {

		M = O({}, e)

	}, I.noop = function() {}, I.version = "6.11.5", I.default = I, I

}), window.Sweetalert2 && (window.sweetAlert = window.swal = window.Sweetalert2);

/*! jqPaginator-1.2.0 

 * http://jqPaginator.keenwon.com

 */

! function(a) {

	"use strict";

	a.jqPaginator = function(b, c) {

		if (!(this instanceof a.jqPaginator)) return new a.jqPaginator(b, c);

		var d = this;

		return d.$container = a(b), d.$container.data("jqPaginator", d), d.init = function() {

			(c.first || c.prev || c.next || c.last || c.page) && (c = a.extend({}, {

				first: "",

				prev: "",

				next: "",

				last: "",

				page: ""

			}, c)), d.options = a.extend({}, a.jqPaginator.defaultOptions, c), d.verify(), d.extendJquery(), d.render(), d.fireEvent(

				this.options.currentPage, "init")

		}, d.verify = function() {

			var a = d.options;

			if (!d.isNumber(a.totalPages)) throw new Error("[jqPaginator] type error: totalPages");

			if (!d.isNumber(a.totalCounts)) throw new Error("[jqPaginator] type error: totalCounts");

			if (!d.isNumber(a.pageSize)) throw new Error("[jqPaginator] type error: pageSize");

			if (!d.isNumber(a.currentPage)) throw new Error("[jqPaginator] type error: currentPage");

			if (!d.isNumber(a.visiblePages)) throw new Error("[jqPaginator] type error: visiblePages");

			if (!a.totalPages && !a.totalCounts) throw new Error("[jqPaginator] totalCounts or totalPages is required");

			if (!a.totalPages && !a.totalCounts) throw new Error("[jqPaginator] totalCounts or totalPages is required");

			if (!a.totalPages && a.totalCounts && !a.pageSize) throw new Error("[jqPaginator] pageSize is required");

			if (a.totalCounts && a.pageSize && (a.totalPages = Math.ceil(a.totalCounts / a.pageSize)), a.currentPage < 1 || a.currentPage >

				a.totalPages) throw new Error("[jqPaginator] currentPage is incorrect");

			if (a.totalPages < 1) throw new Error("[jqPaginator] totalPages cannot be less currentPage")

		}, d.extendJquery = function() {

			a.fn.jqPaginatorHTML = function(b) {

				return b ? this.before(b).remove() : a("<p>").append(this.eq(0).clone()).html()

			}

		}, d.render = function() {

			d.renderHtml(), d.setStatus(), d.bindEvents()

		}, d.renderHtml = function() {

			for (var b = [], c = d.getPages(), e = 0, f = c.length; f > e; e++) b.push(d.buildItem("page", c[e]));

			d.isEnable("prev") && b.unshift(d.buildItem("prev", d.options.currentPage - 1)), d.isEnable("first") && b.unshift(

					d.buildItem("first", 1)), d.isEnable("statistics") && b.unshift(d.buildItem("statistics")), d.isEnable("next") &&

				b.push(d.buildItem("next", d.options.currentPage + 1)), d.isEnable("last") && b.push(d.buildItem("last", d.options

					.totalPages)), d.$container.html(d.options.wrapper ? a(d.options.wrapper).html(b.join("")).jqPaginatorHTML() : b

					.join(""))

		}, d.buildItem = function(b, c) {

			var e = d.options[b].replace(/{{page}}/g, c).replace(/{{totalPages}}/g, d.options.totalPages).replace(

				/{{totalCounts}}/g, d.options.totalCounts);

			return a(e).attr({

				"jp-role": b,

				"jp-data": c

			}).jqPaginatorHTML()

		}, d.setStatus = function() {

			var b = d.options;

			d.isEnable("first") && 1 !== b.currentPage || a("[jp-role=first]", d.$container).addClass(b.disableClass), d.isEnable(

				"prev") && 1 !== b.currentPage || a("[jp-role=prev]", d.$container).addClass(b.disableClass), (!d.isEnable(

				"next") || b.currentPage >= b.totalPages) && a("[jp-role=next]", d.$container).addClass(b.disableClass), (!d.isEnable(

				"last") || b.currentPage >= b.totalPages) && a("[jp-role=last]", d.$container).addClass(b.disableClass), a(

				"[jp-role=page]", d.$container).removeClass(b.activeClass), a("[jp-role=page][jp-data=" + b.currentPage + "]", d

				.$container).addClass(b.activeClass)

		}, d.getPages = function() {

			var a = [],

				b = d.options.visiblePages,

				c = d.options.currentPage,

				e = d.options.totalPages;

			b > e && (b = e);

			var f = Math.floor(b / 2),

				g = c - f + 1 - b % 2,

				h = c + f;

			1 > g && (g = 1, h = b), h > e && (h = e, g = 1 + e - b);

			for (var i = g; h >= i;) a.push(i), i++;

			return a

		}, d.isNumber = function(a) {

			var b = typeof a;

			return "number" === b || "undefined" === b

		}, d.isEnable = function(a) {

			return d.options[a] && "string" == typeof d.options[a]

		}, d.switchPage = function(a) {

			d.options.currentPage = a, d.render()

		}, d.fireEvent = function(a, b) {

			return "function" != typeof d.options.onPageChange || d.options.onPageChange(a, b) !== !1

		}, d.callMethod = function(b, c) {

			switch (b) {

				case "option":

					d.options = a.extend({}, d.options, c), d.verify(), d.render();

					break;

				case "destroy":

					d.$container.empty(), d.$container.removeData("jqPaginator");

					break;

				default:

					throw new Error('[jqPaginator] method "' + b + '" does not exist')

			}

			return d.$container

		}, d.bindEvents = function() {

			var b = d.options;

			d.$container.off(), d.$container.on("click", "[jp-role]", function() {

				var c = a(this);

				if (!c.hasClass(b.disableClass) && !c.hasClass(b.activeClass)) {

					var e = +c.attr("jp-data");

					d.fireEvent(e, "change") && d.switchPage(e)

				}

			})

		}, d.init(), d.$container

	}, a.jqPaginator.defaultOptions = {

		wrapper: "",

		first: '<li class="first"><a href="javascript:;">First</a></li>',

		prev: '<li class="prev"><a href="javascript:;">Previous</a></li>',

		next: '<li class="next"><a href="javascript:;">Next</a></li>',

		last: '<li class="last"><a href="javascript:;">Last</a></li>',

		page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',

		totalPages: 0,

		totalCounts: 0,

		pageSize: 0,

		currentPage: 1,

		visiblePages: 7,

		disableClass: "disabled",

		activeClass: "active",

		onPageChange: null

	}, a.fn.jqPaginator = function() {

		var b = this,

			c = Array.prototype.slice.call(arguments);

		if ("string" == typeof c[0]) {

			var d = a(b).data("jqPaginator");

			if (d) return d.callMethod(c[0], c[1]);

			throw new Error("[jqPaginator] the element is not instantiated")

		}

		return new a.jqPaginator(this, c[0])

	}

}(jQuery);

! function(t) {

	"use strict";

	var u, r = Object.prototype,

		h = r.hasOwnProperty,

		e = "function" == typeof Symbol ? Symbol : {},

		o = e.iterator || "@@iterator",

		n = e.asyncIterator || "@@asyncIterator",

		i = e.toStringTag || "@@toStringTag",

		a = "object" == typeof module,

		c = t.regeneratorRuntime;

	if (c) a && (module.exports = c);

	else {

		(c = t.regeneratorRuntime = a ? module.exports : {}).wrap = w;

		var f = "suspendedStart",

			l = "suspendedYield",

			p = "executing",

			y = "completed",

			v = {},

			s = {};

		s[o] = function() {

			return this

		};

		var d = Object.getPrototypeOf,

			g = d && d(d(P([])));

		g && g !== r && h.call(g, o) && (s = g);

		var m = b.prototype = x.prototype = Object.create(s);

		E.prototype = m.constructor = b, b.constructor = E, b[i] = E.displayName = "GeneratorFunction", c.isGeneratorFunction =

			function(t) {

				var r = "function" == typeof t && t.constructor;

				return !!r && (r === E || "GeneratorFunction" === (r.displayName || r.name))

			}, c.mark = function(t) {

				return Object.setPrototypeOf ? Object.setPrototypeOf(t, b) : (t.__proto__ = b, i in t || (t[i] =

					"GeneratorFunction")), t.prototype = Object.create(m), t

			}, c.awrap = function(t) {

				return {

					__await: t

				}

			}, _(j.prototype), j.prototype[n] = function() {

				return this

			}, c.AsyncIterator = j, c.async = function(t, r, e, n) {

				var o = new j(w(t, r, e, n));

				return c.isGeneratorFunction(r) ? o : o.next().then(function(t) {

					return t.done ? t.value : o.next()

				})

			}, _(m), m[i] = "Generator", m[o] = function() {

				return this

			}, m.toString = function() {

				return "[object Generator]"

			}, c.keys = function(e) {

				var n = [];

				for (var t in e) n.push(t);

				return n.reverse(),

					function t() {

						for (; n.length;) {

							var r = n.pop();

							if (r in e) return t.value = r, t.done = !1, t

						}

						return t.done = !0, t

					}

			}, c.values = P, N.prototype = {

				constructor: N,

				reset: function(t) {

					if (this.prev = 0, this.next = 0, this.sent = this._sent = u, this.done = !1, this.delegate = null, this.method =

						"next", this.arg = u, this.tryEntries.forEach(G), !t)

						for (var r in this) "t" === r.charAt(0) && h.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = u)

				},

				stop: function() {

					this.done = !0;

					var t = this.tryEntries[0].completion;

					if ("throw" === t.type) throw t.arg;

					return this.rval

				},

				dispatchException: function(e) {

					if (this.done) throw e;

					var n = this;



					function t(t, r) {

						return i.type = "throw", i.arg = e, n.next = t, r && (n.method = "next", n.arg = u), !!r

					}

					for (var r = this.tryEntries.length - 1; 0 <= r; --r) {

						var o = this.tryEntries[r],

							i = o.completion;

						if ("root" === o.tryLoc) return t("end");

						if (o.tryLoc <= this.prev) {

							var a = h.call(o, "catchLoc"),

								c = h.call(o, "finallyLoc");

							if (a && c) {

								if (this.prev < o.catchLoc) return t(o.catchLoc, !0);

								if (this.prev < o.finallyLoc) return t(o.finallyLoc)

							} else if (a) {

								if (this.prev < o.catchLoc) return t(o.catchLoc, !0)

							} else {

								if (!c) throw new Error("try statement without catch or finally");

								if (this.prev < o.finallyLoc) return t(o.finallyLoc)

							}

						}

					}

				},

				abrupt: function(t, r) {

					for (var e = this.tryEntries.length - 1; 0 <= e; --e) {

						var n = this.tryEntries[e];

						if (n.tryLoc <= this.prev && h.call(n, "finallyLoc") && this.prev < n.finallyLoc) {

							var o = n;

							break

						}

					}

					o && ("break" === t || "continue" === t) && o.tryLoc <= r && r <= o.finallyLoc && (o = null);

					var i = o ? o.completion : {};

					return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o.finallyLoc, v) : this.complete(i)

				},

				complete: function(t, r) {

					if ("throw" === t.type) throw t.arg;

					return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg =

						t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), v

				},

				finish: function(t) {

					for (var r = this.tryEntries.length - 1; 0 <= r; --r) {

						var e = this.tryEntries[r];

						if (e.finallyLoc === t) return this.complete(e.completion, e.afterLoc), G(e), v

					}

				},

				catch: function(t) {

					for (var r = this.tryEntries.length - 1; 0 <= r; --r) {

						var e = this.tryEntries[r];

						if (e.tryLoc === t) {

							var n = e.completion;

							if ("throw" === n.type) {

								var o = n.arg;

								G(e)

							}

							return o

						}

					}

					throw new Error("illegal catch attempt")

				},

				delegateYield: function(t, r, e) {

					return this.delegate = {

						iterator: P(t),

						resultName: r,

						nextLoc: e

					}, "next" === this.method && (this.arg = u), v

				}

			}

	}



	function w(t, r, e, n) {

		var i, a, c, u, o = r && r.prototype instanceof x ? r : x,

			h = Object.create(o.prototype),

			s = new N(n || []);

		return h._invoke = (i = t, a = e, c = s, u = f, function(t, r) {

			if (u === p) throw new Error("Generator is already running");

			if (u === y) {

				if ("throw" === t) throw r;

				return F()

			}

			for (c.method = t, c.arg = r;;) {

				var e = c.delegate;

				if (e) {

					var n = O(e, c);

					if (n) {

						if (n === v) continue;

						return n

					}

				}

				if ("next" === c.method) c.sent = c._sent = c.arg;

				else if ("throw" === c.method) {

					if (u === f) throw u = y, c.arg;

					c.dispatchException(c.arg)

				} else "return" === c.method && c.abrupt("return", c.arg);

				u = p;

				var o = L(i, a, c);

				if ("normal" === o.type) {

					if (u = c.done ? y : l, o.arg === v) continue;

					return {

						value: o.arg,

						done: c.done

					}

				}

				"throw" === o.type && (u = y, c.method = "throw", c.arg = o.arg)

			}

		}), h

	}



	function L(t, r, e) {

		try {

			return {

				type: "normal",

				arg: t.call(r, e)

			}

		} catch (t) {

			return {

				type: "throw",

				arg: t

			}

		}

	}



	function x() {}



	function E() {}



	function b() {}



	function _(t) {

		["next", "throw", "return"].forEach(function(r) {

			t[r] = function(t) {

				return this._invoke(r, t)

			}

		})

	}



	function j(u) {

		var r;

		this._invoke = function(e, n) {

			function t() {

				return new Promise(function(t, r) {

					! function r(t, e, n, o) {

						var i = L(u[t], u, e);

						if ("throw" !== i.type) {

							var a = i.arg,

								c = a.value;

							return c && "object" == typeof c && h.call(c, "__await") ? Promise.resolve(c.__await).then(function(t) {

								r("next", t, n, o)

							}, function(t) {

								r("throw", t, n, o)

							}) : Promise.resolve(c).then(function(t) {

								a.value = t, n(a)

							}, o)

						}

						o(i.arg)

					}(e, n, t, r)

				})

			}

			return r = r ? r.then(t, t) : t()

		}

	}



	function O(t, r) {

		var e = t.iterator[r.method];

		if (e === u) {

			if (r.delegate = null, "throw" === r.method) {

				if (t.iterator.return && (r.method = "return", r.arg = u, O(t, r), "throw" === r.method)) return v;

				r.method = "throw", r.arg = new TypeError("The iterator does not provide a 'throw' method")

			}

			return v

		}

		var n = L(e, t.iterator, r.arg);

		if ("throw" === n.type) return r.method = "throw", r.arg = n.arg, r.delegate = null, v;

		var o = n.arg;

		return o ? o.done ? (r[t.resultName] = o.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", r.arg =

			u), r.delegate = null, v) : o : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate =

			null, v)

	}



	function k(t) {

		var r = {

			tryLoc: t[0]

		};

		1 in t && (r.catchLoc = t[1]), 2 in t && (r.finallyLoc = t[2], r.afterLoc = t[3]), this.tryEntries.push(r)

	}



	function G(t) {

		var r = t.completion || {};

		r.type = "normal", delete r.arg, t.completion = r

	}



	function N(t) {

		this.tryEntries = [{

			tryLoc: "root"

		}], t.forEach(k, this), this.reset(!0)

	}



	function P(r) {

		if (r) {

			var t = r[o];

			if (t) return t.call(r);

			if ("function" == typeof r.next) return r;

			if (!isNaN(r.length)) {

				var e = -1,

					n = function t() {

						for (; ++e < r.length;)

							if (h.call(r, e)) return t.value = r[e], t.done = !1, t;

						return t.value = u, t.done = !0, t

					};

				return n.next = n

			}

		}

		return {

			next: F

		}

	}



	function F() {

		return {

			value: u,

			done: !0

		}

	}

}(function() {

	return this

}() || Function("return this")());

! function(n) {

	"use strict";

	"function" == typeof define && define.amd ? define(["jquery"], function(t) {

		return n(t, window, document)

	}) : "object" == typeof exports ? module.exports = function(t, e) {

		return t || (t = window), e || (e = "undefined" != typeof window ? require("jquery") : require("jquery")(t)), n(e, t,

			t.document)

	} : n(jQuery, window, document)

}(function(U, A, S, V) {

	"use strict";

	var p, m, e, t, I = function(C) {

			this.$ = function(t, e) {

				return this.api(!0).$(t, e)

			}, this._ = function(t, e) {

				return this.api(!0).rows(t, e).data()

			}, this.api = function(t) {

				return new m(t ? oe(this[p.iApiIndex]) : this)

			}, this.fnAddData = function(t, e) {

				var n = this.api(!0),

					a = U.isArray(t) && (U.isArray(t[0]) || U.isPlainObject(t[0])) ? n.rows.add(t) : n.row.add(t);

				return (e === V || e) && n.draw(), a.flatten().toArray()

			}, this.fnAdjustColumnSizing = function(t) {

				var e = this.api(!0).columns.adjust(),

					n = e.settings()[0],

					a = n.oScroll;

				t === V || t ? e.draw(!1) : "" === a.sX && "" === a.sY || Bt(n)

			}, this.fnClearTable = function(t) {

				var e = this.api(!0).clear();

				(t === V || t) && e.draw()

			}, this.fnClose = function(t) {

				this.api(!0).row(t).child.hide()

			}, this.fnDeleteRow = function(t, e, n) {

				var a = this.api(!0),

					r = a.rows(t),

					o = r.settings()[0],

					i = o.aoData[r[0][0]];

				return r.remove(), e && e.call(this, o, i), (n === V || n) && a.draw(), i

			}, this.fnDestroy = function(t) {

				this.api(!0).destroy(t)

			}, this.fnDraw = function(t) {

				this.api(!0).draw(t)

			}, this.fnFilter = function(t, e, n, a, r, o) {

				var i = this.api(!0);

				null === e || e === V ? i.search(t, n, a, o) : i.column(e).search(t, n, a, o), i.draw()

			}, this.fnGetData = function(t, e) {

				var n = this.api(!0);

				if (t !== V) {

					var a = t.nodeName ? t.nodeName.toLowerCase() : "";

					return e !== V || "td" == a || "th" == a ? n.cell(t, e).data() : n.row(t).data() || null

				}

				return n.data().toArray()

			}, this.fnGetNodes = function(t) {

				var e = this.api(!0);

				return t !== V ? e.row(t).node() : e.rows().nodes().flatten().toArray()

			}, this.fnGetPosition = function(t) {

				var e = this.api(!0),

					n = t.nodeName.toUpperCase();

				if ("TR" == n) return e.row(t).index();

				if ("TD" == n || "TH" == n) {

					var a = e.cell(t).index();

					return [a.row, a.columnVisible, a.column]

				}

				return null

			}, this.fnIsOpen = function(t) {

				return this.api(!0).row(t).child.isShown()

			}, this.fnOpen = function(t, e, n) {

				return this.api(!0).row(t).child(e, n).show().child()[0]

			}, this.fnPageChange = function(t, e) {

				var n = this.api(!0).page(t);

				(e === V || e) && n.draw(!1)

			}, this.fnSetColumnVis = function(t, e, n) {

				var a = this.api(!0).column(t).visible(e);

				(n === V || n) && a.columns.adjust().draw()

			}, this.fnSettings = function() {

				return oe(this[p.iApiIndex])

			}, this.fnSort = function(t) {

				this.api(!0).order(t).draw()

			}, this.fnSortListener = function(t, e, n) {

				this.api(!0).order.listener(t, e, n)

			}, this.fnUpdate = function(t, e, n, a, r) {

				var o = this.api(!0);

				return n === V || null === n ? o.row(e).data(t) : o.cell(e, n).data(t), (r === V || r) && o.columns.adjust(), (a ===

					V || a) && o.draw(), 0

			}, this.fnVersionCheck = p.fnVersionCheck;

			var T = this,

				w = C === V,

				x = this.length;

			for (var t in w && (C = {}), this.oApi = this.internal = p.internal, I.ext.internal) t && (this[t] = Ne(t));

			return this.each(function() {

				var o, i = 1 < x ? se({}, C, !0) : C,

					l = 0,

					t = this.getAttribute("id"),

					s = !1,

					e = I.defaults,

					u = U(this);

				if ("table" == this.nodeName.toLowerCase()) {

					R(e), P(e.column), F(e, e, !0), F(e.column, e.column, !0), F(e, U.extend(i, u.data()));

					var n = I.settings;

					for (l = 0, o = n.length; l < o; l++) {

						var a = n[l];

						if (a.nTable == this || a.nTHead && a.nTHead.parentNode == this || a.nTFoot && a.nTFoot.parentNode == this) {

							var r = i.bRetrieve !== V ? i.bRetrieve : e.bRetrieve,

								c = i.bDestroy !== V ? i.bDestroy : e.bDestroy;

							if (w || r) return a.oInstance;

							if (c) {

								a.oInstance.fnDestroy();

								break

							}

							return void ie(a, 0, "Cannot reinitialise DataTable", 3)

						}

						if (a.sTableId == this.id) {

							n.splice(l, 1);

							break

						}

					}

					null !== t && "" !== t || (t = "DataTables_Table_" + I.ext._unique++, this.id = t);

					var f = U.extend(!0, {}, I.models.oSettings, {

						sDestroyWidth: u[0].style.width,

						sInstance: t,

						sTableId: t

					});

					f.nTable = this, f.oApi = T.internal, f.oInit = i, n.push(f), f.oInstance = 1 === T.length ? T : u.dataTable(),

						R(i), L(i.oLanguage), i.aLengthMenu && !i.iDisplayLength && (i.iDisplayLength = U.isArray(i.aLengthMenu[0]) ?

							i.aLengthMenu[0][0] : i.aLengthMenu[0]), i = se(U.extend(!0, {}, e), i), le(f.oFeatures, i, ["bPaginate",

							"bLengthChange", "bFilter", "bSort", "bSortMulti", "bInfo", "bProcessing", "bAutoWidth", "bSortClasses",

							"bServerSide", "bDeferRender"

						]), le(f, i, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting",

							"aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom",

							"bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay",

							"rowId", ["iCookieDuration", "iStateDuration"],

							["oSearch", "oPreviousSearch"],

							["aoSearchCols", "aoPreSearchCols"],

							["iDisplayLength", "_iDisplayLength"]

						]), le(f.oScroll, i, [

							["sScrollX", "sX"],

							["sScrollXInner", "sXInner"],

							["sScrollY", "sY"],

							["bScrollCollapse", "bCollapse"]

						]), le(f.oLanguage, i, "fnInfoCallback"), ce(f, "aoDrawCallback", i.fnDrawCallback, "user"), ce(f,

							"aoServerParams", i.fnServerParams, "user"), ce(f, "aoStateSaveParams", i.fnStateSaveParams, "user"), ce(f,

							"aoStateLoadParams", i.fnStateLoadParams, "user"), ce(f, "aoStateLoaded", i.fnStateLoaded, "user"), ce(f,

							"aoRowCallback", i.fnRowCallback, "user"), ce(f, "aoRowCreatedCallback", i.fnCreatedRow, "user"), ce(f,

							"aoHeaderCallback", i.fnHeaderCallback, "user"), ce(f, "aoFooterCallback", i.fnFooterCallback, "user"), ce(f,

							"aoInitComplete", i.fnInitComplete, "user"), ce(f, "aoPreDrawCallback", i.fnPreDrawCallback, "user"), f.rowIdFn =

						Y(i.rowId), j(f);

					var d = f.oClasses;

					if (U.extend(d, I.ext.classes, i.oClasses), u.addClass(d.sTable), f.iInitDisplayStart === V && (f.iInitDisplayStart =

							i.iDisplayStart, f._iDisplayStart = i.iDisplayStart), null !== i.iDeferLoading) {

						f.bDeferLoading = !0;

						var h = U.isArray(i.iDeferLoading);

						f._iRecordsDisplay = h ? i.iDeferLoading[0] : i.iDeferLoading, f._iRecordsTotal = h ? i.iDeferLoading[1] : i.iDeferLoading

					}

					var p = f.oLanguage;

					U.extend(!0, p, i.oLanguage), p.sUrl && (U.ajax({

						dataType: "json",

						url: p.sUrl,

						success: function(t) {

							L(t), F(e.oLanguage, t), U.extend(!0, p, t), Pt(f)

						},

						error: function() {

							Pt(f)

						}

					}), s = !0), null === i.asStripeClasses && (f.asStripeClasses = [d.sStripeOdd, d.sStripeEven]);

					var g = f.asStripeClasses,

						b = u.children("tbody").find("tr").eq(0); - 1 !== U.inArray(!0, U.map(g, function(t, e) {

						return b.hasClass(t)

					})) && (U("tbody tr", this).removeClass(g.join(" ")), f.asDestroyStripes = g.slice());

					var v, S = [],

						m = this.getElementsByTagName("thead");

					if (0 !== m.length && (ct(f.aoHeader, m[0]), S = ft(f)), null === i.aoColumns)

						for (v = [], l = 0, o = S.length; l < o; l++) v.push(null);

					else v = i.aoColumns;

					for (l = 0, o = v.length; l < o; l++) N(f, S ? S[l] : null);

					if (M(f, i.aoColumnDefs, v, function(t, e) {

							H(f, t, e)

						}), b.length) {

						var D = function(t, e) {

							return null !== t.getAttribute("data-" + e) ? e : null

						};

						U(b[0]).children("th, td").each(function(t, e) {

							var n = f.aoColumns[t];

							if (n.mData === t) {

								var a = D(e, "sort") || D(e, "order"),

									r = D(e, "filter") || D(e, "search");

								null === a && null === r || (n.mData = {

									_: t + ".display",

									sort: null !== a ? t + ".@data-" + a : V,

									type: null !== a ? t + ".@data-" + a : V,

									filter: null !== r ? t + ".@data-" + r : V

								}, H(f, t))

							}

						})

					}

					var y = f.oFeatures,

						_ = function() {

							if (i.aaSorting === V) {

								var t = f.aaSorting;

								for (l = 0, o = t.length; l < o; l++) t[l][1] = f.aoColumns[l].asSorting[0]

							}

							ee(f), y.bSort && ce(f, "aoDrawCallback", function() {

								if (f.bSorted) {

									var t = Yt(f),

										n = {};

									U.each(t, function(t, e) {

										n[e.src] = e.dir

									}), fe(f, null, "order", [f, t, n]), Kt(f)

								}

							}), ce(f, "aoDrawCallback", function() {

								(f.bSorted || "ssp" === pe(f) || y.bDeferRender) && ee(f)

							}, "sc");

							var e = u.children("caption").each(function() {

									this._captionSide = U(this).css("caption-side")

								}),

								n = u.children("thead");

							0 === n.length && (n = U("<thead/>").appendTo(u)), f.nTHead = n[0];

							var a = u.children("tbody");

							0 === a.length && (a = U("<tbody/>").appendTo(u)), f.nTBody = a[0];

							var r = u.children("tfoot");

							if (0 === r.length && 0 < e.length && ("" !== f.oScroll.sX || "" !== f.oScroll.sY) && (r = U("<tfoot/>").appendTo(

									u)), 0 === r.length || 0 === r.children().length ? u.addClass(d.sNoFooter) : 0 < r.length && (f.nTFoot = r[

									0], ct(f.aoFooter, f.nTFoot)), i.aaData)

								for (l = 0; l < i.aaData.length; l++) W(f, i.aaData[l]);

							else(f.bDeferLoading || "dom" == pe(f)) && E(f, U(f.nTBody).children("tr"));

							f.aiDisplay = f.aiDisplayMaster.slice(), !(f.bInitialised = !0) === s && Pt(f)

						};

					i.bStateSave ? (y.bStateSave = !0, ce(f, "aoDrawCallback", ae, "state_save"), re(f, i, _)) : _()

				} else ie(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2)

			}), T = null, this

		},

		n = {},

		a = /[\r\n]/g,

		r = /<.*?>/g,

		o = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,

		i = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^", "-"].join("|\\") +

			")", "g"),

		l = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,

		s = function(t) {

			return !t || !0 === t || "-" === t

		},

		h = function(t) {

			var e = parseInt(t, 10);

			return !isNaN(e) && isFinite(t) ? e : null

		},

		u = function(t, e) {

			return n[e] || (n[e] = new RegExp(Ct(e), "g")), "string" == typeof t && "." !== e ? t.replace(/\./g, "").replace(n[

				e], ".") : t

		},

		c = function(t, e, n) {

			var a = "string" == typeof t;

			return !!s(t) || (e && a && (t = u(t, e)), n && a && (t = t.replace(l, "")), !isNaN(parseFloat(t)) && isFinite(t))

		},

		f = function(t, e, n) {

			return !!s(t) || ((s(a = t) || "string" == typeof a) && !!c(d(t), e, n) || null);

			var a

		},

		X = function(t, e, n) {

			var a = [],

				r = 0,

				o = t.length;

			if (n !== V)

				for (; r < o; r++) t[r] && t[r][e] && a.push(t[r][e][n]);

			else

				for (; r < o; r++) t[r] && a.push(t[r][e]);

			return a

		},

		D = function(t, e, n, a) {

			var r = [],

				o = 0,

				i = e.length;

			if (a !== V)

				for (; o < i; o++) t[e[o]][n] && r.push(t[e[o]][n][a]);

			else

				for (; o < i; o++) r.push(t[e[o]][n]);

			return r

		},

		g = function(t, e) {

			var n, a = [];

			e === V ? (e = 0, n = t) : (n = e, e = t);

			for (var r = e; r < n; r++) a.push(r);

			return a

		},

		y = function(t) {

			for (var e = [], n = 0, a = t.length; n < a; n++) t[n] && e.push(t[n]);

			return e

		},

		d = function(t) {

			return t.replace(r, "")

		},

		b = function(t) {

			if (function(t) {

					if (t.length < 2) return !0;

					for (var e = t.slice().sort(), n = e[0], a = 1, r = e.length; a < r; a++) {

						if (e[a] === n) return !1;

						n = e[a]

					}

					return !0

				}(t)) return t.slice();

			var e, n, a, r = [],

				o = t.length,

				i = 0;

			t: for (n = 0; n < o; n++) {

				for (e = t[n], a = 0; a < i; a++)

					if (r[a] === e) continue t;

				r.push(e), i++

			}

			return r

		};



	function v(n) {

		var a, r, o = {};

		U.each(n, function(t, e) {

			(a = t.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== "a aa ai ao as b fn i m o s ".indexOf(a[1] + " ") && (r = t.replace(

				a[0], a[2].toLowerCase()), o[r] = t, "o" === a[1] && v(n[t]))

		}), n._hungarianMap = o

	}



	function F(n, a, r) {

		var o;

		n._hungarianMap || v(n), U.each(a, function(t, e) {

			(o = n._hungarianMap[t]) === V || !r && a[o] !== V || ("o" === o.charAt(0) ? (a[o] || (a[o] = {}), U.extend(!0, a[

				o], a[t]), F(n[o], a[o], r)) : a[o] = a[t])

		})

	}



	function L(t) {

		var e = I.defaults.oLanguage,

			n = e.sDecimal;

		if (n && Pe(n), t) {

			var a = t.sZeroRecords;

			!t.sEmptyTable && a && "No data available in table" === e.sEmptyTable && le(t, t, "sZeroRecords", "sEmptyTable"), !

				t.sLoadingRecords && a && "Loading..." === e.sLoadingRecords && le(t, t, "sZeroRecords", "sLoadingRecords"), t.sInfoThousands &&

				(t.sThousands = t.sInfoThousands);

			var r = t.sDecimal;

			r && n !== r && Pe(r)

		}

	}

	I.util = {

		throttle: function(a, t) {

			var r, o, i = t !== V ? t : 200;

			return function() {

				var t = this,

					e = +new Date,

					n = arguments;

				r && e < r + i ? (clearTimeout(o), o = setTimeout(function() {

					r = V, a.apply(t, n)

				}, i)) : (r = e, a.apply(t, n))

			}

		},

		escapeRegex: function(t) {

			return t.replace(i, "\\$1")

		}

	};

	var _ = function(t, e, n) {

		t[e] !== V && (t[n] = t[e])

	};



	function R(t) {

		_(t, "ordering", "bSort"), _(t, "orderMulti", "bSortMulti"), _(t, "orderClasses", "bSortClasses"), _(t,

				"orderCellsTop", "bSortCellsTop"), _(t, "order", "aaSorting"), _(t, "orderFixed", "aaSortingFixed"), _(t, "paging",

				"bPaginate"), _(t, "pagingType", "sPaginationType"), _(t, "pageLength", "iDisplayLength"), _(t, "searching",

				"bFilter"), "boolean" == typeof t.sScrollX && (t.sScrollX = t.sScrollX ? "100%" : ""), "boolean" == typeof t.scrollX &&

			(t.scrollX = t.scrollX ? "100%" : "");

		var e = t.aoSearchCols;

		if (e)

			for (var n = 0, a = e.length; n < a; n++) e[n] && F(I.models.oSearch, e[n])

	}



	function P(t) {

		_(t, "orderable", "bSortable"), _(t, "orderData", "aDataSort"), _(t, "orderSequence", "asSorting"), _(t,

			"orderDataType", "sortDataType");

		var e = t.aDataSort;

		"number" != typeof e || U.isArray(e) || (t.aDataSort = [e])

	}



	function j(t) {

		if (!I.__browser) {

			var e = {};

			I.__browser = e;

			var n = U("<div/>").css({

					position: "fixed",

					top: 0,

					left: -1 * U(A).scrollLeft(),

					height: 1,

					width: 1,

					overflow: "hidden"

				}).append(U("<div/>").css({

					position: "absolute",

					top: 1,

					left: 1,

					width: 100,

					overflow: "scroll"

				}).append(U("<div/>").css({

					width: "100%",

					height: 10

				}))).appendTo("body"),

				a = n.children(),

				r = a.children();

			e.barWidth = a[0].offsetWidth - a[0].clientWidth, e.bScrollOversize = 100 === r[0].offsetWidth && 100 !== a[0].clientWidth,

				e.bScrollbarLeft = 1 !== Math.round(r.offset().left), e.bBounding = !!n[0].getBoundingClientRect().width, n.remove()

		}

		U.extend(t.oBrowser, I.__browser), t.oScroll.iBarWidth = I.__browser.barWidth

	}



	function C(t, e, n, a, r, o) {

		var i, l = a,

			s = !1;

		for (n !== V && (i = n, s = !0); l !== r;) t.hasOwnProperty(l) && (i = s ? e(i, t[l], l, t) : t[l], s = !0, l += o);

		return i

	}



	function N(t, e) {

		var n = I.defaults.column,

			a = t.aoColumns.length,

			r = U.extend({}, I.models.oColumn, n, {

				nTh: e || S.createElement("th"),

				sTitle: n.sTitle ? n.sTitle : e ? e.innerHTML : "",

				aDataSort: n.aDataSort ? n.aDataSort : [a],

				mData: n.mData ? n.mData : a,

				idx: a

			});

		t.aoColumns.push(r);

		var o = t.aoPreSearchCols;

		o[a] = U.extend({}, I.models.oSearch, o[a]), H(t, a, U(e).data())

	}



	function H(t, e, n) {

		var a = t.aoColumns[e],

			r = t.oClasses,

			o = U(a.nTh);

		if (!a.sWidthOrig) {

			a.sWidthOrig = o.attr("width") || null;

			var i = (o.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);

			i && (a.sWidthOrig = i[1])

		}

		n !== V && null !== n && (P(n), F(I.defaults.column, n), n.mDataProp === V || n.mData || (n.mData = n.mDataProp), n.sType &&

			(a._sManualType = n.sType), n.className && !n.sClass && (n.sClass = n.className), n.sClass && o.addClass(n.sClass),

			U.extend(a, n), le(a, n, "sWidth", "sWidthOrig"), n.iDataSort !== V && (a.aDataSort = [n.iDataSort]), le(a, n,

				"aDataSort"));

		var l = a.mData,

			s = Y(l),

			u = a.mRender ? Y(a.mRender) : null,

			c = function(t) {

				return "string" == typeof t && -1 !== t.indexOf("@")

			};

		a._bAttrSrc = U.isPlainObject(l) && (c(l.sort) || c(l.type) || c(l.filter)), a._setter = null, a.fnGetData =

			function(t, e, n) {

				var a = s(t, e, V, n);

				return u && e ? u(a, e, t, n) : a

			}, a.fnSetData = function(t, e, n) {

				return Z(l)(t, e, n)

			}, "number" != typeof l && (t._rowReadObject = !0), t.oFeatures.bSort || (a.bSortable = !1, o.addClass(r.sSortableNone));

		var f = -1 !== U.inArray("asc", a.asSorting),

			d = -1 !== U.inArray("desc", a.asSorting);

		a.bSortable && (f || d) ? f && !d ? (a.sSortingClass = r.sSortableAsc, a.sSortingClassJUI = r.sSortJUIAscAllowed) :

			!f && d ? (a.sSortingClass = r.sSortableDesc, a.sSortingClassJUI = r.sSortJUIDescAllowed) : (a.sSortingClass = r.sSortable,

				a.sSortingClassJUI = r.sSortJUI) : (a.sSortingClass = r.sSortableNone, a.sSortingClassJUI = "")

	}



	function J(t) {

		if (!1 !== t.oFeatures.bAutoWidth) {

			var e = t.aoColumns;

			Xt(t);

			for (var n = 0, a = e.length; n < a; n++) e[n].nTh.style.width = e[n].sWidth

		}

		var r = t.oScroll;

		"" === r.sY && "" === r.sX || Bt(t), fe(t, null, "column-sizing", [t])

	}



	function q(t, e) {

		var n = k(t, "bVisible");

		return "number" == typeof n[e] ? n[e] : null

	}



	function T(t, e) {

		var n = k(t, "bVisible"),

			a = U.inArray(e, n);

		return -1 !== a ? a : null

	}



	function O(t) {

		var n = 0;

		return U.each(t.aoColumns, function(t, e) {

			e.bVisible && "none" !== U(e.nTh).css("display") && n++

		}), n

	}



	function k(t, n) {

		var a = [];

		return U.map(t.aoColumns, function(t, e) {

			t[n] && a.push(e)

		}), a

	}



	function w(t) {

		var e, n, a, r, o, i, l, s, u, c = t.aoColumns,

			f = t.aoData,

			d = I.ext.type.detect;

		for (e = 0, n = c.length; e < n; e++)

			if (u = [], !(l = c[e]).sType && l._sManualType) l.sType = l._sManualType;

			else if (!l.sType) {

			for (a = 0, r = d.length; a < r; a++) {

				for (o = 0, i = f.length; o < i && (u[o] === V && (u[o] = x(t, o, e, "type")), (s = d[a](u[o], t)) || a === d.length -

						1) && "html" !== s; o++);

				if (s) {

					l.sType = s;

					break

				}

			}

			l.sType || (l.sType = "string")

		}

	}



	function M(t, e, n, a) {

		var r, o, i, l, s, u, c, f = t.aoColumns;

		if (e)

			for (r = e.length - 1; 0 <= r; r--) {

				var d = (c = e[r]).targets !== V ? c.targets : c.aTargets;

				for (U.isArray(d) || (d = [d]), i = 0, l = d.length; i < l; i++)

					if ("number" == typeof d[i] && 0 <= d[i]) {

						for (; f.length <= d[i];) N(t);

						a(d[i], c)

					} else if ("number" == typeof d[i] && d[i] < 0) a(f.length + d[i], c);

				else if ("string" == typeof d[i])

					for (s = 0, u = f.length; s < u; s++)("_all" == d[i] || U(f[s].nTh).hasClass(d[i])) && a(s, c)

			}

		if (n)

			for (r = 0, o = n.length; r < o; r++) a(r, n[r])

	}



	function W(t, e, n, a) {

		var r = t.aoData.length,

			o = U.extend(!0, {}, I.models.oRow, {

				src: n ? "dom" : "data",

				idx: r

			});

		o._aData = e, t.aoData.push(o);

		for (var i = t.aoColumns, l = 0, s = i.length; l < s; l++) i[l].sType = null;

		t.aiDisplayMaster.push(r);

		var u = t.rowIdFn(e);

		return u !== V && (t.aIds[u] = o), !n && t.oFeatures.bDeferRender || at(t, r, n, a), r

	}



	function E(n, t) {

		var a;

		return t instanceof U || (t = U(t)), t.map(function(t, e) {

			return a = nt(n, e), W(n, a.data, e, a.cells)

		})

	}



	function x(t, e, n, a) {

		var r = t.iDraw,

			o = t.aoColumns[n],

			i = t.aoData[e]._aData,

			l = o.sDefaultContent,

			s = o.fnGetData(i, a, {

				settings: t,

				row: e,

				col: n

			});

		if (s === V) return t.iDrawError != r && null === l && (ie(t, 0, "Requested unknown parameter " + ("function" ==

				typeof o.mData ? "{function}" : "'" + o.mData + "'") + " for row " + e + ", column " + n, 4), t.iDrawError = r),

			l;

		if (s !== i && null !== s || null === l || a === V) {

			if ("function" == typeof s) return s.call(i)

		} else s = l;

		return null === s && "display" == a ? "" : s

	}



	function B(t, e, n, a) {

		var r = t.aoColumns[n],

			o = t.aoData[e]._aData;

		r.fnSetData(o, a, {

			settings: t,

			row: e,

			col: n

		})

	}

	var G = /\[.*?\]$/,

		$ = /\(\)$/;



	function z(t) {

		return U.map(t.match(/(\\.|[^\.])+/g) || [""], function(t) {

			return t.replace(/\\\./g, ".")

		})

	}



	function Y(r) {

		if (U.isPlainObject(r)) {

			var o = {};

			return U.each(r, function(t, e) {

					e && (o[t] = Y(e))

				}),

				function(t, e, n, a) {

					var r = o[e] || o._;

					return r !== V ? r(t, e, n, a) : t

				}

		}

		if (null === r) return function(t) {

			return t

		};

		if ("function" == typeof r) return function(t, e, n, a) {

			return r(t, e, n, a)

		};

		if ("string" != typeof r || -1 === r.indexOf(".") && -1 === r.indexOf("[") && -1 === r.indexOf("(")) return function(

			t, e) {

			return t[r]

		};

		var h = function(t, e, n) {

			var a, r, o, i;

			if ("" !== n)

				for (var l = z(n), s = 0, u = l.length; s < u; s++) {

					if (a = l[s].match(G), r = l[s].match($), a) {

						if (l[s] = l[s].replace(G, ""), "" !== l[s] && (t = t[l[s]]), o = [], l.splice(0, s + 1), i = l.join("."), U.isArray(

								t))

							for (var c = 0, f = t.length; c < f; c++) o.push(h(t[c], e, i));

						var d = a[0].substring(1, a[0].length - 1);

						t = "" === d ? o : o.join(d);

						break

					}

					if (r) l[s] = l[s].replace($, ""), t = t[l[s]]();

					else {

						if (null === t || t[l[s]] === V) return V;

						t = t[l[s]]

					}

				}

			return t

		};

		return function(t, e) {

			return h(t, e, r)

		}

	}



	function Z(a) {

		if (U.isPlainObject(a)) return Z(a._);

		if (null === a) return function() {};

		if ("function" == typeof a) return function(t, e, n) {

			a(t, "set", e, n)

		};

		if ("string" != typeof a || -1 === a.indexOf(".") && -1 === a.indexOf("[") && -1 === a.indexOf("(")) return function(

			t, e) {

			t[a] = e

		};

		var p = function(t, e, n) {

			for (var a, r, o, i, l, s = z(n), u = s[s.length - 1], c = 0, f = s.length - 1; c < f; c++) {

				if (r = s[c].match(G), o = s[c].match($), r) {

					if (s[c] = s[c].replace(G, ""), t[s[c]] = [], (a = s.slice()).splice(0, c + 1), l = a.join("."), U.isArray(e))

						for (var d = 0, h = e.length; d < h; d++) p(i = {}, e[d], l), t[s[c]].push(i);

					else t[s[c]] = e;

					return

				}

				o && (s[c] = s[c].replace($, ""), t = t[s[c]](e)), null !== t[s[c]] && t[s[c]] !== V || (t[s[c]] = {}), t = t[s[c]]

			}

			u.match($) ? t = t[u.replace($, "")](e) : t[u.replace(G, "")] = e

		};

		return function(t, e) {

			return p(t, e, a)

		}

	}



	function K(t) {

		return X(t.aoData, "_aData")

	}



	function Q(t) {

		t.aoData.length = 0, t.aiDisplayMaster.length = 0, t.aiDisplay.length = 0, t.aIds = {}

	}



	function tt(t, e, n) {

		for (var a = -1, r = 0, o = t.length; r < o; r++) t[r] == e ? a = r : t[r] > e && t[r]--; - 1 != a && n === V && t.splice(

			a, 1)

	}



	function et(n, a, t, e) {

		var r, o, i = n.aoData[a],

			l = function(t, e) {

				for (; t.childNodes.length;) t.removeChild(t.firstChild);

				t.innerHTML = x(n, a, e, "display")

			};

		if ("dom" !== t && (t && "auto" !== t || "dom" !== i.src)) {

			var s = i.anCells;

			if (s)

				if (e !== V) l(s[e], e);

				else

					for (r = 0, o = s.length; r < o; r++) l(s[r], r)

		} else i._aData = nt(n, i, e, e === V ? V : i._aData).data;

		i._aSortData = null, i._aFilterData = null;

		var u = n.aoColumns;

		if (e !== V) u[e].sType = null;

		else {

			for (r = 0, o = u.length; r < o; r++) u[r].sType = null;

			rt(n, i)

		}

	}



	function nt(t, e, n, r) {

		var a, o, i, l = [],

			s = e.firstChild,

			u = 0,

			c = t.aoColumns,

			f = t._rowReadObject;

		r = r !== V ? r : f ? {} : [];

		var d = function(t, e) {

				if ("string" == typeof t) {

					var n = t.indexOf("@");

					if (-1 !== n) {

						var a = t.substring(n + 1);

						Z(t)(r, e.getAttribute(a))

					}

				}

			},

			h = function(t) {

				n !== V && n !== u || (o = c[u], i = U.trim(t.innerHTML), o && o._bAttrSrc ? (Z(o.mData._)(r, i), d(o.mData.sort,

						t), d(o.mData.type, t), d(o.mData.filter, t)) : f ? (o._setter || (o._setter = Z(o.mData)), o._setter(r, i)) :

					r[u] = i);

				u++

			};

		if (s)

			for (; s;) "TD" != (a = s.nodeName.toUpperCase()) && "TH" != a || (h(s), l.push(s)), s = s.nextSibling;

		else

			for (var p = 0, g = (l = e.anCells).length; p < g; p++) h(l[p]);

		var b = e.firstChild ? e : e.nTr;

		if (b) {

			var v = b.getAttribute("id");

			v && Z(t.rowId)(r, v)

		}

		return {

			data: r,

			cells: l

		}

	}



	function at(t, e, n, a) {

		var r, o, i, l, s, u = t.aoData[e],

			c = u._aData,

			f = [];

		if (null === u.nTr) {

			for (r = n || S.createElement("tr"), u.nTr = r, u.anCells = f, r._DT_RowIndex = e, rt(t, u), l = 0, s = t.aoColumns

				.length; l < s; l++) i = t.aoColumns[l], (o = n ? a[l] : S.createElement(i.sCellType))._DT_CellIndex = {

					row: e,

					column: l

				}, f.push(o), n && !i.mRender && i.mData === l || U.isPlainObject(i.mData) && i.mData._ === l + ".display" || (o.innerHTML =

					x(t, e, l, "display")), i.sClass && (o.className += " " + i.sClass), i.bVisible && !n ? r.appendChild(o) : !i.bVisible &&

				n && o.parentNode.removeChild(o), i.fnCreatedCell && i.fnCreatedCell.call(t.oInstance, o, x(t, e, l), c, e, l);

			fe(t, "aoRowCreatedCallback", null, [r, c, e, f])

		}

		u.nTr.setAttribute("role", "row")

	}



	function rt(t, e) {

		var n = e.nTr,

			a = e._aData;

		if (n) {

			var r = t.rowIdFn(a);

			if (r && (n.id = r), a.DT_RowClass) {

				var o = a.DT_RowClass.split(" ");

				e.__rowc = e.__rowc ? b(e.__rowc.concat(o)) : o, U(n).removeClass(e.__rowc.join(" ")).addClass(a.DT_RowClass)

			}

			a.DT_RowAttr && U(n).attr(a.DT_RowAttr), a.DT_RowData && U(n).data(a.DT_RowData)

		}

	}



	function ot(t) {

		var e, n, a, r, o, i = t.nTHead,

			l = t.nTFoot,

			s = 0 === U("th, td", i).length,

			u = t.oClasses,

			c = t.aoColumns;

		for (s && (r = U("<tr/>").appendTo(i)), e = 0, n = c.length; e < n; e++) o = c[e], a = U(o.nTh).addClass(o.sClass),

			s && a.appendTo(r), t.oFeatures.bSort && (a.addClass(o.sSortingClass), !1 !== o.bSortable && (a.attr("tabindex", t.iTabIndex)

				.attr("aria-controls", t.sTableId), te(t, o.nTh, e))), o.sTitle != a[0].innerHTML && a.html(o.sTitle), he(t,

				"header")(t, a, o, u);

		if (s && ct(t.aoHeader, i), U(i).find(">tr").attr("role", "row"), U(i).find(">tr>th, >tr>td").addClass(u.sHeaderTH),

			U(l).find(">tr>th, >tr>td").addClass(u.sFooterTH), null !== l) {

			var f = t.aoFooter[0];

			for (e = 0, n = f.length; e < n; e++)(o = c[e]).nTf = f[e].cell, o.sClass && U(o.nTf).addClass(o.sClass)

		}

	}



	function it(t, e, n) {

		var a, r, o, i, l, s, u, c, f, d = [],

			h = [],

			p = t.aoColumns.length;

		if (e) {

			for (n === V && (n = !1), a = 0, r = e.length; a < r; a++) {

				for (d[a] = e[a].slice(), d[a].nTr = e[a].nTr, o = p - 1; 0 <= o; o--) t.aoColumns[o].bVisible || n || d[a].splice(

					o, 1);

				h.push([])

			}

			for (a = 0, r = d.length; a < r; a++) {

				if (u = d[a].nTr)

					for (; s = u.firstChild;) u.removeChild(s);

				for (o = 0, i = d[a].length; o < i; o++)

					if (f = c = 1, h[a][o] === V) {

						for (u.appendChild(d[a][o].cell), h[a][o] = 1; d[a + c] !== V && d[a][o].cell == d[a + c][o].cell;) h[a + c][o] =

							1, c++;

						for (; d[a][o + f] !== V && d[a][o].cell == d[a][o + f].cell;) {

							for (l = 0; l < c; l++) h[a + l][o + f] = 1;

							f++

						}

						U(d[a][o].cell).attr("rowspan", c).attr("colspan", f)

					}

			}

		}

	}



	function lt(t) {

		var e = fe(t, "aoPreDrawCallback", "preDraw", [t]);

		if (-1 === U.inArray(!1, e)) {

			var n = [],

				a = 0,

				r = t.asStripeClasses,

				o = r.length,

				i = (t.aoOpenRows.length, t.oLanguage),

				l = t.iInitDisplayStart,

				s = "ssp" == pe(t),

				u = t.aiDisplay;

			t.bDrawing = !0, l !== V && -1 !== l && (t._iDisplayStart = s ? l : l >= t.fnRecordsDisplay() ? 0 : l, t.iInitDisplayStart = -

				1);

			var c = t._iDisplayStart,

				f = t.fnDisplayEnd();

			if (t.bDeferLoading) t.bDeferLoading = !1, t.iDraw++, Wt(t, !1);

			else if (s) {

				if (!t.bDestroying && !ht(t)) return

			} else t.iDraw++;

			if (0 !== u.length)

				for (var d = s ? 0 : c, h = s ? t.aoData.length : f, p = d; p < h; p++) {

					var g = u[p],

						b = t.aoData[g];

					null === b.nTr && at(t, g);

					var v = b.nTr;

					if (0 !== o) {

						var S = r[a % o];

						b._sRowStripe != S && (U(v).removeClass(b._sRowStripe).addClass(S), b._sRowStripe = S)

					}

					fe(t, "aoRowCallback", null, [v, b._aData, a, p, g]), n.push(v), a++

				} else {

					var m = i.sZeroRecords;

					1 == t.iDraw && "ajax" == pe(t) ? m = i.sLoadingRecords : i.sEmptyTable && 0 === t.fnRecordsTotal() && (m = i.sEmptyTable),

						n[0] = U("<tr/>", {

							class: o ? r[0] : ""

						}).append(U("<td />", {

							valign: "top",

							colSpan: O(t),

							class: t.oClasses.sRowEmpty

						}).html(m))[0]

				}

			fe(t, "aoHeaderCallback", "header", [U(t.nTHead).children("tr")[0], K(t), c, f, u]), fe(t, "aoFooterCallback",

				"footer", [U(t.nTFoot).children("tr")[0], K(t), c, f, u]);

			var D = U(t.nTBody);

			D.children().detach(), D.append(U(n)), fe(t, "aoDrawCallback", "draw", [t]), t.bSorted = !1, t.bFiltered = !1, t.bDrawing = !

				1

		} else Wt(t, !1)

	}



	function st(t, e) {

		var n = t.oFeatures,

			a = n.bSort,

			r = n.bFilter;

		a && Zt(t), r ? St(t, t.oPreviousSearch) : t.aiDisplay = t.aiDisplayMaster.slice(), !0 !== e && (t._iDisplayStart =

			0), t._drawHold = e, lt(t), t._drawHold = !1

	}



	function ut(t) {

		var e = t.oClasses,

			n = U(t.nTable),

			a = U("<div/>").insertBefore(n),

			r = t.oFeatures,

			o = U("<div/>", {

				id: t.sTableId + "_wrapper",

				class: e.sWrapper + (t.nTFoot ? "" : " " + e.sNoFooter)

			});

		t.nHolding = a[0], t.nTableWrapper = o[0], t.nTableReinsertBefore = t.nTable.nextSibling;

		for (var i, l, s, u, c, f, d = t.sDom.split(""), h = 0; h < d.length; h++) {

			if (i = null, "<" == (l = d[h])) {

				if (s = U("<div/>")[0], "'" == (u = d[h + 1]) || '"' == u) {

					for (c = "", f = 2; d[h + f] != u;) c += d[h + f], f++;

					if ("H" == c ? c = e.sJUIHeader : "F" == c && (c = e.sJUIFooter), -1 != c.indexOf(".")) {

						var p = c.split(".");

						s.id = p[0].substr(1, p[0].length - 1), s.className = p[1]

					} else "#" == c.charAt(0) ? s.id = c.substr(1, c.length - 1) : s.className = c;

					h += f

				}

				o.append(s), o = U(s)

			} else if (">" == l) o = o.parent();

			else if ("l" == l && r.bPaginate && r.bLengthChange) i = Ht(t);

			else if ("f" == l && r.bFilter) i = vt(t);

			else if ("r" == l && r.bProcessing) i = Mt(t);

			else if ("t" == l) i = Et(t);

			else if ("i" == l && r.bInfo) i = Ft(t);

			else if ("p" == l && r.bPaginate) i = Ot(t);

			else if (0 !== I.ext.feature.length)

				for (var g = I.ext.feature, b = 0, v = g.length; b < v; b++)

					if (l == g[b].cFeature) {

						i = g[b].fnInit(t);

						break

					} if (i) {

				var S = t.aanFeatures;

				S[l] || (S[l] = []), S[l].push(i), o.append(i)

			}

		}

		a.replaceWith(o), t.nHolding = null

	}



	function ct(t, e) {

		var n, a, r, o, i, l, s, u, c, f, d = U(e).children("tr"),

			h = function(t, e, n) {

				for (var a = t[e]; a[n];) n++;

				return n

			};

		for (t.splice(0, t.length), r = 0, l = d.length; r < l; r++) t.push([]);

		for (r = 0, l = d.length; r < l; r++)

			for (0, a = (n = d[r]).firstChild; a;) {

				if ("TD" == a.nodeName.toUpperCase() || "TH" == a.nodeName.toUpperCase())

					for (u = (u = 1 * a.getAttribute("colspan")) && 0 !== u && 1 !== u ? u : 1, c = (c = 1 * a.getAttribute("rowspan")) &&

						0 !== c && 1 !== c ? c : 1, s = h(t, r, 0), f = 1 === u, i = 0; i < u; i++)

						for (o = 0; o < c; o++) t[r + o][s + i] = {

							cell: a,

							unique: f

						}, t[r + o].nTr = n;

				a = a.nextSibling

			}

	}



	function ft(t, e, n) {

		var a = [];

		n || (n = t.aoHeader, e && ct(n = [], e));

		for (var r = 0, o = n.length; r < o; r++)

			for (var i = 0, l = n[r].length; i < l; i++) !n[r][i].unique || a[i] && t.bSortCellsTop || (a[i] = n[r][i].cell);

		return a

	}



	function dt(r, t, e) {

		if (fe(r, "aoServerParams", "serverParams", [t]), t && U.isArray(t)) {

			var o = {},

				i = /(.*?)\[\]$/;

			U.each(t, function(t, e) {

				var n = e.name.match(i);

				if (n) {

					var a = n[0];

					o[a] || (o[a] = []), o[a].push(e.value)

				} else o[e.name] = e.value

			}), t = o

		}

		var n, a = r.ajax,

			l = r.oInstance,

			s = function(t) {

				fe(r, null, "xhr", [r, t, r.jqXHR]), e(t)

			};

		if (U.isPlainObject(a) && a.data) {

			var u = "function" == typeof(n = a.data) ? n(t, r) : n;

			t = "function" == typeof n && u ? u : U.extend(!0, t, u), delete a.data

		}

		var c = {

			data: t,

			success: function(t) {

				var e = t.error || t.sError;

				e && ie(r, 0, e), r.json = t, s(t)

			},

			dataType: "json",

			cache: !1,

			type: r.sServerMethod,

			error: function(t, e, n) {

				var a = fe(r, null, "xhr", [r, null, r.jqXHR]); - 1 === U.inArray(!0, a) && ("parsererror" == e ? ie(r, 0,

					"Invalid JSON response", 1) : 4 === t.readyState && ie(r, 0, "Ajax error", 7)), Wt(r, !1)

			}

		};

		r.oAjaxData = t, fe(r, null, "preXhr", [r, t]), r.fnServerData ? r.fnServerData.call(l, r.sAjaxSource, U.map(t,

			function(t, e) {

				return {

					name: e,

					value: t

				}

			}), s, r) : r.sAjaxSource || "string" == typeof a ? r.jqXHR = U.ajax(U.extend(c, {

			url: a || r.sAjaxSource

		})) : "function" == typeof a ? r.jqXHR = a.call(l, t, s, r) : (r.jqXHR = U.ajax(U.extend(c, a)), a.data = n)

	}



	function ht(e) {

		return !e.bAjaxDataGet || (e.iDraw++, Wt(e, !0), dt(e, pt(e), function(t) {

			gt(e, t)

		}), !1)

	}



	function pt(t) {

		var e, n, a, r, o = t.aoColumns,

			i = o.length,

			l = t.oFeatures,

			s = t.oPreviousSearch,

			u = t.aoPreSearchCols,

			c = [],

			f = Yt(t),

			d = t._iDisplayStart,

			h = !1 !== l.bPaginate ? t._iDisplayLength : -1,

			p = function(t, e) {

				c.push({

					name: t,

					value: e

				})

			};

		p("sEcho", t.iDraw), p("iColumns", i), p("sColumns", X(o, "sName").join(",")), p("iDisplayStart", d), p(

			"iDisplayLength", h);

		var g = {

			draw: t.iDraw,

			columns: [],

			order: [],

			start: d,

			length: h,

			search: {

				value: s.sSearch,

				regex: s.bRegex

			}

		};

		for (e = 0; e < i; e++) a = o[e], r = u[e], n = "function" == typeof a.mData ? "function" : a.mData, g.columns.push({

			data: n,

			name: a.sName,

			searchable: a.bSearchable,

			orderable: a.bSortable,

			search: {

				value: r.sSearch,

				regex: r.bRegex

			}

		}), p("mDataProp_" + e, n), l.bFilter && (p("sSearch_" + e, r.sSearch), p("bRegex_" + e, r.bRegex), p(

			"bSearchable_" + e, a.bSearchable)), l.bSort && p("bSortable_" + e, a.bSortable);

		l.bFilter && (p("sSearch", s.sSearch), p("bRegex", s.bRegex)), l.bSort && (U.each(f, function(t, e) {

			g.order.push({

				column: e.col,

				dir: e.dir

			}), p("iSortCol_" + t, e.col), p("sSortDir_" + t, e.dir)

		}), p("iSortingCols", f.length));

		var b = I.ext.legacy.ajax;

		return null === b ? t.sAjaxSource ? c : g : b ? c : g

	}



	function gt(t, n) {

		var e = function(t, e) {

				return n[t] !== V ? n[t] : n[e]

			},

			a = bt(t, n),

			r = e("sEcho", "draw"),

			o = e("iTotalRecords", "recordsTotal"),

			i = e("iTotalDisplayRecords", "recordsFiltered");

		if (r) {

			if (1 * r < t.iDraw) return;

			t.iDraw = 1 * r

		}

		Q(t), t._iRecordsTotal = parseInt(o, 10), t._iRecordsDisplay = parseInt(i, 10);

		for (var l = 0, s = a.length; l < s; l++) W(t, a[l]);

		t.aiDisplay = t.aiDisplayMaster.slice(), t.bAjaxDataGet = !1, lt(t), t._bInitComplete || jt(t, n), t.bAjaxDataGet = !

			0, Wt(t, !1)

	}



	function bt(t, e) {

		var n = U.isPlainObject(t.ajax) && t.ajax.dataSrc !== V ? t.ajax.dataSrc : t.sAjaxDataProp;

		return "data" === n ? e.aaData || e[n] : "" !== n ? Y(n)(e) : e

	}



	function vt(n) {

		var t = n.oClasses,

			e = n.sTableId,

			a = n.oLanguage,

			r = n.oPreviousSearch,

			o = n.aanFeatures,

			i = '<input type="search" class="' + t.sFilterInput + '"/>',

			l = a.sSearch;

		l = l.match(/_INPUT_/) ? l.replace("_INPUT_", i) : l + i;

		var s = U("<div/>", {

				id: o.f ? null : e + "_filter",

				class: t.sFilter

			}).append(U("<label/>").append(l)),

			u = function() {

				o.f;

				var t = this.value ? this.value : "";

				t != r.sSearch && (St(n, {

					sSearch: t,

					bRegex: r.bRegex,

					bSmart: r.bSmart,

					bCaseInsensitive: r.bCaseInsensitive

				}), n._iDisplayStart = 0, lt(n))

			},

			c = null !== n.searchDelay ? n.searchDelay : "ssp" === pe(n) ? 400 : 0,

			f = U("input", s).val(r.sSearch).attr("placeholder", a.sSearchPlaceholder).on(

				"keyup.DT search.DT input.DT paste.DT cut.DT", c ? Jt(u, c) : u).on("keypress.DT", function(t) {

				if (13 == t.keyCode) return !1

			}).attr("aria-controls", e);

		return U(n.nTable).on("search.dt.DT", function(t, e) {

			if (n === e) try {

				f[0] !== S.activeElement && f.val(r.sSearch)

			} catch (t) {}

		}), s[0]

	}



	function St(t, e, n) {

		var a = t.oPreviousSearch,

			r = t.aoPreSearchCols,

			o = function(t) {

				a.sSearch = t.sSearch, a.bRegex = t.bRegex, a.bSmart = t.bSmart, a.bCaseInsensitive = t.bCaseInsensitive

			},

			i = function(t) {

				return t.bEscapeRegex !== V ? !t.bEscapeRegex : t.bRegex

			};

		if (w(t), "ssp" != pe(t)) {

			yt(t, e.sSearch, n, i(e), e.bSmart, e.bCaseInsensitive), o(e);

			for (var l = 0; l < r.length; l++) Dt(t, r[l].sSearch, l, i(r[l]), r[l].bSmart, r[l].bCaseInsensitive);

			mt(t)

		} else o(e);

		t.bFiltered = !0, fe(t, null, "search", [t])

	}



	function mt(t) {

		for (var e, n, a = I.ext.search, r = t.aiDisplay, o = 0, i = a.length; o < i; o++) {

			for (var l = [], s = 0, u = r.length; s < u; s++) n = r[s], e = t.aoData[n], a[o](t, e._aFilterData, n, e._aData, s) &&

				l.push(n);

			r.length = 0, U.merge(r, l)

		}

	}



	function Dt(t, e, n, a, r, o) {

		if ("" !== e) {

			for (var i, l = [], s = t.aiDisplay, u = _t(e, a, r, o), c = 0; c < s.length; c++) i = t.aoData[s[c]]._aFilterData[

				n], u.test(i) && l.push(s[c]);

			t.aiDisplay = l

		}

	}



	function yt(t, e, n, a, r, o) {

		var i, l, s, u = _t(e, a, r, o),

			c = t.oPreviousSearch.sSearch,

			f = t.aiDisplayMaster,

			d = [];

		if (0 !== I.ext.search.length && (n = !0), l = xt(t), e.length <= 0) t.aiDisplay = f.slice();

		else {

			for ((l || n || c.length > e.length || 0 !== e.indexOf(c) || t.bSorted) && (t.aiDisplay = f.slice()), i = t.aiDisplay,

				s = 0; s < i.length; s++) u.test(t.aoData[i[s]]._sFilterRow) && d.push(i[s]);

			t.aiDisplay = d

		}

	}



	function _t(t, e, n, a) {

		(t = e ? t : Ct(t), n) && (t = "^(?=.*?" + U.map(t.match(/"[^"]+"|[^ ]+/g) || [""], function(t) {

			if ('"' === t.charAt(0)) {

				var e = t.match(/^"(.*)"$/);

				t = e ? e[1] : t

			}

			return t.replace('"', "")

		}).join(")(?=.*?") + ").*$");

		return new RegExp(t, a ? "i" : "")

	}

	var Ct = I.util.escapeRegex,

		Tt = U("<div>")[0],

		wt = Tt.textContent !== V;



	function xt(t) {

		var e, n, a, r, o, i, l, s, u = t.aoColumns,

			c = I.ext.type.search,

			f = !1;

		for (n = 0, r = t.aoData.length; n < r; n++)

			if (!(s = t.aoData[n])._aFilterData) {

				for (i = [], a = 0, o = u.length; a < o; a++)(e = u[a]).bSearchable ? (l = x(t, n, a, "filter"), c[e.sType] && (l =

						c[e.sType](l)), null === l && (l = ""), "string" != typeof l && l.toString && (l = l.toString())) : l = "", l.indexOf &&

					-1 !== l.indexOf("&") && (Tt.innerHTML = l, l = wt ? Tt.textContent : Tt.innerText), l.replace && (l = l.replace(

						/[\r\n]/g, "")), i.push(l);

				s._aFilterData = i, s._sFilterRow = i.join("  "), f = !0

			} return f

	}



	function It(t) {

		return {

			search: t.sSearch,

			smart: t.bSmart,

			regex: t.bRegex,

			caseInsensitive: t.bCaseInsensitive

		}

	}



	function At(t) {

		return {

			sSearch: t.search,

			bSmart: t.smart,

			bRegex: t.regex,

			bCaseInsensitive: t.caseInsensitive

		}

	}



	function Ft(t) {

		var e = t.sTableId,

			n = t.aanFeatures.i,

			a = U("<div/>", {

				class: t.oClasses.sInfo,

				id: n ? null : e + "_info"

			});

		return n || (t.aoDrawCallback.push({

			fn: Lt,

			sName: "information"

		}), a.attr("role", "status").attr("aria-live", "polite"), U(t.nTable).attr("aria-describedby", e + "_info")), a[0]

	}



	function Lt(t) {

		var e = t.aanFeatures.i;

		if (0 !== e.length) {

			var n = t.oLanguage,

				a = t._iDisplayStart + 1,

				r = t.fnDisplayEnd(),

				o = t.fnRecordsTotal(),

				i = t.fnRecordsDisplay(),

				l = i ? n.sInfo : n.sInfoEmpty;

			i !== o && (l += " " + n.sInfoFiltered), l = Rt(t, l += n.sInfoPostFix);

			var s = n.fnInfoCallback;

			null !== s && (l = s.call(t.oInstance, t, a, r, o, i, l)), U(e).html(l)

		}

	}



	function Rt(t, e) {

		var n = t.fnFormatNumber,

			a = t._iDisplayStart + 1,

			r = t._iDisplayLength,

			o = t.fnRecordsDisplay(),

			i = -1 === r;

		return e.replace(/_START_/g, n.call(t, a)).replace(/_END_/g, n.call(t, t.fnDisplayEnd())).replace(/_MAX_/g, n.call(t,

			t.fnRecordsTotal())).replace(/_TOTAL_/g, n.call(t, o)).replace(/_PAGE_/g, n.call(t, i ? 1 : Math.ceil(a / r))).replace(

			/_PAGES_/g, n.call(t, i ? 1 : Math.ceil(o / r)))

	}



	function Pt(n) {

		var a, t, e, r = n.iInitDisplayStart,

			o = n.aoColumns,

			i = n.oFeatures,

			l = n.bDeferLoading;

		if (n.bInitialised) {

			for (ut(n), ot(n), it(n, n.aoHeader), it(n, n.aoFooter), Wt(n, !0), i.bAutoWidth && Xt(n), a = 0, t = o.length; a <

				t; a++)(e = o[a]).sWidth && (e.nTh.style.width = zt(e.sWidth));

			fe(n, null, "preInit", [n]), st(n);

			var s = pe(n);

			("ssp" != s || l) && ("ajax" == s ? dt(n, [], function(t) {

				var e = bt(n, t);

				for (a = 0; a < e.length; a++) W(n, e[a]);

				n.iInitDisplayStart = r, st(n), Wt(n, !1), jt(n, t)

			}) : (Wt(n, !1), jt(n)))

		} else setTimeout(function() {

			Pt(n)

		}, 200)

	}



	function jt(t, e) {

		t._bInitComplete = !0, (e || t.oInit.aaData) && J(t), fe(t, null, "plugin-init", [t, e]), fe(t, "aoInitComplete",

			"init", [t, e])

	}



	function Nt(t, e) {

		var n = parseInt(e, 10);

		t._iDisplayLength = n, de(t), fe(t, null, "length", [t, n])

	}



	function Ht(a) {

		for (var t = a.oClasses, e = a.sTableId, n = a.aLengthMenu, r = U.isArray(n[0]), o = r ? n[0] : n, i = r ? n[1] : n,

				l = U("<select/>", {

					name: e + "_length",

					"aria-controls": e,

					class: t.sLengthSelect

				}), s = 0, u = o.length; s < u; s++) l[0][s] = new Option("number" == typeof i[s] ? a.fnFormatNumber(i[s]) : i[s],

			o[s]);

		var c = U("<div><label/></div>").addClass(t.sLength);

		return a.aanFeatures.l || (c[0].id = e + "_length"), c.children().append(a.oLanguage.sLengthMenu.replace("_MENU_", l[

			0].outerHTML)), U("select", c).val(a._iDisplayLength).on("change.DT", function(t) {

			Nt(a, U(this).val()), lt(a)

		}), U(a.nTable).on("length.dt.DT", function(t, e, n) {

			a === e && U("select", c).val(n)

		}), c[0]

	}



	function Ot(t) {

		var e = t.sPaginationType,

			c = I.ext.pager[e],

			f = "function" == typeof c,

			d = function(t) {

				lt(t)

			},

			n = U("<div/>").addClass(t.oClasses.sPaging + e)[0],

			h = t.aanFeatures;

		return f || c.fnInit(t, n, d), h.p || (n.id = t.sTableId + "_paginate", t.aoDrawCallback.push({

			fn: function(t) {

				if (f) {

					var e, n, a = t._iDisplayStart,

						r = t._iDisplayLength,

						o = t.fnRecordsDisplay(),

						i = -1 === r,

						l = i ? 0 : Math.ceil(a / r),

						s = i ? 1 : Math.ceil(o / r),

						u = c(l, s);

					for (e = 0, n = h.p.length; e < n; e++) he(t, "pageButton")(t, h.p[e], e, u, l, s)

				} else c.fnUpdate(t, d)

			},

			sName: "pagination"

		})), n

	}



	function kt(t, e, n) {

		var a = t._iDisplayStart,

			r = t._iDisplayLength,

			o = t.fnRecordsDisplay();

		0 === o || -1 === r ? a = 0 : "number" == typeof e ? o < (a = e * r) && (a = 0) : "first" == e ? a = 0 : "previous" ==

			e ? (a = 0 <= r ? a - r : 0) < 0 && (a = 0) : "next" == e ? a + r < o && (a += r) : "last" == e ? a = Math.floor((o -

				1) / r) * r : ie(t, 0, "Unknown paging action: " + e, 5);

		var i = t._iDisplayStart !== a;

		return t._iDisplayStart = a, i && (fe(t, null, "page", [t]), n && lt(t)), i

	}



	function Mt(t) {

		return U("<div/>", {

			id: t.aanFeatures.r ? null : t.sTableId + "_processing",

			class: t.oClasses.sProcessing

		}).html(t.oLanguage.sProcessing).insertBefore(t.nTable)[0]

	}



	function Wt(t, e) {

		t.oFeatures.bProcessing && U(t.aanFeatures.r).css("display", e ? "block" : "none"), fe(t, null, "processing", [t, e])

	}



	function Et(t) {

		var e = U(t.nTable);

		e.attr("role", "grid");

		var n = t.oScroll;

		if ("" === n.sX && "" === n.sY) return t.nTable;

		var a = n.sX,

			r = n.sY,

			o = t.oClasses,

			i = e.children("caption"),

			l = i.length ? i[0]._captionSide : null,

			s = U(e[0].cloneNode(!1)),

			u = U(e[0].cloneNode(!1)),

			c = e.children("tfoot"),

			f = "<div/>",

			d = function(t) {

				return t ? zt(t) : null

			};

		c.length || (c = null);

		var h = U(f, {

			class: o.sScrollWrapper

		}).append(U(f, {

			class: o.sScrollHead

		}).css({

			overflow: "hidden",

			position: "relative",

			border: 0,

			width: a ? d(a) : "100%"

		}).append(U(f, {

			class: o.sScrollHeadInner

		}).css({

			"box-sizing": "content-box",

			width: n.sXInner || "100%"

		}).append(s.removeAttr("id").css("margin-left", 0).append("top" === l ? i : null).append(e.children("thead"))))).append(

			U(f, {

				class: o.sScrollBody

			}).css({

				position: "relative",

				overflow: "auto",

				width: d(a)

			}).append(e));

		c && h.append(U(f, {

			class: o.sScrollFoot

		}).css({

			overflow: "hidden",

			border: 0,

			width: a ? d(a) : "100%"

		}).append(U(f, {

			class: o.sScrollFootInner

		}).append(u.removeAttr("id").css("margin-left", 0).append("bottom" === l ? i : null).append(e.children("tfoot")))));

		var p = h.children(),

			g = p[0],

			b = p[1],

			v = c ? p[2] : null;

		return a && U(b).on("scroll.DT", function(t) {

				var e = this.scrollLeft;

				g.scrollLeft = e, c && (v.scrollLeft = e)

			}), U(b).css(r && n.bCollapse ? "max-height" : "height", r), t.nScrollHead = g, t.nScrollBody = b, t.nScrollFoot =

			v, t.aoDrawCallback.push({

				fn: Bt,

				sName: "scrolling"

			}), h[0]

	}



	function Bt(n) {

		var t, e, a, r, o, i, l, s, u, c = n.oScroll,

			f = c.sX,

			d = c.sXInner,

			h = c.sY,

			p = c.iBarWidth,

			g = U(n.nScrollHead),

			b = g[0].style,

			v = g.children("div"),

			S = v[0].style,

			m = v.children("table"),

			D = n.nScrollBody,

			y = U(D),

			_ = D.style,

			C = U(n.nScrollFoot).children("div"),

			T = C.children("table"),

			w = U(n.nTHead),

			x = U(n.nTable),

			I = x[0],

			A = I.style,

			F = n.nTFoot ? U(n.nTFoot) : null,

			L = n.oBrowser,

			R = L.bScrollOversize,

			P = X(n.aoColumns, "nTh"),

			j = [],

			N = [],

			H = [],

			O = [],

			k = function(t) {

				var e = t.style;

				e.paddingTop = "0", e.paddingBottom = "0", e.borderTopWidth = "0", e.borderBottomWidth = "0", e.height = 0

			},

			M = D.scrollHeight > D.clientHeight;

		if (n.scrollBarVis !== M && n.scrollBarVis !== V) return n.scrollBarVis = M, void J(n);

		n.scrollBarVis = M, x.children("thead, tfoot").remove(), F && (i = F.clone().prependTo(x), e = F.find("tr"), r = i.find(

				"tr")), o = w.clone().prependTo(x), t = w.find("tr"), a = o.find("tr"), o.find("th, td").removeAttr("tabindex"), f ||

			(_.width = "100%", g[0].style.width = "100%"), U.each(ft(n, o), function(t, e) {

				l = q(n, t), e.style.width = n.aoColumns[l].sWidth

			}), F && Ut(function(t) {

				t.style.width = ""

			}, r), u = x.outerWidth(), "" === f ? (A.width = "100%", R && (x.find("tbody").height() > D.offsetHeight ||

				"scroll" == y.css("overflow-y")) && (A.width = zt(x.outerWidth() - p)), u = x.outerWidth()) : "" !== d && (A.width =

				zt(d), u = x.outerWidth()), Ut(k, a), Ut(function(t) {

				H.push(t.innerHTML), j.push(zt(U(t).css("width")))

			}, a), Ut(function(t, e) {

				-1 !== U.inArray(t, P) && (t.style.width = j[e])

			}, t), U(a).height(0), F && (Ut(k, r), Ut(function(t) {

				O.push(t.innerHTML), N.push(zt(U(t).css("width")))

			}, r), Ut(function(t, e) {

				t.style.width = N[e]

			}, e), U(r).height(0)), Ut(function(t, e) {

				t.innerHTML = '<div class="dataTables_sizing">' + H[e] + "</div>", t.childNodes[0].style.height = "0", t.childNodes[

					0].style.overflow = "hidden", t.style.width = j[e]

			}, a), F && Ut(function(t, e) {

				t.innerHTML = '<div class="dataTables_sizing">' + O[e] + "</div>", t.childNodes[0].style.height = "0", t.childNodes[

					0].style.overflow = "hidden", t.style.width = N[e]

			}, r), x.outerWidth() < u ? (s = D.scrollHeight > D.offsetHeight || "scroll" == y.css("overflow-y") ? u + p : u, R &&

				(D.scrollHeight > D.offsetHeight || "scroll" == y.css("overflow-y")) && (A.width = zt(s - p)), "" !== f && "" ===

				d || ie(n, 1, "Possible column misalignment", 6)) : s = "100%", _.width = zt(s), b.width = zt(s), F && (n.nScrollFoot

				.style.width = zt(s)), h || R && (_.height = zt(I.offsetHeight + p));

		var W = x.outerWidth();

		m[0].style.width = zt(W), S.width = zt(W);

		var E = x.height() > D.clientHeight || "scroll" == y.css("overflow-y"),

			B = "padding" + (L.bScrollbarLeft ? "Left" : "Right");

		S[B] = E ? p + "px" : "0px", F && (T[0].style.width = zt(W), C[0].style.width = zt(W), C[0].style[B] = E ? p + "px" :

				"0px"), x.children("colgroup").insertBefore(x.children("thead")), y.scroll(), !n.bSorted && !n.bFiltered || n._drawHold ||

			(D.scrollTop = 0)

	}



	function Ut(t, e, n) {

		for (var a, r, o = 0, i = 0, l = e.length; i < l;) {

			for (a = e[i].firstChild, r = n ? n[i].firstChild : null; a;) 1 === a.nodeType && (n ? t(a, r, o) : t(a, o), o++),

				a = a.nextSibling, r = n ? r.nextSibling : null;

			i++

		}

	}

	var Vt = /<.*?>/g;



	function Xt(t) {

		var e, n, a, r = t.nTable,

			o = t.aoColumns,

			i = t.oScroll,

			l = i.sY,

			s = i.sX,

			u = i.sXInner,

			c = o.length,

			f = k(t, "bVisible"),

			d = U("th", t.nTHead),

			h = r.getAttribute("width"),

			p = r.parentNode,

			g = !1,

			b = t.oBrowser,

			v = b.bScrollOversize,

			S = r.style.width;

		for (S && -1 !== S.indexOf("%") && (h = S), e = 0; e < f.length; e++) null !== (n = o[f[e]]).sWidth && (n.sWidth =

			qt(n.sWidthOrig, p), g = !0);

		if (v || !g && !s && !l && c == O(t) && c == d.length)

			for (e = 0; e < c; e++) {

				var m = q(t, e);

				null !== m && (o[m].sWidth = zt(d.eq(e).width()))

			} else {

				var D = U(r).clone().css("visibility", "hidden").removeAttr("id");

				D.find("tbody tr").remove();

				var y = U("<tr/>").appendTo(D.find("tbody"));

				for (D.find("thead, tfoot").remove(), D.append(U(t.nTHead).clone()).append(U(t.nTFoot).clone()), D.find(

						"tfoot th, tfoot td").css("width", ""), d = ft(t, D.find("thead")[0]), e = 0; e < f.length; e++) n = o[f[e]], d[

					e].style.width = null !== n.sWidthOrig && "" !== n.sWidthOrig ? zt(n.sWidthOrig) : "", n.sWidthOrig && s && U(d[

					e]).append(U("<div/>").css({

					width: n.sWidthOrig,

					margin: 0,

					padding: 0,

					border: 0,

					height: 1

				}));

				if (t.aoData.length)

					for (e = 0; e < f.length; e++) n = o[a = f[e]], U(Gt(t, a)).clone(!1).append(n.sContentPadding).appendTo(y);

				U("[name]", D).removeAttr("name");

				var _ = U("<div/>").css(s || l ? {

					position: "absolute",

					top: 0,

					left: 0,

					height: 1,

					right: 0,

					overflow: "hidden"

				} : {}).append(D).appendTo(p);

				s && u ? D.width(u) : s ? (D.css("width", "auto"), D.removeAttr("width"), D.width() < p.clientWidth && h && D.width(

					p.clientWidth)) : l ? D.width(p.clientWidth) : h && D.width(h);

				var C = 0;

				for (e = 0; e < f.length; e++) {

					var T = U(d[e]),

						w = T.outerWidth() - T.width(),

						x = b.bBounding ? Math.ceil(d[e].getBoundingClientRect().width) : T.outerWidth();

					C += x, o[f[e]].sWidth = zt(x - w)

				}

				r.style.width = zt(C), _.remove()

			}

		if (h && (r.style.width = zt(h)), (h || s) && !t._reszEvt) {

			var I = function() {

				U(A).on("resize.DT-" + t.sInstance, Jt(function() {

					J(t)

				}))

			};

			v ? setTimeout(I, 1e3) : I(), t._reszEvt = !0

		}

	}

	var Jt = I.util.throttle;



	function qt(t, e) {

		if (!t) return 0;

		var n = U("<div/>").css("width", zt(t)).appendTo(e || S.body),

			a = n[0].offsetWidth;

		return n.remove(), a

	}



	function Gt(t, e) {

		var n = $t(t, e);

		if (n < 0) return null;

		var a = t.aoData[n];

		return a.nTr ? a.anCells[e] : U("<td/>").html(x(t, n, e, "display"))[0]

	}



	function $t(t, e) {

		for (var n, a = -1, r = -1, o = 0, i = t.aoData.length; o < i; o++)(n = (n = (n = x(t, o, e, "display") + "").replace(

			Vt, "")).replace(/&nbsp;/g, " ")).length > a && (a = n.length, r = o);

		return r

	}



	function zt(t) {

		return null === t ? "0px" : "number" == typeof t ? t < 0 ? "0px" : t + "px" : t.match(/\d$/) ? t + "px" : t

	}



	function Yt(t) {

		var e, n, a, r, o, i, l, s = [],

			u = t.aoColumns,

			c = t.aaSortingFixed,

			f = U.isPlainObject(c),

			d = [],

			h = function(t) {

				t.length && !U.isArray(t[0]) ? d.push(t) : U.merge(d, t)

			};

		for (U.isArray(c) && h(c), f && c.pre && h(c.pre), h(t.aaSorting), f && c.post && h(c.post), e = 0; e < d.length; e++)

			for (n = 0, a = (r = u[l = d[e][0]].aDataSort).length; n < a; n++) i = u[o = r[n]].sType || "string", d[e]._idx ===

				V && (d[e]._idx = U.inArray(d[e][1], u[o].asSorting)), s.push({

					src: l,

					col: o,

					dir: d[e][1],

					index: d[e]._idx,

					type: i,

					formatter: I.ext.type.order[i + "-pre"]

				});

		return s

	}



	function Zt(t) {

		var e, n, a, r, c, f = [],

			d = I.ext.type.order,

			h = t.aoData,

			o = (t.aoColumns, 0),

			i = t.aiDisplayMaster;

		for (w(t), e = 0, n = (c = Yt(t)).length; e < n; e++)(r = c[e]).formatter && o++, ne(t, r.col);

		if ("ssp" != pe(t) && 0 !== c.length) {

			for (e = 0, a = i.length; e < a; e++) f[i[e]] = e;

			o === c.length ? i.sort(function(t, e) {

				var n, a, r, o, i, l = c.length,

					s = h[t]._aSortData,

					u = h[e]._aSortData;

				for (r = 0; r < l; r++)

					if (0 !== (o = (n = s[(i = c[r]).col]) < (a = u[i.col]) ? -1 : a < n ? 1 : 0)) return "asc" === i.dir ? o : -o;

				return (n = f[t]) < (a = f[e]) ? -1 : a < n ? 1 : 0

			}) : i.sort(function(t, e) {

				var n, a, r, o, i, l = c.length,

					s = h[t]._aSortData,

					u = h[e]._aSortData;

				for (r = 0; r < l; r++)

					if (n = s[(i = c[r]).col], a = u[i.col], 0 !== (o = (d[i.type + "-" + i.dir] || d["string-" + i.dir])(n, a)))

						return o;

				return (n = f[t]) < (a = f[e]) ? -1 : a < n ? 1 : 0

			})

		}

		t.bSorted = !0

	}



	function Kt(t) {

		for (var e, n, a = t.aoColumns, r = Yt(t), o = t.oLanguage.oAria, i = 0, l = a.length; i < l; i++) {

			var s = a[i],

				u = s.asSorting,

				c = s.sTitle.replace(/<.*?>/g, ""),

				f = s.nTh;

			f.removeAttribute("aria-sort"), s.bSortable ? (0 < r.length && r[0].col == i ? (f.setAttribute("aria-sort", "asc" ==

				r[0].dir ? "ascending" : "descending"), n = u[r[0].index + 1] || u[0]) : n = u[0], e = c + ("asc" === n ? o.sSortAscending :

				o.sSortDescending)) : e = c, f.setAttribute("aria-label", e)

		}

	}



	function Qt(t, e, n, a) {

		var r, o = t.aoColumns[e],

			i = t.aaSorting,

			l = o.asSorting,

			s = function(t, e) {

				var n = t._idx;

				return n === V && (n = U.inArray(t[1], l)), n + 1 < l.length ? n + 1 : e ? null : 0

			};

		if ("number" == typeof i[0] && (i = t.aaSorting = [i]), n && t.oFeatures.bSortMulti) {

			var u = U.inArray(e, X(i, "0")); - 1 !== u ? (null === (r = s(i[u], !0)) && 1 === i.length && (r = 0), null === r ?

				i.splice(u, 1) : (i[u][1] = l[r], i[u]._idx = r)) : (i.push([e, l[0], 0]), i[i.length - 1]._idx = 0)

		} else i.length && i[0][0] == e ? (r = s(i[0]), i.length = 1, i[0][1] = l[r], i[0]._idx = r) : (i.length = 0, i.push(

			[e, l[0]]), i[0]._idx = 0);

		st(t), "function" == typeof a && a(t)

	}



	function te(e, t, n, a) {

		var r = e.aoColumns[n];

		ue(t, {}, function(t) {

			!1 !== r.bSortable && (e.oFeatures.bProcessing ? (Wt(e, !0), setTimeout(function() {

				Qt(e, n, t.shiftKey, a), "ssp" !== pe(e) && Wt(e, !1)

			}, 0)) : Qt(e, n, t.shiftKey, a))

		})

	}



	function ee(t) {

		var e, n, a, r = t.aLastSort,

			o = t.oClasses.sSortColumn,

			i = Yt(t),

			l = t.oFeatures;

		if (l.bSort && l.bSortClasses) {

			for (e = 0, n = r.length; e < n; e++) a = r[e].src, U(X(t.aoData, "anCells", a)).removeClass(o + (e < 2 ? e + 1 : 3));

			for (e = 0, n = i.length; e < n; e++) a = i[e].src, U(X(t.aoData, "anCells", a)).addClass(o + (e < 2 ? e + 1 : 3))

		}

		t.aLastSort = i

	}



	function ne(t, e) {

		var n, a, r, o = t.aoColumns[e],

			i = I.ext.order[o.sSortDataType];

		i && (n = i.call(t.oInstance, t, e, T(t, e)));

		for (var l = I.ext.type.order[o.sType + "-pre"], s = 0, u = t.aoData.length; s < u; s++)(a = t.aoData[s])._aSortData ||

			(a._aSortData = []), a._aSortData[e] && !i || (r = i ? n[s] : x(t, s, e, "sort"), a._aSortData[e] = l ? l(r) : r)

	}



	function ae(n) {

		if (n.oFeatures.bStateSave && !n.bDestroying) {

			var t = {

				time: +new Date,

				start: n._iDisplayStart,

				length: n._iDisplayLength,

				order: U.extend(!0, [], n.aaSorting),

				search: It(n.oPreviousSearch),

				columns: U.map(n.aoColumns, function(t, e) {

					return {

						visible: t.bVisible,

						search: It(n.aoPreSearchCols[e])

					}

				})

			};

			fe(n, "aoStateSaveParams", "stateSaveParams", [n, t]), n.oSavedState = t, n.fnStateSaveCallback.call(n.oInstance, n,

				t)

		}

	}



	function re(r, t, o) {

		var i, l, s = r.aoColumns,

			e = function(t) {

				if (t && t.time) {

					var e = fe(r, "aoStateLoadParams", "stateLoadParams", [r, t]);

					if (-1 === U.inArray(!1, e)) {

						var n = r.iStateDuration;

						if (0 < n && t.time < +new Date - 1e3 * n) o();

						else if (t.columns && s.length !== t.columns.length) o();

						else {

							if (r.oLoadedState = U.extend(!0, {}, t), t.start !== V && (r._iDisplayStart = t.start, r.iInitDisplayStart = t

									.start), t.length !== V && (r._iDisplayLength = t.length), t.order !== V && (r.aaSorting = [], U.each(t.order,

									function(t, e) {

										r.aaSorting.push(e[0] >= s.length ? [0, e[1]] : e)

									})), t.search !== V && U.extend(r.oPreviousSearch, At(t.search)), t.columns)

								for (i = 0, l = t.columns.length; i < l; i++) {

									var a = t.columns[i];

									a.visible !== V && (s[i].bVisible = a.visible), a.search !== V && U.extend(r.aoPreSearchCols[i], At(a.search))

								}

							fe(r, "aoStateLoaded", "stateLoaded", [r, t]), o()

						}

					} else o()

				} else o()

			};

		if (r.oFeatures.bStateSave) {

			var n = r.fnStateLoadCallback.call(r.oInstance, r, e);

			n !== V && e(n)

		} else o()

	}



	function oe(t) {

		var e = I.settings,

			n = U.inArray(t, X(e, "nTable"));

		return -1 !== n ? e[n] : null

	}



	function ie(t, e, n, a) {

		if (n = "DataTables warning: " + (t ? "table id=" + t.sTableId + " - " : "") + n, a && (n +=

				". For more information about this error, please see http://datatables.net/tn/" + a), e) A.console && console.log &&

			console.log(n);

		else {

			var r = I.ext,

				o = r.sErrMode || r.errMode;

			if (t && fe(t, null, "error", [t, a, n]), "alert" == o) alert(n);

			else {

				if ("throw" == o) throw new Error(n);

				"function" == typeof o && o(t, a, n)

			}

		}

	}



	function le(n, a, t, e) {

		U.isArray(t) ? U.each(t, function(t, e) {

			U.isArray(e) ? le(n, a, e[0], e[1]) : le(n, a, e)

		}) : (e === V && (e = t), a[t] !== V && (n[e] = a[t]))

	}



	function se(t, e, n) {

		var a;

		for (var r in e) e.hasOwnProperty(r) && (a = e[r], U.isPlainObject(a) ? (U.isPlainObject(t[r]) || (t[r] = {}), U.extend(

			!0, t[r], a)) : n && "data" !== r && "aaData" !== r && U.isArray(a) ? t[r] = a.slice() : t[r] = a);

		return t

	}



	function ue(e, t, n) {

		U(e).on("click.DT", t, function(t) {

			U(e).blur(), n(t)

		}).on("keypress.DT", t, function(t) {

			13 === t.which && (t.preventDefault(), n(t))

		}).on("selectstart.DT", function() {

			return !1

		})

	}



	function ce(t, e, n, a) {

		n && t[e].push({

			fn: n,

			sName: a

		})

	}



	function fe(n, t, e, a) {

		var r = [];

		if (t && (r = U.map(n[t].slice().reverse(), function(t, e) {

				return t.fn.apply(n.oInstance, a)

			})), null !== e) {

			var o = U.Event(e + ".dt");

			U(n.nTable).trigger(o, a), r.push(o.result)

		}

		return r

	}



	function de(t) {

		var e = t._iDisplayStart,

			n = t.fnDisplayEnd(),

			a = t._iDisplayLength;

		n <= e && (e = n - a), e -= e % a, (-1 === a || e < 0) && (e = 0), t._iDisplayStart = e

	}



	function he(t, e) {

		var n = t.renderer,

			a = I.ext.renderer[e];

		return U.isPlainObject(n) && n[e] ? a[n[e]] || a._ : "string" == typeof n && a[n] || a._

	}



	function pe(t) {

		return t.oFeatures.bServerSide ? "ssp" : t.ajax || t.sAjaxSource ? "ajax" : "dom"

	}

	var ge = [],

		be = Array.prototype;

	m = function(t, e) {

		if (!(this instanceof m)) return new m(t, e);

		var l = [],

			n = function(t) {

				var e, n, a, r, o, i = (e = t, r = I.settings, o = U.map(r, function(t, e) {

					return t.nTable

				}), e ? e.nTable && e.oApi ? [e] : e.nodeName && "table" === e.nodeName.toLowerCase() ? -1 !== (n = U.inArray(e,

					o)) ? [r[n]] : null : e && "function" == typeof e.settings ? e.settings().toArray() : ("string" == typeof e ?

					a = U(e) : e instanceof U && (a = e), a ? a.map(function(t) {

						return -1 !== (n = U.inArray(this, o)) ? r[n] : null

					}).toArray() : void 0) : []);

				i && (l = l.concat(i))

			};

		if (U.isArray(t))

			for (var a = 0, r = t.length; a < r; a++) n(t[a]);

		else n(t);

		this.context = b(l), e && U.merge(this, e), this.selector = {

			rows: null,

			cols: null,

			opts: null

		}, m.extend(this, this, ge)

	}, I.Api = m, U.extend(m.prototype, {

		any: function() {

			return 0 !== this.count()

		},

		concat: be.concat,

		context: [],

		count: function() {

			return this.flatten().length

		},

		each: function(t) {

			for (var e = 0, n = this.length; e < n; e++) t.call(this, this[e], e, this);

			return this

		},

		eq: function(t) {

			var e = this.context;

			return e.length > t ? new m(e[t], this[t]) : null

		},

		filter: function(t) {

			var e = [];

			if (be.filter) e = be.filter.call(this, t, this);

			else

				for (var n = 0, a = this.length; n < a; n++) t.call(this, this[n], n, this) && e.push(this[n]);

			return new m(this.context, e)

		},

		flatten: function() {

			var t = [];

			return new m(this.context, t.concat.apply(t, this.toArray()))

		},

		join: be.join,

		indexOf: be.indexOf || function(t, e) {

			for (var n = e || 0, a = this.length; n < a; n++)

				if (this[n] === t) return n;

			return -1

		},

		iterator: function(t, e, n, a) {

			var r, o, i, l, s, u, c, f, d = [],

				h = this.context,

				p = this.selector;

			for ("string" == typeof t && (a = n, n = e, e = t, t = !1), o = 0, i = h.length; o < i; o++) {

				var g = new m(h[o]);

				if ("table" === e)(r = n.call(g, h[o], o)) !== V && d.push(r);

				else if ("columns" === e || "rows" === e)(r = n.call(g, h[o], this[o], o)) !== V && d.push(r);

				else if ("column" === e || "column-rows" === e || "row" === e || "cell" === e)

					for (c = this[o], "column-rows" === e && (u = ye(h[o], p.opts)), l = 0, s = c.length; l < s; l++) f = c[l], (r =

						"cell" === e ? n.call(g, h[o], f.row, f.column, o, l) : n.call(g, h[o], f, o, l, u)) !== V && d.push(r)

			}

			if (d.length || a) {

				var b = new m(h, t ? d.concat.apply([], d) : d),

					v = b.selector;

				return v.rows = p.rows, v.cols = p.cols, v.opts = p.opts, b

			}

			return this

		},

		lastIndexOf: be.lastIndexOf || function(t, e) {

			return this.indexOf.apply(this.toArray.reverse(), arguments)

		},

		length: 0,

		map: function(t) {

			var e = [];

			if (be.map) e = be.map.call(this, t, this);

			else

				for (var n = 0, a = this.length; n < a; n++) e.push(t.call(this, this[n], n));

			return new m(this.context, e)

		},

		pluck: function(e) {

			return this.map(function(t) {

				return t[e]

			})

		},

		pop: be.pop,

		push: be.push,

		reduce: be.reduce || function(t, e) {

			return C(this, t, e, 0, this.length, 1)

		},

		reduceRight: be.reduceRight || function(t, e) {

			return C(this, t, e, this.length - 1, -1, -1)

		},

		reverse: be.reverse,

		selector: null,

		shift: be.shift,

		slice: function() {

			return new m(this.context, this)

		},

		sort: be.sort,

		splice: be.splice,

		toArray: function() {

			return be.slice.call(this)

		},

		to$: function() {

			return U(this)

		},

		toJQuery: function() {

			return U(this)

		},

		unique: function() {

			return new m(this.context, b(this))

		},

		unshift: be.unshift

	}), m.extend = function(t, e, n) {

		if (n.length && e && (e instanceof m || e.__dt_wrapper)) {

			var a, r, o, i = function(e, n, a) {

				return function() {

					var t = n.apply(e, arguments);

					return m.extend(t, t, a.methodExt), t

				}

			};

			for (a = 0, r = n.length; a < r; a++) e[(o = n[a]).name] = "function" == typeof o.val ? i(t, o.val, o) : U.isPlainObject(

				o.val) ? {} : o.val, e[o.name].__dt_wrapper = !0, m.extend(t, e[o.name], o.propExt)

		}

	}, m.register = e = function(t, e) {

		if (U.isArray(t))

			for (var n = 0, a = t.length; n < a; n++) m.register(t[n], e);

		else {

			var r, o, i, l, s = t.split("."),

				u = ge,

				c = function(t, e) {

					for (var n = 0, a = t.length; n < a; n++)

						if (t[n].name === e) return t[n];

					return null

				};

			for (r = 0, o = s.length; r < o; r++) {

				var f = c(u, i = (l = -1 !== s[r].indexOf("()")) ? s[r].replace("()", "") : s[r]);

				f || (f = {

					name: i,

					val: {},

					methodExt: [],

					propExt: []

				}, u.push(f)), r === o - 1 ? f.val = e : u = l ? f.methodExt : f.propExt

			}

		}

	}, m.registerPlural = t = function(t, e, n) {

		m.register(t, n), m.register(e, function() {

			var t = n.apply(this, arguments);

			return t === this ? this : t instanceof m ? t.length ? U.isArray(t[0]) ? new m(t.context, t[0]) : t[0] : V : t

		})

	};

	e("tables()", function(t) {

		return t ? new m(function(t, n) {

			if ("number" == typeof t) return [n[t]];

			var a = U.map(n, function(t, e) {

				return t.nTable

			});

			return U(a).filter(t).map(function(t) {

				var e = U.inArray(this, a);

				return n[e]

			}).toArray()

		}(t, this.context)) : this

	}), e("table()", function(t) {

		var e = this.tables(t),

			n = e.context;

		return n.length ? new m(n[0]) : e

	}), t("tables().nodes()", "table().node()", function() {

		return this.iterator("table", function(t) {

			return t.nTable

		}, 1)

	}), t("tables().body()", "table().body()", function() {

		return this.iterator("table", function(t) {

			return t.nTBody

		}, 1)

	}), t("tables().header()", "table().header()", function() {

		return this.iterator("table", function(t) {

			return t.nTHead

		}, 1)

	}), t("tables().footer()", "table().footer()", function() {

		return this.iterator("table", function(t) {

			return t.nTFoot

		}, 1)

	}), t("tables().containers()", "table().container()", function() {

		return this.iterator("table", function(t) {

			return t.nTableWrapper

		}, 1)

	}), e("draw()", function(e) {

		return this.iterator("table", function(t) {

			"page" === e ? lt(t) : ("string" == typeof e && (e = "full-hold" !== e), st(t, !1 === e))

		})

	}), e("page()", function(e) {

		return e === V ? this.page.info().page : this.iterator("table", function(t) {

			kt(t, e)

		})

	}), e("page.info()", function(t) {

		if (0 === this.context.length) return V;

		var e = this.context[0],

			n = e._iDisplayStart,

			a = e.oFeatures.bPaginate ? e._iDisplayLength : -1,

			r = e.fnRecordsDisplay(),

			o = -1 === a;

		return {

			page: o ? 0 : Math.floor(n / a),

			pages: o ? 1 : Math.ceil(r / a),

			start: n,

			end: e.fnDisplayEnd(),

			length: a,

			recordsTotal: e.fnRecordsTotal(),

			recordsDisplay: r,

			serverSide: "ssp" === pe(e)

		}

	}), e("page.len()", function(e) {

		return e === V ? 0 !== this.context.length ? this.context[0]._iDisplayLength : V : this.iterator("table", function(

			t) {

			Nt(t, e)

		})

	});

	var ve = function(r, o, t) {

		if (t) {

			var e = new m(r);

			e.one("draw", function() {

				t(e.ajax.json())

			})

		}

		if ("ssp" == pe(r)) st(r, o);

		else {

			Wt(r, !0);

			var n = r.jqXHR;

			n && 4 !== n.readyState && n.abort(), dt(r, [], function(t) {

				Q(r);

				for (var e = bt(r, t), n = 0, a = e.length; n < a; n++) W(r, e[n]);

				st(r, o), Wt(r, !1)

			})

		}

	};

	e("ajax.json()", function() {

		var t = this.context;

		if (0 < t.length) return t[0].json

	}), e("ajax.params()", function() {

		var t = this.context;

		if (0 < t.length) return t[0].oAjaxData

	}), e("ajax.reload()", function(e, n) {

		return this.iterator("table", function(t) {

			ve(t, !1 === n, e)

		})

	}), e("ajax.url()", function(e) {

		var t = this.context;

		return e === V ? 0 === t.length ? V : (t = t[0]).ajax ? U.isPlainObject(t.ajax) ? t.ajax.url : t.ajax : t.sAjaxSource :

			this.iterator("table", function(t) {

				U.isPlainObject(t.ajax) ? t.ajax.url = e : t.ajax = e

			})

	}), e("ajax.url().load()", function(e, n) {

		return this.iterator("table", function(t) {

			ve(t, !1 === n, e)

		})

	});

	var Se = function(t, e, n, a, r) {

			var o, i, l, s, u, c, f = [],

				d = typeof e;

			for (e && "string" !== d && "function" !== d && e.length !== V || (e = [e]), l = 0, s = e.length; l < s; l++)

				for (u = 0, c = (i = e[l] && e[l].split && !e[l].match(/[\[\(:]/) ? e[l].split(",") : [e[l]]).length; u < c; u++)(

					o = n("string" == typeof i[u] ? U.trim(i[u]) : i[u])) && o.length && (f = f.concat(o));

			var h = p.selector[t];

			if (h.length)

				for (l = 0, s = h.length; l < s; l++) f = h[l](a, r, f);

			return b(f)

		},

		me = function(t) {

			return t || (t = {}), t.filter && t.search === V && (t.search = t.filter), U.extend({

				search: "none",

				order: "current",

				page: "all"

			}, t)

		},

		De = function(t) {

			for (var e = 0, n = t.length; e < n; e++)

				if (0 < t[e].length) return t[0] = t[e], t[0].length = 1, t.length = 1, t.context = [t.context[e]], t;

			return t.length = 0, t

		},

		ye = function(t, e) {

			var n, a = [],

				r = t.aiDisplay,

				o = t.aiDisplayMaster,

				i = e.search,

				l = e.order,

				s = e.page;

			if ("ssp" == pe(t)) return "removed" === i ? [] : g(0, o.length);

			if ("current" == s)

				for (c = t._iDisplayStart, f = t.fnDisplayEnd(); c < f; c++) a.push(r[c]);

			else if ("current" == l || "applied" == l) {

				if ("none" == i) a = o.slice();

				else if ("applied" == i) a = r.slice();

				else if ("removed" == i) {

					for (var u = {}, c = 0, f = r.length; c < f; c++) u[r[c]] = null;

					a = U.map(o, function(t) {

						return u.hasOwnProperty(t) ? null : t

					})

				}

			} else if ("index" == l || "original" == l)

				for (c = 0, f = t.aoData.length; c < f; c++) "none" == i ? a.push(c) : (-1 === (n = U.inArray(c, r)) && "removed" ==

					i || 0 <= n && "applied" == i) && a.push(c);

			return a

		};

	e("rows()", function(e, n) {

		e === V ? e = "" : U.isPlainObject(e) && (n = e, e = ""), n = me(n);

		var t = this.iterator("table", function(t) {

			return Se("row", e, function(n) {

				var t = h(n),

					a = s.aoData;

				if (null !== t && !u) return [t];

				if (c || (c = ye(s, u)), null !== t && -1 !== U.inArray(t, c)) return [t];

				if (null === n || n === V || "" === n) return c;

				if ("function" == typeof n) return U.map(c, function(t) {

					var e = a[t];

					return n(t, e._aData, e.nTr) ? t : null

				});

				if (n.nodeName) {

					var e = n._DT_RowIndex,

						r = n._DT_CellIndex;

					if (e !== V) return a[e] && a[e].nTr === n ? [e] : [];

					if (r) return a[r.row] && a[r.row].nTr === n ? [r.row] : [];

					var o = U(n).closest("*[data-dt-row]");

					return o.length ? [o.data("dt-row")] : []

				}

				if ("string" == typeof n && "#" === n.charAt(0)) {

					var i = s.aIds[n.replace(/^#/, "")];

					if (i !== V) return [i.idx]

				}

				var l = y(D(s.aoData, c, "nTr"));

				return U(l).filter(n).map(function() {

					return this._DT_RowIndex

				}).toArray()

			}, s = t, u = n);

			var s, u, c

		}, 1);

		return t.selector.rows = e, t.selector.opts = n, t

	}), e("rows().nodes()", function() {

		return this.iterator("row", function(t, e) {

			return t.aoData[e].nTr || V

		}, 1)

	}), e("rows().data()", function() {

		return this.iterator(!0, "rows", function(t, e) {

			return D(t.aoData, e, "_aData")

		}, 1)

	}), t("rows().cache()", "row().cache()", function(a) {

		return this.iterator("row", function(t, e) {

			var n = t.aoData[e];

			return "search" === a ? n._aFilterData : n._aSortData

		}, 1)

	}), t("rows().invalidate()", "row().invalidate()", function(n) {

		return this.iterator("row", function(t, e) {

			et(t, e, n)

		})

	}), t("rows().indexes()", "row().index()", function() {

		return this.iterator("row", function(t, e) {

			return e

		}, 1)

	}), t("rows().ids()", "row().id()", function(t) {

		for (var e = [], n = this.context, a = 0, r = n.length; a < r; a++)

			for (var o = 0, i = this[a].length; o < i; o++) {

				var l = n[a].rowIdFn(n[a].aoData[this[a][o]]._aData);

				e.push((!0 === t ? "#" : "") + l)

			}

		return new m(n, e)

	}), t("rows().remove()", "row().remove()", function() {

		var d = this;

		return this.iterator("row", function(t, e, n) {

			var a, r, o, i, l, s, u = t.aoData,

				c = u[e];

			for (u.splice(e, 1), a = 0, r = u.length; a < r; a++)

				if (s = (l = u[a]).anCells, null !== l.nTr && (l.nTr._DT_RowIndex = a), null !== s)

					for (o = 0, i = s.length; o < i; o++) s[o]._DT_CellIndex.row = a;

			tt(t.aiDisplayMaster, e), tt(t.aiDisplay, e), tt(d[n], e, !1), 0 < t._iRecordsDisplay && t._iRecordsDisplay--,

				de(t);

			var f = t.rowIdFn(c._aData);

			f !== V && delete t.aIds[f]

		}), this.iterator("table", function(t) {

			for (var e = 0, n = t.aoData.length; e < n; e++) t.aoData[e].idx = e

		}), this

	}), e("rows.add()", function(o) {

		var t = this.iterator("table", function(t) {

				var e, n, a, r = [];

				for (n = 0, a = o.length; n < a; n++)(e = o[n]).nodeName && "TR" === e.nodeName.toUpperCase() ? r.push(E(t, e)[

					0]) : r.push(W(t, e));

				return r

			}, 1),

			e = this.rows(-1);

		return e.pop(), U.merge(e, t), e

	}), e("row()", function(t, e) {

		return De(this.rows(t, e))

	}), e("row().data()", function(t) {

		var e = this.context;

		if (t === V) return e.length && this.length ? e[0].aoData[this[0]]._aData : V;

		var n = e[0].aoData[this[0]];

		return n._aData = t, U.isArray(t) && n.nTr.id && Z(e[0].rowId)(t, n.nTr.id), et(e[0], this[0], "data"), this

	}), e("row().node()", function() {

		var t = this.context;

		return t.length && this.length && t[0].aoData[this[0]].nTr || null

	}), e("row.add()", function(e) {

		e instanceof U && e.length && (e = e[0]);

		var t = this.iterator("table", function(t) {

			return e.nodeName && "TR" === e.nodeName.toUpperCase() ? E(t, e)[0] : W(t, e)

		});

		return this.row(t[0])

	});

	var _e = function(t, e) {

			var n = t.context;

			if (n.length) {

				var a = n[0].aoData[e !== V ? e : t[0]];

				a && a._details && (a._details.remove(), a._detailsShow = V, a._details = V)

			}

		},

		Ce = function(t, e) {

			var n = t.context;

			if (n.length && t.length) {

				var a = n[0].aoData[t[0]];

				a._details && ((a._detailsShow = e) ? a._details.insertAfter(a.nTr) : a._details.detach(), Te(n[0]))

			}

		},

		Te = function(s) {

			var r = new m(s),

				t = ".dt.DT_details",

				e = "draw" + t,

				n = "column-visibility" + t,

				a = "destroy" + t,

				u = s.aoData;

			r.off(e + " " + n + " " + a), 0 < X(u, "_details").length && (r.on(e, function(t, e) {

				s === e && r.rows({

					page: "current"

				}).eq(0).each(function(t) {

					var e = u[t];

					e._detailsShow && e._details.insertAfter(e.nTr)

				})

			}), r.on(n, function(t, e, n, a) {

				if (s === e)

					for (var r, o = O(e), i = 0, l = u.length; i < l; i++)(r = u[i])._details && r._details.children("td[colspan]")

						.attr("colspan", o)

			}), r.on(a, function(t, e) {

				if (s === e)

					for (var n = 0, a = u.length; n < a; n++) u[n]._details && _e(r, n)

			}))

		},

		we = "row().child",

		xe = we + "()";

	e(xe, function(t, e) {

		var o, n, i, l, a = this.context;

		return t === V ? a.length && this.length ? a[0].aoData[this[0]]._details : V : (!0 === t ? this.child.show() : !1 ===

			t ? _e(this) : a.length && this.length && (o = a[0], n = a[0].aoData[this[0]], i = [], (l = function(t, e) {

				if (U.isArray(t) || t instanceof U)

					for (var n = 0, a = t.length; n < a; n++) l(t[n], e);

				else if (t.nodeName && "tr" === t.nodeName.toLowerCase()) i.push(t);

				else {

					var r = U("<tr><td/></tr>").addClass(e);

					U("td", r).addClass(e).html(t)[0].colSpan = O(o), i.push(r[0])

				}

			})(t, e), n._details && n._details.detach(), n._details = U(i), n._detailsShow && n._details.insertAfter(n.nTr)),

			this)

	}), e([we + ".show()", xe + ".show()"], function(t) {

		return Ce(this, !0), this

	}), e([we + ".hide()", xe + ".hide()"], function() {

		return Ce(this, !1), this

	}), e([we + ".remove()", xe + ".remove()"], function() {

		return _e(this), this

	}), e(we + ".isShown()", function() {

		var t = this.context;

		return t.length && this.length && t[0].aoData[this[0]]._detailsShow || !1

	});

	var Ie = /^([^:]+):(name|visIdx|visible)$/,

		Ae = function(t, e, n, a, r) {

			for (var o = [], i = 0, l = r.length; i < l; i++) o.push(x(t, r[i], e));

			return o

		};

	e("columns()", function(n, a) {

		n === V ? n = "" : U.isPlainObject(n) && (a = n, n = ""), a = me(a);

		var t = this.iterator("table", function(t) {

			return e = n, u = a, c = (s = t).aoColumns, f = X(c, "sName"), d = X(c, "nTh"), Se("column", e, function(n) {

				var t = h(n);

				if ("" === n) return g(c.length);

				if (null !== t) return [0 <= t ? t : c.length + t];

				if ("function" == typeof n) {

					var a = ye(s, u);

					return U.map(c, function(t, e) {

						return n(e, Ae(s, e, 0, 0, a), d[e]) ? e : null

					})

				}

				var r = "string" == typeof n ? n.match(Ie) : "";

				if (r) switch (r[2]) {

					case "visIdx":

					case "visible":

						var e = parseInt(r[1], 10);

						if (e < 0) {

							var o = U.map(c, function(t, e) {

								return t.bVisible ? e : null

							});

							return [o[o.length + e]]

						}

						return [q(s, e)];

					case "name":

						return U.map(f, function(t, e) {

							return t === r[1] ? e : null

						});

					default:

						return []

				}

				if (n.nodeName && n._DT_CellIndex) return [n._DT_CellIndex.column];

				var i = U(d).filter(n).map(function() {

					return U.inArray(this, d)

				}).toArray();

				if (i.length || !n.nodeName) return i;

				var l = U(n).closest("*[data-dt-column]");

				return l.length ? [l.data("dt-column")] : []

			}, s, u);

			var s, e, u, c, f, d

		}, 1);

		return t.selector.cols = n, t.selector.opts = a, t

	}), t("columns().header()", "column().header()", function(t, e) {

		return this.iterator("column", function(t, e) {

			return t.aoColumns[e].nTh

		}, 1)

	}), t("columns().footer()", "column().footer()", function(t, e) {

		return this.iterator("column", function(t, e) {

			return t.aoColumns[e].nTf

		}, 1)

	}), t("columns().data()", "column().data()", function() {

		return this.iterator("column-rows", Ae, 1)

	}), t("columns().dataSrc()", "column().dataSrc()", function() {

		return this.iterator("column", function(t, e) {

			return t.aoColumns[e].mData

		}, 1)

	}), t("columns().cache()", "column().cache()", function(o) {

		return this.iterator("column-rows", function(t, e, n, a, r) {

			return D(t.aoData, r, "search" === o ? "_aFilterData" : "_aSortData", e)

		}, 1)

	}), t("columns().nodes()", "column().nodes()", function() {

		return this.iterator("column-rows", function(t, e, n, a, r) {

			return D(t.aoData, r, "anCells", e)

		}, 1)

	}), t("columns().visible()", "column().visible()", function(n, a) {

		var t = this.iterator("column", function(t, e) {

			if (n === V) return t.aoColumns[e].bVisible;

			! function(t, e, n) {

				var a, r, o, i, l = t.aoColumns,

					s = l[e],

					u = t.aoData;

				if (n === V) return s.bVisible;

				if (s.bVisible !== n) {

					if (n) {

						var c = U.inArray(!0, X(l, "bVisible"), e + 1);

						for (r = 0, o = u.length; r < o; r++) i = u[r].nTr, a = u[r].anCells, i && i.insertBefore(a[e], a[c] || null)

					} else U(X(t.aoData, "anCells", e)).detach();

					s.bVisible = n, it(t, t.aoHeader), it(t, t.aoFooter), t.aiDisplay.length || U(t.nTBody).find("td[colspan]").attr(

						"colspan", O(t)), ae(t)

				}

			}(t, e, n)

		});

		return n !== V && (this.iterator("column", function(t, e) {

			fe(t, null, "column-visibility", [t, e, n, a])

		}), (a === V || a) && this.columns.adjust()), t

	}), t("columns().indexes()", "column().index()", function(n) {

		return this.iterator("column", function(t, e) {

			return "visible" === n ? T(t, e) : e

		}, 1)

	}), e("columns.adjust()", function() {

		return this.iterator("table", function(t) {

			J(t)

		}, 1)

	}), e("column.index()", function(t, e) {

		if (0 !== this.context.length) {

			var n = this.context[0];

			if ("fromVisible" === t || "toData" === t) return q(n, e);

			if ("fromData" === t || "toVisible" === t) return T(n, e)

		}

	}), e("column()", function(t, e) {

		return De(this.columns(t, e))

	});

	e("cells()", function(b, t, v) {

		if (U.isPlainObject(b) && (b.row === V ? (v = b, b = null) : (v = t, t = null)), U.isPlainObject(t) && (v = t, t =

				null), null === t || t === V) return this.iterator("table", function(t) {

			return a = t, e = b, n = me(v), f = a.aoData, d = ye(a, n), h = y(D(f, d, "anCells")), p = U([].concat.apply([],

				h)), g = a.aoColumns.length, Se("cell", e, function(t) {

				var e = "function" == typeof t;

				if (null === t || t === V || e) {

					for (o = [], i = 0, l = d.length; i < l; i++)

						for (r = d[i], s = 0; s < g; s++) u = {

							row: r,

							column: s

						}, e ? (c = f[r], t(u, x(a, r, s), c.anCells ? c.anCells[s] : null) && o.push(u)) : o.push(u);

					return o

				}

				if (U.isPlainObject(t)) return t.column !== V && t.row !== V && -1 !== U.inArray(t.row, d) ? [t] : [];

				var n = p.filter(t).map(function(t, e) {

					return {

						row: e._DT_CellIndex.row,

						column: e._DT_CellIndex.column

					}

				}).toArray();

				return n.length || !t.nodeName ? n : (c = U(t).closest("*[data-dt-row]")).length ? [{

					row: c.data("dt-row"),

					column: c.data("dt-column")

				}] : []

			}, a, n);

			var a, e, n, r, o, i, l, s, u, c, f, d, h, p, g

		});

		var n, a, r, o, i, l = this.columns(t),

			s = this.rows(b);

		this.iterator("table", function(t, e) {

			for (n = [], a = 0, r = s[e].length; a < r; a++)

				for (o = 0, i = l[e].length; o < i; o++) n.push({

					row: s[e][a],

					column: l[e][o]

				})

		}, 1);

		var e = this.cells(n, v);

		return U.extend(e.selector, {

			cols: t,

			rows: b,

			opts: v

		}), e

	}), t("cells().nodes()", "cell().node()", function() {

		return this.iterator("cell", function(t, e, n) {

			var a = t.aoData[e];

			return a && a.anCells ? a.anCells[n] : V

		}, 1)

	}), e("cells().data()", function() {

		return this.iterator("cell", function(t, e, n) {

			return x(t, e, n)

		}, 1)

	}), t("cells().cache()", "cell().cache()", function(a) {

		return a = "search" === a ? "_aFilterData" : "_aSortData", this.iterator("cell", function(t, e, n) {

			return t.aoData[e][a][n]

		}, 1)

	}), t("cells().render()", "cell().render()", function(a) {

		return this.iterator("cell", function(t, e, n) {

			return x(t, e, n, a)

		}, 1)

	}), t("cells().indexes()", "cell().index()", function() {

		return this.iterator("cell", function(t, e, n) {

			return {

				row: e,

				column: n,

				columnVisible: T(t, n)

			}

		}, 1)

	}), t("cells().invalidate()", "cell().invalidate()", function(a) {

		return this.iterator("cell", function(t, e, n) {

			et(t, e, a, n)

		})

	}), e("cell()", function(t, e, n) {

		return De(this.cells(t, e, n))

	}), e("cell().data()", function(t) {

		var e = this.context,

			n = this[0];

		return t === V ? e.length && n.length ? x(e[0], n[0].row, n[0].column) : V : (B(e[0], n[0].row, n[0].column, t),

			et(e[0], n[0].row, "data", n[0].column), this)

	}), e("order()", function(e, t) {

		var n = this.context;

		return e === V ? 0 !== n.length ? n[0].aaSorting : V : ("number" == typeof e ? e = [

			[e, t]

		] : e.length && !U.isArray(e[0]) && (e = Array.prototype.slice.call(arguments)), this.iterator("table", function(

			t) {

			t.aaSorting = e.slice()

		}))

	}), e("order.listener()", function(e, n, a) {

		return this.iterator("table", function(t) {

			te(t, e, n, a)

		})

	}), e("order.fixed()", function(e) {

		if (!e) {

			var t = this.context,

				n = t.length ? t[0].aaSortingFixed : V;

			return U.isArray(n) ? {

				pre: n

			} : n

		}

		return this.iterator("table", function(t) {

			t.aaSortingFixed = U.extend(!0, {}, e)

		})

	}), e(["columns().order()", "column().order()"], function(a) {

		var r = this;

		return this.iterator("table", function(t, e) {

			var n = [];

			U.each(r[e], function(t, e) {

				n.push([e, a])

			}), t.aaSorting = n

		})

	}), e("search()", function(e, n, a, r) {

		var t = this.context;

		return e === V ? 0 !== t.length ? t[0].oPreviousSearch.sSearch : V : this.iterator("table", function(t) {

			t.oFeatures.bFilter && St(t, U.extend({}, t.oPreviousSearch, {

				sSearch: e + "",

				bRegex: null !== n && n,

				bSmart: null === a || a,

				bCaseInsensitive: null === r || r

			}), 1)

		})

	}), t("columns().search()", "column().search()", function(a, r, o, i) {

		return this.iterator("column", function(t, e) {

			var n = t.aoPreSearchCols;

			if (a === V) return n[e].sSearch;

			t.oFeatures.bFilter && (U.extend(n[e], {

				sSearch: a + "",

				bRegex: null !== r && r,

				bSmart: null === o || o,

				bCaseInsensitive: null === i || i

			}), St(t, t.oPreviousSearch, 1))

		})

	}), e("state()", function() {

		return this.context.length ? this.context[0].oSavedState : null

	}), e("state.clear()", function() {

		return this.iterator("table", function(t) {

			t.fnStateSaveCallback.call(t.oInstance, t, {})

		})

	}), e("state.loaded()", function() {

		return this.context.length ? this.context[0].oLoadedState : null

	}), e("state.save()", function() {

		return this.iterator("table", function(t) {

			ae(t)

		})

	}), I.versionCheck = I.fnVersionCheck = function(t) {

		for (var e, n, a = I.version.split("."), r = t.split("."), o = 0, i = r.length; o < i; o++)

			if ((e = parseInt(a[o], 10) || 0) !== (n = parseInt(r[o], 10) || 0)) return n < e;

		return !0

	}, I.isDataTable = I.fnIsDataTable = function(t) {

		var r = U(t).get(0),

			o = !1;

		return t instanceof I.Api || (U.each(I.settings, function(t, e) {

			var n = e.nScrollHead ? U("table", e.nScrollHead)[0] : null,

				a = e.nScrollFoot ? U("table", e.nScrollFoot)[0] : null;

			e.nTable !== r && n !== r && a !== r || (o = !0)

		}), o)

	}, I.tables = I.fnTables = function(e) {

		var t = !1;

		U.isPlainObject(e) && (t = e.api, e = e.visible);

		var n = U.map(I.settings, function(t) {

			if (!e || e && U(t.nTable).is(":visible")) return t.nTable

		});

		return t ? new m(n) : n

	}, I.camelToHungarian = F, e("$()", function(t, e) {

		var n = this.rows(e).nodes(),

			a = U(n);

		return U([].concat(a.filter(t).toArray(), a.find(t).toArray()))

	}), U.each(["on", "one", "off"], function(t, n) {

		e(n + "()", function() {

			var t = Array.prototype.slice.call(arguments);

			t[0] = U.map(t[0].split(/\s/), function(t) {

				return t.match(/\.dt\b/) ? t : t + ".dt"

			}).join(" ");

			var e = U(this.tables().nodes());

			return e[n].apply(e, t), this

		})

	}), e("clear()", function() {

		return this.iterator("table", function(t) {

			Q(t)

		})

	}), e("settings()", function() {

		return new m(this.context, this.context)

	}), e("init()", function() {

		var t = this.context;

		return t.length ? t[0].oInit : null

	}), e("data()", function() {

		return this.iterator("table", function(t) {

			return X(t.aoData, "_aData")

		}).flatten()

	}), e("destroy()", function(p) {

		return p = p || !1, this.iterator("table", function(e) {

			var n, t = e.nTableWrapper.parentNode,

				a = e.oClasses,

				r = e.nTable,

				o = e.nTBody,

				i = e.nTHead,

				l = e.nTFoot,

				s = U(r),

				u = U(o),

				c = U(e.nTableWrapper),

				f = U.map(e.aoData, function(t) {

					return t.nTr

				});

			e.bDestroying = !0, fe(e, "aoDestroyCallback", "destroy", [e]), p || new m(e).columns().visible(!0), c.off(

					".DT").find(":not(tbody *)").off(".DT"), U(A).off(".DT-" + e.sInstance), r != i.parentNode && (s.children(

					"thead").detach(), s.append(i)), l && r != l.parentNode && (s.children("tfoot").detach(), s.append(l)), e.aaSorting = [],

				e.aaSortingFixed = [], ee(e), U(f).removeClass(e.asStripeClasses.join(" ")), U("th, td", i).removeClass(a.sSortable +

					" " + a.sSortableAsc + " " + a.sSortableDesc + " " + a.sSortableNone), u.children().detach(), u.append(f);

			var d = p ? "remove" : "detach";

			s[d](), c[d](), !p && t && (t.insertBefore(r, e.nTableReinsertBefore), s.css("width", e.sDestroyWidth).removeClass(

				a.sTable), (n = e.asDestroyStripes.length) && u.children().each(function(t) {

				U(this).addClass(e.asDestroyStripes[t % n])

			}));

			var h = U.inArray(e, I.settings); - 1 !== h && I.settings.splice(h, 1)

		})

	}), U.each(["column", "row", "cell"], function(t, s) {

		e(s + "s().every()", function(o) {

			var i = this.selector.opts,

				l = this;

			return this.iterator(s, function(t, e, n, a, r) {

				o.call(l[s](e, "cell" === s ? n : i, "cell" === s ? i : V), e, n, a, r)

			})

		})

	}), e("i18n()", function(t, e, n) {

		var a = this.context[0],

			r = Y(t)(a.oLanguage);

		return r === V && (r = e), n !== V && U.isPlainObject(r) && (r = r[n] !== V ? r[n] : r._), r.replace("%d", n)

	}), I.version = "1.10.19", I.settings = [], I.models = {}, I.models.oSearch = {

		bCaseInsensitive: !0,

		sSearch: "",

		bRegex: !1,

		bSmart: !0

	}, I.models.oRow = {

		nTr: null,

		anCells: null,

		_aData: [],

		_aSortData: null,

		_aFilterData: null,

		_sFilterRow: null,

		_sRowStripe: "",

		src: null,

		idx: -1

	}, I.models.oColumn = {

		idx: null,

		aDataSort: null,

		asSorting: null,

		bSearchable: null,

		bSortable: null,

		bVisible: null,

		_sManualType: null,

		_bAttrSrc: !1,

		fnCreatedCell: null,

		fnGetData: null,

		fnSetData: null,

		mData: null,

		mRender: null,

		nTh: null,

		nTf: null,

		sClass: null,

		sContentPadding: null,

		sDefaultContent: null,

		sName: null,

		sSortDataType: "std",

		sSortingClass: null,

		sSortingClassJUI: null,

		sTitle: null,

		sType: null,

		sWidth: null,

		sWidthOrig: null

	}, I.defaults = {

		aaData: null,

		aaSorting: [

			[0, "asc"]

		],

		aaSortingFixed: [],

		ajax: null,

		aLengthMenu: [10, 25, 50, 100],

		aoColumns: null,

		aoColumnDefs: null,

		aoSearchCols: [],

		asStripeClasses: null,

		bAutoWidth: !0,

		bDeferRender: !1,

		bDestroy: !1,

		bFilter: !0,

		bInfo: !0,

		bLengthChange: !0,

		bPaginate: !0,

		bProcessing: !1,

		bRetrieve: !1,

		bScrollCollapse: !1,

		bServerSide: !1,

		bSort: !0,

		bSortMulti: !0,

		bSortCellsTop: !1,

		bSortClasses: !0,

		bStateSave: !1,

		fnCreatedRow: null,

		fnDrawCallback: null,

		fnFooterCallback: null,

		fnFormatNumber: function(t) {

			return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands)

		},

		fnHeaderCallback: null,

		fnInfoCallback: null,

		fnInitComplete: null,

		fnPreDrawCallback: null,

		fnRowCallback: null,

		fnServerData: null,

		fnServerParams: null,

		fnStateLoadCallback: function(t) {

			try {

				return JSON.parse((-1 === t.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + t.sInstance +

					"_" + location.pathname))

			} catch (t) {}

		},

		fnStateLoadParams: null,

		fnStateLoaded: null,

		fnStateSaveCallback: function(t, e) {

			try {

				(-1 === t.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + t.sInstance + "_" + location.pathname,

					JSON.stringify(e))

			} catch (t) {}

		},

		fnStateSaveParams: null,

		iStateDuration: 7200,

		iDeferLoading: null,

		iDisplayLength: 10,

		iDisplayStart: 0,

		iTabIndex: 0,

		oClasses: {},

		oLanguage: {

			oAria: {

				sSortAscending: ": activate to sort column ascending",

				sSortDescending: ": activate to sort column descending"

			},

			oPaginate: {

				sFirst: "First",

				sLast: "Last",

				sNext: "Next",

				sPrevious: "Previous"

			},

			sEmptyTable: "No data available in table",

			sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",

			sInfoEmpty: "Showing 0 to 0 of 0 entries",

			sInfoFiltered: "(filtered from _MAX_ total entries)",

			sInfoPostFix: "",

			sDecimal: "",

			sThousands: ",",

			sLengthMenu: "Show _MENU_ entries",

			sLoadingRecords: "Loading...",

			sProcessing: "Processing...",

			sSearch: "Search:",

			sSearchPlaceholder: "",

			sUrl: "",

			sZeroRecords: "No matching records found"

		},

		oSearch: U.extend({}, I.models.oSearch),

		sAjaxDataProp: "data",

		sAjaxSource: null,

		sDom: "lfrtip",

		searchDelay: null,

		sPaginationType: "simple_numbers",

		sScrollX: "",

		sScrollXInner: "",

		sScrollY: "",

		sServerMethod: "GET",

		renderer: null,

		rowId: "DT_RowId"

	}, v(I.defaults), I.defaults.column = {

		aDataSort: null,

		iDataSort: -1,

		asSorting: ["asc", "desc"],

		bSearchable: !0,

		bSortable: !0,

		bVisible: !0,

		fnCreatedCell: null,

		mData: null,

		mRender: null,

		sCellType: "td",

		sClass: "",

		sContentPadding: "",

		sDefaultContent: null,

		sName: "",

		sSortDataType: "std",

		sTitle: null,

		sType: null,

		sWidth: null

	}, v(I.defaults.column), I.models.oSettings = {

		oFeatures: {

			bAutoWidth: null,

			bDeferRender: null,

			bFilter: null,

			bInfo: null,

			bLengthChange: null,

			bPaginate: null,

			bProcessing: null,

			bServerSide: null,

			bSort: null,

			bSortMulti: null,

			bSortClasses: null,

			bStateSave: null

		},

		oScroll: {

			bCollapse: null,

			iBarWidth: 0,

			sX: null,

			sXInner: null,

			sY: null

		},

		oLanguage: {

			fnInfoCallback: null

		},

		oBrowser: {

			bScrollOversize: !1,

			bScrollbarLeft: !1,

			bBounding: !1,

			barWidth: 0

		},

		ajax: null,

		aanFeatures: [],

		aoData: [],

		aiDisplay: [],

		aiDisplayMaster: [],

		aIds: {},

		aoColumns: [],

		aoHeader: [],

		aoFooter: [],

		oPreviousSearch: {},

		aoPreSearchCols: [],

		aaSorting: null,

		aaSortingFixed: [],

		asStripeClasses: null,

		asDestroyStripes: [],

		sDestroyWidth: 0,

		aoRowCallback: [],

		aoHeaderCallback: [],

		aoFooterCallback: [],

		aoDrawCallback: [],

		aoRowCreatedCallback: [],

		aoPreDrawCallback: [],

		aoInitComplete: [],

		aoStateSaveParams: [],

		aoStateLoadParams: [],

		aoStateLoaded: [],

		sTableId: "",

		nTable: null,

		nTHead: null,

		nTFoot: null,

		nTBody: null,

		nTableWrapper: null,

		bDeferLoading: !1,

		bInitialised: !1,

		aoOpenRows: [],

		sDom: null,

		searchDelay: null,

		sPaginationType: "two_button",

		iStateDuration: 0,

		aoStateSave: [],

		aoStateLoad: [],

		oSavedState: null,

		oLoadedState: null,

		sAjaxSource: null,

		sAjaxDataProp: null,

		bAjaxDataGet: !0,

		jqXHR: null,

		json: V,

		oAjaxData: V,

		fnServerData: null,

		aoServerParams: [],

		sServerMethod: null,

		fnFormatNumber: null,

		aLengthMenu: null,

		iDraw: 0,

		bDrawing: !1,

		iDrawError: -1,

		_iDisplayLength: 10,

		_iDisplayStart: 0,

		_iRecordsTotal: 0,

		_iRecordsDisplay: 0,

		oClasses: {},

		bFiltered: !1,

		bSorted: !1,

		bSortCellsTop: null,

		oInit: null,

		aoDestroyCallback: [],

		fnRecordsTotal: function() {

			return "ssp" == pe(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length

		},

		fnRecordsDisplay: function() {

			return "ssp" == pe(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length

		},

		fnDisplayEnd: function() {

			var t = this._iDisplayLength,

				e = this._iDisplayStart,

				n = e + t,

				a = this.aiDisplay.length,

				r = this.oFeatures,

				o = r.bPaginate;

			return r.bServerSide ? !1 === o || -1 === t ? e + a : Math.min(e + t, this._iRecordsDisplay) : !o || a < n || -1 ===

				t ? a : n

		},

		oInstance: null,

		sInstance: null,

		iTabIndex: 0,

		nScrollHead: null,

		nScrollFoot: null,

		aLastSort: [],

		oPlugins: {},

		rowIdFn: null,

		rowId: null

	}, I.ext = p = {

		buttons: {},

		classes: {},

		builder: "-source-",

		errMode: "alert",

		feature: [],

		search: [],

		selector: {

			cell: [],

			column: [],

			row: []

		},

		internal: {},

		legacy: {

			ajax: null

		},

		pager: {},

		renderer: {

			pageButton: {},

			header: {}

		},

		order: {},

		type: {

			detect: [],

			search: {},

			order: {}

		},

		_unique: 0,

		fnVersionCheck: I.fnVersionCheck,

		iApiIndex: 0,

		oJUIClasses: {},

		sVersion: I.version

	}, U.extend(p, {

		afnFiltering: p.search,

		aTypes: p.type.detect,

		ofnSearch: p.type.search,

		oSort: p.type.order,

		afnSortData: p.order,

		aoFeatures: p.feature,

		oApi: p.internal,

		oStdClasses: p.classes,

		oPagination: p.pager

	}), U.extend(I.ext.classes, {

		sTable: "dataTable",

		sNoFooter: "no-footer",

		sPageButton: "paginate_button",

		sPageButtonActive: "current",

		sPageButtonDisabled: "disabled",

		sStripeOdd: "odd",

		sStripeEven: "even",

		sRowEmpty: "dataTables_empty",

		sWrapper: "dataTables_wrapper",

		sFilter: "dataTables_filter",

		sInfo: "dataTables_info",

		sPaging: "dataTables_paginate paging_",

		sLength: "dataTables_length",

		sProcessing: "dataTables_processing",

		sSortAsc: "sorting_asc",

		sSortDesc: "sorting_desc",

		sSortable: "sorting",

		sSortableAsc: "sorting_asc_disabled",

		sSortableDesc: "sorting_desc_disabled",

		sSortableNone: "sorting_disabled",

		sSortColumn: "sorting_",

		sFilterInput: "",

		sLengthSelect: "",

		sScrollWrapper: "dataTables_scroll",

		sScrollHead: "dataTables_scrollHead",

		sScrollHeadInner: "dataTables_scrollHeadInner",

		sScrollBody: "dataTables_scrollBody",

		sScrollFoot: "dataTables_scrollFoot",

		sScrollFootInner: "dataTables_scrollFootInner",

		sHeaderTH: "",

		sFooterTH: "",

		sSortJUIAsc: "",

		sSortJUIDesc: "",

		sSortJUI: "",

		sSortJUIAscAllowed: "",

		sSortJUIDescAllowed: "",

		sSortJUIWrapper: "",

		sSortIcon: "",

		sJUIHeader: "",

		sJUIFooter: ""

	});

	var Fe = I.ext.pager;



	function Le(t, e) {

		var n = [],

			a = Fe.numbers_length,

			r = Math.floor(a / 2);

		return e <= a ? n = g(0, e) : t <= r ? ((n = g(0, a - 2)).push("ellipsis"), n.push(e - 1)) : (e - 1 - r <= t ? (n =

			g(e - (a - 2), e)).splice(0, 0, "ellipsis") : ((n = g(t - r + 2, t + r - 1)).push("ellipsis"), n.push(e - 1), n.splice(

			0, 0, "ellipsis")), n.splice(0, 0, 0)), n.DT_el = "span", n

	}

	U.extend(Fe, {

		simple: function(t, e) {

			return ["previous", "next"]

		},

		full: function(t, e) {

			return ["first", "previous", "next", "last"]

		},

		numbers: function(t, e) {

			return [Le(t, e)]

		},

		simple_numbers: function(t, e) {

			return ["previous", Le(t, e), "next"]

		},

		full_numbers: function(t, e) {

			return ["first", "previous", Le(t, e), "next", "last"]

		},

		first_last_numbers: function(t, e) {

			return ["first", Le(t, e), "last"]

		},

		_numbers: Le,

		numbers_length: 7

	}), U.extend(!0, I.ext.renderer, {

		pageButton: {

			_: function(l, t, s, e, u, c) {

				var f, d, n, h = l.oClasses,

					p = l.oLanguage.oPaginate,

					g = l.oLanguage.oAria.paginate || {},

					b = 0,

					v = function(t, e) {

						var n, a, r, o = function(t) {

							kt(l, t.data.action, !0)

						};

						for (n = 0, a = e.length; n < a; n++)

							if (r = e[n], U.isArray(r)) {

								var i = U("<" + (r.DT_el || "div") + "/>").appendTo(t);

								v(i, r)

							} else {

								switch (f = null, d = "", r) {

									case "ellipsis":

										t.append('<span class="ellipsis">&#x2026;</span>');

										break;

									case "first":

										f = p.sFirst, d = r + (0 < u ? "" : " " + h.sPageButtonDisabled);

										break;

									case "previous":

										f = p.sPrevious, d = r + (0 < u ? "" : " " + h.sPageButtonDisabled);

										break;

									case "next":

										f = p.sNext, d = r + (u < c - 1 ? "" : " " + h.sPageButtonDisabled);

										break;

									case "last":

										f = p.sLast, d = r + (u < c - 1 ? "" : " " + h.sPageButtonDisabled);

										break;

									default:

										f = r + 1, d = u === r ? h.sPageButtonActive : ""

								}

								null !== f && (ue(U("<a>", {

									class: h.sPageButton + " " + d,

									"aria-controls": l.sTableId,

									"aria-label": g[r],

									"data-dt-idx": b,

									tabindex: l.iTabIndex,

									id: 0 === s && "string" == typeof r ? l.sTableId + "_" + r : null

								}).html(f).appendTo(t), {

									action: r

								}, o), b++)

							}

					};

				try {

					n = U(t).find(S.activeElement).data("dt-idx")

				} catch (t) {}

				v(U(t).empty(), e), n !== V && U(t).find("[data-dt-idx=" + n + "]").focus()

			}

		}

	}), U.extend(I.ext.type.detect, [function(t, e) {

		var n = e.oLanguage.sDecimal;

		return c(t, n) ? "num" + n : null

	}, function(t, e) {

		if (t && !(t instanceof Date) && !o.test(t)) return null;

		var n = Date.parse(t);

		return null !== n && !isNaN(n) || s(t) ? "date" : null

	}, function(t, e) {

		var n = e.oLanguage.sDecimal;

		return c(t, n, !0) ? "num-fmt" + n : null

	}, function(t, e) {

		var n = e.oLanguage.sDecimal;

		return f(t, n) ? "html-num" + n : null

	}, function(t, e) {

		var n = e.oLanguage.sDecimal;

		return f(t, n, !0) ? "html-num-fmt" + n : null

	}, function(t, e) {

		return s(t) || "string" == typeof t && -1 !== t.indexOf("<") ? "html" : null

	}]), U.extend(I.ext.type.search, {

		html: function(t) {

			return s(t) ? t : "string" == typeof t ? t.replace(a, " ").replace(r, "") : ""

		},

		string: function(t) {

			return s(t) ? t : "string" == typeof t ? t.replace(a, " ") : t

		}

	});

	var Re = function(t, e, n, a) {

		return 0 === t || t && "-" !== t ? (e && (t = u(t, e)), t.replace && (n && (t = t.replace(n, "")), a && (t = t.replace(

			a, ""))), 1 * t) : -1 / 0

	};



	function Pe(n) {

		U.each({

			num: function(t) {

				return Re(t, n)

			},

			"num-fmt": function(t) {

				return Re(t, n, l)

			},

			"html-num": function(t) {

				return Re(t, n, r)

			},

			"html-num-fmt": function(t) {

				return Re(t, n, r, l)

			}

		}, function(t, e) {

			p.type.order[t + n + "-pre"] = e, t.match(/^html\-/) && (p.type.search[t + n] = p.type.search.html)

		})

	}

	U.extend(p.type.order, {

		"date-pre": function(t) {

			var e = Date.parse(t);

			return isNaN(e) ? -1 / 0 : e

		},

		"html-pre": function(t) {

			return s(t) ? "" : t.replace ? t.replace(/<.*?>/g, "").toLowerCase() : t + ""

		},

		"string-pre": function(t) {

			return s(t) ? "" : "string" == typeof t ? t.toLowerCase() : t.toString ? t.toString() : ""

		},

		"string-asc": function(t, e) {

			return t < e ? -1 : e < t ? 1 : 0

		},

		"string-desc": function(t, e) {

			return t < e ? 1 : e < t ? -1 : 0

		}

	}), Pe(""), U.extend(!0, I.ext.renderer, {

		header: {

			_: function(o, i, l, s) {

				U(o.nTable).on("order.dt.DT", function(t, e, n, a) {

					if (o === e) {

						var r = l.idx;

						i.removeClass(l.sSortingClass + " " + s.sSortAsc + " " + s.sSortDesc).addClass("asc" == a[r] ? s.sSortAsc :

							"desc" == a[r] ? s.sSortDesc : l.sSortingClass)

					}

				})

			},

			jqueryui: function(o, i, l, s) {

				U("<div/>").addClass(s.sSortJUIWrapper).append(i.contents()).append(U("<span/>").addClass(s.sSortIcon + " " + l

					.sSortingClassJUI)).appendTo(i), U(o.nTable).on("order.dt.DT", function(t, e, n, a) {

					if (o === e) {

						var r = l.idx;

						i.removeClass(s.sSortAsc + " " + s.sSortDesc).addClass("asc" == a[r] ? s.sSortAsc : "desc" == a[r] ? s.sSortDesc :

							l.sSortingClass), i.find("span." + s.sSortIcon).removeClass(s.sSortJUIAsc + " " + s.sSortJUIDesc + " " +

							s.sSortJUI + " " + s.sSortJUIAscAllowed + " " + s.sSortJUIDescAllowed).addClass("asc" == a[r] ? s.sSortJUIAsc :

							"desc" == a[r] ? s.sSortJUIDesc : l.sSortingClassJUI)

					}

				})

			}

		}

	});

	var je = function(t) {

		return "string" == typeof t ? t.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : t

	};



	function Ne(e) {

		return function() {

			var t = [oe(this[I.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));

			return I.ext.internal[e].apply(this, t)

		}

	}

	return I.render = {

			number: function(o, i, l, s, u) {

				return {

					display: function(t) {

						if ("number" != typeof t && "string" != typeof t) return t;

						var e = t < 0 ? "-" : "",

							n = parseFloat(t);

						if (isNaN(n)) return je(t);

						n = n.toFixed(l), t = Math.abs(n);

						var a = parseInt(t, 10),

							r = l ? i + (t - a).toFixed(l).substring(2) : "";

						return e + (s || "") + a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, o) + r + (u || "")

					}

				}

			},

			text: function() {

				return {

					display: je,

					filter: je

				}

			}

		}, U.extend(I.ext.internal, {

			_fnExternApiFunc: Ne,

			_fnBuildAjax: dt,

			_fnAjaxUpdate: ht,

			_fnAjaxParameters: pt,

			_fnAjaxUpdateDraw: gt,

			_fnAjaxDataSrc: bt,

			_fnAddColumn: N,

			_fnColumnOptions: H,

			_fnAdjustColumnSizing: J,

			_fnVisibleToColumnIndex: q,

			_fnColumnIndexToVisible: T,

			_fnVisbleColumns: O,

			_fnGetColumns: k,

			_fnColumnTypes: w,

			_fnApplyColumnDefs: M,

			_fnHungarianMap: v,

			_fnCamelToHungarian: F,

			_fnLanguageCompat: L,

			_fnBrowserDetect: j,

			_fnAddData: W,

			_fnAddTr: E,

			_fnNodeToDataIndex: function(t, e) {

				return e._DT_RowIndex !== V ? e._DT_RowIndex : null

			},

			_fnNodeToColumnIndex: function(t, e, n) {

				return U.inArray(n, t.aoData[e].anCells)

			},

			_fnGetCellData: x,

			_fnSetCellData: B,

			_fnSplitObjNotation: z,

			_fnGetObjectDataFn: Y,

			_fnSetObjectDataFn: Z,

			_fnGetDataMaster: K,

			_fnClearTable: Q,

			_fnDeleteIndex: tt,

			_fnInvalidate: et,

			_fnGetRowElements: nt,

			_fnCreateTr: at,

			_fnBuildHead: ot,

			_fnDrawHead: it,

			_fnDraw: lt,

			_fnReDraw: st,

			_fnAddOptionsHtml: ut,

			_fnDetectHeader: ct,

			_fnGetUniqueThs: ft,

			_fnFeatureHtmlFilter: vt,

			_fnFilterComplete: St,

			_fnFilterCustom: mt,

			_fnFilterColumn: Dt,

			_fnFilter: yt,

			_fnFilterCreateSearch: _t,

			_fnEscapeRegex: Ct,

			_fnFilterData: xt,

			_fnFeatureHtmlInfo: Ft,

			_fnUpdateInfo: Lt,

			_fnInfoMacros: Rt,

			_fnInitialise: Pt,

			_fnInitComplete: jt,

			_fnLengthChange: Nt,

			_fnFeatureHtmlLength: Ht,

			_fnFeatureHtmlPaginate: Ot,

			_fnPageChange: kt,

			_fnFeatureHtmlProcessing: Mt,

			_fnProcessingDisplay: Wt,

			_fnFeatureHtmlTable: Et,

			_fnScrollDraw: Bt,

			_fnApplyToChildren: Ut,

			_fnCalculateColumnWidths: Xt,

			_fnThrottle: Jt,

			_fnConvertToWidth: qt,

			_fnGetWidestNode: Gt,

			_fnGetMaxLenString: $t,

			_fnStringToCss: zt,

			_fnSortFlatten: Yt,

			_fnSort: Zt,

			_fnSortAria: Kt,

			_fnSortListener: Qt,

			_fnSortAttachListener: te,

			_fnSortingClasses: ee,

			_fnSortData: ne,

			_fnSaveState: ae,

			_fnLoadState: re,

			_fnSettingsFromNode: oe,

			_fnLog: ie,

			_fnMap: le,

			_fnBindAction: ue,

			_fnCallbackReg: ce,

			_fnCallbackFire: fe,

			_fnLengthOverflow: de,

			_fnRenderer: he,

			_fnDataSource: pe,

			_fnRowAttributes: rt,

			_fnExtend: se,

			_fnCalculateEnd: function() {}

		}), ((U.fn.dataTable = I).$ = U).fn.dataTableSettings = I.settings, U.fn.dataTableExt = I.ext, U.fn.DataTable =

		function(t) {

			return U(this).dataTable(t).api()

		}, U.each(I, function(t, e) {

			U.fn.DataTable[t] = e

		}), U.fn.dataTable

});

! function(t) {

	"function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(e) {

		return t(e, window, document)

	}) : "object" == typeof exports ? module.exports = function(e, a) {

		return e || (e = window), a && a.fn.dataTable || (a = require("datatables.net")(e, a).$), t(a, e, e.document)

	} : t(jQuery, window, document)

}(function(h, e, n, s) {

	"use strict";

	var i = h.fn.dataTable;

	return h.extend(!0, i.defaults, {

		dom: "<'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>",

		renderer: "bootstrap"

	}), h.extend(i.ext.classes, {

		sWrapper: "dataTables_wrapper form-inline dt-bootstrap",

		sFilterInput: "form-control input-sm",

		sLengthSelect: "form-control input-sm",

		sProcessing: "dataTables_processing panel panel-default"

	}), i.ext.renderer.pageButton.bootstrap = function(o, e, d, a, l, c) {

		var u, p, t, f = new i.Api(o),

			b = o.oClasses,

			m = o.oLanguage.oPaginate,

			g = o.oLanguage.oAria.paginate || {},

			x = 0,

			w = function(e, a) {

				var t, n, s, i, r = function(e) {

					e.preventDefault(), h(e.currentTarget).hasClass("disabled") || f.page() == e.data.action || f.page(e.data.action)

						.draw("page")

				};

				for (t = 0, n = a.length; t < n; t++)

					if (i = a[t], h.isArray(i)) w(e, i);

					else {

						switch (p = u = "", i) {

							case "ellipsis":

								u = "&#x2026;", p = "disabled";

								break;

							case "first":

								u = m.sFirst, p = i + (0 < l ? "" : " disabled");

								break;

							case "previous":

								u = m.sPrevious, p = i + (0 < l ? "" : " disabled");

								break;

							case "next":

								u = m.sNext, p = i + (l < c - 1 ? "" : " disabled");

								break;

							case "last":

								u = m.sLast, p = i + (l < c - 1 ? "" : " disabled");

								break;

							default:

								u = i + 1, p = l === i ? "active" : ""

						}

						u && (s = h("<li>", {

							class: b.sPageButton + " " + p,

							id: 0 === d && "string" == typeof i ? o.sTableId + "_" + i : null

						}).append(h("<a>", {

							href: "#",

							"aria-controls": o.sTableId,

							"aria-label": g[i],

							"data-dt-idx": x,

							tabindex: o.iTabIndex

						}).html(u)).appendTo(e), o.oApi._fnBindAction(s, {

							action: i

						}, r), x++)

					}

			};

		try {

			t = h(e).find(n.activeElement).data("dt-idx")

		} catch (e) {}

		w(h(e).empty().html('<ul class="pagination"/>').children("ul"), a), t !== s && h(e).find("[data-dt-idx=" + t + "]")

			.focus()

	}, i

});

"use strict";



function loadLocales() {

	for (var e in $.locales) isEmpty($.locales[e]) || ($.currentLocale = $.locales[e] || Object.create(null))

}



function trans(e) {

	var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};

	isEmpty($.currentLocale) && loadLocales();

	var t = e.split("."),

		i = $.currentLocale || {};

	for (var r in t) {

		if (isEmpty(i[t[r]])) return e;

		i = i[t[r]]

	}

	for (var o in n) isEmpty(n[o]) || (i = i.replace(":" + o, n[o]));

	return i

}

$.locales = Object.create(null), $.currentLocale = Object.create(null), $.defaultPaginatorConfig = {

	visiblePages: 5,

	currentPage: 1,

	first: '<li><a style="cursor: pointer;">«</a></li>',

	prev: '<li><a style="cursor: pointer;">‹</a></li>',

	next: '<li><a style="cursor: pointer;">›</a></li>',

	last: '<li><a style="cursor: pointer;">»</a></li>',

	page: '<li><a style="cursor: pointer;">{{page}}</a></li>',

	wrapper: '<ul class="pagination pagination-sm no-margin"></ul>'

}, $(document).ready(function() {

	$("input").iCheck({

		radioClass: "iradio_square-blue",

		checkboxClass: "icheckbox_square-blue"

	}), $('[data-toggle="tooltip"]').tooltip(), swal.setDefaults({

		confirmButtonText: trans("general.confirm"),

		cancelButtonText: trans("general.cancel")

	})

});

var confirmLogout = function() {

	var e = _asyncToGenerator(regeneratorRuntime.mark(function e() {

		var n, t;

		return regeneratorRuntime.wrap(function(e) {

			for (;;) switch (e.prev = e.next) {

				case 0:

					return e.prev = 0, e.next = 3, swal({

						text: trans("general.confirmLogout"),

						type: "warning",

						showCancelButton: !0,

						confirmButtonText: trans("general.confirm"),

						cancelButtonText: trans("general.cancel")

					});

				case 3:

					e.next = 8;

					break;

				case 5:

					return e.prev = 5, e.t0 = e.catch(0), e.abrupt("return");

				case 8:

					return e.prev = 8, e.next = 11, logout();

				case 11:

					n = e.sent, t = n.msg, setTimeout(function() {

						return window.location = url()

					}, 1e3), swal({

						type: "success",

						html: t

					}), e.next = 20;

					break;

				case 17:

					e.prev = 17, e.t1 = e.catch(8), showAjaxError(e.t1);

				case 20:

				case "end":

					return e.stop()

			}

		}, e, this, [

			[0, 5],

			[8, 17]

		])

	}));

	return function() {

		return e.apply(this, arguments)

	}

}();



function _asyncToGenerator(e) {

	return function() {

		var s = e.apply(this, arguments);

		return new Promise(function(o, a) {

			return function n(e, t) {

				try {

					var i = s[e](t),

						r = i.value

				} catch (e) {

					return void a(e)

				}

				if (!i.done) return Promise.resolve(r).then(function(e) {

					n("next", e)

				}, function(e) {

					n("throw", e)

				});

				o(r)

			}("next")

		})

	}

}



function logout() {

	return fetch({

		type: "POST",

		url: url("auth/logout"),

		dataType: "json"

	})

}



function showMsg(e) {

	var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "info";

	$("[id=msg]").removeClass().addClass("callout").addClass("callout-" + n).html(e)

}



function showAjaxError(e) {

	return "string" == typeof e ? console.warn(e) : e.responseText ? void showModal(e.responseText.replace(/\n/g, "<br />"),

		trans("general.fatalError"), "danger") : console.warn("Empty Ajax response body.")

}



function showModal(e) {

	var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "Message",

		t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "default",

		i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {},

		r = "default" !== t ? "btn-outline" : "btn-primary",

		o = i.btnText || "OK",

		a = void 0 === i.callback ? 'data-dismiss="modal"' : 'onclick="' + i.callback + '"',

		s = !1 !== i.destroyOnClose;

	$('\n    <div class="modal modal-' + t +

		' fade in">\n        <div class="modal-dialog">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n                        <span aria-hidden="true">×</span>\n                    </button>\n                    <h4 class="modal-title">' +

		n + '</h4>\n                </div>\n                <div class="modal-body">\n                    <p>' + e +

		'</p>\n                </div>\n                <div class="modal-footer">\n                    <button type="button" ' +

		a + ' class="btn ' + r + '">' + o +

		"</button>\n                </div>\n            </div>\n        </div>\n    </div>").on("hidden.bs.modal", function() {

		s && $(this).remove()

	}).modal(i)

}



function initSkinViewer() {

	var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 70;

	disposeSkinViewer(), $.msp.viewer = new skinview3d.SkinViewer($.msp.config), $.msp.viewer.camera.position.z = e, $.msp

		.viewer.detectModel = !1, $.msp.viewer.playerObject.skin.slim = $.msp.config.slim, $.msp.viewer.animation = new skinview3d

		.CompositeAnimation, $.msp.handles.walk = $.msp.viewer.animation.add(skinview3d.WalkingAnimation), $.msp.handles.run =

		$.msp.viewer.animation.add(skinview3d.RunningAnimation), $.msp.handles.rotate = $.msp.viewer.animation.add(skinview3d

			.RotatingAnimation), $.msp.handles.run.paused = !0, $.msp.control = skinview3d.createOrbitControls($.msp.viewer)

}



function applySkinViewerConfig(e) {

	for (var n in e = e || $.msp.config) $.msp.viewer[n] = e[n]

}



function disposeSkinViewer() {

	$.msp.viewer instanceof skinview3d.SkinViewer && ($.msp.viewer.dispose(), $.msp.handles = {}, $.msp.control = void 0)

}



function registerAnimationController() {

	$(".fa-pause").click(function() {

		$.msp.viewer.animationPaused = !$.msp.viewer.animationPaused, $(this).toggleClass("fa-pause").toggleClass("fa-play")

	}), $(".fa-forward").click(function() {

		$.msp.handles.run.paused = !$.msp.handles.run.paused, $.msp.handles.walk.paused = !$.msp.handles.run.paused

	}), $(".fa-repeat").click(function() {

		return $.msp.handles.rotate.paused = !$.msp.handles.rotate.paused

	}), $(".fa-stop").click(function() {

		for (var e in initSkinViewer(), $.msp.handles) $.msp.handles[e].paused = !0

	})

}



function registerWindowResizeHandler() {

	$(window).resize(function() {

		$.msp.viewer.width = $("#preview-3d-container").width(), $.msp.viewer.height = $("#preview-3d-container").height()

	})

}

$("#logout-button").click(confirmLogout), String.prototype.includes || (String.prototype.includes = function(e) {

	return !!~this.indexOf(e, 1 < arguments.length ? arguments[1] : void 0)

}), String.prototype.endsWith || (String.prototype.endsWith = function(e, n) {

	var t = this.toString();

	("number" != typeof n || !isFinite(n) || Math.floor(n) !== n || n > t.length) && (n = t.length), n -= e.length;

	var i = t.lastIndexOf(e, n);

	return -1 !== i && i === n

}), $.msp = {}, $.msp.handles = {}, $.msp.control = null, $.msp.config = {

	domElement: document.getElementById("preview-3d-container"),

	slim: !1,

	width: $("#preview-3d-container").width(),

	height: $("#preview-3d-container").height(),

	skinUrl: "",

	capeUrl: ""

};

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {

	return typeof e

} : function(e) {

	return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e

};



function isEmpty(e) {

	if (null == e) return !0;

	if ("number" == typeof e || "boolean" == typeof e) return !1;

	if (0 < e.length) return !1;

	if (0 === e.length) return !0;

	if ("object" !== (void 0 === e ? "undefined" : _typeof(e))) return !0;

	for (var n in e)

		if (hasOwnProperty.call(e, n)) return !1;

	return !0

}



function fetch(e) {

	return Promise.resolve($.ajax(e))

}



function getQueryString(e, n) {

	var t = location.search.match(new RegExp("[?&]" + e + "=([^&]+)", "i"));

	return null === t || t.length < 1 ? n : t[1]

}



function isMobileBrowserScrolling() {

	var e = $(window).width(),

		n = $(window).height();

	void 0 === $.cachedWindowWidth && ($.cachedWindowWidth = e), void 0 === $.cachedWindowHeight && ($.cachedWindowHeight =

		n);

	var t = e !== $.cachedWindowWidth,

		i = n !== $.cachedWindowHeight;

	if (t && i) return !1;

	if (t) return !1;

	if (i) {

		var r = $.lastWindowHeight;

		if ($.lastWindowHeight = n, void 0 === r || n === r) return !0

	}

	return !1

}



function debounce(e, n) {

	var t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : [],

		i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : void 0;

	if (isNaN(n) || "function" != typeof e) throw new Error('Arguments type of function "debounce" is incorrect!');

	var r = null;

	return function() {

		clearTimeout(r), r = setTimeout(function() {

			e.apply(i, t)

		}, n)

	}

}



function url() {

	var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";

	return blessing.base_url = blessing.base_url || "", "/" !== e[0] && (e = "/" + e), blessing.base_url + e

}

$.ajaxSetup({

	headers: {

		"X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")

	}

});

