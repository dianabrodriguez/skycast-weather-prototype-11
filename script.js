const sample = {
  "Tampa": {name:"Tampa, Florida",temp:78,feels:81,condition:"Partly cloudy",symbol:"☀",humidity:68,dewpoint:66,pressure:30.02,rainfall:0.04,note:"A warm afternoon with a mix of sunshine and clouds.",highs:[82,84,81,79,83,85,84],lows:[69,70,68,67,69,71,70],conditions:["Partly cloudy","Sunny","Showers","Cloudy","Partly cloudy","Sunny","Mostly sunny"],icons:["☀","☀","☂","☁","☀","☀","☀"],humidityTrend:[68,62,76,79,65,60,63]},
  "Miami": {name:"Miami, Florida",temp:83,feels:87,condition:"Mostly sunny",symbol:"☀",humidity:72,dewpoint:70,pressure:30.01,rainfall:0.02,note:"Warm and humid with bright skies and a small chance of showers.",highs:[85,86,84,83,85,86,85],lows:[75,75,74,74,75,76,75],conditions:["Mostly sunny","Sunny","Showers","Partly cloudy","Mostly sunny","Sunny","Partly cloudy"],icons:["☀","☀","☂","☀","☀","☀","☀"],humidityTrend:[72,68,78,75,70,66,69]},
  "Orlando": {name:"Orlando, Florida",temp:80,feels:83,condition:"Partly cloudy",symbol:"⛅",humidity:65,dewpoint:64,pressure:30.03,rainfall:0.01,note:"Partly cloudy skies with comfortable conditions for outdoor plans.",highs:[83,84,82,80,82,85,84],lows:[68,69,68,67,68,70,69],conditions:["Partly cloudy","Sunny","Showers","Cloudy","Partly cloudy","Sunny","Mostly sunny"],icons:["⛅","☀","☂","☁","⛅","☀","☀"],humidityTrend:[65,61,74,77,66,60,62]},
  "New York": {name:"New York, New York",temp:61,feels:59,condition:"Cloudy",symbol:"☁",humidity:58,dewpoint:46,pressure:30.12,rainfall:0.00,note:"Cooler conditions with clouds moving across the area.",highs:[63,65,61,59,62,66,64],lows:[49,50,47,45,48,51,50],conditions:["Cloudy","Partly cloudy","Showers","Cloudy","Sunny","Partly cloudy","Sunny"],icons:["☁","⛅","☂","☁","☀","⛅","☀"],humidityTrend:[58,54,70,68,55,52,56]}
};
const days=["Wed","Thu","Fri","Sat","Sun","Mon","Tue"];
let currentKey="Tampa", unit="F", alertsEnabled=true;
const $=id=>document.getElementById(id);
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2600)}
function weather(){return sample[currentKey]||sample.Tampa}
function toTemp(f){return unit==="C"?Math.round((f-32)*5/9):f}
function tempText(f){return `${toTemp(f)}°`}
function setLocation(input){
  const normalized=input.trim().toLowerCase();
  const found=Object.keys(sample).find(k=>k.toLowerCase()===normalized||sample[k].name.toLowerCase()===normalized);
  if(!found){toast("Sample data is available for Tampa, Miami, Orlando, and New York.");return}
  currentKey=found;$("locationInput").value=sample[found].name;renderAll();toast(`Showing sample weather for ${sample[found].name}.`)
}
function renderHero(){
  const w=weather();$("heroLocation").textContent=w.name;$("sideLocation").textContent=w.name;$("forecastLocation").textContent=w.name;$("alertLocationLabel").textContent=w.name;
  $("mainTemp").textContent=tempText(w.temp);$("feelsLike").textContent=`Feels like ${tempText(w.feels)}`;$("mainCondition").textContent=w.condition;$("mainSymbol").textContent=w.symbol;$("heroNote").textContent=w.note;
  $("humidity").innerHTML=`${w.humidity}<span>%</span>`;$("dewpoint").innerHTML=`${tempText(w.dewpoint).replace("°","")}<span>${unit==="F"?"°F":"°C"}</span>`;$("pressure").innerHTML=`${w.pressure.toFixed(2)}<span> inHg</span>`;$("rainfall").innerHTML=`${w.rainfall.toFixed(2)}<span> in</span>`;
  $("lastUpdated").textContent=new Date().toLocaleTimeString([], {hour:"numeric",minute:"2-digit"});
}
function renderForecast(){
  const w=weather();
  $("forecastList").innerHTML=days.map((d,i)=>`<div class="forecast-day ${i===0?"today":""}"><div class="day">${i===0?"Today":d}</div><div class="day-icon">${w.icons[i]}</div><div class="high">${tempText(w.highs[i])}</div><div class="low">${tempText(w.lows[i])}</div></div>`).join("");
  $("forecastDetailList").innerHTML=days.map((d,i)=>`<div class="forecast-detail-row"><div class="day-name">${i===0?"Today":d}<span class="date">${new Date(Date.now()+i*86400000).toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span></div><div class="forecast-icon">${w.icons[i]}</div><div class="forecast-condition">${w.conditions[i]}</div><div class="forecast-temps">${tempText(w.highs[i])}<span>${tempText(w.lows[i])}</span></div></div>`).join("");
  $("weeklySummary").textContent=`${w.name} is expected to have highs near ${tempText(Math.max(...w.highs))} and lows near ${tempText(Math.min(...w.lows))} over the next seven days. ${w.conditions.includes("Showers")?"A chance of showers appears in the sample forecast, so keep an eye on local conditions.":"Mostly dry conditions appear in this sample forecast."}`;
}
function alertMarkup(full=false){
  return `<div class="alert-item"><div class="alert-type">!</div><div><strong>Possible afternoon showers</strong><p>Sample notice: brief showers may develop later. Consider checking conditions before outdoor plans.</p><div class="alert-meta">Illustrative · Today</div></div></div><div class="alert-item"><div class="alert-type blue-alert">☀</div><div><strong>UV awareness</strong><p>Sample reminder: consider sun protection during extended time outdoors.</p><div class="alert-meta">General reminder · Today</div></div></div>`;
}
function renderAlerts(){$("alertPreview").innerHTML=alertMarkup();$("allAlerts").innerHTML=alertMarkup(true);$("navAlertCount").textContent=alertsEnabled?"2":"0";$("topAlert").classList.toggle("hidden",!alertsEnabled);$("alertPreview").style.opacity=alertsEnabled?"1":".45";$("allAlerts").style.opacity=alertsEnabled?"1":".45";$("notificationToggle").checked=alertsEnabled;$("notificationToggle2").checked=alertsEnabled}
function renderCharts(){
  const w=weather();
  const build=(values,cls,suffix)=>values.map((v,i)=>`<div class="chart-bar-wrap"><span class="chart-value">${v}${suffix}</span><div class="chart-bar ${cls}" style="height:${Math.max(15,(v-Math.min(...values)+8)/(Math.max(...values)-Math.min(...values)+8)*72)}%"></div><span class="chart-day">${days[i]}</span></div>`).join("");
  $("temperatureChart").innerHTML=build(w.highs,"","°");$("humidityChart").innerHTML=build(w.humidityTrend,"humidity-bar","%");
}
function renderAll(){renderHero();renderForecast();renderAlerts();renderCharts()}
function showView(name){
  const views=["dashboard","forecast","analytics","alerts","settings"];
  views.forEach(v=>$(v+"View").classList.toggle("hidden",v!==name));
  document.querySelectorAll(".nav-item[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===name));
  const titles={dashboard:"Weather overview",forecast:"Forecast",analytics:"Weather insights",alerts:"Weather alerts",settings:"Preferences"};
  $("pageTitle").textContent=titles[name]||"Weather overview";window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll(".nav-item[data-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
document.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.goto)));
$("searchBtn").addEventListener("click",()=>setLocation($("locationInput").value));
$("locationInput").addEventListener("keydown",e=>{if(e.key==="Enter")setLocation($("locationInput").value)});
$("refreshBtn").addEventListener("click",()=>{renderAll();toast("Sample weather display refreshed.")});
$("useLocationBtn").addEventListener("click",()=>toast("Browser location is not connected in this demo. Search a supported sample city instead."));
$("dismissTopAlert").addEventListener("click",()=>{$("topAlert").classList.add("hidden");toast("Notice dismissed for this view.")});
$("notificationToggle").addEventListener("change",e=>{alertsEnabled=e.target.checked;renderAlerts();toast(alertsEnabled?"Demo notifications enabled.":"Demo notifications disabled.")});
$("notificationToggle2").addEventListener("change",e=>{alertsEnabled=e.target.checked;renderAlerts();toast(alertsEnabled?"Demo notifications enabled.":"Demo notifications disabled.")});
$("alertsShortcut").addEventListener("click",()=>showView("alerts"));
$("settingsBtn").addEventListener("click",()=>showView("settings"));
$("unitSelect").addEventListener("change",e=>{unit=e.target.value;renderAll();toast(`Temperature display changed to ${unit==="F"?"Fahrenheit":"Celsius"}.`)});
$("logoutBtn").addEventListener("click",()=>$("loginModal").classList.remove("hidden"));
$("closeLogin").addEventListener("click",()=>$("loginModal").classList.add("hidden"));
$("demoLogin").addEventListener("click",()=>{const name=$("demoName").value.trim();$("loginModal").classList.add("hidden");toast(name?`Welcome to the demo, ${name}!`:"Welcome back to the demo!");});
$("loginModal").addEventListener("click",e=>{if(e.target===$("loginModal"))$("loginModal").classList.add("hidden")});
const now=new Date();$("todayLabel").textContent=now.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}).toUpperCase();
renderAll();
