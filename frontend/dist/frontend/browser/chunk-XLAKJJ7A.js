import{a as s}from"./chunk-2NXJIMQ2.js";import{a as c}from"./chunk-UUP4FBYC.js";import{c as r}from"./chunk-WENEM4NK.js";import{a as t}from"./chunk-JARU7KSM.js";function m(e){e.vertex.code.add(c`float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {
return absCosAngle * absCosAngle * absCosAngle;
}`),e.vertex.code.add(c`vec3 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec3 params) {
return vec3(
min(params.x / (distanceToCamera - params.y), 1.0),
screenSizePerspectiveViewAngleDependentFactor(absCosAngle),
params.z
);
}`),e.vertex.code.add(c`float applyScreenSizePerspectiveScaleFactorFloat(float size, vec3 factor) {
return size * clamp(mix(factor.x, 1.0, factor.y), factor.z, 1.0);
}`),e.vertex.code.add(c`float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorFloat(
size,
screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)
);
}`),e.vertex.code.add(c`vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec3 factor) {
return size * clamp(mix(factor.x, 1.0, factor.y), factor.z, 1.0);
}`),e.vertex.code.add(c`vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));
}`)}function z(e){e.uniforms.add(new s("screenSizePerspective",a=>n(a.screenSizePerspective,a.screenSizePerspectiveMinPixelReferenceSize)))}function d(e){e.uniforms.add(new s("screenSizePerspectiveAlignment",a=>n(a.screenSizePerspectiveAlignment||a.screenSizePerspective,a.screenSizePerspectiveAlignment?null:a.screenSizePerspectiveMinPixelReferenceSize)))}function n(e,a){let o=a!=null&&e!=null?Math.min(e.minPixelSize/a,1):0;return e?r(i,e.divisor,e.offset,o):r(i,0,0,0)}var i=t();export{m as a,z as b,d as c};
