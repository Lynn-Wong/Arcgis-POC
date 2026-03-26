import{a as l}from"./chunk-T32QXVA7.js";import{a as f}from"./chunk-JIVOQNH4.js";import{a as g}from"./chunk-7GY7HBFV.js";import{a as s}from"./chunk-Y6XGMUC4.js";import{a as m}from"./chunk-YQXWXQD3.js";import{a as r}from"./chunk-B7VK56II.js";import{a as c}from"./chunk-2NXJIMQ2.js";import{a as v}from"./chunk-L7NOU4T2.js";import{a as x}from"./chunk-YZ4IDPMQ.js";import{a as h}from"./chunk-QF5M5KTV.js";import{a as i}from"./chunk-H2ASV3YO.js";import{a as t,b as p}from"./chunk-UUP4FBYC.js";import{f as d}from"./chunk-6QJXCAOV.js";import{i as o}from"./chunk-JARU7KSM.js";function y(n){n.code.add(t`void computeCovariance3D(in mat3 rotation, in vec3 scale, out vec3 covarianceA, out vec3 covarianceB) {
mat3 scaleMatrix = mat3(
vec3(scale.x, 0.0, 0.0),
vec3(0.0, scale.y, 0.0),
vec3(0.0, 0.0, scale.z)
);
mat3 M = scaleMatrix * rotation;
mat3 covariance3D = transpose(M) * M;
covarianceA = vec3(covariance3D[0][0], covariance3D[0][1], covariance3D[0][2]);
covarianceB = vec3(covariance3D[1][1], covariance3D[1][2], covariance3D[2][2]);
}
vec3 computeCovariance2D(vec3 center, float focalLength, vec2 tanFov, float[6] cov3D, mat4 view) {
vec4 viewSpacePoint = vec4(center, 1);
vec2 max = 1.3 * tanFov;
vec2 normalized = viewSpacePoint.xy / viewSpacePoint.z;
viewSpacePoint.xy = clamp(normalized, -max, max) * viewSpacePoint.z;
float invZ = 1.0 / viewSpacePoint.z;
float invZSquared = invZ * invZ;
mat3 projectionJacobian = mat3(
focalLength * invZ,  0.0,                   -(focalLength * viewSpacePoint.x) * invZSquared,
0.0,                 focalLength * invZ,    -(focalLength * viewSpacePoint.y) * invZSquared,
0.0,                 0.0,                   0.0
);
mat3 worldToView = transpose(mat3(view));
mat3 T = worldToView * projectionJacobian;
mat3 covariance3D = mat3(
cov3D[0], cov3D[1], cov3D[2],
cov3D[1], cov3D[3], cov3D[4],
cov3D[2], cov3D[4], cov3D[5]
);
mat3 covariance2D = transpose(T) * transpose(covariance3D) * T;
const float regularization = 0.3;
covariance2D[0][0] += regularization;
covariance2D[1][1] += regularization;
return vec3(covariance2D[0][0], covariance2D[0][1], covariance2D[1][1]);
}`)}function w(n){n.code.add(t`vec4 unpackColor(uvec4 packedGaussian) {
vec4 color;
color.r = float((packedGaussian.w >> 1u) & 0xfeu);
color.g = float((packedGaussian.w >> 9u) & 0xffu);
color.b = float((packedGaussian.w >> 16u) & 0xfeu);
color.a = float((packedGaussian.w >> 24u) & 0xffu);
return color / 255.0;
}`),n.code.add(t`vec3 unpackScale(uvec4 packedGaussian) {
uint sx = (packedGaussian.z >> 10u) & 0xffu;
uint sy = (packedGaussian.z >> 18u) & 0xffu;
uint szLow = (packedGaussian.z >> 26u) & 0x3fu;
uint szHigh = packedGaussian.a & 0x3u;
uint sz = szLow | (szHigh << 6u);
return exp(vec3(sx, sy, sz) / 16.0 - 10.0);
}`),n.code.add(t`const uint MASK_9_BITS = 0x1FFu;
const float SQRT_HALF = 0.7071067811865476;
const ivec3 COMPONENT_ORDER[4] = ivec3[4](
ivec3(3, 2, 1),
ivec3(3, 2, 0),
ivec3(3, 1, 0),
ivec3(2, 1, 0)
);
vec4 unpackQuaternion(uvec4 packedGaussian) {
uint packedRotation = packedGaussian.x;
uint largestComponent = packedRotation >> 30u;
vec4 quaternion = vec4(0.0);
float sumSquares = 0.0;
uint bitfield = packedRotation;
for (int j = 0; j < 3; ++j) {
int index = COMPONENT_ORDER[int(largestComponent)][j];
uint magnitude = bitfield & MASK_9_BITS;
uint signBit = (bitfield >> 9u) & 1u;
bitfield = bitfield >> 10u;
float value = SQRT_HALF * float(magnitude) / float(MASK_9_BITS);
quaternion[index] = signBit == 1u ? -value : value;
sumSquares += value * value;
}
quaternion[int(largestComponent)] = sqrt(1.0 - sumSquares);
return quaternion;
}`),n.code.add(t`vec3 unpackTileOriginRelativePosition(uvec4 packedGaussian) {
uint packedPositionLow = packedGaussian.y;
uint packedPositionHigh = packedGaussian.z;
uint x = packedPositionLow & 0x3FFFu;
uint y = (packedPositionLow >> 14u) & 0x3FFFu;
uint zLow = (packedPositionLow >> 28u) & 0xFu;
uint zHigh = packedPositionHigh & 0x3FFu;
uint z = zLow | (zHigh << 4u);
return vec3(float(x), float(y), float(z));
}`),n.code.add(t`vec3 unpackCameraRelativeGaussianPosition(uvec4 packedHeader, highp vec3 position, vec3 cameraPosition, vec3 cameraPos8k, vec3 cameraDelta) {
vec3 tileOrigin = uintBitsToFloat(packedHeader.xyz);
float invPosScale = 1.0 / exp2(float(packedHeader.w & 0xffu));
vec3 delta = tileOrigin.xyz - cameraPos8k;
vec3 cameraRelativePosition = position.xyz * invPosScale + delta * 2.048 - cameraDelta;
return cameraRelativePosition;
}`)}function P(n){n.code.add(t`mat3 quaternionToRotationMatrix(vec4 q) {
float x2 = q.x + q.x;
float y2 = q.y + q.y;
float z2 = q.z + q.z;
float xx = x2 * q.x;
float yy = y2 * q.y;
float zz = z2 * q.z;
float xy = x2 * q.y;
float xz = x2 * q.z;
float yz = y2 * q.z;
float wx = x2 * q.w;
float wy = y2 * q.w;
float wz = z2 * q.w;
return mat3(
1.0 - (yy + zz), xy - wz, xz + wy,
xy + wz, 1.0 - (xx + zz), yz - wx,
xz - wy, yz + wx, 1.0 - (xx + yy)
);
}`)}var u=class extends v{constructor(){super(...arguments),this.totalGaussians=-1,this.focalLength=-1,this.minSplatRadius=-1,this.minSplatOpacity=-1,this.tanFov=d,this.cameraDelta=o,this.cameraPos8k=o}};function S(n){let e=new h;e.varyings.add("vColor","vec4"),e.varyings.add("conicOpacity","vec4"),e.varyings.add("depth","float"),e.varyings.add("gaussianCenterScreenPos","vec2"),e.varyings.add("fragScreenPos","vec2"),e.outputs.add("fragColor","vec4",0),e.vertex.uniforms.add(new l("splatOrderTexture",a=>a.splatOrder),new l("splatAtlasTexture",a=>a.splatAtlas),new f("numSplats",a=>a.totalGaussians),new i("focalLength",a=>a.focalLength),new i("minSplatRadius",a=>a.minSplatRadius),new i("minSplatOpacity",a=>a.minSplatOpacity),new x("tanFov",a=>a.tanFov),new c("cameraDelta",a=>a.cameraDelta),new c("cameraPos8k",a=>a.cameraPos8k),new s("fullWidth",({camera:a})=>a.viewport[2]),new s("fullHeight",({camera:a})=>a.viewport[3]),new r("proj",a=>a.camera.projectionMatrix),new r("view",a=>a.camera.viewMatrix),new m("cameraPosition",a=>a.camera.eye)),e.vertex.include(w),e.vertex.include(P),e.vertex.include(y),e.include(g,n),e.vertex.code.add(t`float ndcToPixel(float ndcCoord, float screenSize) {
return ((ndcCoord + 1.0) * screenSize - 1.0) * 0.5;
}`),e.vertex.main.add(`
    uint instanceID = uint(gl_InstanceID);

    // Transform the instanceID into 2D coordinates
    uint orderTextureWidth = uint(textureSize(splatOrderTexture, 0).x);
    uint x = instanceID % orderTextureWidth;
    uint y = instanceID / orderTextureWidth;

    // Fetch the index of the remaining frontmost Gaussian
    uint gaussianIndex = texelFetch(splatOrderTexture, ivec2(x, y), 0).r;

    uint splatAtlasSize = uint(textureSize(splatAtlasTexture, 0).x);

    // Fetch the packed Gaussian according to the index
    uint gaussianIndexX = gaussianIndex % uint(splatAtlasSize);
    uint gaussianIndexY = gaussianIndex / uint(splatAtlasSize);
    uvec4 packedGaussian = texelFetch(splatAtlasTexture, ivec2(gaussianIndexX, gaussianIndexY), 0);

    // Fetch the header associated with the packed Gaussian (contains tile origin and number of fractional bits)
    uint pageNum = gaussianIndex / 1024u;
    uint headerIndex = (pageNum + 1u) * 1024u - 1u;
    uint headerIndexX = headerIndex % uint(splatAtlasSize);
    uint headerIndexY = headerIndex / uint(splatAtlasSize);
    uvec4 packedHeader = texelFetch(splatAtlasTexture, ivec2(headerIndexX, headerIndexY), 0);

    // Unpack the Gaussian
    vColor = unpackColor(packedGaussian);
    // Ignore gaussians with very small contribution, with tolerance based on the quality profile
    if(vColor.a < minSplatOpacity) {
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    vec3 scale = unpackScale(packedGaussian); 
    vec4 quaternion = unpackQuaternion(packedGaussian);
    mat3 rotation = quaternionToRotationMatrix(quaternion);
    vec3 tileOriginRelativePosition = unpackTileOriginRelativePosition(packedGaussian);

    vec3 cameraRelativePosition = unpackCameraRelativeGaussianPosition(packedHeader, tileOriginRelativePosition, cameraPosition, cameraPos8k, cameraDelta);

    vec4 viewPos = vec4(mat3(view) * cameraRelativePosition, 1);

    if (viewPos.z > 1.0) {
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    forwardViewPosDepth(viewPos.xyz);

    vec3 covarianceA;
    vec3 covarianceB;
    computeCovariance3D(rotation, scale.xyz, covarianceA, covarianceB);

    float covariance3D[6] = float[6](covarianceA.x, covarianceA.y, covarianceA.z, covarianceB.x, covarianceB.y, covarianceB.z);

    vec3 covariance2D = computeCovariance2D(viewPos.xyz, focalLength, tanFov, covariance3D, view);
    
    // Invert covariance (EWA algorithm)
    float determinant = (covariance2D.x * covariance2D.z - covariance2D.y * covariance2D.y);
    if (determinant == 0.) {
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }
    float invDeterminant = 1. / determinant;
    

    vec4 projPos = proj * viewPos;
    float invW = 1. / (projPos.w + 1e-7);
    vec3 ndcPos = projPos.xyz * invW;

    // Compute extent in screen space (by finding the eigenvalues of the 2D covariance matrix). 
    // Use the extent to compute the bounding rectangle of the Gaussian in screen space.
    float mid = 0.5 * (covariance2D.x + covariance2D.z);
    float lambda1 = mid + sqrt(max(0.1, mid * mid - determinant));
    float lambda2 = mid - sqrt(max(0.1, mid * mid - determinant));
    float radius = ceil(3. * sqrt(max(lambda1, lambda2)));
    gaussianCenterScreenPos = vec2(ndcToPixel(ndcPos.x, float(fullWidth)), ndcToPixel(ndcPos.y, float(fullHeight)));

    // Ignore gaussians with very small contribution, with tolerance based on the quality profile
    if(minSplatRadius > 0.0) {
      float effectiveSize = radius * vColor.a;
      if(effectiveSize < minSplatRadius) {
        gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
        return;
      }
    }

    // This maps vertex IDs 0, 1, 2, 3 to (-1,-1), (1,-1), (-1,1), (1,1)
    vec2 corner = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2) - 1.0;

    // Vertex (corner) position in screen space
    fragScreenPos = gaussianCenterScreenPos + radius * corner;

    // We use a conic function to derive the opacity
    vec3 conic = vec3(covariance2D.z, -covariance2D.y, covariance2D.x) * invDeterminant;
    conicOpacity = vec4(conic, vColor.a);

    depth = ndcPos.z;
    
    // Convert from screen-space to clip-space
    vec2 clipPos = fragScreenPos / vec2(fullWidth, fullHeight) * 2. - 1.;

    gl_Position = vec4(clipPos, depth, 1.0);

  `);let z=n.depthPass;return e.fragment.main.add(`
    discardByTerrainDepth();
    vec2 offsetFromCenter = gaussianCenterScreenPos - fragScreenPos;

    // Evaluate the 2D elliptical Gaussian exponent using the general conic form: Ax^2+2Bxy+Cy^2
    float x = offsetFromCenter.x;
    float y = offsetFromCenter.y;
    float A = conicOpacity.x;
    float B = conicOpacity.y;
    float C = conicOpacity.z;
    float opacityScale = conicOpacity.w;
    float gaussianExponent = -0.5 * (A * x * x + 2.0 * B * x * y + C * y * y);

    // A positive exponent indicates alpha > 1, this should not happen
    if (gaussianExponent > 0.0) {
      discard;
    }

    float gaussianFalloff = exp(gaussianExponent);
    
      // cap at 0.99 to avoid blending issues, such as seams between overlapping Gaussians
    float alpha = min(.99f, opacityScale * gaussianFalloff);

    // discard low alpha fragments since their contribution would not be visible
    if (alpha < 1./255.) {
        discard;
    }

    // We cannot write color and depth in the same pass, as they require different blend modes.
    // Regular depth writing based on first hit is not precise enough due to the inherently 
    // transparent nature of Gaussian Splats (especially at the borders of the Splat).
    // We thus use a blended depth that computes a non-linear average using 
    // the splat order and opacity with geometric decay.
    // This means the depth is averaged based on the order and opacity of the Gaussians,
    // with the frontmost Gaussians contributing the most.
    ${p(z,"fragColor = vec4(depth, 0, 0, alpha);","fragColor = vec4(vColor.rgb * alpha, alpha);")}
  `),e}var Q=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatPassParameters:u,build:S},Symbol.toStringTag,{value:"Module"}));export{u as a,S as b,Q as c};
