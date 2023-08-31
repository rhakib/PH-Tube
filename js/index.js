// fetch category
const loadContent = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    // console.log(data);

    const btnContainer = document.getElementById('btn-container');
    const btnAll = data.data;
    // console.log(btnAll); 
    btnAll.forEach(btn => {
        const divBtn = document.createElement('div');
        divBtn.innerHTML = `
        <button onclick="handleLoadContent(${btn.category_id})" class="bg-gray-300 py-1 rounded-md px-6">${btn.category}</button>
        `
        btnContainer.appendChild(divBtn)

    });
}

const handleLoadContent = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await response.json();
    const allContent = data.data;
    // console.log(allContent);
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = ' ';
    allContent.forEach(content => {
        console.log(content);
        const divContent = document.createElement('div');
        divContent.innerHTML = `
        <div class="">
           <figure><img class = "h-[100%]" src="${content.thumbnail}" alt="content" /></figure>
            <div class="flex">
            <div>
              <img class="w-[50px] h-[50px] rounded-[50%]" src="${content.authors[0].profile_picture}" alt="">
            </div>
            <div>
                 <h5>${content.title}</h5>
                 <p>${content.authors[0].profile_name}</p>
                 <p>${content.others.views}</p>
            </div>
          </div>
        </div>
        `
        cardContainer.appendChild(divContent);

    })
}




loadContent()
handleLoadContent()
