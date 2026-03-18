import{r as i,j as e}from"./iframe-xgrossfD.js";import{c as l}from"./createLucideIcon-DveI2Pcc.js";import{C as m}from"./chevron-down-DRAtR6t8.js";import"./preload-helper-PPVm8Dsz.js";const p=l("MessageCircleQuestion",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);function u({items:o}){const[c,d]=i.useState(null);return e.jsxs("div",{className:"rounded-xl border border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-950/20 p-6 my-6",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("div",{className:"w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center",children:e.jsx(p,{className:"text-white",size:16})}),e.jsx("span",{className:"text-sm font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wider",children:"よくある質問"})]}),e.jsx("div",{className:"space-y-2",children:o.map((a,t)=>{const n=c===t;return e.jsxs("div",{className:"rounded-lg border border-orange-200/60 dark:border-orange-800/60 bg-card overflow-hidden",children:[e.jsxs("button",{onClick:()=>d(n?null:t),className:"w-full flex items-center justify-between px-4 py-3 text-left hover:bg-orange-50/50 dark:hover:bg-orange-950/20 transition-colors",children:[e.jsxs("span",{className:"text-sm font-medium text-foreground pr-4",children:["Q. ",a.question]}),e.jsx(m,{size:16,className:`flex-shrink-0 text-muted-foreground transition-transform ${n?"rotate-180":""}`})]}),n&&e.jsx("div",{className:"px-4 pb-4 pt-0",children:e.jsx("div",{className:"pt-2 border-t border-border",children:e.jsx("p",{className:"text-sm text-muted-foreground leading-relaxed mt-2",children:a.answer})})})]},t)})})]})}const b={title:"Components/Faq",component:u},r={args:{items:[{question:"React と Vue はどちらを学ぶべきですか？",answer:"どちらも優れたフレームワークですが、求人数や エコシステムの規模を考えると React がおすすめです。"},{question:"TypeScript は必須ですか？",answer:"チーム開発や大規模プロジェクトでは事実上必須です。型安全性によりバグを早期発見できます。"}]}},s={args:{items:[{question:"Node.js のバージョンはいくつが推奨ですか？",answer:"LTS（長期サポート）版の最新を使用してください。"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      question: "React と Vue はどちらを学ぶべきですか？",
      answer: "どちらも優れたフレームワークですが、求人数や エコシステムの規模を考えると React がおすすめです。"
    }, {
      question: "TypeScript は必須ですか？",
      answer: "チーム開発や大規模プロジェクトでは事実上必須です。型安全性によりバグを早期発見できます。"
    }]
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      question: "Node.js のバージョンはいくつが推奨ですか？",
      answer: "LTS（長期サポート）版の最新を使用してください。"
    }]
  }
}`,...s.parameters?.docs?.source}}};const j=["Default","SingleItem"];export{r as Default,s as SingleItem,j as __namedExportsOrder,b as default};
