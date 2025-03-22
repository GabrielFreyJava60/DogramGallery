
const detailedImage = document.getElementById("detailedImage");
const detailedTitle = document.getElementById("detailedTitle");


async function drawImages() {
  const galleryContainer = document.getElementById("ul_elem");
  if (!galleryContainer) {
    console.error("Element #ul_elem not found");
    return;
  }

  try {
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    if (!response.ok) throw new Error("Failed to fetch cat breeds");

    const data = await response.json();
    galleryContainer.innerHTML = getItems(data);

    
    addGalleryImageEventListeners();
  } catch (error) {
    console.error("Error fetching cat images:", error);
    galleryContainer.innerHTML =
      "<p>Error loading cat breeds. Try again later.</p>";
  }
}

function getItems(data) {
  return data
    .map((breed) => {
      const image = breed.reference_image_id
        ? `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`
        : "placeholder.jpg"; 
      return `
        <li class="gallery--item">
          <img
            src="${image}"
            alt="${breed.name}"
            class="gallery--item_image"
            data-detailed-image="${image}"
            data-detailed-title="${breed.description}"
          />
          <span class="gallery--item_title">${breed.name}</span>
        </li>
      `;
    })
    .join("");
}

function addGalleryImageEventListeners() {
  const galleryImages = document.querySelectorAll(".gallery--item_image");
  galleryImages.forEach((image) => {
    image.addEventListener("click", function () {
      setDetails(image);
    });
  });
}

function setDetails(image) {
  
  detailedImage.classList.remove("animation-up");
  detailedTitle.classList.remove("animation-down");


  requestAnimationFrame(() => {
   
    detailedImage.src = image.getAttribute("data-detailed-image");
    detailedTitle.innerHTML = image.getAttribute("data-detailed-title");

    void detailedImage.offsetWidth;

    
    detailedImage.classList.add("animation-up");
    detailedTitle.classList.add("animation-down");
  });
}

window.onload = drawImages;
