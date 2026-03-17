const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("postId");

function renderComment(){
  axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
  .then((response) => {
    const info = response.data.data.author;
    const commentArray = response.data.data.comments;
    const name = document.querySelector('.comment-title-name ');
    name.innerHTML = `<h1>${info.name}'s post</h1>`
    let comment = '';
    commentArray.forEach((value) => {
      comment += `
      <div class="d-flex">
          <div>
              <img class="profile-picture-comment" src="${value.author.profile_image}">
          </div>
          <div>
              <h6>@${value.author.username}</h6>
          </div>
      </div>
      <div class="ms-2">
          ${value.body}
      </div>
      <hr>
      `;
      })
    const notMyPosts = document.querySelector('.comment-js');
    let post = `
        <div class="card container post-height rounded col-6 d-flex p-2 mt-3 mb-2" style="cursor: pointer;">
          <div class="d-flex align-items-center profile-picture-for-posts">
            <img class="postProfilePic" src=${info.profile_image}>
            <div class="user-name">${info.username}</div>
          </div>
          <hr class="mt-0">
          
          <img class=" rounded w-100" src="${response.data.data.image}">
          <div>
            <p class="time mb-1">${response.data.data.created_at}</p>
            <h6>${response.data.data.title}</h6>
            <p class="description">${response.data.data.body}</p>
            <hr>
            <svg 
              xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
            </svg>
            <span>(${response.data.data.comments_count}) </span>
            <span>Comments</span>
            <div class="comment-display">
              ${comment}
            </div>
            <div class="logged-in-send-comment"></div>
            
          </div>
        </div> `;
        notMyPosts.innerHTML = post;
        canSendComment();
      
    }).catch((error) => {
      console.log(error);
    });
}


function canSendComment() {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  const createACommentLoggedIn = document.querySelector('.logged-in-send-comment');

  if(token && user){
      createACommentLoggedIn.innerHTML = `
        <div class="add-comment">
         <input class="input-comment-js" type="text" placeholder="write a comment"><button class="send-comment-js" onclick="sendComment()">send</button>
        </div>
      `;
    } else {
      createACommentLoggedIn.innerHTML = '';
    }
}

function sendComment() {
  
  const urComment = document.querySelector('.input-comment-js');

  let params = {
    "body": urComment.value
  }
  const token = localStorage.getItem('token')
  if(token){
    axios.post(`https://tarmeezacademy.com/api/v1/posts/${id}/comments`, params, 
    {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
        }
      }
    ).then((response) => {
      renderComment();
    }).catch((error) => {
      alert(error.data)
    });
    } else{
      alert('you need to log-in to send a comment')
    }
  
}

 renderComment();



 
const returnHome = document.querySelector('.userNameLoggedIn-js');
returnHome.addEventListener('click', () => {
  window.location.href = 'home.html';
})