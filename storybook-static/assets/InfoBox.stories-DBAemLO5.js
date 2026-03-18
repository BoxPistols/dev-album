import{j as e}from"./iframe-xgrossfD.js";import{c as o}from"./createLucideIcon-DveI2Pcc.js";import{C as l}from"./circle-check-C_f3htR1.js";import"./preload-helper-PPVm8Dsz.js";const m=o("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);const g=o("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);const p=o("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),b={info:{bg:"bg-blue-50 dark:bg-blue-950/30",border:"border-blue-200 dark:border-blue-800",icon:e.jsx(g,{className:"text-blue-600 dark:text-blue-400",size:20}),title:"情報"},warning:{bg:"bg-amber-50 dark:bg-amber-950/30",border:"border-amber-200 dark:border-amber-800",icon:e.jsx(p,{className:"text-amber-600 dark:text-amber-400",size:20}),title:"注意"},success:{bg:"bg-green-50 dark:bg-green-950/30",border:"border-green-200 dark:border-green-800",icon:e.jsx(l,{className:"text-green-600 dark:text-green-400",size:20}),title:"成功"},error:{bg:"bg-red-50 dark:bg-red-950/30",border:"border-red-200 dark:border-red-800",icon:e.jsx(m,{className:"text-red-600 dark:text-red-400",size:20}),title:"エラー"}};function x({type:d="info",title:c,children:i}){const n=b[d];return e.jsx("div",{className:`rounded-r-lg border-l-4 ${n.bg} ${n.border} p-4`,children:e.jsxs("div",{className:"flex gap-3",children:[e.jsx("div",{className:"flex-shrink-0 pt-0.5",children:n.icon}),e.jsxs("div",{className:"flex-1",children:[c&&e.jsx("h4",{className:"font-semibold mb-1 text-foreground",children:c}),e.jsx("div",{className:"text-sm leading-relaxed text-foreground/80",children:i})]})]})})}const f={title:"Components/InfoBox",component:x},r={args:{type:"info",title:"情報",children:"補足情報を表示します。"}},s={args:{type:"warning",title:"注意",children:"注意が必要な内容です。"}},t={args:{type:"error",title:"エラー",children:"避けるべきパターンです。"}},a={args:{type:"success",title:"成功",children:"推奨パターンです。"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    type: "info",
    title: "情報",
    children: "補足情報を表示します。"
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    type: "warning",
    title: "注意",
    children: "注意が必要な内容です。"
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    type: "error",
    title: "エラー",
    children: "避けるべきパターンです。"
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    type: "success",
    title: "成功",
    children: "推奨パターンです。"
  }
}`,...a.parameters?.docs?.source}}};const j=["Info","Warning","Error","Success"];export{t as Error,r as Info,a as Success,s as Warning,j as __namedExportsOrder,f as default};
