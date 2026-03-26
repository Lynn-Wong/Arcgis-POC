import{a as c}from"./chunk-Y3VXCMJP.js";import{a as m}from"./chunk-COHKIGGR.js";import{a as h}from"./chunk-Z5A2D2S2.js";import{a as v}from"./chunk-YQSUB555.js";import{e as u}from"./chunk-HNCVMFZH.js";import{a as b}from"./chunk-7GY7HBFV.js";import{a as g}from"./chunk-3C5EAPCU.js";import{c as n}from"./chunk-2EG4SLVE.js";import{b as p}from"./chunk-5VGDBOMN.js";import{a as f}from"./chunk-J6IEXWQ2.js";import{a as C}from"./chunk-QF5M5KTV.js";import{a as t}from"./chunk-UUP4FBYC.js";function V(o){let r=new C,{vertex:e,fragment:i,attributes:a,varyings:l}=r,{hasVVColor:s,hasVertexColors:d}=o;return p(e,o),r.include(m),r.include(c,o),r.include(u,o),r.include(v,o),i.include(n,o),r.include(h,o),r.include(b,o),a.add("position","vec3"),s&&a.add("colorFeatureAttribute","float"),d||l.add("vColor","vec4"),l.add("vpos","vec3",{invariant:!0}),e.uniforms.add(new f("uColor",w=>w.color)),e.main.add(t`
      vpos = position;
      forwardNormalizedVertexColor();
      forwardObjectAndLayerIdColor();

      ${d?"vColor *= uColor;":s?"vColor = uColor * interpolateVVColor(colorFeatureAttribute);":"vColor = uColor;"}
      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
      gl_Position = transformPosition(proj, view, vpos);`),i.include(g),i.main.add(t`discardBySlice(vpos);
discardByTerrainDepth();
outputColorHighlightOID(vColor, vpos, vColor.rgb);`),r}var B=Object.freeze(Object.defineProperty({__proto__:null,build:V},Symbol.toStringTag,{value:"Module"}));export{V as a,B as b};
