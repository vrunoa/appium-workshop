function gotoPage(uri) {
  document.location.href = uri;
}

function showHidden(showId, hideId) {
  document.querySelector(hideId).style.display = "none";
  document.querySelector(showId).style.display = "block";
}

function clearError() {
  var errEl = document.querySelector('.error');
  errEl.innerText = "";
  errEl.style.display = "none";
}

function showError(msg) {
  var errEl = document.querySelector('.error');
  errEl.innerText = msg;
  errEl.style.display = "block";
}

function verifyForm(form) {
  clearError();
  var textbox = form["textbox_1"];
  if(textbox.value.trim() == "") {
    showError("Please fill the textbox with the text 'Im changed'");
    return;
  }
  if(textbox.value === "Clear me") {
    showError("Please change the text in the textbox to 'Im changed'");
    return;
  }
  if(textbox.value !== "Im changed") {
    showError("Please change the text in the textbox to 'Im changed'");
    return;
  }
  var checkbox = form["checkbox_1"];
  if(checkbox.checked === false) {
    showError("Come on, im doing my best! Please check the checkbox");
    return;
  }
  showHidden("#thanks_container", "#form_container");
}

function dummyClear(elId) {
  showError("Please use the .clear method to clear the textbox value");
}
