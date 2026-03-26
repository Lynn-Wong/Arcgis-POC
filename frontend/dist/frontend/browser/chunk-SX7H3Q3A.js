import{a as w,b as F}from"./chunk-GVXXBNZP.js";import{a as P}from"./chunk-XSD5BTYG.js";import{a as W}from"./chunk-FAYM6DKX.js";import{a as n}from"./chunk-BAC6RMAZ.js";import{a as t}from"./chunk-2NXJIMQ2.js";import{a as s}from"./chunk-L7NOU4T2.js";import{a as o}from"./chunk-UUP4FBYC.js";import{a}from"./chunk-JARU7KSM.js";import{a as v}from"./chunk-JJQR3F6K.js";import{a as m}from"./chunk-VEYWSQAY.js";function _(i,d){let{attributes:R,vertex:e,varyings:l,fragment:f}=i;e.include(w,d),R.add("position","vec3"),l.add("vPositionWorldCameraRelative","vec3"),l.add("vPosition_view","vec3",{invariant:!0}),e.uniforms.add(new t("transformWorldFromViewTH",r=>r.transformWorldFromViewTH),new t("transformWorldFromViewTL",r=>r.transformWorldFromViewTL),new W("transformViewFromCameraRelativeRS",r=>r.transformViewFromCameraRelativeRS),new P("transformProjFromView",r=>r.transformProjFromView),new F("transformWorldFromModelRS",r=>r.transformWorldFromModelRS),new n("transformWorldFromModelTH",r=>r.transformWorldFromModelTH),new n("transformWorldFromModelTL",r=>r.transformWorldFromModelTL)),e.code.add(o`vec3 positionWorldCameraRelative() {
vec3 rotatedModelPosition = transformWorldFromModelRS * position;
vec3 transform_CameraRelativeFromModel = dpAdd(
transformWorldFromModelTL,
transformWorldFromModelTH,
-transformWorldFromViewTL,
-transformWorldFromViewTH
);
return transform_CameraRelativeFromModel + rotatedModelPosition;
}`),e.code.add(o`
    void forwardPosition(float fOffset) {
      vPositionWorldCameraRelative = positionWorldCameraRelative();
      if (fOffset != 0.0) {
        vPositionWorldCameraRelative += fOffset * ${d.spherical?o`normalize(transformWorldFromViewTL + vPositionWorldCameraRelative)`:o`vec3(0.0, 0.0, 1.0)`};
      }

      vPosition_view = transformViewFromCameraRelativeRS * vPositionWorldCameraRelative;
      gl_Position = transformProjFromView * vec4(vPosition_view, 1.0);
    }
  `),f.uniforms.add(new t("transformWorldFromViewTL",r=>r.transformWorldFromViewTL)),e.code.add(o`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`),f.code.add(o`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`)}var c=class extends s{constructor(){super(...arguments),this.transformWorldFromViewTH=a(),this.transformWorldFromViewTL=a(),this.transformViewFromCameraRelativeRS=m(),this.transformProjFromView=v()}},V=class extends s{constructor(){super(...arguments),this.transformWorldFromModelRS=m(),this.transformWorldFromModelTH=a(),this.transformWorldFromModelTL=a()}};export{_ as a,c as b,V as c};
