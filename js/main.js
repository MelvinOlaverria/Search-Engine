const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const url = 'https://itunes.apple.com/search?term=';
const resultsSearch = document.querySelector ('.search-results');
const errH = document.querySelector ('.errorH');

searchForm.onsubmit = function (e) {
    e.preventDefault();
    let value = searchInput.value;
    let newUrl = url + value
    resultsSearch.innerHTML = '';

function errorHandling() {
    errH.innerHTML = `
        <h3 class="error">Error loading data, make sure your network is on.</h>
    `;
    errH.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

    fetch(newUrl) 
    .then((res) => res.json())
    .then((data) => {
        let music = data.results;
        let output = "";
        function searchResults(music) {
            output += ` 
            <div class="artist-container container col-md-6">
                <div class="artist-block">
                    <div class="artist">
                        <img src="${music.artworkUrl100}" alt="artist album/song image">
                        <div class="artist-info">
                            <h5>${music.artistName}</h5>
                            <h5>${music.trackName}</h5>
                        </div>
                    </div>

                    <div class="play">
                        <audio controls class="audio">
                            <source src="${music.previewUrl}" type="audio/mpeg">
                        </audio>
                    </div>
                </div>
            </div>
        `;
        }
        music.forEach(searchResults);
        resultsSearch.innerHTML = output;

        let results = document.querySelector('.results');
        results.removeAttribute("hidden");
        results.innerHTML = "Search results for" + " " + value;

        results.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    })
    .catch(errorHandling);
};

window.addEventListener('scroll', function () {
    let navbar = document.querySelector('nav');
    let windowPosition = window.scrollY > 0;
    navbar.classList.toggle('scrolling-active', windowPosition);
});


function lettersOnly (input) {
    var regex = /[^a-z,0-9,-, ]/gi;
    input.value = input.value.replace(regex, "");
};

