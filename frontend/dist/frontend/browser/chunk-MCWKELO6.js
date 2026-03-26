function l(i){let{options:e,value:o}=i;return typeof e[o]=="number"}function p(i){let e="";for(let o in i){let n=i[o];if(typeof n=="boolean")n&&(e+=`#define ${o}
`);else if(typeof n=="number")e+=`#define ${o} ${n.toFixed()}
`;else if(typeof n=="object")if(l(n)){let{value:t,options:f,namespace:s}=n,$=s?`${s}_`:"";for(let c in f)e+=`#define ${$}${c} ${f[c].toFixed()}
`;e+=`#define ${o} ${$}${t}
`}else{let t=n.options,f=0;for(let s in t)e+=`#define ${t[s]} ${(f++).toFixed()}
`;e+=`#define ${o} ${t[n.value]}
`}}return e}export{p as a};
