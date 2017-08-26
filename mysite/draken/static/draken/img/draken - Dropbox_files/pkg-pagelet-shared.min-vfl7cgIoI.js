define("modules/clean/pagelet_logger",["require","exports","modules/core/browser","modules/clean/js_client_stopwatch","modules/clean/web_timing_logger"],function(e,t,o,n,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=(function(){function e(e,t,i,a){void 0===t&&(t=[]),void 0===i&&(i=!1),void 0===a&&(a={});var r=this;if(this.pageletName=e,i){var s=o.performance();s&&s.now&&(this.performance=s,this.stopwatchName=this.pageletName+"_client_logging",n.JSStopwatch.create_stopwatch_if_not_exist(this.stopwatchName))}else this.stopwatchName=void 0;this.ttiComponents=[],t.map(function(e){r.ttiComponents.push({name:e,isReady:!1})}),this.ttiMarked=!1,this.extraColumns=a}return e.prototype.componentReady=function(e){if(!this.ttiMarked){for(var t=!1,o=0;o<this.ttiComponents.length;++o)this.ttiComponents[o].name!==e||this.ttiComponents[o].isReady?this.ttiComponents[o].isReady||(t=!0):(this.ttiComponents[o].isReady=!0,n.JSStopwatch.recordTrace(e+"_since_start",{stopwatchName:this.stopwatchName}));t||(i.mark_time_to_interactive(this.extraColumns),this.ttiMarked=!0)}},Object.defineProperty(e.prototype,"ttiLogged",{get:function(){return this.ttiMarked},enumerable:!0,configurable:!0}),e})();t.PageletLogger=a}),define("modules/clean/photos/thumbnail_url_util",["require","exports","external/underscore","modules/constants/python","modules/core/exception","modules/core/uri"],function(e,t,o,n,i,a){"use strict";function r(e,n,r,s){i.assert(null!=n==(null!=r),"Width and height must both be specified or neither");var u={};if(null==n)i.assert(s===t.ThumbnailSizeMode.ORIGINAL||null===s,"You must supply width and height");else{var h=n+"x"+r;i.assert(l.indexOf(h)>-1,"Invalid thumbnail size ("+h+")"),u.size=h}return null!=s&&(i.assert(o.values(t.ThumbnailSizeMode).indexOf(s)>-1,"Invalid thumbnail size mode ("+s+")"),u.size_mode=s.toString()),a.parse(e).updateQuery(u).toString()}function s(e){return a.parse(e).updateQuery({size_mode:t.ThumbnailSizeMode.ORIGINAL.toString()}).toString()}Object.defineProperty(t,"__esModule",{value:!0}),t.ThumbnailSizeMode=n.THUMBNAIL_SIZE_MODE;var l=n.THUMBNAIL_SIZES;t.thumbnailUrlForSize=r,t.fullSizeUrl=s}),define("modules/clean/sharing/async_share_modal_util",["require","exports"],function(e,t){"use strict";function o(t){e(["modules/clean/sharing/share_modal_util"],t)}function n(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];o(function(t){t.showFastrakShareModalIfAllowed.apply(t,e)})}function i(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];o(function(t){t.showNewFolderShareModal.apply(t,e)})}function a(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];o(function(t){t.showSharedContentLinkSyncModal.apply(t,e)})}function r(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];o(function(t){t.showShareModal.apply(t,e)})}function s(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];o(function(t){t.showPrefilledShareModal.apply(t,e)})}Object.defineProperty(t,"__esModule",{value:!0}),t.asyncShowFastrakShareModalIfAllowed=n,t.asyncShowNewFolderShareModal=i,t.asyncShowSharedContentLinkSyncModal=a,t.asyncShowShareModal=r,t.asyncShowPrefilledShareModal=s});
//# sourceMappingURL=pkg-pagelet-shared.min.js-vflfa7wA4.map