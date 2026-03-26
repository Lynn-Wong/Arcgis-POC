import{a as s,c as n}from"./chunk-XLAKJJ7A.js";import{a as i}from"./chunk-5VGDBOMN.js";import{a as f}from"./chunk-J6IEXWQ2.js";import{a as r}from"./chunk-UUP4FBYC.js";import{a as o}from"./chunk-3R6HK7Q4.js";import{a as c}from"./chunk-YMQ4BGWF.js";import{b as l}from"./chunk-OFZRIX6T.js";var d=class{constructor(e){this.screenLength=o(e.screenLength),this.minWorldLength=e.minWorldLength??0,this.maxWorldLength=e.maxWorldLength??1/0}};function W(a,e){let t=a.vertex;e.hasVerticalOffset?(h(t),e.hasScreenSizePerspective&&(a.include(s),n(t),i(a.vertex,e)),t.code.add(r`
      vec3 calculateVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        float viewDistance = length((view * vec4(worldPos, 1.0)).xyz);
        ${e.spherical?r`vec3 worldNormal = normalize(worldPos + localOrigin);`:r`vec3 worldNormal = vec3(0.0, 0.0, 1.0);`}
        ${e.hasScreenSizePerspective?r`
            float cosAngle = dot(worldNormal, normalize(worldPos - cameraPosition));
            float verticalOffsetScreenHeight = screenSizePerspectiveScaleFloat(verticalOffset.x, abs(cosAngle), viewDistance, screenSizePerspectiveAlignment);`:r`
            float verticalOffsetScreenHeight = verticalOffset.x;`}
        // Screen sized offset in world space, used for example for line callouts
        float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * viewDistance, verticalOffset.z, verticalOffset.w);
        return worldNormal * worldOffset;
      }

      vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        return worldPos + calculateVerticalOffset(worldPos, localOrigin);
      }
    `)):t.code.add(r`vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) { return worldPos; }`)}var p=c();function h(a){a.uniforms.add(new f("verticalOffset",(e,t)=>{let{minWorldLength:m,maxWorldLength:v,screenLength:O}=e.verticalOffset,g=Math.tan(.5*t.camera.fovY)/(.5*t.camera.fullViewport[3]),w=t.camera.pixelRatio||1;return l(p,O*w,g,m,v)}))}export{d as a,W as b,h as c};
