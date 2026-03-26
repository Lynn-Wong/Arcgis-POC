import{a as M}from"./chunk-2VKKL6YM.js";import{a as z}from"./chunk-H5WX5TXE.js";import{a as S}from"./chunk-N5UWJJ2M.js";import{a as D,b as L}from"./chunk-GVXXBNZP.js";import{a as T}from"./chunk-XSD5BTYG.js";import{a as c}from"./chunk-YEMBISS4.js";import{a as f}from"./chunk-O5NYEJB2.js";import{a as U}from"./chunk-7GY7HBFV.js";import{a as p}from"./chunk-FAYM6DKX.js";import{c as C}from"./chunk-2EG4SLVE.js";import{a as v}from"./chunk-B7VK56II.js";import{a as h}from"./chunk-BAC6RMAZ.js";import{a as g}from"./chunk-2NXJIMQ2.js";import{a as O}from"./chunk-Q5RZKMWM.js";import{a as y}from"./chunk-A634OTHD.js";import{a as u}from"./chunk-24Z55BQA.js";import{a as W}from"./chunk-QF5M5KTV.js";import{a as j}from"./chunk-H2ASV3YO.js";import{a as F}from"./chunk-2XDZ5QNL.js";import{a as e,b as s}from"./chunk-UUP4FBYC.js";import{a as k,c as N}from"./chunk-6QJXCAOV.js";import{b}from"./chunk-RL4CZUGQ.js";function R(t){let r=e`bool isNaN( float val )
{
return ( val < 0.0 || 0.0 < val || val == 0.0 ) ? false : true;
}`;t.code.add(r)}var G=N(.5,-4e-4);function B(t,r){let o=t.vertex;o.include(R),o.constants.add("depthBias","vec2",G),o.uniforms.add(new u("inverseViewport",a=>a.inverseViewport)),r.legacy?(o.uniforms.add(new v("proj",a=>a.camera.projectionMatrix)),o.code.add(e`vec2 calculateProjectedBiasXY(vec4 projPos, vec3 globalNormal) {
float offsetXY = depthBias.x;
vec4 projNormal = proj * localView * vec4(globalNormal, 0.0);
return offsetXY * projPos.w * 2.0 * inverseViewport * normalize(projNormal.xyz).xy;
}`)):(o.uniforms.add(new p("transformNormalViewFromGlobal",a=>a.transformNormalViewFromGlobal),new T("transformProjFromView",a=>a.transformProjFromView)),o.code.add(e`vec2 calculateProjectedBiasXY(vec4 projPos, vec3 globalNormal) {
float offsetXY = depthBias.x;
vec4 projNormal = transformProjFromView * vec4(transformNormalViewFromGlobal * globalNormal, 0.0);
return offsetXY * projPos.w * 2.0 * inverseViewport * normalize(projNormal.xyz).xy;
}`)),o.code.add(e`float _calculateProjectedBiasZ(vec4 projPos) {
float offsetZ = depthBias.y;
return sqrt(max(projPos.z,0.0)) * offsetZ;
}
vec4 adjustProjectedPosition(vec4 projPos, vec3 worldNormal, float lineWidth) {
vec2 offsetXY = calculateProjectedBiasXY(projPos, worldNormal);
if (!isNaN(offsetXY.x) && !isNaN(offsetXY.y)) {
projPos.xy += offsetXY;
}
projPos.z += _calculateProjectedBiasZ(projPos);
return projPos;
}`)}function I(t,r){let o=t.vertex;r.silhouette?(o.code.add(e`bool isSilhouetteEdge(vec3 viewDir, vec3 normalA, vec3 normalB) {
float faceAVisible = dot(viewDir, normalA);
float faceBVisible = dot(viewDir, normalB);
return faceAVisible * faceBVisible < 0.0;
}`),r.legacy?o.code.add(e`bool discardNonSilhouetteEdges(vec3 viewPos, vec3 worldPos, ComponentData data) {
vec3 viewNormalA = _modelToViewNormal(data.normal);
vec3 viewNormalB = _modelToViewNormal(data.normal2);
vec3 viewDir = -viewPos;
if (isSilhouetteEdge(viewDir, viewNormalA, viewNormalB)) {
return false;
}
gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
return true;
}`):o.code.add(e`bool discardNonSilhouetteEdges(vec3 viewPos, vec3 worldPos, ComponentData data) {
vec3 worldNormalA = _modelToWorldNormal(data.normal);
vec3 worldNormalB = _modelToWorldNormal(data.normal2);
vec3 viewDir = -worldPos;
if (isSilhouetteEdge(viewDir, worldNormalA, worldNormalB)) {
return false;
}
gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
return true;
}`)):o.code.add(e`bool discardNonSilhouetteEdges(vec3 viewPos, vec3 worldPos, ComponentData data) {
return false;
}`)}function _(t){let r=t.vertex;r.uniforms.add(new j("distanceFalloffFactor",o=>o.distanceFalloffFactor)),r.code.add(e`float distanceBasedPerspectiveFactor(float distance) {
return clamp(sqrt(distanceFalloffFactor / distance), 0.0, 1.0);
}`)}function E(t,r){let{vertex:o}=t;o.include(z),t.include(S,r);let{silhouette:a,legacy:i,spherical:l}=r;o.uniforms.add(new f("componentDataTex",n=>n.componentDataTexture)),t.attributes.add("componentIndex","float"),o.constants.add("lineWidthFractionFactor","float",8),o.constants.add("extensionLengthOffset","float",128),o.code.add(e`
    vec2 _componentTextureCoords(float componentIndex, float fieldOffset) {
      float fieldIndex = ${e.float(3)}  * componentIndex + fieldOffset;
      float texSize = float(textureSize(componentDataTex, 0).x);
      float colIndex = mod(fieldIndex, texSize);
      float rowIndex = floor(fieldIndex / texSize);

      return vec2(colIndex, rowIndex) + 0.5;
    }

    struct ComponentData {
      vec4 color;
      vec3 normal;
      vec3 normal2;
      float lineWidth;
      float extensionLength;
      float type;
      float verticalOffset;
    };

    ComponentData readComponentData() {
      vec2 colorIndex = _componentTextureCoords(componentIndex, ${e.float(0)});
      vec2 otherIndex = _componentTextureCoords(componentIndex, ${e.float(1)});
      vec2 verticalOffsetIndex = _componentTextureCoords(float(componentIndex), ${e.float(2)} );
      vec3 normal = normalModel();
      vec3 normal2 = ${a?e`decompressNormal(normal2Compressed)`:e`normal`};

      vec4 colorValue = texelFetch(componentDataTex, ivec2(colorIndex), 0);
      vec4 otherValue = texelFetch(componentDataTex, ivec2(otherIndex), 0);
      float verticalOffset = uninterpolatedRGBAToFloat(texelFetch(componentDataTex, ivec2(verticalOffsetIndex), 0)) * ${e.float(M)};

      return ComponentData(
        vec4(colorValue.rgb, colorValue.a * otherValue.w), // otherValue.w stores separate opacity
        normal, normal2,
        otherValue.x * (255.0 / ${e.float(8)} ),
        otherValue.y * 255.0 - ${e.float(128)},
        -(otherValue.z * 255.0) + 0.5, // SOLID (=0/255) needs to be > 0.0, SKETCHY (=1/255) needs to be <= 0;
        verticalOffset
      );
    }
  `),i?o.code.add(e`vec3 _modelToWorldNormal(vec3 normal) {
return (model * vec4(normal, 0.0)).xyz;
}
vec3 _modelToViewNormal(vec3 normal) {
return (localView * model * vec4(normal, 0.0)).xyz;
}`):(o.uniforms.add(new L("transformNormalGlobalFromModel",n=>n.transformNormalGlobalFromModel)),o.code.add(e`vec3 _modelToWorldNormal(vec3 normal) {
return transformNormalGlobalFromModel * normal;
}`)),a?(t.attributes.add("normal2Compressed","vec2"),o.code.add(e`vec3 worldNormal(ComponentData data) {
return _modelToWorldNormal(normalize(data.normal + data.normal2));
}`)):o.code.add(e`vec3 worldNormal(ComponentData data) {
return _modelToWorldNormal(data.normal);
}`),i?o.code.add(e`void worldAndViewFromModelPosition(vec3 modelPos, float verticalOffset, out vec3 worldPos, out vec3 viewPos) {
worldPos = (model * vec4(modelPos, 1.0)).xyz;
viewPos = (localView * vec4(worldPos, 1.0)).xyz;
}`):(o.include(D,r),o.uniforms.add(new p("transformViewFromCameraRelativeRS",n=>n.transformViewFromCameraRelativeRS),new L("transformWorldFromModelRS",n=>n.transformWorldFromModelRS),new h("transformWorldFromModelTL",n=>n.transformWorldFromModelTL),new h("transformWorldFromModelTH",n=>n.transformWorldFromModelTH),new g("transformWorldFromViewTL",n=>n.transformWorldFromViewTL),new g("transformWorldFromViewTH",n=>n.transformWorldFromViewTH)),o.code.add(e`
      void worldAndViewFromModelPosition(vec3 modelPos, float verticalOffset, out vec3 worldPos, out vec3 viewPos) {
        vec3 rotatedModelPosition = transformWorldFromModelRS * modelPos;

        vec3 transformCameraRelativeFromModel = dpAdd(
          transformWorldFromModelTL,
          transformWorldFromModelTH,
          -transformWorldFromViewTL,
          -transformWorldFromViewTH
        );

        worldPos = transformCameraRelativeFromModel + rotatedModelPosition;

        if (verticalOffset != 0.0) {
          vec3 vUp = ${l?"normalize(transformWorldFromModelTL + rotatedModelPosition);":"vec3(0.0, 0.0, 1.0);"}
          worldPos += verticalOffset * vUp;
        }

        viewPos = transformViewFromCameraRelativeRS * worldPos;
      }
    `)),o.uniforms.add(new v("transformProjFromView",n=>n.camera.projectionMatrix)).code.add(e`vec4 projFromViewPosition(vec3 position) {
return transformProjFromView * vec4(position, 1.0);
}`),o.code.add(e`float calculateExtensionLength(float extensionLength, float lineLength) {
return extensionLength / (log2(max(1.0, 256.0 / lineLength)) * 0.2 + 1.0);
}`)}function $(t){return t===1||t===2}function m(t,r){let o=r.type===2,a=r.type===0;t.attributes.add("sideness","vec2"),t.vertex.code.add(e`
    struct UnpackedAttributes {
      vec2 sideness;
      vec2 sidenessNorm;
      float lineWidthPixels;
      float extensionLengthPixels;
      ${s(o,"float type;")}
    };
  `).code.add(e`
    UnpackedAttributes unpackAttributes(ComponentData component) {
      vec2 sidenessNorm = sideness;
      vec2 sideness = sidenessNorm * 2.0 - 1.0;
      float extensionLengthPixels = component.extensionLength;
      float lineWidth = component.lineWidth;
      ${s(o,"if (component.type <= 0.0) {")}
      ${s(!a,"extensionLengthPixels *= variantExtension * 2.0 - 1.0;")}
      ${s(o,"}")}
      return UnpackedAttributes(sideness, sidenessNorm, lineWidth, extensionLengthPixels ${s(o,", component.type")});
    }
  `)}function X(t,r){let o=t.vertex;switch(t.include(m,r),r.type){case 0:o.code.add(e`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
return 0.0;
}`);break;case 1:o.uniforms.add(new c("strokesAmplitude",a=>a.strokesTexture.amplitude)).code.add(e`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
return strokesAmplitude;
}`);break;case 2:o.uniforms.add(new c("strokesAmplitude",a=>a.strokesTexture.amplitude)).code.add(e`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
float type = unpackedAttributes.type;
if (type <= 0.0) {
return strokesAmplitude;
}
return 0.0;
}`);break;case 3:break;default:r.type}}function Y(t,r){t.include(m,r);let{vertex:o,fragment:a}=t;switch($(r.type)&&(t.varyings.add("vStrokeUV","vec2"),o.uniforms.add(new f("strokesTexture",i=>i.strokesTexture.texture),new c("strokesLog2Resolution",i=>Math.log2(i.strokesTexture.resolution)),new c("strokeVariants",i=>i.strokesTexture.variants)).code.add(e`void calculateStyleOutputsSketch(float lineLength, UnpackedAttributes unpackedAttributes) {
vec2 sidenessNorm = unpackedAttributes.sidenessNorm;
float lineIndex = clamp(ceil(log2(lineLength)), 0.0, strokesLog2Resolution);
vStrokeUV = vec2(exp2(lineIndex) * sidenessNorm.y, lineIndex * strokeVariants + variantStroke + 0.5) / vec2(textureSize(strokesTexture, 0));
vStrokeUV.x += variantOffset;
}`),a.uniforms.add(new f("strokesTexture",i=>i.strokesTexture.texture)).code.add(e`float calculateLineOffsetSketch() {
return texture(strokesTexture, vStrokeUV).r;
}
float calculateLinePressureSketch() {
return texture(strokesTexture, vStrokeUV + vec2(0.0, 0.5)).r;
}`)),r.type){case 0:o.code.add(e`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes) {}`),a.code.add(e`float calculateLineOffset() {
return 0.0;
}
float calculateLinePressure() {
return 1.0;
}`);break;case 1:o.code.add(e`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes)
{
calculateStyleOutputsSketch(vLineLengthPixels, unpackedAttributes);
}`),a.code.add(e`float calculateLineOffset() {
return calculateLineOffsetSketch();
}
float calculateLinePressure() {
return calculateLinePressureSketch();
}`);break;case 2:t.varyings.add("vType","float"),o.code.add(e`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes)
{
vType = unpackedAttributes.type;
if (unpackedAttributes.type <= 0.0) {
calculateStyleOutputsSketch(vLineLengthPixels, unpackedAttributes);
}
}`),a.code.add(e`float calculateLineOffset() {
if (vType <= 0.0) {
return calculateLineOffsetSketch();
}
else {
return 0.0;
}
}
float calculateLinePressure() {
if (vType <= 0.0) {
return calculateLinePressureSketch();
}
else {
return 1.0;
}
}`);break;case 3:break;default:r.type}}function Z(t){let r=new W,{vertex:o,fragment:a,varyings:i,attributes:l}=r;t.legacy&&o.uniforms.add(new x("model"),new x("localView")),r.include(B,t),r.include(E,t),r.include(X,t),r.include(m,t),r.include(Y,t),a.include(C,t),r.include(I,t),r.include(U,t),r.include(_,t),i.add("vColor","vec4"),i.add("vRadius","float"),i.add("vPosition","vec3",{invariant:!0}),i.add("vWorldPosition","vec3",{invariant:!0}),i.add("vLineLengthPixels","float"),i.add("vSizeFalloffFactor","float"),o.uniforms.add(new u("pixelToNDC",({camera:d})=>b(q,2/d.fullViewport[2],2/d.fullViewport[3])),new O("viewport",d=>d.camera.fullViewport),new y("pixelRatio",d=>d.camera.pixelRatio)),l.add("position0","vec3"),l.add("position1","vec3"),l.add("variantOffset","float"),l.add("variantStroke","float"),l.add("variantExtension","float");let A=t.type===1,P=t.type===2,V=1/255,w=1;return o.code.add(e`
    void calculateGeometricOutputs(vec3 viewPosV0, vec3 viewPosV1, vec3 worldPosV0, vec3 worldPosV1, vec3 worldNormal, UnpackedAttributes unpackedAttributes) {
      vec2 sideness = unpackedAttributes.sideness;
      vec2 sidenessNorm = unpackedAttributes.sidenessNorm;

      vWorldPosition = mix(worldPosV0, worldPosV1, sidenessNorm.y).xyz;

      vec3 viewPos = mix(viewPosV0, viewPosV1, sidenessNorm.y);
      forwardViewPosDepth(viewPos);

      vec4 projPosV0 = projFromViewPosition(viewPosV0);
      vec4 projPosV1 = projFromViewPosition(viewPosV1);
      vec4 projPos = projFromViewPosition(viewPos);

      vec3 screenSpaceLineNDC = (projPosV1.xyz / projPosV1.w - projPosV0.xyz / projPosV0.w);
      vec2 ndcToPixel = viewport.zw * 0.5;
      vec2 screenSpaceLinePixels = screenSpaceLineNDC.xy * ndcToPixel;
      float lineLengthPixels = length(screenSpaceLinePixels);

      float dzPerPixel = screenSpaceLineNDC.z / lineLengthPixels;
      vec2 screenSpaceDirection = screenSpaceLinePixels / lineLengthPixels;
      vec2 perpendicularScreenSpaceDirection = vec2(screenSpaceDirection.y, -screenSpaceDirection.x) * sideness.x;

      float falloffFactor = distanceBasedPerspectiveFactor(-viewPos.z) * pixelRatio;
      float lineWidthPixels = unpackedAttributes.lineWidthPixels * falloffFactor;

      float extensionLengthPixels = calculateExtensionLength(unpackedAttributes.extensionLengthPixels, lineLengthPixels) * falloffFactor;
      float lineAmplitudePixels = calculateLineAmplitude(unpackedAttributes) * pixelRatio;

      vSizeFalloffFactor = falloffFactor;

      float lineWidthAndAmplitudePixels = lineWidthPixels + lineAmplitudePixels + lineAmplitudePixels;
      float extendedLineLengthPixels = lineLengthPixels + extensionLengthPixels + extensionLengthPixels;

      // Line size with padding
      float halfAAPaddedLineWidthAndAmplitudePixels = lineWidthAndAmplitudePixels * 0.5 + ${e.float(w)};
      float aaPaddedRoundedCapSizePixels = lineWidthPixels * 0.5 + ${e.float(w)};

      // Half line width in NDC including padding for anti aliasing
      vec2 halfAAPaddedLineWidthAndAmplitudeNDC = halfAAPaddedLineWidthAndAmplitudePixels * pixelToNDC;
      vec2 aaPaddedRoundedCapSizeNDC = aaPaddedRoundedCapSizePixels * pixelToNDC;
      vec2 extensionLengthNDC = extensionLengthPixels * pixelToNDC;

      // Compute screen space position of vertex, offsetting for line size and end caps
      vec2 ndcOffset = (
          screenSpaceDirection * sideness.y * (aaPaddedRoundedCapSizeNDC + extensionLengthNDC)
        + perpendicularScreenSpaceDirection * halfAAPaddedLineWidthAndAmplitudeNDC
      );

      projPos.xy += ndcOffset * projPos.w;
      projPos.z += (dzPerPixel * (aaPaddedRoundedCapSizePixels + extensionLengthPixels)) * sideness.y * projPos.w;

      projPos = adjustProjectedPosition(projPos, worldNormal, 1.0 + max((lineWidthAndAmplitudePixels - 1.0) * 0.5, 0.0));

      // Line length with end caps
      float aaPaddedLineWithCapsLengthPixels = extendedLineLengthPixels + aaPaddedRoundedCapSizePixels + aaPaddedRoundedCapSizePixels;

      float pixelPositionAlongLine = aaPaddedLineWithCapsLengthPixels * sidenessNorm.y - aaPaddedRoundedCapSizePixels;

      // Position in pixels with origin at first vertex of line segment
      vPosition = vec3(
        halfAAPaddedLineWidthAndAmplitudePixels * sideness.x,
        pixelPositionAlongLine,
        pixelPositionAlongLine / extendedLineLengthPixels
      );

      // The line width radius in pixels
      vRadius = lineWidthPixels * 0.5;
      vLineLengthPixels = extendedLineLengthPixels;

      // discard short edges below a certain length threshold
      ${s(A||P,e`if (lineLengthPixels <= 3.0 ${s(P," && unpackedAttributes.type <= 0.0")}) {
                gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
                return;
             }`)}
      gl_Position = projPos;
    }`),o.main.add(e`
    ComponentData component = readComponentData();
    UnpackedAttributes unpackedAttributes = unpackAttributes(component);

    vec3 worldPosV0, worldPosV1, viewPosV0, viewPosV1;
    worldAndViewFromModelPosition(position0, component.verticalOffset, worldPosV0, viewPosV0);
    worldAndViewFromModelPosition(position1, component.verticalOffset, worldPosV1, viewPosV1);

    // Component color
    vColor = component.color;

    // Discard fully transparent edges
    if (vColor.a < ${e.float(V)}) {
      gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
      return;
    }

    if (discardNonSilhouetteEdges(viewPosV0, worldPosV0, component)) {
      return;
    }

    // General geometric computation for all types of edges
    calculateGeometricOutputs(viewPosV0, viewPosV1, worldPosV0, worldPosV1, worldNormal(component), unpackedAttributes);

    // Specific computation for different edge styles
    calculateStyleOutputs(unpackedAttributes);`),a.code.add(e`float lineWithCapsDistance(float radius, vec2 position, float lineLength) {
float positionX = position.x - calculateLineOffset();
if (radius < 1.0) {
float coverageX = clamp(min(radius, positionX + 0.5) - max(-radius, positionX - 0.5), 0.0, 1.0);
float coverageY = clamp(min(lineLength, position.y + 0.5) - max(0.0, position.y - 0.5), 0.0, 1.0);
return 0.5 - min(coverageX, coverageY);
}
else {
float positionOnCap = position.y - clamp(position.y, 0.0, lineLength);
return length(vec2(positionX, positionOnCap)) - radius;
}
}`),a.main.add(e`discardByTerrainDepth();
float radius = vRadius * calculateLinePressure();
float distance = lineWithCapsDistance(radius, vPosition.xy, vLineLengthPixels);
float coverage = clamp(0.5 - distance, 0.0, 1.0);
discardBySlice(vWorldPosition);
fragColor = vec4(vColor.rgb, vColor.a * coverage);`),r}var q=k(),x=class extends F{constructor(r){super(r,"mat4")}},ao=Object.freeze(Object.defineProperty({__proto__:null,build:Z},Symbol.toStringTag,{value:"Module"}));export{Z as a,ao as b};
