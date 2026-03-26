import{a as k}from"./chunk-EHDXC44A.js";import{a as M,b as s}from"./chunk-N7GGMD2W.js";import{a as _}from"./chunk-YWNUAOKV.js";import{a as F}from"./chunk-2YSWRJRO.js";import{a as r}from"./chunk-J6IEXWQ2.js";import{a as $}from"./chunk-L7NOU4T2.js";import{a as z}from"./chunk-YZ4IDPMQ.js";import{a as x}from"./chunk-QF5M5KTV.js";import{a as l}from"./chunk-H2ASV3YO.js";import{a as P}from"./chunk-45K2AY22.js";import{a as t,b as n}from"./chunk-UUP4FBYC.js";import{a as y}from"./chunk-6QJXCAOV.js";import{a as v,b as p,c}from"./chunk-YMQ4BGWF.js";var S=class extends ${constructor(a){super(),this._data=a,this.sampleScale=y(),this.opacityFromElevation=1,this.gradientColor=p(T),this.thresholdColor=p(U),this.bandedGradientColor=p(V),this.bandSize=.1,this.threshold=.5}get shadowCastMap(){return this._data.shadowCastTexture}},g=.7,f=50/255,T=c(0,0,1,g),U=c(1,0,0,g),V=c(f,f,f,g);function j(w){let a=new x,o=a.fragment;a.include(_),a.include(F);let{visualization:h}=w;o.constants.add("inverseSampleValue","float",k),o.uniforms.add(new P("shadowCastMap",e=>e.shadowCastMap),new z("sampleScale",e=>e.sampleScale),new l("opacityFromElevation",e=>e.opacityFromElevation));let C=h===2,d=h===3,E=h===1;switch(d&&o.include(M),h){case 0:o.uniforms.add(new r("uColor",e=>s(i,e.gradientColor)));break;case 1:o.uniforms.add(new r("uColor",e=>s(i,e.bandedGradientColor)),new l("bandSize",e=>e.bandSize));break;case 3:o.uniforms.add(new r("uColor",e=>s(i,e.thresholdColor)),new r("gradientColor",e=>s(i,e.gradientColor)),new l("threshold",e=>e.threshold));break;case 2:o.uniforms.add(new r("uColor",e=>s(i,e.thresholdColor)),new l("threshold",e=>e.threshold))}let{type:m,selector:b,thresholdStrengthSelector:u}=d?{type:"vec2",selector:"rg",thresholdStrengthSelector:"strength.x"}:{type:"float",selector:"r",thresholdStrengthSelector:"strength"};return o.main.add(t`
    ${m} numSamples = texture(shadowCastMap, uv).${b} * inverseSampleValue;

    fragColor = vec4(0.0);

    // early out if we do not have any samples in one or more channels
    if (dot(numSamples, ${m}(1)) < 1.0) {
      return;
    }

    // sampleScale is the number of total samples taken, so this brings strength to a 0-1 range.
    // note that sampleScale is always a vec2 even if we have only the primary channel.
    ${m} strength = numSamples * sampleScale.${b};

    // in threshold mode, step the strength to 0 if we are at or below the threshold, 1 otherwise.
    ${n(C||d,t`
      ${u} = 1.0 - step(${u}, threshold);
    `)}

    // bail out if we are below the threshold
    ${n(C,t`if (${u} == 0.0) { return; }`)}

    ${n(E,t`strength = ceil(strength / bandSize) * bandSize;`)}

    ${m} attenuation = opacityFromElevation * strength;

    // in ThresholdAndGradient mode we blend the threshold color on top of the gradient color
    fragColor = ${n(d,t`blendColorsPremultiplied(uColor * attenuation.r, gradientColor * attenuation.g)`,t`uColor * attenuation`)};
  `),a}var i=v(),R=Object.freeze(Object.defineProperty({__proto__:null,ShadowCastVisualizePassParameters:S,build:j},Symbol.toStringTag,{value:"Module"}));export{S as a,j as b,R as c};
