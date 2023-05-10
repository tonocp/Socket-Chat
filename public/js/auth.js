const form = document.querySelector('form');

var url = window.location.hostname.includes('localhost')
  ? 'http://localhost:8080/api/auth/'
  : 'https://restserver-curso-fher.herokuapp.com/api/auth/';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = {};
  for (const el of form.elements) {
    if (el.namespaceURI.length > 0) {
      formData[el.name] = el.value;
    }
  }
  fetch(url + 'login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
    .then((resp) => resp.json())
    .then(({ msg, token }) => {
      if (msg) return console.error(msg);
      localStorage.setItem('token', token);
    })
    .catch((err) => {
      console.error(err);
    });
});

function onSignIn(response) {
  var id_token = response.credential;
  const data = { id_token };

  fetch(url + 'google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then(({ token }) => {
      localStorage.setItem('token', token);
    })
    .catch((err) => {
      console.error(err);
    });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
