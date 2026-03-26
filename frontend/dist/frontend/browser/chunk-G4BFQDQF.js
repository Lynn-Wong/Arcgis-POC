import{a as F}from"./chunk-N4F7I4XE.js";import{a as g}from"./chunk-COHKIGGR.js";import{a as v}from"./chunk-YQXWXQD3.js";import{a as c}from"./chunk-B7VK56II.js";import{a as l}from"./chunk-2NXJIMQ2.js";import{a as h}from"./chunk-L7NOU4T2.js";import{a as C}from"./chunk-YZ4IDPMQ.js";import{a as w}from"./chunk-QF5M5KTV.js";import{a as m}from"./chunk-H2ASV3YO.js";import{a as x}from"./chunk-45K2AY22.js";import{a as e}from"./chunk-UUP4FBYC.js";import{a as u}from"./chunk-6QJXCAOV.js";import{a as s}from"./chunk-JARU7KSM.js";var f=class extends h{constructor(){super(...arguments),this.texV=u(),this.altitudeFade=0,this.innerScale=0,this.undergroundFadeAlpha=0,this.silhouette=new d}},d=class{constructor(){this.center=s(),this.v1=s(),this.v2=s()}};function y(a){let i=new w,{vertex:t,fragment:n}=i;if(F(t),a.geometry===2)i.attributes.add("position","vec2"),i.varyings.add("color","vec4"),t.uniforms.add(new v("cameraPosition",r=>r.camera.eye),new m("undergroundFadeAlpha",r=>r.undergroundFadeAlpha)),t.main.add(e`float ndotl = dot(normalize(cameraPosition), mainLightDirection);
float lighting = max(0.0, smoothstep(-1.0, 0.8, 2.0 * ndotl));
color = vec4(vec3(lighting), undergroundFadeAlpha);
gl_Position = vec4(position.xy, 1.0, 1.0);`),n.main.add(e`fragColor = color;`);else{i.include(g),i.attributes.add("position","vec3"),i.varyings.add("vtc","vec2"),i.varyings.add("falloff","float");let r=a.geometry===1;t.uniforms.add(new c("proj",o=>o.camera.projectionMatrix),new c("view",o=>o.camera.viewMatrix)),r||(i.varyings.add("innerFactor","float"),t.uniforms.add(new l("silCircleCenter",o=>o.silhouette.center)),t.uniforms.add(new l("silCircleV1",o=>o.silhouette.v1)),t.uniforms.add(new l("silCircleV2",o=>o.silhouette.v2)),t.uniforms.add(new C("texV",o=>o.texV)),t.uniforms.add(new m("innerScale",o=>o.innerScale)));let P=6.2831853,p=1/128;t.main.add(e`
      ${r?e`
      vec3 pos = position;
      float ndotl = mainLightDirection.z;
      vtc = vec2(0.0, position.z + 0.05);`:e`
      innerFactor = clamp(-position.z, 0.0, 1.0);
      float scale = position.y * (1.0 + innerFactor * innerScale);
      float phi = position.x * ${e.float(P*p)} + 1.0;
      vec3 pos =  (silCircleCenter + sin(phi) * silCircleV1 + cos(phi) * silCircleV2) * scale;
      float ndotl = dot(normalize(position.y > 0.0 ? pos: silCircleCenter), mainLightDirection);
      vtc.x = position.x  * ${e.float(p)};
      vtc.y = texV.x * (1.0 - position.z) + texV.y * position.z;
      `}
      falloff = max(0.0, smoothstep(-1.0, 0.8, 2.0 * ndotl));

		  gl_Position = transformPosition(proj, view, pos);
		  gl_Position.z = gl_Position.w; // project atmosphere onto the far plane
	  `),n.uniforms.add(new x("tex",o=>o.texture)),r||n.uniforms.add(new m("altitudeFade",o=>o.altitudeFade)),n.main.add(e`
			vec4 atmosphereColor = texture(tex, vtc) * falloff;
      ${r?e`fragColor = atmosphereColor;`:e`
			vec4 innerColor = vec4(atmosphereColor.rgb, 1.0 - altitudeFade);
			fragColor = mix(atmosphereColor, innerColor, smoothstep(0.0, 1.0, innerFactor));`}`)}return i}var T=Object.freeze(Object.defineProperty({__proto__:null,SilhouetteCircle:d,SimpleAtmospherePassParameters:f,build:y},Symbol.toStringTag,{value:"Module"}));export{f as a,d as b,y as c,T as d};
