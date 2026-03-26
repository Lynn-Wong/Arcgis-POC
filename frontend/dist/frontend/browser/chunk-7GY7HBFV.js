import{a}from"./chunk-R6IIY54E.js";import{a as d}from"./chunk-JMYO2YOI.js";import{a as o,b as i}from"./chunk-UUP4FBYC.js";function v(n,{occlusionPass:e,terrainDepthTest:p,cullAboveTerrain:s}){let{vertex:t,fragment:r,varyings:h}=n;if(!p)return t.code.add("void forwardViewPosDepth(vec3 pos) {}"),void r.code.add(`${e?"bool":"void"} discardByTerrainDepth() { ${i(e,"return false;")}}`);h.add("viewPosDepth","float",{invariant:!0}),t.code.add(`void forwardViewPosDepth(vec3 pos) {
    viewPosDepth = pos.z;
  }`),r.include(d),r.uniforms.add(new a("terrainDepthTexture",D=>D.terrainDepth?.attachment)).code.add(o`
    ${e?"bool":"void"} discardByTerrainDepth() {
      float depth = texelFetch(terrainDepthTexture, ivec2(gl_FragCoord.xy), 0).r;
      float linearDepth = linearizeDepth(depth);
      ${e?"return viewPosDepth < linearDepth && depth < 1.0;":`if(viewPosDepth ${s?">":"<="} linearDepth) discard;`}
    }`)}export{v as a};
