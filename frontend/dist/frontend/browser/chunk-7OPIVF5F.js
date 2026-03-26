import{a as r}from"./chunk-YQXWXQD3.js";import{a as t}from"./chunk-Q5RZKMWM.js";import{a as g}from"./chunk-UUP4FBYC.js";import{c as l}from"./chunk-WENEM4NK.js";import{a as o}from"./chunk-YMQ4BGWF.js";import{b as i}from"./chunk-OFZRIX6T.js";import{a as s}from"./chunk-JARU7KSM.js";function _(b,m){let h=b.fragment,a=m.lightingSphericalHarmonicsOrder!==void 0?m.lightingSphericalHarmonicsOrder:2;a===0?(h.uniforms.add(new r("lightingAmbientSH0",({lighting:n})=>l(c,n.sh.r[0],n.sh.g[0],n.sh.b[0]))),h.code.add(g`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):a===1?(h.uniforms.add(new t("lightingAmbientSH_R",({lighting:n})=>i(e,n.sh.r[0],n.sh.r[1],n.sh.r[2],n.sh.r[3])),new t("lightingAmbientSH_G",({lighting:n})=>i(e,n.sh.g[0],n.sh.g[1],n.sh.g[2],n.sh.g[3])),new t("lightingAmbientSH_B",({lighting:n})=>i(e,n.sh.b[0],n.sh.b[1],n.sh.b[2],n.sh.b[3]))),h.code.add(g`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):a===2&&(h.uniforms.add(new r("lightingAmbientSH0",({lighting:n})=>l(c,n.sh.r[0],n.sh.g[0],n.sh.b[0])),new t("lightingAmbientSH_R1",({lighting:n})=>i(e,n.sh.r[1],n.sh.r[2],n.sh.r[3],n.sh.r[4])),new t("lightingAmbientSH_G1",({lighting:n})=>i(e,n.sh.g[1],n.sh.g[2],n.sh.g[3],n.sh.g[4])),new t("lightingAmbientSH_B1",({lighting:n})=>i(e,n.sh.b[1],n.sh.b[2],n.sh.b[3],n.sh.b[4])),new t("lightingAmbientSH_R2",({lighting:n})=>i(e,n.sh.r[5],n.sh.r[6],n.sh.r[7],n.sh.r[8])),new t("lightingAmbientSH_G2",({lighting:n})=>i(e,n.sh.g[5],n.sh.g[6],n.sh.g[7],n.sh.g[8])),new t("lightingAmbientSH_B2",({lighting:n})=>i(e,n.sh.b[5],n.sh.b[6],n.sh.b[7],n.sh.b[8]))),h.code.add(g`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),m.pbrMode!==1&&m.pbrMode!==2||h.code.add(g`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}var c=s(),e=o();export{_ as a};
