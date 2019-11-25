let index = 0
let data = null
let keys = []

function setup() {
  $('html').css('backgroundImage', 'url(' + data[index].cover + ')')
  // Wrap every letter in a span
  $('#text').html(data[index].text.replace(/([^\x00-\x80]|\.|\:|\-|\,|\w)/g, "<span class='letter' char='$&'>$&</span>"));
  updateText()
  anime.timeline({
      loop: true
    })
    .add({
      targets: '.letter',
      translateY: [0, "0.5em", 0],
      easing: "easeInOutExpo",
      scale: [1, 1.25, 1],
      duration: 3000,
      delay: function(el, i) {
        return 50 * i;
      }
    });
}

$.getJSON('./stories.json', function(d) {
  data = d
  setup()
});




function updateText() {
  $('#text .letter').each(function() {
    var c = $(this).attr('char')
    for (m in data[index].map) {
      if (m == c) {
        if (keys.includes(m)) {
          $(this).text(m)
        } else {
          $(this).text(data[index].map[m])
        }
      }
    };
  });
}



document.addEventListener('keydown', function(ev) {
  //forget about repeated keydown events
  if (ev.repeat) return

  var c = event.key.toLocaleLowerCase()
  keys.push(c)
  updateText()

});

document.addEventListener('keyup', function(ev) {
  if (event.keyCode == 37) {
    index--
    if (index < 0) index = data.length - 1
    setup()
  } else if (event.keyCode == 39) {
    index++
    if (index > data.length - 1) index = 0
    setup()
  } else {
    var c = event.key.toLocaleLowerCase()
    keys = keys.filter(function(value, index) {
      return value != c;
    })
    updateText()
  }

});
