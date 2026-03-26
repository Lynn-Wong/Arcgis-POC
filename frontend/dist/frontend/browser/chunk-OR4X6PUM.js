import{a as l}from"./chunk-VGAXEXH3.js";import{b as d}from"./chunk-5VGDBOMN.js";import{a as e}from"./chunk-J6IEXWQ2.js";import{a as s}from"./chunk-QF5M5KTV.js";import{a}from"./chunk-H2ASV3YO.js";import{a as r}from"./chunk-UUP4FBYC.js";function u(c){let o=new s,{vertex:i,fragment:n}=o;d(i,c),i.uniforms.add(new a("width",t=>t.width)),o.attributes.add("position","vec3"),o.attributes.add("normal","vec3"),o.attributes.add("uv0","vec2"),o.attributes.add("length","float"),o.varyings.add("vtc","vec2"),o.varyings.add("vlength","float"),o.varyings.add("vradius","float"),i.main.add(r`vec3 bitangent = normal;
vtc = uv0;
vlength = length;
vradius = 0.5 * width;
vec4 pos = view * vec4(position + vradius * bitangent * uv0.y, 1.0);
gl_Position = proj * pos;`),n.uniforms.add(new a("outlineSize",t=>t.outlineSize),new e("outlineColor",t=>t.outlineColor),new a("stripeLength",t=>t.stripeLength),new e("stripeEvenColor",t=>t.stripeEvenColor),new e("stripeOddColor",t=>t.stripeOddColor));let v=1/Math.sqrt(2);return n.code.add(r`
    const float INV_SQRT2 = ${r.float(v)};

    vec4 arrowColor(vec2 tc, float len) {
      float d = INV_SQRT2 * (tc.x - abs(tc.y));
      d = min(d, INV_SQRT2 * (len - tc.x - abs(tc.y)));
      d = min(d, 1.0 - abs(tc.y));

      if (d < 0.0) {
        return vec4(0.0);
      }
      if (d < outlineSize) {
        return outlineColor;
      }
      return fract(0.5 / stripeLength * tc.x * vradius) >= 0.5 ? stripeOddColor : stripeEvenColor;
    }`),n.main.add(r`
    vec2 ntc = vec2(vtc.x / vradius, vtc.y);
    vec4 color = arrowColor(ntc, vlength / vradius);
    if (color.a < ${r.float(l)}) {
      discard;
    }
    fragColor = color;`),o}var w=Object.freeze(Object.defineProperty({__proto__:null,build:u},Symbol.toStringTag,{value:"Module"}));export{u as a,w as b};
