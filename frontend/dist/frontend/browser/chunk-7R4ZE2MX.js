import{a as c}from"./chunk-2YSWRJRO.js";import{a as m}from"./chunk-J6IEXWQ2.js";import{a as s}from"./chunk-L7NOU4T2.js";import{a as u}from"./chunk-QF5M5KTV.js";import{a as i}from"./chunk-H2ASV3YO.js";import{a as o}from"./chunk-45K2AY22.js";import{a}from"./chunk-UUP4FBYC.js";import{a as l}from"./chunk-YMQ4BGWF.js";var t=class extends s{constructor(){super(...arguments),this.borderColor=l()}};function n(){let r=new u;return r.include(c),r.outputs.add("fragColor","vec4",0),r.fragment.uniforms.add(new o("colorTexture",e=>e.color),new o("cutFillVolumes",e=>e.cutFillVolumes),new o("cutFillMask",e=>e.cutFillMask),new i("pixelRatio",(e,v)=>v.camera.pixelRatio),new m("borderColor",e=>e.borderColor)).main.add(a`vec4 color = texture(colorTexture, uv, 0.0);
vec4 volumesColor = texture(cutFillVolumes, uv, 0.0);
ivec2 iuv = ivec2(uv * vec2(textureSize(cutFillMask, 0)));
vec2 m0 = texelFetch(cutFillMask, iuv, 0).rg;
vec2 m1 = texelFetch(cutFillMask, iuv + ivec2(-1, 0), 0).rg;
vec2 m2 = texelFetch(cutFillMask, iuv + ivec2(1, 0), 0).rg;
vec2 m3 = texelFetch(cutFillMask, iuv + ivec2(0, -1), 0).rg;
vec2 m4 = texelFetch(cutFillMask, iuv + ivec2(0, 1), 0).rg;
float d = (
step(1.5, abs(m0.r - m1.r) + abs(m0.g - m1.g))
+ step(1.5, abs(m0.r - m2.r) + abs(m0.g - m2.g))
+ step(1.5, abs(m0.r - m3.r) + abs(m0.g - m3.g))
+ step(1.5, abs(m0.r - m4.r) + abs(m0.g - m4.g))
) * 0.25 * pixelRatio;
vec4 base = mix(color, volumesColor, max(m0.r, m0.g) * volumesColor.a);
fragColor = mix(base, borderColor, d);`),r}var M=Object.freeze(Object.defineProperty({__proto__:null,CutFillCompositionPassParameters:t,build:n},Symbol.toStringTag,{value:"Module"}));export{t as a,n as b,M as c};
