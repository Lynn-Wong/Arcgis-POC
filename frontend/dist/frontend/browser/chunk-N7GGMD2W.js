function r(e){e.code.add(`
  vec4 blendColorsPremultiplied(vec4 source, vec4 dest) {
    float oneMinusSourceAlpha = 1.0 - source.a;
    return source + dest * oneMinusSourceAlpha;
  }
  `)}function l(e,o){return e[0]=o[0]*o[3],e[1]=o[1]*o[3],e[2]=o[2]*o[3],e[3]=o[3],e}export{r as a,l as b};
