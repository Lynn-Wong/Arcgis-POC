import{a as I,b as U}from"./chunk-GAOY3X2C.js";import{a as u}from"./chunk-5RRAPQXN.js";import{e as M}from"./chunk-A3EE4NCD.js";import{a as C}from"./chunk-7OPIVF5F.js";import{a as E,b as T}from"./chunk-N4F7I4XE.js";import{a as P}from"./chunk-COHKIGGR.js";import{a as W}from"./chunk-Z5A2D2S2.js";import{f as h}from"./chunk-KFI4I766.js";import{a as b}from"./chunk-YQSUB555.js";import{a as F}from"./chunk-7GY7HBFV.js";import{a as z}from"./chunk-3C5EAPCU.js";import{a as y}from"./chunk-N3BZYENM.js";import{a as i}from"./chunk-VGAXEXH3.js";import{c as m}from"./chunk-2EG4SLVE.js";import{a as D,b as N}from"./chunk-5VGDBOMN.js";import{a as l}from"./chunk-J6IEXWQ2.js";import{a as S}from"./chunk-YZ4IDPMQ.js";import{a as O}from"./chunk-QF5M5KTV.js";import{a as c}from"./chunk-H2ASV3YO.js";import{a as d}from"./chunk-45K2AY22.js";import{a}from"./chunk-UUP4FBYC.js";import{a as x}from"./chunk-6QJXCAOV.js";import{a as _}from"./chunk-YMQ4BGWF.js";import{b as w}from"./chunk-OFZRIX6T.js";import{b as g}from"./chunk-RL4CZUGQ.js";function f(o){o.fragment.uniforms.add(new d("texWaveNormal",e=>e.waveNormal),new d("texWavePerturbation",e=>e.wavePerturbation),new l("waveParams",e=>w(B,e.waveStrength,e.waveTextureRepeat,e.flowStrength,e.flowOffset)),new S("waveDirection",e=>g(R,e.waveDirection[0]*e.waveVelocity,e.waveDirection[1]*e.waveVelocity))),o.fragment.include(I),o.fragment.code.add(a`const vec2  FLOW_JUMP = vec2(6.0/25.0, 5.0/24.0);
vec2 textureDenormalized2D(sampler2D _tex, vec2 _uv) {
return 2.0 * texture(_tex, _uv).rg - 1.0;
}
float sampleNoiseTexture(vec2 _uv) {
return texture(texWavePerturbation, _uv).b;
}
vec3 textureDenormalized3D(sampler2D _tex, vec2 _uv) {
return 2.0 * texture(_tex, _uv).rgb - 1.0;
}
float computeProgress(vec2 uv, float time) {
return fract(time);
}
float computeWeight(vec2 uv, float time) {
float progress = computeProgress(uv, time);
return 1.0 - abs(1.0 - 2.0 * progress);
}
vec3 computeUVPerturbedWeigth(sampler2D texFlow, vec2 uv, float time, float phaseOffset) {
float flowStrength = waveParams[2];
float flowOffset = waveParams[3];
vec2 flowVector = textureDenormalized2D(texFlow, uv) * flowStrength;
float progress = computeProgress(uv, time + phaseOffset);
float weight = computeWeight(uv, time + phaseOffset);
vec2 result = uv;
result -= flowVector * (progress + flowOffset);
result += phaseOffset;
result += (time - progress) * FLOW_JUMP;
return vec3(result, weight);
}
const float TIME_NOISE_TEXTURE_REPEAT = 0.3737;
const float TIME_NOISE_STRENGTH = 7.77;
vec3 getWaveLayer(sampler2D _texNormal, sampler2D _dudv, vec2 _uv, vec2 _waveDir, float time) {
float waveStrength = waveParams[0];
vec2 waveMovement = time * -_waveDir;
float timeNoise = sampleNoiseTexture(_uv * TIME_NOISE_TEXTURE_REPEAT) * TIME_NOISE_STRENGTH;
vec3 uv_A = computeUVPerturbedWeigth(_dudv, _uv + waveMovement, time + timeNoise, 0.0);
vec3 uv_B = computeUVPerturbedWeigth(_dudv, _uv + waveMovement, time + timeNoise, 0.5);
vec3 normal_A = textureDenormalized3D(_texNormal, uv_A.xy) * uv_A.z;
vec3 normal_B = textureDenormalized3D(_texNormal, uv_B.xy) * uv_B.z;
vec3 mixNormal = normalize(normal_A + normal_B);
mixNormal.xy *= waveStrength;
mixNormal.z = sqrt(1.0 - dot(mixNormal.xy, mixNormal.xy));
return mixNormal;
}
vec4 getSurfaceNormalAndFoam(vec2 _uv, float _time) {
float waveTextureRepeat = waveParams[1];
vec3 normal = getWaveLayer(texWaveNormal, texWavePerturbation, _uv * waveTextureRepeat, waveDirection, _time);
float foam  = normals2FoamIntensity(normal, waveParams[0]);
return vec4(normal, foam);
}`)}var B=_(),R=x();function V(o){let e=new O,{vertex:r,fragment:t,varyings:s}=e,{output:p,draped:A,receiveShadows:j}=o;N(r,o),e.include(P),e.attributes.add("position","vec3"),e.attributes.add("uv0","vec2");let v=new l("waterColor",n=>n.color);if(s.add("vpos","vec3",{invariant:!0}),r.uniforms.add(v),h(p)){if(A)return r.main.add(a`
      if (waterColor.a < ${a.float(i)}) {
        // Discard this vertex
        gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        return;
      }

      vpos = position;
      gl_Position = transformPosition(proj, view, vpos);`),t.uniforms.add(v),t.main.add(a`fragColor = waterColor;`),e;e.include(u,o),s.add("vuv","vec2"),s.add("vnormal","vec3"),s.add("vtbnMatrix","mat3"),r.main.add(a`
      if (waterColor.a < ${a.float(i)}) {
        // Discard this vertex
        gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        return;
      }

      vuv = uv0;
      vpos = position;

      vnormal = getLocalUp(vpos, localOrigin);
      vtbnMatrix = getTBNMatrix(vnormal);
      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);

      gl_Position = transformPosition(proj, view, vpos);
      forwardLinearDepthToReadShadowMap();`)}switch(e.include(M,o),e.include(F,o),p){case 0:case 1:e.include(C,{pbrMode:0,lightingSphericalHarmonicsOrder:2}),e.include(f),e.include(U,o),t.include(m,o),e.include(W,o),t.include(z),D(t,o),E(t),T(t),t.uniforms.add(v,new c("timeElapsed",({timeElapsed:n})=>n),r.uniforms.get("view"),r.uniforms.get("localOrigin")).main.add(a`
        discardBySlice(vpos);
        discardByTerrainDepth();
        vec3 localUp = vnormal;
        // the created normal is in tangent space
        vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);

        // we rotate the normal according to the tangent-bitangent-normal-Matrix
        vec3 n = normalize(vtbnMatrix * tangentNormalFoam.xyz);
        vec3 v = -normalize(vpos - cameraPosition);
        float shadow = ${j?a`1.0 - readShadowMap(vpos, linearDepth)`:"1.0"};
        vec4 vPosView = view * vec4(vpos, 1.0);
        vec4 final = vec4(getSeaColor(n, v, mainLightDirection, waterColor.rgb, mainLightIntensity, localUp, shadow, tangentNormalFoam.w, vPosView.xyz, vpos + localOrigin), waterColor.w);

        fragColor = delinearizeGamma(final);
        outputColorHighlightOID(fragColor, vpos, final.rgb);`);break;case 3:e.include(u,o),e.include(f,o),t.include(m,o),s.add("vuv","vec2"),r.main.add(a`
        if (waterColor.a < ${a.float(i)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vuv = uv0;
        vpos = position;

        gl_Position = transformPosition(proj, view, vpos);`),t.uniforms.add(new c("timeElapsed",({timeElapsed:n})=>n)).main.add(a`discardBySlice(vpos);
vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);
tangentNormalFoam.xyz = normalize(tangentNormalFoam.xyz);
fragColor = vec4((tangentNormalFoam.xyz + vec3(1.0)) * 0.5, tangentNormalFoam.w);`);break;case 9:e.include(y,o),r.main.add(a`
        if (waterColor.a < ${a.float(i)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vpos = position;
        gl_Position = transformPosition(proj, view, vpos);`),t.include(m,o),t.main.add(a`discardBySlice(vpos);
calculateOcclusionAndOutputHighlight();`);break;case 10:e.include(b,o),r.main.add(a`
        if (waterColor.a < ${a.float(i)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vpos = position;
        gl_Position = transformPosition(proj, view, vpos);
        forwardObjectAndLayerIdColor();`),t.include(m,o),t.main.add(a`discardBySlice(vpos);
outputObjectAndLayerIdColor();`)}return e}var he=Object.freeze(Object.defineProperty({__proto__:null,build:V},Symbol.toStringTag,{value:"Module"}));export{V as a,he as b};
