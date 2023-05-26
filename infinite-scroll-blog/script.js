const postsContainer = document.querySelector("#posts-container");
const loading = document.querySelector(".loader");
const filter = document.querySelector(".filter");

let limit = 8;
let page = 1;

//Fetch posts from API
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    return data;
}

//Show posts in DOM
async function showPosts() {
    const posts = await getPosts();

    posts.forEach((post) => {
        const postEl = document.createElement("div");
        postEl.classList.add("post");
        postEl.innerHTML = `<div class="post-number">${post.id}</div>
       <article class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">
          ${post.body}
          </p>
       </article>
    </div>`;

        postsContainer.appendChild(postEl);
    });
}

// Show initial Posts
showPosts();

// Show loading animation
function showLoading() {
    loading.classList.add("show");

    setTimeout(() => {
        loading.classList.remove("show");

        setTimeout(() => {
            page++;
            showPosts();
        }, 300);
    }, 1000);
}

//Load next 'limit' posts
window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 3) {
        // console.log("You are at the bottom");
        showLoading();
    }
});

// Filter posts by input
function filterPosts(e) {
    const term = e.target.value.toLowerCase();
    const posts = document.querySelectorAll(".post");

    posts.forEach((post) => {
        const title = post.querySelector(".post-title").innerText.toLowerCase();
        const body = post.querySelector(".post-body").innerText.toLowerCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });
}

filter.addEventListener("input", filterPosts);
