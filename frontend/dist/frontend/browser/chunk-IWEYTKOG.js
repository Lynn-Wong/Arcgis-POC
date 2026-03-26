import{a as h,b as M,c as O,d as N,e as $}from"./chunk-LGF6G4EW.js";import{d as I,f as K}from"./chunk-J75CXDVX.js";import{a as x}from"./chunk-N5UWJJ2M.js";import{f as G,g as Q}from"./chunk-UOR7KWCN.js";import{b as R,c as j,d as U,e as W}from"./chunk-J5QOJH4Q.js";import{a as z,d as H,e as q}from"./chunk-A3EE4NCD.js";import{a as T,b as B}from"./chunk-N4F7I4XE.js";import{f as g}from"./chunk-PGXMEFYQ.js";import{a as S}from"./chunk-Y3VXCMJP.js";import{a as b}from"./chunk-COHKIGGR.js";import{a as X}from"./chunk-Z5A2D2S2.js";import{a as L}from"./chunk-IBO6ILUH.js";import{f as u}from"./chunk-KFI4I766.js";import{b as A}from"./chunk-D66ZPD5O.js";import{a as w,d as y,e as E}from"./chunk-HNCVMFZH.js";import{a as J}from"./chunk-7GY7HBFV.js";import{a as F}from"./chunk-VGAXEXH3.js";import{c as C}from"./chunk-2EG4SLVE.js";import{a as m,b as P}from"./chunk-5VGDBOMN.js";import{a as D}from"./chunk-J6IEXWQ2.js";import{a as c}from"./chunk-2NXJIMQ2.js";import{a as k}from"./chunk-QF5M5KTV.js";import{a as p}from"./chunk-H2ASV3YO.js";import{a as V}from"./chunk-45K2AY22.js";import{a as e,b as l}from"./chunk-UUP4FBYC.js";function ro(o){let a=new k,{attributes:Y,vertex:t,fragment:r,varyings:n}=a,{output:Z,offsetBackfaces:f,pbrMode:v,snowCover:s,spherical:_}=o,oo=v===1||v===2;if(P(t,o),Y.add("position","vec3"),n.add("vpos","vec3",{invariant:!0}),a.include(E,o),a.include(O,o),a.include(A,o),a.include(J,o),!u(Z))return a.include($,o),a;m(a.vertex,o),a.include(x,o),a.include(b),f&&a.include(h),n.add("vNormalWorld","vec3"),n.add("localvpos","vec3",{invariant:!0}),a.include(L,o),a.include(N,o),a.include(M,o),a.include(S,o),t.include(w),t.include(y),t.uniforms.add(new D("externalColor",i=>i.externalColor,{supportsNaN:!0})),n.add("vcolorExt","vec4"),a.include(o.instancedDoublePrecision?H:q,o),t.main.add(e`
    forwardNormalizedVertexColor();

    MaskedColor maskedColorExt =
      applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

    vcolorExt = maskedColorExt.color;
    forwardColorMixMode(maskedColorExt.mask);

    bool alphaCut = opacityMixMode != ${e.int(g.ignore)} && vcolorExt.a < ${e.float(F)};
    vpos = getVertexInLocalOriginSpace();

    localvpos = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
    vpos = addVerticalOffset(vpos, localOrigin);
    vec4 basePosition = transformPosition(proj, view, vpos);

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardTextureCoordinates();
    forwardLinearDepthToReadShadowMap();
    gl_Position = alphaCut ? vec4(1e38, 1e38, 1e38, 1.0) :
    ${l(f,"offsetBackfacingClipPosition(basePosition, vpos, vNormalWorld, cameraPosition);","basePosition;")}
  `);let{hasColorTexture:d,hasColorTextureTransform:ao}=o;return a.include(W,o),r.include(R,o),a.include(I,o),r.include(C,o),a.include(X,o),m(r,o),T(r),j(r),U(r),r.uniforms.add(t.uniforms.get("localOrigin"),t.uniforms.get("view"),new c("ambient",i=>i.ambient),new c("diffuse",i=>i.diffuse),new p("opacity",i=>i.opacity),new p("layerOpacity",i=>i.layerOpacity)),d&&r.uniforms.add(new V("tex",i=>i.texture)),a.include(G,o),r.include(z,o),r.include(K),r.include(Q,o),B(r),r.main.add(e`
      discardBySlice(vpos);
      discardByTerrainDepth();
      vec4 texColor = ${d?`texture(tex, ${ao?"colorUV":"vuv0"})`:" vec4(1.0)"};
      ${l(d,`${l(o.textureAlphaPremultiplied,"texColor.rgb /= texColor.a;")}
        discardOrAdjustAlpha(texColor);`)}
      vec3 viewDirection = normalize(vpos - cameraPosition);
      applyPBRFactors();
      float ssao = evaluateAmbientOcclusionInverse();
      ssao *= getBakedOcclusion();

      float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
      vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
      float shadow = readShadow(additionalAmbientScale, vpos);
      vec3 matColor = max(ambient, diffuse);
      ${o.hasVertexColors?e`vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, opacityMixMode);`:e`vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, opacityMixMode);`}

      vec3 shadingNormal = normalize(vNormalWorld);
      vec3 groundNormal = ${_?"normalize(vpos + localOrigin)":"vec3(0.0, 0.0, 1.0)"};

      ${l(s,`vec3 faceNormal = screenDerivativeNormal(vpos);
         float snow = getRealisticTreeSnow(faceNormal, shadingNormal, groundNormal);
         albedo = mix(albedo, vec3(1), snow);`)}

      ${e`albedo *= 1.2;
             vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
             float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
             float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
             float treeRadialFalloff = vColor.r;
             float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
             additionalLight += backLightFactor * mainLightIntensity;`}

      ${oo?e`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            ${l(s,"mrr = applySnowToMRR(mrr, snow);")}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, groundNormal, mrr, additionalAmbientIrradiance);`:e`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
      vec4 finalColor = vec4(shadedColor, opacity_);
      outputColorHighlightOID(finalColor, vpos, albedo ${l(s,", 1.0")});`),a}var To=Object.freeze(Object.defineProperty({__proto__:null,build:ro},Symbol.toStringTag,{value:"Module"}));export{ro as a,To as b};
