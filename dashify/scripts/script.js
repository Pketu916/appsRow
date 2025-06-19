function loadHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error("Failed to load");
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(error => {
      console.error(`Error loading ${file}:`, error);
    });
}

// Load header and footer
window.addEventListener('DOMContentLoaded', () => {
  loadHTML("common-header", "header.html");
  loadHTML("common-footer", "footer.html");
});
