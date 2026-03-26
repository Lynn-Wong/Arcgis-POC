import{a as ee}from"./chunk-ANHDRWYO.js";import{b as X,c as v,d as Y}from"./chunk-HXY3FPUM.js";import{a as L}from"./chunk-YQSUB555.js";import{e as J}from"./chunk-HNCVMFZH.js";import{a as Q}from"./chunk-7GY7HBFV.js";import{a as W}from"./chunk-3C5EAPCU.js";import{a as Z}from"./chunk-N3BZYENM.js";import{a as p}from"./chunk-VGAXEXH3.js";import{a as q,b as I,c as k}from"./chunk-XLAKJJ7A.js";import{d as E}from"./chunk-2EG4SLVE.js";import{d as M}from"./chunk-5VGDBOMN.js";import{a as m}from"./chunk-J6IEXWQ2.js";import{a as G}from"./chunk-R6IIY54E.js";import{a as w}from"./chunk-YZ4IDPMQ.js";import{a as N}from"./chunk-Q5RZKMWM.js";import{a as R}from"./chunk-A634OTHD.js";import{a as K}from"./chunk-QF5M5KTV.js";import{a as A}from"./chunk-H2ASV3YO.js";import{a as j}from"./chunk-45K2AY22.js";import{a as e,b as r}from"./chunk-UUP4FBYC.js";import{a as _}from"./chunk-6QJXCAOV.js";import{c as V,g as H}from"./chunk-YMQ4BGWF.js";import{a as U,b}from"./chunk-RL4CZUGQ.js";import{a as B}from"./chunk-ARRCN5K3.js";function oe(t,o){let{vertex:l,fragment:u}=t;t.include(Q,o),l.include(v),l.main.add(e`vec4 posProjCenter;
if (dot(position, position) > 0.0) {
ProjectHUDAux projectAux;
vec4 posProj = projectPositionHUD(projectAux);
posProjCenter = alignToPixelCenter(posProj, viewport.zw);
forwardViewPosDepth(projectAux.posView);
vec3 vpos = projectAux.posModel;
if (rejectBySlice(vpos)) {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
} else {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
gl_Position = posProjCenter;
gl_PointSize = 1.0;`),u.main.add(e`fragColor = vec4(1);
if(discardByTerrainDepth()) {
fragColor.g = 0.5;
}`)}function de(t){let o=new K,{signedDistanceFieldEnabled:l,occlusionTestEnabled:u,horizonCullingEnabled:y,pixelSnappingEnabled:D,hasScreenSizePerspective:O,debugDrawLabelBorder:c,hasVVSize:$,hasVVColor:F,hasRotation:ae,occludedFragmentFade:T,sampleSignedDistanceFieldTexelCenter:le}=t;o.include(X,t),o.vertex.include(E,t);let{occlusionPass:se,output:d,oitPass:g}=t;if(se)return o.include(oe,t),o;let{vertex:a,fragment:s}=o;o.include(q),o.include(J,t),o.include(L,t),u&&o.include(Y),s.include(W),o.varyings.add("vcolor","vec4"),o.varyings.add("vtc","vec2"),o.varyings.add("vsize","vec2");let n=d===9,P=n&&u;P&&o.varyings.add("voccluded","float"),a.uniforms.add(new N("viewport",i=>i.camera.fullViewport),new w("screenOffset",(i,f)=>b(x,2*i.screenOffset[0]*f.camera.pixelRatio,2*i.screenOffset[1]*f.camera.pixelRatio)),new w("anchorPosition",i=>te(i)),new m("materialColor",i=>i.color),new A("materialRotation",i=>i.rotation),new j("tex",i=>i.texture)),M(a),l&&(a.uniforms.add(new m("outlineColor",i=>i.outlineColor)),s.uniforms.add(new m("outlineColor",i=>ie(i)?i.outlineColor:H),new A("outlineSize",i=>ie(i)?i.outlineSize:0))),y&&a.uniforms.add(new ee("pointDistanceSphere",(i,f)=>{let z=f.camera.eye,S=i.origin;return V(S[0]-z[0],S[1]-z[1],S[2]-z[2],B.radius)})),D&&a.include(v),O&&(I(a),k(a)),c&&o.varyings.add("debugBorderCoords","vec4"),o.attributes.add("uv0","vec2"),o.attributes.add("uvi","vec4"),o.attributes.add("color","vec4"),o.attributes.add("size","vec2"),o.attributes.add("rotation","float"),($||F)&&o.attributes.add("featureAttribute","vec4"),a.code.add(y?e`bool behindHorizon(vec3 posModel) {
vec3 camToEarthCenter = pointDistanceSphere.xyz - localOrigin;
vec3 camToPos = pointDistanceSphere.xyz + posModel;
float earthRadius = pointDistanceSphere.w;
float a = dot(camToPos, camToPos);
float b = dot(camToPos, camToEarthCenter);
float c = dot(camToEarthCenter, camToEarthCenter) - earthRadius * earthRadius;
return b > 0.0 && b < a && b * b  > a * c;
}`:e`bool behindHorizon(vec3 posModel) { return false; }`),a.main.add(e`
    ProjectHUDAux projectAux;
    vec4 posProj = projectPositionHUD(projectAux);
    forwardObjectAndLayerIdColor();

    if (rejectBySlice(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    if (behindHorizon(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    vec2 inputSize;
    ${r(O,e`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,e`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${r($,e`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${r(u,e`
    bool visible = testHUDVisibility(posProj);
    if (!visible) {
      vtc = vec2(0.0);
      ${r(c,"debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);")}
      return;
    }`)}
    ${r(P,e`voccluded = visible ? 0.0 : 1.0;`)}
  `);let ne=e`
      vec2 uv = mix(uvi.xy, uvi.zw, bvec2(uv0));
      vec2 texSize = vec2(textureSize(tex, 0));
      uv = mix(vec2(1.0), uv / texSize, lessThan(uv, vec2(${ue})));
      quadOffset.xy = (uv0 - anchorPosition) * 2.0 * combinedSize;

      ${r(ae,e`
          float angle = radians(materialRotation + rotation);
          float cosAngle = cos(angle);
          float sinAngle = sin(angle);
          mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

          quadOffset.xy = rotate * quadOffset.xy;
        `)}

      quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,ce=D?l?e`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:e`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:e`posProj += quadOffset;`;a.main.add(e`
    ${ne}
    ${F?"vcolor = interpolateVVColor(featureAttribute.y) * materialColor;":"vcolor = color / 255.0 * materialColor;"}

    ${r(d===10,e`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${e.float(p)};
    ${r(l,`alphaDiscard = alphaDiscard && outlineColor.a < ${e.float(p)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${ce}
      gl_Position = posProj;
    }

    vtc = uv;

    ${r(c,e`debugBorderCoords = vec4(uv01, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),s.uniforms.add(new j("tex",i=>i.texture)),T&&!n&&s.uniforms.add(new G("depthMap",i=>i.mainDepth),new R("occludedOpacity",i=>i.hudOccludedFragmentOpacity));let C=c?e`(isBorder > 0.0 ? 0.0 : ${e.float(p)})`:e.float(p),h=e`
    ${r(c,e`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${r(le,e`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${l?e`
      vec4 fillPixelColor = vcolor;

      // Get distance in output units (i.e. pixels)

      float sdf = texture(tex, samplePos).r;
      float pixelDistance = sdf * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - pixelDistance, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(pixelDistance) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < ${C} ||
          fillPixelColor.a + outlinePixelColor.a < ${e.float(p)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
          vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${r(!n,e`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${C}) {
          discard;
        }

        ${r(!n,e`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-pixelDistance/vsize.x*2.0, 0.0, 1.0), clamp(pixelDistance/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:e`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${C}) {
            discard;
          }
          ${r(!n,e`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${r(T&&!n,e`
        float zSample = texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x;
        if (zSample < gl_FragCoord.z) {
          fragColor *= occludedOpacity;
        }
        `)}

    ${r(!n&&c,e`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}
  `;switch(d){case 0:case 1:o.outputs.add("fragColor","vec4",0),d===1&&o.outputs.add("fragEmission","vec4",1),g===1&&o.outputs.add("fragAlpha","float",d===1?2:1),s.main.add(e`
        ${h}
        ${r(g===2,e`fragColor.rgb /= fragColor.a;`)}
        ${r(d===1,e`fragEmission = vec4(0.0);`)}
        ${r(g===1,e`fragAlpha = fragColor.a;`)}`);break;case 10:s.main.add(e`
        ${h}
        outputObjectAndLayerIdColor();`);break;case 9:o.include(Z,t),s.main.add(e`
        ${h}
        outputHighlight(${r(P,e`voccluded == 1.0`,e`false`)});`)}return o}function ie(t){return t.outlineColor[3]>0&&t.outlineSize>0}function te(t){return t.textureIsSignedDistanceField?pe(t.anchorPosition,t.distanceFieldBoundingBox,x):U(x,t.anchorPosition),x}function pe(t,o,l){b(l,t[0]*(o[2]-o[0])+o[0],t[1]*(o[3]-o[1])+o[1])}var x=_(),re=32e3,ue=e.float(re),ke=Object.freeze(Object.defineProperty({__proto__:null,build:de,calculateAnchorPosition:te,fullUV:re},Symbol.toStringTag,{value:"Module"}));export{de as a,te as b,re as c,ke as d};
