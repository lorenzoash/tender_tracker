/*
  CONSTANTS
*/

const rootURL = 'https://secure.geonames.org/countryCodeJSON?';

/*
  addFavorites Function
  @param code - String: country code 
  @param name - String: 
*/

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
      if (userFavorites.includes(cc)) {
        $(`.${cc}`).addClass('text-danger');
      } else {
        $(`.${cc}`).removeClass('text-danger');
      }
      user.favorites.forEach(function(favorite) {
        favList += `<li>${favorite.name}</li>`;
      });
      fav.innerHTML = favList;
    })
    .catch(err => console.log(err));
}

function getCC(lat, lng) {
  return fetch(
    `${rootURL}lat=${lat}&lng=${lng}&username=<%= process.env.GEO_USENAME %>`
  )
    .then(country => country.json())
    .then(country => country.countryCode)
    .then(function(countryCode) {
      return fetch('/sites/topTen', {
        method: 'post',
        body: JSON.stringify({
          countryCode: countryCode
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        credentials: 'include'
      })
        .then(countryData => countryData.json())
        .then(function(countryData) {
          let countryTopSites = '';

          let [code, name, sites] = [
            countryData[0].countryCode,
            countryData[0].countryName,
            countryData[0].sites
          ];

          sites.forEach(function(site) {
            countryTopSites += `
              <tr>
              <th scope="row">${site.localRank}</th>
                <td>
                  <a href="http://www.${
                    site.dataUrl
                  }" class="text-white" target="_blank">
                    ${site.dataUrl}
                  </a>
                </td>
                <td>${site.globalRank}</td>
                <td>${site.pageViewsPerMillion}</td>
              </tr>
            `;
          });

          let contentString = `
              <div id="content">
                <div id="siteNotice">
                  <h3 id="firstHeading" class="d-inline firstHeading">
                    ${name}
                  </h3>
                  <button
                    onclick="addFavorites(${code}, ${name})"
                    class="${code} fa fa-heart fa-lg float-right tt-heart"
                    style="text-decoration: none"
                  />
                  <div id="bodyContent">
                    <table class="table table-dark table-hover mb-0 text-center">
                      <thead class="thead-light">
                        <tr>
                          <th scope="col"> Local Rank </th>
                          <th scope="col"> URL </th>
                          <th scope="col"> Global Rank </th>
                          <th scope="col"> Page Views </th>
                        </tr>
                      </thead>
                      <tbody>${countryTopSites}</tbody>
                    </table>
                  </div>
                </div>
              </div>`;

          return contentString;
        })
        .catch(err => console.log(err));
    });
}

// $(function() {
//   $('[data-toggle="popover"]').popover();
// });

// $('.popover-dismiss').popover({
//   trigger: 'focus'
// });
