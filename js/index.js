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



const handleLoadContent = async (id = '1000') => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
  const data = await response.json();
  console.log(data);


  const allContent = data.data;
  sortByView(allContent)
  // console.log(allContent);
  if (allContent.length > 0) {


    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = ' ';
    const noDataContainer = document.getElementById("no-data");
    noDataContainer.textContent = ' ';
    allContent.forEach(content => {
      // console.log(content);
      const divContent = document.createElement('div');
      divContent.innerHTML = `
        <div class="">
           <figure><img class = "h-[220px] w-[350px] rounded-md" src="${content.thumbnail}" alt="content" /></figure>
            <div class="flex mt-6 gap-4">
            <div>
              <img class="w-[40px] h-[40px] rounded-[50%]" src="${content.authors[0].profile_picture}" alt="">
            </div>
            <div class= "space-y-[6px]">
                 <h5 class ="font-bold">${content.title}</h5>
              <div class= "flex gap-2">
                 <p>${content.authors[0].profile_name}</p>
                 <img src="${content.authors[0].verified ? "./image/fi_10629607.svg" : ''}" alt="">                  
              </div>
                 
                 <p>${content.others.views} views</p>
            </div>
          </div>
        </div>
        `
      cardContainer.appendChild(divContent);



    })

  } else {
    const noDataContainer = document.getElementById("no-data");
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = ' ';
    noDataContainer.textContent = ' ';
    const div = document.createElement('div');
    div.innerHTML = `
    <img class="ml-24 mb-4" src="./image/Icon.png" alt="">
    <h2 class="text-3xl font-bold">Oops!! Sorry, There is no <br>
     content here</h2>

    `
    noDataContainer.appendChild(div);


  }


}

function sortByView(allContent) {
  
  let viewsArr = [];
  
    allContent.forEach(content => {
    const viewsCount = parseFloat(content.others.views);
    viewsArr.push(viewsCount);
    const sortedViews = viewsArr.sort((a, b) => b - a);
    


  });
  console.log(viewsArr);
  // console.log(sortedViews);
  // console.log('sortByView', allContent);

}




loadContent()
handleLoadContent()
