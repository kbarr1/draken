(function(){var e=[].indexOf||function(e){for(var i=0,t=this.length;i<t;i++)if(i in this&&this[i]===e)return i;return-1};define("modules/clean/account/change_email_modals",["jquery","external/react","external/react-dom","modules/core/notify","modules/core/i18n","modules/clean/form","modules/clean/account/email_verify_reasons","modules/clean/account/set_password_modal","modules/clean/react/input","modules/clean/react/modal","modules/clean/viewer"],function(i,t,s,r,n,o,a,l,u,m,c){var d,h,p,f,g,_,y,v,b,w,C,E;return v=n._,C=n.render_sentences,E=n.ungettext,_=l.SetPasswordModal,f=m.Modal,w=t.DOM,b=t.createElement,y=t.createFactory(u.text),g=t.createFactory(u.password),p=[a.ADD_COMMENT,a.SUBSCRIBE_TO_COMMENTS,a.SHARE_FILEVIEWER],h=t.createClass({displayName:"ChangeEmailWarningModal",propTypes:{user:t.PropTypes.object,inboxCount:t.PropTypes.number,onContinue:t.PropTypes.func},render:function(){return b(f,{title:v("Warning!"),acceptButtonText:v("Continue anyway"),dismissButtonText:v("Cancel"),onAccept:this.showChange,ref:"modal",style:"default-maestro"},this.getSSOWarning(),this.getInboxWarning())},getSSOWarning:function(){var e,i,t;return e=c.get_viewer().is_paired,t=e&&"work"===this.props.user.role,i=this.props.user.sso_required,t&&i?w.div({className:"db-modal-message"},v("Your %(team)s Dropbox uses single sign-on. If you change your email address you may not be able to sign in.").format({team:c.get_viewer().team_name})):null},getInboxWarning:function(){var e;return e=c.get_viewer().is_paired,0===this.props.inboxCount?null:e&&"personal"===this.props.user.role?w.div({className:"db-modal-message"},E("Your %(num)d existing shared folder invitation in your personal Dropbox will be removed if you change your email address.","Your %(num)d existing shared folder invitations in your personal Dropbox will be removed if you change your email address.",this.props.inboxCount).format({num:this.props.inboxCount})):e&&"work"===this.props.user.role?w.div({className:"db-modal-message"},E("Your %(num)d existing shared folder invitation in your %(team)s Dropbox will be removed if you change your email address.","Your %(num)d existing shared folder invitations in your %(team)s Dropbox will be removed if you change your email address.",this.props.inboxCount).format({num:this.props.inboxCount,team:c.get_viewer().team_name})):w.div({className:"db-modal-message"},E("Your %(num)d existing shared folder invitation will be removed if you change your email address.","Your %(num)d existing shared folder invitations will be removed if you change your email address.",this.props.inboxCount).format({num:this.props.inboxCount}))},showChange:function(e){var i,t;return e.preventDefault(),t=this.refs.modal,t.close(),"function"==typeof(i=this.props).onContinue?i.onContinue():void 0}}),d=t.createClass({displayName:"ChangeEmailModal",propTypes:{user:t.PropTypes.object,onChange:t.PropTypes.func,onVerificationCheck:t.PropTypes.func,fromCheckup:t.PropTypes.bool,reason:t.PropTypes.string},getInitialState:function(){return{submitting:!1,errors:{},userConfirmedSetPassword:!1}},render:function(){var i;return this.props.user.has_never_set_password&&!this.state.userConfirmedSetPassword?b(_,{email:this.props.user.email,reason:v("For your security, Dropbox requires you to set a password to change your email."),onUserConfirm:(function(e){return function(){return e.setState({userConfirmedSetPassword:!0})}})(this),closeOnConfirm:!1}):(i=this.props.reason,e.call(p,i)>=0?b(f,{title:v("Update ‘%(email)s’").format({email:this.props.user.email}),className:"change-email-modal--maestro",acceptButtonText:v("Update email"),dismissButtonText:v("Cancel"),onAccept:this.handleSubmit,submitting:this.state.submitting,ref:"modal",style:"default-maestro"},w.form({action:"/account/change_email",className:"change-email-form",onSubmit:this.handleSubmit,onKeyDown:this.handleKey,ref:"form"},w.div({className:"change-email-message"},this.getPrompt()),w.div({className:"change-email-inputs"},w.div({className:"change-email-input"},w.div({className:"change-email-input-label"},v("New email",{comment:"'email' refers to the email address"})),y({name:"email",label:v("you@mail.com"),error:this.state.errors.email,autoComplete:"off"})),w.div({className:"change-email-input"},w.div({className:"change-email-input-label"},v("Confirm email",{comment:"'email' refers to the email address"})),y({name:"confirm_email",label:v("you@mail.com"),error:this.state.errors.confirm_email,autoComplete:"off"})),w.div({className:"change-email-input"},w.div({className:"change-email-input-label"},v("Dropbox password")),g({name:"password",label:v("Minimum 5 characters"),error:this.state.errors.password,autoComplete:"off"})),w.input({type:"hidden",name:"_subject_uid",value:this.props.user.id}),w.input({type:"hidden",name:"from_checkup",value:!!this.props.fromCheckup})))):b(f,{title:v("Update ‘%(email)s’").format({email:this.props.user.email}),className:"change-email-modal",acceptButtonText:v("Update email"),dismissButtonText:v("Cancel"),onAccept:this.handleSubmit,submitting:this.state.submitting,ref:"modal"},w.form({action:"/account/change_email",className:"change-email-form",onSubmit:this.handleSubmit,onKeyDown:this.handleKey,ref:"form"},w.div({},this.getPrompt()),w.div({className:"change-email-inputs"},y({name:"email",label:v("New email",{comment:"'email' refers to the email address"}),error:this.state.errors.email,autoComplete:"off"}),y({name:"confirm_email",label:v("Confirm email",{comment:"'email' refers to the email address"}),error:this.state.errors.confirm_email,autoComplete:"off"}),g({name:"password",label:v("Dropbox password"),error:this.state.errors.password,autoComplete:"off"}),w.input({type:"hidden",name:"_subject_uid",value:this.props.user.id}),w.input({type:"hidden",name:"from_checkup",value:!!this.props.fromCheckup})))))},handleKey:function(e){var i;if(13===e.keyCode&&"INPUT"===(null!=(i=e.target)?i.tagName:void 0))return this.handleSubmit(e)},handleSubmit:function(e){if(e.preventDefault(),!this.state.submitting)return this.submit()},submit:function(e){var t;return this.setState({submitting:!0,errors:{}}),t=i(s.findDOMNode(this.refs.form)),o.submit(t,this._success,this._error,this._complete)},_success:function(e){var t,r,n,o,a,l;return a=this.refs.modal,o=this.refs.form,n=i(s.findDOMNode(o)).find('input[name="email"]').val(),l="NEEDS_VERIFICATION"===e,a.close(),l?"function"==typeof(t=this.props).onVerificationCheck?t.onVerificationCheck(n):void 0:"function"==typeof(r=this.props).onChange?r.onChange(n):void 0},_error:function(e){return"string"==typeof e?r.error(e):e?this.setState({errors:e}):r.error(v("There was a problem completing this request."))},_complete:function(){if(this.isMounted())return this.setState({submitting:!1})},getPrompt:function(){var e,i,t;return e=c.get_viewer().is_paired,t=this.props.user.email_verified,i=[],e&&"personal"===this.props.user.role?(i.push(v("Enter a new email address for your personal Dropbox.")),t&&i.push(v("You’ll need to verify your new email address in order to finish updating your personal email."))):e&&"work"===this.props.user.role?(i.push(v("Enter a new email address for your %(team)s Dropbox.").format({team:c.get_viewer().team_name})),t&&i.push(v("You’ll need to verify your new email address in order to finish updating your %(team)s email.").format({team:c.get_viewer().team_name}))):t&&i.push(v("You’ll need to verify your new email address in order to finish updating your email.")),i.length?C(i):""}}),{ChangeEmailWarningModal:h,ChangeEmailModal:d}})}).call(this),function(){define("modules/clean/account/email",["jquery","external/classnames","external/react","modules/core/browser","modules/core/notify","modules/core/i18n","modules/core/uri","modules/clean/ajax","modules/clean/account/change_email_modals","modules/clean/account/email_verify","modules/clean/account/verify_email_modals","modules/clean/react/modal","modules/clean/viewer"],function(e,i,t,s,r,n,o,a,l,u,m,c,d){var h,p,f,g,_,y,v,b,w,C,E,k,S,x;return k=n._,f=l.ChangeEmailModal,g=l.ChangeEmailWarningModal,C=m.VerifyEmailModal,w=m.ResendVerifyEmailModal,E=m.VerifyEmailSentModal,v=m.EmailVerifiedModal,_=m.ChangedEmailVerifiedModal,b=c.Modal,S=t.createElement,y=(function(){function e(e){var i;this.role=e,this.role?this.user=d.get_viewer().get_user_by_role(this.role,!0):this.user=d.get_viewer().deprecated_first_user_in_the_cookie,this.email_to_verify=null!=(i=this.user)?i.email:void 0,this.verify_for_change=!1}return e.prototype.polling=!1,e.prototype.show_resend=!1,e.shouldUseSimpleUI=!1,e.getForRole=function(i){return this.initalized||(this.legacy=new e(null),this.personal=new e("personal"),this.work=new e("work"),null!=this.reason&&this.propagate_reason(),this.initalized=!0),"personal"===i?this.personal:"work"===i?this.work:this.legacy},e.get_for_user=function(e){return this.getForRole(e.role)},e.set_should_use_simple_ui=function(e){return this.shouldUseSimpleUI=e},e.reset=function(){return this.shouldUseSimpleUI=!1,this.initalized=!1},e.set_reason=function(e){if(this.reason=e,this.initalized)return this.propagate_reason()},e.propagate_reason=function(){var e,i,t,s,r;for(t=[this.legacy,this.personal,this.work],s=[],e=0,i=t.length;e<i;e++)r=t[e],s.push(r.reason=this.reason);return s},e.prototype.set_email_to_verify=function(e){return this.email_to_verify=e,this.verify_for_change=this.email_to_verify!==this.user.email},e.prototype.send_email=function(e,i){return u.send_verification_email(this.user,this.email_to_verify,e,i)},e.prototype.send_email_and_show_resend_modal=function(e,i){return this.send_email(e,(function(t){return function(){return t.email_sent(i,e,!0)}})(this))},e.prototype.flash_email_sent_notification=function(){return r.success(k("Verification email sent to %(email)s").format({email:this.email_to_verify}))},e.prototype.ensure_polling=function(e){return u.listen_for_verification(this.user,this.email_to_verify,(function(i){return function(){return null!=e?(i.user.is_email_verified=!0,e()):s.reload()}})(this))},e.prototype.email_sent=function(e,i,t){return this.show_resend=!0,this.show(null,i),t&&this.flash_email_sent_notification(),this.ensure_polling(e)},e.prototype.show=function(i,t){return null!=t&&e.set_reason(t),this.show_resend?this.show_resend_verify_modal(t):this.show_verify_modal(i,t)},e.prototype.show_verify_modal=function(i,t){return null==t&&(t=this.verify_for_change?"change_email":this.reason),b.showInstance(S(C,{user:this.user,reason:t,email:this.email_to_verify,onShowChange:(function(e){return function(){return p.show(e.user,t)}})(this),onEmailSent:(function(s){return function(){var r;return r=e.get_for_user(s.user),r.email_sent(i,t,!0)}})(this),shouldUseSimpleUI:e.shouldUseSimpleUI}))},e.prototype.show_resend_verify_modal=function(i){return null==i&&(i=this.verify_for_change?"change_email":this.reason),b.showInstance(S(w,{user:this.user,email:this.email_to_verify,reason:i,onShowChange:(function(e){return function(){return p.show(e.user,i)}})(this),onEmailSent:(function(i){return function(){var t;return t=e.get_for_user(i.user),t.email_sent(null,null,!0)}})(this),shouldUseSimpleUI:e.shouldUseSimpleUI}))},e.prototype.verified_or_send_and_show=function(e,i){return this.user.is_email_verified?("function"==typeof i&&i(),!0):(this.send_email(e,(function(t){return function(){return t.email_sent(function(){return t.close(),"function"==typeof i?i():void 0},e)}})(this)),!1)},e.prototype.verified_or_show=function(e){return!!this.user.is_email_verified||(this.show(null,e=e),!1)},e.prototype.show_sent_modal=function(){return b.showInstance(S(E,{email:this.email_to_verify,shouldUseSimpleUI:e.shouldUseSimpleUI}))},e.prototype.show_verified_modal=function(){return b.showInstance(S(v,{reason:e.REASON,email:this.email_to_verify,shouldUseSimpleUI:e.shouldUseSimpleUI}))},e.prototype.show_verified_and_changed_modal=function(){return b.showInstance(S(_,{user:this.user,email:this.email_to_verify}))},e.prototype.close=function(){return b.close()},e})(),p={inbox_counts:{},set_inbox_counts:function(i){return e.extend(this.inbox_counts,i)},show:function(e,i){var t;return t=d.get_viewer().get_user_by_id(e),this._should_show_warning(t)?this._show_warning_modal(t,i):this._show_change_modal(t,i)},_should_show_warning:function(e){var i,t,s,r;return t=d.get_viewer().is_paired,r=t&&"work"===e.role,s=r&&e.sso_required,i=this.inbox_counts[e.id]>0,s||i},_show_change_modal:function(e,i){return b.showInstance(S(f,{user:e,reason:i,onChange:(function(i){return function(i){return p.trigger_change(e,i),"/account"!==o.parse(s.get_href()).path?s.redirect("/home?send_verification_email=1"):i!==e.email?s.reload():void 0}})(this),onVerificationCheck:(function(t){return function(t){var s;return p.trigger_change(e,t,e.is_email_verified),s=y.get_for_user(e),s.set_email_to_verify(t),s.email_sent(null,i,!0)}})(this)}))},_show_warning_modal:function(e,i){return b.showInstance(S(g,{user:e,inboxCount:this.inbox_counts[e.id],onContinue:(function(t){return function(){return t._show_change_modal(e,i)}})(this)}))},listen_for_change:function(i,t){var s;return s=this._email_change_event_for_user(i),e(document).on(s,t)},trigger_change:function(i,t,s){var r;return r=this._email_change_event_for_user(i),e(document).trigger(r,[t,s])},_email_change_event_for_user:function(e){return"db:email_changed:"+e.id}},x=t.DOM,h=t.createClass({displayName:"AccountPageEmailBlock",propTypes:{userId:t.PropTypes.number,emailName:t.PropTypes.string,emailIsInvalid:t.PropTypes.bool,initialPendingEmail:t.PropTypes.string,initialAliases:t.PropTypes.array,openChangeEmailModal:t.PropTypes.bool,showAliasGui:t.PropTypes.bool,showChangeEmail:t.PropTypes.bool},getInitialState:function(){return{pendingEmail:this.props.initialPendingEmail,aliases:void 0!==this.props.initialAliases?this.props.initialAliases:[]}},pendingVerifyLinkClick:function(e){return e.preventDefault(),y.get_for_user(this.user).show(),!1},pendingVerifyCancelClick:function(e){return e.preventDefault(),a.WebRequest({url:"/cancelpendingemailchange",success:(function(e){return function(){return e.setState({pendingEmail:void 0})}})(this),subject_user:this.user.id}),!1},onAliasChange:function(e){return this.setState({aliases:e})},onUserAddressChange:function(e,i,t){return t?this.setState({pendingEmail:i}):(this.user.email=i,this.forceUpdate())},componentWillMount:function(){if(this.user=d.get_viewer().get_user_by_id(this.props.userId),this.props.initialPendingEmail)return y.get_for_user(this.user).set_email_to_verify(this.props.initialPendingEmail)},componentDidMount:function(){if(p.listen_for_change(this.user,this.onUserAddressChange),this.props.emailIsInvalid&&this.props.openChangeEmailModal)return p.show(this.props.userId,this.state.aliases)},render:function(){return x.div({className:"fieldset user-info"},x.div({},x.h3({},this.props.emailName),x.div({className:i({"invalid-email":this.props.emailIsInvalid})},this.user.email),this.user.is_email_verified||this.props.emailIsInvalid?this.props.showChangeEmail?x.button({className:"button-as-link",onClick:(function(e){return function(i){i.preventDefault(),p.show(e.props.userId,e.state.aliases)}})(this)},k("Change email")):x.a({href:"/account#work"},k("Contact your team admin to change email")):x.div({},x.button({className:"button-as-link",onClick:(function(e){return function(i){i.preventDefault(),"work"===e.user.role?y.getForRole("work").verified_or_show():y.getForRole("personal").verified_or_show()}})(this)},k("Verify email"))),this.props.showAliasGui&&"work"!==this.user.role?x.div({},x.button({className:"button-as-link",onClick:function(e){e.preventDefault()}},k("Other ways to contact you"))):void 0),this.state.pendingEmail?x.div({className:"pending-unverified-email-container"},x.br({}),x.div({}),"work"===this.user.role?x.h3({},k("Pending %(team_name)s email change").format({team_name:d.get_viewer().team_name})):"personal"===this.user.role?x.h3({},k("Pending personal email change")):x.h3({},k("Pending email change")),x.div({className:"pending-unverified-email"},this.state.pendingEmail),x.div({},x.button({className:"button-as-link",onClick:this.pendingVerifyLinkClick},k("Verify email"))),x.div({}),x.button({className:"button-as-link",onClick:this.pendingVerifyCancelClick},k("Cancel"))):void 0)}}),{EmailVerification:y,ChangeEmail:p,AccountPageEmailBlock:h,initialize_module:function(e){return y.set_reason(e.reason),p.set_inbox_counts(e.inbox_counts)}}})}.call(this),function(){define("modules/clean/account/email_verify",["jquery","modules/clean/ajax","modules/core/exception"],function(e,i,t){return{_POLLING:{},send_verification_email:function(e,s,r,n){return null==r&&t.reportStack("Debugging T53160: reason should not be null",{severity:t.SEVERITY.NONCRITICAL,tags:["email_verify:null_reason"]}),i.WebRequest({url:"/sendverifyemail",data:{email:s,reason:r},success:function(){return n()},subject_user:e})},check_verification:function(e,t,s,r){return i.SilentBackgroundRequest({url:"/isemailverified",data:{email:t},success:function(e){return"ok"===e?s():r()},subject_user:e})},listen_for_verification:function(e,i,t){var s;if(s=e.id+":"+i,!this._POLLING[s])return this._POLLING[s]=!0,this._poll_for_verification(e,i,t)},_poll_for_verification:function(e,i,t){var s;return s=4e3,this.check_verification(e,i,t,(function(r){return function(){return setTimeout(function(){return r._poll_for_verification(e,i,t)},s)}})(this))}}})}.call(this),define("modules/clean/account/set_password_modal",["require","exports","tslib","external/react","modules/clean/ajax","modules/clean/react/modal","modules/core/i18n","modules/core/notify"],function(e,i,t,s,r,n,o,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var l=(function(e){function i(i){var t=e.call(this,i)||this;return t.state={sent:!1,submitting:!1},t}return t.__extends(i,e),i.prototype.resetResponseSuccess=function(e){"OK"===e.status?(a.success(o._("Sent an email to %(email)s").format({email:this.props.email})),this.setState({sent:!0,submitting:this.state.submitting})):this.resetEmailError()},i.prototype.resetEmailError=function(){a.error(o._("Could not send email. Please try again"))},i.prototype.sendResetEmail=function(e){var i=this;e.preventDefault(),this.setState({sent:this.state.sent,submitting:!0}),r.FormWebRequest({url:"/ajax_reset_start",data:{email:this.props.email},success:function(e){return i.resetResponseSuccess(JSON.parse(e))},error:function(){return i.resetEmailError()},complete:function(){i.setState({sent:i.state.sent,submitting:!1})}})},i.prototype.userConfirmSetPassword=function(){this.props.onUserConfirm?this.props.onUserConfirm():n.Modal.close()},i.showInstance=function(e){n.Modal.showInstance(s.createElement(i,t.__assign({},e)))},i.prototype.render=function(){var e=this,i=o._("Dropbox will send an email to %(email)s with further instructions.\n    You may need to check your spam folder or unblock no-reply@dropbox.com.").format({email:this.props.email}),t=this.state.sent?o._("Resend email"):o._("Send email"),r=o._("I’ve set a password"),a=this.sendResetEmail.bind(this),l=this.userConfirmSetPassword.bind(this),u=s.createElement(n.ModalButtons,null,s.createElement(n.ModalButton,{importance:"primary",disabled:!this.state.sent,onClick:l},r),s.createElement(n.ModalButton,{importance:"tertiary",onClick:a},t));return s.createElement(n.Modal,{title:o._("Set Password"),onAccept:function(){return e.userConfirmSetPassword()},buttonComponent:u},s.createElement("p",null,this.props.reason),s.createElement("p",null,i))},i})(s.Component);i.SetPasswordModal=l}),function(){var e=[].indexOf||function(e){for(var i=0,t=this.length;i<t;i++)if(i in this&&this[i]===e)return i;return-1};define("modules/clean/account/verify_email_modals",["external/react","modules/core/i18n","modules/clean/account/email_verify","modules/clean/account/email_verify_reasons","modules/clean/analytics","modules/clean/react/button","modules/clean/react/modal","modules/clean/viewer","modules/clean/react_format"],function(i,t,s,r,n,o,a,l,u){var m,c,d,h,p,f,g,_,y,v,b,w,C,E;return b=t._,g=n.UserActivityLogger,m=o.Button,p=a.Modal,E=u.reactFormat,w=i.createElement,C=i.DOM,h=[r.ADD_COMMENT,r.SUBSCRIBE_TO_COMMENTS,r.SHARE_FILEVIEWER],y={getStyle:function(){return this.props.shouldUseSimpleUI?"simple":"default"},renderChangeEmail:function(){if(!this.props.shouldUseSimpleUI)return C.a({href:"#",className:"change-email-before-verify",onClick:this.showChangeEmail},b("Update email address"))}},_=i.createClass({displayName:"VerifyEmailModal",mixins:[y],propTypes:{user:i.PropTypes.object,reason:i.PropTypes.string,email:i.PropTypes.string,onEmailSent:i.PropTypes.func,onShowChange:i.PropTypes.func,shouldUseSimpleUI:i.PropTypes.bool},_getStyle:function(){var i;return i=this.props.reason,e.call(h,i)>=0?"default-maestro":this.getStyle()},render:function(){var e;return e={reason:this.props.reason},g.log("web","email_verify_shown",e),w(p,{title:b("Verify your email address"),className:"verify-email",acceptButtonText:b("Send email"),dismissButtonText:b("Cancel"),onAccept:this.sendEmail,ref:"modal",style:this._getStyle()},C.div({className:"db-modal-message"},C.div({},this.getPrompt()),this.renderChangeEmail()))},sendEmail:function(e){return e.preventDefault(),s.send_verification_email(this.props.user,this.props.email,this.props.reason,this.emailSent)},close:function(){var e;return null!=(e=this.refs.modal)?e.close():void 0},emailSent:function(){var e;return this.close(),"function"==typeof(e=this.props).onEmailSent?e.onEmailSent():void 0},showChangeEmail:function(e){var i,t;return t={reason:this.props.reason},g.log("web","email_verify_change_first",t),e.preventDefault(),this.close(),"function"==typeof(i=this.props).onShowChange?i.onShowChange():void 0},getPrompt:function(){var e;switch(this.props.reason){case r.ADD_COMMENT:return E(b("Dropbox needs to verify your email address <strong>%(email)s</strong> before you can add comments. It’s as simple as clicking the link in the verification email we send to you."),{strong:C.strong(),email:this.props.email});case r.SUBSCRIBE_TO_COMMENTS:return E(b("Dropbox needs to verify your email address <strong>%(email)s</strong> before you can subscribe. It’s as simple as clicking the link in the verification email we send to you."),{strong:C.strong(),email:this.props.email});case r.SHARE_FOLDER:return E(b("Dropbox needs to verify your email address <strong>%(email)s</strong> to share folders. It’s as simple as clicking the link in the verification email we send to you."),{strong:C.strong(),email:this.props.email});case r.NEW_DFB_TEAM_TRY:case r.NEW_DFB_TEAM_BUY:return E(b("Dropbox needs to verify your email address <strong>%(email)s</strong> to add members to your team. It’s as simple as clicking the link in the verification email we send to you."),{strong:C.strong(),email:this.props.email});case r.SHMODAL:case r.SHARE_FILEVIEWER:return E(b("Dropbox needs to verify your email address <strong>%(email)s</strong> to share links. It’s as simple as clicking the link in the verification email we send to you."),{strong:C.strong(),email:this.props.email});case r.CREATE_API_APP:return E(b("Dropbox needs to verify your email address <strong>%(email)s</strong> before you can register an API app. It’s as simple as clicking the link in the verification email we send to you."),{strong:C.strong(),email:this.props.email});case r.PUBLIC_FOLDER:return E(b("Dropbox needs to verify your email address <strong>%(email)s</strong> to enable your Public folder. It’s as simple as clicking the link in the verification email we send to you."),{strong:C.strong(),email:this.props.email});case r.CHANGE_EMAIL:return e=l.get_viewer().is_paired,e&&"personal"===this.props.user.role?E(b("Dropbox needs to verify your email address <strong>%(email)s</strong> to finish updating your personal email. It’s as simple as clicking the link in the verification email we send to you."),{strong:C.strong(),email:this.props.email}):e&&"work"===this.props.user.role?E(b("Dropbox needs to verify your email address <strong>%(email)s</strong> to finish updating your %(team)s email. It’s as simple as clicking the link in the verification email we send to you."),{strong:C.strong(),email:this.props.email,team:l.get_viewer().team_name}):E(b("Dropbox needs to verify your email address <strong>%(email)s</strong> to finish updating your email. It’s as simple as clicking the link in the verification email we send to you."),{strong:C.strong(),email:this.props.email});case r.CREATE_FILE_COLLECTOR:return E(b("Dropbox needs to verify your email address <strong>%(email)s</strong> to create file requests. It’s as simple as clicking the link in the verification email we send to you."),{strong:C.strong(),email:this.props.email});case r.GIFT_BUY:return E(b("Dropbox needs to verify your email address <strong>%(email)s</strong> before you can send gifts to your friends. It’s as simple as clicking the link in the verification email we send to you."),{strong:C.strong(),email:this.props.email});case r.REFER_FRIENDS:return E(b("Dropbox needs to verify your email address <strong>%(email)s</strong> before you can invite friends. It’s as simple as clicking the link in the verification email we send to you."),{strong:C.strong(),email:this.props.email});case r.CREATE_TEAM:return E(b("Dropbox needs to verify your email address <strong>%(email)s</strong> before you can create or join a team. It’s as simple as clicking the link in the verification email we send to you."),{strong:C.strong(),email:this.props.email});default:return E(b("Verify your email address at <strong>%(email)s</strong> to share folders and ensure your account can be recovered."),{strong:C.strong(),email:this.props.email})}}}),f=i.createClass({displayName:"ResendVerifyEmailModal",mixins:[y],propTypes:{user:i.PropTypes.object,email:i.PropTypes.string,reason:i.PropTypes.string,onEmailSent:i.PropTypes.func,onShowChange:i.PropTypes.func,shouldUseSimpleUI:i.PropTypes.bool},_getStyle:function(){return this._isMaestroDesign?"default-maestro":this.getStyle()},_isMaestroDesign:function(){var i;return i=this.props.reason,e.call(h,i)>=0},render:function(){var e;return e={reason:this.props.reason},g.log("web","email_verify_resend_shown",e),w(p,{title:b("Verify your email address"),buttonComponent:this.renderButtons(),ref:"modal",style:this._getStyle()},C.div({className:"db-modal-message"},C.div({},this.getPrompt()),this.renderChangeEmail()))},renderButtons:function(){return C.div({className:"db-modal-buttons"},w(m,{key:this._isMaestroDesign()?"tertiary":"primary",className:"dbmodal-button",importance:this._isMaestroDesign()?"tertiary":"primary",disabled:!1,onClick:this.close},b("Done")),w(m,{key:this._isMaestroDesign()?"primary":"tertiary",className:"dbmodal-button",importance:this._isMaestroDesign()?"primary":"tertiary",disabled:!1,onClick:this.sendEmail},b("Resend email")))},close:function(){var e;return null!=(e=this.refs.modal)?e.close():void 0},showChangeEmail:function(e){var i,t;return t={reason:this.props.reason},g.log("web","email_verify_resend_change_first",t),e.preventDefault(),this.close(),"function"==typeof(i=this.props).onShowChange?i.onShowChange():void 0},sendEmail:function(e){return e.preventDefault(),s.send_verification_email(this.props.user,this.props.email,this.props.reason,this.emailSent)},emailSent:function(){var e;return this.close(),"function"==typeof(e=this.props).onEmailSent?e.onEmailSent():void 0},getPrompt:function(){var e;return e=l.get_viewer().is_paired,this.props.reason===r.REFER_FRIENDS?E(b("Dropbox needs to verify your email address <strong>%(email)s</strong> before you can invite friends. Check your inbox and click the link in the email to verify your address. If you can’t find it, check your spam folder."),{strong:C.strong(),email:this.props.email}):this.props.reason!==r.CHANGE_EMAIL?E(b("Dropbox has sent a verification email to <strong>%(email)s</strong>. Check your inbox and click on the link in the email to verify your address. If you can't find it, check your spam folder or click the button to resend the email."),{strong:C.strong(),email:this.props.email}):e&&"personal"===this.props.user.role?E(b("Dropbox has sent a verification email to <strong>%(email)s</strong>. Check your inbox and click on the link in the email to finish updating your personal email. If you can't find it, check your spam folder or click the button to resend the email."),{strong:C.strong(),email:this.props.email}):e&&"work"===this.props.user.role?E(b("Dropbox has sent a verification email to <strong>%(email)s</strong>. Check your inbox and click on the link in the email to finish updating your %(team)s email. If you can't find it, check your spam folder or click the button to resend the email."),{strong:C.strong(),email:this.props.email,team:l.get_viewer().team_name}):E(b("Dropbox has sent a verification email to <strong>%(email)s</strong>. Check your inbox and click on the link in the email to finish updating your email. If you can't find it, check your spam folder or click the button to resend the email."),{strong:C.strong(),email:this.props.email})}}),v=i.createClass({displayName:"VerifyEmailSentModal",propTypes:{email:i.PropTypes.string},render:function(){var e;return e=E(b("Dropbox has sent a verification email to <strong>%(email)s</strong>. Check your inbox and click on the link in the email to verify your address. If you can't find it, check your spam folder or click the button to resend the email."),{strong:C.strong(),email:this.props.email}),w(p,{title:b("Verification email sent!"),acceptButtonText:b("Done")},C.div({},e))}}),d=i.createClass({displayName:"EmailVerifiedModal",propTypes:{reason:i.PropTypes.string,email:i.PropTypes.string},render:function(){return w(p,{title:b("Your email address is now verified"),acceptButtonText:b("Done")},C.div({},this.getPrompt()))},getPrompt:function(){switch(this.props.reason){case r.CREATE_TEAM:return E(b("Thanks for verifying your email address: <strong>%(email)s</strong>. Now you can invite members to your team."),{strong:C.strong(),email:this.props.email});case r.SHARE_FOLDER:return E(b("Thanks for verifying your email address: <strong>%(email)s</strong>. You can now share and receive files on Dropbox."),{strong:C.strong(),email:this.props.email});case r.CREATE_API_APP:return E(b("Thanks for verifying your email address: <strong>%(email)s</strong>. You can now register API apps."),{strong:C.strong(),email:this.props.email});case r.PUBLIC_FOLDER:return E(b("Thanks for verifying your email address. You can now enable the Public folder for your <strong>%(email)s</strong> Dropbox."),{strong:C.strong(),email:this.props.email});default:return E(b("Thanks for verifying your email address: <strong>%(email)s</strong>."),{strong:C.strong(),email:this.props.email})}}}),c=i.createClass({displayName:"ChangedEmailVerifiedModal",propTypes:{email:i.PropTypes.string,user:i.PropTypes.object},render:function(){return w(p,{title:b("Your email address is now verified"),acceptButtonText:b("Done")},C.div({},this.getPrompt()))},getPrompt:function(){var e;return e=l.get_viewer().is_paired,e&&"personal"===this.props.user.role?E(b("Thanks for verifying your email address <strong>%(email)s</strong>. Your personal account has successfully been changed."),{strong:C.strong(),email:this.props.email}):e&&"work"===this.props.user.role?E(b("Thanks for verifying your email address <strong>%(email)s</strong>. Your %(team)s account has successfully been changed."),{strong:C.strong(),email:this.props.email,team:l.get_viewer().team_name}):E(b("Thanks for verifying your email address <strong>%(email)s</strong>. Your account has successfully been changed."),{strong:C.strong(),email:this.props.email})}}),{VerifyEmailModal:_,ResendVerifyEmailModal:f,VerifyEmailSentModal:v,EmailVerifiedModal:d,ChangedEmailVerifiedModal:c}})}.call(this);
//# sourceMappingURL=pkg-account.min.js-vflptMczV.map