import{a as r}from"./chunk-UUP4FBYC.js";function s(e,a){switch(e.fragment.code.add(r`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`),a.normalType){case 1:e.attributes.add("normalCompressed","vec2"),e.vertex.code.add(r`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case 0:e.attributes.add("normal","vec3"),e.vertex.code.add(r`vec3 normalModel() {
return normal;
}`);break;default:a.normalType;case 2:case 3:}}export{s as a};
