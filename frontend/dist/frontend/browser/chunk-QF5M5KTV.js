import{t as _,v as m}from"./chunk-23N4SIRW.js";var S=()=>_.getLogger("esri.views.3d.webgl-engine.core.shaderModules.shaderBuilder"),c=class{constructor(){this._includedModules=new Map}include(e,r){this._includedModules.has(e)?this._includedModules.get(e):(this._includedModules.set(e,r),e(this.builder,r))}},$=class extends c{constructor(){super(...arguments),this.vertex=new h,this.fragment=new h,this.attributes=new g,this.varyings=new b,this.extensions=new I,this.outputs=new A}get fragmentUniforms(){return this.fragment.uniforms.entries}get attributeNames(){return this.attributes.names}get builder(){return this}generate(e,r=!1){let t=this.extensions.generateSource(e),s=this.attributes.generateSource(e),i=this.varyings.generateSource(e),a=e==="vertex"?this.vertex:this.fragment,o=a.uniforms.generateSource(),u=a.code.generateSource(),T=a.main.generateSource(r),v=e==="vertex"?F:E,w=a.constants.generateSource(),y=this.outputs.generateSource(e);return`#version 300 es
${t.join(`
`)}
${v}
${w.join(`
`)}
${o.join(`
`)}
${s.join(`
`)}
${i.join(`
`)}
${y.join(`
`)}
${u.join(`
`)}
${T.join(`
`)}`}generateBind(e){let r=new Map;this.vertex.uniforms.entries.forEach(i=>{let a=i.bind[0];a&&r.set(i.name,a)}),this.fragment.uniforms.entries.forEach(i=>{let a=i.bind[0];a&&r.set(i.name,a)});let t=Array.from(r.values()),s=t.length;return i=>{for(let a=0;a<s;++a)t[a](e,i)}}generateBindPass(e){let r=new Map;this.vertex.uniforms.entries.forEach(i=>{let a=i.bind[1];a&&r.set(i.name,a)}),this.fragment.uniforms.entries.forEach(i=>{let a=i.bind[1];a&&r.set(i.name,a)});let t=Array.from(r.values()),s=t.length;return(i,a)=>{for(let o=0;o<s;++o)t[o](e,i,a)}}generateBindDraw(e){let r=new Map;this.vertex.uniforms.entries.forEach(i=>{let a=i.bind[2];a&&r.set(i.name,a)}),this.fragment.uniforms.entries.forEach(i=>{let a=i.bind[2];a&&r.set(i.name,a)});let t=Array.from(r.values()),s=t.length;return(i,a,o)=>{for(let u=0;u<s;++u)t[u](e,o,i,a)}}},d=class{constructor(e){this._stage=e,this._entries=new Map}add(...e){for(let r of e)this._add(r);return this._stage}get(e){return this._entries.get(e)}_add(e){if(e!=null){if(this._entries.has(e.name)&&!this._entries.get(e.name).equals(e))throw new m("shaderbuilder:duplicate-uniform",`Duplicate uniform name ${e.name} for different uniform type`);this._entries.set(e.name,e)}else S().error(`Trying to add null Uniform from ${new Error().stack}.`)}generateSource(){return Array.from(this._entries.values()).map(({name:e,arraySize:r,type:t})=>r!=null?`uniform ${t} ${e}[${r}];`:`uniform ${t} ${e};`)}get entries(){return Array.from(this._entries.values())}},l=class{constructor(e){this._stage=e,this._bodies=new Array}add(e){return this._bodies.push(e),this._stage}generateSource(e){if(this._bodies.length>0)return[`void main() {
 ${this._bodies.join(`
`)||""} 
}`];if(e)throw new m("shaderbuilder:missing-main","Shader does not contain main function body.");return[]}},p=class{constructor(e){this._stage=e,this._entries=new Array}add(e){return this._entries.push(e),this._stage}generateSource(){return this._entries}},h=class extends c{constructor(){super(...arguments),this.uniforms=new d(this),this.main=new l(this),this.code=new p(this),this.constants=new f(this)}get builder(){return this}},g=class{constructor(){this._entries=new Array}add(e,r){this._entries.push([e,r])}generateSource(e){return e==="fragment"?[]:this._entries.map(r=>`in ${r[1]} ${r[0]};`)}get names(){return this._entries.map(([e])=>e)}},b=class{constructor(){this._entries=new Map}add(e,r,t){this._entries.has(e)?S().warn(`Ignoring duplicate varying ${r} ${e}`):this._entries.set(e,{type:r,invariant:t?.invariant??!1})}generateSource(e){let r=new Array;return this._entries.forEach((t,s)=>r.push((t.invariant&&e==="vertex"?"invariant ":"")+(t.type==="int"?"flat ":"")+(e==="vertex"?"out":"in")+` ${t.type} ${s};`)),r}},I=(()=>{class n{constructor(){this._entries=new Set}add(r){this._entries.add(r)}generateSource(r){let t=r==="vertex"?n.ALLOWLIST_VERTEX:n.ALLOWLIST_FRAGMENT;return Array.from(this._entries).filter(s=>t.includes(s)).map(s=>`#extension ${s} : enable`)}static{this.ALLOWLIST_FRAGMENT=["GL_EXT_shader_texture_lod","GL_OES_standard_derivatives"]}static{this.ALLOWLIST_VERTEX=[]}}return n})(),A=(()=>{class n{constructor(){this._entries=new Map}add(r,t,s=0){let i=this._entries.get(s);i?.name!==r||i?.type!==t?this._entries.set(s,{name:r,type:t}):S().warn(`Fragment shader output location ${s} occupied`)}static{this.DEFAULT_TYPE="vec4"}static{this.DEFAULT_NAME="fragColor"}generateSource(r){if(r==="vertex")return[];this._entries.size===0&&this._entries.set(0,{name:n.DEFAULT_NAME,type:n.DEFAULT_TYPE});let t=new Array;return this._entries.forEach((s,i)=>t.push(`layout(location = ${i}) out ${s.type} ${s.name};`)),t}}return n})(),f=class n{constructor(e){this._stage=e,this._entries=new Set}add(e,r,t){let s="ERROR_CONSTRUCTOR_STRING";switch(r){case"float":s=n._numberToFloatStr(t);break;case"int":s=n._numberToIntStr(t);break;case"bool":s=t.toString();break;case"vec2":s=`vec2(${n._numberToFloatStr(t[0])},                            ${n._numberToFloatStr(t[1])})`;break;case"vec3":s=`vec3(${n._numberToFloatStr(t[0])},                            ${n._numberToFloatStr(t[1])},                            ${n._numberToFloatStr(t[2])})`;break;case"vec4":s=`vec4(${n._numberToFloatStr(t[0])},                            ${n._numberToFloatStr(t[1])},                            ${n._numberToFloatStr(t[2])},                            ${n._numberToFloatStr(t[3])})`;break;case"ivec2":s=`ivec2(${n._numberToIntStr(t[0])},                             ${n._numberToIntStr(t[1])})`;break;case"ivec3":s=`ivec3(${n._numberToIntStr(t[0])},                             ${n._numberToIntStr(t[1])},                             ${n._numberToIntStr(t[2])})`;break;case"ivec4":s=`ivec4(${n._numberToIntStr(t[0])},                             ${n._numberToIntStr(t[1])},                             ${n._numberToIntStr(t[2])},                             ${n._numberToIntStr(t[3])})`;break;case"uvec2":s=`uvec2(${n._numberToIntStr(t[0])},                             ${n._numberToIntStr(t[1])})`;break;case"uvec3":s=`uvec3(${n._numberToIntStr(t[0])},                             ${n._numberToIntStr(t[1])},                             ${n._numberToIntStr(t[2])})`;break;case"uvec4":s=`uvec4(${n._numberToIntStr(t[0])},                             ${n._numberToIntStr(t[1])},                             ${n._numberToIntStr(t[2])},                             ${n._numberToIntStr(t[3])})`;break;case"mat2":case"mat3":case"mat4":s=`${r}(${Array.prototype.map.call(t,i=>n._numberToFloatStr(i)).join(", ")})`}return this._entries.add(`const ${r} ${e} = ${s};`),this._stage}static _numberToIntStr(e){return e.toFixed(0)}static _numberToFloatStr(e){return Number.isInteger(e)?e.toFixed(1):e.toString()}generateSource(){return Array.from(this._entries)}},E=`#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  precision highp int;
  precision highp sampler2D;
  precision highp usampler2D;
  precision highp sampler2DArray;
  precision highp sampler2DShadow;
#else
  precision mediump float;
  precision mediump int;
  precision mediump sampler2D;
  precision mediump usampler2D;
  precision mediump sampler2DArray;
  precision mediump sampler2DShadow;
#endif`,F=`precision highp float;
 precision highp sampler2D;
 precision highp usampler2D;
 precision highp sampler2DArray;
 precision highp sampler2DShadow;


 invariant gl_Position;
 `;export{$ as a};
