import{a as u}from"./chunk-2YSWRJRO.js";import{a as m}from"./chunk-L7NOU4T2.js";import{a as l}from"./chunk-QF5M5KTV.js";import{a as s}from"./chunk-45K2AY22.js";import{a,b as n}from"./chunk-UUP4FBYC.js";var i=class extends m{};function d(c){let r=new l;r.include(u);let{hasEmitters:t,dimEmissive:f}=c,o=r.fragment;return o.uniforms.add(new s("colorTexture",e=>e.colorTexture),new s("alphaTexture",e=>e.alphaTexture)),r.outputs.add("fragColor","vec4",0),t&&r.outputs.add("fragEmission","vec4",1),f?(o.main.add(a`float srcAlpha = texture(alphaTexture, uv).r;
vec4 srcColor = texture(colorTexture, uv);
srcColor.rgb = clamp(srcColor.rgb, vec3(0.0), srcColor.rgb);
vec3 dimming = srcAlpha > 1.0 ? mix(vec3(1.0), srcColor.rgb, 1.0 / srcAlpha) : mix(vec3(1.0), srcColor.rgb, srcAlpha);
fragEmission = vec4(dimming, 0.0);`),r):(o.uniforms.add(new s("frontFaceTexture",e=>e.frontFaceTexture)),t&&(o.uniforms.add(new s("emissionTexture",e=>e.emissionTexture)),o.uniforms.add(new s("emissionFrontFaceTexture",e=>e.emissionFrontFaceTexture))),o.main.add(a`
      float srcAlpha = texture(alphaTexture, uv).r;
      if(srcAlpha == 0.0){
        fragColor = vec4(0.0);
        ${n(t,"fragEmission = vec4(0.0);")}
        return;
      }

      vec4 srcColor = texture(colorTexture, uv);
      vec4 frontFace = texture(frontFaceTexture, uv);
      fragColor = vec4(mix(srcColor.rgb / srcAlpha, frontFace.rgb, frontFace.a), 1.0 - srcColor.a);

      ${n(t,`vec4 emission = texture(emissionTexture, uv);
         vec4 emissionFrontFace = texture(emissionFrontFaceTexture, uv);

         // Modulate transparent emitter by front faces. This case is important for surfaces which contain emitter and 
         // non-emitter at the same time. Non-emitter surface parts need to modulate emissions as well.
         emission.rgb = emission.rgb * (1.0 - frontFace.a);

         fragEmission = vec4(mix(emission.rgb / srcAlpha, emissionFrontFace.rgb, emissionFrontFace.a), 1.0 - srcColor.a);`)}
    `),r)}var F=Object.freeze(Object.defineProperty({__proto__:null,OITBlendPassParameters:i,build:d},Symbol.toStringTag,{value:"Module"}));export{i as a,d as b,F as c};
