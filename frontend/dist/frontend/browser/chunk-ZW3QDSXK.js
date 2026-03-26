import{a as v}from"./chunk-7XAUYG5R.js";import{a as g}from"./chunk-XSD5BTYG.js";import{a as x}from"./chunk-JIVOQNH4.js";import{a as U}from"./chunk-XPAMXA62.js";import{a as T}from"./chunk-YWNUAOKV.js";import{a as M}from"./chunk-2YSWRJRO.js";import{a as P}from"./chunk-GMXW7EMM.js";import{a as l}from"./chunk-B7VK56II.js";import{a as V}from"./chunk-R6IIY54E.js";import{a as r}from"./chunk-2NXJIMQ2.js";import{a as u}from"./chunk-L7NOU4T2.js";import{a as n}from"./chunk-YZ4IDPMQ.js";import{a as F}from"./chunk-JMYO2YOI.js";import{a as D}from"./chunk-QF5M5KTV.js";import{a as S}from"./chunk-H2ASV3YO.js";import{a as h}from"./chunk-45K2AY22.js";import{a as o}from"./chunk-UUP4FBYC.js";import{e as a,h as m}from"./chunk-WMGH7MKS.js";import{f}from"./chunk-JARU7KSM.js";import{a as s,d as c}from"./chunk-JJQR3F6K.js";var d=class extends u{constructor(){super(...arguments),this.localOrigin=f()}};function b(i){i.include(T),i.fragment.uniforms.add(new g("inverseViewMatrix",(t,e)=>{let p=m(s(),e.camera.viewMatrix,t.localOrigin);return a(p,p)})).code.add(o`vec4 reconstructLocalPosition(vec2 coord, float linearDepth) {
vec4 cameraSpace = vec4(reconstructPosition(coord, linearDepth), 1.0);
return inverseViewMatrix * cameraSpace;
}`)}var w=class extends d{constructor(){super(...arguments),this.shadowMap={depthTexture:null,nearFar:[1,100],numActiveFaces:1,atlasRegions:[[0,0,1,1]]},this.targetVector=[1,0,0],this.upVector=[0,0,1],this.fovs=[45,45],this.headingAndTilt=[0,0],this.observerOffset=[0,0,0],this.projectionMatrices=c.flat(),this.viewMatrices=c.flat(),this.volumeOffset=0}};function O(){let i=new D,t=i.fragment;return i.include(M),i.include(b),t.include(F),t.include(U),t.uniforms.add(new V("depthTexture",e=>e.depth?.attachment),new l("inverseProjectionMatrix",e=>e.camera.inverseProjectionMatrix),new l("inverseViewNormalMatrix",({camera:e})=>a(y,e.viewInverseTransposeMatrix)),new r("viewshedObserverOffset",e=>e.observerOffset),new r("viewshedTargetVector",e=>e.targetVector),new r("viewshedUpVector",e=>e.upVector),new n("viewshedFOVs",e=>e.fovs),new n("viewshedHeadingAndTilt",e=>e.headingAndTilt),new n("viewshedNearFar",e=>e.shadowMap.nearFar??[1,100]),new S("viewshedVolumeOffset",e=>e.volumeOffset),new h("viewshedShadowMap",e=>e.shadowMap.depthTexture),new v("viewshedProjectionMatrices",e=>e.projectionMatrices,6),new v("viewshedViewMatrices",e=>e.viewMatrices,6),new x("viewshedNumFaces",e=>e.shadowMap.numActiveFaces),new P("viewshedAtlasRegions",e=>e.shadowMap.atlasRegions.flat(),24),new h("normalMap",e=>e.normals)),t.constants.add("visibleColor","vec4",[0,1,0,.5]),t.constants.add("occludedColor","vec4",[1,0,0,.5]),t.code.add(o`vec2 getViewshedUv(vec4 worldPosition, int face) {
mat4 viewshedMatrix = viewshedProjectionMatrices[face];
vec4 viewshedUv4 = viewshedMatrix * worldPosition;
vec3 viewshedUv = viewshedUv4.xyz / viewshedUv4.w;
return viewshedUv.xy;
}
float viewshedDepthToFloat(float depth) {
return (depth - viewshedNearFar[0]) / (viewshedNearFar[1] - viewshedNearFar[0]);
}
float getOrthographicDepthToViewshed(vec4 worldPosition, int face) {
mat4 viewshedViewMatrix = viewshedViewMatrices[face];
vec4 viewshedUv4 = viewshedViewMatrix * worldPosition;
vec3 viewshedUv = viewshedUv4.xyz / viewshedUv4.w;
float depth = -viewshedUv.z;
return viewshedDepthToFloat(depth);
}
float viewshedReadShadowMapDepth(sampler2D _viewshedShadowmap, ivec2 uv) {
return texelFetch(_viewshedShadowmap, uv, 0).r;
}
float viewshedFilterShadow(sampler2D _viewshedShadowmap, vec2 uv) {
vec2 uvScaled = uv * vec2(textureSize(_viewshedShadowmap, 0));
vec2 st    = fract(uvScaled);
ivec2 base = ivec2(uvScaled);
float s00 = viewshedReadShadowMapDepth( _viewshedShadowmap, ivec2(base.x,     base.y    ));
float s10 = viewshedReadShadowMapDepth( _viewshedShadowmap, ivec2(base.x + 1, base.y    ));
float s11 = viewshedReadShadowMapDepth( _viewshedShadowmap, ivec2(base.x + 1, base.y + 1));
float s01 = viewshedReadShadowMapDepth( _viewshedShadowmap, ivec2(base.x,     base.y + 1));
return mix(mix(s00, s10, st.x), mix(s01, s11, st.x), st.y);
}
float viewshedTextureAtlasLookup(sampler2D _viewshedShadowmap, vec2 uv, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(uv) * atlasScale + atlasRegion.xy;
return viewshedFilterShadow(_viewshedShadowmap, uvAtlas);
}
float getDepthFromShadowMap(vec2 uv, int face) {
int index = 4 * face;
float umin = viewshedAtlasRegions[index];
float umax = viewshedAtlasRegions[index + 1];
float vmin = viewshedAtlasRegions[index + 2];
float vmax = viewshedAtlasRegions[index + 3];
vec4 atlasRegion = vec4(umin, vmin, umax, vmax);
return viewshedTextureAtlasLookup(viewshedShadowMap, uv, atlasRegion);
}
struct ViewshedPoint {
int face;
vec2 uv;
bool isWithin;
float orthographicDepth;
};
mat3 rotationMatrix(vec3 axis, float angle)
{
float s = sin(angle);
float c = cos(angle);
float oc = 1.0 - c;
return mat3(
oc * axis.xxz * axis.xyx + vec3(c, axis.zy) * vec3(1., -s, s),
oc * axis.xyy * axis.yyz + vec3(axis.z, c, axis.x) * vec3(s, 1., -s),
oc * axis.zyz * axis.xzz + vec3(axis.yx, c) * vec3(-s, s, 1.)
);
}
float distanceToPlane(vec3 position, vec3 normal) {
return dot(position, normal);
}
bool outsideViewshed(float distance) {
return distance > -viewshedVolumeOffset;
}
bool isWithinViewshed(vec3 position) {
float positionLength = length(position - viewshedObserverOffset);
float farSphereDistance = positionLength - viewshedNearFar[1];
if (outsideViewshed(farSphereDistance)) { return false; }
float nearSphereDistance = viewshedNearFar[0] - positionLength;
if (outsideViewshed(nearSphereDistance)) { return false; }
vec3 westVector = normalize(cross(viewshedUpVector, viewshedTargetVector));
bool leftOfTarget = distanceToPlane(position, westVector) > 0.0;
if (viewshedFOVs[0] < TWO_PI) {
float horAngle = viewshedFOVs[0] / 2.0;
horAngle = leftOfTarget ? horAngle : -horAngle;
vec3 sideVector = viewshedTargetVector * rotationMatrix(viewshedUpVector, horAngle);
bool inFront = distanceToPlane(position, sideVector) > 0.0;
if (inFront) {
vec3 sideNormal = cross(viewshedUpVector, sideVector) * (leftOfTarget ? 1. : -1.);
float sideDistance = distanceToPlane(position, normalize(sideNormal));
if (outsideViewshed(sideDistance)) { return false; }
} else if (viewshedFOVs[0] < PI) { return false; }
}
if (viewshedFOVs[1] < PI) {
float t = dot(viewshedUpVector, position);
vec3 nProjVector = normalize(position - t * viewshedUpVector);
float heading = acos(clamp(dot(normalize(viewshedTargetVector), nProjVector), -1.0, 1.0));
heading = leftOfTarget ? heading : -heading;
bool aboveTarget = distanceToPlane(position, viewshedUpVector) > 0.0;
float verFOV = viewshedFOVs[1] / 2.0;
verFOV = aboveTarget ? -verFOV : verFOV;
mat3 rotateByHeading = rotationMatrix(viewshedUpVector, heading);
vec3 sideVector = viewshedTargetVector * rotationMatrix(westVector, verFOV) * rotateByHeading;
vec3 leftVector = westVector * rotateByHeading;
vec3 sideNormal = cross(sideVector, leftVector) * (aboveTarget ? 1. : -1.);
float sideDistance = distanceToPlane(position, normalize(sideNormal));
if (outsideViewshed(sideDistance)) { return false; }
}
return true;
}
bool getViewshedPoint(vec4 localPosition, out ViewshedPoint point) {
for(int i=0; i < viewshedNumFaces; i++) {
vec2 viewshedUv = getViewshedUv(localPosition, i);
if (viewshedUv.x > 0. && viewshedUv.x < 1. && viewshedUv.y > 0. && viewshedUv.y < 1.) {
float orthoDepth = getOrthographicDepthToViewshed(localPosition, i);
if (orthoDepth >= 0.) {
bool isWithin = isWithinViewshed(localPosition.xyz);
point = ViewshedPoint(i, viewshedUv, isWithin, orthoDepth);
return true;
}
}
}
return false;
}
float normalCosAngle(float linearDepth, vec3 localPosition) {
vec4 normal4 = texture(normalMap, uv);
vec3 normalN = normalize(normal4.xyz * 2.0 - 1.0);
vec3 normal =  normalize((inverseViewNormalMatrix * vec4(normalN, 1.0)).xyz);
vec3 viewingDir = normalize(localPosition);
return dot(normal, viewingDir);
}`),t.main.add(o`float depth = depthFromTexture(depthTexture, uv);
if (depth >= 1.0 || depth <= 0.0) {
return;
}
float linearDepth = linearizeDepth(depth);
vec4 localPosition = reconstructLocalPosition(gl_FragCoord.xy, linearDepth);
ViewshedPoint point;
bool foundFace = getViewshedPoint(localPosition, point);
if (!foundFace || !point.isWithin) {
return;
}
float viewshedDepth = getDepthFromShadowMap(point.uv, point.face);
float distance = point.orthographicDepth;
bool visible = distance < viewshedDepth;
fragColor = visible ? visibleColor : occludedColor;
float cosAngle = normalCosAngle(linearDepth, localPosition.xyz);
float threshold = -0.01;
if (cosAngle > threshold) {
fragColor = occludedColor;
}`),i}var y=s(),te=Object.freeze(Object.defineProperty({__proto__:null,ViewshedPassParameters:w,build:O},Symbol.toStringTag,{value:"Module"}));export{w as a,O as b,te as c};
