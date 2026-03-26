import{a as u}from"./chunk-H5WX5TXE.js";import{a as f}from"./chunk-YEMBISS4.js";import{a as v}from"./chunk-O5NYEJB2.js";import{a as p}from"./chunk-ANHDRWYO.js";import{a as C}from"./chunk-2VZF5K52.js";import{a as x}from"./chunk-2XDZ5QNL.js";import{a as e,b as d}from"./chunk-UUP4FBYC.js";import{a as c,b as m}from"./chunk-ZXWEC63B.js";function M(o){o.vertex.code.add(e`
    vec4 decodeSymbolColor(vec4 symbolColor, out int colorMixMode) {
      float symbolAlpha = 0.0;

      const float maxTint = 85.0;
      const float maxReplace = 170.0;
      const float scaleAlpha = 3.0;

      if (symbolColor.a > maxReplace) {
        colorMixMode = ${e.int(1)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxReplace);
      } else if (symbolColor.a > maxTint) {
        colorMixMode = ${e.int(3)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxTint);
      } else if (symbolColor.a > 0.0) {
        colorMixMode = ${e.int(4)};
        symbolAlpha = scaleAlpha * symbolColor.a;
      } else {
        colorMixMode = ${e.int(1)};
        symbolAlpha = 0.0;
      }

      return vec4(symbolColor.r, symbolColor.g, symbolColor.b, symbolAlpha);
    }
  `)}var i=class extends x{constructor(t,n){super(t,"int",2,(a,l,r)=>a.setUniform1i(t,n(l,r)))}};var b=429496.7296;function z(o,t){c(o/b*.5+.5,t)}var g=1e6;function k(o,t){m(o/g*.5+.5,t)}function h(){return 3+(C()?1:0)}function X(o,t){switch(t.componentData){case 1:return E(o,t);case 0:return w(o,t);case 2:return;default:t.componentData}}function E(o,t){let{vertex:n,fragment:a}=o;n.include(u),n.uniforms.add(new v("componentColorTex",y=>y.componentParameters.texture.texture)),o.attributes.add("componentIndex","float"),o.varyings.add("vExternalColorMixMode","mediump float"),o.varyings.add("vExternalColor","vec4");let{output:l}=t,r=l===10;r&&o.varyings.add("vObjectAndLayerIdColor","vec4");let s=l===1;s&&(o.varyings.add("emissiveStrength","float"),o.varyings.add("emissiveSource","int")),o.include(M),n.constants.add("stride","float",h()),n.code.add(e`vec2 getComponentTextureCoordinates(float componentIndex, float typeOffset) {
float index = componentIndex * stride + typeOffset;
float texSize = float(textureSize(componentColorTex, 0).x);
float coordX = mod(index, texSize);
float coordY = floor(index / texSize);
return vec2(coordX, coordY) + 0.5;
}`),n.code.add(e`
  vec4 _readComponentColor() {
    vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 0.0);
    return texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
   }

  float readElevationOffset() {
    vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 1.0);
    vec4 encodedElevation = texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
    return uninterpolatedRGBAToFloat(encodedElevation) * ${e.float(b)};
  }

  void forwardEmissiveStrength() {
    ${d(s,e`vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 2.0);
           vec4 encodedEmissive = texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
           emissiveStrength = uninterpolatedRGBToFloat(encodedEmissive.rgb) * ${e.float(g)};
           emissiveSource = encodedEmissive.a == 0.0 ? 0 : 1;`)}
  }

  void forwardObjectAndLayerIdColor() {
    ${d(r,e`vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 3.0);
           vObjectAndLayerIdColor = texelFetch(componentColorTex, ivec2(textureCoordinates), 0);`)}
  }

  vec4 forwardExternalColor(out bool castShadows) {
    vec4 componentColor = _readComponentColor() * 255.0;

    float shadowFlag = mod(componentColor.b * 255.0, 2.0);
    componentColor.b -= shadowFlag;
    castShadows = shadowFlag >= 1.0;

    int decodedColorMixMode;
    vExternalColor = decodeSymbolColor(componentColor, decodedColorMixMode) * 0.003921568627451; // = 1/255;
    vExternalColorMixMode = float(decodedColorMixMode) + 0.5; // add 0.5 to avoid interpolation artifacts

    return vExternalColor;
  }
`),a.code.add(e`
  void readExternalColor(out vec4 externalColor, out int externalColorMixMode) {
    externalColor = vExternalColor;
    externalColorMixMode = int(vExternalColorMixMode);
  }

  void outputObjectAndLayerIdColor() {
     ${r?e`fragColor = vObjectAndLayerIdColor;`:""}
  }
`)}function w(o,t){let{vertex:n,fragment:a}=o;o.varyings.add("vExternalColor","vec4"),a.uniforms.add(new f("emissiveStrength",r=>r.componentParameters.emissiveStrength)),n.uniforms.add(new p("externalColor",r=>r.componentParameters.externalColor)).code.add(e`float readElevationOffset() {
return 0.0;
}
void forwardObjectAndLayerIdColor() {}
void forwardEmissiveStrength() {}
vec4 forwardExternalColor(out bool castShadows) {
vExternalColor = externalColor;
castShadows = true;
return externalColor;
}`);let l=t.output===10;a.uniforms.add(new i("externalColorMixMode",r=>r.componentParameters.externalColorMixMode)).code.add(e`
    void readExternalColor(out vec4 color, out int colorMixMode) {
      color = vExternalColor;
      colorMixMode = externalColorMixMode;
    }

    void outputObjectAndLayerIdColor() {
      ${d(l,"fragColor = vec4(0, 0, 0, 0);")}
    }
  `)}export{b as a,z as b,k as c,h as d,X as e};
