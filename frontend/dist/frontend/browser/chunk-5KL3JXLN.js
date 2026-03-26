import{a as ee,b as te,c as g,i as ie}from"./chunk-HGXRADAJ.js";import{a as Z}from"./chunk-XPAMXA62.js";import{a as Y}from"./chunk-Z5A2D2S2.js";import{a as I,f as H}from"./chunk-PWAC5NTO.js";import{a as J}from"./chunk-YQSUB555.js";import{a as Q}from"./chunk-7GY7HBFV.js";import{a as X}from"./chunk-3C5EAPCU.js";import{a as S}from"./chunk-VGAXEXH3.js";import{c as N}from"./chunk-2EG4SLVE.js";import{a as k,b as B,d as P}from"./chunk-5VGDBOMN.js";import{a as v}from"./chunk-J6IEXWQ2.js";import{a as U}from"./chunk-B7VK56II.js";import{a as K}from"./chunk-Q5RZKMWM.js";import{a as L}from"./chunk-A634OTHD.js";import{a as M}from"./chunk-24Z55BQA.js";import{a as q}from"./chunk-QF5M5KTV.js";import{a as p}from"./chunk-H2ASV3YO.js";import{a as G}from"./chunk-45K2AY22.js";import{a as e,b as c}from"./chunk-UUP4FBYC.js";import{c as j,g as $}from"./chunk-67YVG46W.js";import{a as T,g as V}from"./chunk-YMQ4BGWF.js";import{b as D}from"./chunk-OFZRIX6T.js";import{D as _}from"./chunk-ILSRSYRO.js";var y=class{constructor(t,n,r){this._createTexture=t,this._parametersKey=n,this._repository=new Map,this._orphanCache=r.newCache(`procedural-texture-repository:${_()}`,i=>i.dispose())}destroy(){for(let{texture:t}of this._repository.values())t.dispose();this._repository.clear(),this._orphanCache.destroy()}swap(t,n=null){let r=this._acquire(t);return this.release(n),r}release(t){if(t==null)return;let n=this._parametersKey(t),r=this._repository.get(n);if(r&&(r.refCount--,r.refCount===0)){this._repository.delete(n);let{texture:i}=r;this._orphanCache.put(n,i)}}_acquire(t){if(t==null)return null;let n=this._parametersKey(t),r=this._repository.get(n);if(r)return r.refCount++,r.texture;let i=this._orphanCache.pop(n)??this._createTexture(t),a=new R(i);return this._repository.set(n,a),i}},R=class{constructor(t){this.texture=t,this.refCount=1}};function ye(o,t){return new y(n=>{let{data:r,textureSize:i}=me(n),a=new I(i,1);return a.dataType=$.FLOAT,a.pixelFormat=6403,a.internalFormat=j.R16F,a.wrapMode=10497,new H(o,a,r)},n=>`${n.pattern.join(",")}-r${n.pixelRatio}`,t)}function me(o){let t=oe(o),n=1/o.pixelRatio,r=w(o),i=[],a=1;for(let l of t){for(let f=0;f<l;f++){let h=a*(Math.min(f,l-1-f)+.5)*n;i.push(h)}a=-a}let m=Math.round(t[0]/2);return{data:new Float32Array([...i.slice(m),...i.slice(0,m)]),textureSize:r}}function oe(o){return o.pattern.map(t=>Math.round(t*o.pixelRatio))}function w(o){if(o==null)return 1;let t=oe(o);return Math.floor(t.reduce((n,r)=>n+r))}function ae(o){return o==null?V:o.length===4?o:D(fe,o[0],o[1],o[2],1)}var fe=T();function re(o,t){if(!t.stippleEnabled)return void o.fragment.code.add(e`float getStippleAlpha(float lineWidth) { return 1.0; }
void discardByStippleAlpha(float stippleAlpha, float threshold) {}
vec4 blendStipple(vec4 color, float stippleAlpha) { return color; }`);let n=!(t.draped&&t.stipplePreferContinuous),{vertex:r,fragment:i}=o;t.draped||(k(r,t),r.uniforms.add(new L("worldToScreenPerDistanceRatio",({camera:a})=>1/a.perScreenPixelRatio)).code.add(e`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),o.varyings.add("vStippleDistance","float"),o.varyings.add("vStippleDistanceLimits","vec2"),o.varyings.add("vStipplePatternStretch","float"),r.code.add(e`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${e.float(ve)};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),P(r),r.code.add(e`
    vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {

      // First check if the segment is long enough to support fully screen space patterns.
      // Force sparse mode for segments that are very large in screen space even if it is not allowed,
      // to avoid imprecision from calculating with large floats.
      if (segmentLengthPseudoScreen >= ${n?"patternLength":"1e4"}) {
        // Round the screen length to get an integer number of pattern repetitions (minimum 1).
        float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
        float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
        float segmentLengthScreenRounded = flooredRepetitions * patternLength;

        float stretch = repetitions / flooredRepetitions;

        // We need to impose a lower bound on the stretch factor to prevent the dots from merging together when there is only 1 repetition.
        // 0.75 is the lowest possible stretch value for flooredRepetitions > 1, so it makes sense as lower bound.
        vStipplePatternStretch = max(0.75, stretch);

        return vec2(0.0, segmentLengthScreenRounded);
      }
      return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
    }
  `),i.uniforms.add(new G("stipplePatternTexture",a=>a.stippleTexture),new p("stipplePatternPixelSizeInv",a=>1/b(a))),t.stippleOffColorEnabled&&i.uniforms.add(new v("stippleOffColor",a=>ae(a.stippleOffColor))),o.include(g),i.code.add(e`float getStippleSDF(out bool isClamped) {
float stippleDistanceClamped = noPerspectiveRead(clamp(vStippleDistance, vStippleDistanceLimits.x, vStippleDistanceLimits.y));
float lineSizeInv = noPerspectiveRead(vLineSizeInv);
vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;
float u = stippleDistanceClamped * stipplePatternPixelSizeInv * lineSizeInv;
u = fract(u);
float sdf = texture(stipplePatternTexture, vec2(u, 0.5)).r;
return (sdf - 0.5) * vStipplePatternStretch + 0.5;
}
float getStippleSDF() {
bool ignored;
return getStippleSDF(ignored);
}
float getStippleAlpha(float lineWidth) {
bool isClamped;
float stippleSDF = getStippleSDF(isClamped);
float antiAliasedResult = clamp(stippleSDF * lineWidth + 0.5, 0.0, 1.0);
return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
}`),i.code.add(e`
    void discardByStippleAlpha(float stippleAlpha, float threshold) {
     ${c(!t.stippleOffColorEnabled,"if (stippleAlpha < threshold) { discard; }")}
    }

    vec4 blendStipple(vec4 color, float stippleAlpha) {
      return ${t.stippleOffColorEnabled?"mix(color, stippleOffColor, stippleAlpha)":"vec4(color.rgb, color.a * stippleAlpha)"};
    }
  `)}function b(o){let t=o.stipplePattern;return t?w(o.stipplePattern)/t.pixelRatio:1}var ve=.4;function ne(o,t){if(!t.hasAnimation)return;let{attributes:n,varyings:r,vertex:i,fragment:a}=o;n.add("timeStamps","vec4"),r.add("vTimeStamp","float"),r.add("vFirstTime","float"),r.add("vLastTime","float"),r.add("vTransitionType","float"),i.main.add(e`vTimeStamp = timeStamps.x;
vFirstTime = timeStamps.y;
vLastTime = timeStamps.z;
vTransitionType = timeStamps.w;`);let{animation:m}=t;m===3&&a.constants.add("decayRate","float",2.3),a.code.add(e`
    float getTrailOpacity(float x) {
      ${ue(m)}
    }`),a.uniforms.add(new p("timeElapsed",l=>l.timeElapsed),new p("trailLength",l=>l.trailLength),new p("speed",l=>l.animationSpeed),new v("timingOptions",l=>D(Se,l.startTime,l.endTime,l.fadeInTime,l.fadeOutTime))),a.code.add(e`float fadeIn(float x) {
return smoothstep(0.0, timingOptions[2], x);
}
float fadeOut(float x) {
return isinf(timingOptions[3]) ? 1.0 : smoothstep(timingOptions[3], 0.0, x);
}`),a.code.add(e`vec4 animate(vec4 color) {
float startTime = timingOptions[0];
float endTime = timingOptions[1];
float totalTime = vLastTime - vFirstTime;
float actualEndTime = int(vTransitionType) == 2 ? min(endTime, startTime + vLastTime / speed) : endTime;
vec4 animatedColor = color;
if (speed == 0.0) {
animatedColor.a *= getTrailOpacity((totalTime - (vTimeStamp - vFirstTime)) / trailLength);
animatedColor.a *= isinf(actualEndTime) ? 1.0 : fadeOut(timeElapsed - actualEndTime);
animatedColor.a *= fadeIn(timeElapsed - startTime);
return animatedColor;
}
float relativeStartTime = mod(startTime, totalTime);
float vHeadRelativeToFirst = mod((timeElapsed - relativeStartTime) * speed - vFirstTime, totalTime);
float vRelativeToHead = vHeadRelativeToFirst + vFirstTime - vTimeStamp;
bool inPreviousCycle = vRelativeToHead < 0.0;
vRelativeToHead += inPreviousCycle ? totalTime : 0.0;
float vAbsoluteTime = timeElapsed - vRelativeToHead / speed;
if (vAbsoluteTime > actualEndTime) {
vRelativeToHead = (timeElapsed - relativeStartTime) * speed - vTimeStamp;
vAbsoluteTime = timeElapsed - vRelativeToHead / speed;
}
animatedColor *= step(startTime, vAbsoluteTime);
animatedColor *= step(vAbsoluteTime, actualEndTime);
animatedColor.a *= isinf(actualEndTime) ? 1.0 : fadeOut(timeElapsed - actualEndTime);
animatedColor.a *= inPreviousCycle ? fadeOut(vHeadRelativeToFirst / speed) : 1.0;
animatedColor.a *= getTrailOpacity(vRelativeToHead / trailLength);
animatedColor.a *= int(vTransitionType) == 0 ? fadeIn(vAbsoluteTime - startTime) : 1.0;
animatedColor.a *= fadeIn(vTimeStamp - vFirstTime);
return animatedColor;
}`)}function ue(o){switch(o){case 2:return"return x >= 0.0 && x <= 1.0 ? 1.0 : 0.0;";case 3:return`float cutOff = exp(-decayRate);
        return (exp(-decayRate * x) - cutOff) / (1.0 - cutOff);`;default:return"return 1.0;"}}var Se=T();var z=1;function ge(o){let t=new q,{attributes:n,varyings:r,vertex:i,fragment:a}=t,{applyMarkerOffset:m,draped:l,output:f,capType:h,stippleEnabled:d,falloffEnabled:F,roundJoins:se,wireframe:A,innerColorEnabled:le,hasAnimation:pe,hasScreenSizePerspective:x}=o;a.include(Z),t.include(ee,o),t.include(re,o),t.include(J,o),t.include(Q,o),t.include(ne,o);let W=m&&!l;W&&(i.uniforms.add(new p("markerScale",s=>s.markerScale)),t.include(ie,{space:2,hasScreenSizePerspective:x})),B(i,o),i.uniforms.add(new U("inverseProjectionMatrix",s=>s.camera.inverseProjectionMatrix),new M("nearFar",s=>s.camera.nearFar),new p("miterLimit",s=>s.join!=="miter"?0:s.miterLimit),new K("viewport",s=>s.camera.fullViewport)),i.constants.add("LARGE_HALF_FLOAT","float",65500),n.add("position","vec3"),n.add("previousDelta","vec4"),n.add("nextDelta","vec4"),n.add("lineParameters","vec2"),n.add("u0","float"),r.add("vColor","vec4"),r.add("vpos","vec3",{invariant:!0}),r.add("vLineDistance","float"),r.add("vLineWidth","float");let O=d;O&&r.add("vLineSizeInv","float");let u=h===2,E=d&&u,C=F||E;C&&r.add("vLineDistanceNorm","float"),u&&(r.add("vSegmentSDF","float"),r.add("vReverseSegmentSDF","float")),i.code.add(e`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}
float interp(float ncp, vec4 a, vec4 b) {
return (-ncp - a.z) / (b.z - a.z);
}
vec2 rotate(vec2 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return m * v;
}`),i.code.add(e`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),i.code.add(e`void clip(
inout vec4 pos,
inout vec4 prev,
inout vec4 next,
bool isStartVertex
) {
float vnp = nearFar[0] * 0.99;
if (pos.z > -nearFar[0]) {
if (!isStartVertex) {
if (prev.z < -nearFar[0]) {
pos = mix(prev, pos, interp(vnp, prev, pos));
next = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
} else {
if (next.z < -nearFar[0]) {
pos = mix(pos, next, interp(vnp, pos, next));
prev = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
}
} else {
if (prev.z > -nearFar[0]) {
prev = mix(pos, prev, interp(vnp, pos, prev));
}
if (next.z > -nearFar[0]) {
next = mix(next, pos, interp(vnp, next, pos));
}
}
}`),P(i),i.constants.add("aaWidth","float",d?0:1).main.add(e`bool isStartVertex = abs(abs(lineParameters.y) - 3.0) == 1.0;
vec3 prevPosition = position + previousDelta.xyz * previousDelta.w;
vec3 nextPosition = position + nextDelta.xyz * nextDelta.w;
float coverage = 1.0;
if (lineParameters.y == 0.0) {
gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
}
else {
vec4 pos  = view * vec4(position, 1.0);
vec4 prev = view * vec4(prevPosition, 1.0);
vec4 next = view * vec4(nextPosition, 1.0);
bool isJoin = abs(lineParameters.y) < 3.0;`),W&&i.main.add(e`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos.xyz, other.xyz);
if (!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos.xyz) * 0.5;
}`),t.include(te),i.main.add(e`
      clip(pos, prev, next, isStartVertex);

      vec3 clippedPos = pos.xyz;
      vec3 clippedCenter = mix(pos.xyz, isStartVertex ? next.xyz : prev.xyz, 0.5);

      forwardViewPosDepth(pos.xyz);

      pos = projectAndScale(pos);
      next = projectAndScale(next);
      prev = projectAndScale(prev);

      vec2 left = (pos.xy - prev.xy);
      vec2 right = (next.xy - pos.xy);

      float leftLen = length(left);
      float rightLen = length(right);

      float lineSize = getSize(${c(x,"clippedPos")});
      ${c(d&&x,"float patternLineSize = getSize(clippedCenter);")}
      ${c(d&&!x,"float patternLineSize = lineSize;")}

      if (lineSize < 1.0) {
        coverage = lineSize; // convert sub-pixel coverage to alpha
        lineSize = 1.0;
      }
      lineSize += aaWidth;

      float lineWidth = lineSize * pixelRatio;
      vLineWidth = noPerspectiveWrite(lineWidth, pos.w);
      ${O?e`vLineSizeInv = noPerspectiveWrite(1.0 / lineSize, pos.w);`:""}
  `),(d||u)&&i.main.add(e`
      float isEndVertex = float(!isStartVertex);
      vec2 segmentOrigin = mix(pos.xy, prev.xy, isEndVertex);
      vec2 segment = mix(right, left, isEndVertex);
      ${u?e`vec2 segmentEnd = mix(next.xy, pos.xy, isEndVertex);`:""}
    `),i.main.add(e`left = (leftLen > 0.001) ? left/leftLen : vec2(0.0, 0.0);
right = (rightLen > 0.001) ? right/rightLen : vec2(0.0, 0.0);
vec2 capDisplacementDir = vec2(0, 0);
vec2 joinDisplacementDir = vec2(0, 0);
float displacementLen = lineWidth;
if (isJoin) {
bool isOutside = (left.x * right.y - left.y * right.x) * lineParameters.y > 0.0;
joinDisplacementDir = normalize(left + right);
joinDisplacementDir = perpendicular(joinDisplacementDir);
if (leftLen > 0.001 && rightLen > 0.001) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
if (!isOutside) {
displacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
}
}
float subdivisionFactor = lineParameters.x;
if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),se?i.main.add(e`
        vec2 startDir = leftLen < 0.001 ? right : left;
        startDir = perpendicular(startDir);

        vec2 endDir = rightLen < 0.001 ? left : right;
        endDir = perpendicular(endDir);

        float factor = ${d?e`min(1.0, subdivisionFactor * ${e.float((z+2)/(z+1))})`:e`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir, endDir), -1.0, 1.0));
        joinDisplacementDir = rotate(startDir, -sign(lineParameters.y) * factor * rotationAngle);
      `):i.main.add(e`if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? right : left;
}
joinDisplacementDir = perpendicular(joinDisplacementDir);`);let de=h!==0;return i.main.add(e`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = perpendicular(joinDisplacementDir);

      ${de?e`capDisplacementDir = isStartVertex ? -right : left;`:""}
    }
  `),i.main.add(e`
    // Displacement (in pixels) caused by join/or cap
    vec2 dpos = joinDisplacementDir * sign(lineParameters.y) * displacementLen + capDisplacementDir * displacementLen;
    float lineDistNorm = noPerspectiveWrite(sign(lineParameters.y), pos.w);

    vLineDistance = lineWidth * lineDistNorm;
    ${C?e`vLineDistanceNorm = lineDistNorm;`:""}

    pos.xy += dpos;
  `),u&&i.main.add(e`vec2 segmentDir = normalize(segment);
