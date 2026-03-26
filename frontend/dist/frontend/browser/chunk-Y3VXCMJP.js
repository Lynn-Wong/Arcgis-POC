import{a as r}from"./chunk-UUP4FBYC.js";function a(o,e){e.hasVertexColors?(o.attributes.add("color","vec4"),o.varyings.add("vColor","vec4"),o.vertex.code.add(r`void forwardVertexColor() { vColor = color; }`),o.vertex.code.add(r`
      void forwardNormalizedVertexColor() { vColor = color * ${r.float(1/255)}; }
    `)):o.vertex.code.add(r`void forwardVertexColor() {}
void forwardNormalizedVertexColor() {}`)}export{a};
