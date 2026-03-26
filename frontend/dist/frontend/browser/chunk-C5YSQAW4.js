import{a as u}from"./chunk-2YSWRJRO.js";import{a as l}from"./chunk-L7NOU4T2.js";import{a as f}from"./chunk-JMYO2YOI.js";import{a as p}from"./chunk-QF5M5KTV.js";import{a}from"./chunk-45K2AY22.js";import{a as r}from"./chunk-UUP4FBYC.js";var o=class extends l{};function n(){let e=new p;return e.include(u),e.fragment.include(f),e.fragment.uniforms.add(new a("cutFillReferenceDepthTexture",t=>t.referenceDepthTexture),new a("cutFillTargetDepthTexture",t=>t.targetDepthTexture)),e.fragment.code.add(r`bool outsideFar(float depth) {
return depth >= 1.0;
}`),e.fragment.main.add(r`float referenceDepth = depthFromTexture(cutFillReferenceDepthTexture, uv);
float targetDepth = depthFromTexture(cutFillTargetDepthTexture, uv);
if (outsideFar(targetDepth)) {
discard;
}
float depth = referenceDepth - targetDepth;
float cut = min(0.0, depth);
float fill = max(0.0, depth);
fragColor = vec4(cut, fill, 0.0, 0.0);`),e}var g=Object.freeze(Object.defineProperty({__proto__:null,CutFillDepthParameters:o,build:n},Symbol.toStringTag,{value:"Module"}));export{o as a,n as b,g as c};
