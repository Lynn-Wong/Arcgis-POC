import{b as t}from"./chunk-5VGDBOMN.js";import{a as d}from"./chunk-J6IEXWQ2.js";import{a as l}from"./chunk-QF5M5KTV.js";import{a as g}from"./chunk-H2ASV3YO.js";import{a as o}from"./chunk-UUP4FBYC.js";function v(n){let i=new l,{vertex:a,fragment:c,attributes:e,varyings:s}=i;return t(a,n),e.add("position","vec3"),e.add("uv0","vec2"),s.add("vUV","vec2"),a.main.add(o`vUV = uv0;
gl_Position = proj * view * vec4(position, 1.0);`),c.uniforms.add(new d("backgroundColor",r=>r.backgroundColor),new d("gridColor",r=>r.gridColor),new g("gridWidth",r=>r.gridWidth)).main.add(o`const float LINE_WIDTH = 1.0;
vec2 uvScaled = vUV * gridWidth;
vec2 gridUV = (fract(uvScaled + 0.5) - 0.5) / (LINE_WIDTH * fwidth(uvScaled));
vec2 grid = (1.0 - step(0.5, gridUV)) * step(-0.5, gridUV);
grid.x *= step(0.5, uvScaled.x) * step(uvScaled.x, gridWidth - 0.5);
grid.y *= step(0.5, uvScaled.y) * step(uvScaled.y, gridWidth - 0.5);
float gridFade = max(grid.x, grid.y);
float gridAlpha = gridColor.a * gridFade;
fragColor =
vec4(backgroundColor.rgb * backgroundColor.a, backgroundColor.a) * (1.0 - gridAlpha) +
vec4(gridColor.rgb, 1.0) * gridAlpha;`),i}var S=Object.freeze(Object.defineProperty({__proto__:null,build:v},Symbol.toStringTag,{value:"Module"}));export{v as a,S as b};
