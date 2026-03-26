import{b as A,c as y,d as P}from"./chunk-HXY3FPUM.js";import{c as v}from"./chunk-XLAKJJ7A.js";import{d as S}from"./chunk-2EG4SLVE.js";import{a as f}from"./chunk-J6IEXWQ2.js";import{a as h}from"./chunk-R6IIY54E.js";import{a as u}from"./chunk-YZ4IDPMQ.js";import{a as w}from"./chunk-Q5RZKMWM.js";import{a as z}from"./chunk-JMYO2YOI.js";import{a as p}from"./chunk-24Z55BQA.js";import{a as x}from"./chunk-QF5M5KTV.js";import{a as m}from"./chunk-H2ASV3YO.js";import{a as i,b as t}from"./chunk-UUP4FBYC.js";import{a as g}from"./chunk-6QJXCAOV.js";import{g as s}from"./chunk-YMQ4BGWF.js";import{b as c}from"./chunk-RL4CZUGQ.js";function b(r){r.include(z),r.uniforms.add(new h("geometryDepthTexture",o=>o.geometryDepth?.attachment)),r.code.add(i`bool geometryDepthTest(vec2 pos, float elementDepth) {
float geometryDepth = linearDepthFromTexture(geometryDepthTexture, pos);
return (elementDepth < (geometryDepth - 1.0));
}`)}function O(r){let o=new x,{vertex:n,fragment:l}=o,{terrainDepthTest:d}=r;return n.include(y),o.include(A,r),o.vertex.include(S,r),o.attributes.add("uv0","vec2"),n.uniforms.add(new w("viewport",e=>e.camera.fullViewport),new m("lineSize",(e,a)=>e.size>0?Math.max(1,e.size)*a.camera.pixelRatio:0),new p("pixelToNDC",e=>c(D,2/e.camera.fullViewport[2],2/e.camera.fullViewport[3])),new m("borderSize",(e,a)=>e.borderColor?a.camera.pixelRatio:0),new u("screenOffset",(e,a)=>c(D,e.horizontalScreenOffset*a.camera.pixelRatio,0))),o.varyings.add("coverageSampling","vec4"),o.varyings.add("lineSizes","vec2"),d&&o.varyings.add("depth","float"),r.occlusionTestEnabled&&o.include(P),r.hasScreenSizePerspective&&v(n),n.main.add(i`
    ProjectHUDAux projectAux;
    vec4 endPoint = projectPositionHUD(projectAux);

    vec3 vpos = projectAux.posModel;
    if (rejectBySlice(vpos)) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    }
    ${t(r.occlusionTestEnabled,i`if (!testHUDVisibility(endPoint)) {
             gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
             return;
           }`)}

    ${r.hasScreenSizePerspective?i`vec3 perspectiveFactor = screenSizePerspectiveScaleFactor(projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);
               vec2 screenOffsetScaled = applyScreenSizePerspectiveScaleFactorVec2(screenOffset, perspectiveFactor);`:"vec2 screenOffsetScaled = screenOffset;"}
    // Add view dependent polygon offset to get exact same original starting point. This is mostly used to get the
    // correct depth value
    vec3 posView = (view * vec4(position, 1.0)).xyz;
    ${t(d,"depth = posView.z;")}

    applyHUDViewDependentPolygonOffset(centerOffsetAndDistance.w, projectAux.absCosAngle, posView);
    vec4 startPoint = proj * vec4(posView, 1.0);

    // Apply screen offset to both start and end point
    vec2 screenOffsetNorm = screenOffsetScaled * 2.0 / viewport.zw;
    startPoint.xy += screenOffsetNorm * startPoint.w;
    endPoint.xy += screenOffsetNorm * endPoint.w;

    // Align start and end to pixel origin
    vec4 startAligned = alignToPixelOrigin(startPoint, viewport.zw);
    vec4 endAligned = alignToPixelOrigin(endPoint, viewport.zw);
    ${t(r.hudDepth,r.hudDepthAlignStart?"endAligned = vec4(endAligned.xy / endAligned.w * startAligned.w, startAligned.zw);":"startAligned = vec4(startAligned.xy / startAligned.w * endAligned.w, endAligned.zw);")}
    vec4 projectedPosition = mix(startAligned, endAligned, uv0.y);

    // The direction of the line in screen space
    vec2 screenSpaceDirection = normalize(endAligned.xy / endAligned.w - startAligned.xy / startAligned.w);
    vec2 perpendicularScreenSpaceDirection = vec2(screenSpaceDirection.y, -screenSpaceDirection.x);
    ${r.hasScreenSizePerspective?i`float lineSizeScaled = applyScreenSizePerspectiveScaleFactorFloat(lineSize, perspectiveFactor);
               float borderSizeScaled = applyScreenSizePerspectiveScaleFactorFloat(borderSize, perspectiveFactor);`:i`float lineSizeScaled = lineSize;
               float borderSizeScaled = borderSize;`}
    float halfPixelSize = lineSizeScaled * 0.5;

    // Compute full ndc offset, adding 1px padding for doing anti-aliasing and the border size
    float padding = 1.0 + borderSizeScaled;
    vec2 ndcOffset = (-halfPixelSize - padding + uv0.x * (lineSizeScaled + padding + padding)) * pixelToNDC;

    // Offset x/y from the center of the line in screen space
    projectedPosition.xy += perpendicularScreenSpaceDirection * ndcOffset * projectedPosition.w;

    // Compute a coverage varying which we can use in the fragment shader to determine
    // how much a pixel is actually covered by the line (i.e. to anti alias the line).
    // This works by computing two coordinates that can be linearly interpolated and then
    // subtracted to find out how far away from the line edge we are.
    float edgeDirection = (uv0.x * 2.0 - 1.0);

    float halfBorderSize = 0.5 * borderSizeScaled;
    float halfPixelSizeAndBorder = halfPixelSize + halfBorderSize;
    float outerEdgeCoverageSampler = edgeDirection * (halfPixelSizeAndBorder + halfBorderSize + 1.0);

    float isOneSided = float(lineSizeScaled < 2.0 && borderSize < 2.0);

    coverageSampling = vec4(
      // Edge coordinate
      outerEdgeCoverageSampler,

      // Border edge coordinate
      outerEdgeCoverageSampler - halfPixelSizeAndBorder * isOneSided,

      // Line offset
      halfPixelSize - 0.5,

      // Border offset
      halfBorderSize - 0.5 + halfPixelSizeAndBorder * (1.0 - isOneSided)
    );

    lineSizes = vec2(lineSizeScaled, borderSizeScaled);
    gl_Position = projectedPosition;`),l.uniforms.add(new f("uColor",e=>e.color??s),new f("borderColor",e=>e.borderColor??s)),d&&(l.include(b,r),l.uniforms.add(new p("inverseViewport",e=>e.inverseViewport))),l.main.add(i`
    ${t(d,"if( geometryDepthTest(gl_FragCoord.xy * inverseViewport, depth) ){ discard; }")}

    vec2 coverage = min(1.0 - clamp(abs(coverageSampling.xy) - coverageSampling.zw, 0.0, 1.0), lineSizes);

    float borderAlpha = uColor.a * borderColor.a * coverage.y;
    float colorAlpha = uColor.a * coverage.x;

    float finalAlpha = mix(borderAlpha, 1.0, colorAlpha);
    ${t(!r.hudDepth,i`vec3 finalRgb = mix(borderColor.rgb * borderAlpha, uColor.rgb, colorAlpha);
           fragColor = vec4(finalRgb, finalAlpha);`)}`),o}var D=g(),J=Object.freeze(Object.defineProperty({__proto__:null,build:O},Symbol.toStringTag,{value:"Module"}));export{O as a,J as b};
