import{a as W,b as $,c as d,d as v,e as M,g as T,i as U}from"./chunk-HGXRADAJ.js";import{a as C}from"./chunk-Z5A2D2S2.js";import{a as j}from"./chunk-7GY7HBFV.js";import{a as b}from"./chunk-3C5EAPCU.js";import{a as w}from"./chunk-N3BZYENM.js";import{c as u}from"./chunk-2EG4SLVE.js";import{b as P,c as y,d as z}from"./chunk-5VGDBOMN.js";import{a as g}from"./chunk-J6IEXWQ2.js";import{a as x}from"./chunk-B7VK56II.js";import{a as L}from"./chunk-Q5RZKMWM.js";import{a as h}from"./chunk-A634OTHD.js";import{a as S}from"./chunk-24Z55BQA.js";import{a as k}from"./chunk-QF5M5KTV.js";import{a as D}from"./chunk-45K2AY22.js";import{a as e,b as n}from"./chunk-UUP4FBYC.js";function R(a){let i=new k,{space:m,anchor:O,hasTip:l,hasScreenSizePerspective:N}=a,s=m===2,f=m===1;i.include(W,a),i.include(U,a),i.include(j,a);let{vertex:r,fragment:c,varyings:p}=i;P(r,a),i.attributes.add("position","vec3"),i.attributes.add("previousDelta","vec4"),i.attributes.add("uv0","vec2"),p.add("vColor","vec4"),p.add("vpos","vec3",{invariant:!0}),p.add("vUV","vec2"),p.add("vSize","float"),l&&p.add("vLineWidth","float"),r.uniforms.add(new S("nearFar",({camera:o})=>o.nearFar),new L("viewport",({camera:o})=>o.fullViewport)).code.add(e`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),r.code.add(e`void clip(vec4 pos, inout vec4 prev) {
float vnp = nearFar[0] * 0.99;
if (prev.z > -nearFar[0]) {
float interpolation = (-vnp - pos.z) / (prev.z - pos.z);
prev = mix(pos, prev, interpolation);
}
}`),s?(i.attributes.add("normal","vec3"),y(r),r.constants.add("tiltThreshold","float",.7),r.code.add(e`vec3 perpendicular(vec3 v) {
vec3 n = (viewNormal * vec4(normal.xyz, 1.0)).xyz;
vec3 n2 = cross(v, n);
vec3 forward = vec3(0.0, 0.0, 1.0);
float tiltDot = dot(forward, n);
return abs(tiltDot) < tiltThreshold ? n : n2;
}`)):r.code.add(e`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}`);let t=s?"vec3":"vec2";return r.code.add(e`
      ${t} normalizedSegment(${t} pos, ${t} prev) {
        ${t} segment = pos - prev;
        float segmentLen = length(segment);

        // normalize or zero if too short
        return (segmentLen > 0.001) ? segment / segmentLen : ${s?"vec3(0.0, 0.0, 0.0)":"vec2(0.0, 0.0)"};
      }

      ${t} displace(${t} pos, ${t} prev, float displacementLen) {
        ${t} segment = normalizedSegment(pos, prev);

        ${t} displacementDirU = perpendicular(segment);
        ${t} displacementDirV = segment;

        ${O===1?"pos -= 0.5 * displacementLen * displacementDirV;":""}

        return pos + displacementLen * (uv0.x * displacementDirU + uv0.y * displacementDirV);
      }
    `),f&&(r.uniforms.add(new x("inverseProjectionMatrix",({camera:o})=>o.inverseProjectionMatrix)),r.code.add(e`vec3 inverseProject(vec4 posScreen) {
posScreen.xy = (posScreen.xy / viewport.zw) * posScreen.w;
return (inverseProjectionMatrix * posScreen).xyz;
}`),r.code.add(e`bool rayIntersectPlane(vec3 rayDir, vec3 planeOrigin, vec3 planeNormal, out vec3 intersection) {
float cos = dot(rayDir, planeNormal);
float t = dot(planeOrigin, planeNormal) / cos;
intersection = t * rayDir;
return abs(cos) > 0.001 && t > 0.0;
}`),r.uniforms.add(new h("perScreenPixelRatio",({camera:o})=>o.perScreenPixelRatio)),r.code.add(e`
      vec4 toFront(vec4 displacedPosScreen, vec3 posLeft, vec3 posRight, vec3 prev, float lineWidth) {
        // Project displaced position back to camera space
        vec3 displacedPos = inverseProject(displacedPosScreen);

        // Calculate the plane that we want the marker to lie in. Note that this will always be an approximation since ribbon lines are generally
        // not planar and we do not know the actual position of the displaced prev vertices (they are offset in screen space, too).
        vec3 planeNormal = normalize(cross(posLeft - posRight, posLeft - prev));
        vec3 planeOrigin = posLeft;

        ${n(a.hasCap,`if(prev.z > posLeft.z) {
                vec2 diff = posLeft.xy - posRight.xy;
                planeOrigin.xy += perpendicular(diff) / 2.0;
             }`)};

        // Move the plane towards the camera by a margin dependent on the line width (approximated in world space). This tolerance corrects for the
        // non-planarity in most cases, but sharp joins can place the prev vertices at arbitrary positions so markers can still clip.
        float offset = lineWidth * perScreenPixelRatio;
        planeOrigin *= (1.0 - offset);

        // Intersect camera ray with the plane and make sure it is within clip space
        vec3 rayDir = normalize(displacedPos);
        vec3 intersection;
        if (rayIntersectPlane(rayDir, planeOrigin, planeNormal, intersection) && intersection.z < -nearFar[0] && intersection.z > -nearFar[1]) {
          return vec4(intersection.xyz, 1.0);
        }

        // Fallback: use depth of pos or prev, whichever is closer to the camera
        float minDepth = planeOrigin.z > prev.z ? length(planeOrigin) : length(prev);
        displacedPos *= minDepth / length(displacedPos);
        return vec4(displacedPos.xyz, 1.0);
      }
  `)),z(r),i.include($),r.main.add(e`
    // Check for special value of uv0.y which is used by the Renderer when graphics
    // are removed before the VBO is recompacted. If this is the case, then we just
    // project outside of clip space.
    if (uv0.y == 0.0) {
      // Project out of clip space
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
    }
    else {
      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(position + previousDelta.xyz * previousDelta.w, 1.0);

      float lineWidth = getLineWidth(${n(N,"pos.xyz")});
      float screenMarkerSize = getScreenMarkerSize(lineWidth);

      clip(pos, prev);

      ${s?e`${n(a.hideOnShortSegments,e`
                if (areWorldMarkersHidden(pos.xyz, prev.xyz)) {
                  // Project out of clip space
                  gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
                  return;
                }`)}
            pos.xyz = displace(pos.xyz, prev.xyz, getWorldMarkerSize(pos.xyz));
            vec4 displacedPosScreen = projectAndScale(pos);`:e`
            vec4 posScreen = projectAndScale(pos);
            vec4 prevScreen = projectAndScale(prev);
            vec4 displacedPosScreen = posScreen;

            displacedPosScreen.xy = displace(posScreen.xy, prevScreen.xy, screenMarkerSize);
            ${n(f,e`
                vec2 displacementDirU = perpendicular(normalizedSegment(posScreen.xy, prevScreen.xy));

                // We need three points of the ribbon line in camera space to calculate the plane it lies in
                // Note that we approximate the third point, since we have no information about the join around prev
                vec3 lineRight = inverseProject(posScreen + lineWidth * vec4(displacementDirU.xy, 0.0, 0.0));
                vec3 lineLeft = pos.xyz + (pos.xyz - lineRight);

                pos = toFront(displacedPosScreen, lineLeft, lineRight, prev.xyz, lineWidth);
                displacedPosScreen = projectAndScale(pos);`)}`}
      forwardViewPosDepth(pos.xyz);
      // Convert back into NDC
      displacedPosScreen.xy = (displacedPosScreen.xy / viewport.zw) * displacedPosScreen.w;

      // Convert texture coordinate into [0,1]
      vUV = (uv0 + 1.0) / 2.0;
      ${n(!s,"vUV = noPerspectiveWrite(vUV, displacedPosScreen.w);")}
      ${n(l,"vLineWidth = noPerspectiveWrite(lineWidth, displacedPosScreen.w);")}

      vSize = screenMarkerSize;
      vColor = getColor();

      // Use camera space for slicing
      vpos = pos.xyz;

      gl_Position = displacedPosScreen;
    }`),c.include(u,a),i.include(C,a),c.include(b),c.uniforms.add(new g("intrinsicColor",({color:o})=>o),new D("tex",({markerTexture:o})=>o)).constants.add("texelSize","float",1/v).code.add(e`float markerAlpha(vec2 samplePos) {
samplePos += vec2(0.5, -0.5) * texelSize;
float sdf = texture(tex, samplePos).r;
float pixelDistance = sdf * vSize;
pixelDistance -= 0.5;
return clamp(0.5 - pixelDistance, 0.0, 1.0);
}`),l&&(i.include(d),c.constants.add("relativeMarkerSize","float",M/v).constants.add("relativeTipLineWidth","float",T).code.add(e`
    float tipAlpha(vec2 samplePos) {
      // Convert coordinates s.t. they are in pixels and relative to the tip of an arrow marker
      samplePos -= vec2(0.5, 0.5 + 0.5 * relativeMarkerSize);
      samplePos *= vSize;

      float halfMarkerSize = 0.5 * relativeMarkerSize * vSize;
      float halfTipLineWidth = 0.5 * max(1.0, relativeTipLineWidth * noPerspectiveRead(vLineWidth));

      ${n(s,"halfTipLineWidth *= fwidth(samplePos.y);")}

      float distance = max(abs(samplePos.x) - halfMarkerSize, abs(samplePos.y) - halfTipLineWidth);
      return clamp(0.5 - distance, 0.0, 1.0);
    }
  `)),i.include(w,a),i.include(d),c.main.add(e`
    discardBySlice(vpos);
    discardByTerrainDepth();

    vec4 finalColor = intrinsicColor * vColor;

    // Cancel out perspective correct interpolation if in screen space or draped
    vec2 samplePos = ${n(!s,"noPerspectiveRead(vUV)","vUV")};
    finalColor.a *= ${l?"max(markerAlpha(samplePos), tipAlpha(samplePos))":"markerAlpha(samplePos)"};
    outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),i}var ie=Object.freeze(Object.defineProperty({__proto__:null,build:R},Symbol.toStringTag,{value:"Module"}));export{R as a,ie as b};
