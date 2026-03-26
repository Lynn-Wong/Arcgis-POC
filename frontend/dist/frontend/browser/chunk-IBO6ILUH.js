import{a as r}from"./chunk-UUP4FBYC.js";function d(e,t){switch(t.textureCoordinateType){case 1:return e.attributes.add("uv0","vec2"),e.varyings.add("vuv0","vec2"),void e.vertex.code.add(r`void forwardTextureCoordinates() { vuv0 = uv0; }`);case 2:return e.attributes.add("uv0","vec2"),e.attributes.add("uvRegion","vec4"),e.varyings.add("vuv0","vec2"),e.varyings.add("vuvRegion","vec4"),void e.vertex.code.add(r`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`);default:t.textureCoordinateType;case 0:return void e.vertex.code.add(r`void forwardTextureCoordinates() {}`);case 3:return}}export{d as a};
