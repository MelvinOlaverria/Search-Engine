//Navbar Change on Scroll 

window.addEventListener('scroll', function () {
    let navbar = document.querySelector ('nav');
    let windowPosition = window.scrollY > 0;
    navbar.classList.toggle('scrolling-active', windowPosition);
});


// Selecting Dom Elements 

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const url = 'https://itunes.apple.com/search?term=';
const resultsSearch = document.querySelector ('.search-results');


searchForm.onsubmit = function (e) {
    e.preventDefault();
    let value = searchInput.value;
    let newUrl = url + value

    fetch(newUrl) 
    .then((res) => res.json())
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
                        <div class="play">
                        <audio controls class="audio">
                            <source src="${music.previewUrl}" type="audio/mpeg">
                        </audio>
                        </div>
                    </div>
                </div>
            </div>
        `;
        }
        music.forEach(searchResults);
        resultsSearch.innerHTML = output;

        //Append search results text
        let results = document.querySelector('.results');
        results.removeAttribute("hidden");
        results.innerHTML = "Search results for" + " " + value;

        //Smooth Scroll to audio results
        let scrollStop = document.querySelector('.results');
        scrollStop.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    })
    .catch((err)=> {
        console.log(err);
    });
};




