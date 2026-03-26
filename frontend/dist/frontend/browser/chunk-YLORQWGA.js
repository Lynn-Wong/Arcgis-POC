import{a as W}from"./chunk-JMPOEAF6.js";import{a as Z}from"./chunk-MO6GOC56.js";import{a as b,b as D,c as $,d as A,e as z}from"./chunk-LGF6G4EW.js";import{a as U,d as _,f as ao}from"./chunk-J75CXDVX.js";import{a as M}from"./chunk-N5UWJJ2M.js";import{f as J,g as io}from"./chunk-UOR7KWCN.js";import{b as H,c as q,d as Q,e as X}from"./chunk-J5QOJH4Q.js";import{a as Y,d as oo,e as ro}from"./chunk-A3EE4NCD.js";import{b as K}from"./chunk-N4F7I4XE.js";import{f as y}from"./chunk-PGXMEFYQ.js";import{a as E}from"./chunk-Y3VXCMJP.js";import{a as N}from"./chunk-COHKIGGR.js";import{a as to}from"./chunk-Z5A2D2S2.js";import{a as L}from"./chunk-IBO6ILUH.js";import{f as V}from"./chunk-KFI4I766.js";import{b as B}from"./chunk-D66ZPD5O.js";import{a as O,d as S,e as k}from"./chunk-HNCVMFZH.js";import{a as eo}from"./chunk-7GY7HBFV.js";import{a as d}from"./chunk-FAYM6DKX.js";import{a as F}from"./chunk-VGAXEXH3.js";import{c as P}from"./chunk-2EG4SLVE.js";import{a as x,b as R}from"./chunk-5VGDBOMN.js";import{a as I}from"./chunk-J6IEXWQ2.js";import{a as v}from"./chunk-2NXJIMQ2.js";import{a as G}from"./chunk-QF5M5KTV.js";import{a as p}from"./chunk-H2ASV3YO.js";import{a as j}from"./chunk-45K2AY22.js";import{a as e,b as s}from"./chunk-UUP4FBYC.js";import{d as l}from"./chunk-VEYWSQAY.js";function so(o,r){r.hasColorTextureTransform?(o.varyings.add("colorUV","vec2"),o.vertex.uniforms.add(new d("colorTextureTransformMatrix",i=>i.colorTextureTransformMatrix??l)).code.add(e`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(e`void forwardColorUV(){}`)}function no(o,r){r.hasNormalTextureTransform&&r.textureCoordinateType!==0?(o.varyings.add("normalUV","vec2"),o.vertex.uniforms.add(new d("normalTextureTransformMatrix",i=>i.normalTextureTransformMatrix??l)).code.add(e`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(e`void forwardNormalUV(){}`)}function lo(o,r){r.hasEmissionTextureTransform&&r.textureCoordinateType!==0?(o.varyings.add("emissiveUV","vec2"),o.vertex.uniforms.add(new d("emissiveTextureTransformMatrix",i=>i.emissiveTextureTransformMatrix??l)).code.add(e`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(e`void forwardEmissiveUV(){}`)}function mo(o,r){r.hasOcclusionTextureTransform&&r.textureCoordinateType!==0?(o.varyings.add("occlusionUV","vec2"),o.vertex.uniforms.add(new d("occlusionTextureTransformMatrix",i=>i.occlusionTextureTransformMatrix??l)).code.add(e`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(e`void forwardOcclusionUV(){}`)}function co(o,r){r.hasMetallicRoughnessTextureTransform&&r.textureCoordinateType!==0?(o.varyings.add("metallicRoughnessUV","vec2"),o.vertex.uniforms.add(new d("metallicRoughnessTextureTransformMatrix",i=>i.metallicRoughnessTextureTransformMatrix??l)).code.add(e`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(e`void forwardMetallicRoughnessUV(){}`)}function ho(o){let r=new G,{attributes:i,vertex:n,fragment:a,varyings:m}=r,{output:uo,normalType:c,offsetBackfaces:g,spherical:fo,snowCover:u,pbrMode:T,textureAlphaPremultiplied:vo,instancedDoublePrecision:xo,hasVertexColors:h,hasVertexTangents:C,hasColorTexture:w,hasNormalTexture:po,hasNormalTextureTransform:go,hasColorTextureTransform:To}=o;if(R(n,o),i.add("position","vec3"),m.add("vpos","vec3",{invariant:!0}),r.include(k,o),r.include($,o),r.include(B,o),r.include(so,o),!V(uo))return r.include(z,o),r;r.include(no,o),r.include(lo,o),r.include(mo,o),r.include(co,o),x(n,o),r.include(M,o),r.include(N);let f=c===0||c===1;return f&&g&&r.include(b),r.include(W,o),r.include(U,o),r.include(D,o),m.add("vPositionLocal","vec3"),r.include(L,o),r.include(A,o),r.include(E,o),n.uniforms.add(new I("externalColor",t=>t.externalColor,{supportsNaN:!0})),m.add("vcolorExt","vec4"),r.include(eo,o),n.include(O),n.include(S),r.include(xo?oo:ro,o),n.main.add(e`
    forwardNormalizedVertexColor();

    MaskedColor maskedColor =
      applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

    vcolorExt = maskedColor.color;
    forwardColorMixMode(maskedColor.mask);

    vpos = getVertexInLocalOriginSpace();
    vPositionLocal = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    ${s(f,"vNormalWorld = dpNormal(vvLocalNormal(normalModel()));")}
    vpos = addVerticalOffset(vpos, localOrigin);
    ${s(C,"vTangent = dpTransformVertexTangent(tangent);")}
    gl_Position = transformPosition(proj, view, vpos);
    ${s(f&&g,"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);")}

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardTextureCoordinates();
    forwardColorUV();
    forwardNormalUV();
    forwardEmissiveUV();
    forwardOcclusionUV();
    forwardMetallicRoughnessUV();

    if (opacityMixMode != ${e.int(y.ignore)} && vcolorExt.a < ${e.float(F)}) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
    }
    forwardLinearDepthToReadShadowMap();
  `),r.include(X,o),a.include(H,o),r.include(_,o),a.include(P,o),r.include(to,o),x(a,o),a.uniforms.add(n.uniforms.get("localOrigin"),new v("ambient",t=>t.ambient),new v("diffuse",t=>t.diffuse),new p("opacity",t=>t.opacity),new p("layerOpacity",t=>t.layerOpacity)),w&&a.uniforms.add(new j("tex",t=>t.texture)),r.include(J,o),a.include(Y,o),a.include(ao),r.include(Z,o),a.include(io,o),q(a),Q(a),K(a),a.main.add(e`
    discardBySlice(vpos);
    discardByTerrainDepth();
    ${w?e`
            vec4 texColor = texture(tex, ${To?"colorUV":"vuv0"});
            ${s(vo,"texColor.rgb /= texColor.a;")}
            discardOrAdjustAlpha(texColor);`:e`vec4 texColor = vec4(1.0);`}
    shadingParams.viewDirection = normalize(vpos - cameraPosition);
    ${c===2?e`vec3 normal = screenDerivativeNormal(vPositionLocal);`:e`shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
    applyPBRFactors();
    float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

    vec3 posWorld = vpos + localOrigin;

    float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
    float shadow = readShadow(additionalAmbientScale, vpos);

    vec3 matColor = max(ambient, diffuse);
    vec3 albedo = mixExternalColor(${s(h,"vColor.rgb *")} matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
    float opacity_ = layerOpacity * mixExternalOpacity(${s(h,"vColor.a * ")} opacity, texColor.a, vcolorExt.a, opacityMixMode);

    ${po?`mat3 tangentSpace = computeTangentSpace(${C?"normal":"normal, vpos, vuv0"});
            vec3 shadingNormal = computeTextureNormal(tangentSpace, ${go?"normalUV":"vuv0"});`:"vec3 shadingNormal = normal;"}
    vec3 normalGround = ${fo?"normalize(posWorld);":"vec3(0.0, 0.0, 1.0);"}

    ${s(u,e`
          float snow = getSnow(normal, normalGround);
          albedo = mix(albedo, vec3(1), snow);
          shadingNormal = mix(shadingNormal, normal, snow);
          ssao = mix(ssao, 1.0, snow);`)}

    vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

    ${T===1||T===2?e`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            ${s(u,"mrr = applySnowToMRR(mrr, snow);")}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, additionalAmbientIrradiance);`:e`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
    vec4 finalColor = vec4(shadedColor, opacity_);
    outputColorHighlightOID(finalColor, vpos, albedo ${s(u,", snow")});
  `),r}var lr=Object.freeze(Object.defineProperty({__proto__:null,build:ho},Symbol.toStringTag,{value:"Module"}));export{ho as a,lr as b};
