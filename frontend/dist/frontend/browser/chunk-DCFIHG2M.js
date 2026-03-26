import{b as u}from"./chunk-3J35X54R.js";import{a as f}from"./chunk-GWGHQQZG.js";import{a as p}from"./chunk-33JKRO2R.js";import{a as m}from"./chunk-YZTK6GAD.js";import{a as s}from"./chunk-N4F7I4XE.js";import{a as d}from"./chunk-RXFGTBOJ.js";import{a as l}from"./chunk-R6IIY54E.js";import{a as n}from"./chunk-2NXJIMQ2.js";import{a as c}from"./chunk-QF5M5KTV.js";import{a as o}from"./chunk-H2ASV3YO.js";import{a as r,b as i}from"./chunk-UUP4FBYC.js";function D(h){let t=new c;t.include(f);let{reduced:g}=h,{fragment:a}=t;return s(a),a.include(d),a.include(p),a.include(m),a.include(u,!1),a.uniforms.add(new n("backgroundColor",e=>e.backgroundColor),new o("innerFadeDistance",e=>e.innerFadeDistance),new o("altitudeFade",e=>e.altitudeFade),new l("depthTexture",e=>e.mainDepth)).code.add(r`vec4 applyUndergroundAtmosphere(vec3 rayDir, vec3 lightDirection, vec4 fragColor) {
float rayPlanetDistance = heightParameters[1] - radii[0] * radii[0];
vec2 rayPlanetIntersect = sphereIntersect(cameraPosition, rayDir, rayPlanetDistance);
if (!((rayPlanetIntersect.x <= rayPlanetIntersect.y) && rayPlanetIntersect.y > 0.0)) {
return fragColor;
}
float lightAngle = dot(lightDirection, normalize(cameraPosition + rayDir * max(0.0, rayPlanetIntersect.x)));
vec4 surfaceColor = vec4(vec3(max(0.0, (smoothstep(-1.0, 0.8, 2.0 * lightAngle)))), 1.0 - altitudeFade);
float relDist = (rayPlanetIntersect.y - max(0.0, rayPlanetIntersect.x)) / innerFadeDistance;
if (relDist > 1.0) {
return surfaceColor;
}
return mix(fragColor, surfaceColor, smoothstep(0.0, 1.0, relDist * relDist));
}
float getGlow(float dist, float radius, float intensity) {
return pow(radius / max(dist, 1e-6), intensity);
}
vec3 getSun(vec3 cameraPos, vec3 rayDir, vec3 lightDir){
float scaleFract = (length(cameraPos) - radii[0]) / scaleHeight;
float sunOpticalDepth = getOpticalDepth(cameraPos, rayDir, max(scaleFract, 0.0));
vec3 sunTransmittance = exp(-(mix(betaCombined, betaRayleigh, 0.5)) * max(0.0, sunOpticalDepth));
float mu = clamp(dot(rayDir, lightDir), 0.0, 1.0);
float sunDisc = 256.0 * smoothstep(0.0, 128.0, clamp(getGlow(1.0 - mu, 3e-5, 3.0), 0.0, 128.0));
return normalize(sunTransmittance) * sunDisc;
}`).main.add(r`
      vec3 rayDir = normalize(worldRay);
      float terrainDepth = -1.0;
      ${i(!g,r`float depthSample = texture(depthTexture, uv).r;
             if (depthSample != 1.0) {
                fragColor = vec4(0);
                return;
             }`)}

      vec3 col = linearizeGamma(backgroundColor);
      col += raymarchAtmosphere(cameraPosition, rayDir, mainLightDirection, terrainDepth);
      col += getSun(cameraPosition, rayDir, mainLightDirection);
      float alpha = smoothstep(0.0, mix(0.15, 0.01, heightParameters[3]), length(col));

      col = tonemapACES(col);
      fragColor = delinearizeGamma(vec4(col, alpha));
      fragColor = applyUndergroundAtmosphere(rayDir, mainLightDirection, fragColor);
  `),t}var T=Object.freeze(Object.defineProperty({__proto__:null,build:D},Symbol.toStringTag,{value:"Module"}));export{D as a,T as b};
