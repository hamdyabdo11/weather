let monthNames= ["January","February","March","April","May","June","July","August","September","October","November","December"];
let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let searchInput=document.getElementById("search");
let dataNow=new Date();
let month=dataNow.getMonth();
let day=dataNow.getDay();
let dataOfDay=dataNow.getDate();

// assign array monthNames by month varible and same to array dayNames
let printMonth=monthNames[month];
let printDay=dayNames[day];

// event for search input until writing
searchInput.addEventListener("keyup",country=>{getApi(country.target.value)});



//get api and hold data 
async function getApi(country){
  // let keyApi=""
  let x=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e080bbea322a41d19c6174414240301&q=${country}&days=3`);
  if(x.ok&&400!=x.status){
    let country=await x.json();
    showData(country);
    showDataWeatherForNextDays(country);
  }
}
 
// show data of weather day
function showData(list){
  // document.querySelector(".forecast").innerHTML=`${list.location.country}-${list.location.region}-${list.location.name};`
  

   let mainData=`

  <div class="today forecast">  
    <div class="forecast-header"  id="today">
        <div class="day">${printDay}</div>
        <div class=" date">${dataOfDay+"/"+printMonth}</div>
    </div>
      <div class="forecast-content" id="current">
        <div class="location">${list.location.name}</div>
          <div class="degree d-flex">    
              <div class="num">${list.current.temp_c}<sup>o</sup>C</div>
              <div class="forecast-icon">
              <img class="condition-img" src="https:${list.current.condition.icon}" alt="" width="">
              </div> 
          </div>
          <div class="custom">${list.current.condition.text}</div>
          <div class="span-icon">
          <span><i class="fa-solid fa-droplet"></i>${list.current.humidity}%</span>
          <span><i class="fa-solid fa-wind"></i>${list.current.wind_kph}km/h</span>
          <span><i class="fa-solid fa-compass"></i>${list.current.wind_dir}</span>
          </div>
         
      </div>
  </div>`;
  
  document.querySelector(".main-data").innerHTML=mainData;
  // let mainData=`
  // <div class="artpop">
  //             <article>
  //               <p class="d-flex justify-content-between mt-2 text-light fw-bold bg-gradient p-3">
  //                 <span>${printDay}</span>
  //                 <span>${dataOfDay}/${printMonth}</span>
  //               </p>
  //               <div class="content">
  //                 <div class="country">
  //                   <p class="text-light my-3 fs-4 fw-bold">${list.location.name}</p>
  //                 </div>
  //                 <div class=" degree d-flex justify-content-between ">
  //                   <h2>${list.current.temp_c} <span class="text-light">°C</span></h2>
  //                   <img src="https:${list.current.condition.icon}" alt="">
  //                 </div>
  //                 <div class="info">
  //                   <p class="text-light bg-dark rounded fs-5 fw-bolder badge" style="letter-spacing: 2px;">${list.current.condition.text}</p>
  //                 </div>
  //                 <ul class="d-flex justify-content-around text-light list-unstyled">
  //                   <li><i class="fa-solid fa-droplet"></i>${list.current.humidity}%</li>
  //                   <li><i class="fa-solid fa-wind"></i>${list.current.wind_kph}km/h</li>
  //                   <li><i class="fa-solid fa-compass"></i>${list.current.wind_dir}</li>
  //                 </ul>
  //               </div>
  //             </article>
  //           </div>
  //           `;
            // document.querySelector(".main-data").innerHTML=mainData;
}
// show data of weather for 3 days

function showDataWeatherForNextDays(nextDays){
  let tbody=``;
  for(let i=0;i<2;i++) {
    let afterDay=nextDays.forecast.forecastday[i+1].date;
    let updataDaySyntax=new Date(afterDay);
    let finallyPrintData=dayNames[updataDaySyntax.getDay()];
    tbody+=`
    <tr>
              <td class="fw-bolder">${finallyPrintData}</td>
              <td>${nextDays.forecast.forecastday[i+1].day.maxtemp_c}°C</td>
              <td>${nextDays.forecast.forecastday[i+1].day.mintemp_c}°C</td>
              <td>${nextDays.forecast.forecastday[i+1].day.condition.text}</td>
              <td><img src="https:${nextDays.forecast.forecastday[i+1].day.condition.icon}"></td>
              <td>${nextDays.forecast.forecastday[i+1].astro.sunrise}</td>
              <td>${nextDays.forecast.forecastday[i+1].astro.sunset}</td>
            </tr>`
        document.querySelector(".t-body").innerHTML=tbody;
  }

} 
//default vaule 
getApi("egypt");
