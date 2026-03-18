import{u as K,r as f,j as e}from"./iframe-xgrossfD.js";import{H as Y,t as B}from"./index-R-f0pW6U.js";import{C as A,E as X,b as Z,a as Q,c as U,d as V,e as ee}from"./preview-bStU-AYg.js";import{C as te}from"./circle-check-C_f3htR1.js";import{c as F}from"./createLucideIcon-DveI2Pcc.js";import{R as re}from"./rotate-ccw-CX0MQsfU.js";import"./preload-helper-PPVm8Dsz.js";const ne=F("EyeOff",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);const L=F("Lightbulb",[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);function se(a,o,t){const i=s=>s.replace(/\s+/g," ").trim(),n=i(a),m=i(o);if(n===m)return!0;if(t&&t.length>0)return t.every(s=>n.includes(s));const p=[/interface\s+\w+/g,/type\s+\w+/g,/:\s*(?:string|number|boolean|ReactNode)/g,/\?\s*:/g,/'\w+'\s*\|/g,/\|\s*'\w+'/g],r=new Set;for(const s of p){const u=o.match(s);u&&u.forEach(l=>r.add(i(l)))}if(r.size===0){const s=m.split(/[;\n]/).map(i).filter(Boolean);return s.filter(l=>n.includes(l)).length>=Math.ceil(s.length*.5)}return Array.from(r).filter(s=>n.includes(s)).length>=Math.ceil(r.size*.8)}function ae(a,o){if(o)return o;if(/\bTHREE\b/.test(a))return"threejs";const t=a.trim(),i=a.split(`
`).filter(r=>r.trim());if(i.length>0&&i.every(r=>r.trim().startsWith("#")))return"terminal";const n=i.filter(r=>!r.trim().startsWith("#")),m=/^\s*(git |ssh |npm |npx |node |curl |wget |sudo |apt |brew |cd |ls |mkdir |touch |cat |echo |source |chmod |mv |cp |rm |docker |kubectl |tmux |code |xcode-|pip |python|wsl |gh )/;if(n.length>0&&n.some(r=>m.test(r))||/^#!\//.test(t))return"terminal";if(/^\s*[\[{]/.test(t)&&/[\]}]\s*$/.test(t))return"config";if(/\b(function|const|return|=>)\b/.test(t)&&/<[A-Za-z]/.test(t))return"jsx";if(/^---\s*$/m.test(t)&&!/\b(function|return)\b/.test(t))return"config";if(!/\b(function|return|const|=>)\b/.test(t)){const r=n.filter(d=>/^\s*[\w-]+\s*:/.test(d));if(r.length>0&&r.length>=n.length*.4)return"config"}return/^\s*<!?(DOCTYPE|html|head|body|div|form|table|ul|ol|nav|header|main|footer|section|article|fieldset|input|label|select|textarea)\b/i.test(t)||/^\s*<!--/.test(t)||n.length>0&&n.every(r=>r.trim().startsWith("//"))||/^\s*(@media|@keyframes|@import|:root|body|html|\.|#[a-z]|\.[\w-]+\s*\{|\*\s*\{)/m.test(t)&&!/\b(function|return|=>)\b/.test(t)?"terminal":/^#{1,6}\s+\S/.test(t)&&!/\b(function|return|=>|const|let|var)\b/.test(t)?"markdown":/^\s*(interface|type)\s+\w+/.test(t)&&!/\b(function|return|=>)\b/.test(t)||/^\s*(set(-option)?|bind(-key)?|unbind)\s/.test(t)||/^\s*<[a-z]/.test(t)&&!/\bfunction\b/.test(t)&&!/\bconst\b/.test(t)?"terminal":"jsx"}function O(a,o,t,i){switch(a){case"threejs":return ee(o,i);case"markdown":return V(o,i);case"terminal":return U(o,i);case"config":return Q(o,i);default:return Z(o,t,i)}}function ie(a){const o=a.trim();return/^\s*(git |npm |npx |curl |ssh |cd |mkdir |brew |sudo |#)/.test(o)?"bash":/^\s*(\.|#|@media|@keyframes|:root|body|html)\s*\{/.test(o)?"css":/^\s*<(!DOCTYPE|html|div|section|form|table|ul|ol|nav|header|main|footer)/i.test(o)?"markup":"tsx"}function W({code:a,onChange:o,minHeight:t=160}){const i=f.useRef(null),n=f.useRef(null),m=ie(a),p=Math.max(t,(a.split(`
`).length+1)*20.8+32),r=()=>{i.current&&n.current&&(i.current.scrollTop=n.current.scrollTop,i.current.scrollLeft=n.current.scrollLeft)};return e.jsxs("div",{className:"relative",style:{height:p},children:[e.jsx("div",{ref:i,className:"absolute inset-0 overflow-auto pointer-events-none","aria-hidden":"true",children:e.jsx(Y,{theme:B.vsDark,code:a,language:m,children:({tokens:d,getLineProps:s,getTokenProps:u})=>e.jsx("pre",{className:"py-4 px-5 font-mono text-sm leading-relaxed m-0 bg-[#1e1e2e] w-fit min-w-full min-h-full",style:{tabSize:2},children:d.map((l,c)=>{const{key:g,...b}=s({line:l});return e.jsx("div",{...b,className:"whitespace-pre",children:l.map((x,k)=>{const{key:S,...v}=u({token:x});return e.jsx("span",{...v},k)})},c)})})})}),e.jsx("textarea",{ref:n,value:a,onChange:d=>o(d.target.value),onScroll:r,onKeyDown:d=>{if(d.key==="Tab"){d.preventDefault();const s=d.currentTarget,u=s.selectionStart,l=s.selectionEnd;if(d.shiftKey){const g=a.substring(0,u).lastIndexOf(`
`)+1;if(a.substring(g,l).startsWith("  ")){const x=a.substring(0,g)+a.substring(g).replace(/^ {2}/,"");o(x),requestAnimationFrame(()=>{s.selectionStart=Math.max(g,u-2),s.selectionEnd=Math.max(g,l-2)})}}else{const c=a.substring(0,u)+"  "+a.substring(l);o(c),requestAnimationFrame(()=>{s.selectionStart=s.selectionEnd=u+2})}}},spellCheck:!1,wrap:"off",className:"absolute inset-0 w-full h-full py-4 px-5 font-mono text-sm leading-relaxed bg-transparent text-transparent caret-white resize-none focus:outline-none selection:bg-blue-500/30 overflow-auto z-10 whitespace-pre",style:{tabSize:2}})]})}function oe({title:a,description:o,initialCode:t,answer:i,hints:n=[],keywords:m,validator:p,preview:r=!1,previewType:d,css:s=""}){const{theme:u}=K(),l=u==="dark",[c,g]=f.useState(t),[b,x]=f.useState(!1),[k,S]=f.useState(!1),[v,T]=f.useState(0),[H,w]=f.useState(null),[E,y]=f.useState(null),[R,I]=f.useState(""),j=f.useRef(void 0),C=ae(c,d);f.useEffect(()=>{if(r)return j.current&&clearTimeout(j.current),j.current=setTimeout(()=>{I(O(C,c,s,l))},400),()=>{j.current&&clearTimeout(j.current)}},[c,s,r,l,C]),f.useEffect(()=>{r&&I(O(C,c,s,l))},[]);const $=()=>{if(p){const h=p(c);w(h),y(null)}else{const h=se(c,i,m);if(w(h),!h&&m&&m.length>0){const q=(P=>P.replace(/\s+/g," ").trim())(c),G=m.filter(P=>q.includes(P)).length;y({matched:G,total:m.length})}else y(null)}},J=()=>{v<n.length-1&&T(h=>h+1),S(!0)},D=()=>{g(t),x(!1),S(!1),T(0),w(null),y(null)},M=C==="threejs"?300:160;return e.jsxs("div",{className:"rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-6 my-6",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx("div",{className:"w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center",children:e.jsx(A,{className:"text-white",size:16})}),e.jsx("span",{className:"text-sm font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider",children:"コーディングチャレンジ"})]}),e.jsx("h4",{className:"text-lg font-semibold text-foreground mb-2",children:a}),e.jsx("p",{className:"text-sm text-muted-foreground mb-4 leading-relaxed",children:o}),r?e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-4",children:[e.jsxs("div",{className:"rounded-lg overflow-hidden border border-border bg-[#1e1e2e]",children:[e.jsx("div",{className:"flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-[#313244]",children:e.jsx("span",{className:"text-xs font-mono text-[#cdd6f4]/60 uppercase",children:"エディタ"})}),e.jsx(W,{code:c,onChange:h=>{g(h),w(null),y(null)}})]}),e.jsxs("div",{className:"relative rounded-lg overflow-hidden border border-border bg-white dark:bg-[#1e1e2e]",style:{minHeight:M},children:[e.jsx("div",{className:"absolute top-2 right-2 text-xs text-muted-foreground z-10 bg-background/80 px-2 py-0.5 rounded",children:"プレビュー"}),R&&e.jsx("iframe",{srcDoc:R,className:"w-full h-full border-0",style:{minHeight:M},sandbox:"allow-scripts allow-same-origin",title:"プレビュー"})]})]}):e.jsxs("div",{className:"rounded-lg overflow-hidden border border-border bg-[#1e1e2e] mb-4",children:[e.jsx("div",{className:"flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-[#313244]",children:e.jsx("span",{className:"text-xs font-mono text-[#cdd6f4]/60 uppercase",children:"エディタ"})}),e.jsx(W,{code:c,onChange:h=>{g(h),w(null),y(null)}})]}),H!==null&&e.jsx("div",{className:`flex items-center gap-2 px-4 py-2.5 rounded-lg mb-4 ${H?"bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300":"bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"}`,children:H?e.jsxs(e.Fragment,{children:[e.jsx(te,{size:18}),e.jsx("span",{className:"text-sm font-semibold",children:"正解！素晴らしい！"})]}):e.jsxs(e.Fragment,{children:[e.jsx(A,{size:18}),e.jsx("span",{className:"text-sm font-semibold",children:E?`もう少し！キーワードが ${E.matched}/${E.total} 含まれています。`:"もう少し！ヒントを確認してみましょう。"})]})}),k&&n.length>0&&e.jsxs("div",{className:"px-4 py-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 mb-4",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[e.jsx(L,{size:14,className:"text-amber-600 dark:text-amber-400"}),e.jsxs("span",{className:"text-xs font-semibold text-amber-700 dark:text-amber-300",children:["ヒント ",v+1," / ",n.length]})]}),e.jsx("p",{className:"text-sm text-foreground/80",children:n[v]})]}),b&&e.jsxs("div",{className:"rounded-lg overflow-hidden border border-border bg-[#1e1e2e] mb-4",children:[e.jsx("div",{className:"px-4 py-2 bg-[#181825] border-b border-[#313244]",children:e.jsx("span",{className:"text-xs font-mono text-emerald-400 uppercase",children:"模範解答"})}),e.jsx("pre",{className:"p-4 font-mono text-sm leading-relaxed text-[#cdd6f4] overflow-x-auto whitespace-pre",children:i})]}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx("button",{onClick:$,className:"px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors",children:"チェックする"}),n.length>0&&e.jsxs("button",{onClick:J,className:"flex items-center gap-1.5 px-4 py-2 rounded-lg border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 text-sm hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors",children:[e.jsx(L,{size:14}),k&&v<n.length-1?"次のヒント":"ヒントを見る"]}),e.jsxs("button",{onClick:()=>x(!b),className:"flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-muted-foreground text-sm hover:bg-muted transition-colors",children:[b?e.jsx(ne,{size:14}):e.jsx(X,{size:14}),b?"模範解答を隠す":"模範解答を見る"]}),e.jsxs("button",{onClick:D,className:"flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",children:[e.jsx(re,{size:14}),"リセット"]})]})]})}const pe={title:"Components/CodingChallenge",component:oe},N={name:"穴埋め + プレビュー",args:{title:"Flexbox 中央寄せ",description:"display と alignItems の値を埋めてください。",preview:!0,initialCode:`function App() {
  return (
    <div style={{
      display: '___',
      alignItems: '___',
      justifyContent: 'center',
      minHeight: 120,
      background: 'var(--bg-accent)',
      borderRadius: 8,
    }}>
      <span style={{ color: 'var(--text)', fontWeight: 600 }}>Center</span>
    </div>
  );
}`,answer:`function App() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 120,
      background: 'var(--bg-accent)',
      borderRadius: 8,
    }}>
      <span style={{ color: 'var(--text)', fontWeight: 600 }}>Center</span>
    </div>
  );
}`,hints:["display: flex","alignItems: center"],keywords:["flex","center"]}},_={name:"コードのみ（プレビューなし）",args:{title:"Git コマンド",description:"ブランチを作成するコマンドを埋めてください。",preview:!1,initialCode:"git ___ -b feature/login",answer:"git checkout -b feature/login",hints:["checkout コマンドを使います"],keywords:["checkout"]}},z={name:"JSON 設定",args:{title:"package.json",description:"name フィールドを埋めてください。",preview:!0,previewType:"config",initialCode:`{
  "name": "___",
  "version": "1.0.0"
}`,answer:`{
  "name": "my-app",
  "version": "1.0.0"
}`,hints:["プロジェクト名を入力"],keywords:["my-app"]}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: "穴埋め + プレビュー",
  args: {
    title: "Flexbox 中央寄せ",
    description: "display と alignItems の値を埋めてください。",
    preview: true,
    initialCode: \`function App() {\\n  return (\\n    <div style={{\\n      display: '___',\\n      alignItems: '___',\\n      justifyContent: 'center',\\n      minHeight: 120,\\n      background: 'var(--bg-accent)',\\n      borderRadius: 8,\\n    }}>\\n      <span style={{ color: 'var(--text)', fontWeight: 600 }}>Center</span>\\n    </div>\\n  );\\n}\`,
    answer: \`function App() {\\n  return (\\n    <div style={{\\n      display: 'flex',\\n      alignItems: 'center',\\n      justifyContent: 'center',\\n      minHeight: 120,\\n      background: 'var(--bg-accent)',\\n      borderRadius: 8,\\n    }}>\\n      <span style={{ color: 'var(--text)', fontWeight: 600 }}>Center</span>\\n    </div>\\n  );\\n}\`,
    hints: ["display: flex", "alignItems: center"],
    keywords: ["flex", "center"]
  }
}`,...N.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: "コードのみ（プレビューなし）",
  args: {
    title: "Git コマンド",
    description: "ブランチを作成するコマンドを埋めてください。",
    preview: false,
    initialCode: \`git ___ -b feature/login\`,
    answer: \`git checkout -b feature/login\`,
    hints: ["checkout コマンドを使います"],
    keywords: ["checkout"]
  }
}`,..._.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: "JSON 設定",
  args: {
    title: "package.json",
    description: "name フィールドを埋めてください。",
    preview: true,
    previewType: "config" as const,
    initialCode: \`{\\n  "name": "___",\\n  "version": "1.0.0"\\n}\`,
    answer: \`{\\n  "name": "my-app",\\n  "version": "1.0.0"\\n}\`,
    hints: ["プロジェクト名を入力"],
    keywords: ["my-app"]
  }
}`,...z.parameters?.docs?.source}}};const be=["WithPreview","CodeOnly","ConfigPreview"];export{_ as CodeOnly,z as ConfigPreview,N as WithPreview,be as __namedExportsOrder,pe as default};
