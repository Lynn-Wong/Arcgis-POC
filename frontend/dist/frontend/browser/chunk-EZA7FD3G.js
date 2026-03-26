import{b as f}from"./chunk-3J35X54R.js";import{a as s}from"./chunk-GWGHQQZG.js";import{a as u}from"./chunk-33JKRO2R.js";import{a as l}from"./chunk-YZTK6GAD.js";import{a as d}from"./chunk-N4F7I4XE.js";import{a as h}from"./chunk-RXFGTBOJ.js";import{a as p}from"./chunk-R6IIY54E.js";import{a as m}from"./chunk-JMYO2YOI.js";import{a as c}from"./chunk-QF5M5KTV.js";import{a as n}from"./chunk-H2ASV3YO.js";import{a as r,b as o}from"./chunk-UUP4FBYC.js";function S(x){let t=new c,{fragment:e}=t;t.include(s),d(e),e.include(h),e.include(m),e.include(u),e.include(l),e.include(f,!0),e.uniforms.add(new p("depthTexture",a=>a.mainDepth),new n("hazeStrength",a=>a.hazeStrength));let{reduced:i}=x;return i&&e.code.add(r`float getDepth(vec2 uv){
return linearDepthFromTexture(depthTexture, uv);
}
float textureBilinear(vec2 uv) {
vec2 depthTextureSize = vec2(textureSize(depthTexture, 0));
vec2 texelSize = 1.0 / depthTextureSize;
vec2 depthUV = (uv * depthTextureSize) - vec2(0.5);
vec2 f = fract(depthUV);
vec2 snapUV = (floor(depthUV) + vec2(0.5)) / depthTextureSize;
float d0 = getDepth(snapUV);
float d1 = getDepth(snapUV + vec2(texelSize.x, 0.0));
float d2 = getDepth(snapUV + vec2(0.0, texelSize.y));
float d3 = getDepth(snapUV + texelSize);
return mix(mix(d0, d1, f.x), mix(d2, d3, f.x), f.y);
}`),e.main.add(r`
      vec3 rayDir = normalize(worldRay);
      float terrainDepth = -1.0;

      float depthSample = texture(depthTexture, uv).r;
      if (depthSample != 1.0) {
        vec3 cameraSpaceRay = normalize(eyeDir);
        cameraSpaceRay /= cameraSpaceRay.z;

        cameraSpaceRay *= ${o(i,"-textureBilinear(uv)","-linearDepthFromTexture(depthTexture, uv)")};
        terrainDepth = max(0.0, length(cameraSpaceRay));
      } else {
        discard;
      }

      // Alpha is ignored for haze blending
      vec3 col = vec3(0);
      float fadeOut = smoothstep(-10000.0, -15000.0, heightParameters[0] - radii[0]);
      if(depthSample != 1.0){
        col = (1.0 - fadeOut) * hazeStrength * raymarchAtmosphere(cameraPosition, rayDir, mainLightDirection, terrainDepth);
      }
      float alpha = 1.0;

      col = tonemapACES(col);
      fragColor = delinearizeGamma(vec4(col, alpha));
  `),t}var w=Object.freeze(Object.defineProperty({__proto__:null,build:S},Symbol.toStringTag,{value:"Module"}));export{S as a,w as b};
