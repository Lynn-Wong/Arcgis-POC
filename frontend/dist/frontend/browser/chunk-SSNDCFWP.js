import{b as c}from"./chunk-5VGDBOMN.js";import{a as m}from"./chunk-QF5M5KTV.js";import{a as f}from"./chunk-H2ASV3YO.js";import{a}from"./chunk-UUP4FBYC.js";function R(i){let r=new m,{vertex:e,fragment:s,attributes:o,varyings:u}=r;c(e,i);let{isAttributeDriven:t,usesHalfFloat:d}=i;return o.add("position","vec3"),o.add("uv0","vec2"),t&&(o.add("featureAttribute","float"),u.add("attributeValue","float")),d&&s.constants.add("compressionFactor","float",.25),u.add("unitCirclePos","vec2"),e.uniforms.add(new f("radius",({resolutionForScale:n,searchRadius:v},{camera:l,screenToWorldRatio:p,overlayStretch:b})=>2*v*(n===0?1:n/p)*l.pixelRatio/l.fullViewport[2]/b)),e.main.add(a`
    unitCirclePos = uv0;

    vec4 posProj = proj * (view * vec4(${"position"}, 1.0));
    vec4 quadOffset = vec4(unitCirclePos * radius, 0.0, 0.0);

    ${t?a`attributeValue = ${"featureAttribute"};`:""}
    gl_Position = posProj + quadOffset;
  `),s.main.add(a`
    float radiusRatioSquared = dot(unitCirclePos, unitCirclePos);
    if (radiusRatioSquared > 1.0) {
      fragColor = vec4(0.0);
    }
    else {
      float oneMinusRadiusRatioSquared = 1.0 - radiusRatioSquared;
      float density = oneMinusRadiusRatioSquared * oneMinusRadiusRatioSquared ${t?a` * attributeValue`:""} ${d?a` * compressionFactor`:""};
      fragColor = vec4(density);
    }
  `),r}var C=Object.freeze(Object.defineProperty({__proto__:null,build:R},Symbol.toStringTag,{value:"Module"}));export{R as a,C as b};
