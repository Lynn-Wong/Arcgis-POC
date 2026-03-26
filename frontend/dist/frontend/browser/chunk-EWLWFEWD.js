import{a as p}from"./chunk-YQXWXQD3.js";import{a as l}from"./chunk-B7VK56II.js";import{a as x}from"./chunk-2NXJIMQ2.js";import{a as P}from"./chunk-QF5M5KTV.js";import{a as s}from"./chunk-H2ASV3YO.js";import{a as i}from"./chunk-UUP4FBYC.js";import{F as y,c as v,h as u,m,t as h,u as g,w}from"./chunk-WENEM4NK.js";import{a as c,c as d}from"./chunk-JARU7KSM.js";function z(o){let e=new P;return e.attributes.add("position","vec3"),e.attributes.add("instanceFeatureAttribute","float"),e.vertex.uniforms.add(new p("cameraPosition",t=>t.camera.eye),new x("offset",(t,a)=>q(t,a)),new s("width",t=>t.width),new s("time",t=>t.time),new l("proj",t=>t.camera.projectionMatrix),new l("view",t=>t.camera.viewMatrix)),e.varyings.add("vUv","vec2"),e.vertex.code.add(i`vec3 hash31(float p){
vec3 p3 = fract(vec3(p) * vec3(0.1031, 0.1030, 0.0973));
p3 += dot(p3, p3.yzx + 33.33);
return fract((p3.xxy + p3.yzz) * p3.zyx);
}
float hash11(float p){
p = fract(p * 0.1031);
p *= p + 33.33;
p *= p + p;
return fract(p);
}
vec3 rotateVectorByQuaternion(vec3 v, vec4 q){
return 2.0 * cross(q.xyz, v * q.w + cross(q.xyz, v)) + v;
}`),e.vertex.main.add(i`
      vUv = position.xz;
      vec3 rand = hash31(instanceFeatureAttribute);

      // Set random position for all particles
      // The hash function space is not high resolution so offset particles by an additional random value
      // This creates grids of 1000 particles which are shifted by random hundredths of the tile width
      // overlaying multiple identical but offset grids
      vec3 randomPosition = 2.0 * (rand + (0.01 + 0.01 * rand) * floor(0.001 * instanceFeatureAttribute)) - 1.0;

      // Random orientation of rain drops
      float angle = 3.1415 * hash11(instanceFeatureAttribute);

      vec3 up = vec3(0, 0, 1);

      // Gravity and wind direction
      vec3 direction = normalize(cameraPosition);

      vec3 tangent = normalize(cross(direction, up));

      // Gravity
      vec3 animatedPos = randomPosition + direction * -time;

      // Rain particles fall straight down and are randomly oriented
      // Snow particles have random sinusoid trajectories and are rotated to face the camera
      ${o.type===0?i`
            // Random rotation for particle
            vec3 rotationAxis = up;
            vec4 quat = vec4(rotationAxis * sin(angle), cos(angle));
            vec3 transformedPos = rotateVectorByQuaternion(vec3(0.2, 0.2, 4.0) * (position - vec3(0.5, 0.0, 0.5)), quat);

            // Rotate particle to planetary position
            rotationAxis = tangent;
            angle = 0.5 * -acos(dot(direction, up));
            quat = vec4(rotationAxis * sin(angle), cos(angle));
            transformedPos = rotateVectorByQuaternion(transformedPos, quat);

            vec4 pos = mat4(mat3(view)) * vec4(transformedPos + (mod(width * animatedPos - offset, width) - 0.5 * width), 1.0);
            gl_Position = proj * pos;
      `:i`
            vec3 rotationAxis = direction;
            vec4 quat = vec4(rotationAxis * sin(angle), cos(angle));

            tangent = rotateVectorByQuaternion(tangent, quat);
            // Random sinusoid from friction
            animatedPos += tangent * 0.25 * sin(dot(animatedPos, direction));
            vec4 pos = mat4(mat3(view)) * vec4((mod(width * animatedPos - offset, width) - 0.5 * width), 1.0);
            gl_Position = proj * (0.5 * vec4(position.xzy, 0.0) + pos);
      `}
  `),e.fragment.uniforms.add(new s("opacity",t=>t.opacity),new p("particleColor",t=>A(t,o))),e.fragment.main.add(i`
    float d = length(vUv - vec2(0.5));

    ${o.type===0?i`d = 0.35 * smoothstep(0.5, 0.0, d);`:i`d = smoothstep(0.5, 0.1, d);`}
    fragColor = opacity * vec4(particleColor * d, d);
  `),e}function q(o,e){let t=e.camera.eye,a=.5*o.width,r=1/o.width,n=u(f,v(f,(t[0]+a)*r,(t[1]+a)*r,(t[2]+a)*r));return y(n,t,m(n,n,o.width))}function A(o,e){let t=e.type===0?B:j,a=m(f,t,F),r=o.camera.eye;h(b,r);let n=Math.max(0,g(b,o.lighting.mainLight.direction));return w(a,a,t,n)}var f=c(),b=c(),j=d(1,1,1),B=d(.85,.85,.85),F=.7,T=Object.freeze(Object.defineProperty({__proto__:null,build:z},Symbol.toStringTag,{value:"Module"}));export{z as a,T as b};
