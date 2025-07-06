(function(){console.log("Stylish Pins: Content script loaded!");const a=`
  {
    background: url(https://i.pinimg.com/736x/92/7f/57/927f5780c3ac6c145acfb0dbf69ea92f.jpg) no-repeat;
    background-origin: border-box;
    background-position: top left 86%;
    background-size: cover;
    border-radius: 1rem;
    border: 3px solid #85BB65; 
  }
`,n=(e,s,r="")=>e.reduce((d,c,i)=>`${c}${r} ${i?",":""} ${d}`,s),l=e=>n(e,a),p=e=>n(e,"{ display: none !important; }","> *"),t=document.createElement("style");t.className="stylish-pins";const o=['[data-grid-item="true"]:has([title="Sponsored"])'],u=[l(o),p(o)];t.textContent=u.join(`

`);document.head.appendChild(t);
})()
