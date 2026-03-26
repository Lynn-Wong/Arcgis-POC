import{a as l}from"./chunk-BAC6RMAZ.js";import{a as d}from"./chunk-2NXJIMQ2.js";import{a as F}from"./chunk-L7NOU4T2.js";import{a as v}from"./chunk-UUP4FBYC.js";import{c as S,d as y,e as m,x as f}from"./chunk-WENEM4NK.js";import{h as B}from"./chunk-WMGH7MKS.js";import{a as t,i as p}from"./chunk-JARU7KSM.js";import{a as w}from"./chunk-JJQR3F6K.js";var g=class extends F{constructor(s){super(),this.slicePlaneLocalOrigin=s}};function k(i,s){O(i,s,new d("slicePlaneOrigin",(e,a)=>b(s,e,a)),new d("slicePlaneBasis1",(e,a)=>n(s,e,a,a.slicePlane?.basis1)),new d("slicePlaneBasis2",(e,a)=>n(s,e,a,a.slicePlane?.basis2)))}function q(i,s){O(i,s,new l("slicePlaneOrigin",(e,a)=>b(s,e,a)),new l("slicePlaneBasis1",(e,a)=>n(s,e,a,a.slicePlane?.basis1)),new l("slicePlaneBasis2",(e,a)=>n(s,e,a,a.slicePlane?.basis2)))}function z(i,s){h(i,s,new l("slicePlaneOrigin",(e,a)=>b(s,e,a)),new l("slicePlaneBasis1",(e,a)=>n(s,e,a,a.slicePlane?.basis1)),new l("slicePlaneBasis2",(e,a)=>n(s,e,a,a.slicePlane?.basis2)))}var j=v`struct SliceFactors {
float front;
float side0;
float side1;
float side2;
float side3;
};
SliceFactors calculateSliceFactors(vec3 pos) {
vec3 rel = pos - slicePlaneOrigin;
vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);
float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);
float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);
float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);
float basis1Dot = dot(slicePlaneBasis1, rel);
float basis2Dot = dot(slicePlaneBasis2, rel);
return SliceFactors(
dot(slicePlaneNormal, pos) + slicePlaneW,
-basis1Dot - basis1Len2,
basis1Dot - basis1Len2,
-basis2Dot - basis2Len2,
basis2Dot - basis2Len2
);
}
bool sliceByFactors(SliceFactors factors) {
return factors.front < 0.0
&& factors.side0 < 0.0
&& factors.side1 < 0.0
&& factors.side2 < 0.0
&& factors.side3 < 0.0;
}
bool sliceEnabled() {
return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;
}
bool sliceByPlane(vec3 pos) {
return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));
}
bool rejectBySlice(vec3 pos) {
return sliceByPlane(pos);
}`;function h(i,s,...e){s.hasSlicePlane?(i.uniforms.add(...e),i.code.add(j)):i.code.add("bool rejectBySlice(vec3 pos) { return false; }")}function O(i,s,...e){h(i,s,...e),s.hasSlicePlane?i.code.add(`
    void discardBySlice(vec3 pos) {
      if (sliceByPlane(pos)) {
        discard;
      }
    }

    vec4 applySliceOutline(vec4 color, vec3 pos) {
      SliceFactors factors = calculateSliceFactors(pos);

      factors.front /= 2.0 * fwidth(factors.front);
      factors.side0 /= 2.0 * fwidth(factors.side0);
      factors.side1 /= 2.0 * fwidth(factors.side1);
      factors.side2 /= 2.0 * fwidth(factors.side2);
      factors.side3 /= 2.0 * fwidth(factors.side3);

      // return after calling fwidth, to avoid aliasing caused by discontinuities in the input to fwidth
      if (sliceByFactors(factors)) {
        return color;
      }

      float outlineFactor = (1.0 - step(0.5, factors.front))
        * (1.0 - step(0.5, factors.side0))
        * (1.0 - step(0.5, factors.side1))
        * (1.0 - step(0.5, factors.side2))
        * (1.0 - step(0.5, factors.side3));

      return mix(color, vec4(vec3(0.0), color.a), outlineFactor * 0.3);
    }

    vec4 applySlice(vec4 color, vec3 pos) {
      return sliceEnabled() ? applySliceOutline(color, pos) : color;
    }
  `):i.code.add(v`void discardBySlice(vec3 pos) { }
vec4 applySlice(vec4 color, vec3 pos) { return color; }`)}function x(i,s,e){return i.instancedDoublePrecision?S(M,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]):s.slicePlaneLocalOrigin}function D(i,s){return i!=null?m(u,s.origin,i):s.origin}function L(i,s,e){return i.hasSliceTranslatedView?s!=null?B(E,e.camera.viewMatrix,s):e.camera.viewMatrix:null}function b(i,s,e){if(e.slicePlane==null)return p;let a=x(i,s,e),c=D(a,e.slicePlane),o=L(i,a,e);return o!=null?f(u,c,o):c}function n(i,s,e,a){if(a==null||e.slicePlane==null)return p;let c=x(i,s,e),o=D(c,e.slicePlane),P=L(i,c,e);return P!=null?(y(r,a,o),f(u,o,P),f(r,r,P),m(r,r,u)):a}var M=t(),u=t(),r=t(),E=w();export{g as a,k as b,q as c,z as d};
