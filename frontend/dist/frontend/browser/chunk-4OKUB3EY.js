import{a}from"./chunk-OD45X2ZY.js";import{a as o}from"./chunk-T32QXVA7.js";import{a as r}from"./chunk-JIVOQNH4.js";import{a as h}from"./chunk-C4GB2D3W.js";import{a as g}from"./chunk-QF5M5KTV.js";import{a as l}from"./chunk-UUP4FBYC.js";function s(){let e=new g;e.include(a),e.include(h);let{fragment:t}=e;return e.outputs.add("fragSingleHighlight","vec2",0),t.uniforms.add(new o("highlightTexture",i=>i.highlightTexture),new r("highlightLevel",i=>i.highlightLevel)),t.main.add(l`ivec2 iuv = ivec2(gl_FragCoord.xy);
uvec2 inputTexel = texelFetch(highlightTexture, iuv, 0).rg;
uint bits = readLevelBits(inputTexel, highlightLevel);
bool hasHighlight = (bits & 1u) == 1u;
bool hasOccluded  = (bits & 2u) == 2u;
fragSingleHighlight = vec2(hasHighlight ? 1.0 : 0.0, hasOccluded ? 1.0 : 0.0);`),e}var p=Object.freeze(Object.defineProperty({__proto__:null,build:s},Symbol.toStringTag,{value:"Module"}));export{s as a,p as b};
