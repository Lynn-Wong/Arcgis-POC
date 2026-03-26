import{c as g}from"./chunk-PZ34UK7X.js";import{a as h}from"./chunk-T32QXVA7.js";import{a as s}from"./chunk-JIVOQNH4.js";import{a as r}from"./chunk-2XDZ5QNL.js";import{a as o}from"./chunk-UUP4FBYC.js";import{a as c}from"./chunk-6QJXCAOV.js";import{b as n}from"./chunk-RL4CZUGQ.js";var l=class extends r{constructor(i,e){super(i,"ivec2",1,(v,d,u)=>v.setUniform2iv(i,e(d,u)))}};function V(t){let{vertex:i}=t;i.uniforms.add(new h("coverageTexture",e=>e.coverageTexture),new l("highlightRenderCellCount",e=>n(a,e.horizontalCellCount,e.verticalCellCount)),new l("highlightTextureResolution",({highlightTexture:e})=>n(a,e.descriptor.width,e.descriptor.height)),new s("highlightLevel",e=>e.highlightLevel)).constants.add("cellSize","int",g),t.varyings.add("sUV","vec2"),t.varyings.add("vOutlinePossible","float"),i.code.add(o`const ivec2 cellVertices[4] = ivec2[4](ivec2(0,0), ivec2(1,0), ivec2(0,1), ivec2(1,1));`),i.main.add(o`int cellIndex = gl_InstanceID;
int cellX = cellIndex % highlightRenderCellCount[0];
int cellY = (cellIndex - cellX) / highlightRenderCellCount[0];
ivec2 cellPos = ivec2(cellX, cellY);
uvec2 covTexel = texelFetch(coverageTexture, cellPos, 0).rg;
int channelIndex = (highlightLevel >> 2) & 3;
uint channelValue = covTexel[channelIndex];
int highlightIndex = (highlightLevel & 3) << 1;
bool covered = ((channelValue >> highlightIndex) & 1u) == 1u;
if (!covered) {
gl_Position = vec4(0.0);
return;
}
vOutlinePossible = (((channelValue >> highlightIndex) & 2u) == 2u) ? 1.0 : 0.0;
ivec2 iPosInCell = cellVertices[gl_VertexID];
vec2 sPos = vec2(cellPos * cellSize + iPosInCell * (cellSize));
vec2 vPos = sPos / vec2(highlightTextureResolution);
sUV = vPos;
gl_Position = vec4(2.0 * vPos - vec2(1.0), 0.0, 1.0);`)}var a=c();export{V as a};
