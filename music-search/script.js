const form = document.querySelector("#form");
const searchInput = document.querySelector("#search");
const result = document.querySelector("#result");
const more = document.querySelector("#more");

const apiURL = "https://deezerdevs-deezer.p.rapidapi.com";

// Search by song or artist
async function getSongs(term) {
    const res = await fetch(`${apiURL}/search?q=${term}`, {
        method: "GET",
        headers: {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "94438023f0msh0b85bca741b4229p195ef8jsn1670d5c37c65",
        },
    });

    if (!res.ok) {
        throw new Error(`Error while fetching data1: ${res.status}`);
    }

    const data = await res.json();

    showData(data);
    console.log(data);
}

function showData(info) {
    result.innerHTML = `
      <ul class="songs">
        ${info.data
            .map(
                (song) => `
              <li>
                <span class="song">
                    <strong>${song.artist.name}</strong> -
                    ${song.title}
                </span>
                <button class="lyrics-btn" data-artist="${song.artist.name}" data-songtitle=${song.title}>Get Lyrics</button>
            </li>`
            )
            .join("")}
      </ul>
      `;

    if (info.prev || info.next) {
        more.innerHTML = `
            ${info.prev ? `<button class="prev-btn" onclick="getMoreSongs('${info.prev}')">Prev</button>` : ``}
            ${info.next ? `<button class="next-btn" onclick="getMoreSongs('${info.next}')">Next</button>` : ``}
         `;
    } else {
        more.innerHTML = "";
    }
}

//Get lyrics for song
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/${artist}`);

    if (!res.ok) {
        throw new Error(`Error while fetching data2: ${res.status}`);
    }

    const data = await res.json();

    // const lyrics = data.lyrics.replace(/(?:\r|\n|\r\n)/g, "<br>");

    // result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    // <p>${lyrics}</p>`;

    console.log(data);
}

//Get more songs onclick of next button
async function getMoreSongs(url) {
    const res = await fetch(url);
    const data = await res.json();

    showData(data);
}

// Song search from search bar
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
        alert("Search for something biko!");
    } else {
        getSongs(searchTerm).catch((e) => console.log("Problem with your fetch operation: " + e.message));
    }
});

//Get Lyrics when button clicked
result.addEventListener("click", (e) => {
    const clickedEl = e.target;

    if ((clickedEl.tagName = "BUTTON")) {
        const artist = clickedEl.getAttribute("data-artist");
        const songTitle = clickedEl.getAttribute("data-songtitle");

        getLyrics(artist, songTitle);
    }
});
