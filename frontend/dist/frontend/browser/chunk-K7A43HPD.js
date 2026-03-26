import{b as V}from"./chunk-GAOY3X2C.js";import{a as T}from"./chunk-T32QXVA7.js";import{a as C,b as O}from"./chunk-N4F7I4XE.js";import{f as m}from"./chunk-KFI4I766.js";import{a as y}from"./chunk-ANHDRWYO.js";import{a as f}from"./chunk-N3BZYENM.js";import{a as h}from"./chunk-H2ASV3YO.js";import{a as x}from"./chunk-45K2AY22.js";import{a as g}from"./chunk-2XDZ5QNL.js";import{a as c}from"./chunk-UUP4FBYC.js";import{a as p}from"./chunk-YMQ4BGWF.js";import{m as v,n,p as s}from"./chunk-XH3XLOW6.js";function j(e,o){let{vertex:r,fragment:t}=e;r.uniforms.add(new y("overlayTexOffset",(a,l)=>M(a,l)),new y("overlayTexScale",(a,l)=>D(a,l))),t.constants.add("overlayOpacity","float",1),t.uniforms.add(new x("ovColorTex",(a,l)=>b(a,l))),w(e,o)}function b(e,o){return e.identifier===0&&m(e.output)?e.occludedGround?o.overlay?.allSourcesOccluders?o.overlay?.getTexture(1):o.overlay?.getTexture(4):o.overlay?.getTexture(1):e.identifier===0&&e.output===10?o.overlay?.getTexture(5):e.identifier===2?o.overlay?.getTexture(2):null}function q(e,o){let{vertex:r,fragment:t}=e,{output:a}=o;r.uniforms.add(new d("overlayTexOffset"),new d("overlayTexScale")),t.uniforms.add(new h("overlayOpacity",l=>l.overlayOpacity)),a!==9&&t.uniforms.add(new x("ovColorTex",(l,u)=>u.overlay?.getTexture(l.overlayContent))),w(e,o)}function J(e,o){switch(e){case 0:case 1:return o.slot!==9||o.overlay?.allSourcesOccluders?0:4;case 2:case 3:return 0;case 9:return 2;case 4:case 6:case 7:case 8:return null;case 10:return 5}return null}function w(e,o){let r=o.pbrMode===3||o.pbrMode===4||o.pbrMode===6;r&&e.include(V,o);let{vertex:t,fragment:a,varyings:l}=e;l.add("vtcOverlay","vec4");let{output:u}=o,I=u===9;t.code.add(c`void setOverlayVTC(in vec2 uv) {
vtcOverlay = vec4(uv, uv) * overlayTexScale + overlayTexOffset;
}`),a.code.add(c`bool isValid(vec2 uv, vec2 dxdy) {
return (uv.x >= 0.0 + dxdy.x) && (uv.x <= 1.0 - dxdy.x) && (uv.y >= 0.0 + dxdy.y) && (uv.y <= 1.0 - dxdy.y);
}
vec4 getOverlayColor(sampler2D ov0Tex, vec4 texCoords) {
vec4 color0 = texture(ov0Tex, vec2(texCoords.x * 0.5, texCoords.y));
vec4 color1 = texture(ov0Tex, vec2(texCoords.z * 0.5 + 0.5, texCoords.w));
bool isValid0 = isValid(texCoords.xy, fwidth(texCoords.xy));
bool isValid1 = isValid(texCoords.zw, vec2(0.0, 0.0));
return mix(color1 * float(isValid1), color0, float(isValid0));
}`),I?a.uniforms.add(new T("overlayHighlightTexture",(H,S)=>S.overlay?.getTexture(2))).code.add(c`uvec2 getAllOverlayHighlightValuesEncoded() {
vec4 texCoords = vtcOverlay;
vec2 uvInner = texCoords.xy;
vec2 uvOuter = texCoords.zw;
bool isValidInner = isValid(uvInner, fwidth(uvInner));
bool isValidOuter = isValid(uvOuter, vec2(0.0, 0.0));
vec2 texelCoordInner = uvInner * vec2(0.5, 1.0);
vec2 texelCoordOuter = uvOuter * vec2(0.5, 1.0) + vec2(0.5,0.0);
vec2 texDim =  vec2(textureSize(overlayHighlightTexture, 0));
uvec2 texelValueInner = texelFetch(overlayHighlightTexture, ivec2(texelCoordInner * texDim), 0).rg;
uvec2 texelValueOuter = texelFetch(overlayHighlightTexture, ivec2(texelCoordOuter * texDim), 0).rg;
return
isValidInner ? texelValueInner :
isValidOuter ? texelValueOuter :
uvec2(0);
}`):(a.code.add(c`vec4 getCombinedOverlayColor() {
return overlayOpacity * getOverlayColor(ovColorTex, vtcOverlay);
}`),a.code.add(c`vec4 getOverlayColorTexel() {
vec4 texCoords = vtcOverlay;
vec2 texDim =  vec2(textureSize(ovColorTex, 0));
vec4 color0 = texelFetch(ovColorTex, ivec2(vec2(texCoords.x * 0.5, texCoords.y) * texDim), 0);
vec4 color1 = texelFetch(ovColorTex, ivec2(vec2(texCoords.z * 0.5 + 0.5, texCoords.w) * texDim), 0);
bool isValid0 = isValid(texCoords.xy, fwidth(texCoords.xy));
bool isValid1 = isValid(texCoords.zw, vec2(0.0, 0.0));
return mix(color1 * float(isValid1), color0, float(isValid0));
}`)),r&&(C(a),O(a),a.code.add(c`vec4 getOverlayWaterColor(vec4 maskInput, vec4 colorInput, vec3 vposEyeDir,
float shadow, vec3 localUp, mat3 tbn, vec3 position, vec3 positionWorld) {
vec3 n = normalize(tbn *  (2.0 * maskInput.rgb - vec3(1.0)));
vec3 v = vposEyeDir;
vec3 final = getSeaColor(n, v, mainLightDirection, colorInput.rgb, mainLightIntensity, localUp, 1.0 - shadow, maskInput.w, position, positionWorld);
return vec4(final, colorInput.w);
}`))}function M(e,o){let r=o.overlay?.overlays[0]?.extent;s(r)&&(i[0]=e.toMapSpace[0]/v(r)-r[0]/v(r),i[1]=e.toMapSpace[1]/n(r)-r[1]/n(r));let t=o.overlay?.overlays[1]?.extent;return s(t)&&(i[2]=e.toMapSpace[0]/v(t)-t[0]/v(t),i[3]=e.toMapSpace[1]/n(t)-t[1]/n(t)),i}function D(e,o){let r=o.overlay?.overlays[0]?.extent;s(r)&&(i[0]=e.toMapSpace[2]/v(r),i[1]=e.toMapSpace[3]/n(r));let t=o.overlay?.overlays[1]?.extent;return s(t)&&(i[2]=e.toMapSpace[2]/v(t),i[3]=e.toMapSpace[3]/n(t)),i}var i=p(),d=class extends g{constructor(o){super(o,"vec4")}};function R(e,o){o.output===9&&(e.include(f,o),e.fragment.code.add(c`
    void calculateOcclusionAndOutputHighlight(uvec2 highlightToAdd) {
      uint levelBits = readLevelBits(highlightToAdd, highlightLevel);
      if ((levelBits & 1u) == 0u) discard;
      outputHighlight(isHighlightOccluded());
    }
  `))}export{j as a,q as b,J as c,R as d};
