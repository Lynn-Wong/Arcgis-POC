import{a as s}from"./chunk-A634OTHD.js";import{a as m}from"./chunk-2XDZ5QNL.js";import{a as e}from"./chunk-UUP4FBYC.js";function p({code:r,uniforms:o},i){o.add(new s("dpDummy",()=>1)),r.add(e`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 hiD = hiA + hiB;
vec3 loD = loA + loB;
return  dpDummy * hiD + loD;
}`)}var t=class extends m{constructor(o,i,a){super(o,"mat3",2,(c,d,n)=>c.setUniformMatrix3fv(o,i(d,n),a))}};export{p as a,t as b};
