import{a}from"./chunk-2YSWRJRO.js";import{a as r}from"./chunk-QF5M5KTV.js";import{a as o}from"./chunk-45K2AY22.js";import{a as t}from"./chunk-UUP4FBYC.js";var s=.05,c=2;function u(){let e=new r;return e.include(a),e.outputs.add("fragEdges","vec2"),e.fragment.code.add(t`float absMax3(vec3 v) {
vec3 t = abs(v);
return max(max(t.r, t.g), t.b);
}`),e.fragment.uniforms.add(new o("colorTexture",l=>l.color)).main.add(t`
    vec2 resolution = 1.0 / vec2(textureSize(colorTexture, 0));
    vec4 offsets[3];
    offsets[0] = vec4(uv.x - resolution.x, uv.y, uv.x, uv.y + resolution.y);
    offsets[1] = vec4(uv.x + resolution.x, uv.y, uv.x, uv.y - resolution.y);
    offsets[2] = vec4(uv.x - 2.0 * resolution.x, uv.y, uv.x, uv.y + 2.0 * resolution.y);

    // Calculate color deltas:
    vec3 C = texture(colorTexture, uv).rgb;
    vec3 Cleft = texture(colorTexture, offsets[0].xy).rgb;
    vec3 Ctop = texture(colorTexture, offsets[0].zw).rgb;
    vec2 delta = vec2(absMax3(C - Cleft), absMax3(C - Ctop));
    vec2 edges = step(vec2(${t.float(s)}), delta);

    // discard if there is no edge:
    if (dot(edges, vec2(1.0)) == 0.0) {
      fragEdges = vec2(0.0);
    }
    else {
      // Calculate right and bottom deltas:
      vec3 Cright = texture(colorTexture, offsets[1].xy).rgb;
      float horizontal = absMax3(C - Cright);

      vec3 Cbottom  = texture(colorTexture, offsets[1].zw).rgb;
      float vertical = absMax3(C - Cbottom);

      // Calculate the maximum delta in the direct neighborhood:
      float maxDelta = max(max(max(delta.x, delta.y), horizontal), vertical);

      // Calculate left-left and top-top deltas:
      vec3 Cleftleft  = texture(colorTexture, offsets[2].xy).rgb;
      horizontal = absMax3(C - Cleftleft);

      vec3 Ctoptop = texture(colorTexture, offsets[2].zw).rgb;
      vertical = absMax3(C - Ctoptop);

      // Calculate the final maximum delta:
      maxDelta = max(max(maxDelta, horizontal), vertical);

      // Local contrast adaptation in action:
      fragEdges = edges * step(maxDelta, float(${t.float(c)}) * delta);
    }
  `),e}var d=Object.freeze(Object.defineProperty({__proto__:null,build:u},Symbol.toStringTag,{value:"Module"}));export{u as a,d as b};
