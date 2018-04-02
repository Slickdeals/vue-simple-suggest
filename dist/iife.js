var VueSimpleSuggest=function(){"use strict";var t={selectionUp:[38],selectionDown:[40],select:[13],hideList:[27],autocomplete:[32,13]},e={input:String,select:Object},n={type:String},i={type:n,accesskey:n,autocomplete:n,form:n,formaction:n,formenctype:n,formmethod:n,formtarget:n,height:n,width:n,inputmode:n,max:n,min:n,minlength:n,maxlength:n,name:n,pattern:n,placeholder:n,selectionDirection:n,selectionEnd:n,selectionStart:n,size:n,src:n,step:n,tabindex:n,title:n,spellcheck:{},readonly:{},required:{},multiple:{},formnovalidate:{},autofocus:{},checked:{},disabled:{}};function s(t,e){return e.split(".").reduce(function(t,e){return t===Object(t)?t[e]:t},t)}function o(t,e){if(t.length<=0)return!1;var n=function(t){return t.some(function(t){return t===e.keyCode})};return Array.isArray(t[0])?t.some(function(t){return n(t)}):n(t)}var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t};function l(t,e){try{var n=t()}catch(t){return e()}return n&&n.then?n.then(e,e):e()}function c(t,e){try{var n=t()}catch(t){return e(t)}return n&&n.then?n.then(void 0,e):n}function h(t,e,n){return n?e?e(t):t:(t=Promise.resolve(t),e?t.then(e):t)}var a=function(){try{if(isNaN.apply(null,{}))return function(t){return function(){try{return Promise.resolve(t.apply(this,arguments))}catch(t){return Promise.reject(t)}}}}catch(t){}return function(t){return function(){try{return Promise.resolve(t.apply(this,Array.prototype.slice.call(arguments)))}catch(t){return Promise.reject(t)}}}}();function f(t,e){var n=t();return n&&n.then?n.then(e):e(n)}function p(){}var d="input",g={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vue-simple-suggest"},[n("div",{ref:"inputSlot",staticClass:"input-wrapper",class:{designed:!t.destyled},on:{click:t.onInputClick,input:t.onInput,keydown:t.onArrowKeyDown,keyup:function(e){t.onListKeyUp(e),t.onAutocomplete(e)}}},[t._t("default",[n("input",t._b({staticClass:"default-input",domProps:{value:t.text||""}},"input",t.$props,!1))])],2),t._v(" "),t.listShown&&!t.removeList?n("div",{staticClass:"suggestions",class:{designed:!t.destyled}},[t._t("misc-item-above",null,{suggestions:t.suggestions,query:t.text}),t._v(" "),t._l(t.suggestions,function(e,i){return n("div",{key:t.isPlainSuggestion?"suggestion-"+i:t.valueProperty(e),staticClass:"suggest-item",class:{selected:t.selected&&t.valueProperty(e)==t.valueProperty(t.selected),hover:t.hovered&&t.valueProperty(t.hovered)==t.valueProperty(e)},on:{mouseenter:function(n){t.hover(e,n.target)},mouseleave:function(e){t.hover(null,e.target)}}},[t._t("suggestion-item",[n("span",[t._v(t._s(t.displayProperty(e)))])],{suggestion:e,query:t.text})],2)}),t._v(" "),t._t("misc-item-below",null,{suggestions:t.suggestions,query:t.text})],2):t._e()])},staticRenderFns:[],name:"vue-simple-suggest",model:{prop:"value",get event(){return d}},props:u({},i,{controls:{type:Object,default:function(){return t}},minLength:{type:Number,default:1},maxSuggestions:{type:Number,default:10},displayAttribute:{type:String,default:"title"},valueAttribute:{type:String,default:"id"},list:{type:[Function,Array],default:function(){return[]}},removeList:{type:Boolean,default:!1},destyled:{type:Boolean,default:!1},filterByQuery:{type:Boolean,default:!1},filter:{type:Function,default:function(t,e){return!e||~this.displayProperty(t).toLowerCase().indexOf(e.toLowerCase())}},debounce:{type:Number,default:0},value:{},mode:{type:String,default:d,validator:function(t){return!!~Object.keys(e).indexOf(t.toLowerCase())}}}),watch:{mode:function(t){return d=t}},data:function(){return{selected:null,hovered:null,suggestions:[],listShown:!1,inputElement:null,canSend:!0,timeoutInstance:null,text:this.value,isPlainSuggestion:!1,controlScheme:{}}},computed:{slotIsComponent:function(){return this.$slots.default&&this.$slots.default.length>0&&!!this.$slots.default[0].componentInstance},listIsRequest:function(){return"function"==typeof this.list},input:function(){return this.slotIsComponent?this.$slots.default[0].componentInstance:this.inputElement},on:function(){return this.slotIsComponent?"$on":"addEventListener"},off:function(){return this.slotIsComponent?"$off":"removeEventListener"},hoveredIndex:function(){var t=this;return this.suggestions.findIndex(function(e){return t.hovered&&t.valueProperty(t.hovered)==t.valueProperty(e)})}},created:function(){this.controlScheme=u({},t,this.controls),d=this.mode},mounted:function(){this.inputElement=this.$refs.inputSlot.querySelector("input"),this.input[this.on]("blur",this.onBlur),this.input[this.on]("focus",this.onFocus)},beforeDestroy:function(){this.input[this.off]("blur",this.onBlur),this.input[this.off]("focus",this.onFocus)},methods:{miscSlotsAreEmpty:function(){var t=this,e=function(e){return t.$scopedSlots["misc-item-"+e]};return["above","below"].some(function(n){return function(t){return e(t)&&"function"==typeof e(t)}(n)?!e(n)(t):!e(n)})},displayProperty:function(t){return(this.isPlainSuggestion?t:s(t,this.displayAttribute))+""},valueProperty:function(t){return this.isPlainSuggestion?t:s(t,this.valueAttribute)},select:function(t){this.hovered=null,this.selected=t,this.$emit("select",t),this.$emit("input",this.displayProperty(t)),this.inputElement.value=this.displayProperty(t),this.text=this.displayProperty(t),this.inputElement.focus()},hover:function(t,e){this.hovered=t,null!=this.hovered&&this.$emit("hover",t,e)},hideList:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.listShown&&(this.hovered&&!t&&this.select(this.hovered),this.listShown=!1,this.$emit("hide-list"))},showList:function(){!this.listShown&&this.text&&this.text.length>=this.minLength&&this.suggestions.length>0&&(this.listShown=!0,this.$emit("show-list"))},onInputClick:a(function(t){var e=this;return f(function(){if(0===e.minLength&&!e.text)return function(t,e){if(!e)return Promise.resolve(t).then(p)}(e.research())},function(){e.showList()})}),onArrowKeyDown:function(t){if(o([this.controlScheme.selectionUp,this.controlScheme.selectionDown],t)){t.preventDefault(),this.showList();var e=o(this.controlScheme.selectionDown,t),n=2*e-1,i=e?0:this.suggestions.length-1,s=e?this.hoveredIndex<this.suggestions.length-1:this.hoveredIndex>0,r=null;r=this.hovered?s?this.suggestions[this.hoveredIndex+n]:this.suggestions[i]:this.selected||this.suggestions[i],this.hover(r)}},onListKeyUp:function(t){var e=this.controlScheme.select,n=this.controlScheme.hideList;o([e,n],t)&&(t.preventDefault(),this.listShown?this.hideList(o(n,t)):o(e,t)&&this.research())},onAutocomplete:function(t){o(this.controlScheme.autocomplete,t)&&(t.ctrlKey||t.shiftKey)&&this.suggestions.length>0&&this.suggestions[0]&&(t.preventDefault(),this.select(this.suggestions[0]),this.hover(this.suggestions[0]))},onBlur:function(t){this.hideList(),this.$emit("blur",t)},onFocus:function(t){this.$emit("focus",t),this.showList()},onInput:function(t){this.text=t.target.value,this.$emit("input",this.text),this.selected&&(this.selected=null,this.$emit("select",null)),this.debounce?(clearTimeout(this.timeoutInstance),this.timeoutInstance=setTimeout(this.research,this.debounce)):this.research()},research:a(function(){var t=this;return l(function(){return c(function(){return function(t){var e=t();if(e&&e.then)return e.then(p)}(function(){if(t.canSend){t.canSend=!1;var e=t.$set;return h(t.getSuggestions(t.text),function(n){e.call(t,t,"suggestions",n),t.canSend=!0})}})},function(e){throw t.clearSuggestions(),e})},function(){return t.$nextTick(function(){0===t.suggestions.length&&t.miscSlotsAreEmpty()?t.hideList(!0):t.showList()}),t.suggestions})}),getSuggestions:a(function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(t.listShown&&!e)return t.hideList(!0),t.clearSuggestions(),t.suggestions;if(t.minLength>0&&e.length<t.minLength)return t.suggestions;t.selected=null,t.listIsRequest&&t.$emit("request-start",e);var n=[];return l(function(){return c(function(){return f(function(){if(t.listIsRequest)return h(t.list(e),function(t){n=t||[]});n=t.list},function(){Array.isArray(n)||(n=[n]),t.isPlainSuggestion="object"!==r(n[0])||Array.isArray(n[0]),t.filterByQuery&&(n=n.filter(function(n){return t.filter(n,e)})),t.listIsRequest&&t.$emit("request-done",n)})},function(e){if(!t.listIsRequest)throw e;t.$emit("request-failed",e)})},function(){return t.maxSuggestions&&n.splice(t.maxSuggestions),n})}),clearSuggestions:function(){this.suggestions.splice(0)}}};return(Vue||window&&window.Vue)&&(Vue||window.Vue).component("vue-simple-suggest",g),g}();
