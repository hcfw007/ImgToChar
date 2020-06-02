const originSrc = './imgs/bunny.jpg'

let img = new Image()
img.src = originSrc
img.onload = function() {
  let h = img.naturalHeight
  let w = img.naturalWidth
  canvas = document.getElementById('origin')
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
  context.drawImage(img, 0, 0)
}