import{d as m,e as d,f as g}from"./chunk-RBNACYAX.js";import{a as h}from"./chunk-J6IEXWQ2.js";import{a as l}from"./chunk-YQXWXQD3.js";import{a as c}from"./chunk-L7NOU4T2.js";import{a as p}from"./chunk-YZ4IDPMQ.js";import{a as t,b as r}from"./chunk-UUP4FBYC.js";import{a as n}from"./chunk-6QJXCAOV.js";import{a as o}from"./chunk-YMQ4BGWF.js";import{a as i}from"./chunk-ARRCN5K3.js";var f=class extends c{constructor(){super(...arguments),this.radii=n(),this.heightParameters=o()}};function y(e){e.uniforms.add(new p("radii",a=>a.radii),new h("heightParameters",a=>a.heightParameters)),e.constants.add("scaleHeight","float",i.scaleHeight*i.atmosphereHeight),e.code.add(t`float chapmanApproximation(float thickness, float height, float cosZenith) {
float c = sqrt(thickness + height);
float cExpH = c * exp(-height);
if (cosZenith >= 0.0) {
return cExpH / (c * cosZenith + 1.0);
} else {
float x0 = sqrt(1.0 - cosZenith * cosZenith) * (thickness + height);
float c0 = sqrt(x0);
return 2.0 * c0 * exp(thickness - x0) - cExpH / (1.0 - c * cosZenith);
}
}`),e.code.add(t`float getOpticalDepth(vec3 position, vec3 dir, float h) {
return scaleHeight * chapmanApproximation(radii[0] / scaleHeight, h, dot(normalize(position), dir));
}`),e.code.add(t`vec4 planetIntersect(vec3 cameraPos, vec3 rayDir) {
float reducedPlanetRadius = radii[0] - 20000.0;
float rayPlanetDistance = heightParameters[1] - reducedPlanetRadius * reducedPlanetRadius;
vec2 rayPlanetIntersect = sphereIntersect(cameraPos, rayDir, rayPlanetDistance);
vec2 rayAtmosphereIntersect = sphereIntersect(cameraPos, rayDir, heightParameters[2]);
bool hitsAtmosphere = (rayAtmosphereIntersect.x <= rayAtmosphereIntersect.y) && rayAtmosphereIntersect.x > 0.0;
bool insideAtmosphere = heightParameters[0] < radii[1];
if (!(hitsAtmosphere || insideAtmosphere)) {
return vec4(1.0, 0.0, 0.0, 0.0);
}
bool hitsPlanet = (rayPlanetIntersect.x <= rayPlanetIntersect.y) && rayPlanetIntersect.x > 0.0;
float start = insideAtmosphere ? 0.0 : rayAtmosphereIntersect.x;
if (heightParameters[0] < reducedPlanetRadius) {
if (dot(rayDir, normalize(cameraPos)) < -0.025) {
return vec4(1.0, 0.0, 0.0, 0.0);
}
start = rayPlanetIntersect.y;
}
float end = hitsPlanet ? rayPlanetIntersect.x : rayAtmosphereIntersect.y;
return vec4(0.0, hitsPlanet ? 1.0 : 0.0, start, end);
}`)}function z(e,a){e.include(y);let s=6;e.uniforms.add(new l("cameraPosition",P=>P.camera.eye)),e.constants.add("betaRayleigh","vec3",m),e.constants.add("betaCombined","vec3",g),e.constants.add("betaMie","float",d),e.code.add(t`
    vec3 raymarchAtmosphere(vec3 cameraPos, vec3 rayDir, vec3 lightDir, float terrainDepth) {
      vec4 ray = planetIntersect(cameraPos, rayDir);
      if(ray.x == 1.0) {
        return vec3(0);
      }
      ${r(a,"if (terrainDepth != -1.0) { ray.w = terrainDepth; }")}

      vec3 samplePoint = cameraPos + rayDir * ray.w;
      float multiplier = ray.y == 1.0 ? -1.0 : 1.0;

      vec3 scattering = vec3(0);
      float scaleFract = (length(samplePoint) - radii[0]) / scaleHeight;
      float lastOpticalDepth = getOpticalDepth(samplePoint, rayDir, scaleFract);
      float stepSize = (ray.w - ray.z) / ${t.float(s)};

      for (int i = 0; i < ${t.int(s)}; i++) {
        samplePoint -= stepSize * rayDir;
        scaleFract = (length(samplePoint) - radii[0]) / scaleHeight;
        float opticalDepth = multiplier * getOpticalDepth(samplePoint, rayDir * multiplier, scaleFract);

        if (i > 0) {
          scattering *= exp(-(mix(betaCombined, betaRayleigh, 0.5) + betaMie) * max(0.0, (opticalDepth - lastOpticalDepth)));
          ${r(!a,"scattering *= mix(2.5, 1.0, clamp((length(cameraPos) - radii[0]) / 50e3, 0.0, 1.0))")};
        }

        if (dot(normalize(samplePoint), lightDir) > -0.3) {
          float scale = exp(-scaleFract);
          float lightDepth = getOpticalDepth(samplePoint, lightDir, scaleFract);
          scattering += scale * exp(-(betaCombined + betaMie) * lightDepth);
          ${r(!a,"scattering += scale * exp(-(0.25 * betaCombined ) * lightDepth);")}
        }
        lastOpticalDepth = opticalDepth;
      }

      float mu = dot(rayDir, lightDir);
      float mumu = 1.0 + mu * mu;

      float phaseRayleigh = 0.0596831 * mumu;
      ${a?"return 3.0 * scattering * stepSize * phaseRayleigh * betaRayleigh;":t`const float g = 0.8;
             const float gg = g * g;
             float phaseMie = 0.1193662 * ((1.0 - gg) * mumu) / (pow(1.0 + gg - 2.0 * mu * g, 1.5) * (2.0 + gg));
             phaseMie = clamp(phaseMie, 0.0, 128.0);
             return 3.0 * scattering * stepSize * (phaseRayleigh * betaRayleigh + 0.025 * phaseMie * betaMie);`}
    }`)}export{f as a,z as b};
