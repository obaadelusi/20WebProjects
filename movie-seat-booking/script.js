const seatsContainer = document.querySelector(".seats-container");
const availableSeats = document.querySelectorAll(".row .seat:not(.occupied");
const seatsCount = document.getElementById("seat-count");
const totalPrice = document.getElementById("total-price");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

updateUI();
updateCountandPrice();

// When an available seat is clicked
seatsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        updateCountandPrice();
    }
});

// When another movie is selected
movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;
    updateCountandPrice();
    setMovieData(e.target.selectedIndex, e.target.value);
});

// Update total and count
function updateCountandPrice() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const selectedSeatsCount = selectedSeats.length;

    /* Copy selected seats into an array 
   Map through the array
   Return a new array of indexes*/
    const seatsIndex = [...selectedSeats].map((seat) => [...availableSeats].indexOf(seat));
    console.log(seatsIndex);

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    // Update DOM
    seatsCount.innerText = selectedSeatsCount;
    totalPrice.innerText = selectedSeatsCount * ticketPrice;
}

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Get data from local storage and update the DOM
function updateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        availableSeats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}
