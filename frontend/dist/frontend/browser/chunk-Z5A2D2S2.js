import{f as v}from"./chunk-TEPTMKVE.js";import{f as n,k as u}from"./chunk-KFI4I766.js";import{a as g}from"./chunk-3C5EAPCU.js";import{a as d}from"./chunk-N3BZYENM.js";import{a as c}from"./chunk-VGAXEXH3.js";import{a as r,b as o}from"./chunk-UUP4FBYC.js";function I(i,a){i.include(d,a),i.include(v,a),i.fragment.include(g);let{output:l,oitPass:e,discardInvisibleFragments:h,snowCover:m}=a,C=l===10,s=u(l),t=n(l)&&e===1,p=n(l)&&e!==1,f=0;(p||s||t)&&i.outputs.add("fragColor","vec4",f++),s&&i.outputs.add("fragEmission","vec4",f++),t&&i.outputs.add("fragAlpha","float",f++),i.fragment.code.add(r`
    void outputColorHighlightOID(vec4 finalColor, const in vec3 vWorldPosition, vec3 emissiveSymbolColor ${o(m,", float snow")}) {
      ${o(C,"finalColor.a = 1.0;")}

      ${o(h,`if (finalColor.a < ${r.float(c)}) { discard; }`)}

      finalColor = applySlice(finalColor, vWorldPosition);
      ${o(t,r`fragColor = premultiplyAlpha(finalColor);
             fragAlpha = finalColor.a;`)}
      ${o(p,"fragColor = finalColor;")}
      ${o(s,`fragEmission = ${o(m,"mix(finalColor.a * getEmissions(emissiveSymbolColor), vec4(0.0), snow);","finalColor.a * getEmissions(emissiveSymbolColor);")}`)}
      calculateOcclusionAndOutputHighlight();
      ${o(C,"outputObjectAndLayerIdColor();")}
    }
  `)}export{I as a};
