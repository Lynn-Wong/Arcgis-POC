import{a as o}from"./chunk-B7VK56II.js";import{a as c,b as i}from"./chunk-UUP4FBYC.js";import{e as t}from"./chunk-WMGH7MKS.js";import{a as s}from"./chunk-JJQR3F6K.js";function w(e,v={needUVs:!0,needEyeDirection:!0}){e.attributes.add("position","vec2"),e.varyings.add("worldRay","vec3");let{needUVs:a,needEyeDirection:n}=v;a&&e.varyings.add("uv","vec2"),n&&e.varyings.add("eyeDir","vec3"),e.vertex.uniforms.add(new o("inverseProjectionMatrix",r=>r.camera.inverseProjectionMatrix),new o("inverseViewMatrix",r=>t(d,r.camera.viewMatrix))),e.vertex.main.add(c`
    vec3 posViewNear = (inverseProjectionMatrix * vec4(position, -1.0, 1.0)).xyz;
    ${i(n,"eyeDir = posViewNear;")}
    worldRay = (inverseViewMatrix * vec4(posViewNear, 0)).xyz;
    ${i(a,"uv = position * 0.5 + vec2(0.5);")}
    gl_Position = vec4(position, 1, 1);
  `)}var d=s();export{w as a};
