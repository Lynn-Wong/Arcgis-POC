import{a as d}from"./chunk-UUP4FBYC.js";function n(o,r){if(r.output!==10)return o.vertex.code.add(d`void forwardObjectAndLayerIdColor() {}`),void o.fragment.code.add(d`void outputObjectAndLayerIdColor() {}`);let t=r.instanced;o.varyings.add("objectAndLayerIdColorVarying","vec4");let e=t?"instanceOlidColor":"olidColor";o.attributes.add(e,"vec4"),o.vertex.code.add(d`
    void forwardObjectAndLayerIdColor() {
      objectAndLayerIdColorVarying = ${e} * 0.003921568627451;
    }`),o.fragment.code.add(d`void outputObjectAndLayerIdColor() {
fragColor = objectAndLayerIdColorVarying;
}`)}export{n as a};
