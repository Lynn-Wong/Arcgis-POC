import{a as e}from"./chunk-UUP4FBYC.js";function a(i,o=!0){i.attributes.add("position","vec2"),o&&i.varyings.add("uv","vec2"),i.vertex.main.add(e`
      gl_Position = vec4(position, 0.0, 1.0);
      ${o?e`uv = position * 0.5 + vec2(0.5);`:""}
  `)}export{a};
