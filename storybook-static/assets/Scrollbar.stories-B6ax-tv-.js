import{j as w}from"./jsx-runtime-D_zvdyIk.js";import{r as m}from"./index-BZISi7jw.js";import{f as D}from"./index-cNkFZXRj.js";import"./_commonjsHelpers-CqkleIqs.js";const I="#aaaabb",H="#9999aa",U="#888899",j="#ccccdd",x="transparent",N="transparent",_=8,F=8,K={borderRadius:F,width:_,height:_,thumbColor:I,thumbHoverColor:U,trackColor:x,thumbColorDark:H,thumbHoverColorDark:j,trackColorDark:N},B=(e,t={})=>{var o,r,n,c,a,l,i,u,d;const s=e?`[data-tsb-id="${e}"]`:"*",h=(o=t.borderRadius)!==null&&o!==void 0?o:F,C=(r=t.width)!==null&&r!==void 0?r:_,g=(n=t.height)!==null&&n!==void 0?n:_,y=(c=t.thumbColor)!==null&&c!==void 0?c:I,S=(a=t.thumbHoverColor)!==null&&a!==void 0?a:U,b=(l=t.trackColor)!==null&&l!==void 0?l:x,k=(i=t.thumbColorDark)!==null&&i!==void 0?i:H,p=(u=t.thumbHoverColorDark)!==null&&u!==void 0?u:j,R=(d=t.trackColorDark)!==null&&d!==void 0?d:N,V=`/* Variables */
${s} {
	--tsb_width: ${C}px;
	--tsb_height: ${g}px;
	--tsb_borderRadius: ${h?`${h}px`:"initial"};
}
${s} {
	--tsb_scrollCornerBackground: ${h?"initial":"transparent"};
	--tsb_thumbColor: ${y};
	--tsb_thumbHoverColor: ${S};
	--tsb_trackColor: ${b};
}
@media (prefers-color-scheme: dark) {
	${s} {
		--tsb_thumbColor: ${k};
		--tsb_thumbHoverColor: ${p};
		--tsb_trackColor: ${R};
	}
}`;return`${`/* thavixt-scrollbar stylesheet for element ${s} */
${V}
/* dimensions */
${s}::-webkit-scrollbar {
	width: var(--tsb_width);
	height: var(--tsb_height);
}

/* scrollbar track style */
${s}::-webkit-scrollbar-track {
	border-radius: var(--tsb_borderRadius);
	background: var(--tsb_trackColor);
}

/* scrollbar track corner style */
${s}::-webkit-scrollbar-corner {
	background: var(--tsb_scrollCornerBackground);
}

/* scrollbar thumb styles */
${s}::-webkit-scrollbar-thumb {
	border-radius: var(--tsb_borderRadius);
	background: var(--tsb_thumbColor);
}

/* scrollbar hovered thumb styles */
${s}::-webkit-scrollbar-thumb:hover {
	background: var(--tsb_thumbHoverColor);
}

/* fallback - Firefox doesn't support '::-webkit-scrollbar' selectors */
@supports (-moz-appearance:none) {
	${s} {
		scrollbar-color: var(--tsb_thumbColor) var(--tsb_trackColor);
	}
}`}`};B("REPLACEME").replace(/="REPLACEME"/g,"");let q=class{constructor(t,o={}){this.container=t,this.options=o,this.stylesheetId="",this.tsbId="",this.scrollTop=0,this.scrollLeft=0,this.prevScrollDetails=null,this.prevThresholdsReached=null,this.init=()=>{this.addStyleSheet(),this.addEventListeners(),this.container.style.overflow="auto",this.container.dataset.tsbId=this.tsbId},this.destroy=()=>{this.removeStyleSheet(),this.removeEventListeners(),delete this.container.dataset.tsbId},this.addStyleSheet=()=>{!!document.getElementById(this.stylesheetId)&&this.removeStyleSheet();const c=document.createElement("style");c.id=this.stylesheetId;const a=this.container===document.body;c.appendChild(document.createTextNode(B(a?null:this.tsbId,Object.assign(Object.assign({},K),this.options.styles)))),document.head.prepend(c)},this.removeStyleSheet=()=>{const n=document.getElementById(this.stylesheetId);n&&n.remove()},this.addEventListeners=()=>{this.container.addEventListener("scroll",this.onScroll)},this.removeEventListeners=()=>{this.container.removeEventListener("scroll",this.onScroll)},this.onClick=()=>{console.log("Not yet implemented - Scrollbar::onClick()")},this.onScroll=n=>{var c,a;const l=n.target,i=l.scrollTop,u=Math.ceil(l.scrollHeight-l.scrollTop),d=l.scrollLeft,s=Math.ceil(l.scrollWidth-l.scrollLeft),h={top:i,bottom:u,left:d,right:s},C=!!this.scrollTop&&i===0,g=u===l.clientHeight,y=!!this.scrollLeft&&d===0,S=s===l.clientWidth,b=J({top:C,bottom:g,left:y,right:S});this.scrollTop=i,this.scrollLeft=d;const k=JSON.stringify(b)!==JSON.stringify(this.prevThresholdsReached),p=Object.keys(b);k&&p.length?(this.prevThresholdsReached&&this.options.onScrollToEnd&&this.options.onScrollToEnd(p),this.prevThresholdsReached=b,this.container.dataset.animating=Object.keys(b).join(",")):delete this.container.dataset.animating,JSON.stringify(h)!==JSON.stringify(this.prevScrollDetails)&&(this.prevScrollDetails&&((a=(c=this.options).onScroll)===null||a===void 0||a.call(c,h)),this.prevScrollDetails=h)};const r=crypto.randomUUID().slice(0,8);this.tsbId=`tsb_scrollbar_${r}`,this.stylesheetId=`tsb_scrollbar_style_${r}`,this.init()}};function J(e){return Object.keys(e).reduce((t,o)=>e[o]?Object.assign(Object.assign({},t),{[o]:e[o]}):t,{})}function P(e){const t=m.useRef(null),o=m.useRef(document.body),r=m.useRef(null);return m.useEffect(()=>{e.body&&(t.current=null)},[e.body]),m.useEffect(()=>{if(t.current||e.body)return r.current=new q(e.body?document.body:t.current,e),()=>{r.current&&r.current.destroy(),r.current=null}},[e]),e.body?o:t}function M({styles:e={},onScroll:t,onScrollToEnd:o,...r}){const n=P({styles:e,onScroll:t,onScrollToEnd:o});return w.jsx("div",{ref:n,className:r.className,children:r.children})}M.__docgenInfo={description:"",methods:[],displayName:"Scrollbar",props:{className:{required:!1,tsType:{name:"string"},description:""},styles:{required:!1,tsType:{name:"ScrollbarStyles"},description:"",defaultValue:{value:"{}",computed:!1}},onScroll:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onScrollToEnd:{required:!1,tsType:{name:"signature",type:"function",raw:"(direction: ScrollDirection[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"ScrollDirection"}],raw:"ScrollDirection[]"},name:"direction"}],return:{name:"void"}}},description:""}},composes:["PropsWithChildren"]};function W(){return w.jsx("div",{className:"h-[200px]",children:new Array(20).fill("Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, possimus officiis aut laudantium accusantium sint nam. Corporis nulla tempora id unde maiores dolorum, quae tempore? Nemo officiis aliquid dicta tempora.").join(" ")})}const tt={title:"Scrollbar",component:M,tags:["autodocs"],args:{children:W(),onScroll:D(),onScrollToEnd:D()}},f={},v={args:{styles:{height:16,width:16,borderRadius:0,thumbColor:"#4f4",thumbColorDark:"#4f4",trackColor:"#ccd",trackColorDark:"#ccd"}}};var E,T,L;f.parameters={...f.parameters,docs:{...(E=f.parameters)==null?void 0:E.docs,source:{originalSource:"{}",...(L=(T=f.parameters)==null?void 0:T.docs)==null?void 0:L.source}}};var O,$,A;v.parameters={...v.parameters,docs:{...(O=v.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    styles: {
      height: 16,
      width: 16,
      borderRadius: 0,
      thumbColor: '#4f4',
      thumbColorDark: '#4f4',
      trackColor: '#ccd',
      trackColorDark: '#ccd'
    }
  }
}`,...(A=($=v.parameters)==null?void 0:$.docs)==null?void 0:A.source}}};const et=["Default","Custom"];export{v as Custom,f as Default,et as __namedExportsOrder,tt as default};
