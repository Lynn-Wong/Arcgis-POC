import{a as s}from"./chunk-2YSWRJRO.js";import{a as t}from"./chunk-L7NOU4T2.js";import{a as i}from"./chunk-QF5M5KTV.js";import{a}from"./chunk-45K2AY22.js";import{a as o}from"./chunk-UUP4FBYC.js";var r=class extends t{};function u(){let e=new i;return e.include(s),e.fragment.uniforms.add(new a("cutFillDepthTexture",d=>d.depthTexture)),e.fragment.main.add(o`ivec2 iuv = ivec2(gl_FragCoord.xy) * 2;
vec2 sum = vec2(0.0);
for (int dx = 0; dx < 2; dx++) {
for (int dy = 0; dy < 2; dy++) {
sum += texelFetch(cutFillDepthTexture, iuv + ivec2(dx, dy), 0).rg;
}
}
fragColor = vec4(sum.r, sum.g, 0.0, 0.0);`),e}var p=Object.freeze(Object.defineProperty({__proto__:null,CutFillReductionParameters:r,build:u},Symbol.toStringTag,{value:"Module"}));export{r as a,u as b,p as c};
