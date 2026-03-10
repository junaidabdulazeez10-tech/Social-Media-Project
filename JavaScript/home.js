const content = document.querySelector('.here-js');

axios.get('https://tarmeezacademy.com/api/v1/posts?limit=3')
  .then((response) => {
    let html = '';
    const posts = response.data.data;
    posts.forEach((post) => {
      html += `
      <div class="card container rounded col-4 d-flex p-2 mt-3 mb-2">
        <div class="d-flex align-items-center">
          <svg
              xmlns="http://www.w3.org/2000/svg" width="30" height="30"      fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
          </svg>
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
          <span>(${post.comments_count}) </span><span>Comments</span>
        </div>
      </div> `
    })
     content.innerHTML = html;
  }).catch((error) => {
    console.log(error);
  })

