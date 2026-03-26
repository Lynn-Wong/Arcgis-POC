import{b as v,d as te}from"./chunk-K7A43HPD.js";import{a as re}from"./chunk-AB6LUEY5.js";import{a as ae}from"./chunk-5RRAPQXN.js";import{a as A}from"./chunk-N5UWJJ2M.js";import{b as K,c as Y,d as Z,e as T}from"./chunk-J5QOJH4Q.js";import{a as G}from"./chunk-OVPKAFQB.js";import{c as ee,e as oe}from"./chunk-A3EE4NCD.js";import{a as Q,b as X}from"./chunk-N4F7I4XE.js";import{a as U}from"./chunk-COHKIGGR.js";import{a as V,c as j}from"./chunk-HZ4CWPH3.js";import{a as H}from"./chunk-IBO6ILUH.js";import{a as q}from"./chunk-N3BZYENM.js";import{a as x}from"./chunk-VGAXEXH3.js";import{c as D}from"./chunk-2EG4SLVE.js";import{a as W,b as I,c as E}from"./chunk-5VGDBOMN.js";import{a as k}from"./chunk-NTQXKDNS.js";import{a as _}from"./chunk-YQXWXQD3.js";import{a as R}from"./chunk-R6IIY54E.js";import{a as J}from"./chunk-QF5M5KTV.js";import{a as g}from"./chunk-2XDZ5QNL.js";import{a as e,b as i}from"./chunk-UUP4FBYC.js";import{c as F,t as B}from"./chunk-WENEM4NK.js";import{h as S}from"./chunk-WMGH7MKS.js";import{a as L}from"./chunk-JARU7KSM.js";import{a as N}from"./chunk-JJQR3F6K.js";function ie(o,a){o.varyings.add("tbnTangent","vec3"),o.varyings.add("tbnBiTangent","vec3"),a.spherical?o.vertex.code.add(e`void forwardVertexTangent(vec3 n) {
tbnTangent = normalize(cross(vec3(0.0, 0.0, 1.0), n));
tbnBiTangent = normalize(cross(n, tbnTangent));
}`):o.vertex.code.add(e`void forwardVertexTangent(vec3 n) {
tbnTangent = vec3(1.0, 0.0, 0.0);
tbnBiTangent = normalize(cross(n, tbnTangent));
}`),o.fragment.code.add(e`mat3 getTBNMatrix(vec3 n) {
return mat3(tbnTangent, tbnBiTangent, n);
}`)}var y=class extends ee{constructor(){super(...arguments),this.overlayOpacity=1}};function ne(o,a){let{vertex:u,fragment:r,varyings:t}=o;t.add("vtc","vec2"),u.uniforms.add(new w("texOffsetAndScale")),r.uniforms.add(new b("tex")),r.uniforms.add(new C("textureOpacities"));let n=a.textureFadingEnabled&&!a.renderOccluded;n&&(u.uniforms.add(new w("nextTexOffsetAndScale")),t.add("nvtc","vec2"),r.uniforms.add(new b("texNext")),r.uniforms.add(new C("nextTexOpacities")),r.uniforms.add(new O("fadeFactor")));let c=a.tileBlendInput===1,f=a.tileBlendInput===2;f&&r.include(re),c&&r.uniforms.add(new C("backgroundColor")),u.code.add(e`
  void forwardTextureCoordinatesWithTransform(in vec2 uv) {
    vtc = texOffsetAndScale.xy + uv * texOffsetAndScale.zw;
    ${i(n,"nvtc = nextTexOffsetAndScale.xy + uv * nextTexOffsetAndScale.zw;")}
  }`),r.code.add(e`
    vec4 getColor(vec4 color, vec2 uv, vec3 opacities) {
      ${i(f||c,e`if (opacities.y <= 0.0) {
           return color * opacities.z * opacities.x;
         }
         vec4 bg = vec4(${c?e`backgroundColor`:e`gridColor(uv)`} * opacities.y, opacities.y);
         vec4 layer = color * opacities.z;
         return (bg * (1.0 - layer.a) + layer) * opacities.x;`,"return color;")}
    }`),n?r.code.add(e`vec4 getTileColor() {
vec4 color = getColor(texture(tex, vtc), vtc, textureOpacities);
if (fadeFactor >= 1.0) {
return color;
}
vec4 nextColor = getColor(texture(texNext, nvtc), nvtc, nextTexOpacities);
return mix(nextColor, color, fadeFactor);
}`):r.code.add(e`vec4 getTileColor() {
return getColor(texture(tex, vtc), vtc, textureOpacities);
}`)}var O=class extends g{constructor(a){super(a,"float")}},C=class extends g{constructor(a){super(a,"vec3")}},w=class extends g{constructor(a){super(a,"vec4")}},b=class extends g{constructor(a){super(a,"sampler2D")}};var P=class extends y{};function me(o){let a=new J,{attributes:u,vertex:r,fragment:t,varyings:n}=a;u.add("position","vec3"),a.include(A,o),a.include(H,o);let c=()=>{a.include(ae,o),r.code.add(e`vec3 getNormal() {
float z = 1.0 - abs(normalCompressed.x) - abs(normalCompressed.y);
vec3 n = vec3(normalCompressed + vec2(normalCompressed.x >= 0.0 ? 1.0 : -1.0,
normalCompressed.y >= 0.0 ? 1.0 : -1.0) * min(z, 0.0), z);
return normalize(n);
}`)};I(r,o),a.include(U);let{output:f,pbrMode:p,overlayMode:se,tileBorders:z,spherical:ce,transparencyMode:h,overlayEnabled:l}=o,$=h===2||h===3,d=l&&$;switch(f){case 1:case 0:{a.include(ne,o),a.include(T,o),l&&(o.pbrMode=p===5?6:3,a.include(v,o),o.pbrMode=p);let m=se===2;m&&a.include(ie,o),n.add("vnormal","vec3"),n.add("vpos","vec3",{invariant:!0}),n.add("vup","vec3"),c(),r.main.add(e`
          vpos = position;
          vec3 positionWorld = position + localOrigin;
          gl_Position = transformPosition(proj, view, vpos);
          vnormal = getNormal();
          vup = getLocalUp(position, localOrigin);
          ${i(m,e`forwardVertexTangent(vnormal);`)}

          forwardTextureCoordinatesWithTransform(uv0);
          ${i(l,"setOverlayVTC(uv0);")}
          ${i(z,"forwardTextureCoordinates();")}
          forwardLinearDepthToReadShadowMap();`),a.include(oe,o),t.include(D,o),a.include(T,o),t.include(K,o),W(t,o),Y(t),Z(t),t.uniforms.add(r.uniforms.get("localOrigin"),new _("viewDirection",({camera:s})=>B(le,F(le,s.viewMatrix[12],s.viewMatrix[13],s.viewMatrix[14])))),m&&t.uniforms.add(new R("ovWaterTex",s=>s.overlay?.getTexture(3)),new k("view",({origin:s},{camera:de})=>S(ve,de.viewMatrix,s)));let M=.2;t.code.add(e`float lum(vec3 c) {
return (min(min(c.r, c.g), c.b) + max(max(c.r, c.g), c.b)) * 0.5;
}`),Q(t),X(t),t.main.add(e`
          vec3 normal = normalize(vnormal);
          float vndl = dot(normal, mainLightDirection);

          float additionalAmbientScale = smoothstep(0.0, 1.0, clamp(vndl*2.5, 0.0, 1.0));
          float shadow = readShadow(additionalAmbientScale, vpos);
          float ssao = evaluateAmbientOcclusionInverse();
          vec4 tileColor = getTileColor();

          ${i(l,e`vec4 overlayColorOpaque = getOverlayColor(ovColorTex, vtcOverlay);
                   vec4 overlayColor = overlayOpacity * overlayColorOpaque;
                   ${i($,`if (overlayColor.a < ${e.float(x)}) { discard; }`)}
                   vec4 groundColor = tileColor;
                   tileColor = tileColor * (1.0 - overlayColor.a) + overlayColor;`)}

          // If combined alpha is 0 we can discard pixel. The performance impact by having a discard here
          // is neglectable because terrain typically renders first into the framebuffer.
          if(tileColor.a < ${e.float(x)}) {
            discard;
          }

          bool sliced = rejectBySlice(vpos);
          if (sliced) {
            tileColor *= ${e.float(M)};
          }

          vec3 albedo = tileColor.rgb;

          // heuristic shading function used in the old terrain, now used to add ambient lighting

          vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

          ${p===5||p===6?e`fragColor = vec4(evaluatePBRSimplifiedLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight, normalize(vpos - cameraPosition), vup), tileColor.a);`:e`fragColor = vec4(evaluateSceneLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight), tileColor.a);`}
          ${i(m,e`vec4 overlayWaterMask = getOverlayColor(ovWaterTex, vtcOverlay);
                   float waterNormalLength = length(overlayWaterMask);
                   if (waterNormalLength > 0.95) {
                     mat3 tbnMatrix = mat3(tbnTangent, tbnBiTangent, vnormal);
                     vec4 waterOverlayColor = vec4(overlayColor.w > 0.0 ? overlayColorOpaque.xyz/overlayColor.w : vec3(1.0), overlayColor.w);
                     vec4 viewPosition = view*vec4(vpos, 1.0);
                     vec4 waterColorLinear = getOverlayWaterColor(overlayWaterMask, waterOverlayColor, -normalize(vpos - cameraPosition), shadow, vnormal, tbnMatrix, viewPosition.xyz,  vpos + localOrigin);
                     vec4 waterColorNonLinear = delinearizeGamma(vec4(waterColorLinear.xyz, 1.0));
                     float opacity = sliced ? ${e.float(M)} : 1.0;
                     // un-gamma the ground color to mix in linear space
                     fragColor = mix(groundColor, waterColorNonLinear, waterColorLinear.w) * opacity;
                   }`)}
          ${i(o.visualizeNormals,ce?e`
                  vec3 localUp = normalize(vpos + localOrigin);
                  vec3 right = normalize(cross(vec3(0.0, 0.0, 1.0), localUp));
                  vec3 forward = normalize(cross(localUp, right));
                  mat3 tbn = mat3(right, forward, localUp);
                  vec3 tNormal = normalize(normal * tbn);
                  fragColor = vec4(vec3(0.5) + 0.5 * tNormal, 0.0);`:e`
                  vec3 tNormal = normalize(normal);
                  fragColor = vec4(vec3(0.5) + 0.5 * tNormal, 0.0);`)}
          ${i(z,e`vec2 dVuv = fwidth(vuv0);
                 vec2 edgeFactors = smoothstep(vec2(0.0), 1.5 * dVuv, min(vuv0, 1.0 - vuv0));
                 float edgeFactor = 1.0 - min(edgeFactors.x, edgeFactors.y);
                 fragColor = mix(fragColor, vec4(1.0, 0.0, 0.0, 1.0), edgeFactor);`)}
          fragColor = applySlice(fragColor, vpos);`)}break;case 2:d&&a.include(v,o),r.main.add(e`
        ${i(d,"setOverlayVTC(uv0);")}
        gl_Position = transformPosition(proj, view, position);`),t.main.add(`${i(d,`if (getCombinedOverlayColor().a < ${e.float(x)}) discard;`)}`);break;case 4:case 5:case 6:case 7:case 8:a.include(G,o),V(a),j(a),r.main.add(e`gl_Position = transformPositionWithDepth(proj, view, position, nearFar, linearDepth);`),t.main.add(e`outputDepth(linearDepth);`);break;case 3:d&&a.include(v,o),n.add("vnormal","vec3"),E(r),c(),r.main.add(e`
        ${i(d,"setOverlayVTC(uv0);")}
        gl_Position = transformPosition(proj, view, position);
        vnormal = normalize((viewNormal * vec4(getNormal(), 1.0)).xyz);`),t.main.add(e`
        ${i(d,`if (getCombinedOverlayColor().a < ${e.float(x)}) discard;`)}
        vec3 normal = normalize(vnormal);
        if (gl_FrontFacing == false) {
          normal = -normal;
        }
        fragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);`);break;case 9:l&&(a.include(v,o),a.include(te,o)),r.main.add(e`
        ${i(l,"setOverlayVTC(uv0);")}
        gl_Position = transformPosition(proj, view, position);`),a.include(q,o),t.main.add(e`
        ${i(l,e`
           calculateOcclusionAndOutputHighlight(getAllOverlayHighlightValuesEncoded());`,"calculateOcclusionAndOutputHighlight();")}
      `)}if(f===10)if(l)o.pbrMode=0,a.include(v,o),o.pbrMode=p,r.main.add(e`gl_Position = transformPosition(proj, view, position);
setOverlayVTC(uv0);`),t.main.add(e`fragColor = getOverlayColorTexel();`);else{let m=h===0;r.main.add(e`${i(m,"gl_Position = transformPosition(proj, view, position);")}`),t.main.add(e`fragColor = vec4(0.0);`)}return a}var ve=N(),le=L(),Je=Object.freeze(Object.defineProperty({__proto__:null,TerrainPassParameters:P,build:me},Symbol.toStringTag,{value:"Module"}));export{P as a,me as b,Je as c};
