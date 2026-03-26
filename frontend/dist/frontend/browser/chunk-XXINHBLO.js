import{a as f}from"./chunk-JIVOQNH4.js";import{a as m}from"./chunk-2YSWRJRO.js";import{a as c}from"./chunk-L7NOU4T2.js";import{a as u}from"./chunk-QF5M5KTV.js";import{a as l}from"./chunk-H2ASV3YO.js";import{a}from"./chunk-45K2AY22.js";import{a as e}from"./chunk-UUP4FBYC.js";import{a as s}from"./chunk-THV3DQYT.js";var t=class extends c{constructor(){super(...arguments),this.effect=0,this.fadeFactor=s(1)}};function n(){let r=new u;return r.include(m),r.outputs.add("fragColor","vec4",0),r.fragment.uniforms.add(new a("colorTexture",o=>o.color),new a("focusArea",o=>o.focusArea),new f("focusAreaEffectMode",o=>o.effect),new l("fadeFactor",o=>o.fadeFactor.value)).main.add(e`
      float mask = texture( focusArea, uv, 0.0 ).r;
      vec4 color = texture( colorTexture, uv, 0.0 );
      vec4 colorDeSaturate = vec4(color.r * 0.25 + color.g * 0.5 + color.b * 0.25);
      if (focusAreaEffectMode == ${e.int(0)}) {
        fragColor = mask > 0.0 ? color : mix(color, 0.55 * colorDeSaturate + 0.45, fadeFactor);
      } else {
        fragColor = mask > 0.0 ? color : mix(color, 0.33 * color, fadeFactor);
      }
  `),r}var S=Object.freeze(Object.defineProperty({__proto__:null,FocusAreaColorPassParameters:t,build:n},Symbol.toStringTag,{value:"Module"}));export{t as a,n as b,S as c};
