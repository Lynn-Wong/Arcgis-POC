import{a as W}from"./chunk-UERS2P6L.js";import{a as G}from"./chunk-2YSWRJRO.js";import{a as g}from"./chunk-J6IEXWQ2.js";import{a as F}from"./chunk-YQXWXQD3.js";import{a as p}from"./chunk-2NXJIMQ2.js";import{a as P}from"./chunk-YZ4IDPMQ.js";import{a as j}from"./chunk-A634OTHD.js";import{a as U}from"./chunk-QF5M5KTV.js";import{a as u}from"./chunk-H2ASV3YO.js";import{a as o}from"./chunk-UUP4FBYC.js";import{h as z}from"./chunk-E2O7CVUY.js";import{c as I,f as T,r as R}from"./chunk-NJDPRLWX.js";import{l as y,q as E}from"./chunk-SDS2MKPQ.js";import{a as O}from"./chunk-6QJXCAOV.js";import{a as v,b as x,d as A,e as L,o as S,t as h,v as V,x as d}from"./chunk-WENEM4NK.js";import{a as M}from"./chunk-YMQ4BGWF.js";import{k as b}from"./chunk-OFZRIX6T.js";import{a as f}from"./chunk-JARU7KSM.js";import{b as C}from"./chunk-RL4CZUGQ.js";import{i as w}from"./chunk-R7CRKYC2.js";var N=w(6);function k(i){let r=new U;r.include(G),r.include(W,i);let t=r.fragment;if(i.lineVerticalPlaneEnabled||i.heightManifoldEnabled)if(t.uniforms.add(new u("maxPixelDistance",(e,n)=>i.heightManifoldEnabled?2*n.camera.computeScreenPixelSizeAt(e.heightManifoldTarget):2*n.camera.computeScreenPixelSizeAt(e.lineVerticalPlaneSegment.origin))),t.code.add(o`float planeDistancePixels(vec4 plane, vec3 pos) {
float dist = dot(plane.xyz, pos) + plane.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`),i.spherical){let e=(a,c,B)=>d(a,c.heightManifoldTarget,B.camera.viewMatrix),n=(a,c)=>d(a,[0,0,0],c.camera.viewMatrix);t.uniforms.add(new g("heightManifoldOrigin",(a,c)=>(e(s,a,c),n(m,c),L(m,m,s),h(l,m),l[3]=v(m),l)),new F("globalOrigin",a=>n(s,a)),new u("cosSphericalAngleThreshold",(a,c)=>1-Math.max(2,S(c.camera.eye,a.heightManifoldTarget)*c.camera.perRenderPixelRatio)/v(a.heightManifoldTarget))),t.code.add(o`float globeDistancePixels(float posInGlobalOriginLength) {
float dist = abs(posInGlobalOriginLength - heightManifoldOrigin.w);
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}
float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
vec3 posInGlobalOriginNorm = normalize(globalOrigin - pos);
float cosAngle = dot(posInGlobalOriginNorm, heightManifoldOrigin.xyz);
vec3 posInGlobalOrigin = globalOrigin - pos;
float posInGlobalOriginLength = length(posInGlobalOrigin);
float sphericalDistance = globeDistancePixels(posInGlobalOriginLength);
float planarDistance = planeDistancePixels(heightPlane, pos);
return cosAngle < cosSphericalAngleThreshold ? sphericalDistance : planarDistance;
}`)}else t.code.add(o`float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
return planeDistancePixels(heightPlane, pos);
}`);if(i.pointDistanceEnabled&&(t.uniforms.add(new u("maxPixelDistance",(e,n)=>2*n.camera.computeScreenPixelSizeAt(e.pointDistanceTarget))),t.code.add(o`float sphereDistancePixels(vec4 sphere, vec3 pos) {
float dist = distance(sphere.xyz, pos) - sphere.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`)),i.intersectsLineEnabled&&t.uniforms.add(new j("perScreenPixelRatio",e=>e.camera.perScreenPixelRatio)).code.add(o`float lineDistancePixels(vec3 start, vec3 dir, float radius, vec3 pos) {
float dist = length(cross(dir, pos - start)) / (length(pos) * perScreenPixelRatio);
return abs(dist) - radius;
}`),(i.lineVerticalPlaneEnabled||i.intersectsLineEnabled)&&t.code.add(o`bool pointIsWithinLine(vec3 pos, vec3 start, vec3 end) {
vec3 dir = end - start;
float t2 = dot(dir, pos - start);
float l2 = dot(dir, dir);
return t2 >= 0.0 && t2 <= l2;
}`),t.main.add(o`vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
fragColor = vec4(0.0);
return;
}
vec4 color = vec4(0.0);`),i.heightManifoldEnabled){t.uniforms.add(new P("angleCutoff",n=>D(n)),new g("heightPlane",(n,a)=>_(n.heightManifoldTarget,n.renderCoordsHelper.worldUpAtPosition(n.heightManifoldTarget,s),a.camera.viewMatrix)));let e=i.spherical?o`normalize(globalOrigin - pos)`:o`heightPlane.xyz`;t.main.add(o`
      vec2 angleCutoffAdjusted = angleCutoff - angleCutoffAdjust;
      // Fade out laserlines on flat surfaces
      float heightManifoldAlpha = 1.0 - smoothstep(angleCutoffAdjusted.x, angleCutoffAdjusted.y, abs(dot(normal, ${e})));
      vec4 heightManifoldColor = laserlineProfile(heightManifoldDistancePixels(heightPlane, pos));
      color = max(color, heightManifoldColor * heightManifoldAlpha);`)}return i.pointDistanceEnabled&&(t.uniforms.add(new P("angleCutoff",e=>D(e)),new g("pointDistanceSphere",(e,n)=>R($(e,n)))),t.main.add(o`float pointDistanceSphereDistance = sphereDistancePixels(pointDistanceSphere, pos);
vec4 pointDistanceSphereColor = laserlineProfile(pointDistanceSphereDistance);
float pointDistanceSphereAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, normalize(pos - pointDistanceSphere.xyz))));
color = max(color, pointDistanceSphereColor * pointDistanceSphereAlpha);`)),i.lineVerticalPlaneEnabled&&(t.uniforms.add(new P("angleCutoff",e=>D(e)),new g("lineVerticalPlane",(e,n)=>q(e,n)),new p("lineVerticalStart",(e,n)=>J(e,n)),new p("lineVerticalEnd",(e,n)=>K(e,n))),t.main.add(o`if (pointIsWithinLine(pos, lineVerticalStart, lineVerticalEnd)) {
float lineVerticalDistance = planeDistancePixels(lineVerticalPlane, pos);
vec4 lineVerticalColor = laserlineProfile(lineVerticalDistance);
float lineVerticalAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, lineVerticalPlane.xyz)));
color = max(color, lineVerticalColor * lineVerticalAlpha);
}`)),i.intersectsLineEnabled&&(t.uniforms.add(new P("angleCutoff",e=>D(e)),new p("intersectsLineStart",(e,n)=>d(s,e.lineStartWorld,n.camera.viewMatrix)),new p("intersectsLineEnd",(e,n)=>d(s,e.lineEndWorld,n.camera.viewMatrix)),new p("intersectsLineDirection",(e,n)=>(x(l,e.intersectsLineSegment.vector),l[3]=0,h(s,b(l,l,n.camera.viewMatrix)))),new u("intersectsLineRadius",e=>e.intersectsLineRadius)),t.main.add(o`if (pointIsWithinLine(pos, intersectsLineStart, intersectsLineEnd)) {
float intersectsLineDistance = lineDistancePixels(intersectsLineStart, intersectsLineDirection, intersectsLineRadius, pos);
vec4 intersectsLineColor = laserlineProfile(intersectsLineDistance);
float intersectsLineAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, 1.0 - abs(dot(normal, intersectsLineDirection)));
color = max(color, intersectsLineColor * intersectsLineAlpha);
}`)),t.main.add(o`fragColor = laserlineOutput(color * depthDiscontinuityAlpha);`),r}function D(i){return C(Q,Math.cos(i.angleCutoff),Math.cos(Math.max(0,i.angleCutoff-w(2))))}function $(i,r){let t=d(Z,i.pointDistanceOrigin,r.camera.viewMatrix),e=S(i.pointDistanceOrigin,i.pointDistanceTarget);return T(ee,t,e)}function q(i,r){let t=z(i.lineVerticalPlaneSegment,.5,s),e=i.renderCoordsHelper.worldUpAtPosition(t,X),n=h(m,i.lineVerticalPlaneSegment.vector),a=V(s,e,n);return h(a,a),_(i.lineVerticalPlaneSegment.origin,a,r.camera.viewMatrix)}function J(i,r){let t=x(s,i.lineVerticalPlaneSegment.origin);return i.renderCoordsHelper.setAltitude(t,0),d(t,t,r.camera.viewMatrix)}function K(i,r){let t=A(s,i.lineVerticalPlaneSegment.origin,i.lineVerticalPlaneSegment.vector);return i.renderCoordsHelper.setAltitude(t,0),d(t,t,r.camera.viewMatrix)}function _(i,r,t){return d(H,i,t),x(l,r),l[3]=0,b(l,l,t),E(H,l,Y)}var Q=O(),s=f(),l=M(),X=f(),m=f(),H=f(),Y=y(),Z=f(),ee=I(),be=Object.freeze(Object.defineProperty({__proto__:null,build:k,defaultAngleCutoff:N},Symbol.toStringTag,{value:"Module"}));export{N as a,k as b,be as c};
