(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{X:()=>G});const t=[[5,15],[20,35]],n=[[20,30],[15,30]],o={hour:"numeric",minute:"numeric",month:"long",day:"2-digit",year:"numeric"},a={month:"2-digit",day:"2-digit",year:"2-digit"},r=new Headers({"Accept-Encoding":"gzip"}),s=e=>new Map([[new Set([0,1,2,17,36,43,"50d","50n"]).has(e),"fa-exclamation"],[new Set([3,4,37,38,47,"11d","11n"]).has(e),"fa-bolt"],[new Set([5,6,7,10,13,14,15,16,18,41,42,46,"13d","13n"]).has(e),"fa-snowflake"],[new Set([19,20,21,22]).has(e),"fa-smog"],[new Set([23,24]).has(e),"fa-wind"],[new Set([26,"03d","03n","04d","04n"]).has(e),"fa-cloud"],[new Set([28,30,"02d"]).has(e),"fa-cloud-sun"],[new Set([27,29,"02n"]).has(e),"fa-cloud-moon"],[new Set([32,34,"01d"]).has(e),"fa-sun"],[new Set([31,33,"01n"]).has(e),"fa-moon"],[new Set([8,9,11,12,39,45,"09d","09n","10d","10n"]).has(e),"fa-cloud-rain"],[new Set([44,null]).has(e),"fa-slash"]]).get(!0)??"fa-poo-storm",c=document.querySelector(".options__close"),i=document.querySelector("#bookmarks"),l=document.querySelector("#git"),d=document.querySelector("#weather-type"),m=document.querySelector(".options__inputs--weatherstations");let u=new DocumentFragment,p=new DocumentFragment;const h=(e="",t="",n="")=>{const o=document.createElement("form");o.classList.add("options__forms--row","drag");const a=document.createElement("span");a.classList.add("btn--drag","options__grab");const r=document.createElement("i");r.classList.add("fas","fa-bars");const s=document.createElement("label");s.textContent="Name: ",s.classList.add("options__labels");const c=document.createElement("input");c.type="text",c.name="name",c.placeholder="Google",c.classList.add("options__inputs","options__inputs--bookmarks"),c.value=e;const l=document.createElement("label");l.textContent="Url: ",l.classList.add("options__labels");const d=document.createElement("input");d.type="url",d.name="url",d.placeholder="https://www.google.com",d.classList.add("options__inputs","options__inputs--bookmarks"),d.value=t;const m=document.createElement("label");m.textContent="Icon: ",m.classList.add("options__labels");const p=document.createElement("input");p.type="text",p.name="icon",p.placeholder="fab fa-google",p.classList.add("options__inputs","options__inputs--bookmarks"),p.value=n;const h=document.createElement("span");h.classList.add("btn","options__delete"),h.tabIndex=0;const y=document.createElement("i");y.classList.add("far","fa-circle-xmark"),a.append(r),s.append(c),l.append(d),m.append(p),h.append(y),o.append(a,s,l,m,h),u.append(o),i.append(u)},y=(e="",t="master")=>{const n=document.createElement("form");n.classList.add("options__forms--row","drag");const o=document.createElement("span");o.classList.add("btn--drag","options__grab");const a=document.createElement("i");a.classList.add("fas","fa-bars");const r=document.createElement("label");r.textContent="Repo: ",r.classList.add("options__labels");const s=document.createElement("input");s.name="repo",s.type="text",s.placeholder="jnines/MyTab",s.classList.add("options__inputs","options__inputs--git"),s.value=e;const c=document.createElement("label");c.textContent="Branch: ",c.classList.add("options__labels");const i=document.createElement("input");i.type="text",i.name="branch",i.placeholder="master",i.classList.add("options__inputs","options__inputs--git"),i.value=t;const d=document.createElement("span");d.classList.add("btn","options__delete"),d.tabIndex=0;const m=document.createElement("i");m.classList.add("far","fa-circle-xmark"),d.append(m),o.append(a),r.append(s),c.append(i),n.append(o,r,c,d),p.append(n),l.append(p)};async function g(e){const t=await e??await _("Options"),n=document.querySelector("#colors"),o=document.querySelector("#weather-type"),a=document.querySelector("#weather-units"),r=document.querySelector("#weather-key"),s=document.querySelector("#stations"),u=document.querySelector("#gitkey"),p=document.querySelector("#server-url"),g=document.querySelector("#refresh-time"),w=document.querySelector(".options__export"),L=document.querySelector("#import-file");O(".options__forms--row"),(()=>{const e=e=>{h(),T(i);const t=document.querySelectorAll(".drag"),n=document.querySelectorAll(".btn--drag");D(i),I(t,n)},t=document.querySelector(".options__plus--bookmarks");t.dataset.add||(t.dataset.add=!0,t.addEventListener("click",e),t.addEventListener("keydown",(t=>{"Enter"!==t.key&&" "!==t.key||e()})));const n=()=>{y(),T(l);const e=document.querySelectorAll(".drag"),t=document.querySelectorAll(".btn--drag");D(l),I(e,t)},o=document.querySelector(".options__plus--git");o.dataset.add||(o.dataset.add=!0,o.addEventListener("click",n),o.addEventListener("keydown",(e=>{"Enter"!==e.key&&" "!==e.key||n()}))),document.body.addEventListener("load",(()=>S(d,m))),d.addEventListener("change",(()=>S(d,m)));const a=document.querySelector(".options__save");a.removeEventListener("click",E),a.addEventListener("click",E),a.removeEventListener("keydown",M),a.addEventListener("keydown",M),c.removeEventListener("click",C),c.addEventListener("click",C),c.removeEventListener("keydown",A),c.addEventListener("keydown",A)})(),L.addEventListener("change",v),t?.bookmarks.forEach((e=>h(e.name,e.url,e.icon))),h(),t?.git?.gitRepos?.forEach((e=>y(e.repo,e.branch))),y(),n.checked="bright"===t?.colors??!1,o.checked="wu"===t?.weather.type??!1,a.checked="metric"===t?.weather.units??!1,r.value=t?.weather.weatherKey??"",s.value=t?.weather.stations.join(", ")??"",u.value=t?.git.gitKey??"",p.value=t?.serverMon.url??"",g.value=t?.serverMon.refresh??"",D(i),D(l),S(d,m),document.querySelectorAll(".options__delete")?.forEach((e=>{R(e,".options__forms--row"),e.addEventListener("click",(e=>{e.target.closest(".options__forms--row").remove()}))}));const b=document.querySelectorAll(".drag"),k=document.querySelectorAll(".btn--drag");I(b,k),f(t,w)}const w=()=>"moz-extension:"===window.location.protocol?"browser":"chrome-extension:"===window.location.protocol?"chrome":"local",f=(e,t)=>{const n=(new Date).toLocaleDateString(L,a).replaceAll("/",""),o=new Blob([JSON.stringify(e,null,2)],{type:"application/json"});t.download=`mytab_${n}.json`,t.href=URL.createObjectURL(o)},v=function(){document.querySelector("#import-file");const e=new FileReader;e.readAsText(this.files[0]),e.onload=()=>g(JSON.parse(e.result)),e.onerror=()=>console.error(e.error)},_=async e=>{const t=w();if("browser"===t)try{return await browser.storage.sync.get(e).then((e=>e.Options))}catch(e){console.error(e)}if("chrome"===t)try{return await(e=>{try{return new Promise((t=>{chrome.storage.sync.get(e,t)}))}catch(e){console.error(e)}})(e).then((e=>e.Options))}catch(e){console.log(e)}if("local"===t)try{return JSON.parse(window.localStorage?.getItem(e))}catch(e){console.error(e)}};async function E(){const e=document.querySelector("#bookmarks"),t=document.querySelector("#git"),[n]=U("#colors"),[o,a]=K(e,t),r=o.filter((e=>void 0!==e.name&&void 0!==e.url&&void 0!==e.icon)),s=P(J(a.filter((e=>void 0!==e.repo&&void 0!==e.branch)))),[c,i]=U("#weather-type","#weather-units").values(),l=document.querySelector("#stations").value.replaceAll(/\s/g,"").split(","),d={colors:n,bookmarks:r,git:{gitRepos:s,gitKey:document.querySelector("#gitkey").value},weather:{type:c,units:i,weatherKey:document.querySelector("#weather-key").value,stations:l},serverMon:{url:document.querySelector("#server-url").value,refresh:document.querySelector("#refresh-time").value}};(async(e,t)=>{const n=w();if("browser"===n)try{await browser.storage.sync.set({[e]:t})}catch(e){console.error(e)}if("chrome"===n)try{await chrome.storage.sync.set({[e]:t})}catch(e){console.error(e)}if("local"===n)try{window.localStorage.setItem("Options",JSON.stringify(t))}catch(e){console.error(e)}})("Options",d),G(d),C()}const L=navigator.language,b=e=>{const t=e.includes("-")?"-":" ",n=e.split(/[- ]+/).map((e=>e[0].toUpperCase()+e.slice(1).toLowerCase()));return n.join(t)},k=e=>{e.style.opacity=1,e.style.visibility="visible"},S=(e,t)=>{e.checked?t.removeAttribute("disabled"):t.setAttribute("disabled","disabled")},$=(e,t)=>Math.floor(Math.random()*(t-e)+1)+e,q=e=>`hsl(${360,Math.floor(360*Math.random())}, ${$(15,25)}%, ${$(e[0],e[1])}%)`,x=e=>e.toLocaleString(L,o),C=e=>{const t=document.querySelector(".modal"),n=document.querySelector(".overlay");[t,n].forEach((e=>e.classList.toggle("hidden"))),(()=>{const e=document.querySelector(".modal");e.open?e.close():e.showModal()})()},A=e=>{(e&&"Enter"===e.key||e&&" "===e.key)&&C()},M=e=>{(e&&"Enter"===e.key||e&&" "===e.key)&&E()},D=e=>{document.querySelectorAll(".drag").forEach((e=>{e.dataset.dragstart||(e.dataset.dragstart=!0,e.addEventListener("dragstart",(()=>{e.classList.add("dragging")}))),e.dataset.dragend||(e.dataset.dragend=!0,e.addEventListener("dragend",(()=>{e.classList.remove("dragging")})))})),e.dataset.dragover||(e.dataset.dragover=!0,e.addEventListener("dragover",(t=>{t.preventDefault();const n=((e,t)=>[...e.querySelectorAll(".drag:not(.dragging)")].reduce(((e,n)=>{const o=n.getBoundingClientRect(),a=t-o.top-o.height/2;return a<0&&a>e.offset?{offset:a,element:n}:e}),{offset:Number.NEGATIVE_INFINITY}).element)(e,t.clientY),o=document.querySelector(".dragging");null===n&&e.append(o),e.insertBefore(o,n)})))},I=(e,t)=>{e.forEach(((e,n)=>{t[n].addEventListener("mousedown",(()=>e.draggable=!0)),t[n].addEventListener("mouseup",(()=>e.draggable=!1)),e.addEventListener("dragend",(()=>e.draggable=!1))}))},O=e=>{document.querySelectorAll(e).forEach((e=>e.remove()))},j=()=>{C(),scrollTo({top:0,left:0,behavior:"smooth"})},F=e=>{(e&&"Enter"===e.key||e&&" "===e.key)&&j()},N=e=>{const t=document.querySelector(".modal");"Escape"!==e.key||t.classList.contains("hidden")||C()},T=e=>{e.scrollTop=e.scrollHeight},R=(e,t)=>{e.addEventListener("click",(e=>{e.target.closest(t).remove()}))},K=(...e)=>e.map((e=>[...e.querySelectorAll("form")].map((e=>{const t={};return e.querySelectorAll("input").forEach((e=>""==e.value?null:t[e.name]=e.value)),t})))),U=(...e)=>e.map((e=>{const t=document.querySelector(e);return t.checked?t.dataset.on:t.dataset.off})),J=e=>JSON.parse(JSON.stringify(e).replaceAll(/\s/g,"")),P=e=>e.map((e=>{const t=e.repo.split("/");return{...e,repo:`${t[t.length-2]}/${t[t.length-1]}`}}));async function W({units:e,weatherKey:t,type:n}){const o=sessionStorage.getItem("LAT"),a=sessionStorage.getItem("LNG");if(o&&a){const s=fetch("owm"===n?`https://api.openweathermap.org/data/2.5/onecall?lat=${o}&lon=${a}&exclude=minutely,hourly&units=${e}&appid=${t}`:`https://api.weather.com/v3/wx/forecast/daily/5day?geocode=${o},${a}&format=json&units=${"imperial"===e?"e":"m"}&language=${L}&apiKey=${t}`,r).catch((e=>console.error(e)));return(await s).json()}}async function B(e,o){const a=document.querySelector(".server");let r=new DocumentFragment;try{const s=await async function(e){const t=await fetch(e);if(t.ok)return await t.json()}(e);s.forEach((e=>{const a=document.createElement("div");a.classList.add("server__status","online"===e?.status?"server__status--on":"server__status--off"),a.textContent=`${b(e?.status)}`;const s=document.createElement("div");s.setAttribute("class","server__title"),s.textContent=b(e?.name);const c=document.createElement("i");c.setAttribute("class",`${e?.fa_icon}`),c.style.color=q("dark"===o.colors?[...t[1]]:[...n[1]]),c.alt=e?.name;const i=document.createElement("a");i.classList.add("server__link"),i.href=e?.url,i.target="_blank",i.ariaLabel=e?.name,i.title=e?.error??e?.name;const l=document.createElement("div");l.classList.add("server__container",`${e?.error&&"server__container--error"}`),e?.error&&console.error(e),l.append(i,c,s,a),r.append(l)})),a.textContent="",a.append(r),k(a)}catch(e){console.error(e)}}function G(e){const o=document.querySelector(".container"),a=document.querySelector(".options-btn"),c=document.querySelector(".bookmarks"),i=document.querySelector(".git"),l=document.querySelector(".weather"),d=document.querySelector(".server"),m=e?.bookmarks?.length,u=e?.git?.gitRepos?.length,p=e?.serverMon?.url,h=e?.weather?.weatherKey;((...e)=>{e.forEach((e=>{for(;e?.firstChild;)e.removeChild(e.firstChild)}))})(document.querySelector(".bookmarks"),document.querySelector(".git"),document.querySelector(".weather"),document.querySelector(".server"));const y=[m,u,p,h].filter(Boolean).length;if(((...e)=>{document.body.style.backgroundImage=`linear-gradient(${Math.ceil(320*Math.random())+20}deg, ${q(...e)}, ${q(...e)}, ${q(...e)}), none`})("bright"===e?.colors?n[0]:t[0]),!e)return C(),void g();y<=1&&(o.classList.remove("container--multi"),o.classList.add("container--single")),y>1&&(o.classList.remove("container--single"),o.classList.add("container--multi")),h||(l.classList.remove("flex"),l.classList.add("no-display"),m&&(c.style.gridRow="span 2")),u||(i.classList.remove("grid"),i.classList.add("no-display"),m&&(c.style.gridColumn="span 2")),p||(d.classList.remove("flex"),d.classList.add("no-display")),m&&(c.classList.add("grid"),c.classList.remove("no-display"),function(e){let o=new DocumentFragment;const a=document.querySelector(".bookmarks");try{e.forEach(((e,a)=>{const r=document.createElement("a");r.classList.add("bookmarks__link"),r.href=e?.url,r.title=e?.name;const s=document.createElement("div");s.classList.add("bookmarks__container"),s.style.backgroundColor=q("dark"===a?t[1]:n[1]);const c=document.createElement("i");c.setAttribute("class",`${e?.icon.includes("<i")?(e=>{if(e.startsWith("<i"))return e.split('"')[1]})(e.icon):e.icon}`),c.alt=e?.name;const i=document.createElement("div");i.classList.add("bookmarks__title"),i.textContent=e?.name,s.append(r,c,i),o.append(s)})),a.append(o)}catch(e){console.error(e)}}(e.bookmarks,e.colors)),u&&(i.classList.add("grid"),i.classList.remove("no-display"),m&&c.removeAttribute("style"),async function(e){const t=document.querySelector(".git");let n=new DocumentFragment;try{const o=x(new Date);(await async function(e){const t=e.gitKey,n=e.gitRepos.map((e=>{return fetch(`https://api.github.com/repos/${e.repo}/commits?sha=${e.branch}&page=1&per_page=4`,(n=t,{method:"GET",redirect:"follow",headers:{Accept:"application/vnd.github.v3+json",Authorization:`token ${n}`,"User-Agent":"MyTab"}})).then((t=>{if(!t.ok)throw new Error(`${e[0]} ${e[1]} incorrect values`);return t.json()}));var n})),o=await Promise.allSettled(n),a=o.filter((e=>"fulfilled"===e.status)).map((e=>e.value)),r=o.filter((e=>"rejected"===e.status)).map((e=>e.reason));return r.length>=1&&console.error(...r),a}(e)).map((e=>{const t=e[0]?.url.split("/")[5].toUpperCase(),a=e[0]?.html_url.split("/").slice(0,5).join("/"),r=o.split(",")[0],s=x(new Date(e[0]?.commit.committer.date)),c=s.split(",")[0],i=e[0]?.commit.message.split("\n")[0],l=r===c?"git__title--new":"git__title",d=document.createElement("div");d.classList.add("git__container");const m=document.createElement("span");m.classList.add("tooltip","tooltip--git"),m.textContent=`\n                       ${e[1]?x(new Date(e[1]?.commit.committer.date)):""}\n                        ${e[1]?.commit.message.split("\n")[0]??""}\n\n                        ${e[2]?x(new Date(e[2]?.commit.committer.date)):""}\n                        ${e[2]?.commit.message.split("\n")[0]??""}\n\n                        ${e[3]?x(new Date(e[3]?.commit.committer.date)):""}\n                        ${e[3]?.commit.message.split("\n")[0]??""}\n\n    `.replace(/  +/g,"");const u=document.createElement("ul"),p=document.createElement("li");p.setAttribute("class",`${l}`);const h=document.createElement("a");h.href=a,h.textContent=`${t}`;const y=document.createElement("li");y.textContent=`${s}`;const g=document.createElement("li");g.classList.add(".git__message"),g.textContent=`${i}`,p.append(h,m),u.append(p,y,g),d.append(u),n.append(d)}))}catch(e){console.error(e)}finally{t.append(n),k(t)}}(e.git)),p&&(d.classList.add("flex"),d.classList.remove("no-display"),B(p,e.colors),setInterval(B,1e3*e.serverMon.refresh,p,e.colors));navigator.geolocation&&h&&(d.classList.add("flex"),d.classList.remove("no-display"),navigator.geolocation.getCurrentPosition((async t=>{const{latitude:n,longitude:o}=await t.coords;l.classList.add("flex"),l.classList.remove("no-display"),sessionStorage.setItem("LAT",n),sessionStorage.setItem("LNG",o),"owm"===e.weather.type&&await async function(e){const t=document.querySelector(".weather");let n=new DocumentFragment,o=new DocumentFragment;try{const{current:a,daily:r}=await W(e);if(a&&r){const e=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],t=document.createElement("weather-cur");t.classList.add("weather-cur","flex");const c=document.createElement("i");c.setAttribute("class",`fas ${s(a.weather[0].icon)}`);const i=document.createElement("span");i.classList.add("tooltip","tooltip--weather"),i.textContent=`${b(a.weather[0].description)}, Feels like ${Math.round(a.feels_like)}`;const l=document.createElement("div");l.classList.add("weather-cur__temp"),l.textContent=`${Math.round(a.temp)}°`,t.append(i,c,l),n.append(t),r.forEach((t=>{const n=new Date(1e3*t.dt),a=e[n.getDay()],r=document.createElement("div"),c=document.createElement("div");c.classList.add("weather-fc__days");const i=document.createElement("i");i.setAttribute("class",`fas ${s(t.weather[0].icon)}`);const l=document.createElement("div");l.classList.add("weather-fc__column");const d=document.createElement("span");d.classList.add("tooltip","tooltip--weather"),d.textContent=`${b(t.weather[0].description)}`;const m=document.createElement("div");m.classList.add("weather-fc__highs"),m.textContent=`${Math.round(t.temp.max)}°`;const u=document.createElement("div");u.classList.add("weather-fc__lows","padding-sm--top","padding-sm--bot"),u.textContent=`${Math.round(t.temp.min)}°`,c.append(a),l.append(d,c,i,m,u),r.append(l),o.append(r)}))}t.append(n,o),k(t)}catch(e){console.error(e)}}(e.weather),"wu"===e.weather.type&&await async function(e){const t=document.querySelector(".weather");let n=new DocumentFragment,o=new DocumentFragment;try{const a=await async function({stations:e,units:t,weatherKey:n}){const o=e.map((e=>fetch(`https://api.weather.com/v2/pws/observations/current?stationId=${e}&format=json&units=${"imperial"==t?"e":"m"}&apiKey=${n}`,r).catch((e=>console.error(`One or more of the servers is unreachable: ${e}`))))),a=await Promise.any(o);return(await a).json()}(e),c=await W(e);if(a&&c){const e=a.observations[0].stationID,r=c.daypart[0].iconCode.filter(((e,t)=>t%2==0)),i=c.daypart[0].iconCode.filter(((e,t)=>t%2==1)),l=c.temperatureMax,d=c.temperatureMin,m=c.daypart[0].narrative.filter(((e,t)=>t%2==0)),u=c.daypart[0].narrative.filter(((e,t)=>t%2==1)),p=document.createElement("a");p.classList.add("weather__link"),p.href=`https://www.wunderground.com/forecast/${e}`,p.ariaLabel="Weather Underground Forecast",p.title="Weather Underground Forecast";const h=document.createElement("div");h.classList.add("weather-cur","flex");const y=document.createElement("i");y.setAttribute("class",`fas ${r[0]?s(r[0]):s(i[0])}`),y.alt="Current weather conditions";const g=document.createElement("span");g.classList.add("tooltip","tooltip--weather","tooltip--short"),g.textContent=`Feels like ${a.observations[0].imperial?.heatIndex||a.observations[0].metric?.heatIndex||a.observations[0].uk_hybrid?.heatIndex||a.observations[0].imperial?.windChill||a.observations[0].metric?.windChill||a.observations[0].uk_hybrid?.windChill||"Current weather stats not available"}°`;const w=document.createElement("div");w.classList.add("weather-cur__temp"),w.textContent=`${a.observations[0].imperial?.temp||a.observations[0].metric?.temp||a.observations[0].uk_hybrid?.temp||"X"}°`,h.append(g,y,w),n.append(h);const f=document.createElement("div");f.classList.add("weather-fc","flex"),c.dayOfWeek.forEach(((e,t)=>{const n=document.createElement("div"),a=document.createElement("div");a.classList.add("weather-fc__days"),a.textContent=`${e.slice(0,3).toUpperCase()}`;const c=document.createElement("div");c.classList.add("weather-fc__column");const p=document.createElement("div");p.classList.add("tooltip","tooltip--weather"),p.textContent=m[t]?`${e}: \n            ${m[t]}\n            \n            ${e} evening:\n            ${u[t]}`:`${e} evening:\n            ${u[t]}`;const h=document.createElement("i");h.setAttribute("class",`fas ${s(r[t])}`),h.alt="Day time weather images";const y=document.createElement("div");y.classList.add("weather-fc__highs"),y.textContent=l[t]?l[t]+"°":"--",y.alt="High temperature for the day";const g=document.createElement("i");g.setAttribute("class",`fas ${s(i[t])}`),g.alt="Night time weather images";const w=document.createElement("div");w.classList.add("weather-fc__lows"),w.textContent=`${d[t]}°`,w.alt="Low temperature for the day",c.append(h,y,g,w),a.append(p),n.append(a,c),f.append(n),o.append(f)})),t.append(p,n,o),k(t)}}catch(e){console.error(e)}}(e.weather)}),(()=>{const e=document.querySelector(".weather"),t=document.createElement("details"),n=document.createElement("summary");t.textContent="Require location data to render weather",n.textContent="Weather",t.append(n),e.append(t),k(e)}))),a.removeEventListener("click",j),a.addEventListener("click",j),a.removeEventListener("keydown",F),a.addEventListener("keydown",F),document.removeEventListener("keydown",N),document.addEventListener("keydown",N),g()}!async function(){G(await _("Options"))}()})();
//# sourceMappingURL=app.js.map