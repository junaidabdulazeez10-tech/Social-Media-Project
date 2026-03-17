function renderAllPosts(){
  axios.get('https://tarmeezacademy.com/api/v1/posts?')
  .then((response) => {
    const notMyPosts = document.querySelector('.here-js');
    let html = '';
    const posts = response.data.data;
    posts.forEach((post) => {
      html += `
      <div class="card container post-height rounded col-6 d-flex p-2 mt-3 mb-2" style="cursor: pointer;" 
      onclick="commentRender(${post.id})">
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
          <div class="tags-js"></div>
        </div>
      </div> `
    })
     notMyPosts.innerHTML = html;
  }).catch((error) => {
    console.log(error);
  })
}
renderAllPosts();