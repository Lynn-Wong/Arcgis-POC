import{a as x}from"./chunk-2T54LQ6Y.js";import{a as g}from"./chunk-RXFGTBOJ.js";import{a as d}from"./chunk-2YSWRJRO.js";import{a as m}from"./chunk-L7NOU4T2.js";import{a as p}from"./chunk-QF5M5KTV.js";import{a as f}from"./chunk-H2ASV3YO.js";import{a as v}from"./chunk-45K2AY22.js";import{a as r}from"./chunk-UUP4FBYC.js";import{g as c}from"./chunk-R7CRKYC2.js";var i=class extends m{constructor(){super(...arguments),this.blurRadius=x.sunny}};function S(a){let t=new p,s=t.fragment;t.include(d),s.include(g),s.uniforms.add(new v("colorTexture",e=>e.emissionsToDownsample),new f("blurRadius",e=>e.blurRadius));let l="",o=15;for(let e=0;e<o;e++)l+=`locations1D[${e}] = ${(e/(o-1)*2-1).toFixed(3).toString()};`;let D=2,n="";for(let e=0;e<o;e++)n+=`locations1DWeights[${e}] = ${c(e-Math.floor(o/2),D).toFixed(7).toString()};`;let u=a.glowStage===0;return s.code.add(r`
    float locations1D[${r.int(o)}];
    float locations1DWeights[${r.int(o)}];

    vec3 blurUniformSamples(sampler2D toBlur) {
      vec3 res = vec3(0.0);
      vec2 size = vec2(textureSize(toBlur, 0));
      vec2 aspectCorrection = vec2(1.0, size.x / size.y);
      vec2 uvInPixel = uv * size;

      ${l}
      ${n}
      vec2 pixelCenterShift = 0.5 / size;

      for(int i=0;i < ${r.int(o)}; i++) {
        float uv1D = locations1D[i] + ${u?"pixelCenterShift.x":"pixelCenterShift.y"};
        vec2 uvOffset = ${u?"vec2(uv1D, 0.0)":"vec2(0.0, uv1D)"};

        vec2 uvDistorted = uv + uvOffset * blurRadius * aspectCorrection;
        vec3 sampleColor = texture(toBlur, uvDistorted).rgb;
        res += sampleColor * locations1DWeights[i];
      }
      return res;
    }
  `).main.add(r`fragColor = vec4(blurUniformSamples(colorTexture), 0.0);`),t}var R=Object.freeze(Object.defineProperty({__proto__:null,GlowBlurPassParameters:i,build:S},Symbol.toStringTag,{value:"Module"}));export{i as a,S as b,R as c};
