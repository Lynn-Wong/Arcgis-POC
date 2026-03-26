import{a as m}from"./chunk-N5UWJJ2M.js";import{b as c,c as u}from"./chunk-SX7H3Q3A.js";import{b as d}from"./chunk-GVXXBNZP.js";import{a as p}from"./chunk-YEMBISS4.js";import{a as f}from"./chunk-FAYM6DKX.js";import{a as h}from"./chunk-3C5EAPCU.js";import{a as v}from"./chunk-VGAXEXH3.js";import{a as x}from"./chunk-H2ASV3YO.js";import{a,b as n}from"./chunk-UUP4FBYC.js";import{a as s}from"./chunk-YMQ4BGWF.js";import{a as i}from"./chunk-VEYWSQAY.js";function I(r,o){switch(o.normalType){case 0:case 1:r.include(m,o),r.varyings.add("vNormalWorld","vec3"),r.varyings.add("vNormalView","vec3"),r.vertex.uniforms.add(new d("transformNormalGlobalFromModel",e=>e.transformNormalGlobalFromModel),new f("transformNormalViewFromGlobal",e=>e.transformNormalViewFromGlobal)).code.add(a`void forwardNormal() {
vNormalWorld = transformNormalGlobalFromModel * normalModel();
vNormalView = transformNormalViewFromGlobal * vNormalWorld;
}`);break;case 2:r.vertex.code.add(a`void forwardNormal() {}`);break;default:o.normalType;case 3:}}var M=class extends c{constructor(){super(...arguments),this.transformNormalViewFromGlobal=i()}},w=class extends u{constructor(){super(...arguments),this.transformNormalGlobalFromModel=i(),this.toMapSpace=s()}};function W(r,o){N(r,o,new x("textureAlphaCutoff",e=>e.textureAlphaCutoff))}function k(r,o){N(r,o,new p("textureAlphaCutoff",e=>e.textureAlphaCutoff))}function N(r,o,e){let l=r.fragment,t=o.alphaDiscardMode,C=t===0;t!==2&&t!==3||l.uniforms.add(e),l.code.add(a`
    void discardOrAdjustAlpha(inout vec4 color) {
      ${t===1?"color.a = 1.0;":`if (color.a < ${C?a.float(v):"textureAlphaCutoff"}) {
              discard;
             } ${n(t===2,"else { color.a = 1.0; }")}`}
    }
  `)}function R(r){r.include(h),r.code.add(a`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      // workaround for artifacts in macOS using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      vec3 internalMixed = internalColor * textureColor;
      vec3 allMixed = internalMixed * externalColor;

      if (mode == ${a.int(1)}) {
        return allMixed;
      }
      if (mode == ${a.int(2)}) {
        return internalMixed;
      }
      if (mode == ${a.int(3)}) {
        return externalColor;
      }

      // tint (or something invalid)
      float vIn = rgb2v(internalMixed);
      vec3 hsvTint = rgb2hsv(externalColor);
      vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
      return hsv2rgb(hsvOut);
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      // workaround for artifacts in macOS using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      float internalMixed = internalOpacity * textureOpacity;
      float allMixed = internalMixed * externalOpacity;

      if (mode == ${a.int(2)}) {
        return internalMixed;
      }
      if (mode == ${a.int(3)}) {
        return externalOpacity;
      }

      // multiply or tint (or something invalid)
      return allMixed;
    }
  `)}export{I as a,M as b,w as c,W as d,k as e,R as f};
