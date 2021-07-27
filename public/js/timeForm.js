function handleSubmit(event) {
  const form = event.target;
  const hours = parseInt(form._hours.value) || 0;
  const minutes = parseInt(form._minutes.value) || 0;
  form.minutes.value = hours * 60 + minutes;
  console.log(form.minutes.value);
}

document.addEventListener("DOMContentLoaded", function () {
  const timeForm = document.getElementById("timeForm");
  timeForm.addEventListener("submit", handleSubmit);
});
