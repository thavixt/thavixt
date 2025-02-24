import{j as f}from"./jsx-runtime-D_zvdyIk.js";import{c as v}from"./index-FGJkmGnF.js";import{f as x}from"./index-cNkFZXRj.js";import"./_commonjsHelpers-CqkleIqs.js";function u({className:g,children:y,variant:s="primary"}){return f.jsx("button",{className:v("cursor-pointer font-bold px-2 py-1 rounded-md active:scale-95",{"text-slate-100 bg-green-600":s==="primary","text-slate-100 bg-indigo-500":s==="secondary","text-slate-100 bg-red-500":s==="danger"},g),children:y})}u.__docgenInfo={description:"",methods:[],displayName:"Button",props:{className:{required:!1,tsType:{name:"string"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary' | 'danger'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'danger'"}]},description:"",defaultValue:{value:"'primary'",computed:!1}}},composes:["PropsWithChildren"]};const N={title:"Button",component:u,tags:["autodocs"],args:{variant:"primary",children:"Click me!",onClick:x()}},r={args:{}},e={args:{variant:"secondary"}},a={args:{variant:"danger"}};var n,t,o;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    // variant: 'primary',
  }
}`,...(o=(t=r.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};var i,c,m;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    variant: 'secondary'
  }
}`,...(m=(c=e.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var d,p,l;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    variant: 'danger'
  }
}`,...(l=(p=a.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};const _=["Primary","Secondary","Danger"];export{a as Danger,r as Primary,e as Secondary,_ as __namedExportsOrder,N as default};
