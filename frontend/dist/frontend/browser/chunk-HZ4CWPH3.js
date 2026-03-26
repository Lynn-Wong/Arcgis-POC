import{a as i}from"./chunk-SX7H3Q3A.js";import{a as n}from"./chunk-KFI4I766.js";import{a as d}from"./chunk-24Z55BQA.js";import{a as e,b as t}from"./chunk-UUP4FBYC.js";function l(a){a.varyings.add("linearDepth","float",{invariant:!0})}function p(a,r){r&&l(a),a.vertex.code.add(e`
    void forwardLinearDepth(float _linearDepth) { ${t(r,"linearDepth = _linearDepth;")} }
  `)}function s(a){a.vertex.uniforms.add(new d("nearFar",r=>r.camera.nearFar))}function c(a){a.vertex.code.add(e`float calculateLinearDepth(vec2 nearFar,float z) {
return (-z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)}function L(a,r){let{vertex:f}=a,o=n(r.output);o&&(a.include(i,r),p(a,!0),s(a),c(a)),f.code.add(e`
    void forwardLinearDepthToWriteShadowMap() {
      ${t(o,"forwardLinearDepth(calculateLinearDepth(nearFar, vPosition_view.z));")}
    }
  `)}export{l as a,p as b,s as c,c as d,L as e};
