import{a as h}from"./chunk-UERS2P6L.js";import{a as w}from"./chunk-XSD5BTYG.js";import{a as g}from"./chunk-B7VK56II.js";import{a as v}from"./chunk-A634OTHD.js";import{a as f}from"./chunk-24Z55BQA.js";import{a as x}from"./chunk-QF5M5KTV.js";import{a as u}from"./chunk-H2ASV3YO.js";import{a,b as n}from"./chunk-UUP4FBYC.js";import{a as m}from"./chunk-6QJXCAOV.js";import{h as l}from"./chunk-WMGH7MKS.js";import{a as p}from"./chunk-JJQR3F6K.js";import{b as c}from"./chunk-RL4CZUGQ.js";function P(o){let e=new x;e.include(h,o);let{vertex:s,fragment:r}=e;s.uniforms.add(new w("modelView",(t,{camera:i})=>l(V,i.viewMatrix,t.origin)),new g("proj",({camera:t})=>t.projectionMatrix),new u("glowWidth",(t,{camera:i})=>t.glowWidth*i.pixelRatio),new f("pixelToNDC",({camera:t})=>c(S,2/t.fullViewport[2],2/t.fullViewport[3]))),e.attributes.add("start","vec3"),e.attributes.add("end","vec3"),o.spherical&&(e.attributes.add("startUp","vec3"),e.attributes.add("endUp","vec3")),e.attributes.add("extrude","vec2"),e.varyings.add("uv","vec2"),e.varyings.add("vViewStart","vec3"),e.varyings.add("vViewEnd","vec3"),e.varyings.add("vViewSegmentNormal","vec3"),e.varyings.add("vViewStartNormal","vec3"),e.varyings.add("vViewEndNormal","vec3");let d=!o.spherical;return s.main.add(a`
    vec3 pos = mix(start, end, extrude.x);

    vec4 viewPos = modelView * vec4(pos, 1);
    vec4 projPos = proj * viewPos;
    vec2 ndcPos = projPos.xy / projPos.w;

    // in planar we hardcode the up vectors to be Z-up */
    ${n(d,a`vec3 startUp = vec3(0, 0, 1);`)}
    ${n(d,a`vec3 endUp = vec3(0, 0, 1);`)}

    // up vector corresponding to the location of the vertex, selecting either startUp or endUp */
    vec3 up = extrude.y * mix(startUp, endUp, extrude.x);
    vec3 viewUp = (modelView * vec4(up, 0)).xyz;

    vec4 projPosUp = proj * vec4(viewPos.xyz + viewUp, 1);
    vec2 projUp = normalize(projPosUp.xy / projPosUp.w - ndcPos);

    // extrude ndcPos along projUp to the edge of the screen
    vec2 lxy = abs(sign(projUp) - ndcPos);
    ndcPos += length(lxy) * projUp;

    vViewStart = (modelView * vec4(start, 1)).xyz;
    vViewEnd = (modelView * vec4(end, 1)).xyz;

    vec3 viewStartEndDir = vViewEnd - vViewStart;

    vec3 viewStartUp = (modelView * vec4(startUp, 0)).xyz;

    // the normal of the plane that aligns with the segment and the up vector
    vViewSegmentNormal = normalize(cross(viewStartUp, viewStartEndDir));

    // the normal orthogonal to the segment normal and the start up vector
    vViewStartNormal = -normalize(cross(vViewSegmentNormal, viewStartUp));

    // the normal orthogonal to the segment normal and the end up vector
    vec3 viewEndUp = (modelView * vec4(endUp, 0)).xyz;
    vViewEndNormal = normalize(cross(vViewSegmentNormal, viewEndUp));

    // Add enough padding in the X screen space direction for "glow"
    float xPaddingPixels = sign(dot(vViewSegmentNormal, viewPos.xyz)) * (extrude.x * 2.0 - 1.0) * glowWidth;
    ndcPos.x += xPaddingPixels * pixelToNDC.x;

    // uv is used to read back depth to reconstruct the position at the fragment
    uv = ndcPos * 0.5 + 0.5;

    gl_Position = vec4(ndcPos, 0, 1);
  `),r.uniforms.add(new v("perScreenPixelRatio",t=>t.camera.perScreenPixelRatio)),r.code.add(a`float planeDistance(vec3 planeNormal, vec3 planeOrigin, vec3 pos) {
return dot(planeNormal, pos - planeOrigin);
}
float segmentDistancePixels(vec3 segmentNormal, vec3 startNormal, vec3 endNormal, vec3 pos, vec3 start, vec3 end) {
float distSegmentPlane = planeDistance(segmentNormal, start, pos);
float distStartPlane = planeDistance(startNormal, start, pos);
float distEndPlane = planeDistance(endNormal, end, pos);
float dist = max(max(distStartPlane, distEndPlane), abs(distSegmentPlane));
float width = fwidth(distSegmentPlane);
float maxPixelDistance = length(pos) * perScreenPixelRatio * 2.0;
float pixelDist = dist / min(width, maxPixelDistance);
return abs(pixelDist);
}`),r.main.add(a`fragColor = vec4(0.0);
vec3 dEndStart = vViewEnd - vViewStart;
if (dot(dEndStart, dEndStart) < 1e-5) {
return;
}
vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
return;
}
float distance = segmentDistancePixels(
vViewSegmentNormal,
vViewStartNormal,
vViewEndNormal,
pos,
vViewStart,
vViewEnd
);
vec4 color = laserlineProfile(distance);
float alpha = (1.0 - smoothstep(0.995 - angleCutoffAdjust, 0.999 - angleCutoffAdjust, abs(dot(normal, vViewSegmentNormal))));
fragColor = laserlineOutput(color * alpha * depthDiscontinuityAlpha);`),e}var S=m(),V=p(),R=Object.freeze(Object.defineProperty({__proto__:null,build:P},Symbol.toStringTag,{value:"Module"}));export{P as a,R as b};
