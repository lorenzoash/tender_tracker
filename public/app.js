function addFavorites(code, name) {
  fetch("/sites/favorites", {
    method: "POST",
    body: JSON.stringify({
      code: code,
      name: name
    }),
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  }).catch(err => console.log(err));
}
