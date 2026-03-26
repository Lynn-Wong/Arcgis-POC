import{a as c}from"./chunk-T32QXVA7.js";import{a as o}from"./chunk-2YSWRJRO.js";import{a as l}from"./chunk-L7NOU4T2.js";import{a as u}from"./chunk-QF5M5KTV.js";import{a as r}from"./chunk-UUP4FBYC.js";var i=class extends l{};function s(){let e=new u,{outputs:x,fragment:t}=e;return e.include(o),t.uniforms.add(new c("highlightTexture",d=>d.highlightTexture)),t.constants.add("outlineWidth","int",Math.ceil(a)),t.constants.add("cellSize","int",n),x.add("fragGrid","uvec2"),t.main.add(r`ivec2 inputTextureSize = textureSize(highlightTexture, 0);
ivec2 cellBottomLeftCornerInput = ivec2(ivec2(floor(gl_FragCoord.xy) * vec2(cellSize)));
ivec2 coordMid =  cellBottomLeftCornerInput + ivec2(cellSize >> 1);
uvec2 centreTexel = texelFetch(highlightTexture, coordMid, 0).rg & uvec2(0x55u);
float marginSquare = float(outlineWidth*outlineWidth);
uvec2 outputValue = centreTexel & uvec2(0x55u);
for(int y = -outlineWidth; y <= cellSize + outlineWidth; y+=2) {
int dy = y < 0 ? -y : y > cellSize ? y-cellSize : 0;
int xMargin = dy > 0 ? int(ceil(sqrt(marginSquare - float(dy*dy)))) : outlineWidth;
for(int x = -xMargin; x <= cellSize + xMargin; x+=2) {
ivec2 coord = cellBottomLeftCornerInput + ivec2(x, y);
uvec2[4] texels = uvec2[4] (
texelFetch(highlightTexture,coord+ivec2(0,0),0).rg & uvec2(0x55u),
texelFetch(highlightTexture,coord+ivec2(1,0),0).rg & uvec2(0x55u),
texelFetch(highlightTexture,coord+ivec2(0,1),0).rg & uvec2(0x55u),
texelFetch(highlightTexture,coord+ivec2(1,1),0).rg & uvec2(0x55u)
);
if (texels[0] == texels[1] && texels[1] == texels[2] && texels[2] == texels[3] && texels[3] ==  centreTexel) {
continue;
}
for (int i=0; i<4; ++i){
outputValue |= ((texels[i] ^ centreTexel) << 1);
outputValue |= texels[i];
}
}
}
fragGrid = outputValue;`),e}var n=32,a=9,h=.4,S=Object.freeze(Object.defineProperty({__proto__:null,HighlightDownsampleDrawParameters:i,blurSize:h,build:s,gridCellPixelSize:n,outlineSize:a},Symbol.toStringTag,{value:"Module"}));export{i as a,s as b,n as c,a as d,h as e,S as f};
