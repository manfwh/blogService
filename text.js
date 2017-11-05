var fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true});

// resize and remove EXIF profile data
gm('dist/images/img.jpg')
.resizeExact(240, 240, '!')
.noProfile()
.write('dist/images/resize.png', function (err) {
  if (err){
    console.log(err)
  } else {
    console.log('done')
  }

});
gm('dist/images/img.jpg')
.size(function (err, size) {
  if (!err)
  console.log(size)
    console.log(size.width > size.height ? 'wider' : 'taller than you');
});
gm('dist/images/img.jpg')
.stroke("#ffffff")
.drawCircle(10, 10, 20, 10)
.font("msyh.ttc", 124)
.drawText(850, 600, "hello!")
.write("dist/images/drawing.jpg", function (err) {
  if (!err) console.log('done');
});