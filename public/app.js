function addFavorites(code, name) {
  fetch("/sites/favorites", {
    method: "POST",
    body: JSON.stringify({
      code: code,
      name: name
    }),
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  })
    .then(data => data.json())
    .then(user => {
      let fav = document.querySelector("#new");
      let favList = "";
      user.favorites.forEach(function(favorite) {
        favList += `<li>${favorite.name}</li>`;
      });
      fav.innerHTML = favList;
    })
    .catch(err => console.log(err));
}