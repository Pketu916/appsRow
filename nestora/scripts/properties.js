const properties = [
  {
    year: "2024",
    name: "Haig",
    address: "Van buren st quincy, illinois(il), 62301",
    size: "925 Sq.ft",
    bath: "3 Bath",
    bed: "2 Bed",
    price: "$24,458 USD",
    image: "./assets/image/properties/propertie1.svg",
  },
  {
    year: "2023",
    name: "Broadway",
    address: "2nd Ave, New York, NY, 10003",
    size: "1100 Sq.ft",
    bath: "2 Bath",
    bed: "3 Bed",
    price: "$30,000 USD",
    image: "./assets/image/properties/propertie2.png",
  },
  {
    year: "2022",
    name: "Palm Grove",
    address: "Palm St, Los Angeles, CA, 90001",
    size: "800 Sq.ft",
    bath: "1 Bath",
    bed: "2 Bed",
    price: "$22,000 USD",
    image: "./assets/image/properties/propertie3.png",
  },
  {
    year: "2021",
    name: "Cedar Heights",
    address: "Maple St, Austin, TX, 73301",
    size: "950 Sq.ft",
    bath: "2 Bath",
    bed: "3 Bed",
    price: "$28,750 USD",
    image: "./assets/image/properties/propertie4.png",
  },
  {
    year: "2020",
    name: "Ocean Breeze",
    address: "Beach Blvd, Miami, FL, 33101",
    size: "1020 Sq.ft",
    bath: "2 Bath",
    bed: "2 Bed",
    price: "$35,500 USD",
    image: "./assets/image/properties/propertie5.png",
  },
  {
    year: "2019",
    name: "Sunset Villa",
    address: "Sunset Dr, Phoenix, AZ, 85001",
    size: "870 Sq.ft",
    bath: "2 Bath",
    bed: "2 Bed",
    price: "$25,600 USD",
    image: "./assets/image/properties/propertie6.jpg",
  },
  {
    year: "2018",
    name: "Green Hills",
    address: "Hilltop Rd, Denver, CO, 80201",
    size: "920 Sq.ft",
    bath: "1 Bath",
    bed: "2 Bed",
    price: "$23,700 USD",
    image: "./assets/image/properties/propertie7.jpg",
  },
  {
    year: "2017",
    name: "Willow Estate",
    address: "Willow Way, Seattle, WA, 98101",
    size: "1150 Sq.ft",
    bath: "3 Bath",
    bed: "3 Bed",
    price: "$40,000 USD",
    image: "./assets/image/properties/propertie8.jpg",
  },
  {
    year: "2016",
    name: "Lakeview",
    address: "Lakeside Dr, Chicago, IL, 60007",
    size: "1000 Sq.ft",
    bath: "2 Bath",
    bed: "2 Bed",
    price: "$32,900 USD",
    image: "./assets/image/properties/propertie9.jpg",
  },
  {
    year: "2015",
    name: "River Bend",
    address: "Riverside St, Dallas, TX, 75001",
    size: "850 Sq.ft",
    bath: "1 Bath",
    bed: "1 Bed",
    price: "$20,800 USD",
    image: "./assets/image/properties/propertie1.svg",
  },
  {
    year: "2014",
    name: "Skyline Tower",
    address: "Main St, San Francisco, CA, 94101",
    size: "1200 Sq.ft",
    bath: "3 Bath",
    bed: "3 Bed",
    price: "$45,200 USD",
    image: "./assets/image/properties/propertie1.svg",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const listContainer = document.getElementById("property-list");
  const displayContainer = document.getElementById("property-display");

  // Render property list (only latest 5)
  properties.slice(0, 5).forEach((property, index) => {
    const list = document.createElement("li");
    list.textContent = property.name;
    list.dataset.index = index;
    list.addEventListener("click", () => {
      renderProperty(index, list);
    });
    if (listContainer) {
      listContainer.appendChild(list);
      renderProperty(0);
    }
  });

  // Function to render a selected property
  function renderProperty(index) {
    const paragraph = properties[index];

    displayContainer.innerHTML = `
    <figure><img src="${paragraph.image}" alt="property"></figure>
    <div class="property_content">
      <div class="property_heading">
        <p class="p-md">${paragraph.year}</p>
        <h2 class="h2">${paragraph.name}</h2>
      </div>
      <hr>
      <div class="property_details">
        <address class="p-md">${paragraph.address}</address>
        <p class="p-md">
          <span>${paragraph.size}</span>
          <span class="opacity">/</span>
          <span>${paragraph.bath}</span>
          <span class="opacity">/</span>
          <span>${paragraph.bed}</span>
        </p>
      </div>
      <div class="property_footer">
        <span class="h6">${paragraph.price}</span>
        <button class="global_button"><span>+</span>explore all Projects</button>
      </div>
    </div>
  `;
  }

  const wrapper = document.getElementById("property-wrapper");

  // Group size: how many items per row
  const groupSize = 1;

  for (let i = 0; i < properties.length; i += groupSize) {
    const group = properties.slice(i, i + groupSize);

    group.forEach((property, indexInGroup) => {
      const groupClass =
        Math.floor(i / groupSize) % 2 === 0 ? "row" : "row_rev";

      const contentDiv = document.createElement("div");
      contentDiv.className = `property_container ${groupClass}`;
      contentDiv.innerHTML = `
      <figure><img src="${property.image}" alt="property"></figure>
      <div class="property_content">
        <div class="property_heading">
          <p class="p-md">${property.year}</p>
          <h2 class="h2">${property.name}</h2>
        </div>
        <hr>
        <div class="property_details">
          <address class="p-md">${property.address.replace(
            ",",
            ",<br>"
          )}</address>
          <p class="p-md">
            <span>${property.size}</span><span class="opacity">/</span>
            <span>${property.bath}</span><span class="opacity">/</span>
            <span>${property.bed}</span>
          </p>
        </div>
        <div class="property_footer">
          <span class="h6">${property.price}</span>
          <button class="global_button"><span>+</span>explore all Projects</button>
        </div>
      </div>
    `;
      if (wrapper) {
        wrapper.appendChild(contentDiv);
      }
    });
  }
});