vSegmentSDF = noPerspectiveWrite((isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin, segmentDir)), pos.w);
vReverseSegmentSDF = noPerspectiveWrite((isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd, -segmentDir)), pos.w);`),d&&(l?i.uniforms.add(new L("worldToScreenRatio",s=>1/s.screenToPCSRatio)):i.main.add(e`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),i.main.add(e`float segmentLengthScreenDouble = length(segment);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(nextPosition - position, position - prevPosition, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),l?i.main.add(e`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = u0 * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):i.main.add(e`float startPseudoScreen = mix(u0, u0 - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),i.uniforms.add(new p("stipplePatternPixelSize",s=>b(s))),i.main.add(e`float patternLength = patternLineSize * stipplePatternPixelSize;
vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);
if (segmentLengthScreenDouble >= 0.001) {
vec2 stippleDisplacement = pos.xy - segmentOrigin;
float stippleDisplacementFactor = dot(segment, stippleDisplacement) / (segmentLengthScreenDouble * segmentLengthScreenDouble);
vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
}
vStippleDistanceLimits = noPerspectiveWrite(vStippleDistanceLimits, pos.w);
vStippleDistance = noPerspectiveWrite(vStippleDistance, pos.w);
vStippleDistanceLimits = isJoin ?
vStippleDistanceLimits :
isStartVertex ?
vec2(-1e34, vStippleDistanceLimits.y) :
vec2(vStippleDistanceLimits.x, 1e34);`)),i.main.add(e`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;

      vColor = getColor();
      vColor.a = noPerspectiveWrite(vColor.a * coverage, pos.w);

      ${A&&!l?"pos.z -= 0.001 * pos.w;":""}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }`),t.fragment.include(N,o),t.include(Y,o),a.include(X),a.main.add(e`discardBySlice(vpos);
