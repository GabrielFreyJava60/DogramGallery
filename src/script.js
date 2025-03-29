

const detailedImage = document.querySelector(".detailedContainer--image");
const detailedTitle = document.querySelector(".detailedContainer--title");


const API_KEY = "1eb9c2c4f46b71a5b4e658c14148c7cd";


async function drawMovies() {
  const galleryContainer = document.getElementById("cats_gallery"); 
  if (!galleryContainer) {
    console.error("Gallery container not found!");
    return;
  }

  try {
    
    const response = await fetch(
     `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&primary_release_year=1987&with_genres=80,9648`
    );

    if (!response.ok) throw new Error("Failed to fetch movie data");

    const data = await response.json();
    galleryContainer.innerHTML = getMovieItems(data.results);

    
    addGalleryMovieEventListeners();
  } catch (error) {
    console.error("Error fetching movie data:", error);
    galleryContainer.innerHTML =
      "<p>Error loading movies. Try again later.</p>";
  }
}


function getMovieItems(movies) {
  return movies
    .map((movie) => {
      const image = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "placeholder.jpg"; 
      const detailedImage = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : image; 

      return `
        <li class="gallery--item">
          <img
            src="${image}"
            alt="${movie.title}"
            class="gallery--item_image"
            data-detailed-image="${detailedImage}"
            data-detailed-title="${movie.overview || "No description available."}"
          />
          <span class="gallery--item_title">${movie.title}</span>
        </li>
      `;
    })
    .join("");
}


function addGalleryMovieEventListeners() {
  document.querySelectorAll(".gallery--item_image").forEach((image) => {
    image.addEventListener("click", function () {
      setDetails(image); 
    });
  });
}

function setDetails(image) {
  
  detailedImage.classList.remove("animation-up");
  detailedTitle.classList.remove("animation-down");

  setTimeout(() => {
    
    detailedImage.src = image.getAttribute("data-detailed-image");
    detailedTitle.innerHTML = image.getAttribute("data-detailed-title");

    
    detailedImage.classList.add("animation-up");
    detailedTitle.classList.add("animation-down");
  }, 50);
}

window.onload = drawMovies;