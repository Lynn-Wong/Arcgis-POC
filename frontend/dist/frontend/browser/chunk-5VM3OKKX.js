import{b as n}from"./chunk-2T54LQ6Y.js";import{a as w,b as T}from"./chunk-GXZTRDQK.js";import{a as v}from"./chunk-GWGHQQZG.js";import{a as g}from"./chunk-YZTK6GAD.js";import{a as p}from"./chunk-JIVOQNH4.js";import{a as D}from"./chunk-RXFGTBOJ.js";import{a as t}from"./chunk-GMXW7EMM.js";import{a as u}from"./chunk-R6IIY54E.js";import{a as x}from"./chunk-JMYO2YOI.js";import{a as f}from"./chunk-QF5M5KTV.js";import{a as l}from"./chunk-H2ASV3YO.js";import{a as o}from"./chunk-45K2AY22.js";import{a as s,b as a}from"./chunk-UUP4FBYC.js";var d=class extends w{constructor(){super(...arguments),this.lodFactors=[0,0,0,0,0,0],this.glowLod=-1,this.dispersionWeight=1,this.distanceModifier=1e-4}};function F(m){let i=new f,r=i.fragment,{blurEnabled:h,tonemappingEnabled:c}=m;return i.include(v,{needUVs:!0,needEyeDirection:!0}),r.include(D),r.include(T),r.include(x),i.outputs.add("fragColor","vec4",0),i.outputs.add("fragEmission","vec3",1),r.include(g),r.uniforms.add(new o("colorTexture",e=>e.color),new o("emissionTexture",e=>e.emission)),h?(r.uniforms.add(new u("depthTexture",e=>e.mainDepth),new l("distanceModifier",e=>e.distanceModifier),new o("lodTexture0",e=>e.lodTexture0),new o("lodTexture1",e=>e.lodTexture1),new o("lodTexture2",e=>e.lodTexture2),new o("lodTexture3",e=>e.lodTexture3),new o("lodTexture4",e=>e.lodTexture4),new p("glowLod",e=>e.glowLod),new t("minDisperse",()=>n.minDisperse.presets,6),new t("maxDisperse",()=>n.maxDisperse.presets,6),new l("dispersionWeight",e=>e.dispersionWeight)).main.add(s`
    vec4 color = texture(colorTexture, uv);
    color = vec4(linearizeGamma(color.rgb), color.a);

    vec3 lod0 = texture(emissionTexture, uv).rgb;
    vec3 lod1 = texture(lodTexture0, uv).rgb;
    vec3 lod2 = texture(lodTexture1, uv).rgb;
    vec3 lod3 = texture(lodTexture2, uv).rgb;
    vec3 lod4 = texture(lodTexture3, uv).rgb;
    vec3 lod5 = texture(lodTexture4, uv).rgb;

    float terrainDepth = -1.0;
    float depthSample = depthFromTexture(depthTexture, uv);
    if(depthSample < 1.0 && depthSample > 0.0){
      vec3 cameraSpaceRay = normalize(eyeDir);
      cameraSpaceRay /= cameraSpaceRay.z;
      cameraSpaceRay *= linearizeDepth(depthSample);
      terrainDepth = max(0.0, length(cameraSpaceRay));
    }
    vec3 rayDir = normalize(worldRay);
    float dispersionByDistance = getDistanceFalloff(terrainDepth, rayDir, distanceModifier);
    float dispersionPerPixel = dispersionWeight * dispersionByDistance;

    float lodFactor0 = mix(minDisperse[0], maxDisperse[0], dispersionPerPixel);
    float lodFactor1 = mix(minDisperse[1], maxDisperse[1], dispersionPerPixel);
    float lodFactor2 = mix(minDisperse[2], maxDisperse[2], dispersionPerPixel);
    float lodFactor3 = mix(minDisperse[3], maxDisperse[3], dispersionPerPixel);
    float lodFactor4 = mix(minDisperse[4], maxDisperse[4], dispersionPerPixel);
    float lodFactor5 = mix(minDisperse[5], maxDisperse[5], dispersionPerPixel);

    vec3 emission = lodFactor0 * lod0;
    emission += lodFactor1 * lod1;
    emission += lodFactor2 * lod2;
    emission += lodFactor3 * lod3;
    emission += lodFactor4 * lod4;
    emission += lodFactor5 * lod5;

    // only for glow editor lod debugging
    emission = glowLod == 0 ? lodFactor0 * lod0 : glowLod == 1 ? lodFactor1 * lod1 : glowLod == 2 ? lodFactor2 * lod2 : glowLod == 3 ? lodFactor3 * lod3 : glowLod == 4 ? lodFactor4 * lod4 : glowLod == 5 ? lodFactor5 * lod5 : emission;

    fragEmission = emission;
    // tonemapping is only applied to the emissive part since main color values are not in HDR.
    ${a(c,"emission = tonemapACES(emission);")}

    fragColor = delinearizeGamma(vec4(color.rgb + emission.rgb, color.w));
  `),i):(r.main.add(s`
      vec4 color = texture(colorTexture, uv);
      color = vec4(linearizeGamma(color.rgb), color.a);

      // emission is already in linear color space here.
      vec3 emission = texture(emissionTexture, uv).rgb;

      ${a(c,"emission = tonemapACES(emission);")}
      fragColor = delinearizeGamma(vec4(color.rgb + emission, color.w));
    `),i)}var W=Object.freeze(Object.defineProperty({__proto__:null,GlowCompositionPassParameters:d,build:F},Symbol.toStringTag,{value:"Module"}));export{d as a,F as b,W as c};
