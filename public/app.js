function addFavorites(code, name) {
  fetch('/sites/favorites', {
    method: 'POST',
    body: JSON.stringify({
      code: code,
      name: name
    }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
    .then(data => data.json())
    .then(user => {
      let fav = document.querySelector('#new');
      let favList = '';
      window.userFavorites = user.favorites.map(favorite => favorite.code);
      window.userFavorites
        .map(favorite => `.${favorite}`)
        .forEach(function(fav) {
          console.log(fav);
          console.dir(document.querySelector(`${fav}`));
        });
      user.favorites.forEach(function(favorite) {
        favList += `<li>${favorite.name}</li>`;
      });
      fav.innerHTML = favList;
    })
    .catch(err => console.log(err));
}


$(function () {
  $('[data-toggle="popover"]').popover()
})

$('.popover-dismiss').popover({
  trigger: 'focus'
})

