(self.webpackChunk_patchwork_body_jquery_plugin_range_slider=self.webpackChunk_patchwork_body_jquery_plugin_range_slider||[]).push([[908],{356:(t,e,i)=>{const o=i(609);i(22),i(774),window.addEventListener("load",(()=>{const t=[{index:1,props:{min:0,max:1e3,step:10,from:300,to:700,prefix:"$ ",color:"#7bc043"}},{index:2,props:{min:1,max:6,step:1,from:1,to:2,postfix:t=>t>1?" rooms":" room",color:"#0392cf",markerVisibility:!1,intervalMode:!1}},{index:3,props:{min:-18,max:22.3,step:.1,from:-7.5,to:12.3,postfix:"°C",color:"#ffcc5c"}},{index:4,props:{values:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],from:"Tue",to:"Fri",color:"#fe4a49"}},{index:5,props:{min:0,max:120,step:5,to:80,postfix:"mm",color:"#8b9dc3",intervalMode:!1,vertical:!0}}];for(const{index:e,props:i}of t)r(e,i)}));const r=(t,e)=>{!function(e){const i=o(`#js-configuration-id-${t}`),r=i.find(".js-configuration__values"),a=i.find(".js-configuration__value-left"),s=i.find(".js-configuration__value-right"),n=i.find(".js-configuration__min"),l=i.find(".js-configuration__max"),c=i.find(".js-configuration__step"),u=i.find(".js-configuration__prefix"),f=i.find(".js-configuration__postfix"),d=i.find(".js-configuration__primary-color"),g=i.find(".js-configuration__orient"),v=i.find(".js-configuration__interval-mode"),p=i.find(".js-configuration__marker-visibility"),_=i.find(".js-configuration__track-scale-visibility");e.subscribe((t=>{r.val(t.values.toString().replaceAll(","," ")),a.attr("disabled",t.values.length>0),s.attr("disabled",t.values.length>0),n.attr("disabled",t.values.length>0),l.attr("disabled",t.values.length>0),c.attr("disabled",t.values.length>0),a.val(t.from),s.val(t.to),n.val(t.min),l.val(t.max),c.val(t.step),u.val(t.prefix),f.val(t.postfix),d.val(t.color),g.attr("checked",t.vertical),v.attr("checked",t.intervalMode),p.attr("checked",t.markerVisibility),_.attr("checked",t.trackScaleVisibility)})),r.on("focusout",(t=>e.setFixedValues(t.target.value.split(" ").filter((t=>t.trim()))))),a.on("focusout",(t=>e.setLeftValue(Number(t.target.value)))),s.on("focusout",(t=>e.setRightValue(Number(t.target.value)))),n.on("focusout",(t=>e.setMin(Number(t.target.value)))),l.on("focusout",(t=>e.setMax(Number(t.target.value)))),c.on("focusout",(t=>e.setStep(Number(t.target.value)))),u.on("focusout",(t=>{e.setPrefix(t.target.value)})),f.on("focusout",(t=>{e.setPostfix(t.target.value)})),g.on("click",(t=>e.setOrientVertical(!t.target.hasAttribute("checked")))),v.on("click",(t=>e.setIntervalMode(!t.target.hasAttribute("checked")))),p.on("click",(t=>e.setMarkerVisibility(!t.target.hasAttribute("checked")))),_.on("click",(t=>e.setTrackScaleVisibility(!t.target.hasAttribute("checked")))),d.on("focusout",(t=>{e.setPrimaryColor(t.target.value)}))}(o(`#js-range-slider-id-${t}`).rangeSlider(e))}},774:(t,e,i)=>{"use strict";i.r(e);var o=i(783)(t.id,{locals:!1});t.hot.dispose(o),t.hot.accept(void 0,o)}},0,[[356,975]]]);
//# sourceMappingURL=example.build.js.map