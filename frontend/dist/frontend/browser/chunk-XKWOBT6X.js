import{a as S,b as v}from"./chunk-GXZTRDQK.js";import{a as D}from"./chunk-GWGHQQZG.js";import{a as d}from"./chunk-YZTK6GAD.js";import{a as h}from"./chunk-RXFGTBOJ.js";import{a as l}from"./chunk-R6IIY54E.js";import{a as c}from"./chunk-2NXJIMQ2.js";import{a as p}from"./chunk-JMYO2YOI.js";import{a as u}from"./chunk-QF5M5KTV.js";import{a as r}from"./chunk-H2ASV3YO.js";import{a as g}from"./chunk-45K2AY22.js";import{a,b as f}from"./chunk-UUP4FBYC.js";import{a as m}from"./chunk-JARU7KSM.js";var i=class extends S{constructor(){super(...arguments),this.color=m(),this.strength=4e-6,this.amount=0,this.fogColorDistanceWeight=1}};function y(n){let t=new u;t.include(D,{needUVs:!0,needEyeDirection:!0});let o=t.fragment,{hasEmissive:s}=n;return o.uniforms.add(new l("depthTexture",e=>e.mainDepth),new r("fogStrength",e=>e.strength),new r("fogAmount",e=>e.amount),new c("fogColor",e=>e.color),new r("fogColorDistanceWeight",e=>e.fogColorDistanceWeight)),s&&o.uniforms.add(new g("emissionTexture",e=>e.emission)),o.include(v),o.include(h),o.include(d),o.include(p),o.main.add(a`
    vec3 rayDir = normalize(worldRay);
    float terrainDepth = -1.0;

    float depthSample = depthFromTexture(depthTexture, uv);
    if(depthSample < 1.0 && depthSample > 0.0){
      vec3 cameraSpaceRay = normalize(eyeDir);
      cameraSpaceRay /= cameraSpaceRay.z;
      cameraSpaceRay *= linearizeDepth(depthSample);
      terrainDepth = max(0.0, length(cameraSpaceRay));
    }

    float fogAmount = fogAmount * getDistanceFalloff(terrainDepth, rayDir, fogStrength);

    ${f(s,a`vec3 emission = texture(emissionTexture, uv).rgb;
           vec3 emissionDistanceCorrected = mix(emission, vec3(0.0), fogAmount * fogColorDistanceWeight);
           vec3 finalFogColor = fogColor * fogAmount + emissionDistanceCorrected;
           vec4 fog = vec4(finalFogColor, fogAmount);`,a`vec4 fog = vec4(fogColor, 1.0) * fogAmount;`)}
    fragColor = delinearizeGamma(vec4(tonemapACES(fog.rgb), fog.a));`),t}var _=Object.freeze(Object.defineProperty({__proto__:null,FogPassParameters:i,build:y},Symbol.toStringTag,{value:"Module"}));export{i as a,y as b,_ as c};
