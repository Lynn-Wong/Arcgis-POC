import{a as b}from"./chunk-5RRAPQXN.js";import{a as _}from"./chunk-MO6GOC56.js";import{f as T,g as W}from"./chunk-UOR7KWCN.js";import{b as L,c as U,d as j,e as M}from"./chunk-J5QOJH4Q.js";import{a as A}from"./chunk-OVPKAFQB.js";import{e as $}from"./chunk-A3EE4NCD.js";import{b as R}from"./chunk-N4F7I4XE.js";import{a as v}from"./chunk-COHKIGGR.js";import{c as O}from"./chunk-HZ4CWPH3.js";import{a as E}from"./chunk-Z5A2D2S2.js";import{f as w}from"./chunk-KFI4I766.js";import{a as S}from"./chunk-YQSUB555.js";import{a as N,i as D,j as f}from"./chunk-WWWOXNSG.js";import{a as p}from"./chunk-GMXW7EMM.js";import{a as G}from"./chunk-7GY7HBFV.js";import{a as H}from"./chunk-3C5EAPCU.js";import{a as F}from"./chunk-N3BZYENM.js";import{c}from"./chunk-2EG4SLVE.js";import{a as z,b as P,c as V}from"./chunk-5VGDBOMN.js";import{a as C}from"./chunk-J6IEXWQ2.js";import{a as l}from"./chunk-2NXJIMQ2.js";import{a as I}from"./chunk-YZ4IDPMQ.js";import{a as k}from"./chunk-QF5M5KTV.js";import{a as u}from"./chunk-H2ASV3YO.js";import{a as r,b as n}from"./chunk-UUP4FBYC.js";import{c as x}from"./chunk-6QJXCAOV.js";var y=8;function J(e,o){let{attributes:t,vertex:a}=e;t.add("position","vec3"),t.add("profileVertexAndNormal","vec4"),t.add("profileAuxData","vec3"),t.add("profileRight","vec2"),t.add("profileUp","vec2"),a.code.add(r`bool isCapVertex() {
return profileAuxData.z == 1.0;
}`),a.uniforms.add(new I("size",i=>i.size));let{hasVVSize:s,hasVVColor:d,hasVVOpacity:g}=o;s?(t.add("sizeFeatureAttribute","float"),a.uniforms.add(new l("vvSizeMinSize",i=>i.vvSize.minSize),new l("vvSizeMaxSize",i=>i.vvSize.maxSize),new l("vvSizeOffset",i=>i.vvSize.offset),new l("vvSizeFactor",i=>i.vvSize.factor),new l("vvSizeFallback",i=>i.vvSize.fallback)),a.code.add(r`vec2 getSize() {
float value = sizeFeatureAttribute;
if (isnan(value)) {
return vvSizeFallback.xz;
}
return size * clamp(vvSizeOffset + value * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).xz;
}`)):a.code.add(r`vec2 getSize(){
return size;
}`),g?(t.add("opacityFeatureAttribute","float"),a.constants.add("vvOpacityNumber","int",y),a.uniforms.add(new p("vvOpacityValues",i=>i.vvOpacity.values,y),new p("vvOpacityOpacities",i=>i.vvOpacity.opacityValues,y),new u("vvOpacityFallback",i=>i.vvOpacity.fallback,{supportsNaN:!0})),a.code.add(r`
    vec4 applyOpacity(vec4 color) {
      // if we encounter NaN in the color it means the color is in the fallback case where the symbol color
      // is not defined and there is no valid color visual variable override. In this case just return a fully
      // transparent color
      if (isnan(color.r)) {
        return vec4(0);
      }

      float value = opacityFeatureAttribute;

      if (isnan(value)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${n(d,"color","vec4(color.rgb, vvOpacityFallback)")};
      }

      if (value <= vvOpacityValues[0]) {
        return vec4(color.rgb, vvOpacityOpacities[0]);
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return vec4(color.rgb, mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f));
        }
      }

      return vec4( color.rgb, vvOpacityOpacities[vvOpacityNumber - 1]);
    }
    `)):a.code.add(r`vec4 applyOpacity(vec4 color){
return color;
}`),d?(t.add("colorFeatureAttribute","float"),a.constants.add("vvColorNumber","int",f),a.uniforms.add(new p("vvColorValues",i=>i.vvColor.values,f),new N("vvColorColors",i=>i.vvColor.colors,f),new C("vvColorFallback",i=>i.vvColor.fallback)),a.code.add(r`vec4 getColor() {
float value = colorFeatureAttribute;
if (isnan(value)) {
return applyOpacity(vvColorFallback);
}
if (value <= vvColorValues[0]) {
return applyOpacity(vvColorColors[0]);
}
for (int i = 1; i < vvColorNumber; ++i) {
if (vvColorValues[i] >= value) {
float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
return applyOpacity(mix(vvColorColors[i-1], vvColorColors[i], f));
}
}
return applyOpacity(vvColorColors[vvColorNumber - 1]);
}`)):a.code.add(r`vec4 getColor(){
return applyOpacity(vec4(1, 1, 1, 1));
}`),a.code.add(r`vec3 decompressAxis(vec2 axis) {
float z = 1.0 - abs(axis.x) - abs(axis.y);
return normalize(vec3(axis + sign(axis) * min(z, 0.0), z));
}
vec3 calculateVPos() {
vec2 size = getSize();
vec3 origin = position;
vec3 right = decompressAxis(profileRight);
vec3 up = decompressAxis(profileUp);
vec2 profileVertex = profileVertexAndNormal.xy * size;`),a.code.add(r`if(isCapVertex()) {
float positionOffsetAlongProfilePlaneNormal = profileAuxData.x * size[0];
vec3 forward = cross(up, right);
vec3 offset = right * profileVertex.x + up * profileVertex.y + forward * positionOffsetAlongProfilePlaneNormal;
return origin + offset;
}
vec2 rotationRight = vec2(profileAuxData.x, profileAuxData.y);
float maxDistance = length(rotationRight);`),a.code.add(r`rotationRight = maxDistance > 0.0 ? normalize(rotationRight) : vec2(0, 0);
float rx = dot(profileVertex, rotationRight);
if (abs(rx) > maxDistance) {
vec2 rotationUp = vec2(-rotationRight.y, rotationRight.x);
float ry = dot(profileVertex, rotationUp);
profileVertex = rotationRight * maxDistance * sign(rx) + rotationUp * ry;
}
vec3 offset = right * profileVertex.x + up * profileVertex.y;
return origin + offset;
}`),a.code.add(r`vec3 localNormal() {
vec3 right = decompressAxis(profileRight);
vec3 up = decompressAxis(profileUp);
vec3 normal = right * profileVertexAndNormal.z + up * profileVertexAndNormal.w;
if(isCapVertex()) {
vec3 forward = cross(up, right);
normal += forward * profileAuxData.y;
}
return normal;
}`)}var q=class extends D{constructor(){super(...arguments),this.size=x(1,1)}};function K(e){let o=new k,{vertex:t,fragment:a,varyings:s}=o;P(t,e),s.add("vpos","vec3",{invariant:!0}),o.include(J,e);let{output:d,spherical:g,pbrMode:i,snowCover:h}=e;switch((w(d)||d===10)&&(o.include(v),o.include($,e),o.include(S,e),o.include(G,e),s.add("vnormal","vec3"),s.add("vcolor","vec4"),t.main.add(r`vpos = calculateVPos();
vnormal = normalize(localNormal());
forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
gl_Position = transformPosition(proj, view, vpos);
forwardObjectAndLayerIdColor();
vcolor = getColor();
forwardLinearDepthToReadShadowMap();`)),d){case 1:case 0:o.include(T,e),o.include(M,e),a.include(L,e),o.include(_,e),a.include(c,e),o.include(E,e),z(a,e),U(a),j(a),a.uniforms.add(t.uniforms.get("localOrigin"),new l("ambient",m=>m.ambient),new l("diffuse",m=>m.diffuse),new u("opacity",m=>m.opacity)),a.include(H),a.include(W,e),R(a),a.main.add(r`
        discardBySlice(vpos);
        discardByTerrainDepth();

        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        shadingParams.normalView = vnormal;
        vec3 normal = shadingNormal(shadingParams);
        float ssao = evaluateAmbientOcclusionInverse();

        vec3 posWorld = vpos + localOrigin;
        vec3 normalGround = ${g?"normalize(posWorld);":"vec3(0.0, 0.0, 1.0);"}

        vec3 albedo = vcolor.rgb * max(ambient, diffuse); // combine the old material parameters into a single one
        float combinedOpacity = vcolor.a * opacity;

        ${n(h,r`float snow = getSnow(normal, normalGround);
                 albedo = mix(albedo, vec3(1), snow);
                 ssao = mix(ssao, 1.0, snow);`)}

        float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        float shadow = readShadow(additionalAmbientScale, vpos);

        ${n(i===2,`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
           ${n(h,"mrr = applySnowToMRR(mrr, snow);")}`)}

        vec3 shadedColor = ${i===2?"evaluateSceneLightingPBR(normal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, additionalAmbientIrradiance);":"evaluateSceneLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight);"}
        vec4 finalColor = vec4(shadedColor, combinedOpacity);
        outputColorHighlightOID(finalColor, vpos, albedo ${n(h,", snow")});`);break;case 2:o.include(v),t.main.add(r`vpos = calculateVPos();
gl_Position = transformPosition(proj, view, vpos);`),o.fragment.include(c,e),a.main.add(r`discardBySlice(vpos);`);break;case 4:case 5:case 6:case 7:o.include(v),O(o),s.add("depth","float"),t.main.add(r`vpos = calculateVPos();
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);`),o.fragment.include(c,e),o.include(A,e),a.main.add(r`discardBySlice(vpos);
outputDepth(depth);`);break;case 10:o.fragment.include(c,e),a.main.add(r`discardBySlice(vpos);
outputObjectAndLayerIdColor();`);break;case 3:o.include(v),o.include(b,e),V(t),s.add("vnormal","vec3"),t.main.add(r`vpos = calculateVPos();
vnormal = normalize((viewNormal * vec4(localNormal(), 1.0)).xyz);
gl_Position = transformPosition(proj, view, vpos);`),o.fragment.include(c,e),a.main.add(r`discardBySlice(vpos);
vec3 normal = normalize(vnormal);
if (gl_FrontFacing == false) normal = -normal;
fragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);`);break;case 9:o.include(v),o.include(b,e),s.add("vnormal","vec3"),t.main.add(r`vpos = calculateVPos();
gl_Position = transformPosition(proj, view, vpos);`),o.fragment.include(c,e),o.include(F,e),a.main.add(r`discardBySlice(vpos);
calculateOcclusionAndOutputHighlight();`)}return o}var Fa=Object.freeze(Object.defineProperty({__proto__:null,build:K},Symbol.toStringTag,{value:"Module"}));export{q as a,K as b,Fa as c};
