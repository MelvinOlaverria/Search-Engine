const url = "https://itunes.apple.com/search?term="
const inputSearch = document.querySelector(".search-input")
const btnSearch = document.querySelector(".search-btn")
const formSearch = document.querySelector(".search-form")
const resultsSearch = document.querySelector(".search-results")

formSearch.onsubmit = function(e) {
    e.preventDefault();
    let value = inputSearch.value;
    let newUrl = url + value;

    fetch(newUrl) 
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let music = data.results;
        let output = "";
        function searchResults(music) {
            output += ` 
            <div class="col-md-6">
                <div class="artist">
                    <img src="${music.artworkUrl100}" alt="artist album/song image">
                    <div class="artist-info">
                        <h5>${music.artistName}</h5>
                        <h5>${music.trackName}</h5>
                    </div>
                </div>
            </div>

        `;
        }
        music.forEach(searchResults);
        resultsSearch.innerHTML = output;
    })
    .catch((error) => {
        console.log(error);
    });
};