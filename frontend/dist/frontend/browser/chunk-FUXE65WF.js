import{a as p}from"./chunk-2YSWRJRO.js";import{a}from"./chunk-L7NOU4T2.js";import{a as o}from"./chunk-QF5M5KTV.js";import{a as s}from"./chunk-45K2AY22.js";import{a as r}from"./chunk-UUP4FBYC.js";var e=class extends a{};function n(){let t=new o;return t.include(p),t.fragment.uniforms.add(new s("splatOutputDepth",l=>l.splatDepth)),t.fragment.main.add(r`vec4 splatDepth = texture(splatOutputDepth, uv);
float ndcDepth = splatDepth.x;
float depthCutOff = 0.75;
if(splatDepth.a < depthCutOff) {
discard;
}
gl_FragDepth = (ndcDepth + 1.0) * 0.5;`),t}var c=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatDepthCompositionPassParameters:e,build:n},Symbol.toStringTag,{value:"Module"}));export{e as a,n as b,c};
