let selectBox=document.querySelectorAll(".select-container select");
 let exchangeBtn=document.querySelector("#getExchange");
 let fromCurrency=document.querySelector(".from select");
 let toCurrency=document.querySelector(".to select");
 let msg=document.querySelector(".msg");
 let exchangeAPI="https://api.fxratesapi.com/latest"
let apiKey="fxr_live_bb13e3e7f9709919a24a42e5d54fd60e4122"; // this is unique key


// function for create link for country flag and set country flag for the country 
updateFlag=(element)=>{
  let countryCode=countryList[element.value];
  let newFlagSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newFlagSrc;
}

//get exchange rate from api

let exchange=async (evt)=>{
  evt.preventDefault();
  let amount=document.querySelector(".amount input");
  amtval=amount.value;

  if(amtval==="" || amtval<1){
    amtval=1;
    amount.value="1";
  }
  amount.addEventListener('change',exchange)

  let fullUrl=`${exchangeAPI}?api_key=${apiKey}&base=${fromCurrency.value}&symbols=${toCurrency.value}`
  let response=await fetch(fullUrl);
  let data=await response.json();

  let updateDate = new Date(`${data.date}`);
  let localDate =updateDate.toLocaleDateString();
  let localTime = updateDate.toLocaleTimeString();

  msg.innerHTML=`${amtval} ${fromCurrency.value} = ${(amtval*data.rates[toCurrency.value]).toFixed(3)} ${toCurrency.value} <br/>Last update dateTime is: ${localDate} , ${localTime} `
  console.log(data.date);
}



//this is for the create dropdown box to add all country and update the flag for all the country
for(let select of selectBox){
  for(let currency in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=currency;
    newOption.value=currency;
    if(select.name==="from" && currency==="USD"){
      newOption.selected=true;
    }else if(select.name==="to" && currency==="BDT"){
      newOption.selected=true;
    }
    select.append(newOption);
  }
  select.addEventListener('change', (opt)=>{
   updateFlag(opt.target); // function call for update the country flag 
  })
  select.addEventListener('change',exchange)
}

exchangeBtn.addEventListener('click',exchange);
window.addEventListener('load',exchange);


// Create a date object from the string

