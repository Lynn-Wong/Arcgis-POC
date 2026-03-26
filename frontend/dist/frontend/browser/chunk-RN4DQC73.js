import{a as n}from"./chunk-2YSWRJRO.js";import{a as s}from"./chunk-R6IIY54E.js";import{a as o}from"./chunk-L7NOU4T2.js";import{a as i}from"./chunk-QF5M5KTV.js";import{a as m}from"./chunk-45K2AY22.js";import{a}from"./chunk-UUP4FBYC.js";var t=class extends o{};function l(){let e=new i;return e.include(n),e.fragment.uniforms.add(new m("colorTexture",r=>r.color),new s("depthTexture",r=>r.mainDepth)),e.fragment.main.add(a`float depthSample = texture(depthTexture, uv).r;
if (depthSample != 1.0 ) {
fragColor = vec4(0);
return;
}
fragColor = texture(colorTexture, uv);`),e}var g=Object.freeze(Object.defineProperty({__proto__:null,AtmosphereCompositingPassParameters:t,build:l},Symbol.toStringTag,{value:"Module"}));export{t as a,l as b,g as c};
