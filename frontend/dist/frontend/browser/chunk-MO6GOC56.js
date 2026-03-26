import{a}from"./chunk-UUP4FBYC.js";function d(m,e){let r=m.fragment;switch(r.code.add(a`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),e.doubleSidedMode){case 0:r.code.add(a`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`);break;case 1:r.code.add(a`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`);break;case 2:r.code.add(a`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`);break;default:e.doubleSidedMode;case 3:}}export{d as a};
