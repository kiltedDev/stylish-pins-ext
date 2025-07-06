(function(){console.log("Stylish Pins: Content script loaded!");const i=`
  {
    background: url(https://i.pinimg.com/736x/92/7f/57/927f5780c3ac6c145acfb0dbf69ea92f.jpg) no-repeat;
    background-origin: border-box;
    background-position: top left 86%;
    background-size: cover;
    border-radius: 1rem;
    transition: background-position 0.3s ease-in-out;
    border: 3px solid #85BB65; 
  }
`,s=(e,t,n="")=>e.reduce((o,r,a)=>`${r}${n} ${a?",":""} ${o}`,t),d=e=>s(e,i),c=e=>s(e,"{ display: none !important; }","> *"),l=Array.from(document.querySelectorAll('div[data-test-id="pointer-events-wrapper"]')).reduce((e,t)=>{if(!t?.textContent||!/sponsored/i.test(t.textContent))return e;const n=t.parentElement;if(!n)return e;const o=Array.from(n.classList).map(r=>`.${CSS.escape(r)}`).join("");return e.add(`[data-grid-item="true"]:has(${o})`),e},new Set);if(l.size>0){const e=document.createElement("style");e.className="stylish-pins";const t=['[data-grid-item="true"]:has([data-test-id="pinrep-footer"])'],n=[d(t),c(t)];e.textContent=n.join(`

`),document.head.appendChild(e)}
})()
