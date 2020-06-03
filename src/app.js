let img = new Image()

let file = document.getElementById('file')
file.onchange = function(event) {
  let fr = new FileReader()
  fr.readAsDataURL(event.target.files[0])
  fr.onload = function(e) {
    img.src = e.target.result
  }
}

const charWidth = 8
const charHeight = 14

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

  let str = ''

  for (let i = 0; i < (Math.ceil(h / charHeight)); i ++) {
    for (let j = 0; j < (Math.ceil(w / charWidth)); j ++) {
      let imageData = context.getImageData(j * charWidth, i * charHeight, charWidth, charHeight)
      let grey = getGrey(imageData.data)
      let char = String.fromCharCode(greyList[greyList.length - Math.floor((grey / 255) * greyList.length)])
      if (char === '<') {
        char = '&lt;'
      }
      if (char === '>') {
        char = '&gt;'
      }
      str += char
    }
    str += '\n'
  }

  console.log(str)
  document.getElementById('result').innerHTML = str
}

function getGrey(data) {
  let total = 0
  for (let i = 0; i < (data.length / 4); i ++) {
    let s = 4 * i
    // if (data[s] === data[s + 1] && data[s + 1] == data[s + 2]) {
    //   total += data[s + 3]
    // } else {
    //   total += data[s] * 0.3 + data[s + 1] * 0.59 + data[s +2] * 0.11
    // }
    total += (data[s] * 0.3 + data[s + 1] * 0.59 + data[s +2] * 0.11) * data[s + 3] / 255
  }
  return total / (data.length / 4)
}