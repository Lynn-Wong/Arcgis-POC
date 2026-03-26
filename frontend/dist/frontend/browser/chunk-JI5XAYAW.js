import{f as M}from"./chunk-KFI4I766.js";import{a as f}from"./chunk-5EK3WLWJ.js";import{a as j}from"./chunk-N3BZYENM.js";import{a as O,d as R}from"./chunk-2EG4SLVE.js";import{a as b}from"./chunk-NTQXKDNS.js";import{a as B}from"./chunk-B7VK56II.js";import{a as m}from"./chunk-BAC6RMAZ.js";import{a as y}from"./chunk-L7NOU4T2.js";import{a as F}from"./chunk-YZ4IDPMQ.js";import{a as _}from"./chunk-QF5M5KTV.js";import{a as n}from"./chunk-UUP4FBYC.js";import{a as w}from"./chunk-6QJXCAOV.js";import{c as p}from"./chunk-WENEM4NK.js";import{g as z,n as g}from"./chunk-WMGH7MKS.js";import{a as x}from"./chunk-JARU7KSM.js";import{M as P,a as h}from"./chunk-FKCVWD7H.js";import{a as v}from"./chunk-JJQR3F6K.js";import{b as l}from"./chunk-RL4CZUGQ.js";import{x as s}from"./chunk-R7CRKYC2.js";var S=class extends y{constructor(){super(...arguments),this.clipBox=h(P),this.useFixedSizes=!1,this.useRealWorldSymbolSizes=!1,this.scaleFactor=1,this.minSizePx=0,this.size=0,this.sizePx=0}get fixedSize(){return this.drawScreenSpace?this.sizePx:this.size}get screenMinSize(){return this.useFixedSizes?0:this.minSizePx}get drawScreenSpace(){return this.useFixedSizes&&!this.useRealWorldSymbolSizes}},u=class extends O{constructor(a,c,r){super(a),this.origin=a,this.isLeaf=c,this.splatSize=r}};function $(t){let a=new _,c=M(t.output),{vertex:r,fragment:U}=a;return a.vertex.include(R,t),a.attributes.add("position","vec3"),a.attributes.add("color","vec3"),r.uniforms.add(new b("modelView",(i,e)=>z(C,e.camera.viewMatrix,g(C,i.origin))),new B("proj",i=>i.camera.projectionMatrix),new f("screenMinMaxSize",(i,e,o)=>l(d,o.useFixedSizes?0:o.minSizePx*e.camera.pixelRatio,D(i.isLeaf)*e.camera.pixelRatio)),t.useFixedSizes?new F("pointScale",(i,e)=>l(d,i.fixedSize*e.camera.pixelRatio,e.camera.fullHeight)):new f("pointScale",(i,e,o)=>l(d,i.splatSize*o.scaleFactor*e.camera.pixelRatio,e.camera.fullHeight/e.camera.pixelRatio))),t.clippingEnabled?r.uniforms.add(new m("clipMin",(i,e,o)=>p(H,o.clipBox[0]-i.origin[0],o.clipBox[1]-i.origin[1],o.clipBox[2]-i.origin[2])),new m("clipMax",(i,e,o)=>p(H,o.clipBox[3]-i.origin[0],o.clipBox[4]-i.origin[1],o.clipBox[5]-i.origin[2]))):(r.constants.add("clipMin","vec3",[-s,-s,-s]),r.constants.add("clipMax","vec3",[s,s,s])),c&&a.varyings.add("vColor","vec3"),r.main.add(n`
    // Move clipped points outside of clipspace
    if (position.x < clipMin.x || position.y < clipMin.y || position.z < clipMin.z ||
      position.x > clipMax.x || position.y > clipMax.y || position.z > clipMax.z) {
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      gl_PointSize = 0.0;
      return;
    }

    if (rejectBySlice(position)) {
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      gl_PointSize = 0.0;
      return;
    }

    // Position in camera space
    vec4 camera = modelView * vec4(position, 1.0);

    float pointSize = pointScale.x;
    vec4 position = proj * camera;
    ${t.drawScreenSize?n`float clampedScreenSize = pointSize;`:n`float pointRadius = 0.5 * pointSize;
           vec4 cameraOffset = camera + vec4(0.0, pointRadius, 0.0, 0.0);
           vec4 positionOffset = proj * cameraOffset;
           float radius = abs(positionOffset.y - position.y);
           float viewHeight = pointScale.y;
           // screen diameter = (2 * r / w) * (h / 2)
           float screenPointSize = (radius / position.w) * viewHeight;
           float clampedScreenSize = clamp(screenPointSize, screenMinMaxSize.x, screenMinMaxSize.y);
           // Shift towards camera, to move rendered point out of terrain i.e. to
           // the camera-facing end of the virtual point when considering it as a
           // 3D sphere.
           camera.xyz -= normalize(camera.xyz) * pointRadius * clampedScreenSize / screenPointSize;
           position = proj * camera;`}

    gl_PointSize = clampedScreenSize;
    gl_Position = position;
    ${c?n`vColor = color;`:""}`),a.include(j,t),U.main.add(n`
    vec2 vOffset = gl_PointCoord - vec2(0.5, 0.5);
    float r2 = dot(vOffset, vOffset);

    if (r2 > 0.25) {
      discard;
    }
    calculateOcclusionAndOutputHighlight();
    ${c?n`fragColor = vec4(vColor, 1.0);`:""}`),a}function D(t){return t?256:64}var C=v(),H=x(),d=w(),oi=Object.freeze(Object.defineProperty({__proto__:null,PointRendererDrawParameters:u,PointRendererPassParameters:S,build:$,getMaxPointSizeScreenspace:D},Symbol.toStringTag,{value:"Module"}));export{S as a,u as b,$ as c,D as d,oi as e};
