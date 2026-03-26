import{a as A,d as v}from"./chunk-J75CXDVX.js";import{a as L}from"./chunk-N5UWJJ2M.js";import{a as H}from"./chunk-OVPKAFQB.js";import{b as S,c as U}from"./chunk-PTXLSCMJ.js";import{f as C}from"./chunk-PGXMEFYQ.js";import{a as c}from"./chunk-COHKIGGR.js";import{c as F}from"./chunk-HZ4CWPH3.js";import{a as z}from"./chunk-GVXXBNZP.js";import{a as $}from"./chunk-XSD5BTYG.js";import{a as W}from"./chunk-JIVOQNH4.js";import{a as p}from"./chunk-IBO6ILUH.js";import{a as B}from"./chunk-YQSUB555.js";import{a as g,b as w,c as y,e as O}from"./chunk-HNCVMFZH.js";import{a as D}from"./chunk-FAYM6DKX.js";import{a as E}from"./chunk-N3BZYENM.js";import{c as d}from"./chunk-2EG4SLVE.js";import{b as m,c as j}from"./chunk-5VGDBOMN.js";import{a as T}from"./chunk-YQXWXQD3.js";import{a as u}from"./chunk-45K2AY22.js";import{a as e,b as l}from"./chunk-UUP4FBYC.js";import{c as h}from"./chunk-WENEM4NK.js";import{a as V}from"./chunk-JARU7KSM.js";import{d as N}from"./chunk-JJQR3F6K.js";import{q as k}from"./chunk-B2QABUVD.js";import{a as _}from"./chunk-VEYWSQAY.js";function J(o){o.vertex.code.add(e`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}function X(o,r){r.instancedColor?(o.attributes.add("instanceColor","vec4"),o.vertex.include(g),o.vertex.include(w),o.vertex.include(y),o.vertex.code.add(e`
      MaskedColor applyInstanceColor(MaskedColor color) {
        return multiplyMaskedColors( color, createMaskedFromUInt8NaNColor(${"instanceColor"}));
      }
    `)):o.vertex.code.add(e`MaskedColor applyInstanceColor(MaskedColor color) {
return color;
}`)}var G=_();function xo(o,r){let{hasModelTransformation:i,instancedDoublePrecision:a,instanced:x,output:P,hasVertexTangents:I}=r;i&&(o.vertex.uniforms.add(new $("model",n=>n.modelTransformation??N)),o.vertex.uniforms.add(new D("normalLocalOriginFromModel",n=>(k(G,n.modelTransformation??N),G)))),x&&a&&(o.attributes.add("instanceModelOriginHi","vec3"),o.attributes.add("instanceModelOriginLo","vec3"),o.attributes.add("instanceModel","mat3"),o.attributes.add("instanceModelNormal","mat3"));let t=o.vertex;a&&(t.include(z,r),t.uniforms.add(new T("viewOriginHi",n=>S(h(b,n.camera.viewInverseTransposeMatrix[3],n.camera.viewInverseTransposeMatrix[7],n.camera.viewInverseTransposeMatrix[11]),b)),new T("viewOriginLo",n=>U(h(b,n.camera.viewInverseTransposeMatrix[3],n.camera.viewInverseTransposeMatrix[7],n.camera.viewInverseTransposeMatrix[11]),b)))),t.code.add(e`
    vec3 getVertexInLocalOriginSpace() {
      return ${i?a?"(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz":"(model * localPosition()).xyz":a?"instanceModel * localPosition().xyz":"localPosition().xyz"};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${a?e`
          // Issue: (should be resolved now with invariant position) https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -instanceModelOriginHi, -instanceModelOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `),t.code.add(e`
    vec3 dpNormal(vec4 _normal) {
      return normalize(${i?a?"normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)":"normalLocalOriginFromModel * _normal.xyz":a?"instanceModelNormal * _normal.xyz":"_normal.xyz"});
    }
    `),P===3&&(j(t),t.code.add(e`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${i?a?"vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)":"vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)":a?"vec4(instanceModelNormal * _normal.xyz, 1.0)":"_normal"}).xyz);
    }
    `)),I&&t.code.add(e`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${i?a?"return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);":"return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);":a?"return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}
    }`)}var b=V();function yo(o,r){o.varyings.add("colorMixMode","int"),o.varyings.add("opacityMixMode","int"),o.vertex.uniforms.add(new W("symbolColorMixMode",i=>C[i.colorMixMode])),r.hasSymbolColors?(o.vertex.include(g),o.vertex.include(w),o.vertex.include(y),o.attributes.add("symbolColor","vec4"),o.vertex.code.add(e`
    MaskedColor applySymbolColor(MaskedColor color) {
      return multiplyMaskedColors(color, createMaskedFromUInt8NaNColor(${"symbolColor"}));
    }
  `)):o.vertex.code.add(e`MaskedColor applySymbolColor(MaskedColor color) {
return color;
}`),o.vertex.code.add(e`
    void forwardColorMixMode(bvec4 mask) {
      colorMixMode = mask.r ? ${e.int(C.ignore)} : symbolColorMixMode;
      opacityMixMode = mask.a ? ${e.int(C.ignore)} : symbolColorMixMode;
    }
  `)}function Fo(o,r){let{vertex:i,fragment:a,varyings:x}=o,{hasColorTexture:P,alphaDiscardMode:I}=r,t=P&&I!==1,{output:n,normalType:f,hasColorTextureTransform:M}=r;switch(n){case 2:m(i,r),o.include(c),a.include(d,r),o.include(p,r),t&&a.uniforms.add(new u("tex",s=>s.texture)),i.main.add(e`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),o.include(v,r),a.main.add(e`
        discardBySlice(vpos);
        ${l(t,e`vec4 texColor = texture(tex, ${M?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}`);break;case 4:case 5:case 6:case 7:case 10:m(i,r),o.include(c),o.include(p,r),o.include(O,r),o.include(H,r),a.include(d,r),o.include(B,r),F(o),x.add("depth","float",{invariant:!0}),t&&a.uniforms.add(new u("tex",s=>s.texture)),i.main.add(e`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();`),o.include(v,r),a.main.add(e`
        discardBySlice(vpos);
        ${l(t,e`vec4 texColor = texture(tex, ${M?"colorUV":"vuv0"});
               discardOrAdjustAlpha(texColor);`)}
        ${n===10?e`outputObjectAndLayerIdColor();`:e`outputDepth(depth);`}`);break;case 3:{m(i,r),o.include(c),o.include(L,r),o.include(A,r),o.include(p,r),o.include(O,r),t&&a.uniforms.add(new u("tex",Y=>Y.texture)),f===2&&x.add("vPositionView","vec3",{invariant:!0});let s=f===0||f===1;i.main.add(e`
        vpos = getVertexInLocalOriginSpace();
        ${s?e`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:e`vPositionView = (view * vec4(vpos, 1.0)).xyz;`}
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, vpos);
        forwardTextureCoordinates();`),a.include(d,r),o.include(v,r),a.main.add(e`
        discardBySlice(vpos);
        ${l(t,e`vec4 texColor = texture(tex, ${M?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}

        ${f===2?e`vec3 normal = screenDerivativeNormal(vPositionView);`:e`vec3 normal = normalize(vNormalWorld);
                    if (gl_FrontFacing == false){
                      normal = -normal;
                    }`}
        fragColor = vec4(0.5 + 0.5 * normal, 1.0);`);break}case 9:m(i,r),o.include(c),o.include(p,r),o.include(O,r),t&&a.uniforms.add(new u("tex",s=>s.texture)),i.main.add(e`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),a.include(d,r),o.include(v,r),o.include(E,r),a.main.add(e`
        discardBySlice(vpos);
        ${l(t,e`vec4 texColor = texture(tex, ${M?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}
        calculateOcclusionAndOutputHighlight();`)}}export{J as a,X as b,xo as c,yo as d,Fo as e};
