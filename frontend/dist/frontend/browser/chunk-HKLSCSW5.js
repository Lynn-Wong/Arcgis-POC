import{a as d}from"./chunk-OD45X2ZY.js";import{d as l,e as s}from"./chunk-PZ34UK7X.js";import{a}from"./chunk-T32QXVA7.js";import{a as n}from"./chunk-JIVOQNH4.js";import{a as c}from"./chunk-5EK3WLWJ.js";import{a as u}from"./chunk-C4GB2D3W.js";import{a as g}from"./chunk-QF5M5KTV.js";import{a as h}from"./chunk-H2ASV3YO.js";import{a as r}from"./chunk-45K2AY22.js";import{a as o}from"./chunk-UUP4FBYC.js";function f(){let t=new g;t.include(d);let{fragment:i}=t;return i.uniforms.add(new r("blurInput",e=>e.highlightBlurTexture),new c("blurSize",e=>e.blurSize),new a("highlightTexture",e=>e.highlightTexture),new r("highlightOptionsTexture",e=>e.highlightOptionsTexture),new n("highlightLevel",e=>e.highlightLevel),new h("occludedIntensityFactor",e=>e.occludedFactor)),i.constants.add("inner","float",1-(l-s)/l),t.include(u),i.main.add(o`vec2 highlightTextureSize = vec2(textureSize(highlightTexture,0));
vec2 uv = sUV;
vec2 center = texture(blurInput, uv).rg;
vec2 blurredHighlightValue = (vOutlinePossible == 0.0)
? center
: center * 0.204164
+ texture(blurInput, uv + blurSize * 1.407333).rg * 0.304005
+ texture(blurInput, uv - blurSize * 1.407333).rg * 0.304005
+ texture(blurInput, uv + blurSize * 3.294215).rg * 0.093913
+ texture(blurInput, uv - blurSize * 3.294215).rg * 0.093913;
float highlightIntensity = blurredHighlightValue.r;
float occlusionWeight = blurredHighlightValue.g;
if (highlightIntensity <= 0.01) {
discard;
}
vec4 fillColor    = texelFetch(highlightOptionsTexture, ivec2(highlightLevel, 0), 0);
vec4 outlineColor = texelFetch(highlightOptionsTexture, ivec2(highlightLevel, 1), 0);
uvec2 centerTexel = texelFetch(highlightTexture, ivec2(uv * highlightTextureSize), 0).rg;
uint centerBits = readLevelBits(centerTexel, highlightLevel);
bool centerFilled = (centerBits & 1u) == 1u;
bool centerOccluded = (centerBits & 3u) == 3u;
bool occluded = centerOccluded || (0.5 * highlightIntensity < occlusionWeight);
float occlusionFactor = occluded ? occludedIntensityFactor : 1.0;
float outlineFactor = centerFilled ? 1.0 : smoothstep(0.0, inner, highlightIntensity);
float fillFactor = centerFilled ? 1.0 : 0.0;
vec4 baseColor = mix(outlineColor, fillColor, fillFactor);
float intensity = baseColor.a * occlusionFactor * outlineFactor;
fragColor = vec4(baseColor.rgb, intensity);`),t}var z=Object.freeze(Object.defineProperty({__proto__:null,build:f},Symbol.toStringTag,{value:"Module"}));export{f as a,z as b};
