import{a as p}from"./chunk-4SSBS2W2.js";import{a as n}from"./chunk-YWNUAOKV.js";import{a as c}from"./chunk-B7VK56II.js";import{a as l}from"./chunk-JMYO2YOI.js";import{a as i}from"./chunk-UUP4FBYC.js";import{f as r,h as t}from"./chunk-WMGH7MKS.js";import{a as o}from"./chunk-JJQR3F6K.js";function D(e){e.include(p),s(e)}function s(e){e.fragment.include(l),e.include(n),e.fragment.uniforms.add(new c("inverseViewMatrix",({camera:a})=>r(d,t(d,a.viewMatrix,a.center)))).code.add(i`vec3 calculateUVZShadowAndPixelPosFromDepth(
in vec2 _uv,
ivec2 shadowMapSize,
in sampler2D _depthMap,
out vec4 currentPixelPos
) {
float depth = depthFromTexture(_depthMap, _uv);
if (depth >= 1.0 || depth <= 0.0) {
return invalidShadowmapUVZ;
}
float currentPixelDepth = linearizeDepth(depth);
currentPixelPos = vec4(reconstructPosition(gl_FragCoord.xy, currentPixelDepth), 1.0);
vec4 worldSpacePos = inverseViewMatrix * currentPixelPos;
float linearDepth = -currentPixelDepth;
return calculateUVZShadow(worldSpacePos.xyz, linearDepth, shadowMapSize);
}
vec3 calculateUVZShadowFromDepth(
in vec2 _uv,
ivec2 shadowMapSize,
in sampler2D _depthMap
) {
vec4 currentPixelPos;
return calculateUVZShadowAndPixelPosFromDepth(_uv, shadowMapSize, _depthMap, currentPixelPos);
}`)}var d=o();export{D as a};
