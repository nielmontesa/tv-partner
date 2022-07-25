const searchForm = document.querySelector("#searchForm");
const cardContainer = document.querySelector(".card-container");
const watchlistContainer = document.querySelector("#list-movies-container");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userSearch = searchForm[0].value;
  const result = await axios.get(
    `https://api.tvmaze.com/search/shows?q=${userSearch}`
  );
  cardContainer.scrollTop = 0;
  cardContainer.innerText = "";
  for (let res of result.data) {
    const card = document.createElement("div");
    card.classList.add("card");
    if (res.show.image.medium != null) {
      const image = document.createElement("img");
      image.src = res.show.image.medium;
      image.classList.add("show-cover");
      card.append(image);
    }
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("desc-div");
    card.append(descriptionDiv);
    const title = document.createElement("h3");
    title.innerText = res.show.name;
    descriptionDiv.append(title);
    const year = document.createElement("p");
    year.classList.add("year-started");
    year.innerText = res.show.premiered;
    descriptionDiv.append(year);
    for (let genre of res.show.genres) {
      const category = document.createElement("span");
      category.classList.add("category");
      category.innerText = genre;
      descriptionDiv.append(category);
    }
    const description = document.createElement("p");
    description.classList.add("desc");
    description.innerHTML = res.show.summary;
    descriptionDiv.append(description);
    const imdbLink = document.createElement("a");
    imdbLink.setAttribute(
      "href",
      `https://www.imdb.com/title/${res.show.externals.imdb}/`
    );
    imdbLink.target = "_blank";
    const imdbButton = document.createElement("button");
    imdbButton.innerText = "go to imdb";
    imdbLink.append(imdbButton);
    descriptionDiv.append(imdbLink);
    imdbButton.classList.add("imdb");
    const watchlistButton = document.createElement("button");
    watchlistButton.innerText = "add to watchlist";
    watchlistButton.classList.add("add-watchlist");
    descriptionDiv.append(watchlistButton);
    cardContainer.append(card);
  }
  const addWatchlist = document.querySelectorAll(".add-watchlist");

  for (let list of addWatchlist) {
    list.addEventListener("click", () => {
      const copiedCard = list.parentElement.parentElement.cloneNode(true);
      console.log(copiedCard);
      watchlistContainer.append(copiedCard);
    });
  }
});
