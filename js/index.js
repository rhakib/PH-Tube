// fetch category
let globalData;
const loadContent = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const data = await response.json();
 

  const btnContainer = document.getElementById('btn-container');
  const btnAll = data.data;
  
  btnAll.forEach(btn => {
    const divBtn = document.createElement('div');
    divBtn.innerHTML = `
        <button onclick="handleLoadContent(${btn.category_id})" class="bg-gray-300 py-1 rounded-md px-6">${btn.category}</button>
        `
    btnContainer.appendChild(divBtn)

  });
}



const handleLoadContent = async (id = "1000") => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
  const data = await response.json();
  

  globalData = data.data; 
  sortByView(data);


}


function sortByView(data) {

  if (data.data.length === 0) {
    
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
  else {
 
  const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = ' ';
    const noDataContainer = document.getElementById("no-data");
    noDataContainer.textContent = ' ';
    data.data.forEach(content => {
      
      const postedTime = content.others.posted_date;
      const postedTimeInt = parseInt(postedTime)
      const hour = Math.floor(postedTimeInt / 3600);
      const remainingTime = postedTimeInt % 3600;
      const min = Math.floor(remainingTime / 60);
     
      const divContent = document.createElement('div');
      divContent.innerHTML = `
        <div class="">
           <div class = "relative">
                <figure><img class = "relative h-[220px] w-[320px] rounded-md" src="${content.thumbnail}" alt="content" /></figure>
                <p class="absolute top-44 px-2 rounded-sm left-36 opacity-80 text-white bg-black">
                ${postedTime ? `${hour} Hrs ${min} Min ago` : ""}</p>
           </div>
                
                 
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
  
}
}

document.getElementById('sortBtn').addEventListener('click', () =>{
   sortData()
})
const sortData = () => {
  
  globalData.sort(
    (a, b) =>
      parseFloat(b.others.views.split("K")[0]) -
      parseFloat(a.others.views.split("K")[0])
  );
  sortByView({ data:globalData });
  
};



loadContent()
handleLoadContent()
