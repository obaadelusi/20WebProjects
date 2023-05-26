const currencyOne = document.querySelector("#currency-one");
const c1Amount = document.querySelector("#amount-one");
const currencyTwo = document.querySelector("#currency-two");
const c2Amount = document.querySelector("#amount-two");

const rate = document.querySelector("#rate");
const swap = document.querySelector("#swap");

/* 
    Fetch exchange rate
    Update the DOM

    Run event listeners
*/

function addCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculate() {
    const currencyOneText = currencyOne.value;
    const currencyTwoText = currencyTwo.value;

    fetch(`https://open.er-api.com/v6/latest/${currencyOneText}`)
        .then((res) => res.json())
        .then((data) => {
            //  console.log(data);
            const exRate = data.rates[currencyTwoText];
            console.log(exRate);

            rate.innerHTML = `<span class="bold">1</span>  ${currencyOneText} = <span class="bold">${exRate}</span> ${currencyTwoText}`;

            c2Amount.value = (c1Amount.value * exRate).toFixed(2);
        });
}

function swapCurrency() {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
}

currencyOne.addEventListener("change", calculate);
c1Amount.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);
c2Amount.addEventListener("input", calculate);

swap.addEventListener("click", swapCurrency);

calculate();
