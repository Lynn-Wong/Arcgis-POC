import{a as s}from"./chunk-N7GGMD2W.js";import{a as m}from"./chunk-YWNUAOKV.js";import{a as p}from"./chunk-R6IIY54E.js";import{a}from"./chunk-2NXJIMQ2.js";import{a as d}from"./chunk-JMYO2YOI.js";import{a as t}from"./chunk-H2ASV3YO.js";import{a as n}from"./chunk-45K2AY22.js";import{a as l}from"./chunk-UUP4FBYC.js";function x(i,c){let e=i.fragment;e.include(d),i.include(m),e.include(s),e.uniforms.add(new t("globalAlpha",o=>o.globalAlpha),new a("glowColor",o=>o.glowColor),new t("glowWidth",(o,r)=>o.glowWidth*r.camera.pixelRatio),new t("glowFalloff",o=>o.glowFalloff),new a("innerColor",o=>o.innerColor),new t("innerWidth",(o,r)=>o.innerWidth*r.camera.pixelRatio),new p("depthMap",o=>o.depth?.attachment),new n("normalMap",o=>o.normals)),e.code.add(l`vec4 premultipliedColor(vec3 rgb, float alpha) {
return vec4(rgb * alpha, alpha);
}`),e.code.add(l`vec4 laserlineProfile(float dist) {
if (dist > glowWidth) {
return vec4(0.0);
}
float innerAlpha = (1.0 - smoothstep(0.0, innerWidth, dist));
float glowAlpha = pow(max(0.0, 1.0 - dist / glowWidth), glowFalloff);
return blendColorsPremultiplied(
premultipliedColor(innerColor, innerAlpha),
premultipliedColor(glowColor, glowAlpha)
);
}`),e.code.add(l`bool laserlineReconstructFromDepth(out vec3 pos, out vec3 normal, out float angleCutoffAdjust, out float depthDiscontinuityAlpha) {
float depth = depthFromTexture(depthMap, uv);
if (depth == 1.0) {
return false;
}
float linearDepth = linearizeDepth(depth);
pos = reconstructPosition(gl_FragCoord.xy, linearDepth);
float minStep = 6e-8;
float depthStep = clamp(depth + minStep, 0.0, 1.0);
float linearDepthStep = linearizeDepth(depthStep);
float depthError = abs(linearDepthStep - linearDepth);
vec3 normalReconstructed = normalize(cross(dFdx(pos), dFdy(pos)));
vec3 normalFromTexture = normalize(texture(normalMap, uv).xyz * 2.0 - 1.0);
float blendFactor = smoothstep(0.15, 0.2, depthError);
normal = normalize(mix(normalReconstructed, normalFromTexture, blendFactor));
angleCutoffAdjust = mix(0.0, 0.004, blendFactor);
float ddepth = fwidth(linearDepth);
depthDiscontinuityAlpha = 1.0 - smoothstep(0.0, 0.01, -ddepth / linearDepth);
return true;
}`),c.contrastControlEnabled?e.uniforms.add(new n("frameColor",(o,r)=>o.colors),new t("globalAlphaContrastBoost",o=>o.globalAlphaContrastBoost)).code.add(l`float rgbToLuminance(vec3 color) {
return dot(vec3(0.2126, 0.7152, 0.0722), color);
}
vec4 laserlineOutput(vec4 color) {
float backgroundLuminance = rgbToLuminance(texture(frameColor, uv).rgb);
float alpha = clamp(globalAlpha * max(backgroundLuminance * globalAlphaContrastBoost, 1.0), 0.0, 1.0);
return color * alpha;
}`):e.code.add(l`vec4 laserlineOutput(vec4 color) {
return color * globalAlpha;
}`)}export{x as a};
