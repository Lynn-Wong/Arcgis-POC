import{a as o}from"./chunk-UUP4FBYC.js";import{l as a}from"./chunk-QTNEEY3B.js";function l(r){r.code.add(o`
    const float GAMMA = ${o.float(a)};
    const float INV_GAMMA = ${o.float(1/a)};

    vec4 delinearizeGamma(vec4 color) {
      return vec4(pow(color.rgb, vec3(INV_GAMMA)), color.a);
    }

    vec3 linearizeGamma(vec3 color) {
      return pow(color, vec3(GAMMA));
    }
  `)}export{l as a};
