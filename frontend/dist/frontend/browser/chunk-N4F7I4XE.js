import{a as t}from"./chunk-YQXWXQD3.js";import{a}from"./chunk-UUP4FBYC.js";function o(i){i.uniforms.add(new t("mainLightDirection",n=>n.lighting.mainLight.direction))}function d(i){i.uniforms.add(new t("mainLightIntensity",n=>n.lighting.mainLight.intensity))}function r(i){o(i.fragment),d(i.fragment),i.fragment.code.add(a`vec3 applyShading(vec3 shadingNormal, float shadow) {
float dotVal = clamp(dot(shadingNormal, mainLightDirection), 0.0, 1.0);
return mainLightIntensity * ((1.0 - shadow) * dotVal);
}`)}export{o as a,d as b,r as c};
