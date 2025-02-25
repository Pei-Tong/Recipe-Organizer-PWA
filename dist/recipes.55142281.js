let e,t,n;function o(e,t,n,o){Object.defineProperty(e,t,{get:n,set:o,enumerable:!0,configurable:!0})}var i,s,a,r,l,c,d,u,f,h,p,g,m,E,y,C,v,O,I,_,w,R,T,N,A=globalThis,S={},b={},L=A.parcelRequire94c2;null==L&&((L=function(e){if(e in S)return S[e].exports;if(e in b){var t=b[e];delete b[e];var n={id:e,exports:{}};return S[e]=n,t.call(n.exports,n,n.exports),n.exports}var o=Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){b[e]=t},A.parcelRequire94c2=L);var M=L.register;M("27Lyk",function(e,t){o(e.exports,"register",()=>n,e=>n=e),o(e.exports,"resolve",()=>i,e=>i=e);var n,i,s=new Map;n=function(e,t){for(var n=0;n<t.length-1;n+=2)s.set(t[n],{baseUrl:e,path:t[n+1]})},i=function(e){var t=s.get(e);if(null==t)throw Error("Could not resolve bundle with id "+e);return new URL(t.path,t.baseUrl).toString()}}),M("jOsMR",function(e,t){var n=L("Gr8vk");e.exports=n("k5KBG").then(()=>L("lR3v8"))}),M("Gr8vk",function(e,t){e.exports=function(e){return import(L("27Lyk").resolve(e))}}),L("27Lyk").register(new URL("",import.meta.url).toString(),JSON.parse('["iOmLm","recipes.55142281.js","k5KBG","loglevel.2daa5c96.js","jV9bk","index.58931a1b.js"]'));var D=L("47Mwn");(i=m||(m={})).STRING="string",i.NUMBER="number",i.INTEGER="integer",i.BOOLEAN="boolean",i.ARRAY="array",i.OBJECT="object",(s=E||(E={})).LANGUAGE_UNSPECIFIED="language_unspecified",s.PYTHON="python",(a=y||(y={})).OUTCOME_UNSPECIFIED="outcome_unspecified",a.OUTCOME_OK="outcome_ok",a.OUTCOME_FAILED="outcome_failed",a.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x=["user","model","function","system"];(r=C||(C={})).HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",r.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",r.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",r.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",r.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",(l=v||(v={})).HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",l.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",l.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",l.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",l.BLOCK_NONE="BLOCK_NONE",(c=O||(O={})).HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",c.NEGLIGIBLE="NEGLIGIBLE",c.LOW="LOW",c.MEDIUM="MEDIUM",c.HIGH="HIGH",(d=I||(I={})).BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",d.SAFETY="SAFETY",d.OTHER="OTHER",(u=_||(_={})).FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",u.STOP="STOP",u.MAX_TOKENS="MAX_TOKENS",u.SAFETY="SAFETY",u.RECITATION="RECITATION",u.LANGUAGE="LANGUAGE",u.BLOCKLIST="BLOCKLIST",u.PROHIBITED_CONTENT="PROHIBITED_CONTENT",u.SPII="SPII",u.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",u.OTHER="OTHER",(f=w||(w={})).TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",f.RETRIEVAL_QUERY="RETRIEVAL_QUERY",f.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",f.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",f.CLASSIFICATION="CLASSIFICATION",f.CLUSTERING="CLUSTERING",(h=R||(R={})).MODE_UNSPECIFIED="MODE_UNSPECIFIED",h.AUTO="AUTO",h.ANY="ANY",h.NONE="NONE",(p=T||(T={})).MODE_UNSPECIFIED="MODE_UNSPECIFIED",p.MODE_DYNAMIC="MODE_DYNAMIC";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class P extends F{constructor(e,t){super(e),this.response=t}}class $ extends F{constructor(e,t,n,o){super(e),this.status=t,this.statusText=n,this.errorDetails=o}}class H extends F{}(g=N||(N={})).GENERATE_CONTENT="generateContent",g.STREAM_GENERATE_CONTENT="streamGenerateContent",g.COUNT_TOKENS="countTokens",g.EMBED_CONTENT="embedContent",g.BATCH_EMBED_CONTENTS="batchEmbedContents";class U{constructor(e,t,n,o,i){this.model=e,this.task=t,this.apiKey=n,this.stream=o,this.requestOptions=i}toString(){var e,t;let n=(null===(e=this.requestOptions)||void 0===e?void 0:e.apiVersion)||"v1beta",o=(null===(t=this.requestOptions)||void 0===t?void 0:t.baseUrl)||"https://generativelanguage.googleapis.com",i=`${o}/${n}/${this.model}:${this.task}`;return this.stream&&(i+="?alt=sse"),i}}async function B(e){var t;let n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",function(e){let t=[];return(null==e?void 0:e.apiClient)&&t.push(e.apiClient),t.push("genai-js/0.22.0"),t.join(" ")}(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let o=null===(t=e.requestOptions)||void 0===t?void 0:t.customHeaders;if(o){if(!(o instanceof Headers))try{o=new Headers(o)}catch(e){throw new H(`unable to convert customHeaders value ${JSON.stringify(o)} to Headers: ${e.message}`)}for(let[e,t]of o.entries()){if("x-goog-api-key"===e)throw new H(`Cannot set reserved header name ${e}`);if("x-goog-api-client"===e)throw new H(`Header name ${e} can only be set using the apiClient field`);n.append(e,t)}}return n}async function k(e,t,n,o,i,s){let a=new U(e,t,n,o,s);return{url:a.toString(),fetchOptions:Object.assign(Object.assign({},function(e){let t={};if((null==e?void 0:e.signal)!==void 0||(null==e?void 0:e.timeout)>=0){let n=new AbortController;(null==e?void 0:e.timeout)>=0&&setTimeout(()=>n.abort(),e.timeout),(null==e?void 0:e.signal)&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}(s)),{method:"POST",headers:await B(a),body:i})}}async function G(e,t,n,o,i,s={},a=fetch){let{url:r,fetchOptions:l}=await k(e,t,n,o,i,s);return j(r,l,a)}async function j(e,t,n=fetch){let o;try{o=await n(e,t)}catch(t){!function(e,t){let n=e;throw e instanceof $||e instanceof H||((n=new F(`Error fetching from ${t.toString()}: ${e.message}`)).stack=e.stack),n}(t,e)}return o.ok||await K(o,e),o}async function K(e,t){let n,o="";try{let t=await e.json();o=t.error.message,t.error.details&&(o+=` ${JSON.stringify(t.error.details)}`,n=t.error.details)}catch(e){}throw new $(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${o}`,e.status,e.statusText,n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),W(e.candidates[0]))throw new P(`${V(e)}`,e);return function(e){var t,n,o,i;let s=[];if(null===(n=null===(t=e.candidates)||void 0===t?void 0:t[0].content)||void 0===n?void 0:n.parts)for(let t of null===(i=null===(o=e.candidates)||void 0===o?void 0:o[0].content)||void 0===i?void 0:i.parts)t.text&&s.push(t.text),t.executableCode&&s.push("\n```"+t.executableCode.language+"\n"+t.executableCode.code+"\n```\n"),t.codeExecutionResult&&s.push("\n```\n"+t.codeExecutionResult.output+"\n```\n");return s.length>0?s.join(""):""}(e)}if(e.promptFeedback)throw new P(`Text not available. ${V(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),W(e.candidates[0]))throw new P(`${V(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),Y(e)[0]}if(e.promptFeedback)throw new P(`Function call not available. ${V(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),W(e.candidates[0]))throw new P(`${V(e)}`,e);return Y(e)}if(e.promptFeedback)throw new P(`Function call not available. ${V(e)}`,e)},e}function Y(e){var t,n,o,i;let s=[];if(null===(n=null===(t=e.candidates)||void 0===t?void 0:t[0].content)||void 0===n?void 0:n.parts)for(let t of null===(i=null===(o=e.candidates)||void 0===o?void 0:o[0].content)||void 0===i?void 0:i.parts)t.functionCall&&s.push(t.functionCall);return s.length>0?s:void 0}const J=[_.RECITATION,_.SAFETY,_.LANGUAGE];function W(e){return!!e.finishReason&&J.includes(e.finishReason)}function V(e){var t,n,o;let i="";if((!e.candidates||0===e.candidates.length)&&e.promptFeedback)i+="Response was blocked",(null===(t=e.promptFeedback)||void 0===t?void 0:t.blockReason)&&(i+=` due to ${e.promptFeedback.blockReason}`),(null===(n=e.promptFeedback)||void 0===n?void 0:n.blockReasonMessage)&&(i+=`: ${e.promptFeedback.blockReasonMessage}`);else if(null===(o=e.candidates)||void 0===o?void 0:o[0]){let t=e.candidates[0];W(t)&&(i+=`Candidate was blocked due to ${t.finishReason}`,t.finishMessage&&(i+=`: ${t.finishMessage}`))}return i}function X(e){return this instanceof X?(this.v=e,this):new X(e)}"function"==typeof SuppressedError&&SuppressedError;/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function Q(e){let t=[],n=e.getReader();for(;;){let{done:e,value:o}=await n.read();if(e)return q(function(e){let t=e[e.length-1],n={promptFeedback:null==t?void 0:t.promptFeedback};for(let t of e){if(t.candidates){let e=0;for(let o of t.candidates)if(n.candidates||(n.candidates=[]),n.candidates[e]||(n.candidates[e]={index:e}),n.candidates[e].citationMetadata=o.citationMetadata,n.candidates[e].groundingMetadata=o.groundingMetadata,n.candidates[e].finishReason=o.finishReason,n.candidates[e].finishMessage=o.finishMessage,n.candidates[e].safetyRatings=o.safetyRatings,o.content&&o.content.parts){n.candidates[e].content||(n.candidates[e].content={role:o.content.role||"user",parts:[]});let t={};for(let i of o.content.parts)i.text&&(t.text=i.text),i.functionCall&&(t.functionCall=i.functionCall),i.executableCode&&(t.executableCode=i.executableCode),i.codeExecutionResult&&(t.codeExecutionResult=i.codeExecutionResult),0===Object.keys(t).length&&(t.text=""),n.candidates[e].content.parts.push(t)}e++}t.usageMetadata&&(n.usageMetadata=t.usageMetadata)}return n}(t));t.push(o)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Z(e,t,n,o){return function(e){let[t,n]=(function(e){let t=e.getReader();return new ReadableStream({start(e){let n="";return function o(){return t.read().then(({value:t,done:i})=>{let s;if(i){if(n.trim()){e.error(new F("Failed to parse stream"));return}e.close();return}let a=(n+=t).match(z);for(;a;){try{s=JSON.parse(a[1])}catch(t){e.error(new F(`Error parsing JSON response: "${a[1]}"`));return}e.enqueue(s),a=(n=n.substring(a[0].length)).match(z)}return o()})}()}})})(e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0}))).tee();return{stream:function(e){return function(e,t,n){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var o,i=n.apply(e,t||[]),s=[];return o={},a("next"),a("throw"),a("return"),o[Symbol.asyncIterator]=function(){return this},o;function a(e){i[e]&&(o[e]=function(t){return new Promise(function(n,o){s.push([e,t,n,o])>1||r(e,t)})})}function r(e,t){try{var n;(n=i[e](t)).value instanceof X?Promise.resolve(n.value.v).then(l,c):d(s[0][2],n)}catch(e){d(s[0][3],e)}}function l(e){r("next",e)}function c(e){r("throw",e)}function d(e,t){e(t),s.shift(),s.length&&r(s[0][0],s[0][1])}}(this,arguments,function*(){let t=e.getReader();for(;;){let{value:e,done:n}=yield X(t.read());if(n)break;yield yield X(q(e))}})}(t),response:Q(n)}}(await G(t,N.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),o))}async function ee(e,t,n,o){let i=await G(t,N.GENERATE_CONTENT,e,!1,JSON.stringify(n),o);return{response:q(await i.json())}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(e){if(null!=e){if("string"==typeof e)return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function en(e){let t=[];if("string"==typeof e)t=[{text:e}];else for(let n of e)"string"==typeof n?t.push({text:n}):t.push(n);return function(e){let t={role:"user",parts:[]},n={role:"function",parts:[]},o=!1,i=!1;for(let s of e)"functionResponse"in s?(n.parts.push(s),i=!0):(t.parts.push(s),o=!0);if(o&&i)throw new F("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!o&&!i)throw new F("No content is provided for sending chat message.");return o?t:n}(t)}function eo(e){let t;return t=e.contents?e:{contents:[en(e)]},e.systemInstruction&&(t.systemInstruction=et(e.systemInstruction)),t}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ei=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],es={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]},ea="SILENT_ERROR";class er{constructor(e,t,n,o={}){this.model=t,this.params=n,this._requestOptions=o,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,(null==n?void 0:n.history)&&(function(e){let t=!1;for(let n of e){let{role:e,parts:o}=n;if(!t&&"user"!==e)throw new F(`First content should be with role 'user', got ${e}`);if(!x.includes(e))throw new F(`Each item should include role field. Got ${e} but valid roles are: ${JSON.stringify(x)}`);if(!Array.isArray(o))throw new F("Content should have 'parts' property with an array of Parts");if(0===o.length)throw new F("Each Content should have at least one part");let i={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(let e of o)for(let t of ei)t in e&&(i[t]+=1);let s=es[e];for(let t of ei)if(!s.includes(t)&&i[t]>0)throw new F(`Content with role '${e}' can't contain '${t}' part`);t=!0}}(n.history),this._history=n.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e,t={}){var n,o,i,s,a,r;let l;await this._sendPromise;let c=en(e),d={safetySettings:null===(n=this.params)||void 0===n?void 0:n.safetySettings,generationConfig:null===(o=this.params)||void 0===o?void 0:o.generationConfig,tools:null===(i=this.params)||void 0===i?void 0:i.tools,toolConfig:null===(s=this.params)||void 0===s?void 0:s.toolConfig,systemInstruction:null===(a=this.params)||void 0===a?void 0:a.systemInstruction,cachedContent:null===(r=this.params)||void 0===r?void 0:r.cachedContent,contents:[...this._history,c]},u=Object.assign(Object.assign({},this._requestOptions),t);return this._sendPromise=this._sendPromise.then(()=>ee(this._apiKey,this.model,d,u)).then(e=>{var t,n;if(e.response.candidates&&e.response.candidates.length>0&&(null===(t=e.response.candidates[0])||void 0===t?void 0:t.content)!==void 0){this._history.push(c);let t=Object.assign({parts:[],role:"model"},null===(n=e.response.candidates)||void 0===n?void 0:n[0].content);this._history.push(t)}else{let t=V(e.response);t&&console.warn(`sendMessage() was unsuccessful. ${t}. Inspect response object for details.`)}l=e}),await this._sendPromise,l}async sendMessageStream(e,t={}){var n,o,i,s,a,r;await this._sendPromise;let l=en(e),c={safetySettings:null===(n=this.params)||void 0===n?void 0:n.safetySettings,generationConfig:null===(o=this.params)||void 0===o?void 0:o.generationConfig,tools:null===(i=this.params)||void 0===i?void 0:i.tools,toolConfig:null===(s=this.params)||void 0===s?void 0:s.toolConfig,systemInstruction:null===(a=this.params)||void 0===a?void 0:a.systemInstruction,cachedContent:null===(r=this.params)||void 0===r?void 0:r.cachedContent,contents:[...this._history,l]},d=Object.assign(Object.assign({},this._requestOptions),t),u=Z(this._apiKey,this.model,c,d);return this._sendPromise=this._sendPromise.then(()=>u).catch(e=>{throw Error(ea)}).then(e=>e.response).then(e=>{var t;if(e.candidates&&e.candidates.length>0&&(null===(t=e.candidates[0])||void 0===t?void 0:t.content)!==void 0){this._history.push(l);let t=Object.assign({},e.candidates[0].content);t.role||(t.role="model"),this._history.push(t)}else{let t=V(e);t&&console.warn(`sendMessageStream() was unsuccessful. ${t}. Inspect response object for details.`)}}).catch(e=>{e.message!==ea&&console.error(e)}),u}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function el(e,t,n,o){return(await G(t,N.COUNT_TOKENS,e,!1,JSON.stringify(n),o)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ec(e,t,n,o){return(await G(t,N.EMBED_CONTENT,e,!1,JSON.stringify(n),o)).json()}async function ed(e,t,n,o){let i=n.requests.map(e=>Object.assign(Object.assign({},e),{model:t}));return(await G(t,N.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:i}),o)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e,t,n={}){this.apiKey=e,this._requestOptions=n,t.model.includes("/")?this.model=t.model:this.model=`models/${t.model}`,this.generationConfig=t.generationConfig||{},this.safetySettings=t.safetySettings||[],this.tools=t.tools,this.toolConfig=t.toolConfig,this.systemInstruction=et(t.systemInstruction),this.cachedContent=t.cachedContent}async generateContent(e,t={}){var n;let o=eo(e),i=Object.assign(Object.assign({},this._requestOptions),t);return ee(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(n=this.cachedContent)||void 0===n?void 0:n.name},o),i)}async generateContentStream(e,t={}){var n;let o=eo(e),i=Object.assign(Object.assign({},this._requestOptions),t);return Z(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(n=this.cachedContent)||void 0===n?void 0:n.name},o),i)}startChat(e){var t;return new er(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(t=this.cachedContent)||void 0===t?void 0:t.name},e),this._requestOptions)}async countTokens(e,t={}){let n=function(e,t){var n;let o={model:null==t?void 0:t.model,generationConfig:null==t?void 0:t.generationConfig,safetySettings:null==t?void 0:t.safetySettings,tools:null==t?void 0:t.tools,toolConfig:null==t?void 0:t.toolConfig,systemInstruction:null==t?void 0:t.systemInstruction,cachedContent:null===(n=null==t?void 0:t.cachedContent)||void 0===n?void 0:n.name,contents:[]},i=null!=e.generateContentRequest;if(e.contents){if(i)throw new H("CountTokensRequest must have one of contents or generateContentRequest, not both.");o.contents=e.contents}else if(i)o=Object.assign(Object.assign({},o),e.generateContentRequest);else{let t=en(e);o.contents=[t]}return{generateContentRequest:o}}(e,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),o=Object.assign(Object.assign({},this._requestOptions),t);return el(this.apiKey,this.model,n,o)}async embedContent(e,t={}){let n="string"==typeof e||Array.isArray(e)?{content:en(e)}:e,o=Object.assign(Object.assign({},this._requestOptions),t);return ec(this.apiKey,this.model,n,o)}async batchEmbedContents(e,t={}){let n=Object.assign(Object.assign({},this._requestOptions),t);return ed(this.apiKey,this.model,e,n)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(e){this.apiKey=e}getGenerativeModel(e,t){if(!e.model)throw new F("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new eu(this.apiKey,e,t)}getGenerativeModelFromCachedContent(e,t,n){if(!e.name)throw new H("Cached content must contain a `name` field.");if(!e.model)throw new H("Cached content must contain a `model` field.");for(let n of["model","systemInstruction"])if((null==t?void 0:t[n])&&e[n]&&(null==t?void 0:t[n])!==e[n]){if("model"===n&&(t.model.startsWith("models/")?t.model.replace("models/",""):t.model)===(e.model.startsWith("models/")?e.model.replace("models/",""):e.model))continue;throw new H(`Different value for "${n}" specified in modelParams (${t[n]}) and cachedContent (${e[n]})`)}let o=Object.assign(Object.assign({},t),{model:e.model,tools:e.tools,toolConfig:e.toolConfig,systemInstruction:e.systemInstruction,cachedContent:e});return new eu(this.apiKey,o,n)}}try{L("jOsMR").then(t=>{(e=t.default).setLevel("info"),e.info("Recipes script started")}).catch(t=>{console.error("Failed to load loglevel:",t),e=console,console.info("Recipes script started (using console as fallback)")})}catch(t){console.error("Error initializing loglevel:",t),e=console}const eh=document.getElementById("recipeName"),ep=document.getElementById("ingredients"),eg=document.getElementById("steps"),em=document.getElementById("mealType"),eE=document.getElementById("addRecipeBtn"),ey=document.getElementById("recipeList"),eC=document.getElementById("filterIngredient"),ev=document.getElementById("filterMealType"),eO=document.getElementById("clearFilterBtn"),eI=document.getElementById("send-btn"),e_=document.getElementById("chat-input"),ew=document.getElementById("chat-history"),eR=document.getElementById("qr-btn"),eT=document.getElementById("signOutBttn"),eN=JSON.parse(localStorage.getItem("email"));async function eA(){try{t=(await (0,D.getDoc)((0,D.doc)(D.db,"apikey","googlegenai"))).data().key,n=new ef(t).getGenerativeModel({model:"gemini-1.5-flash"})}catch(t){throw e.error("Error fetching API key from Firestore: ",t),t}}async function eS(t){if(!n)throw Error("Generative AI model not initialized. Please wait for page load.");try{return(await n.generateContent(`Provide a recipe suggestion or answer for: ${t}. If it's a recipe query, include name, ingredients, and steps.`)).response.text()}catch(t){throw e.error("Error in askChatBot:",t),t}}function eb(e){let t=document.createElement("div");return t.textContent=e,t.innerHTML}async function eL(t){try{let n=await (0,D.addDoc)((0,D.collection)(D.db,"recipes"),t);return e.info(`Recipe added successfully with ID: ${n.id}`),n}catch(t){throw e.error("Error adding recipe to Firestore: ",t),t}}async function eM(t){let n=(0,D.doc)(D.db,"recipes",t);try{await (0,D.deleteDoc)(n),e.info(`Recipe with id ${t} has been deleted from Firestore.`),eD(t)}catch(t){e.error("Error removing recipe: ",t),alert("Failed to delete recipe. Please try again.")}}function eD(t){let n=document.getElementById(t);n?(n.remove(),e.info(`Recipe with id ${t} removed from the visual interface.`)):e.warn(`Recipe with id ${t} not found on the page.`)}function ex(){let t=eC.value.trim().toLowerCase(),n=ev.value.toLowerCase();(0,D.getDocs)((0,D.collection)(D.db,"recipes")).then(e=>{ey.innerHTML="",e.forEach(e=>{let o=e.data(),i=!t||o.ingredients.some(e=>e.toLowerCase().includes(t)),s=!n||o.mealType.toLowerCase()===n,a=o.email===eN;i&&s&&a&&eP(e.id,o)})}).catch(t=>{e.error("Error filtering recipes:",t),alert("Failed to filter recipes. Please try again.")})}async function eF(){let e=await e$();ey.innerHTML="",e.forEach(e=>{eP(e.id,e.data())})}function eP(e,t){let n=document.createElement("li");n.id=e,n.tabIndex=0,n.innerHTML=`
    <span>${t.name} (${t.mealType})</span>
    <span class="actions">
      <button onclick="editRecipe('${e}', { name: prompt('New name:', '${t.name}'), mealType: prompt('New meal type:', '${t.mealType}') })">Edit</button>
      <button onclick="removeRecipe('${e}')">Delete</button>
      <button onclick="toggleFavorite('${e}', ${t.favorite||!1})">${t.favorite?"Unfavorite":"Favorite"}</button>
    </span>
  `,ey.appendChild(n)}async function e$(){let e=await (0,D.getDocs)((0,D.collection)(D.db,"recipes")),t=[];return e.forEach(e=>{e.data().email===eN&&t.push(e)}),t}function eH(e){let t=document.createElement("div");t.textContent=e,t.className="history",ew.appendChild(t),e_.value=""}eN||(e.warn("No user email found in localStorage, redirecting to login"),window.location.href="index.html"),document.addEventListener("DOMContentLoaded",async()=>{await eA(),e.info("API Key and Generative AI initialized."),eF()}),eE.addEventListener("click",async()=>{let t=eh.value.trim(),n=ep.value.trim(),o=eg.value.trim(),i=em.value;if(t&&n&&o&&i){let s={name:eb(t),ingredients:eb(n).split(",").map(e=>e.trim()),steps:eb(o).split("\n").map(e=>e.trim()).filter(e=>e),mealType:i,favorite:!1,email:eN};try{await eL(s),eF(),eh.value="",ep.value="",eg.value="",em.selectedIndex=0,alert("Recipe added successfully!"),e.info(`Recipe "${t}" added successfully by ${eN}`)}catch(t){e.error("Error adding recipe:",t),alert("Failed to add recipe. Please try again.")}}else alert("Please fill in all recipe fields.")}),eh.addEventListener("keypress",function(e){"Enter"===e.key&&eE.click()}),eO.addEventListener("click",()=>{eC.value="",ev.value="",eF()}),eC.addEventListener("input",ex),ev.addEventListener("change",ex),window.editRecipe=function(t,n){let o=(0,D.doc)(D.db,"recipes",t);(0,D.updateDoc)(o,n).then(()=>{e.info(`Recipe with id ${t} updated successfully.`),eF()}).catch(t=>{e.error("Error updating recipe:",t),alert("Failed to update recipe. Please try again.")})},window.removeRecipe=eM,window.toggleFavorite=function(t,n){let o=(0,D.doc)(D.db,"recipes",t);(0,D.updateDoc)(o,{favorite:!n}).then(()=>{e.info(`Favorite status toggled for recipe with id ${t}.`),eF()}).catch(t=>{e.error("Error toggling favorite:",t),alert("Failed to toggle favorite status. Please try again.")})},eI.addEventListener("click",async()=>{let t=e_.value.trim().toLowerCase();if(t)try{if(!function(e){if(e.startsWith("add recipe")){let t=e.replace("add recipe","").trim();return t?(eL({name:t,ingredients:[],steps:[],mealType:"Dinner",favorite:!1,email:eN}),eH(`Recipe ${t} added!`),eF()):eH("Please specify a recipe name to add."),!0}if(e.startsWith("complete")){let t=e.replace("complete","").trim();return t?function(e){let t=ey.getElementsByTagName("li"),n=!1;for(let o of t)o.querySelector("span:first-child").textContent.trim().split(" (")[0].toLowerCase()===e.toLowerCase()&&(eM(o.id),eD(o.id),n=!0);return n}(t)?(eH(`Recipe ${t} marked as complete.`),eF()):eH("Recipe not found!"):eH("Please specify a recipe to complete."),!0}if(e.startsWith("find recipes with")){var t;let n=e.replace("find recipes with","").trim();return n?(t=n,eC.value=t,ex(),eH(`Finding recipes with ${n}...`)):eH("Please specify an ingredient."),!0}return!1}(t)){let e=await eS(t);eH(e)}}catch(t){e.error("Error processing AI request:",t),eH("Error: Could not process your request.")}else eH("Please enter a prompt")}),eR.addEventListener("click",()=>{window.open(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent("https://pei-tong.github.io/Recipe-Organizer-PWA/")}`,"_blank")||alert("Please allow popups to generate QR code.")}),eT.addEventListener("click",()=>{localStorage.removeItem("email"),e.info("User signed out"),window.location.href="index.html"});
//# sourceMappingURL=recipes.55142281.js.map
