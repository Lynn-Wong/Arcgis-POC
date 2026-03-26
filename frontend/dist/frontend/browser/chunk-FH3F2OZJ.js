import{e as me}from"./chunk-2VKKL6YM.js";import{a as de,d as se}from"./chunk-K7A43HPD.js";import{a as ne}from"./chunk-33JKRO2R.js";import{a as J}from"./chunk-JMPOEAF6.js";import{a as h,e as U,f as re}from"./chunk-J75CXDVX.js";import{f as ee,g as te}from"./chunk-UOR7KWCN.js";import{d as x,e as w}from"./chunk-J5QOJH4Q.js";import{a as j}from"./chunk-OVPKAFQB.js";import{d as oe}from"./chunk-A3EE4NCD.js";import{a as Y,b as Z}from"./chunk-N4F7I4XE.js";import{a as f}from"./chunk-Y3VXCMJP.js";import{e as B}from"./chunk-HZ4CWPH3.js";import{a as u}from"./chunk-SX7H3Q3A.js";import{a as ie}from"./chunk-Z5A2D2S2.js";import{d as G}from"./chunk-TEPTMKVE.js";import{a as H}from"./chunk-YEMBISS4.js";import{a as F}from"./chunk-IBO6ILUH.js";import{f as p}from"./chunk-KFI4I766.js";import{a as q}from"./chunk-O5NYEJB2.js";import{a as le}from"./chunk-ANHDRWYO.js";import{a as ae}from"./chunk-7GY7HBFV.js";import{a as k}from"./chunk-N3BZYENM.js";import{a as C}from"./chunk-VGAXEXH3.js";import{b as I}from"./chunk-2EG4SLVE.js";import{a as V}from"./chunk-YQXWXQD3.js";import{a as E}from"./chunk-R6IIY54E.js";import{a as X}from"./chunk-Q5RZKMWM.js";import{a as K}from"./chunk-JMYO2YOI.js";import{a as Q}from"./chunk-QF5M5KTV.js";import{a as o,b as r}from"./chunk-UUP4FBYC.js";import{q as A}from"./chunk-WENEM4NK.js";import{c as z}from"./chunk-YMQ4BGWF.js";import{u as _}from"./chunk-R7CRKYC2.js";import{A as W}from"./chunk-A3Z3ZARC.js";import{a as $,b as L,c as R}from"./chunk-ARRCN5K3.js";function b(a,e){let t=a.fragment;switch(e.doubleSidedMode){case 0:t.code.add(o`vec3 _adjustDoublesided(vec3 normal) {
return normal;
}`);break;case 1:a.include(u,e),t.code.add(o`vec3 _adjustDoublesided(vec3 normal) {
return dot(normal, vPositionWorldCameraRelative) > 0.0 ? -normal : normal;
}`);break;case 2:t.code.add(o`vec3 _adjustDoublesided(vec3 normal) {
return gl_FrontFacing ? normal : -normal;
}`);break;default:e.doubleSidedMode;case 3:}switch(e.normalType){case 0:case 1:a.include(h,e),t.main.add(o`vec3 fragmentFaceNormal = _adjustDoublesided(normalize(vNormalWorld));
vec3 fragmentFaceNormalView = gl_FrontFacing ? normalize(vNormalView) : -normalize(vNormalView);`);break;case 2:a.include(u,e),t.main.add(o`vec3 fragmentFaceNormal = normalize(cross(dFdx(vPositionWorldCameraRelative), dFdy(vPositionWorldCameraRelative)));
vec3 fragmentFaceNormalView = normalize(cross(dFdx(vPosition_view), dFdy(vPosition_view)));`)}e.shadeNormals?t.main.add(o`vec3 fragmentShadingNormal = fragmentFaceNormal;`):e.spherical?(a.include(u,e),t.main.add(o`vec3 fragmentShadingNormal = normalize(positionWorld());`)):t.main.add(o`vec3 fragmentShadingNormal = vec3(0.0, 0.0, 1.0);`)}function ce(a,e){a.include(f,e),a.fragment.include(re);let t=a.fragment;t.uniforms.add(new le("baseColor",i=>i.baseColor)),t.uniforms.add(new H("objectOpacity",i=>i.objectOpacity)),e.hasVertexColors?t.code.add(o`vec3 _baseColor() {
return baseColor.rgb * vColor.rgb;
}
float _baseOpacity() {
return baseColor.a * vColor.a;
}`):t.code.add(o`vec3 _baseColor() {
return baseColor.rgb;
}
float _baseOpacity() {
return baseColor.a;
}`),t.code.add(o`vec4 computeMaterialColor(vec4 textureColor, vec4 externalColor, int externalColorMixMode) {
vec3 baseColor = _baseColor();
float baseOpacity = _baseOpacity();
vec3 color = mixExternalColor(
baseColor,
textureColor.rgb,
externalColor.rgb,
externalColorMixMode
);
float opacity = objectOpacity * mixExternalOpacity(
baseOpacity,
textureColor.a,
externalColor.a,
externalColorMixMode
);
return vec4(color, opacity);
}`)}function ue(a,e){let t=e.hasColorTexture&&(p(e.output)||e.alphaDiscardMode!==1);t&&(a.include(G,e),a.fragment.uniforms.add(new q("baseColorTexture",i=>i.texture))),a.fragment.code.add(o`
    vec4 readBaseColorTexture() {
      return ${t?"textureLookup(baseColorTexture, vuv0)":"vec4(1.0)"};
    }
  `)}function ve(a,e){a.fragment.uniforms.add(new X("heightParameters",t=>{let i=t.camera,l=A(i.eye),c=Math.sqrt(l),s=e.radius,v=l-s*s,m=_(4e6,5e6,c-s);return m=Math.min(m,.98),z(m,v,0,0)}),new V("cameraPosition",t=>t.camera.eye)),a.fragment.include(ne),a.fragment.code.add(o`float sphereFade() {return heightParameters[0];}
float sphereDepthInterpolate(vec3 worldRay, vec3 viewRay, float currentLinearDepth) {
vec2 rayPlanetIntersect = sphereIntersect(cameraPosition, worldRay, heightParameters[1]);
bool hitsPlanet = (rayPlanetIntersect.x <= rayPlanetIntersect.y) && rayPlanetIntersect.x > 0.0;
if (hitsPlanet) {
float sphereDepth = rayPlanetIntersect.x;
viewRay *= viewRay.z*sphereDepth;
float linearDepth = length(viewRay);
float sphereFade = heightParameters[0];
return (-linearDepth)*sphereFade + currentLinearDepth*(1.0-sphereFade);
}
return currentLinearDepth;
}`)}function Ne(a){let e=new Q,{vertex:t,fragment:i}=e;e.include(u,a),e.include(h,a),e.include(f,a),e.include(F,a),e.include(me,a),e.include(U,a),i.include(I,a),e.include(ue,a),e.include(ae,a);let{output:l,pbrMode:c,hasNormalTexture:s,snowCover:v,receiveShadows:m,shadeNormals:pe,spherical:n,ellipsoidMode:y,overlayEnabled:d,componentData:ge,vertexDiscardMode:D,renderOccluded:N}=a,O=c===1||c===2;O&&(e.include(ee,a),s&&e.include(J,a));let P=l===4||l===5||l===6,he=P&&ge===1,fe=y===1,S=y===1?$.radius:fe?L.radius:R.radius;d&&(e.include(w,a),e.include(de,a),t.code.add(`
      ${r(n,`const float invRadius = ${o.float(1/S)};`)}
      vec2 projectOverlay(vec3 pos) { return pos.xy ${r(n,"/ (1.0 + invRadius * pos.z);")}; }`));let g=d&&p(l)&&c===4;g&&(e.varyings.add("tbnTangent","vec3"),e.varyings.add("tbnBiTangent","vec3"),e.varyings.add("groundNormal","vec3"));let Ce=D===0,xe=D===2,we=1-1/255;if(e.include(oe,a),e.include(B,a),t.main.add(o`
    bool castShadows;
    vec4 externalColor = forwardExternalColor(castShadows);
    ${r(he,"if(!castShadows) { gl_Position = vec4(vec3(1e38), 1.0); return; }")}

    ${r(!Ce,`{ if (externalColor.a ${xe?">":"<="} ${o.float(we)}) { gl_Position = vec4(vec3(1e38), 1.0); return; } }`)}

    ${r(l===10,"externalColor.a = 1.0;")}

    forwardPosition(readElevationOffset());
    forwardViewPosDepth(vPosition_view);
    forwardNormal();
    forwardTextureCoordinates();
    forwardVertexColor();
    forwardLinearDepthToReadShadowMap();
    forwardLinearDepthToWriteShadowMap();
    forwardEmissiveStrength();
    forwardObjectAndLayerIdColor();
    ${r(g,n?o`
            groundNormal = normalize(positionWorld());
            tbnTangent = normalize(cross(vec3(0.0, 0.0, 1.0), groundNormal));
            tbnBiTangent = normalize(cross(groundNormal, tbnTangent));`:o`
            groundNormal = vec3(0.0, 0.0, 1.0);
            tbnTangent = vec3(1.0, 0.0, 0.0);
            tbnBiTangent = vec3(0.0, 1.0, 0.0);`)}
    ${r(d,"setOverlayVTC(projectOverlay(position));")}

    if (externalColor.a < ${o.float(C)}) {
      // Discard this vertex
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    }
  `),p(l))return e.include(ce,a),e.include(b,a),e.include(w,a),e.include(ie,a),i.include(te,a),i.code.add(o`
      float evaluateShadow() {
        return ${m?"readShadowMap(vPositionWorldCameraRelative, linearDepth)":"0.0"};
      }`),i.main.add(o`
      discardBySlice(vPositionWorldCameraRelative);
      discardByTerrainDepth();

      vec4 textureColor = readBaseColorTexture();
      discardOrAdjustAlpha(textureColor);

      /* When rendering the occluded overlay, we still need to read the base color texture
       * because we need to use the same discard logic. However after that to render only the
       * draped overlay, we simply set the base texture color to zero. */
      ${r(N,o`textureColor = vec4(0);`)}

      ${r(d,o`vec4 overlayColor = getOverlayColor(ovColorTex, vtcOverlay);`)}

      /* Early discard to only emit when we have overlay */
      ${r(d&&N,o`if (overlayColor.a < ${o.float(C)}) { discard; }`)}

      vec4 externalColor;
      int externalColorMixMode;
      readExternalColor(externalColor, externalColorMixMode);

      vec4 materialColor = computeMaterialColor(textureColor, externalColor, externalColorMixMode);
    `),O?(Z(i),n&&x(i),i.main.add(o`
        applyPBRFactors();
        ${r(c===1,o`if (externalColorMixMode == 3) {
              mrr = vec3(0.0, 0.6, 0.2);
            }`)}
        float additionalIrradiance = 0.02 * mainLightIntensity[2];
        ${r(s,"mat3 tangentSpace = computeTangentSpace(fragmentFaceNormal, vPositionWorldCameraRelative, vuv0);")}
        vec3 shadingNormal = ${s?"computeTextureNormal(tangentSpace, vuv0)":"fragmentShadingNormal"};
        vec3 groundNormal = ${n?o`normalize(positionWorld())`:o`vec3(0.0, 0.0, 1.0)`};

        vec3 viewDir = normalize(vPositionWorldCameraRelative);
        float ssao = 1.0 - occlusion * evaluateAmbientOcclusionInverse();
        ${r(v,o`float snow = getSnow(fragmentFaceNormal, normalize(positionWorld()));
                 materialColor.rgb = mix(materialColor.rgb, vec3(1.1), snow);
                 ssao = mix(ssao, 0.5 * ssao, snow);
                 shadingNormal = mix(shadingNormal, fragmentFaceNormal, snow);`)}
        ${r(d,"materialColor = materialColor * (1.0 - overlayColor.a) + overlayColor;")}

        vec3 additionalLight = evaluateAdditionalLighting(ssao, positionWorld());
        ${r(n,"float additionalAmbientScale = additionalDirectedAmbientLight(positionWorld());")}
        ${n?o`float shadow = max(lightingGlobalFactor * (1.0 - additionalAmbientScale), evaluateShadow());`:"float shadow = evaluateShadow();"}
        vec4 shadedColor = vec4(evaluateSceneLightingPBR(shadingNormal, materialColor.rgb, shadow, ssao, additionalLight, viewDir, groundNormal, mrr, additionalIrradiance), materialColor.a);
        `)):(Y(i),n&&x(i),g&&i.uniforms.add(new E("ovNormalTex",De=>De.overlay?.getTexture(3))),i.main.add(o`
        ${r(n,"float additionalAmbientScale = additionalDirectedAmbientLight(positionWorld());")}
        float shadow = ${m?n?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), evaluateShadow())":"evaluateShadow()":n?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};

        ${r(m&&!pe,o`
            float dotFL = dot(fragmentFaceNormal, mainLightDirection);
            if( dotFL <= 0.0) shadow = 1.0;
        `)}
        ${r(v,o`float snow = getSnow(fragmentFaceNormal, normalize(positionWorld()));
               materialColor.rgb = mix(materialColor.rgb, vec3(1), snow);`)}

        // At global scale we create some additional ambient light based on the main light to simulate global illumination
        float ssao = evaluateAmbientOcclusion();
        vec3 additionalLight = evaluateAdditionalLighting(ssao, positionWorld());

        ${r(d,"materialColor = materialColor * (1.0 - overlayColor.a) + overlayColor;")}

        vec4 shadedColor = vec4(evaluateSceneLighting(fragmentShadingNormal, materialColor.rgb, shadow, ssao, additionalLight), materialColor.a);
        ${r(g,o`vec4 overlayWaterMask = getOverlayColor(ovNormalTex, vtcOverlay);
                 float waterNormalLength = length(overlayWaterMask);
                 if (waterNormalLength > 0.95) {
                   mat3 tbnMatrix = mat3(tbnTangent, tbnBiTangent, groundNormal);
                   vec4 waterColorLinear = getOverlayWaterColor(overlayWaterMask, overlayColor, -normalize(vPositionWorldCameraRelative), shadow, groundNormal, tbnMatrix, vPosition_view, positionWorld());
                   vec4 waterColorNonLinear = delinearizeGamma(vec4(waterColorLinear.xyz, 1.0));
                   // un-gamma the ground color to mix in linear space
                   shadedColor = mix(shadedColor, waterColorNonLinear, waterColorLinear.w);
                 }`)}
      `)),i.main.add(`outputColorHighlightOID(shadedColor, vPositionWorldCameraRelative, materialColor.rgb ${r(v,", snow")});`),a.sphereDepthInterpolate&&(e.include(ve,{radius:S*W}),e.fragment.include(K),i.main.add(o`if (sphereFade()>0.0) {
vec3 worldRay = normalize(vPositionWorldCameraRelative);
vec3 viewRay = normalize(vPosition_view);
gl_FragDepth = delinearizeDepth(sphereDepthInterpolate(worldRay, viewRay, linearizeDepth(gl_FragCoord.z)));
} else {
gl_FragDepth = gl_FragCoord.z;
}`)),e;let M=l===3,be=l===10,ye=l===9,T=P||l===7||l===8;return T&&e.include(j,a),M&&e.include(b,a),d&&e.include(se,a),e.include(k,a),i.main.add(o`
    discardBySlice(vPositionWorldCameraRelative);

    vec4 textureColor = readBaseColorTexture();
    discardOrAdjustAlpha(textureColor);

    ${r(T,"outputDepth(linearDepth);")}
    ${r(M,o`fragColor = vec4(vec3(0.5) + 0.5 * fragmentFaceNormalView, 1.0);`)}
    ${r(be,d?"fragColor = getOverlayColorTexel();":"outputObjectAndLayerIdColor();")}
    ${r(ye,r(d,o`calculateOcclusionAndOutputHighlight(getAllOverlayHighlightValuesEncoded());`,o`calculateOcclusionAndOutputHighlight();`))}`),e}var To=Object.freeze(Object.defineProperty({__proto__:null,build:Ne},Symbol.toStringTag,{value:"Module"}));export{Ne as a,To as b};
