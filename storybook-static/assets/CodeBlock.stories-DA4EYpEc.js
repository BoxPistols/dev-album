import{r as y,j as e}from"./iframe-xgrossfD.js";import{H as S,t as N}from"./index-R-f0pW6U.js";import{C as v,a as C}from"./copy-BPmbZSp1.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-DveI2Pcc.js";const w={ts:"typescript",tsx:"tsx",js:"javascript",jsx:"jsx",html:"markup",css:"css",json:"json",bash:"bash",sh:"bash",shell:"bash",terminal:"bash",yaml:"yaml",yml:"yaml",markdown:"markdown",md:"markdown",sql:"sql",graphql:"graphql",diff:"diff",python:"python",go:"go",rust:"rust"};function T(r){const s=r.toLowerCase();return w[s]??s}function L({code:r,language:s="tsx",title:o,showLineNumbers:d=!0}){const[m,c]=y.useState(!1),p=()=>{navigator.clipboard.writeText(r),c(!0),setTimeout(()=>c(!1),2e3)},x=T(s);return e.jsxs("div",{className:"rounded-lg overflow-hidden border border-border bg-[#1e1e2e] text-slate-100 my-4",children:[(o||s)&&e.jsxs("div",{className:"flex items-center justify-between px-4 py-2.5 bg-[#181825] border-b border-[#313244]",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[s&&e.jsx("span",{className:"text-xs font-mono text-[#cdd6f4]/60 uppercase tracking-wider",children:s}),o&&e.jsx("span",{className:"text-sm font-medium text-[#cdd6f4]",children:o})]}),e.jsx("button",{onClick:p,className:"p-1.5 rounded hover:bg-[#313244] transition-colors",title:"コードをコピー",children:m?e.jsx(v,{size:16,className:"text-[#a6e3a1]"}):e.jsx(C,{size:16,className:"text-[#cdd6f4]/60"})})]}),e.jsx(S,{theme:N.vsDark,code:r.trim(),language:x,children:({tokens:u,getLineProps:h,getTokenProps:g})=>e.jsx("div",{className:"overflow-x-auto",children:e.jsx("pre",{className:"p-4 font-mono text-sm leading-relaxed m-0",children:u.map((l,i)=>{const{key:_,...f}=h({line:l});return e.jsxs("div",{...f,className:"flex",children:[d&&e.jsx("span",{className:"inline-block w-10 text-right pr-4 text-[#6c7086] select-none flex-shrink-0 text-xs leading-relaxed",children:i+1}),e.jsx("span",{className:"flex-1",children:l.map((j,b)=>{const{key:q,...k}=g({token:j});return e.jsx("span",{...k},b)})})]},i)})})})})]})}const A={title:"Components/CodeBlock",component:L},a={args:{code:`function App() {
  return <h1>Hello World</h1>;
}`,language:"tsx",title:"TSX サンプル",showLineNumbers:!0}},t={args:{code:`.container {
  display: flex;
  gap: 16px;
}`,language:"css",title:"CSS サンプル"}},n={args:{code:`npm install react
npm run dev`,language:"bash",title:"ターミナル"}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    code: \`function App() {\\n  return <h1>Hello World</h1>;\\n}\`,
    language: "tsx",
    title: "TSX サンプル",
    showLineNumbers: true
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    code: \`.container {\\n  display: flex;\\n  gap: 16px;\\n}\`,
    language: "css",
    title: "CSS サンプル"
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    code: \`npm install react\\nnpm run dev\`,
    language: "bash",
    title: "ターミナル"
  }
}`,...n.parameters?.docs?.source}}};const P=["TSX","CSS","Bash"];export{n as Bash,t as CSS,a as TSX,P as __namedExportsOrder,A as default};
