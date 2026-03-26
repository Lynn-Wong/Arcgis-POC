import{a as w}from"./chunk-Y3VXCMJP.js";import{a as u}from"./chunk-COHKIGGR.js";import{a as R}from"./chunk-Z5A2D2S2.js";import{a as S}from"./chunk-YQSUB555.js";import{e as b}from"./chunk-HNCVMFZH.js";import{a as P}from"./chunk-7GY7HBFV.js";import{a as V}from"./chunk-3C5EAPCU.js";import{c as f}from"./chunk-2EG4SLVE.js";import{a as g,b as h}from"./chunk-5VGDBOMN.js";import{a as x}from"./chunk-J6IEXWQ2.js";import{a as c}from"./chunk-A634OTHD.js";import{a as C}from"./chunk-QF5M5KTV.js";import{a as o,b as n}from"./chunk-UUP4FBYC.js";var m=.70710678118,T=m,j=.08715574274,p=10,$=1;function y(e){let t=new C,{vertex:a,fragment:i,attributes:l,varyings:d}=t,v=e.output===9;h(a,e),t.include(u),t.include(w,e),t.include(b,e),t.include(S,e),t.fragment.include(f,e),t.include(R,e),t.include(P,e),e.draped?a.uniforms.add(new c("worldToScreenRatio",r=>1/r.screenToPCSRatio)):l.add("boundingRect","mat3"),l.add("position","vec3"),l.add("uvMapSpace","vec4"),e.hasVVColor&&l.add("colorFeatureAttribute","float"),e.hasVertexColors||d.add("vColor","vec4"),d.add("vpos","vec3",{invariant:!0}),d.add("vuv","vec2"),a.uniforms.add(new x("uColor",r=>r.color));let s=e.style===3||e.style===4||e.style===5;return s&&a.code.add(o`
      const mat2 rotate45 = mat2(${o.float(m)}, ${o.float(-T)},
                                 ${o.float(T)}, ${o.float(m)});
    `),e.draped||(g(a,e),a.uniforms.add(new c("worldToScreenPerDistanceRatio",r=>1/r.camera.perScreenPixelRatio)),a.code.add(o`vec3 projectPointToLineSegment(vec3 center, vec3 halfVector, vec3 point) {
float projectedLength = dot(halfVector, point - center) / dot(halfVector, halfVector);
return center + halfVector * clamp(projectedLength, -1.0, 1.0);
}`),a.code.add(o`vec3 intersectRayPlane(vec3 rayDir, vec3 rayOrigin, vec3 planeNormal, vec3 planePoint) {
float d = dot(planeNormal, planePoint);
float t = (d - dot(planeNormal, rayOrigin)) / dot(planeNormal, rayDir);
return rayOrigin + t * rayDir;
}`),a.code.add(o`
      float boundingRectDistanceToCamera() {
        vec3 center = vec3(boundingRect[0][0], boundingRect[0][1], boundingRect[0][2]);
        vec3 halfU = vec3(boundingRect[1][0], boundingRect[1][1], boundingRect[1][2]);
        vec3 halfV = vec3(boundingRect[2][0], boundingRect[2][1], boundingRect[2][2]);
        vec3 n = normalize(cross(halfU, halfV));

        vec3 viewDir = - vec3(view[0][2], view[1][2], view[2][2]);

        float viewAngle = dot(viewDir, n);
        float minViewAngle = ${o.float(j)};

        if (abs(viewAngle) < minViewAngle) {
          // view direction is (almost) parallel to plane -> clamp it to min angle
          float normalComponent = sign(viewAngle) * minViewAngle - viewAngle;
          viewDir = normalize(viewDir + normalComponent * n);
        }

        // intersect view direction with infinite plane that contains bounding rect
        vec3 planeProjected = intersectRayPlane(viewDir, cameraPosition, n, center);

        // clip to bounds by projecting to u and v line segments individually
        vec3 uProjected = projectPointToLineSegment(center, halfU, planeProjected);
        vec3 vProjected = projectPointToLineSegment(center, halfV, planeProjected);

        // use to calculate the closest point to camera on bounding rect
        vec3 closestPoint = uProjected + vProjected - center;

        return length(closestPoint - cameraPosition);
      }
    `)),a.code.add(o`
    vec2 scaledUV() {
      vec2 uv = uvMapSpace.xy ${n(s," * rotate45")};
      vec2 uvCellOrigin = uvMapSpace.zw ${n(s," * rotate45")};

      ${n(!e.draped,o`float distanceToCamera = boundingRectDistanceToCamera();
               float worldToScreenRatio = worldToScreenPerDistanceRatio / distanceToCamera;`)}

      // Logarithmically discretize ratio to avoid jittering
      float step = 0.1;
      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);

      vec2 uvOffset = mod(uvCellOrigin * discreteWorldToScreenRatio, ${o.float(p)});
      return uvOffset + (uv * discreteWorldToScreenRatio);
    }
  `),a.main.add(o`
    vuv = scaledUV();
    vpos = position;
    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardNormalizedVertexColor();
    forwardObjectAndLayerIdColor();
    ${e.hasVertexColors?"vColor *= uColor;":e.hasVVColor?"vColor = uColor * interpolateVVColor(colorFeatureAttribute);":"vColor = uColor;"}
    gl_Position = transformPosition(proj, view, vpos);
  `),i.include(V),e.draped&&i.uniforms.add(new c("texelSize",r=>1/r.camera.pixelRatio)),v||(i.code.add(o`
      const float lineWidth = ${o.float($)};
      const float spacing = ${o.float(p)};
      const float spacingINV = ${o.float(1/p)};

      float coverage(float p, float txlSize) {
        p = mod(p, spacing);

        float halfTxlSize = txlSize / 2.0;

        float start = p - halfTxlSize;
        float end = p + halfTxlSize;

        float coverage = (ceil(end * spacingINV) - floor(start * spacingINV)) * lineWidth;
        coverage -= min(lineWidth, mod(start, spacing));
        coverage -= max(lineWidth - mod(end, spacing), 0.0);

        return coverage / txlSize;
      }
    `),e.draped||i.code.add(o`const int maxSamples = 5;
float sampleAA(float p) {
vec2 dxdy = abs(vec2(dFdx(p), dFdy(p)));
float fwidth = dxdy.x + dxdy.y;
ivec2 samples = 1 + ivec2(clamp(dxdy, 0.0, float(maxSamples - 1)));
vec2 invSamples = 1.0 / vec2(samples);
float accumulator = 0.0;
for (int j = 0; j < maxSamples; j++) {
if(j >= samples.y) {
break;
}
for (int i = 0; i < maxSamples; i++) {
if(i >= samples.x) {
break;
}
vec2 step = vec2(i,j) * invSamples - 0.5;
accumulator += coverage(p + step.x * dxdy.x + step.y * dxdy.y, fwidth);
}
}
accumulator /= float(samples.x * samples.y);
return accumulator;
}`)),i.main.add(o`
    discardBySlice(vpos);
    discardByTerrainDepth();
    vec4 color = vColor;
    ${n(!v,o`color.a *= ${D(e)};`)}
    outputColorHighlightOID(color, vpos, color.rgb);
  `),t}function D(e){function t(a){return e.draped?o`coverage(vuv.${a}, texelSize)`:o`sampleAA(vuv.${a})`}switch(e.style){case 3:case 0:return t("y");case 4:case 1:return t("x");case 5:case 2:return o`1.0 - (1.0 - ${t("x")}) * (1.0 - ${t("y")})`;default:return"0.0"}}var H=Object.freeze(Object.defineProperty({__proto__:null,build:y},Symbol.toStringTag,{value:"Module"}));export{y as a,H as b};
