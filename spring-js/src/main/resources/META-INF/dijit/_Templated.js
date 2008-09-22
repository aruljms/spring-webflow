/*
	Copyright (c) 2004-2007, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/book/dojo-book-0-9/introduction/licensing
*/


if(!dojo._hasResource["dijit._Templated"]){dojo._hasResource["dijit._Templated"]=true;dojo.provide("dijit._Templated");dojo.require("dijit._Widget");dojo.require("dojo.string");dojo.require("dojo.parser");dojo.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var _1=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);var _2;if(dojo.isString(_1)){var _3=this.declaredClass,_4=this;var _5=dojo.string.substitute(_1,this,function(_6,_7){if(_7.charAt(0)=="!"){_6=_4[_7.substr(1)];}if(typeof _6=="undefined"){throw new Error(_3+" template:"+_7);}if(!_6){return "";}return _7.charAt(0)=="!"?_6:_6.toString().replace(/"/g,"&quot;");},this);_2=dijit._Templated._createNodesFromText(_5)[0];}else{_2=_1.cloneNode(true);}this._attachTemplateNodes(_2);var _8=this.srcNodeRef;if(_8&&_8.parentNode){_8.parentNode.replaceChild(_2,_8);}this.domNode=_2;if(this.widgetsInTemplate){var _9=dojo.parser.parse(_2);this._attachTemplateNodes(_9,function(n,p){return n[p];});}this._fillContent(_8);},_fillContent:function(_c){var _d=this.containerNode;if(_c&&_d){while(_c.hasChildNodes()){_d.appendChild(_c.firstChild);}}},_attachTemplateNodes:function(_e,_f){_f=_f||function(n,p){return n.getAttribute(p);};var _12=dojo.isArray(_e)?_e:(_e.all||_e.getElementsByTagName("*"));var x=dojo.isArray(_e)?0:-1;for(;x<_12.length;x++){var _14=(x==-1)?_e:_12[x];if(this.widgetsInTemplate&&_f(_14,"dojoType")){continue;}var _15=_f(_14,"dojoAttachPoint");if(_15){var _16,_17=_15.split(/\s*,\s*/);while(_16=_17.shift()){if(dojo.isArray(this[_16])){this[_16].push(_14);}else{this[_16]=_14;}}}var _18=_f(_14,"dojoAttachEvent");if(_18){var _19,_1a=_18.split(/\s*,\s*/);var _1b=dojo.trim;while(_19=_1a.shift()){if(_19){var _1c=null;if(_19.indexOf(":")!=-1){var _1d=_19.split(":");_19=_1b(_1d[0]);_1c=_1b(_1d[1]);}else{_19=_1b(_19);}if(!_1c){_1c=_19;}this.connect(_14,_19,_1c);}}}var _1e=_f(_14,"waiRole");if(_1e){dijit.setWaiRole(_14,_1e);}var _1f=_f(_14,"waiState");if(_1f){dojo.forEach(_1f.split(/\s*,\s*/),function(_20){if(_20.indexOf("-")!=-1){var _21=_20.split("-");dijit.setWaiState(_14,_21[0],_21[1]);}});}}}});dijit._Templated._templateCache={};dijit._Templated.getCachedTemplate=function(_22,_23,_24){var _25=dijit._Templated._templateCache;var key=_23||_22;var _27=_25[key];if(_27){return _27;}if(!_23){_23=dijit._Templated._sanitizeTemplateString(dojo._getText(_22));}_23=dojo.string.trim(_23);if(_23.match(/\$\{([^\}]+)\}/g)||_24){return (_25[key]=_23);}else{return (_25[key]=dijit._Templated._createNodesFromText(_23)[0]);}};dijit._Templated._sanitizeTemplateString=function(_28){if(_28){_28=_28.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");var _29=_28.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);if(_29){_28=_29[1];}}else{_28="";}return _28;};if(dojo.isIE){dojo.addOnUnload(function(){var _2a=dijit._Templated._templateCache;for(var key in _2a){var _2c=_2a[key];if(!isNaN(_2c.nodeType)){dojo._destroyElement(_2c);}delete _2a[key];}});}(function(){var _2d={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};var tn;dijit._Templated._createNodesFromText=function(_2f){if(!tn){tn=dojo.doc.createElement("div");tn.style.display="none";dojo.body().appendChild(tn);}var _30="none";var _31=_2f.replace(/^\s+/,"");for(var _32 in _2d){var map=_2d[_32];if(map.re.test(_31)){_30=_32;_2f=map.pre+_2f+map.post;break;}}tn.innerHTML=_2f;if(tn.normalize){tn.normalize();}var tag={cell:"tr",row:"tbody",section:"table"}[_30];var _35=(typeof tag!="undefined")?tn.getElementsByTagName(tag)[0]:tn;var _36=[];while(_35.firstChild){_36.push(_35.removeChild(_35.firstChild));}tn.innerHTML="";return _36;};})();dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""});}