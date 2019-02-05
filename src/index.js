import $ from 'jquery'

function append_top_word(top_word) {
  $('.top-word > h3').append(`${Object.keys(top_word.word)}`);
  $('.word-count').append(`<h3>${Object.values(top_word.word)}</h3>`);
}

function get_top_word() {
  fetch(`https://wordwatch-api.herokuapp.com/api/v1/top_word`)
  .then(response => response.json())
  .then(top_word => append_top_word(top_word))
  .catch(error => console.error({ error }));
}

function parse_words() {
  var new_words = $("#word").val().split(" ");
  var new_word_objects = []
  new_words.forEach((new_word) => {
    new_word_objects.push({ 'word': { 'value': new_word }})
  });
  return new_word_objects;
}

function addNewWord() {
  var new_objects = parse_words();
  var url = 'https://wordwatch-api.herokuapp.com/api/v1/words';
  new_objects.forEach( data => {
    console.log(data);
    $.ajax({
      method: "POST",
      url: url,
      data: data,
      contentType: 'application/x-www-form-urlencoded',
      success: function () {
        alert('worked');

      },
      error: function () {
        alert('nope');
      }
    });
  });
  window.location.href=window.location.href;
}

$(document).ready(() => {
  get_top_word();
  $('#btn').on('click', function(e) {
    e.preventDefault();
    addNewWord();
  });
})
