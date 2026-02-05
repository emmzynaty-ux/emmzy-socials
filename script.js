document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("This is a demo UI. No data is saved.");
  });
});
