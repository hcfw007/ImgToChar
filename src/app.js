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

  let imageData = context.getImageData(0, 0, 10, 10)
  console.log(imageData)
}