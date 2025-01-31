let api = "https://v6.exchangerate-api.com/v6/51444ff5763f30043bb3e2e9/latest";
let apiKey = "51444ff5763f30043bb3e2e9";
const heading = document.querySelector("h2");
const dropdown = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".fromMenu select");
const toCurr = document.querySelector(".toMenu select");

const cBtn = document.querySelector(".btn");
const message1 = document.querySelector(".message1");
const message2 = document.querySelector(".message2");

const swapIcon = document.querySelector(".icon");

let toContainer = document.querySelector(".toContainer");
let toDropdown =  document.querySelector("#selectTo");
let fromContainer = document.querySelector(".fromContainer");
let fromDropdown =  document.querySelector("#selectFrom");

let ifConvert = false;

for (let select of dropdown) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "currFrom" && currCode === "USD"){
            newOption.selected = "selected";
        }
        if (select.name === "currTo" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change" , (evt) => {
        changeFlag(evt.target); // Target shows where the chnage occured

    if(ifConvert) {
        updateRate();
    }
    })
}

    // window.addEventListener("load" , () => {
    //     updateRate();
    // });

swapIcon.addEventListener("click" , () => {
    let fromValue = fromCurr.value;
    let toValue = toCurr.value;
 
    fromCurr.value = toValue;
    toCurr.value = fromValue;
 
    changeFlag(fromCurr);
    changeFlag(toCurr);
 
    if(ifConvert) {
        updateRate();
    }
    
})



const changeFlag = (target) => {
    let curr = target.value;
    let country = countryList[curr];
    let newSrc = `https://flagsapi.com/${country}/shiny/64.png`
    let newImg = target.parentElement.querySelector("img");
    newImg.src = newSrc;
}

cBtn.addEventListener("click" , (evt) => {
    evt.preventDefault();
    updateRate();
   
})

document.addEventListener("keydown" , (evt) => {
    if(evt.key === "Enter"){
        updateRate();
    }   
})

let amount = document.querySelector(".amount input")
amount.addEventListener("input" , () => {
    if(ifConvert) {
        updateRate();
    }
})

const updateRate = async() => {
    let amountVal = amount.value;

    if (amountVal === "") {
        message1.innerText = "Please enter a valid amount.";
        message2.innerText = "";
        return; 
    }
    
    if (isNaN(amountVal) || amountVal <= 0) {
        cBtn.classList.add("hidden")
        ifConvert = true;
        message1.innerText = "Please enter a valid amount.";
        message2.innerText = "";
        return;
    }

    else {
        heading.innerText = `Convert ${fromCurr.value} to ${toCurr.value}`
        const newUrl = `${api}/${fromCurr.value}`;
    
        let response = await fetch(newUrl);
        let data = await response.json(); 
        let rate = data.conversion_rates[toCurr.value]; 
        let finalResult = amountVal * rate;
    
        message1.innerText = `${amountVal} ${fromCurr.value} is equal to`;
        message2.innerText = `${finalResult.toFixed(2)} ${toCurr.value}`;
    
        cBtn.classList.add("hidden")
        
        ifConvert = true;
    }

 
}