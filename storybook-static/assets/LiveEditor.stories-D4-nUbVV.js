import{u as M,r as n,j as e}from"./iframe-xgrossfD.js";import{b as P,C as D,E as y}from"./preview-bStU-AYg.js";import{c as H}from"./createLucideIcon-DveI2Pcc.js";import{R as L}from"./rotate-ccw-CX0MQsfU.js";import{M as I,a as _}from"./minimize-2-CHq0_pRv.js";import"./preload-helper-PPVm8Dsz.js";const O=H("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);function V({title:g,description:m,files:h,goalDescription:v,previewHeight:d=300,steps:p,autoRun:f=!0}){const{theme:j}=M(),[a,N]=n.useState(h),[b,k]=n.useState(0),[w,z]=n.useState(""),[s,S]=n.useState(!1),[r,C]=n.useState("split"),$=n.useRef(null),l=n.useRef(void 0),c=n.useCallback(()=>{const t=a.find(i=>i.language==="tsx")??a[0],o=a.find(i=>i.language==="css"),u=P(t.code,o?.code??"",j==="dark");z(u)},[a,j]);n.useEffect(()=>{if(f)return l.current&&clearTimeout(l.current),l.current=setTimeout(c,400),()=>{l.current&&clearTimeout(l.current)}},[a,f,c]),n.useEffect(()=>{c()},[]);const E=t=>{N(o=>o.map((u,i)=>i===b?{...u,code:t}:u))},R=()=>{N(h),setTimeout(c,100)},A=a[b],T=t=>{switch(t){case"tsx":return"text-blue-400";case"css":return"text-pink-400";case"html":return"text-orange-400";default:return"text-slate-400"}},F=s?"fixed inset-0 z-50 bg-background flex flex-col":"rounded-xl border-2 border-primary/20 bg-card overflow-hidden my-8";return e.jsxs("div",{className:F,children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-2.5 bg-[#181825] border-b border-[#313244]",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("div",{className:"w-3 h-3 rounded-full bg-[#f38ba8]"}),e.jsx("div",{className:"w-3 h-3 rounded-full bg-[#f9e2af]"}),e.jsx("div",{className:"w-3 h-3 rounded-full bg-[#a6e3a1]"})]}),g&&e.jsx("span",{className:"text-sm font-medium text-[#cdd6f4]",children:g})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx("button",{onClick:()=>C(r==="code"?"split":"code"),className:`p-1.5 rounded hover:bg-[#313244] transition-colors ${r==="code"?"text-blue-400":"text-[#cdd6f4]/50"}`,title:"コードのみ",children:e.jsx(D,{size:14})}),e.jsx("button",{onClick:()=>C(r==="preview"?"split":"preview"),className:`p-1.5 rounded hover:bg-[#313244] transition-colors ${r==="preview"?"text-blue-400":"text-[#cdd6f4]/50"}`,title:"プレビューのみ",children:e.jsx(y,{size:14})}),!f&&e.jsxs("button",{onClick:c,className:"flex items-center gap-1 px-3 py-1 rounded bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors",children:[e.jsx(O,{size:12}),"実行"]}),e.jsx("button",{onClick:R,className:"p-1.5 rounded hover:bg-[#313244] text-[#cdd6f4]/50 hover:text-[#cdd6f4] transition-colors",title:"リセット",children:e.jsx(L,{size:14})}),e.jsx("button",{onClick:()=>S(!s),className:"p-1.5 rounded hover:bg-[#313244] text-[#cdd6f4]/50 hover:text-[#cdd6f4] transition-colors",title:s?"縮小":"全画面",children:s?e.jsx(I,{size:14}):e.jsx(_,{size:14})})]})]}),(m||p)&&e.jsxs("div",{className:"px-4 py-3 bg-[#1e1e2e] border-b border-[#313244]",children:[m&&e.jsx("p",{className:"text-sm text-[#cdd6f4]/80 mb-2",children:m}),p&&e.jsx("ol",{className:"space-y-1",children:p.map((t,o)=>e.jsxs("li",{className:"flex items-start gap-2 text-xs text-[#cdd6f4]/70",children:[e.jsx("span",{className:"flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center mt-0.5",children:o+1}),e.jsx("span",{className:"leading-relaxed",children:t})]},o))})]}),e.jsxs("div",{className:`flex ${s?"flex-1":""} ${r==="split"?"flex-col lg:flex-row":""}`,style:s?void 0:{minHeight:d+80},children:[r!=="preview"&&e.jsxs("div",{className:`flex flex-col ${r==="split"?"lg:w-1/2":"w-full"} ${s?"flex-1":""}`,children:[e.jsx("div",{className:"flex items-center gap-0 bg-[#11111b] border-b border-[#313244] overflow-x-auto",children:a.map((t,o)=>e.jsx("button",{onClick:()=>k(o),className:`px-4 py-2 text-xs font-mono whitespace-nowrap transition-colors border-b-2 ${o===b?`bg-[#1e1e2e] ${T(t.language)} border-primary`:"text-[#cdd6f4]/40 border-transparent hover:text-[#cdd6f4]/70 hover:bg-[#1e1e2e]/50"}`,children:t.name},t.name))}),e.jsx("div",{className:"flex-1 bg-[#1e1e2e] relative",children:e.jsx("textarea",{value:A.code,onChange:t=>E(t.target.value),spellCheck:!1,className:"w-full h-full min-h-[200px] py-4 px-5 font-mono text-sm leading-relaxed bg-transparent text-[#cdd6f4] resize-none focus:outline-none",style:s?void 0:{height:d+40}})})]}),r!=="code"&&e.jsxs("div",{className:`flex flex-col ${r==="split"?"lg:w-1/2 border-t lg:border-t-0 lg:border-l":"w-full"} border-[#313244] ${s?"flex-1":""}`,children:[e.jsxs("div",{className:"flex items-center gap-2 px-4 py-2 bg-[#f8fafc] dark:bg-[#1e1e2e] border-b border-border dark:border-[#313244]",children:[e.jsx(y,{size:12,className:"text-muted-foreground"}),e.jsx("span",{className:"text-xs font-medium text-muted-foreground",children:"プレビュー"}),v&&e.jsxs("span",{className:"text-xs text-muted-foreground/60 ml-auto",children:["目標: ",v]})]}),e.jsx("div",{className:"flex-1 bg-white dark:bg-[#1e1e2e]",style:s?void 0:{height:d},children:w&&e.jsx("iframe",{ref:$,srcDoc:w,sandbox:"allow-scripts allow-same-origin",title:"プレビュー",className:"w-full h-full border-0",style:{minHeight:d}})})]})]})]})}const Q={title:"Components/LiveEditor",component:V},x={args:{title:"カウンターアプリ",description:"useState を使ったシンプルなカウンターを作ってみましょう。",goalDescription:"ボタンをクリックすると数値が増減する",previewHeight:250,steps:["useState で count を管理する","ボタンのクリックで setCount を呼ぶ","count の値を画面に表示する"],files:[{name:"App.tsx",language:"tsx",code:`function App() {
  const [count, setCount] = React.useState(0);
  return (
    <div style={{ textAlign: 'center', padding: 24 }}>
      <h1>カウント: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}`},{name:"style.css",language:"css",code:`button {
  margin: 0 8px;
  padding: 8px 20px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
}
button:hover {
  background: #eee;
}`}]}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    title: "カウンターアプリ",
    description: "useState を使ったシンプルなカウンターを作ってみましょう。",
    goalDescription: "ボタンをクリックすると数値が増減する",
    previewHeight: 250,
    steps: ["useState で count を管理する", "ボタンのクリックで setCount を呼ぶ", "count の値を画面に表示する"],
    files: [{
      name: "App.tsx",
      language: "tsx",
      code: \`function App() {
  const [count, setCount] = React.useState(0);
  return (
    <div style={{ textAlign: 'center', padding: 24 }}>
      <h1>カウント: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}\`
    }, {
      name: "style.css",
      language: "css",
      code: \`button {
  margin: 0 8px;
  padding: 8px 20px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
}
button:hover {
  background: #eee;
}\`
    }]
  }
}`,...x.parameters?.docs?.source}}};const U=["Default"];export{x as Default,U as __namedExportsOrder,Q as default};
