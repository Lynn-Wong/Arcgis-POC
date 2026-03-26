import{a as s}from"./chunk-2YSWRJRO.js";import{a as f}from"./chunk-QF5M5KTV.js";import{a as o}from"./chunk-45K2AY22.js";import{a as r}from"./chunk-UUP4FBYC.js";function a(){let e=new f;return e.include(s),e.fragment.uniforms.add(new o("blendWeightsTexture",t=>t.inputTexture),new o("colorTexture",t=>t.color)),e.fragment.main.add(r`vec2 resolution = 1.0 / vec2(textureSize(colorTexture, 0));
vec4 offsets = vec4(uv.x + resolution.x, uv.y, uv.x, uv.y - resolution.y);
vec4 a;
a.rb = texture(blendWeightsTexture, uv).rb;
a.g = texture(blendWeightsTexture, offsets.zw).g;
a.a = texture(blendWeightsTexture, offsets.xy).a;
if ( dot(a, vec4(1.0)) < 1e-5 ) {
fragColor = texture( colorTexture, uv, 0.0 );
} else {
vec2 offset;
offset.x = a.a > a.b ? a.a : -a.b;
offset.y = a.g > a.r ? -a.g : a.r;
if ( abs( offset.x ) > abs( offset.y )) {
offset.y = 0.0;
} else {
offset.x = 0.0;
}
vec4 C = texture( colorTexture, uv, 0.0 );
vec4 Cop = texture( colorTexture, uv + sign( offset ) * resolution.xy, 0.0 );
float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );
fragColor = mix(C, Cop, s);
}`),e}var i=Object.freeze(Object.defineProperty({__proto__:null,build:a},Symbol.toStringTag,{value:"Module"}));export{a,i as b};
