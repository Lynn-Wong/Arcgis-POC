import{a as v}from"./chunk-COHKIGGR.js";import{a as b}from"./chunk-Z5A2D2S2.js";import{a as h}from"./chunk-7GY7HBFV.js";import{a as P}from"./chunk-3C5EAPCU.js";import{c as f}from"./chunk-2EG4SLVE.js";import{a as p,b as u,c as w}from"./chunk-5VGDBOMN.js";import{a as l}from"./chunk-J6IEXWQ2.js";import{a as m}from"./chunk-2NXJIMQ2.js";import{a as c}from"./chunk-A634OTHD.js";import{a as g}from"./chunk-QF5M5KTV.js";import{a as S}from"./chunk-H2ASV3YO.js";import{a,b as d}from"./chunk-UUP4FBYC.js";import{a as s}from"./chunk-YMQ4BGWF.js";function z(r,o){if(!o.screenSizeEnabled)return;let e=r.vertex;p(e,o),e.uniforms.add(new c("perScreenPixelRatio",i=>i.camera.perScreenPixelRatio),new S("screenSizeScale",i=>i.screenSizeScale)).code.add(a`float computeRenderPixelSizeAt( vec3 pWorld ){
vec3 viewForward = - vec3(view[0][2], view[1][2], view[2][2]);
float viewDirectionDistance = abs(dot(viewForward, pWorld - cameraPosition));
return viewDirectionDistance * perScreenPixelRatio;
}
vec3 screenSizeScaling(vec3 position, vec3 anchor){
return position * screenSizeScale * computeRenderPixelSizeAt(anchor) + anchor;
}`)}function C(r){let o=new g;o.include(v),o.include(z,r),o.fragment.include(f,r),o.include(b,r),o.include(h,r);let{vertex:e,fragment:i}=o;return i.include(P),u(e,r),i.uniforms.add(new l("uColor",t=>t.color)),o.attributes.add("position","vec3"),o.varyings.add("vWorldPosition","vec3"),r.screenSizeEnabled&&o.attributes.add("offset","vec3"),r.shadingEnabled&&(w(e),o.attributes.add("normal","vec3"),o.varyings.add("vViewNormal","vec3"),i.uniforms.add(new m("shadingDirection",t=>t.shadingDirection)),i.uniforms.add(new l("shadedColor",t=>D(t.shadingTint,t.color)))),e.main.add(a`
    vWorldPosition = ${r.screenSizeEnabled?a`screenSizeScaling(offset, position)`:a`position`};
    ${d(r.shadingEnabled,a`vec3 worldNormal = normal;
           vViewNormal = (viewNormal * vec4(worldNormal, 1)).xyz;`)}
    forwardViewPosDepth((view * vec4(vWorldPosition, 1.0)).xyz);
    gl_Position = transformPosition(proj, view, vWorldPosition);
  `),i.main.add(a`
      discardBySlice(vWorldPosition);
      discardByTerrainDepth();
      ${r.shadingEnabled?a`vec3 viewNormalNorm = normalize(vViewNormal);
             float shadingFactor = 1.0 - clamp(-dot(viewNormalNorm, shadingDirection), 0.0, 1.0);
             vec4 finalColor = mix(uColor, shadedColor, shadingFactor);`:a`vec4 finalColor = uColor;`}
      outputColorHighlightOID(finalColor, vWorldPosition, finalColor.rgb);`),o}function D(r,o){let e=1-r[3],i=r[3]+o[3]*e;return i===0?(n[3]=i,n):(n[0]=(r[0]*r[3]+o[0]*o[3]*e)/i,n[1]=(r[1]*r[3]+o[1]*o[3]*e)/i,n[2]=(r[2]*r[3]+o[2]*o[3]*e)/i,n[3]=o[3],n)}var n=s(),H=Object.freeze(Object.defineProperty({__proto__:null,build:C},Symbol.toStringTag,{value:"Module"}));export{C as a,H as b};
