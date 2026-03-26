import{a as c,j as s}from"./chunk-WWWOXNSG.js";import{a as u}from"./chunk-GMXW7EMM.js";import{a as i}from"./chunk-FAYM6DKX.js";import{a as n}from"./chunk-J6IEXWQ2.js";import{a as t}from"./chunk-2NXJIMQ2.js";import{a as e}from"./chunk-UUP4FBYC.js";function v(r){r.code.add(e`struct MaskedColor {
vec4 color;
bvec4 mask;
};`)}function k(r){r.include(v),r.code.add(e`
    MaskedColor createMaskedFromUInt8NaNColor(vec4 color) {
      return MaskedColor(color * ${e.float(1/254)}, equal(color, vec4(255)));
    }
  `)}function d(r){r.include(v),r.code.add(e`vec4 maskedColorSelectOrOne(MaskedColor color) {
return vec4(
color.mask.r ? 1.0 : color.color.r,
color.mask.g ? 1.0 : color.color.g,
color.mask.b ? 1.0 : color.color.b,
color.mask.a ? 1.0 : color.color.a
);
}
MaskedColor multiplyMaskedColors(MaskedColor color1, MaskedColor color2) {
vec4 masked1 = maskedColorSelectOrOne(color1);
vec4 masked2 = maskedColorSelectOrOne(color2);
return MaskedColor(masked1 * masked2, bvec4(ivec4(color1.mask) & ivec4(color2.mask)));
}`)}function m(r){r.include(v),r.code.add(e`MaskedColor createMaskedFromNaNColor(vec4 color) {
return MaskedColor(color, isnan(color));
}`)}function A(r,l){let{vertex:a,attributes:C}=r;l.hasVVInstancing&&(l.hasVVSize||l.hasVVColor)&&C.add("instanceFeatureAttribute","vec4"),l.hasVVSize?(a.uniforms.add(new t("vvSizeMinSize",o=>o.vvSize.minSize)),a.uniforms.add(new t("vvSizeMaxSize",o=>o.vvSize.maxSize)),a.uniforms.add(new t("vvSizeOffset",o=>o.vvSize.offset)),a.uniforms.add(new t("vvSizeFactor",o=>o.vvSize.factor)),a.uniforms.add(new t("vvSizeFallback",o=>o.vvSize.fallback)),a.uniforms.add(new i("vvSymbolRotationMatrix",o=>o.vvSymbolRotationMatrix)),a.uniforms.add(new t("vvSymbolAnchor",o=>o.vvSymbolAnchor)),a.code.add(e`vec3 vvScale(vec4 _featureAttribute) {
if (isnan(_featureAttribute.x)) {
return vvSizeFallback;
}
return clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize);
}
vec4 vvTransformPosition(vec3 position, vec4 _featureAttribute) {
return vec4(vvSymbolRotationMatrix * ( vvScale(_featureAttribute) * (position + vvSymbolAnchor)), 1.0);
}`),a.code.add(e`
      const float eps = 1.192092896e-07;
      vec4 vvTransformNormal(vec3 _normal, vec4 _featureAttribute) {
        vec3 scale = max(vvScale(_featureAttribute), eps);
        return vec4(vvSymbolRotationMatrix * _normal / scale, 1.0);
      }

      ${l.hasVVInstancing?e`
      vec4 vvLocalNormal(vec3 _normal) {
        return vvTransformNormal(_normal, instanceFeatureAttribute);
      }

      vec4 localPosition() {
        return vvTransformPosition(position, instanceFeatureAttribute);
      }`:""}
    `)):a.code.add(e`vec4 localPosition() { return vec4(position, 1.0); }
vec4 vvLocalNormal(vec3 _normal) { return vec4(_normal, 1.0); }`),r.vertex.include(v),l.hasVVColor?(a.constants.add("vvColorNumber","int",s),a.uniforms.add(new u("vvColorValues",o=>o.vvColor.values,s),new c("vvColorColors",o=>o.vvColor.colors,s),new n("vvColorFallback",o=>o.vvColor.fallback,{supportsNaN:!0})),l.hasVVInstancing&&(r.vertex.include(d),r.vertex.include(m)),a.code.add(e`
      vec4 interpolateVVColor(float value) {
        if (isnan(value)) {
          return vvColorFallback;
        }

        if (value <= vvColorValues[0]) {
          return vvColorColors[0];
        }

        for (int i = 1; i < vvColorNumber; ++i) {
          if (vvColorValues[i] >= value) {
            float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
            return mix(vvColorColors[i-1], vvColorColors[i], f);
          }
        }
        return vvColorColors[vvColorNumber - 1];
      }

      vec4 vvGetColor(vec4 featureAttribute) {
        return interpolateVVColor(featureAttribute.y);
      }

      ${l.hasVVInstancing?e`
            vec4 vvColor() {
              return vvGetColor(instanceFeatureAttribute);
            }

            MaskedColor applyVVColor(MaskedColor color) {
              return multiplyMaskedColors(color, createMaskedFromNaNColor(vvColor()));
            }
            `:e`
            vec4 vvColor() {
              return vec4(1.0);
            }

            MaskedColor applyVVColor(MaskedColor color) {
              return color;
            }
            `}
    `)):a.code.add(e`vec4 vvColor() {
return vec4(1.0);
}
MaskedColor applyVVColor(MaskedColor color) {
return color;
}`)}export{v as a,k as b,d as c,m as d,A as e};
