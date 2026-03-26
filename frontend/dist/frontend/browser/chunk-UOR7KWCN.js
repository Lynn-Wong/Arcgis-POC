import{d as x}from"./chunk-TEPTMKVE.js";import{a as v}from"./chunk-O5NYEJB2.js";import{a as h}from"./chunk-BAC6RMAZ.js";import{a as R}from"./chunk-2NXJIMQ2.js";import{a as g}from"./chunk-A634OTHD.js";import{a as p}from"./chunk-45K2AY22.js";import{a as s,b as u}from"./chunk-UUP4FBYC.js";import{C as f}from"./chunk-WENEM4NK.js";import{d as i,i as d}from"./chunk-JARU7KSM.js";function y({normalTexture:t,metallicRoughnessTexture:a,metallicFactor:o,roughnessFactor:e,emissiveTexture:l,emissiveFactor:c,occlusionTexture:n}){return t==null&&a==null&&l==null&&(c==null||f(c,d))&&n==null&&(e==null||e===1)&&(o==null||o===1)}function O({normalTexture:t,metallicRoughnessTexture:a,metallicFactor:o,roughnessFactor:e,emissiveTexture:l,emissiveFactor:c,occlusionTexture:n}){return t==null&&a==null&&l==null&&(c==null||f(c,d))&&n==null&&(e==null||e===1)&&(o==null||o===1||o===0)}var P=i(1,1,.5),w=i(0,.6,.2),B=i(0,1,.2);function L(t,a){let o=a.pbrMode,e=t.fragment;if(o!==2&&o!==0&&o!==1)return void e.code.add(s`void applyPBRFactors() {}`);if(o===0)return void e.code.add(s`void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);if(o===2)return void e.code.add(s`vec3 mrr = vec3(0.0, 0.6, 0.2);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);let{hasMetallicRoughnessTexture:l,hasMetallicRoughnessTextureTransform:c,hasOcclusionTexture:n,hasOcclusionTextureTransform:F,bindType:m}=a;(l||n)&&t.include(x,a),e.code.add(s`vec3 mrr;
float occlusion;`),l&&e.uniforms.add(m===1?new p("texMetallicRoughness",r=>r.textureMetallicRoughness):new v("texMetallicRoughness",r=>r.textureMetallicRoughness)),n&&e.uniforms.add(m===1?new p("texOcclusion",r=>r.textureOcclusion):new v("texOcclusion",r=>r.textureOcclusion)),e.uniforms.add(m===1?new R("mrrFactors",r=>r.mrrFactors):new h("mrrFactors",r=>r.mrrFactors)),e.code.add(s`
    ${u(l,s`void applyMetallicRoughness(vec2 uv) {
            vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
            mrr[0] *= metallicRoughness.b;
            mrr[1] *= metallicRoughness.g;
          }`)}

    ${u(n,"void applyOcclusion(vec2 uv) { occlusion *= textureLookup(texOcclusion, uv).r; }")}

    float getBakedOcclusion() {
      return ${n?"occlusion":"1.0"};
    }

    void applyPBRFactors() {
      mrr = mrrFactors;
      occlusion = 1.0;

      ${u(l,`applyMetallicRoughness(${c?"metallicRoughnessUV":"vuv0"});`)}
      ${u(n,`applyOcclusion(${F?"occlusionUV":"vuv0"});`)}
    }
  `)}function Z(t,a){a.snowCover&&(t.uniforms.add(new g("snowCover",o=>o.snowCover)).code.add(s`float getSnow(vec3 normal, vec3 groundNormal) {
return smoothstep(0.5, 0.55, dot(normal, groundNormal)) * snowCover;
}
float getRealisticTreeSnow(vec3 faceNormal, vec3 shadingNormal, vec3 groundNormal) {
float snow = min(1.0, smoothstep(0.5, 0.55, dot(faceNormal, groundNormal)) +
smoothstep(0.5, 0.55, dot(-faceNormal, groundNormal)) +
smoothstep(0.0, 0.1, dot(shadingNormal, groundNormal)));
return snow * snowCover;
}`),t.code.add(s`vec3 applySnowToMRR(vec3 mrr, float snow) {
return mix(mrr, vec3(0.0, 1.0, 0.04), snow);
}`))}export{y as a,O as b,P as c,w as d,B as e,L as f,Z as g};
