import{a as c}from"./chunk-COHKIGGR.js";import{a as P}from"./chunk-Z5A2D2S2.js";import{a as f}from"./chunk-YQSUB555.js";import{a as C}from"./chunk-7GY7HBFV.js";import{a as b}from"./chunk-3C5EAPCU.js";import{c as m}from"./chunk-2EG4SLVE.js";import{b as u}from"./chunk-5VGDBOMN.js";import{a as l}from"./chunk-L7NOU4T2.js";import{a as x}from"./chunk-QF5M5KTV.js";import{a as v}from"./chunk-H2ASV3YO.js";import{a as g}from"./chunk-45K2AY22.js";import{a as t,b as i}from"./chunk-UUP4FBYC.js";var a=class extends l{};function y(r){let o=new x,{vertex:s,fragment:n,varyings:d}=o,{output:w,perspectiveInterpolation:p}=r;return u(s,r),o.include(c),o.include(C,r),o.fragment.include(m,r),o.include(f,r),o.include(P,r),o.attributes.add("position","vec3"),o.attributes.add("uv0","vec2"),p&&o.attributes.add("perspectiveDivide","float"),s.main.add(t`
    vpos = position;
    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    vTexCoord = uv0;
    gl_Position = transformPosition(proj, view, vpos);
    ${i(p,"gl_Position *= perspectiveDivide;")}`),d.add("vpos","vec3",{invariant:!0}),d.add("vTexCoord","vec2"),n.include(b),n.uniforms.add(new v("opacity",e=>e.opacity),new g("tex",e=>e.glTexture)).main.add(t`
    discardBySlice(vpos);
    discardByTerrainDepth();
    ${i(w===10,"fragColor = vec4(0, 0, 0, 1); return;")}
    vec4 finalColor = texture(tex, vTexCoord) * opacity;
    outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),o}var M=Object.freeze(Object.defineProperty({__proto__:null,ImageMaterialPassParameters:a,build:y},Symbol.toStringTag,{value:"Module"}));export{a,y as b,M as c};
