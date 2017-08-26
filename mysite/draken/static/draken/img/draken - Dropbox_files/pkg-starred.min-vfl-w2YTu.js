define("modules/clean/react/home/api",["require","exports","tslib","modules/clean/ajax","modules/clean/api_v2/client","modules/core/exception","modules/clean/web_timing_logger"],function(e,t,r,a,o,i,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=Promise.resolve({});t.makeRequest=function(e,t){void 0===t&&(t={});var o,n=function(o,n){(t.isBackground?a.SilentBackgroundRequest:a.WebRequest)(r.__assign({dataType:"json",success:o,error:function(r,a,o){var s=e&&e.url||"no url";i.reportStack("makeRequest to '"+s+"' failed",{severity:i.SEVERITY.NONCRITICAL,exc_extra:{errorThrown:o,textStatus:a,requestParams:e,requestOptions:t,exc_grouping:"homeapi:{$url}"}}),n(Error(o+" ("+s+")"))}},e))};return t.useQueue?(o=new Promise(function(e,t){s.finally(function(){n(e,t)})}),s=o):o=new Promise(function(e,t){n(e,t)}),o},t.logHomeActivity=function(e){var r=e.entryType,a=e.eventName,o=e.extra,i=e.role;Object.keys(o).forEach(function(e){return o[e]=String(o[e])});var s=window.performance&&window.performance.timing?window.performance.timing.navigationStart||window.performance.timing.fetchStart:void 0;return new Promise(function(e,d){n.waitForTTI().then(function(){t.makeRequest({url:"/home_feed/log_activity",type:"POST",data:{entry_type:r,event_name:a,extra:JSON.stringify(o),role:i,page_start_ts:s}},{isBackground:!0}).then(e,d)})})},t.setSectionVisibility=function(e,t,r){return(new o.ApiV2Client).rpc(e,"home/set_section_visibility",{section:t,visible:r})},t.createPaperDoc=function(e){return(new o.ApiV2Client).upload(e,"paper/docs/create",{import_format:"plain_text"},"")}}),define("modules/clean/react/home/starred/constants",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.StarredResourceActionTypes={LOADING_INITIAL:"HOME_STARRED_LOADING_INITIAL",LOADING_ALL:"HOME_STARRED_LOADING_ALL",LOAD_SUCCESS:"HOME_STARRED_LOAD_SUCCESS",LOAD_FAILURE:"HOME_STARRED_LOAD_FAILURE",HIDE_EMPTY_SECTION:"HOME_STARRED_HIDE_EMPTY_SECTION"},t.NOT_PAPER_USER_ERROR="not_paper_user",t.NUM_ACTIVITIES_PER_ITEM=5,t.StarredLoggingTypes={CLICK_STAR:"click_star",CLICK_UNSTAR:"click_unstar"}}),define("modules/clean/react/starred/actions",["require","exports","modules/clean/flux/dispatcher","modules/clean/react/starred/constants","modules/constants/home","modules/clean/react/starred/api","modules/clean/react/starred/model"],function(e,t,r,a,o,i,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=(function(){function e(){}return e.fetchStatuses=function(t,o,s){return void 0===s&&(s=!1),s||e.markAsLoading(o),i.fetchStatuses(t,o).then(function(e){r.dispatch({type:a.StarredActionTypes.SET_STATUS,starredStatuses:n.statusResultsToStarredStatuses(e)})}).catch(function(e){return r.dispatch({type:a.StarredActionTypes.LOAD_FAILURE,idTypePairs:o}),Promise.reject(e)})},e.markAsLoading=function(e){r.dispatch({type:a.StarredActionTypes.LOADING,idTypePairs:e})},e.renameExternalResource=function(e,t,o){r.dispatch({type:a.StarredActionTypes.RENAME_EXTERNAL_RESOURCE,id:e,name:o});var n=i.updateExternalResource(e,o,!0);return n.catch(function(o){throw r.dispatch({type:a.StarredActionTypes.RENAME_EXTERNAL_RESOURCE,id:e,name:t}),o}),n},e.update=function(e,t,n,s,d,c){var u={id:t,type:n};r.dispatch({type:a.StarredActionTypes.LOADING,idTypePairs:[u]});var p,l;if(n===a.IdTypes.EXTERNAL_RESOURCE_ID){if(null===d||void 0===d)throw new TypeError("Name of external resource cannot be null/undefined");l=i.updateExternalResource(t,d,s,c)}else l=i.update(e,t,n,s);return l.then(function(){return p=s}).catch(function(e){throw p=!s,e}).finally(function(){r.dispatch({type:a.StarredActionTypes.SET_STATUS,starredStatuses:[{idTypePair:{id:t,type:n},starred:p}]});var e={url:t,name:d,isStarred:s};window.chrome&&(o.IS_PROD?window.chrome.runtime.sendMessage(a.StarExtensionId_PROD,e):window.chrome.runtime.sendMessage(a.StarExtensionId_DEV,e))}),l},e})();t.StarredActions=s}),define("modules/clean/react/starred/api",["require","exports","modules/clean/ajax"],function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e,t){var a=function(a,o){r.WebRequest({url:e,type:"POST",dataType:"json",data:t,success:a,error:function(e,t,r){return o(Error(r))}})};return new Promise(function(e,t){a(e,t)})};t.fetchStatuses=function(e,t){return a("/starred/get_status",{role:e,resources_json:JSON.stringify(t)})},t.update=function(e,t,r,o){return a("/starred/update",{role:e,resource_id:t,id_type:r,is_starred:o})},t.updateExternalResource=function(e,t,r,o){return a("/starred/update_external_resource",{url:e,name:t,is_starred:r,favicon_url:o})}}),define("modules/clean/react/starred/constants",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.StarredLoadingState={LOADING:"LOADING",LOAD_SUCCESS:"LOAD_SUCCESS",LOAD_FAILED:"LOAD_FAILED"},t.StarredActionTypes={LOADING:"STARRED_LOADING",SET_STATUS:"STARRED_SET_STATUS",LOAD_FAILURE:"STARRED_LOAD_FAILURE",RENAME_EXTERNAL_RESOURCE:"STARRED_RENAME_EXTERNAL_RESOURCE"},t.IdTypes={ENCODED_FILE_OBJ_ID:"ENCODED_FILE_OBJ_ID",EXTERNAL_RESOURCE_ID:"EXTERNAL_RESOURCE_ID",PAPER_ID_PATH:"PAPER_ID_PATH"},t.StarExtensionId_DEV="bkoifdjjfabbedgjlkmkcabdpajmmlhd",t.StarExtensionId_PROD="hjdobpfegefofikebjlabkpjlndkfefg"}),define("modules/clean/react/starred/id_type_pair",["require","exports"],function(e,t){"use strict";function r(e){return e.type+":"+e.id}function a(e){return e.slice(e.indexOf(":")+1)}Object.defineProperty(t,"__esModule",{value:!0}),t.idTypePairToString=r,t.idFromIdTypePairString=a}),define("modules/clean/react/starred/model",["require","exports"],function(e,t){"use strict";function r(e){return e.map(function(e){var t=e.id,r=e.type,a=e.is_starred,o=e.canonical_id,i=e.canonical_id_type,n={idTypePair:{id:t,type:r},starred:a};return o&&i&&(n.canonicalIdTypePair={id:o,type:i}),n})}Object.defineProperty(t,"__esModule",{value:!0}),t.statusResultsToStarredStatuses=r}),define("modules/clean/react/starred/star",["require","exports","tslib","external/classnames","external/react","modules/clean/react/starred/starred_activity_logger","modules/clean/react/css","modules/clean/react/starred/actions","modules/clean/react/starred/store","modules/clean/react/title_bubble","modules/core/i18n","modules/core/notify","external/spectrum/icon_star"],function(e,t,r,a,o,i,n,s,d,c,u,p,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var S=(function(e){function t(t){var r=e.call(this,t)||this;return r.onStoreUpdate=function(){var e=r.getStateFromStore();r.setState(e)},r.onClick=function(e){if(e.stopPropagation(),e.preventDefault(),!r.state.isLoading){var t=!r.state.isStarred;t?i.starredActivityLogger.logClickStar(r.props.id,r.props.idType,r.props.role):i.starredActivityLogger.logClickUnstar(r.props.id,r.props.idType,r.props.role),r.props.onStarClick&&r.props.onStarClick(t),s.StarredActions.update(r.props.role,r.props.id,r.props.idType,t,r.props.itemName).catch(function(e){var a;a=r.props.itemName?t?u._("There was a problem starring %(item_name)s").format({item_name:r.props.itemName}):u._("There was a problem unstarring %(item_name)s").format({item_name:r.props.itemName}):t?u._("There was a problem starring your selection"):u._("There was a problem unstarring your selection"),p.error(a)})}},r.state=r.getStateFromStore(),r.removeStoreListener=d.StarredStore.addListener(r.onStoreUpdate),r}return r.__extends(t,e),t.prototype.componentWillUnmount=function(){this.removeStoreListener&&this.removeStoreListener()},t.prototype.componentWillReceiveProps=function(e){this.props.id===e.id&&this.props.idType===e.idType||this.setState(this.getStateFromStore(e))},t.prototype.getStateFromStore=function(e){void 0===e&&(e=this.props);var t={id:e.id,type:e.idType};return{isLoading:d.StarredStore.getIsLoading(t),isStarred:d.StarredStore.getIsStarred(t)}},t.prototype.getTooltipContent=function(){return this.state.isStarred?u._("Remove from Starred"):u._("Add to Starred")},t.prototype.render=function(){if(void 0===this.state.isStarred)return null;var e={star__toggle:!0,"star__toggle--starred":this.state.isStarred,"star__toggle--unstarred":!this.state.isStarred,"star__toggle--loading":this.state.isLoading};return o.createElement(c,{content:this.getTooltipContent(),position:this.props.tooltipPosition},o.createElement("button",{className:a(e),role:"button","aria-pressed":this.state.isStarred,"aria-label":"Star",onClick:this.onClick,onDoubleClick:this.onClick},o.createElement(l.IconStar,{selected:this.state.isStarred||this.state.isLoading})))},t})(o.PureComponent);S.displayName="Star",S.defaultProps={tooltipPosition:c.POSITIONS.TOP},t.Star=n(S,["/static/css/starred/star-vflHUNi2H.css"])}),define("modules/clean/react/starred/starred_activity_logger",["require","exports","modules/clean/react/home/api","modules/clean/react/home/starred/constants"],function(e,t,r,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=(function(){function e(){}return e.prototype.logClickStar=function(e,t,o){return r.logHomeActivity({eventName:a.StarredLoggingTypes.CLICK_STAR,role:o,extra:{resource_id:e,id_type:t}})},e.prototype.logClickUnstar=function(e,t,o){return r.logHomeActivity({eventName:a.StarredLoggingTypes.CLICK_UNSTAR,role:o,extra:{resource_id:e,id_type:t}})},e})();t.StarredActivityLogger=o,t.starredActivityLogger=new o}),define("modules/clean/react/starred/store",["require","exports","tslib","external/underscore","modules/clean/flux/dispatcher","modules/clean/flux/flux_store","modules/clean/react/starred/constants","modules/clean/react/home/starred/constants","modules/clean/react/starred/id_type_pair"],function(e,t,r,a,o,i,n,s,d){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=(function(e){function t(){var t=e.call(this,o)||this;return t.idsToLoadingState={},t.idsToStarred={},t}return r.__extends(t,e),t.prototype.getLoadingStates=function(){return this.idsToLoadingState},t.prototype.hasIdTypePair=function(e){return this.idsToLoadingState.hasOwnProperty(d.idTypePairToString(e))},t.prototype.getLoadingState=function(e){return this.idsToLoadingState[d.idTypePairToString(e)]},t.prototype.getIsStarred=function(e){return this.idsToStarred[d.idTypePairToString(e)]},t.prototype.getAllStarredPairStrings=function(){return a.keys(a.pick(this.idsToStarred,function(e){return e}))},t.prototype.getIsLoading=function(e){return this.getLoadingState(e)===n.StarredLoadingState.LOADING},t.prototype.onLoading=function(e){var t={};e.forEach(function(e){return t[d.idTypePairToString(e)]=n.StarredLoadingState.LOADING}),this.idsToLoadingState=r.__assign({},this.idsToLoadingState,t)},t.prototype.onSetStatus=function(e){void 0===e&&(e=[]);var t={},a={};e.forEach(function(e){var r=d.idTypePairToString(e.idTypePair);t[r]=n.StarredLoadingState.LOAD_SUCCESS,a[r]=e.starred}),this.idsToLoadingState=r.__assign({},this.idsToLoadingState,t),this.idsToStarred=r.__assign({},this.idsToStarred,a)},t.prototype.onLoadFailure=function(e){var t=this,a={};e.forEach(function(e){var r=d.idTypePairToString(e),o=t.idsToLoadingState[r];void 0!==o&&o!==n.StarredLoadingState.LOADING||(a[r]=n.StarredLoadingState.LOAD_FAILED)}),this.idsToLoadingState=r.__assign({},this.idsToLoadingState,a)},t.prototype.__onDispatch=function(e){var t=e.action;switch(t.type){case n.StarredActionTypes.LOADING:this.onLoading(t.idTypePairs);break;case n.StarredActionTypes.SET_STATUS:case s.StarredResourceActionTypes.LOAD_SUCCESS:this.onSetStatus(t.starredStatuses);break;case n.StarredActionTypes.LOAD_FAILURE:this.onLoadFailure(t.idTypePairs);break;default:return}this.__emitChange()},t})(i);t._StarredStoreClass=c,t.StarredStore=new c});
//# sourceMappingURL=pkg-starred.min.js-vflYgNwAM.map