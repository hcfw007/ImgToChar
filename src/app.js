let img = new Image()

let file = document.getElementById('file')
file.onchange = function(event) {
  let fr = new FileReader()
  fr.readAsDataURL(event.target.files[0])
  fr.onload = function(e) {
    img.src = e.target.result
  }
}

img.onload = function() {
  let h = img.naturalHeight
  let w = img.naturalWidth
  let canvas = document.getElementById('origin')
  if (h > w) {
    w = w / h * 400
    h = 400
  } else {
    h = h / w * 400
    w = 400
  }
  canvas.width = w
  canvas.height = h
  let context = canvas.getContext('2d')
  context.drawImage(img, 0, 0, w, h)

}

function getGrey(data) {
  let total = 0
  for (let i = 0; i < (data.length / 4); i ++) {
    let s = 4 * i
    total += (data[s] * 0.3 + data[s + 1] * 0.59 + data[s +2] * 0.11) * data[s + 3] / 255
  }
  return total / (data.length / 4)
}