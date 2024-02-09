const form = document.querySelector('form');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const imageContainer = document.querySelector('.hero .image-container');
const showMore = document.querySelector('.see-more .show-more-button');
const accessKey = '7mFO3juqxhOaqHfY6dhDdTIDKLos3HaCkGxEjB9Zv6s';

let inputResult = '';
let pageNumber = 1;

const searchThings = () => {
  inputResult = searchInput.value;
  const apiUrl = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${inputResult}&client_id=${accessKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const results = data.results;
      console.log(data);

      if (pageNumber === 1) {
        imageContainer.innerHTML = '';
      }

      results.forEach((result) => {
        const divContainer = document.createElement('div');
        divContainer.classList.add('display-images');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const anchorLink = document.createElement('a');
        anchorLink.href = result.links.html;
        anchorLink.target = '_blank';
        anchorLink.textContent = result.alt_description;

        imageContainer.appendChild(divContainer);
        divContainer.appendChild(image);
        divContainer.appendChild(anchorLink);
      });
    });
};

pageNumber++;
if (pageNumber > 1) showMore.style.display = 'block';
form.addEventListener('submit', (event) => {
  event.preventDefault();
  pageNumber = 1;
  searchThings();
});

showMore.addEventListener('click', (event) => {
  searchThings();
  pageNumber++;
});
