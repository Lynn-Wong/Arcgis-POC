import{a as g}from"./chunk-AB6LUEY5.js";import{a as m}from"./chunk-2NXJIMQ2.js";import{a as i}from"./chunk-L7NOU4T2.js";import{a as d}from"./chunk-YZ4IDPMQ.js";import{a}from"./chunk-H2ASV3YO.js";import{a as f}from"./chunk-45K2AY22.js";import{a as o,b as u}from"./chunk-UUP4FBYC.js";import{f as v}from"./chunk-6QJXCAOV.js";var p=class extends i{constructor(){super(...arguments),this.scale=1,this.offset=v}};function O(l){l.attributes.add("position","vec2"),l.attributes.add("uv0","vec2"),l.varyings.add("uv","vec2"),l.varyings.add("vuv","vec2"),l.vertex.uniforms.add(new a("scale",e=>e.scale),new d("offset",e=>e.offset)).main.add(o`gl_Position = vec4(position, 0.0, 1.0);
uv = uv0 * scale + offset;
vuv = uv0;`)}function x(l,e){let c=e.blendMode;c!==0&&(c===30&&l.code.add(o`float reflectBlend(in float cb, in float cl) {
return (cl == 1.0) ? cl : min(cb * cb / (1.0 - cl), 1.0);
}`),c!==6&&c!==13||l.code.add(o`float colorDodge(in float cb, in float cl) {
return (cb == 0.0) ? 0.0 : (cl == 1.0) ? 1.0 : min(1.0, cb / (1.0 - cl));
}`),c!==9&&c!==13||l.code.add(o`float colorBurn(in float cb, in float cl) {
return (cb == 1.0) ? 1.0 : (cl == 0.0) ? 0.0 : 1.0 - min(1.0, (1.0 - cb) / cl);
}`),c===10&&l.code.add(o`float overlay(in float cb, in float cl) {
return (1.0 - step(0.5, cl)) * (1.0 - 2.0 * (1.0 - cl ) * (1.0 - cb)) + step(0.5, cl) * (2.0 * cl * cb);
}`),c===12&&l.code.add(o`float hardLight(in float cb, in float cl) {
return (1.0 - step(0.5, cl)) * (2.0 * cl * cb) + step(0.5, cl) * (1.0 - 2.0 * (1.0 - cl) * (1.0 - cb));
}`),c===11&&l.code.add(o`float softLight(in float cb, in float cl) {
if (cl <= 0.5) {
return cb - (1.0 - 2.0 * cl) * cb * (1.0 - cb);
}
if (cb <= 0.25) {
return cb + (2.0 * cl - 1.0) * cb * ((16.0 * cb - 12.0) * cb + 3.0);
}
return cb + (2.0 * cl - 1.0) * (sqrt(cb) - cb);
}`),c===13&&l.code.add(o`float vividLight(in float cb, in float cl) {
return (1.0 - step(0.5, cl)) * colorBurn(cb, 2.0 * cl) + step(0.5, cl) * colorDodge(cb, (2.0 * (cl - 0.5)));
}`),c!==14&&c!==15&&c!==17&&c!==16||(l.code.add(o`float minv3(in vec3 c) {
return min(min(c.r, c.g), c.b);
}
float maxv3(in vec3 c) {
return max(max(c.r, c.g), c.b);
}
float lumv3(in vec3 c) {
return dot(c, vec3(0.3, 0.59, 0.11));
}
vec3 clipColor(vec3 color) {
float lum = lumv3(color);
float mincol = minv3(color);
float maxcol = maxv3(color);
if (mincol < 0.0) {
color = lum + ((color - lum) * lum) / (lum - mincol);
}
if (maxcol > 1.0) {
color = lum + ((color - lum) * (1.0 - lum)) / (maxcol - lum);
}
return color;
}
vec3 setLum(vec3 cbase, vec3 clum) {
return clipColor(cbase + vec3(lumv3(clum) - lumv3(cbase)));
}`),c!==14&&c!==15||l.code.add(o`float satv3(vec3 c) {
return maxv3(c) - minv3(c);
}
vec3 setLumSat(vec3 cbase, vec3 csat, vec3 clum)
{
float minbase = minv3(cbase);
float sbase = satv3(cbase);
float ssat = satv3(csat);
return setLum(sbase > 0.0 ? (cbase - minbase) * ssat / sbase : vec3(0.0), clum);
}`)),l.code.add(o`
    vec4 applyBlendMode(vec3 cl, float ol, vec3 cb, float ob) {
      ${c===8?o`return vec4(cl * ol * cb * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c===1?o`return vec4((cb + cl) * 0.5 * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c===2?o`return vec4(max(cb, cl) * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c===7?o`return vec4(min(cl, cb) * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c===3?o`return vec4(cl * ol + cb * ob, ol + ob);`:c===4?o`return clamp(vec4(cl.rgb + cb.rgb, ol + ob), 0.0, 1.0);`:c===28?o`return vec4(clamp(vec3(cb.rgb - cl.rgb), 0.0, 1.0), ob * ol);`:c===5?o`return vec4((cl + cb - cl * cb) * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c===26?o`return vec4(abs(cb - cl) * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c===29?o`return vec4((1.0 - cb) * ol * ob + cb * ob * (1.0 - ol), ob);`:c===18?o`return vec4(cl * ol * (1.0 - ob) + cb * ob, ol + ob - ol * ob);`:c===19?o`return vec4(cl * ol * (1.0 - ob) + cb * ob * ol, ol);`:c===21?o`return vec4(cb * ob * (1.0 - ol), ob * (1.0 - ol));`:c===22?o`return vec4(cl * ol * ob + cb * ob * (1.0 - ol), ob);`:c===24?o`return vec4(cl * ol * (1.0 - ob), ol * (1.0 - ob));`:c===25?o`return vec4(cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), ol * (1.0 - ob) + ob * (1.0 - ol));`:c===20?o`return vec4(cb * ob * ol, ol * ob);`:c===23?o`return vec4(cl * ol * ob, ol * ob);`:c===14?o`
          vec3 f = setLumSat(cl, cb, cb);
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c===15?o`
          vec3 f = setLumSat(cb, cl, cb);
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c===17?o`
          vec3 f = setLum(cl, cb);
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c===16?o`
          vec3 f = setLum(cb, cl);
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c===27?o`
          vec3 f = cl + cb - 2.0 * cl * cb;
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c===30?o`
          vec3 f = vec3(reflectBlend(cb.r, cl.r), reflectBlend(cb.g, cl.g), reflectBlend(cb.b, cl.b));
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c===6?o`
          vec3 f = vec3(colorDodge(cb.r, cl.r), colorDodge(cb.g, cl.g), colorDodge(cb.b, cl.b));
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c===9?o`
          vec3 f = vec3(colorBurn(cb.r, cl.r), colorBurn(cb.g, cl.g), colorBurn(cb.b, cl.b));
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c===10?o`
          vec3 f = vec3(overlay(cb.r, cl.r), overlay(cb.g, cl.g), overlay(cb.b, cl.b));
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c===11?o`
          vec3 f = vec3(softLight(cb.r, cl.r), softLight(cb.g, cl.g), softLight(cb.b, cl.b));
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c===12?o`
          vec3 f = vec3(hardLight(cb.r, cl.r), hardLight(cb.g, cl.g), hardLight(cb.b, cl.b));
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c===13?o`
          vec3 f = vec3(vividLight(cb.r, cl.r), vividLight(cb.g, cl.g), vividLight(cb.b, cl.b));
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:o``}
    }
  `))}function q(l,e){let{output:c,blendMode:y,baseOpacityMode:L,premultipliedSource:h}=e,r=l.fragment,n=L===1;n&&r.uniforms.add(new a("baseOpacity",t=>t.baseOpacity));let s=y!==0,C=!s&&h!==1&&(c===1&&!n||c===4);r.include(x,e);let b="";switch(c){case 4:case 0:b=o`vec4(0.0)`;break;case 2:r.uniforms.add(new m("backgroundColor",t=>t.backgroundColor)),b=o`vec4(backgroundColor, 1.0)`;break;case 3:r.include(g),b=o`vec4(gridColor(uv), 1.0)`;break;case 1:r.uniforms.add(new f("fboColor",t=>t.fboTexture)),b=o`texelFetch(fboColor, ivec2(gl_FragCoord.xy), 0)`}r.code.add(o`
    vec4 getBackground(vec2 uv) {
      return ${u(n,o`baseOpacity *`)} ${b};
    }

    vec4 blendLayers(vec2 bgUV, vec4 colorLayer, float opacity) {
      ${s?o`
          vec3 cl = colorLayer.a == 0.0 ? colorLayer.rgb : colorLayer.rgb / colorLayer.a;
          vec4 bgColor = getBackground(bgUV);
          vec3 cb = bgColor.a == 0.0 ? bgColor.rgb : bgColor.rgb / bgColor.a;
          return applyBlendMode(clamp(cl, vec3(0.0), vec3(1.0)), colorLayer.a * opacity, cb, bgColor.a);`:o`
          float composeAlpha = colorLayer.a * opacity;
          ${C?o`return colorLayer * opacity;`:o`
            vec4 bgColor = getBackground(bgUV);
            return bgColor * (1.0 - composeAlpha) + colorLayer * opacity;`}`}
    }`)}export{p as a,O as b,q as c};
