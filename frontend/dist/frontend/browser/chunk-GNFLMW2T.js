import{a as x}from"./chunk-UCUYKYKQ.js";import{a as v}from"./chunk-T32QXVA7.js";import{c as f,d as r}from"./chunk-4SSBS2W2.js";import{a as u}from"./chunk-YWNUAOKV.js";import{a as g}from"./chunk-2YSWRJRO.js";import{a as n}from"./chunk-J6IEXWQ2.js";import{a as p}from"./chunk-YQXWXQD3.js";import{a as d}from"./chunk-R6IIY54E.js";import{a as s}from"./chunk-JMYO2YOI.js";import{a as m}from"./chunk-QF5M5KTV.js";import{a}from"./chunk-H2ASV3YO.js";import{a as i}from"./chunk-UUP4FBYC.js";import{t as h,x as c}from"./chunk-WENEM4NK.js";import{a as l}from"./chunk-JARU7KSM.js";function P(o){let t=o.fragment;o.include(u),t.include(s),t.code.add(i`vec3 normalFromDepth(sampler2D depthMap, vec3 pixelPos, vec2 fragCoord, vec2 uv) {
ivec2 iuv = ivec2(uv * vec2(textureSize(depthMap, 0)));
float leftPixelDepth = linearizeDepth(texelFetch(depthMap, iuv + ivec2(-1, 0), 0).r);
float rightPixelDepth = linearizeDepth(texelFetch(depthMap, iuv + ivec2(1, 0), 0).r);
float bottomPixelDepth = linearizeDepth(texelFetch(depthMap, iuv + ivec2(0, -1), 0).r);
float topPixelDepth = linearizeDepth(texelFetch(depthMap, iuv + ivec2(0, 1), 0).r);
bool pickLeft = abs(pixelPos.z - leftPixelDepth) < abs(pixelPos.z - rightPixelDepth);
bool pickBottom = abs(pixelPos.z - bottomPixelDepth) < abs(pixelPos.z - topPixelDepth);
vec3 fragCoordHorizontal = pickLeft
? vec3(fragCoord + vec2(-1.0, 0.0), leftPixelDepth)
: vec3(fragCoord + vec2(1.0, 0.0), rightPixelDepth);
vec3 fragCoordVertical = pickBottom
? vec3(fragCoord + vec2(0.0, -1.0), bottomPixelDepth)
: vec3(fragCoord + vec2(0.0, 1.0), topPixelDepth);
vec3 verticalPixelPos = reconstructPosition(fragCoordHorizontal.xy, fragCoordHorizontal.z);
vec3 horizontalPixelPos = reconstructPosition(fragCoordVertical.xy, fragCoordVertical.z);
vec3 normal = normalize(cross(verticalPixelPos - pixelPos, horizontalPixelPos - pixelPos));
return pickLeft == pickBottom ? normal : -normal;
}`)}var z=.025;function S(){let o=new m;o.include(x),o.include(f),o.include(g),o.include(P);let t=o.fragment;return t.uniforms.add(new r("shadowMapExcludingHighlight",e=>e.shadowMap.getSnapshot(1)),new r("shadowMapHighlight",e=>e.shadowMap.getSnapshot(0)),new d("depthMap",e=>e.depth?.attachment),new v("highlightTexture",e=>e.highlightTexture),new n("uColor",e=>e.shadowColor),new a("opacity",e=>e.shadowOpacity),new a("occludedOpacity",e=>e.occludedShadowOpacity),new a("terminationFactor",e=>e.opacityElevation*e.dayNightTerminator),new p("lightingMainDirectionView",({lighting:e,camera:D})=>h(w,c(w,e.mainLight.direction,D.viewInverseTransposeMatrix)))),t.main.add(i`
    ivec2 highlightTextureSize = textureSize(highlightTexture, 0);
    ivec2 highlightIUV = ivec2(uv * vec2(highlightTextureSize));
    uvec2 highlightInfo = texelFetch(highlightTexture, highlightIUV, 0).rg;

    fragColor = vec4(0.0);

    // Calculate bit mask to check if pixel is highlit unoccluded at any level
    uint ored = (highlightInfo.r << 0) | (highlightInfo.g << 8);

    bool visiblyHighlighted = ((ored & ~(ored >> 1)) & (1u+4u+16u+64u)) != 0u;
    if (visiblyHighlighted) {
      return;
    }

    vec4 currentPixelPos;
    vec3 uvzShadow = calculateUVZShadowAndPixelPosFromDepth(uv, textureSize(shadowMapHighlight,0), depthMap, currentPixelPos);
    if (uvzShadow.z < 0.0) {
      return;
    }

    float shadowHighlightFactor = readShadowMapUVZ(uvzShadow, shadowMapHighlight);
    if (shadowHighlightFactor == 0.0) {
      return;
    }

    float shadowExcludingHighlightFactor = readShadowMapUVZ(uvzShadow, shadowMapExcludingHighlight);

    vec3 normal = normalFromDepth(depthMap, currentPixelPos.xyz, gl_FragCoord.xy, uv);
    bool shaded = dot(normal, lightingMainDirectionView) < ${i.float(z)};

    float occludedFactor = max(shadowExcludingHighlightFactor, shaded ? 1.0 : 0.0);
    float fragOpacity = mix(opacity, occludedOpacity, occludedFactor);
    fragColor = vec4(uColor.rgb, uColor.a * fragOpacity * terminationFactor);
  `),o}var w=l(),j=Object.freeze(Object.defineProperty({__proto__:null,build:S},Symbol.toStringTag,{value:"Module"}));export{S as a,j as b};
