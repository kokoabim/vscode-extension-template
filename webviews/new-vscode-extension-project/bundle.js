/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";var t={25:(t,e,o)=>{o.r(e),o.d(e,{VscodeTextfield:()=>p});var i=o(929),s=o(577),r=o(216),n=o(152),a=o(651),l=o(47);const c=(0,i.iz)((0,l.bE)()),d=[a.A,i.AH`
    :host {
      align-items: center;
      background-color: var(--vscode-settings-textInputBackground, #313131);
      border-color: var(
        --vscode-settings-textInputBorder,
        var(--vscode-settings-textInputBackground, #3c3c3c)
      );
      border-radius: 2px;
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      color: var(--vscode-settings-textInputForeground, #cccccc);
      display: inline-flex;
      max-width: 100%;
      position: relative;
      width: 320px;
    }

    :host([focused]) {
      border-color: var(--vscode-focusBorder, #0078d4);
    }

    :host([invalid]),
    :host(:invalid) {
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    :host([invalid]) input,
    :host(:invalid) input {
      background-color: var(--vscode-inputValidation-errorBackground, #5a1d1d);
    }

    ::slotted([slot='content-before']) {
      display: block;
      margin-left: 2px;
    }

    ::slotted([slot='content-after']) {
      display: block;
      margin-right: 2px;
    }

    slot[name='content-before'],
    slot[name='content-after'] {
      align-items: center;
      display: flex;
    }

    input {
      background-color: var(--vscode-settings-textInputBackground, #313131);
      border: 0;
      box-sizing: border-box;
      color: var(--vscode-settings-textInputForeground, #cccccc);
      display: block;
      font-family: var(--vscode-font-family, ${c});
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, 'normal');
      line-height: 18px;
      outline: none;
      padding-bottom: 3px;
      padding-left: 4px;
      padding-right: 4px;
      padding-top: 3px;
      width: 100%;
    }

    input:read-only:not([type='file']) {
      cursor: not-allowed;
    }

    input::placeholder {
      color: var(--vscode-input-placeholderForeground, #989898);
      opacity: 1;
    }

    input[type='file'] {
      line-height: 24px;
      padding-bottom: 0;
      padding-left: 2px;
      padding-top: 0;
    }

    input[type='file']::file-selector-button {
      background-color: var(--vscode-button-background, #0078d4);
      border: 0;
      border-radius: 2px;
      color: var(--vscode-button-foreground, #ffffff);
      cursor: pointer;
      font-family: var(--vscode-font-family, ${c});
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, 'normal');
      line-height: 20px;
      padding: 0 14px;
    }

    input[type='file']::file-selector-button:hover {
      background-color: var(--vscode-button-hoverBackground, #026ec1);
    }
  `];var h=function(t,e,o,i){var s,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n};let p=class extends n.N{set type(t){this._type=["color","date","datetime-local","email","file","month","number","password","search","tel","text","time","url","week"].includes(t)?t:"text"}get type(){return this._type}set value(t){"file"!==this.type&&(this._value=t,this._internals.setFormValue(t)),this.updateComplete.then((()=>{this._setValidityFromInput()}))}get value(){return this._value}set minlength(t){this.minLength=t}get minlength(){return this.minLength}set maxlength(t){this.maxLength=t}get maxlength(){return this.maxLength}get form(){return this._internals.form}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage}get willValidate(){return this._internals.willValidate}checkValidity(){return this._setValidityFromInput(),this._internals.checkValidity()}reportValidity(){return this._setValidityFromInput(),this._internals.reportValidity()}get wrappedElement(){return this._inputEl}constructor(){super(),this.autocomplete=void 0,this.autofocus=!1,this.defaultValue="",this.disabled=!1,this.focused=!1,this.invalid=!1,this.label="",this.max=void 0,this.maxLength=void 0,this.min=void 0,this.minLength=void 0,this.multiple=!1,this.name=void 0,this.pattern=void 0,this.placeholder=void 0,this.readonly=!1,this.required=!1,this.step=void 0,this._value="",this._type="text",this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),this.updateComplete.then((()=>{this._inputEl.checkValidity(),this._setValidityFromInput(),this._internals.setFormValue(this._inputEl.value)}))}attributeChangedCallback(t,e,o){super.attributeChangedCallback(t,e,o),["max","maxlength","min","minlength","pattern","required","step"].includes(t)&&this.updateComplete.then((()=>{this._setValidityFromInput()}))}formResetCallback(){this.value=this.defaultValue,this.requestUpdate()}formStateRestoreCallback(t,e){this.value=t}_dataChanged(){if(this._value=this._inputEl.value,"file"===this.type&&this._inputEl.files)for(const t of this._inputEl.files)this._internals.setFormValue(t);else this._internals.setFormValue(this._inputEl.value)}_setValidityFromInput(){this._inputEl&&this._internals.setValidity(this._inputEl.validity,this._inputEl.validationMessage,this._inputEl)}_onInput(t){this._dataChanged(),this._setValidityFromInput(),this.dispatchEvent(new CustomEvent("vsc-input",{detail:{data:t.data,originalEvent:t}}))}_onChange(t){this._dataChanged(),this._setValidityFromInput(),this.dispatchEvent(new Event("change")),this.dispatchEvent(new CustomEvent("vsc-change",{detail:{data:this.value,originalEvent:t}}))}_onFocus(){this.focused=!0}_onBlur(){this.focused=!1}_onKeyDown(t){"Enter"===t.key&&this._internals.form&&this._internals.form?.requestSubmit()}render(){return i.qy`
      <slot name="content-before"></slot>
      <input
        id="input"
        type=${this.type}
        ?autofocus=${this.autofocus}
        autocomplete=${(0,r.J)(this.autocomplete)}
        aria-label=${this.label}
        ?disabled=${this.disabled}
        max=${(0,r.J)(this.max)}
        maxlength=${(0,r.J)(this.maxLength)}
        min=${(0,r.J)(this.min)}
        minlength=${(0,r.J)(this.minLength)}
        ?multiple=${this.multiple}
        name=${(0,r.J)(this.name)}
        pattern=${(0,r.J)(this.pattern)}
        placeholder=${(0,r.J)(this.placeholder)}
        ?readonly=${this.readonly}
        ?required=${this.required}
        step=${(0,r.J)(this.step)}
        .value=${this._value}
        @blur=${this._onBlur}
        @change=${this._onChange}
        @focus=${this._onFocus}
        @input=${this._onInput}
        @keydown=${this._onKeyDown}
      >
      <slot name="content-after"></slot>
    `}};p.styles=d,p.formAssociated=!0,p.shadowRootOptions={...i.WF.shadowRootOptions,delegatesFocus:!0},h([(0,s.MZ)()],p.prototype,"autocomplete",void 0),h([(0,s.MZ)({type:Boolean,reflect:!0})],p.prototype,"autofocus",void 0),h([(0,s.MZ)({attribute:"default-value"})],p.prototype,"defaultValue",void 0),h([(0,s.MZ)({type:Boolean,reflect:!0})],p.prototype,"disabled",void 0),h([(0,s.MZ)({type:Boolean,reflect:!0})],p.prototype,"focused",void 0),h([(0,s.MZ)({type:Boolean,reflect:!0})],p.prototype,"invalid",void 0),h([(0,s.MZ)({attribute:!1})],p.prototype,"label",void 0),h([(0,s.MZ)({type:Number})],p.prototype,"max",void 0),h([(0,s.MZ)({type:Number})],p.prototype,"maxLength",void 0),h([(0,s.MZ)({type:Number})],p.prototype,"min",void 0),h([(0,s.MZ)({type:Number})],p.prototype,"minLength",void 0),h([(0,s.MZ)({type:Boolean,reflect:!0})],p.prototype,"multiple",void 0),h([(0,s.MZ)({reflect:!0})],p.prototype,"name",void 0),h([(0,s.MZ)()],p.prototype,"pattern",void 0),h([(0,s.MZ)()],p.prototype,"placeholder",void 0),h([(0,s.MZ)({type:Boolean,reflect:!0})],p.prototype,"readonly",void 0),h([(0,s.MZ)({type:Boolean,reflect:!0})],p.prototype,"required",void 0),h([(0,s.MZ)({type:Number})],p.prototype,"step",void 0),h([(0,s.MZ)({reflect:!0})],p.prototype,"type",null),h([(0,s.MZ)()],p.prototype,"value",null),h([(0,s.P)("#input")],p.prototype,"_inputEl",void 0),h([(0,s.wk)()],p.prototype,"_value",void 0),h([(0,s.wk)()],p.prototype,"_type",void 0),p=h([(0,n.E)("vscode-textfield")],p)},47:(t,e,o)=>{o.d(e,{Sw:()=>i,bE:()=>s});const i=16/13;function s(){return navigator.userAgent.indexOf("Linux")>-1?'system-ui, "Ubuntu", "Droid Sans", sans-serif':navigator.userAgent.indexOf("Mac")>-1?"-apple-system, BlinkMacSystemFont, sans-serif":navigator.userAgent.indexOf("Windows")>-1?'"Segoe WPC", "Segoe UI", sans-serif':"sans-serif"}},105:(t,e,o)=>{o.r(e),o.d(e,{VscodeDivider:()=>l});var i=o(929),s=o(577),r=o(152);const n=[o(651).A,i.AH`
    :host {
      background-color: var(--vscode-foreground, #cccccc);
      display: block;
      height: 1px;
      margin-bottom: 10px;
      margin-top: 10px;
      opacity: 0.4;
    }
  `];var a=function(t,e,o,i){var s,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n};let l=class extends r.N{constructor(){super(...arguments),this.role="separator"}render(){return i.qy``}};l.styles=n,a([(0,s.MZ)({reflect:!0})],l.prototype,"role",void 0),l=a([(0,r.E)("vscode-divider")],l)},152:(t,e,o)=>{o.d(e,{E:()=>a,N:()=>n});var i=o(929);const s="1.14.0",r="__vscodeElements_disableRegistryWarning__";class n extends i.WF{get version(){return s}}const a=t=>e=>{if(!customElements.get(t))return void customElements.define(t,e);if(r in window)return;const o=document.createElement(t),i=o?.version;let n="";i?i!==s?(n+="is already registered by a different version of VSCode Elements. ",n+=`This version is "${s}", while the other one is "${i}".`):n+="is already registered by the same version of VSCode Elements. ":(console.warn(t,"is already registered by an unknown custom element handler class."),n+="is already registered by an unknown custom element handler class."),console.warn(`[VSCode Elements] ${t} ${n}\nTo suppress this warning, set window.${r} to true`)}},171:(t,e,o)=>{o.d(e,{T:()=>n});var i=o(929),s=o(655);class r extends s.WL{constructor(t){if(super(t),this._prevProperties={},t.type!==s.OA.PROPERTY||"style"!==t.name)throw new Error("The `stylePropertyMap` directive must be used in the `style` property")}update(t,[e]){return Object.entries(e).forEach((([e,o])=>{this._prevProperties[e]!==o&&(e.startsWith("--")?t.element.style.setProperty(e,o):t.element.style[e]=o,this._prevProperties[e]=o)})),i.c0}render(t){return i.c0}}const n=(0,s.u$)(r)},181:(t,e,o)=>{o.d(e,{XX:()=>H,c0:()=>w,qy:()=>$,s6:()=>A});const i=globalThis,s=i.trustedTypes,r=s?s.createPolicy("lit-html",{createHTML:t=>t}):void 0,n="$lit$",a=`lit$${Math.random().toFixed(9).slice(2)}$`,l="?"+a,c=`<${l}>`,d=document,h=()=>d.createComment(""),p=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,v="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,g=/-->/g,b=/>/g,y=RegExp(`>|${v}(?:([^\\s"'>=/]+)(${v}*=${v}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),m=/'/g,_=/"/g,x=/^(?:script|style|textarea|title)$/i,k=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),$=k(1),w=(k(2),k(3),Symbol.for("lit-noChange")),A=Symbol.for("lit-nothing"),E=new WeakMap,C=d.createTreeWalker(d,129);function M(t,e){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==r?r.createHTML(e):e}const S=(t,e)=>{const o=t.length-1,i=[];let s,r=2===e?"<svg>":3===e?"<math>":"",l=f;for(let e=0;e<o;e++){const o=t[e];let d,h,p=-1,u=0;for(;u<o.length&&(l.lastIndex=u,h=l.exec(o),null!==h);)u=l.lastIndex,l===f?"!--"===h[1]?l=g:void 0!==h[1]?l=b:void 0!==h[2]?(x.test(h[2])&&(s=RegExp("</"+h[2],"g")),l=y):void 0!==h[3]&&(l=y):l===y?">"===h[0]?(l=s??f,p=-1):void 0===h[1]?p=-2:(p=l.lastIndex-h[2].length,d=h[1],l=void 0===h[3]?y:'"'===h[3]?_:m):l===_||l===m?l=y:l===g||l===b?l=f:(l=y,s=void 0);const v=l===y&&t[e+1].startsWith("/>")?" ":"";r+=l===f?o+c:p>=0?(i.push(d),o.slice(0,p)+n+o.slice(p)+a+v):o+a+(-2===p?e:v)}return[M(t,r+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class R{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let r=0,c=0;const d=t.length-1,p=this.parts,[u,v]=S(t,e);if(this.el=R.createElement(u,o),C.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=C.nextNode())&&p.length<d;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(n)){const e=v[c++],o=i.getAttribute(t).split(a),s=/([.?@])?(.*)/.exec(e);p.push({type:1,index:r,name:s[2],strings:o,ctor:"."===s[1]?Z:"?"===s[1]?T:"@"===s[1]?I:V}),i.removeAttribute(t)}else t.startsWith(a)&&(p.push({type:6,index:r}),i.removeAttribute(t));if(x.test(i.tagName)){const t=i.textContent.split(a),e=t.length-1;if(e>0){i.textContent=s?s.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],h()),C.nextNode(),p.push({type:2,index:++r});i.append(t[e],h())}}}else if(8===i.nodeType)if(i.data===l)p.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(a,t+1));)p.push({type:7,index:r}),t+=a.length-1}r++}}static createElement(t,e){const o=d.createElement("template");return o.innerHTML=t,o}}function P(t,e,o=t,i){if(e===w)return e;let s=void 0!==i?o._$Co?.[i]:o._$Cl;const r=p(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t),s._$AT(t,o,i)),void 0!==i?(o._$Co??=[])[i]=s:o._$Cl=s),void 0!==s&&(e=P(t,s._$AS(t,e.values),s,i)),e}class O{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??d).importNode(e,!0);C.currentNode=i;let s=C.nextNode(),r=0,n=0,a=o[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new B(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new N(s,this,t)),this._$AV.push(e),a=o[++n]}r!==a?.index&&(s=C.nextNode(),r++)}return C.currentNode=d,i}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class B{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),p(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==w&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>u(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==A&&p(this._$AH)?this._$AA.nextSibling.data=t:this.T(d.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=R.createElement(M(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new O(i,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=E.get(t.strings);return void 0===e&&E.set(t.strings,e=new R(t)),e}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const s of t)i===e.length?e.push(o=new B(this.O(h()),this.O(h()),this,this.options)):o=e[i],o._$AI(s),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class V{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,s){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=A}_$AI(t,e=this,o,i){const s=this.strings;let r=!1;if(void 0===s)t=P(this,t,e,0),r=!p(t)||t!==this._$AH&&t!==w,r&&(this._$AH=t);else{const i=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=P(this,i[o+n],e,n),a===w&&(a=this._$AH[n]),r||=!p(a)||a!==this._$AH[n],a===A?t=A:t!==A&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}r&&!i&&this.j(t)}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Z extends V{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===A?void 0:t}}class T extends V{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}}class I extends V{constructor(t,e,o,i,s){super(t,e,o,i,s),this.type=5}_$AI(t,e=this){if((t=P(this,t,e,0)??A)===w)return;const o=this._$AH,i=t===A&&o!==A||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==A&&(o===A||i);i&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class N{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}}const L=i.litHtmlPolyfillSupport;L?.(R,B),(i.litHtmlVersions??=[]).push("3.2.1");const H=(t,e,o)=>{const i=o?.renderBefore??e;let s=i._$litPart$;if(void 0===s){const t=o?.renderBefore??null;i._$litPart$=s=new B(e.insertBefore(h(),t),t,void 0,o??{})}return s._$AI(t),s}},216:(t,e,o)=>{o.d(e,{J:()=>s});var i=o(181);const s=t=>t??i.s6},231:(t,e,o)=>{o.r(e),o.d(e,{VscodeIcon:()=>p});var i=o(929),s=o(577),r=o(309),n=o(216),a=o(152),l=o(171);const c=[o(651).A,i.AH`
    :host {
      color: var(--vscode-icon-foreground, #cccccc);
      display: inline-block;
    }

    .codicon[class*='codicon-'] {
      display: block;
    }

    .icon,
    .button {
      background-color: transparent;
      display: block;
      padding: 0;
    }

    .button {
      border-color: transparent;
      border-style: solid;
      border-width: 1px;
      border-radius: 5px;
      color: currentColor;
      cursor: pointer;
      padding: 2px;
    }

    .button:hover {
      background-color: var(
        --vscode-toolbar-hoverBackground,
        rgba(90, 93, 94, 0.31)
      );
    }

    .button:active {
      background-color: var(
        --vscode-toolbar-activeBackground,
        rgba(99, 102, 103, 0.31)
      );
    }

    .button:focus {
      outline: none;
    }

    .button:focus-visible {
      border-color: var(--vscode-focusBorder, #0078d4);
    }

    @keyframes icon-spin {
      100% {
        transform: rotate(360deg);
      }
    }

    .spin {
      animation-name: icon-spin;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
  `];var d,h=function(t,e,o,i){var s,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n};let p=d=class extends a.N{constructor(){super(...arguments),this.label="",this.name="",this.size=16,this.spin=!1,this.spinDuration=1.5,this.actionIcon=!1,this._onButtonClick=t=>{this.dispatchEvent(new CustomEvent("vsc-click",{detail:{originalEvent:t}}))}}connectedCallback(){super.connectedCallback();const{href:t,nonce:e}=this._getStylesheetConfig();d.stylesheetHref=t,d.nonce=e}_getStylesheetConfig(){const t=document.getElementById("vscode-codicon-stylesheet"),e=t?.getAttribute("href")||void 0,o=t?.nonce||void 0;if(!t){let t="[VSCode Elements] To use the Icon component, the codicons.css file must be included in the page with the id `vscode-codicon-stylesheet`! ";t+="See https://vscode-elements.github.io/components/icon/ for more details.",console.warn(t)}return{nonce:o,href:e}}render(){const{stylesheetHref:t,nonce:e}=d,o=i.qy`<span
      class=${(0,r.H)({codicon:!0,["codicon-"+this.name]:!0,spin:this.spin})}
      .style=${(0,l.T)({animationDuration:String(this.spinDuration)+"s",fontSize:this.size+"px",height:this.size+"px",width:this.size+"px"})}
    ></span>`,s=this.actionIcon?i.qy` <button
          class="button"
          @click=${this._onButtonClick}
          aria-label=${this.label}
        >
          ${o}
        </button>`:i.qy` <span class="icon" aria-hidden="true" role="presentation"
          >${o}</span
        >`;return i.qy`
      <link
        rel="stylesheet"
        href=${(0,n.J)(t)}
        nonce=${(0,n.J)(e)}
      >
      ${s}
    `}};p.styles=c,p.stylesheetHref="",p.nonce="",h([(0,s.MZ)()],p.prototype,"label",void 0),h([(0,s.MZ)({type:String})],p.prototype,"name",void 0),h([(0,s.MZ)({type:Number})],p.prototype,"size",void 0),h([(0,s.MZ)({type:Boolean,reflect:!0})],p.prototype,"spin",void 0),h([(0,s.MZ)({type:Number,attribute:"spin-duration"})],p.prototype,"spinDuration",void 0),h([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"action-icon"})],p.prototype,"actionIcon",void 0),p=d=h([(0,a.E)("vscode-icon")],p)},253:(t,e,o)=>{o.r(e),o.d(e,{VscodeCheckbox:()=>u});var i=o(929),s=o(577),r=o(309),n=o(152);class a extends n.N{constructor(){super(),this.focused=!1,this._prevTabindex=0,this._handleFocus=()=>{this.focused=!0},this._handleBlur=()=>{this.focused=!1}}connectedCallback(){super.connectedCallback(),this.addEventListener("focus",this._handleFocus),this.addEventListener("blur",this._handleBlur)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("focus",this._handleFocus),this.removeEventListener("blur",this._handleBlur)}attributeChangedCallback(t,e,o){super.attributeChangedCallback(t,e,o),"disabled"===t&&this.hasAttribute("disabled")?(this._prevTabindex=this.tabIndex,this.tabIndex=-1):"disabled"!==t||this.hasAttribute("disabled")||(this.tabIndex=this._prevTabindex)}}!function(t,e,o,i){var s,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);r>3&&n&&Object.defineProperty(e,o,n)}([(0,s.MZ)({type:Boolean,reflect:!0})],a.prototype,"focused",void 0);const l=t=>{class e extends t{constructor(){super(...arguments),this._label="",this._slottedText=""}set label(t){this._label=t,""===this._slottedText&&this.setAttribute("aria-label",t)}get label(){return this._label}_handleSlotChange(){this._slottedText=this.textContent?this.textContent.trim():"",""!==this._slottedText&&this.setAttribute("aria-label",this._slottedText)}_renderLabelAttribute(){return""===this._slottedText?i.qy`<span class="label-attr">${this._label}</span>`:i.qy`${i.s6}`}}return function(t,e,o,i){var s,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);r>3&&n&&Object.defineProperty(e,o,n)}([(0,s.MZ)()],e.prototype,"label",null),e};var c=o(651);const d=[i.AH`
    :host {
      color: var(--vscode-foreground, #cccccc);
      display: inline-block;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      line-height: 18px;
    }

    :host(:focus) {
      outline: none;
    }

    :host([disabled]) {
      opacity: 0.4;
    }

    .wrapper {
      cursor: pointer;
      display: block;
      font-size: var(--vscode-font-size, 13px);
      margin-bottom: 4px;
      margin-top: 4px;
      min-height: 18px;
      position: relative;
      user-select: none;
    }

    :host([disabled]) .wrapper {
      cursor: default;
    }

    input {
      position: absolute;
      height: 1px;
      left: 9px;
      margin: 0;
      top: 17px;
      width: 1px;
      overflow: hidden;
      clip: rect(1px, 1px, 1px, 1px);
      white-space: nowrap;
    }

    .icon {
      align-items: center;
      background-color: var(--vscode-settings-checkboxBackground, #313131);
      background-size: 16px;
      border: 1px solid var(--vscode-settings-checkboxBorder, #3c3c3c);
      box-sizing: border-box;
      color: var(--vscode-settings-checkboxForeground, #cccccc);
      display: flex;
      height: 18px;
      justify-content: center;
      left: 0;
      margin-left: 0;
      margin-right: 9px;
      padding: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
      width: 18px;
    }

    .icon.before-empty-label {
      margin-right: 0;
    }

    .label {
      cursor: pointer;
      display: block;
      min-height: 18px;
      min-width: 18px;
    }

    .label-inner {
      display: block;
      opacity: 0.9;
      padding-left: 27px;
    }

    .label-inner.empty {
      padding-left: 0;
    }

    :host([disabled]) .label {
      cursor: default;
    }
  `],h=[c.A,d,i.AH`
    :host(:invalid) .icon,
    :host([invalid]) .icon {
      background-color: var(--vscode-inputValidation-errorBackground, #5a1d1d);
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    .icon {
      border-radius: 3px;
    }

    .indeterminate-icon {
      background-color: currentColor;
      position: absolute;
      height: 1px;
      width: 12px;
    }

    :host(:focus):host(:not([disabled])) .icon {
      outline: 1px solid var(--vscode-focusBorder, #0078d4);
      outline-offset: -1px;
    }
  `];var p=function(t,e,o,i){var s,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n};let u=class extends(l(a)){set checked(t){this._checked=t,this._manageRequired(),this.requestUpdate()}get checked(){return this._checked}set required(t){this._required=t,this._manageRequired(),this.requestUpdate()}get required(){return this._required}get form(){return this._internals.form}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage}get willValidate(){return this._internals.willValidate}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}constructor(){super(),this.autofocus=!1,this._checked=!1,this.defaultChecked=!1,this.invalid=!1,this.name=void 0,this.role="checkbox",this.value="",this.disabled=!1,this.indeterminate=!1,this._required=!1,this.type="checkbox",this._handleClick=t=>{t.preventDefault(),this.disabled||this._toggleState()},this._handleKeyDown=t=>{this.disabled||"Enter"!==t.key&&" "!==t.key||(t.preventDefault()," "===t.key&&this._toggleState(),"Enter"===t.key&&this._internals.form?.requestSubmit())},this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this._handleKeyDown),this.updateComplete.then((()=>{this._manageRequired(),this._setActualFormValue()}))}disconnectedCallback(){this.removeEventListener("keydown",this._handleKeyDown)}update(t){super.update(t),t.has("checked")&&(this.ariaChecked=this.checked?"true":"false")}formResetCallback(){this.checked=this.defaultChecked}formStateRestoreCallback(t,e){t&&(this.checked=!0)}_setActualFormValue(){let t="";t=this.checked?this.value?this.value:"on":null,this._internals.setFormValue(t)}_toggleState(){this.checked=!this.checked,this.indeterminate=!1,this._setActualFormValue(),this._manageRequired(),this.dispatchEvent(new Event("change",{bubbles:!0})),this.dispatchEvent(new CustomEvent("vsc-change",{detail:{checked:this.checked,label:this.label,value:this.value},bubbles:!0,composed:!0}))}_manageRequired(){!this.checked&&this.required?this._internals.setValidity({valueMissing:!0},"Please check this box if you want to proceed.",this._inputEl??void 0):this._internals.setValidity({})}render(){const t=(0,r.H)({icon:!0,checked:this.checked,indeterminate:this.indeterminate}),e=(0,r.H)({"label-inner":!0}),o=i.qy`<svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      class="check-icon"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.431 3.323l-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506.764.646z"
      />
    </svg>`,s=this.checked&&!this.indeterminate?o:i.s6,n=this.indeterminate?i.qy`<span class="indeterminate-icon"></span>`:i.s6;return i.qy`
      <div class="wrapper">
        <input
          ?autofocus=${this.autofocus}
          id="input"
          class="checkbox"
          type="checkbox"
          ?checked=${this.checked}
          value=${this.value}
        >
        <div class=${t}>${n}${s}</div>
        <label for="input" class="label" @click=${this._handleClick}>
          <span class=${e}>
            ${this._renderLabelAttribute()}
            <slot @slotchange=${this._handleSlotChange}></slot>
          </span>
        </label>
      </div>
    `}};u.styles=h,u.formAssociated=!0,u.shadowRootOptions={...i.WF.shadowRootOptions,delegatesFocus:!0},p([(0,s.MZ)({type:Boolean,reflect:!0})],u.prototype,"autofocus",void 0),p([(0,s.MZ)({type:Boolean,reflect:!0})],u.prototype,"checked",null),p([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"default-checked"})],u.prototype,"defaultChecked",void 0),p([(0,s.MZ)({type:Boolean,reflect:!0})],u.prototype,"invalid",void 0),p([(0,s.MZ)({reflect:!0})],u.prototype,"name",void 0),p([(0,s.MZ)({reflect:!0})],u.prototype,"role",void 0),p([(0,s.MZ)()],u.prototype,"value",void 0),p([(0,s.MZ)({type:Boolean,reflect:!0})],u.prototype,"disabled",void 0),p([(0,s.MZ)({type:Boolean,reflect:!0})],u.prototype,"indeterminate",void 0),p([(0,s.MZ)({type:Boolean,reflect:!0})],u.prototype,"required",null),p([(0,s.MZ)()],u.prototype,"type",void 0),p([(0,s.P)("#input")],u.prototype,"_inputEl",void 0),u=p([(0,n.E)("vscode-checkbox")],u)},305:(t,e,o)=>{o.r(e),o.d(e,{VscodeFormGroup:()=>l});var i=o(929),s=o(577),r=o(152);const n=[o(651).A,i.AH`
    :host {
      --label-right-margin: 14px;
      --label-width: 150px;

      display: block;
      margin: 15px 0;
    }

    :host([variant='settings-group']) {
      margin: 0;
      padding: 12px 14px 18px;
      max-width: 727px;
    }

    .wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    :host([variant='vertical']) .wrapper,
    :host([variant='settings-group']) .wrapper {
      display: block;
    }

    :host([variant='horizontal']) ::slotted(vscode-checkbox-group),
    :host([variant='horizontal']) ::slotted(vscode-radio-group) {
      width: calc(100% - calc(var(--label-width) + var(--label-right-margin)));
    }

    :host([variant='horizontal']) ::slotted(vscode-label) {
      margin-right: var(--label-right-margin);
      text-align: right;
      width: var(--label-width);
    }

    :host([variant='settings-group']) ::slotted(vscode-label) {
      height: 18px;
      line-height: 18px;
      margin-bottom: 4px;
      margin-right: 0;
      padding: 0;
    }

    ::slotted(vscode-form-helper) {
      margin-left: calc(var(--label-width) + var(--label-right-margin));
    }

    :host([variant='vertical']) ::slotted(vscode-form-helper),
    :host([variant='settings-group']) ::slotted(vscode-form-helper) {
      display: block;
      margin-left: 0;
    }

    :host([variant='settings-group']) ::slotted(vscode-form-helper) {
      margin-bottom: 0;
      margin-top: 0;
    }

    :host([variant='vertical']) ::slotted(vscode-label),
    :host([variant='settings-group']) ::slotted(vscode-label) {
      display: block;
      margin-left: 0;
      text-align: left;
    }

    :host([variant='settings-group']) ::slotted(vscode-inputbox),
    :host([variant='settings-group']) ::slotted(vscode-textfield),
    :host([variant='settings-group']) ::slotted(vscode-textarea),
    :host([variant='settings-group']) ::slotted(vscode-single-select),
    :host([variant='settings-group']) ::slotted(vscode-multi-select) {
      margin-top: 9px;
    }

    ::slotted(vscode-button:first-child) {
      margin-left: calc(var(--label-width) + var(--label-right-margin));
    }

    :host([variant='vertical']) ::slotted(vscode-button) {
      margin-left: 0;
    }

    ::slotted(vscode-button) {
      margin-right: 4px;
    }
  `];var a=function(t,e,o,i){var s,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n};let l=class extends r.N{constructor(){super(...arguments),this.variant="horizontal"}render(){return i.qy`
      <div class="wrapper">
        <slot></slot>
      </div>
    `}};l.styles=n,a([(0,s.MZ)({reflect:!0})],l.prototype,"variant",void 0),l=a([(0,r.E)("vscode-form-group")],l)},309:(t,e,o)=>{o.d(e,{H:()=>r});var i=o(181),s=o(655);const r=(0,s.u$)(class extends s.WL{constructor(t){if(super(t),t.type!==s.OA.ATTRIBUTE||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const o=t.element.classList;for(const t of this.st)t in e||(o.remove(t),this.st.delete(t));for(const t in e){const i=!!e[t];i===this.st.has(t)||this.nt?.has(t)||(i?(o.add(t),this.st.add(t)):(o.remove(t),this.st.delete(t)))}return i.c0}})},513:(t,e,o)=>{o.r(e),o.d(e,{VscodeButton:()=>u});var i=o(929),s=o(577),r=o(309),n=o(152),a=(o(231),o(651)),l=o(47);const c=(0,i.iz)((0,l.bE)()),d=[a.A,i.AH`
    :host {
      background-color: var(--vscode-button-background, #0078d4);
      border-color: var(--vscode-button-border, transparent);
      border-style: solid;
      border-radius: 2px;
      border-width: 1px;
      color: var(--vscode-button-foreground, #ffffff);
      cursor: pointer;
      display: inline-block;
      font-family: var(--vscode-font-family, ${c});
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      line-height: 22px;
      overflow: hidden;
      padding: 1px 13px;
      user-select: none;
      white-space: nowrap;
    }

    :host([secondary]) {
      color: var(--vscode-button-secondaryForeground, #cccccc);
      background-color: var(--vscode-button-secondaryBackground, #313131);
      border-color: var(
        --vscode-button-border,
        var(--vscode-button-secondaryBackground, rgba(255, 255, 255, 0.07))
      );
    }

    :host([disabled]) {
      cursor: default;
      opacity: 0.4;
      pointer-events: none;
    }

    :host(:hover) {
      background-color: var(--vscode-button-hoverBackground, #026ec1);
    }

    :host([disabled]:hover) {
      background-color: var(--vscode-button-background, #0078d4);
    }

    :host([secondary]:hover) {
      background-color: var(--vscode-button-secondaryHoverBackground, #3c3c3c);
    }

    :host([secondary][disabled]:hover) {
      background-color: var(--vscode-button-secondaryBackground, #313131);
    }

    :host(:focus),
    :host(:active) {
      outline: none;
    }

    :host(:focus) {
      background-color: var(--vscode-button-hoverBackground, #026ec1);
      outline: 1px solid var(--vscode-focusBorder, #0078d4);
      outline-offset: 2px;
    }

    :host([disabled]:focus) {
      background-color: var(--vscode-button-background, #0078d4);
      outline: 0;
    }

    :host([secondary]:focus) {
      background-color: var(--vscode-button-secondaryHoverBackground, #3c3c3c);
    }

    :host([secondary][disabled]:focus) {
      background-color: var(--vscode-button-secondaryBackground, #313131);
    }

    ::slotted(*) {
      display: inline-block;
      margin-left: 4px;
      margin-right: 4px;
    }

    ::slotted(*:first-child) {
      margin-left: 0;
    }

    ::slotted(vscode-icon) {
      color: inherit;
    }

    .wrapper {
      align-items: center;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      position: relative;
      width: 100%;
    }

    slot {
      align-items: center;
      display: flex;
      height: 100%;
    }

    .icon {
      color: inherit;
      display: block;
      margin-right: 3px;
    }

    .icon-after {
      color: inherit;
      display: block;
      margin-left: 3px;
    }
  `];var h=o(216),p=function(t,e,o,i){var s,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n};let u=class extends n.N{get form(){return this._internals.form}constructor(){super(),this.autofocus=!1,this.tabIndex=0,this.secondary=!1,this.role="button",this.disabled=!1,this.icon="",this.iconSpin=!1,this.iconAfter="",this.iconAfterSpin=!1,this.focused=!1,this.name=void 0,this.type="button",this.value="",this._prevTabindex=0,this._handleFocus=()=>{this.focused=!0},this._handleBlur=()=>{this.focused=!1},this.addEventListener("keydown",this._handleKeyDown.bind(this)),this.addEventListener("click",this._handleClick.bind(this)),this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),this.autofocus&&(this.tabIndex<0&&(this.tabIndex=0),this.updateComplete.then((()=>{this.focus(),this.requestUpdate()}))),this.addEventListener("focus",this._handleFocus),this.addEventListener("blur",this._handleBlur)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("focus",this._handleFocus),this.removeEventListener("blur",this._handleBlur)}update(t){super.update(t),t.has("value")&&this._internals.setFormValue(this.value),t.has("disabled")&&(this.disabled?(this._prevTabindex=this.tabIndex,this.tabIndex=-1):this.tabIndex=this._prevTabindex)}_executeAction(){"submit"===this.type&&this._internals.form&&this._internals.form.requestSubmit(),"reset"===this.type&&this._internals.form&&this._internals.form.reset()}_handleKeyDown(t){if(("Enter"===t.key||" "===t.key)&&!this.hasAttribute("disabled")){this.dispatchEvent(new CustomEvent("vsc-click",{detail:{originalEvent:new MouseEvent("click")}}));const t=new MouseEvent("click",{bubbles:!0,cancelable:!0});t.synthetic=!0,this.dispatchEvent(t),this._executeAction()}}_handleClick(t){t.synthetic||this.hasAttribute("disabled")||(this.dispatchEvent(new CustomEvent("vsc-click",{detail:{originalEvent:t}})),this._executeAction())}render(){const t=""!==this.icon,e=""!==this.iconAfter,o={wrapper:!0,"has-icon-before":t,"has-icon-after":e},s=t?i.qy`<vscode-icon
          name=${this.icon}
          ?spin=${this.iconSpin}
          spin-duration=${(0,h.J)(this.iconSpinDuration)}
          class="icon"
        ></vscode-icon>`:i.s6,n=e?i.qy`<vscode-icon
          name=${this.iconAfter}
          ?spin=${this.iconAfterSpin}
          spin-duration=${(0,h.J)(this.iconAfterSpinDuration)}
          class="icon-after"
        ></vscode-icon>`:i.s6;return i.qy`
      <span class=${(0,r.H)(o)}>
        ${s}
        <slot></slot>
        ${n}
      </span>
    `}};u.styles=d,u.formAssociated=!0,p([(0,s.MZ)({type:Boolean,reflect:!0})],u.prototype,"autofocus",void 0),p([(0,s.MZ)({type:Number,reflect:!0})],u.prototype,"tabIndex",void 0),p([(0,s.MZ)({type:Boolean,reflect:!0})],u.prototype,"secondary",void 0),p([(0,s.MZ)({reflect:!0})],u.prototype,"role",void 0),p([(0,s.MZ)({type:Boolean,reflect:!0})],u.prototype,"disabled",void 0),p([(0,s.MZ)()],u.prototype,"icon",void 0),p([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"icon-spin"})],u.prototype,"iconSpin",void 0),p([(0,s.MZ)({type:Number,reflect:!0,attribute:"icon-spin-duration"})],u.prototype,"iconSpinDuration",void 0),p([(0,s.MZ)({attribute:"icon-after"})],u.prototype,"iconAfter",void 0),p([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"icon-after-spin"})],u.prototype,"iconAfterSpin",void 0),p([(0,s.MZ)({type:Number,reflect:!0,attribute:"icon-after-spin-duration"})],u.prototype,"iconAfterSpinDuration",void 0),p([(0,s.MZ)({type:Boolean,reflect:!0})],u.prototype,"focused",void 0),p([(0,s.MZ)({type:String,reflect:!0})],u.prototype,"name",void 0),p([(0,s.MZ)({reflect:!0})],u.prototype,"type",void 0),p([(0,s.MZ)()],u.prototype,"value",void 0),u=p([(0,n.E)("vscode-button")],u)},577:(t,e,o)=>{o.d(e,{MZ:()=>n,P:()=>c,KN:()=>d,wk:()=>a});var i=o(803);const s={attribute:!0,type:String,converter:i.W3,reflect:!1,hasChanged:i.Ec},r=(t=s,e,o)=>{const{kind:i,metadata:r}=o;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),n.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const s=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,s,t)},init(e){return void 0!==e&&this.P(i,void 0,t),e}}}if("setter"===i){const{name:i}=o;return function(o){const s=this[i];e.call(this,o),this.requestUpdate(i,s,t)}}throw Error("Unsupported decorator location: "+i)};function n(t){return(e,o)=>"object"==typeof o?r(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,i?{...t,wrapped:!0}:t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function a(t){return n({...t,state:!0,attribute:!1})}const l=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,o),o);function c(t,e){return(o,i,s)=>{const r=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:e}="object"==typeof i?o:s??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return l(o,i,{get(){let o=t.call(this);return void 0===o&&(o=r(this),(null!==o||this.hasUpdated)&&e.call(this,o)),o}})}return l(o,i,{get(){return r(this)}})}}function d(t){return(e,o)=>{const{slot:i,selector:s}=t??{},r="slot"+(i?`[name=${i}]`:":not([name])");return l(e,o,{get(){const e=this.renderRoot?.querySelector(r),o=e?.assignedElements(t)??[];return void 0===s?o:o.filter((t=>t.matches(s)))}})}}},619:(t,e,o)=>{o.r(e),o.d(e,{VscodeCheckboxGroup:()=>l});var i=o(929),s=o(577),r=o(152);const n=[o(651).A,i.AH`
    :host {
      display: block;
    }

    .wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    :host([variant='vertical']) .wrapper {
      display: block;
    }

    ::slotted(vscode-checkbox) {
      margin-right: 20px;
    }

    ::slotted(vscode-checkbox:last-child) {
      margin-right: 0;
    }

    :host([variant='vertical']) ::slotted(vscode-checkbox) {
      display: block;
      margin-bottom: 15px;
    }

    :host([variant='vertical']) ::slotted(vscode-checkbox:last-child) {
      margin-bottom: 0;
    }
  `];var a=function(t,e,o,i){var s,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n};let l=class extends r.N{constructor(){super(...arguments),this.role="group",this.variant="horizontal"}render(){return i.qy`
      <div class="wrapper">
        <slot></slot>
      </div>
    `}};l.styles=n,a([(0,s.MZ)({reflect:!0})],l.prototype,"role",void 0),a([(0,s.MZ)({reflect:!0})],l.prototype,"variant",void 0),l=a([(0,r.E)("vscode-checkbox-group")],l)},651:(t,e,o)=>{o.d(e,{A:()=>i});const i=o(929).AH`
  :host([hidden]) {
    display: none;
  }

  :host([disabled]),
  :host(:disabled) {
    cursor: not-allowed;
    opacity: 0.4;
    pointer-events: none;
  }
`},655:(t,e,o)=>{o.d(e,{OA:()=>i,WL:()=>r,u$:()=>s});const i={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},s=t=>(...e)=>({_$litDirective$:t,values:e});class r{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}},803:(t,e,o)=>{o.d(e,{mN:()=>E,AH:()=>c,W3:()=>$,Ec:()=>w,iz:()=>l});const i=globalThis,s=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),n=new WeakMap;class a{constructor(t,e,o){if(this._$cssResult$=!0,o!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&n.set(e,t))}return t}toString(){return this.cssText}}const l=t=>new a("string"==typeof t?t:t+"",void 0,r),c=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1]),t[0]);return new a(o,t,r)},d=(t,e)=>{if(s)t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const o of e){const e=document.createElement("style"),s=i.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=o.cssText,t.appendChild(e)}},h=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return l(e)})(t):t,{is:p,defineProperty:u,getOwnPropertyDescriptor:v,getOwnPropertyNames:f,getOwnPropertySymbols:g,getPrototypeOf:b}=Object,y=globalThis,m=y.trustedTypes,_=m?m.emptyScript:"",x=y.reactiveElementPolyfillSupport,k=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},w=(t,e)=>!p(t,e),A={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),y.litPropertyMetadata??=new WeakMap;class E extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=A){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&u(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:s}=v(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return i?.call(this)},set(e){const r=i?.call(this);s.call(this,e),this.requestUpdate(t,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??A}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;const t=b(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){const t=this.properties,e=[...f(t),...g(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(h(t))}else void 0!==t&&e.push(h(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return d(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EC(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){const s=(void 0!==o.converter?.toAttribute?o.converter:$).toAttribute(e,o.type);this._$Em=t,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=o.getPropertyOptions(i),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i,this[i]=s.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,o){if(void 0!==t){if(o??=this.constructor.getPropertyOptions(t),!(o.hasChanged??w)(this[t],e))return;this.P(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,o){this._$AL.has(t)||this._$AL.set(t,e),!0===o.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t)!0!==o.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[k("elementProperties")]=new Map,E[k("finalized")]=new Map,x?.({ReactiveElement:E}),(y.reactiveElementVersions??=[]).push("2.0.4")},929:(t,e,o)=>{o.d(e,{WF:()=>r,AH:()=>i.AH,qy:()=>s.qy,c0:()=>s.c0,s6:()=>s.s6,iz:()=>i.iz});var i=o(803),s=o(181);class r extends i.mN{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=(0,s.XX)(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return s.c0}}r._$litElement$=!0,r.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:r});const n=globalThis.litElementPolyfillSupport;n?.({LitElement:r}),(globalThis.litElementVersions??=[]).push("4.1.1")},955:(t,e,o)=>{o.r(e),o.d(e,{VscodeLabel:()=>k});var i=o(929),s=o(577),r=o(309);let n=0;var a=o(152),l=o(619),c=o(651);const d=[c.A,i.AH`
    :host {
      display: block;
    }

    .wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    :host([variant='vertical']) .wrapper {
      display: block;
    }

    ::slotted(vscode-radio) {
      margin-right: 20px;
    }

    ::slotted(vscode-radio:last-child) {
      margin-right: 0;
    }

    :host([variant='vertical']) ::slotted(vscode-radio) {
      display: block;
      margin-bottom: 15px;
    }

    :host([variant='vertical']) ::slotted(vscode-radio:last-child) {
      margin-bottom: 0;
    }
  `];var h=function(t,e,o,i){var s,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n};let p=class extends a.N{constructor(){super(...arguments),this.variant="horizontal",this.role="radiogroup",this._focusedRadio=-1,this._checkedRadio=-1,this._firstContentLoaded=!1,this._onKeyDownBound=this._onKeyDown.bind(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this._onKeyDownBound)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this._onKeyDownBound)}_uncheckPreviousChecked(t,e){-1!==t&&(this._radios[t].checked=!1),-1!==e&&(this._radios[e].tabIndex=-1)}_afterCheck(){this._focusedRadio=this._checkedRadio,this._radios[this._checkedRadio].checked=!0,this._radios[this._checkedRadio].tabIndex=0,this._radios[this._checkedRadio].focus()}_checkPrev(){const t=this._radios.findIndex((t=>t.checked)),e=this._radios.findIndex((t=>t.focused)),o=-1!==e?e:t;this._uncheckPreviousChecked(t,e),this._checkedRadio=-1===o?this._radios.length-1:o-1>=0?o-1:this._radios.length-1,this._afterCheck()}_checkNext(){const t=this._radios.findIndex((t=>t.checked)),e=this._radios.findIndex((t=>t.focused)),o=-1!==e?e:t;this._uncheckPreviousChecked(t,e),-1===o?this._checkedRadio=0:o+1<this._radios.length?this._checkedRadio=o+1:this._checkedRadio=0,this._afterCheck()}_onKeyDown(t){const{key:e}=t;["ArrowLeft","ArrowUp","ArrowRight","ArrowDown"].includes(e)&&t.preventDefault(),"ArrowRight"!==e&&"ArrowDown"!==e||this._checkNext(),"ArrowLeft"!==e&&"ArrowUp"!==e||this._checkPrev()}_onChange(t){const e=this._radios.findIndex((e=>e===t.target));-1!==e&&(-1!==this._focusedRadio&&(this._radios[this._focusedRadio].tabIndex=-1),-1!==this._checkedRadio&&this._checkedRadio!==e&&(this._radios[this._checkedRadio].checked=!1),this._focusedRadio=e,this._checkedRadio=e,this._radios[e].tabIndex=0)}_onSlotChange(){if(!this._firstContentLoaded){const t=this._radios.findIndex((t=>t.autofocus));t>-1&&(this._focusedRadio=t),this._firstContentLoaded=!0}this._radios.forEach(((t,e)=>{this._focusedRadio>-1?t.tabIndex=e===this._focusedRadio?0:-1:t.tabIndex=0===e?0:-1}))}render(){return i.qy`
      <div class="wrapper">
        <slot
          @slotchange=${this._onSlotChange}
          @vsc-change=${this._onChange}
        ></slot>
      </div>
    `}};p.styles=d,h([(0,s.MZ)({reflect:!0})],p.prototype,"variant",void 0),h([(0,s.MZ)({reflect:!0})],p.prototype,"role",void 0),h([(0,s.KN)({selector:"vscode-radio"})],p.prototype,"_radios",void 0),h([(0,s.wk)()],p.prototype,"_focusedRadio",void 0),h([(0,s.wk)()],p.prototype,"_checkedRadio",void 0),p=h([(0,a.E)("vscode-radio-group")],p);var u=o(216),v=o(171);const f=[c.A,i.AH`
    :host {
      display: inline-block;
      height: 40px;
      position: relative;
      width: 320px;
    }

    :host([cols]) {
      width: auto;
    }

    :host([rows]) {
      height: auto;
    }

    .shadow {
      box-shadow: var(--vscode-scrollbar-shadow, #000000) 0 6px 6px -6px inset;
      display: none;
      inset: 0 0 auto 0;
      height: 6px;
      pointer-events: none;
      position: absolute;
      width: 100%;
    }

    .shadow.visible {
      display: block;
    }

    textarea {
      background-color: var(--vscode-settings-textInputBackground, #313131);
      border-color: var(--vscode-settings-textInputBorder, transparent);
      border-radius: 2px;
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      color: var(--vscode-settings-textInputForeground, #cccccc);
      display: block;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      height: 100%;
      width: 100%;
    }

    :host([cols]) textarea {
      width: auto;
    }

    :host([rows]) textarea {
      height: auto;
    }

    :host([invalid]) textarea,
    :host(:invalid) textarea {
      background-color: var(--vscode-inputValidation-errorBackground, #5a1d1d);
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    textarea.monospace {
      background-color: var(--vscode-editor-background, #1f1f1f);
      color: var(--vscode-editor-foreground, #cccccc);
      font-family: var(--vscode-editor-font-family, monospace);
      font-size: var(--vscode-editor-font-size, 14px);
      font-weight: var(--vscode-editor-font-weight, normal);
    }

    .textarea.monospace::placeholder {
      color: var(
        --vscode-editor-inlineValuesForeground,
        rgba(255, 255, 255, 0.5)
      );
    }

    textarea.cursor-pointer {
      cursor: pointer;
    }

    textarea:focus {
      border-color: var(--vscode-focusBorder, #0078d4);
      outline: none;
    }

    textarea::placeholder {
      color: var(--vscode-input-placeholderForeground, #989898);
      opacity: 1;
    }

    textarea::-webkit-scrollbar-track {
      background-color: transparent;
    }

    textarea::-webkit-scrollbar {
      width: 14px;
    }

    textarea::-webkit-scrollbar-thumb {
      background-color: transparent;
    }

    textarea:hover::-webkit-scrollbar-thumb {
      background-color: var(
        --vscode-scrollbarSlider-background,
        rgba(121, 121, 121, 0.4)
      );
    }

    textarea::-webkit-scrollbar-thumb:hover {
      background-color: var(
        --vscode-scrollbarSlider-hoverBackground,
        rgba(100, 100, 100, 0.7)
      );
    }

    textarea::-webkit-scrollbar-thumb:active {
      background-color: var(
        --vscode-scrollbarSlider-activeBackground,
        rgba(191, 191, 191, 0.4)
      );
    }

    textarea::-webkit-scrollbar-corner {
      background-color: transparent;
    }

    textarea::-webkit-resizer {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAACJJREFUeJxjYMAOZuIQZ5j5//9/rJJESczEKYGsG6cEXgAAsEEefMxkua4AAAAASUVORK5CYII=');
      background-repeat: no-repeat;
      background-position: right bottom;
    }
  `];var g=function(t,e,o,i){var s,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n};let b=class extends a.N{set value(t){this._value=t,this._internals.setFormValue(t)}get value(){return this._value}get wrappedElement(){return this._textareaEl}get form(){return this._internals.form}get type(){return"textarea"}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage}get willValidate(){return this._internals.willValidate}set minlength(t){this.minLength=t}get minlength(){return this.minLength}set maxlength(t){this.maxLength=t}get maxlength(){return this.maxLength}constructor(){super(),this.autocomplete=void 0,this.autofocus=!1,this.defaultValue="",this.disabled=!1,this.invalid=!1,this.label="",this.maxLength=void 0,this.minLength=void 0,this.rows=void 0,this.cols=void 0,this.name=void 0,this.placeholder=void 0,this.readonly=!1,this.resize="none",this.required=!1,this.spellcheck=!1,this.monospace=!1,this._value="",this._textareaPointerCursor=!1,this._shadow=!1,this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),this.updateComplete.then((()=>{this._textareaEl.checkValidity(),this._setValidityFromInput(),this._internals.setFormValue(this._textareaEl.value)}))}updated(t){const e=["maxLength","minLength","required"];for(const o of t.keys())if(e.includes(String(o))){this.updateComplete.then((()=>{this._setValidityFromInput()}));break}}formResetCallback(){this.value=this.defaultValue}formStateRestoreCallback(t,e){this.updateComplete.then((()=>{this._value=t}))}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}_setValidityFromInput(){this._internals.setValidity(this._textareaEl.validity,this._textareaEl.validationMessage,this._textareaEl)}_dataChanged(){this._value=this._textareaEl.value,this._internals.setFormValue(this._textareaEl.value)}_handleChange(t){this._dataChanged(),this._setValidityFromInput(),this.dispatchEvent(new Event("change")),this.dispatchEvent(new CustomEvent("vsc-change",{detail:{data:this.value,originalEvent:t}}))}_handleInput(t){this._dataChanged(),this._setValidityFromInput(),this.dispatchEvent(new CustomEvent("vsc-input",{detail:{data:t.data,originalEvent:t}}))}_handleMouseMove(t){if(this._textareaEl.clientHeight>=this._textareaEl.scrollHeight)return void(this._textareaPointerCursor=!1);const e=this._textareaEl.getBoundingClientRect(),o=t.clientX;this._textareaPointerCursor=o>=e.left+e.width-14-2}_handleScroll(){this._shadow=this._textareaEl.scrollTop>0}render(){return i.qy`
      <div
        class=${(0,r.H)({shadow:!0,visible:this._shadow})}
      ></div>
      <textarea
        autocomplete=${(0,u.J)(this.autocomplete)}
        ?autofocus=${this.autofocus}
        ?disabled=${this.disabled}
        aria-label=${this.label}
        id="textarea"
        class=${(0,r.H)({monospace:this.monospace,"cursor-pointer":this._textareaPointerCursor})}
        maxlength=${(0,u.J)(this.maxLength)}
        minlength=${(0,u.J)(this.minLength)}
        rows=${(0,u.J)(this.rows)}
        cols=${(0,u.J)(this.cols)}
        name=${(0,u.J)(this.name)}
        placeholder=${(0,u.J)(this.placeholder)}
        ?readonly=${this.readonly}
        .style=${(0,v.T)({resize:this.resize})}
        ?required=${this.required}
        spellcheck=${this.spellcheck}
        @change=${this._handleChange}
        @input=${this._handleInput}
        @mousemove=${this._handleMouseMove}
        @scroll=${this._handleScroll}
        .value=${this._value}
      ></textarea>
    `}};b.styles=f,b.formAssociated=!0,b.shadowRootOptions={...i.WF.shadowRootOptions,delegatesFocus:!0},g([(0,s.MZ)()],b.prototype,"autocomplete",void 0),g([(0,s.MZ)({type:Boolean,reflect:!0})],b.prototype,"autofocus",void 0),g([(0,s.MZ)({attribute:"default-value"})],b.prototype,"defaultValue",void 0),g([(0,s.MZ)({type:Boolean,reflect:!0})],b.prototype,"disabled",void 0),g([(0,s.MZ)({type:Boolean,reflect:!0})],b.prototype,"invalid",void 0),g([(0,s.MZ)({attribute:!1})],b.prototype,"label",void 0),g([(0,s.MZ)({type:Number})],b.prototype,"maxLength",void 0),g([(0,s.MZ)({type:Number})],b.prototype,"minLength",void 0),g([(0,s.MZ)({type:Number})],b.prototype,"rows",void 0),g([(0,s.MZ)({type:Number})],b.prototype,"cols",void 0),g([(0,s.MZ)()],b.prototype,"name",void 0),g([(0,s.MZ)()],b.prototype,"placeholder",void 0),g([(0,s.MZ)({type:Boolean,reflect:!0})],b.prototype,"readonly",void 0),g([(0,s.MZ)()],b.prototype,"resize",void 0),g([(0,s.MZ)({type:Boolean,reflect:!0})],b.prototype,"required",void 0),g([(0,s.MZ)({type:Boolean})],b.prototype,"spellcheck",void 0),g([(0,s.MZ)({type:Boolean,reflect:!0})],b.prototype,"monospace",void 0),g([(0,s.MZ)()],b.prototype,"value",null),g([(0,s.P)("#textarea")],b.prototype,"_textareaEl",void 0),g([(0,s.wk)()],b.prototype,"_value",void 0),g([(0,s.wk)()],b.prototype,"_textareaPointerCursor",void 0),g([(0,s.wk)()],b.prototype,"_shadow",void 0),b=g([(0,a.E)("vscode-textarea")],b);var y=o(25),m=o(47);const _=[c.A,i.AH`
    :host {
      color: var(--vscode-foreground, #cccccc);
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: 600;
      line-height: ${m.Sw};
      cursor: default;
      display: block;
      padding: 5px 0;
    }

    .wrapper {
      display: block;
    }

    .wrapper.required:after {
      content: ' *';
    }

    ::slotted(.normal) {
      font-weight: normal;
    }

    ::slotted(.lightened) {
      color: var(--vscode-foreground, #cccccc);
      opacity: 0.9;
    }
  `];var x=function(t,e,o,i){var s,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n};let k=class extends a.N{constructor(){super(...arguments),this.required=!1,this._id="",this._htmlFor="",this._connected=!1}set htmlFor(t){this._htmlFor=t,this.setAttribute("for",t),this._connected&&this._connectWithTarget()}get htmlFor(){return this._htmlFor}set id(t){this._id=t}get id(){return this._id}attributeChangedCallback(t,e,o){super.attributeChangedCallback(t,e,o)}connectedCallback(){super.connectedCallback(),this._connected=!0,""===this._id&&(this._id=((t="")=>(n++,`${t}${n}`))("vscode-label-"),this.setAttribute("id",this._id)),this._connectWithTarget()}_getTarget(){let t=null;if(this._htmlFor){const e=this.getRootNode({composed:!1});e&&(t=e.querySelector(`#${this._htmlFor}`))}return t}async _connectWithTarget(){await this.updateComplete;const t=this._getTarget();(t instanceof p||t instanceof l.VscodeCheckboxGroup)&&t.setAttribute("aria-labelledby",this._id);let e="";this.textContent&&(e=this.textContent.trim()),(t instanceof y.VscodeTextfield||t instanceof b)&&(t.label=e)}_handleClick(){const t=this._getTarget();t&&"focus"in t&&t.focus()}render(){return i.qy`
      <label
        class=${(0,r.H)({wrapper:!0,required:this.required})}
        @click=${this._handleClick}
        ><slot></slot
      ></label>
    `}};k.styles=_,x([(0,s.MZ)({reflect:!0,attribute:"for"})],k.prototype,"htmlFor",null),x([(0,s.MZ)()],k.prototype,"id",null),x([(0,s.MZ)({type:Boolean,reflect:!0})],k.prototype,"required",void 0),k=x([(0,a.E)("vscode-label")],k)}},e={};function o(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i](r,r.exports,o),r.exports}o.d=(t,e)=>{for(var i in e)o.o(e,i)&&!o.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o(513),o(105),o(305),o(231),o(955),o(25),o(253),o(619)})();