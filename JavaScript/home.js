function renderAllPosts(){
  axios.get('https://tarmeezacademy.com/api/v1/posts?limit=3')
  .then((response) => {
    const notMyPosts = document.querySelector('.here-js');
    let html = '';
    const posts = response.data.data;
    posts.forEach((post) => {
      html += `
      <div class="card container rounded col-4 d-flex p-2 mt-3 mb-2">
        <div class="d-flex align-items-center profile-picture-for-posts">
          <img class="postProfilePic" src=${post.author.profile_image}>
          <div class="user-name">${post.author.username}</div>
        </div>
        <hr class="mt-0">
        
        <img class=" rounded w-100" src="${post.image}">
        <div>
          <p class="time mb-1">${post.created_at}</p>
          <h6>${post.title}</h6>
          <p class="description">${post.body}</p>
          <hr>
          <svg 
            xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
          </svg>
          <span>(${post.comments_count}) </span>
          <span>Comments</span>
          <div class="tags-js tags-css"></div>
        </div>
      </div> `
    })
     notMyPosts.innerHTML = html;
  }).catch((error) => {
    console.log(error);
  })
}
renderAllPosts();





function register() {
  const nameRegister = document.querySelector('.register-name-js');
  const userNameRegister = document.querySelector('.register-username-js');
  const emailRegister = document.querySelector('.register-email-js');
  const passwordRegister = document.querySelector('.register-password-js');
  const passwordImage = document.querySelector('.image-password-js').files[0];
  
  let formDatas = new FormData();
  formDatas.append("username", userNameRegister.value );
  formDatas.append("password", passwordRegister.value );
  formDatas.append("name", nameRegister.value );
  formDatas.append("email", emailRegister.value );
  formDatas.append("image", passwordImage );


    axios.post(
      "https://tarmeezacademy.com/api/v1/register", 
      formDatas,
      {
        headers: {
          "Accept": "application/json",
        }
      }
    ).then((response) => {      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user.username));
      localStorage.setItem('image', response.data.user.profile_image);
      console.log(response.data)
      loggedIn();

      const loginModal2 = document.getElementById("registerModal");
      const modal2 = bootstrap.Modal.getInstance(loginModal2);
      modal2.hide();

      const welcomeName = response.data.user.username;

      const loginModal = document.getElementById("registerModal");
      const modal = bootstrap.Modal.getInstance(loginModal);
      if (modal) modal.hide();

      alert(`Registration is Successful! Welcome ${welcomeName}`);
    }).catch((error) => {
      alert(error.response.data.message);
    })
 }

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
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user.username));
      localStorage.setItem('image', response.data.user.profile_image);
      loggedIn();
  }).catch((error) => {
    alert(error.response.data.message);
  })
})

const userNameMainBar = document.querySelector('.name-user-js');
const userPicMainBar = document.querySelector('.profile-picture-js');

function loggedIn() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const loginImage = localStorage.getItem('image')
  let userProfileImage = userPicMainBar.querySelector('img');

  if (!loginImage) {
    loginImage = "../Pics/alt.png"; 
  }

  if (!userProfileImage) {
    userProfileImage = document.createElement('img');
    userPicMainBar.appendChild(userProfileImage);
  }

  
  if(token && user){
      hideLoginRegisterBtn();
      userNameMainBar.innerHTML = user;
      userProfileImage.src = loginImage;
      const loginModal = document.getElementById("exampleModal");
      const modal = bootstrap.Modal.getInstance(loginModal);
      if (modal) modal.hide();
      const createPost = document.querySelector('.create-post-js');
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
  localStorage.removeItem('image');

  const createPost = document.querySelector('.create-post-js');
  createPost.innerHTML = '';
  showLoginRegisterBtn();
}

function createNewPost(){
  const postTitle = document.querySelector('.title-post-js');
  const postDescription = document.querySelector('.description-post-js');
  const postImage = document.querySelector('.image-post-js').files[0];
  const token = localStorage.getItem('token');
  

  let formData = new FormData()
  formData.append("image", postImage);
  formData.append("body", postDescription.value);
  formData.append("title", postTitle.value);
  
  
  axios.post("https://tarmeezacademy.com/api/v1/posts", formData, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then((response) => {
    renderAllPosts()

  }).catch((error) => {
  console.log(error);
  console.log(error.response);

  alert(error.response?.data?.message || error.message || "Something went wrong");
});


  const loginModal2 = document.getElementById("exampleModal2");
  const modal2 = bootstrap.Modal.getInstance(loginModal2);
  modal2.hide();
}

function hideLoginRegisterBtn(){
  document.body.classList.add('createdClass');
}

function showLoginRegisterBtn(){
  document.body.classList.remove('createdClass');
}

loggedIn();