import{d as l}from"./chunk-TEPTMKVE.js";import{a as x}from"./chunk-O5NYEJB2.js";import{a as d}from"./chunk-FAYM6DKX.js";import{a as T}from"./chunk-YZ4IDPMQ.js";import{a as c}from"./chunk-45K2AY22.js";import{a as t}from"./chunk-UUP4FBYC.js";import{g as s}from"./chunk-6QJXCAOV.js";import{d as m}from"./chunk-VEYWSQAY.js";function z(r,n){let e=r.fragment,{hasVertexTangents:i,doubleSidedMode:u,hasNormalTexture:g,textureCoordinateType:v,bindType:f,hasNormalTextureTransform:o}=n;i?(r.attributes.add("tangent","vec4"),r.varyings.add("vTangent","vec4"),u===2?e.code.add(t`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):e.code.add(t`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):e.code.add(t`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),g&&v!==0&&(r.include(l,n),e.uniforms.add(f===1?new c("normalTexture",a=>a.textureNormal):new x("normalTexture",a=>a.textureNormal)),o&&(e.uniforms.add(new T("scale",a=>a.scale??s)),e.uniforms.add(new d("normalTextureTransformMatrix",a=>a.normalTextureTransformMatrix??m))),e.code.add(t`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),o&&e.code.add(t`mat3 normalRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),e.code.add(t`return tangentSpace * rawNormal;
}`))}export{z as a};
