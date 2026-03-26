import{a as l}from"./chunk-UCUYKYKQ.js";import{c as p,d as m}from"./chunk-4SSBS2W2.js";import{a as r}from"./chunk-2YSWRJRO.js";import{a as s}from"./chunk-R6IIY54E.js";import{a as n}from"./chunk-QF5M5KTV.js";import{a as d}from"./chunk-UUP4FBYC.js";var u=255,h=1/u;function c(i){let a=new n,{fragment:e}=a;a.include(r),a.include(l),a.include(p),e.uniforms.add(new m("shadowMap",t=>t.shadowMap.depthTexture),new s("depthMap",t=>t.depth?.attachment)),e.constants.add("sampleValue","float",h);let o=i.index===1?"vec2":"float";return a.outputs.add("sampleCount",o),e.main.add(d`
    sampleCount = ${o}(0.0);

    vec3 uvzShadow = calculateUVZShadowFromDepth(uv, textureSize(shadowMap,0), depthMap);
    if (uvzShadow.z < 0.0) {
      return;
    }

    // The shadow map sampler returns a value between 0 and 1, we take the midpoint as we count discrete samples
    bool shadow = readShadowMapUVZ(uvzShadow, shadowMap) > 0.5;

    if (shadow) {
      sampleCount = ${o}(sampleValue); // Add 1 to the sample count
    }
  `),a}var z=Object.freeze(Object.defineProperty({__proto__:null,ShadowCastMaxSamples:u,build:c},Symbol.toStringTag,{value:"Module"}));export{u as a,c as b,z as c};
