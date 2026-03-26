import{g as x}from"./chunk-IV3CJS35.js";import{a as z,f as y}from"./chunk-PWAC5NTO.js";import{e as w}from"./chunk-HNCVMFZH.js";import{a as p}from"./chunk-GMXW7EMM.js";import{a as k,b}from"./chunk-XLAKJJ7A.js";import{a as O,d as h}from"./chunk-5VGDBOMN.js";import{a as P}from"./chunk-NTQXKDNS.js";import{a as c}from"./chunk-2NXJIMQ2.js";import{a as g}from"./chunk-A634OTHD.js";import{a as d}from"./chunk-H2ASV3YO.js";import{a as r,b as n}from"./chunk-UUP4FBYC.js";import{c as u,g as S}from"./chunk-67YVG46W.js";import{f as v,h as m}from"./chunk-WMGH7MKS.js";import{a as f}from"./chunk-JJQR3F6K.js";var F=8;function j(o,t){let{vertex:e,attributes:a}=o;e.uniforms.add(new d("intrinsicWidth",i=>i.width));let{hasScreenSizePerspective:s,spherical:T}=t;s?(o.include(k,t),b(e),O(e,t),e.uniforms.add(new P("inverseViewMatrix",(i,L)=>v(V,m(V,L.camera.viewMatrix,i.origin)))),e.code.add(r`
      float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
        vec3 worldPos = (inverseViewMatrix * vec4(pos, 1)).xyz;
        vec3 groundUp = ${T?r`normalize(worldPos + localOrigin)`:r`vec3(0.0, 0.0, 1.0)`};
        float absCosAngle = abs(dot(groundUp, normalize(worldPos - cameraPosition)));

        return screenSizePerspectiveScaleFloat(size, absCosAngle, length(pos), screenSizePerspective);
      }
    `)):e.code.add(r`float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
return size;
}`),t.hasVVSize?(a.add("sizeFeatureAttribute","float"),e.uniforms.add(new c("vvSizeMinSize",i=>i.vvSize.minSize),new c("vvSizeMaxSize",i=>i.vvSize.maxSize),new c("vvSizeOffset",i=>i.vvSize.offset),new c("vvSizeFactor",i=>i.vvSize.factor),new c("vvSizeFallback",i=>i.vvSize.fallback)),e.code.add(r`
    float getSize(${n(s,"vec3 pos")}) {
      float size = isnan(sizeFeatureAttribute)
        ? vvSizeFallback.x
        : intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;

      return ${n(s,"applyLineSizeScreenSizePerspective(size, pos)","size")};
    }
    `)):(a.add("size","float"),e.code.add(r`
    float getSize(${n(s,"vec3 pos")}) {
      float fullSize = intrinsicWidth * size;
      return ${n(s,"applyLineSizeScreenSizePerspective(fullSize, pos)","fullSize")};
    }
    `)),t.hasVVOpacity?(a.add("opacityFeatureAttribute","float"),e.constants.add("vvOpacityNumber","int",8),e.uniforms.add(new p("vvOpacityValues",i=>i.vvOpacity.values,F),new p("vvOpacityOpacities",i=>i.vvOpacity.opacityValues,F),new d("vvOpacityFallback",i=>i.vvOpacity.fallback,{supportsNaN:!0})),e.code.add(r`
    float interpolateOpacity(float value) {
      if (value <= vvOpacityValues[0]) {
        return vvOpacityOpacities[0];
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
        }
      }

      return vvOpacityOpacities[vvOpacityNumber - 1];
    }

    vec4 applyOpacity(vec4 color) {
      if (isnan(opacityFeatureAttribute)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${n(t.hasVVColor,"color","vec4(color.rgb, vvOpacityFallback)")};
      }

      return vec4(color.rgb, interpolateOpacity(opacityFeatureAttribute));
    }
    `)):e.code.add(r`vec4 applyOpacity(vec4 color) {
return color;
}`),t.hasVVColor?(o.include(w,t),a.add("colorFeatureAttribute","float"),e.code.add(r`vec4 getColor() {
vec4 color = interpolateVVColor(colorFeatureAttribute);
if (isnan(color.r)) {
return vec4(0);
}
return applyOpacity(color);
}`)):(a.add("color","vec4"),e.code.add(r`vec4 getColor() {
return applyOpacity(color);
}`))}var V=f();function E(o){o.vertex.code.add("#define noPerspectiveWrite(x, w) (x * w)")}function G(o){o.fragment.code.add("#define noPerspectiveRead(x) (x * gl_FragCoord.w)")}var l=64,W=l/2,M=W/5,R=l/M,Z=.25;function ee(o,t){let e=x(o,l,W,M),a=new z(l);return a.internalFormat=u.R16F,a.dataType=S.FLOAT,a.pixelFormat=6403,a.wrapMode=33071,new y(t,a,e)}function ne(o,t){let e=o.vertex,a=t.hasScreenSizePerspective;h(e),e.uniforms.get("markerScale")==null&&e.constants.add("markerScale","float",1),e.constants.add("markerSizePerLineWidth","float",R).code.add(r`
  float getLineWidth(${n(a,"vec3 pos")}) {
     return max(getSize(${n(a,"pos")}), 1.0) * pixelRatio;
  }

  float getScreenMarkerSize(float lineWidth) {
    return markerScale * markerSizePerLineWidth * lineWidth;
  }
  `),t.space===2&&(e.constants.add("maxSegmentLengthFraction","float",.45),e.uniforms.add(new g("perRenderPixelRatio",s=>s.camera.perRenderPixelRatio)),e.code.add(r`
  bool areWorldMarkersHidden(vec3 pos, vec3 other) {
    vec3 midPoint = mix(pos, other, 0.5);
    float distanceToCamera = length(midPoint);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    float worldMarkerSize = getScreenMarkerSize(getLineWidth(${n(a,"pos")})) * screenToWorldRatio;
    float segmentLen = length(pos - other);
    return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
  }

  float getWorldMarkerSize(vec3 pos) {
    float distanceToCamera = length(pos);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    return getScreenMarkerSize(getLineWidth(${n(a,"pos")})) * screenToWorldRatio;
  }
  `))}export{j as a,E as b,G as c,l as d,W as e,R as f,Z as g,ee as h,ne as i};
