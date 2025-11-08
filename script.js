
function loadHTML(elementId, filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error("File not found: " + filePath);
      return response.text();
    })
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch(error => console.error(error));
}

loadHTML("footer", "../footer/footer.html");
loadHTML("navbar", "../navbar/navbar.html");

