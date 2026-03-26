import{a as n}from"./chunk-WQLQLQFN.js";import{a as y}from"./chunk-J6IEXWQ2.js";import{a as g}from"./chunk-L7NOU4T2.js";import{a as x}from"./chunk-QF5M5KTV.js";import{a as o}from"./chunk-45K2AY22.js";import{a as t}from"./chunk-UUP4FBYC.js";import{f,g as c,i as d}from"./chunk-3R6HK7Q4.js";import{a as p}from"./chunk-YMQ4BGWF.js";import{b as v}from"./chunk-OFZRIX6T.js";var i=class extends g{constructor(){super(...arguments),this.mask=null,this.overlay=null,this.input=null,this.size=0}};function h(){let e=new x;return e.attributes.add("position","vec2"),e.vertex.uniforms.add(new y("drawPosition",(r,a)=>k(r,a))),e.varyings.add("vUV","vec2"),e.vertex.main.add(t`vUV = position;
gl_Position = vec4(drawPosition.xy + vec2(position - 0.5) * drawPosition.zw, 0.0, 1.0);`),e.fragment.uniforms.add(new o("textureInput",r=>r.input)),e.fragment.uniforms.add(new o("textureMask",r=>r.mask)),e.fragment.uniforms.add(new o("textureOverlay",r=>r.overlay)),e.fragment.uniforms.add(new n("maskEnabled",r=>r.magnifier.maskEnabled)),e.fragment.uniforms.add(new n("overlayEnabled",r=>r.magnifier.overlayEnabled)),e.fragment.code.add(t`const float barrelFactor = 1.1;
vec2 barrel(vec2 uv) {
vec2 uvn = uv * 2.0 - 1.0;
if (uvn.x == 0.0 && uvn.y == 0.0) {
return vec2(0.5, 0.5);
}
float theta = atan(uvn.y, uvn.x);
float r = pow(length(uvn), barrelFactor);
return r * vec2(cos(theta), sin(theta)) * 0.5 + 0.5;
}`),e.fragment.main.add(t`float mask = maskEnabled ? texture(textureMask, vUV).a : 1.0;
vec4 inputColor = texture(textureInput, barrel(vUV)) * mask;
vec4 overlayColor = overlayEnabled ? texture(textureOverlay, vUV) : vec4(0);
fragColor = overlayColor + (1.0 - overlayColor.a) * inputColor;`),e}function k(e,r){let a=r.camera.pixelRatio,P=e.magnifier.offset.x*a,w=e.magnifier.offset.y*a;d(e.magnifier.position,b);let s=r.camera.screenToRender(b,U),l=Math.ceil(a*e.magnifier.size),{fullWidth:m,fullHeight:u}=r.camera;return v(C,(s[0]+P)/m*2-1,(s[1]-w)/u*2-1,l/m*2,l/u*2)}var b=f(),U=c(),C=p(),A=Object.freeze(Object.defineProperty({__proto__:null,MagnifierPassParameters:i,build:h},Symbol.toStringTag,{value:"Module"}));export{i as a,h as b,A as c};