discardByTerrainDepth();`),t.include(g),a.main.add(e`
    float lineWidth = noPerspectiveRead(vLineWidth);
    float lineDistance = noPerspectiveRead(vLineDistance);
    ${c(C,e`float lineDistanceNorm = noPerspectiveRead(vLineDistanceNorm);`)}
  `),A?a.main.add(e`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(u&&a.main.add(e`
        float sdf = noPerspectiveRead(min(vSegmentSDF, vReverseSegmentSDF));
        vec2 fragmentPosition = vec2(min(sdf, 0.0), lineDistance);

        float fragmentRadius = length(fragmentPosition);
        float fragmentCapSDF = (fragmentRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
        float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);

        if (capCoverage < ${e.float(S)}) {
          discard;
        }
      `),E?a.main.add(e`
      vec2 stipplePosition = vec2(
        min(getStippleSDF() * 2.0 - 1.0, 0.0),
        lineDistanceNorm
      );
      float stippleRadius = length(stipplePosition * lineWidth);
      float stippleCapSDF = (stippleRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
      float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
      float stippleAlpha = step(${e.float(S)}, stippleCoverage);
      `):a.main.add(e`float stippleAlpha = getStippleAlpha(lineWidth);`),f!==10&&a.main.add(e`discardByStippleAlpha(stippleAlpha, ${e.float(S)});`),t.include(g),a.uniforms.add(new v("intrinsicColor",s=>s.color)).main.add(e`vec4 color = intrinsicColor * vColor;
color.a = noPerspectiveRead(color.a);`),le&&a.uniforms.add(new v("innerColor",s=>s.innerColor??s.color),new p("innerWidth",(s,ce)=>s.innerWidth*ce.camera.pixelRatio)).main.add(e`float distToInner = abs(lineDistance) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`),a.main.add(e`vec4 finalColor = blendStipple(color, stippleAlpha);`),F&&(a.uniforms.add(new p("falloff",s=>s.falloff)),a.main.add(e`finalColor.a *= pow(max(0.0, 1.0 - abs(lineDistanceNorm)), falloff);`)),d||a.main.add(e`float featherStartDistance = max(lineWidth - 2.0, 0.0);
float value = abs(lineDistance);
float feather = (value - featherStartDistance) / (lineWidth - featherStartDistance);
finalColor.a *= 1.0 - clamp(feather, 0.0, 1.0);`),pe&&a.main.add(e`
        finalColor = animate(finalColor);

        ${c(f!==10,e`
            if (finalColor.a <= ${e.float(S)}) {
              discard;
            }`)}
      `)),a.main.add(e`outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),t}var mt=Object.freeze(Object.defineProperty({__proto__:null,build:ge,ribbonlineNumRoundJoinSubdivisions:z},Symbol.toStringTag,{value:"Module"}));export{y as a,ye as b,z as c,ge as d,mt as e};
