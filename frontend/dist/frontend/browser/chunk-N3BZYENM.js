import{a as n}from"./chunk-Y6XGMUC4.js";import{a as s}from"./chunk-R6IIY54E.js";import{a as c}from"./chunk-C4GB2D3W.js";import{a as r}from"./chunk-2XDZ5QNL.js";import{a as g}from"./chunk-UUP4FBYC.js";var d=class extends r{constructor(t,i){super(t,"ivec2",0,(l,o)=>l.setUniform2iv(t,i(o)))}};var u=class extends r{constructor(t,i){super(t,"usampler2D",0,(l,o)=>l.bindTexture(t,i(o)))}};function B(h,t){let{fragment:i}=h,{output:l,draped:o,hasHighlightMixTexture:a}=t;l===9?(i.uniforms.add(new n("highlightLevel",e=>e.highlightLevel??0),new d("highlightMixOrigin",e=>e.highlightMixOrigin)),h.outputs.add("fragHighlight","uvec2",0),h.include(c),a?i.uniforms.add(new u("highlightMixTexture",e=>e.highlightMixTexture)).code.add(g`uvec2 getAccumulatedHighlight() {
return texelFetch(highlightMixTexture, ivec2(gl_FragCoord.xy) - highlightMixOrigin, 0).rg;
}
void outputHighlight(bool occluded) {
if (highlightLevel == 0) {
uint bits = occluded ? 3u : 1u;
fragHighlight = uvec2(bits, 0);
} else {
int ll = (highlightLevel & 3) << 1;
int li = (highlightLevel >> 2) & 3;
uint bits;
if (occluded) {
bits = 3u << ll;
} else {
bits = 1u << ll;
}
uvec2 combinedHighlight = getAccumulatedHighlight();
combinedHighlight[li] |= bits;
fragHighlight = combinedHighlight;
}
}`):i.code.add(g`void outputHighlight(bool occluded) {
uint bits = occluded ? 3u : 1u;
fragHighlight = uvec2(bits, 0);
}`),o?i.code.add(g`bool isHighlightOccluded() {
return false;
}`):i.uniforms.add(new s("depthTexture",e=>e.mainDepth)).code.add(g`bool isHighlightOccluded() {
float sceneDepth = texelFetch(depthTexture, ivec2(gl_FragCoord.xy), 0).x;
return gl_FragCoord.z > sceneDepth + 5e-7;
}`),i.code.add(g`void calculateOcclusionAndOutputHighlight() {
outputHighlight(isHighlightOccluded());
}`)):i.code.add(g`void calculateOcclusionAndOutputHighlight() {}`)}export{B as a};
