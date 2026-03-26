import{a as c}from"./chunk-XSD5BTYG.js";import{a as p}from"./chunk-Q5RZKMWM.js";import{a as s}from"./chunk-A634OTHD.js";import{a as m}from"./chunk-QF5M5KTV.js";import{a as i}from"./chunk-UUP4FBYC.js";import{a as l,g as t}from"./chunk-WMGH7MKS.js";import{a as n}from"./chunk-JJQR3F6K.js";function f(){let a=new m;return a.attributes.add("position","vec3"),a.attributes.add("color","vec4"),a.attributes.add("size","float"),a.varyings.add("vcolor","vec4"),a.varyings.add("vsize","float"),a.vertex.uniforms.add(new c("transform",(o,r)=>d(o,r)),new p("viewport",o=>o.camera.fullViewport),new s("pixelRatio",o=>o.camera.pixelRatio)),a.vertex.main.add(i`gl_Position = transform * vec4(position, 0);
vcolor = color / 1.2;
vsize = size * 5.0 * pixelRatio;
gl_PointSize = vsize;`),a.fragment.main.add(i`float cap = 0.7;
float scale = 1.0 / cap;
float helper = clamp(length(abs(gl_PointCoord - vec2(0.5))), 0.0, cap);
float alpha = clamp((cap - helper) * scale, 0.0, 1.0);
float intensity = alpha * alpha * alpha;
if (vsize < 3.0) {
intensity *= 0.5;
}
fragColor = vec4(vcolor.xyz, intensity);`),a}function d(a,o){return l(e,o.camera.projectionMatrix),e[10]=24e-8-1,e[11]=-1,e[14]=(24e-8-2)*o.camera.near,t(e,e,o.camera.viewMatrix),t(e,e,a.modelMatrix)}var e=n(),h=Object.freeze(Object.defineProperty({__proto__:null,build:f},Symbol.toStringTag,{value:"Module"}));export{f as a,h as b};
