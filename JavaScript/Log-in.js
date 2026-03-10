const submitLogin = document.querySelector('.login-submit-js');
const username = document.querySelector('.user-name-js');
const password = document.querySelector('.password-js');



submitLogin.addEventListener('click', (event) => {
   event.preventDefault();

    let params = 
    {
      "username": username.value.trim(),
      "password": password.value.trim()
    };

  axios.post(
      "https://tarmeezacademy.com/api/v1/login", 
      params,
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }
    )
  .then((response) => {
      userNameLoggedIn = response.data.user.username;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      userLoggedInSuccessfully();
      loggedIn();
  }).catch((error) => {
    alert(error.response.data.message);
  })
})
loggedIn()

function loggedIn() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  if(token && user){
      document.querySelector('.userNameLoggedIn-js').innerHTML = user.username;
      const loginModal = document.getElementById("exampleModal");
      const modal = bootstrap.Modal.getInstance(loginModal);
      if (modal) modal.hide();
      const content = document.querySelector('.logged-in-js');
      const createPost = document.querySelector('.create-post-js');
      content.innerHTML = `<button class="btn log-out-btn fs-6 p-1" onclick="loggedOut()">Log-out</button>`
      createPost.innerHTML = `
            <button class="create-post-btn" 
            data-bs-toggle="modal" data-bs-target="#exampleModal2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
              </svg>
            </button>`
    } 
}
function loggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  document.querySelector('.userNameLoggedIn-js').innerHTML = 'Tarmeez';

  const content = document.querySelector('.logged-in-js');
  const createPost = document.querySelector('.create-post-js');

  content.innerHTML = `
      <button data-bs-toggle="modal" data-bs-target="#exampleModal" 
      class="btn fs-6 p-1">Log-in</button>
      <button class="btn fs-6 p-1">Register</button> `; 
  createPost.innerHTML = '';
  
}

function userLoggedInSuccessfully() {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')

      alertPlaceholder.append(wrapper)
    }

    const alertTrigger = document.querySelector('.login-submit-js');
    if (alertTrigger) {
      alertTrigger.addEventListener('click', () => {
        appendAlert('Nice, you triggered this alert message!', 'success');
      })
    }
}


function createNewPost(){
  const postTitle = document.querySelector('.title-post-js');
  const postDescription = document.querySelector('.description-post-js');
  
  const renderNewPost = document.querySelector('.new-post-js');
  const post = document.createElement("div");
  
  post.innerHTML =
  `
  <div class="card container rounded col-4 d-flex p-2 mt-3 mb-2">
        <div class="d-flex align-items-center">
          <svg
              xmlns="http://www.w3.org/2000/svg" width="30" height="30"      fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
          </svg>
          <div class="user-name">gimme a sec</div>
        </div>
        <hr class="mt-0">
        
        <img class=" rounded w-100" src="../Pics/pexels-souvenirpixels-417074.jpg">
        <div>
          <p class="time mb-1">1 min ago</p>
          <h6>${postTitle.value}</h6>
          <p class="description">${postDescription.value}</p>
          <hr>
          <svg 
            xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
          </svg>
          <span>(0) </span><span>Comments</span>
        </div>
    </div>
  `;
  renderNewPost.prepend(post);

  const loginModal2 = document.getElementById("exampleModal2");
  const modal2 = bootstrap.Modal.getInstance(loginModal2);
  modal2.hide();
}
