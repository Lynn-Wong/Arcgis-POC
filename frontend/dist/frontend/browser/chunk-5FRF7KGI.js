import{a as Q,d as X}from"./chunk-SUB53JX6.js";import{c as v}from"./chunk-NYQHHVHE.js";import{a as w}from"./chunk-RFSCLSJM.js";import{a as f}from"./chunk-6RPPPUE7.js";import{a as l,f as y}from"./chunk-PWAC5NTO.js";import{a as c,g as h}from"./chunk-67YVG46W.js";import{g}from"./chunk-JOZQHQKB.js";var T=class{constructor(){this._result=!1}dispose(){this._program=g(this._program)}get result(){return this._program!=null&&(this._result=this._test(this._program),this.dispose()),this._result}};var b=class extends T{constructor(i){super(),this._rctx=i;let e=`
    precision highp float;

    attribute vec2 position;
    varying vec2 v_uv;

    void main() {
      v_uv = position;
      gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
    }
    `,r=`
    precision highp float;

    varying vec2 v_uv;

    uniform sampler2D u_texture;

    void main() {
      gl_FragColor = texture2D(u_texture, v_uv);
    }
    `;this._program=i.programCache.acquire(e,r,X)}dispose(){super.dispose()}_test(i){let e=this._rctx;if(!e.gl)return i.dispose(),!0;let r=new l(1);r.wrapMode=33071,r.samplingMode=9728;let n=new v(e,r),_=new f(e,Q,new Uint16Array([0,0,1,0,0,1,1,1])),u=new w(e,_),o=new l;o.samplingMode=9729,o.wrapMode=33071;let E=new y(e,o,a);e.useProgram(i),e.bindTexture(E,0),i.setUniform1i("u_texture",0);let p=e.getBoundFramebufferObject(),{x,y:A,width:P,height:I}=e.getViewport();e.bindFramebuffer(n),e.setViewport(0,0,1,1),e.setClearColor(0,0,0,0),e.setBlendingEnabled(!1),e.clear(16384),e.bindVAO(u),e.drawArrays(c.TRIANGLE_STRIP,0,4);let d=new Uint8Array(4);return n.readPixels(0,0,1,1,6408,h.UNSIGNED_BYTE,d),u.dispose(),n.dispose(),E.dispose(),e.setViewport(x,A,P,I),e.bindFramebuffer(p),d[0]!==255}},a=new Image;a.src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='5' height='5' version='1.1' viewBox='0 0 5 5' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='5' height='5' fill='%23f00' fill-opacity='.5'/%3E%3C/svg%3E%0A",a.width=5,a.height=5,a.decode();var m=class{constructor(i,e,r,n,_,u,o,E,p){this.createQuery=i,this.deleteQuery=e,this.resultAvailable=r,this.getResult=n,this.disjoint=_,this.beginTimeElapsed=u,this.endTimeElapsed=o,this.createTimestamp=E,this.timestampBits=p}},s=!1;function F(t,i){if(i.disjointTimerQuery)return null;let e=t.getExtension("EXT_disjoint_timer_query_webgl2");return e?new m(()=>t.createQuery(),r=>{t.deleteQuery(r),s=!1},r=>t.getQueryParameter(r,t.QUERY_RESULT_AVAILABLE),r=>t.getQueryParameter(r,t.QUERY_RESULT),()=>t.getParameter(e.GPU_DISJOINT_EXT),r=>{s||(s=!0,t.beginQuery(e.TIME_ELAPSED_EXT,r))},()=>{t.endQuery(e.TIME_ELAPSED_EXT),s=!1},r=>e.queryCounterEXT(r,e.TIMESTAMP_EXT),()=>t.getQuery(e.TIMESTAMP_EXT,e.QUERY_COUNTER_BITS_EXT)):(e=t.getExtension("EXT_disjoint_timer_query"),e?new m(()=>e.createQueryEXT(),r=>{e.deleteQueryEXT(r),s=!1},r=>e.getQueryObjectEXT(r,e.QUERY_RESULT_AVAILABLE_EXT),r=>e.getQueryObjectEXT(r,e.QUERY_RESULT_EXT),()=>t.getParameter(e.GPU_DISJOINT_EXT),r=>{s||(s=!0,e.beginQueryEXT(e.TIME_ELAPSED_EXT,r))},()=>{e.endQueryEXT(e.TIME_ELAPSED_EXT),s=!1},r=>e.queryCounterEXT(r,e.TIMESTAMP_EXT),()=>e.getQueryEXT(e.TIMESTAMP_EXT,e.QUERY_COUNTER_BITS_EXT)):null)}export{s as a,F as b,T as c,b as d};
