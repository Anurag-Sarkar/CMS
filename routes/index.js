var express = require('express');
var router = express.Router();
var blogSave = require("../Models/blog_save")
const multer  = require("multer")
const fs = require("fs")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniqueSuffix + "-" + file.originalname)
  }
})
const upload = multer({ storage: storage })

router.post('/addimg',upload.single("img"),function (req, res, next) {
  console.log(req.file)
  res.send(req.file.path.split('public\\')[1])
})


router.get('/', function(req, res, next) {
  check = blogSave.find({},(err,data)=>{
    console.log(data.length)
    if(data.length === 0){
      blogSave.create({
        blog:`
        <div id="text-content">
        <div id="options">
        <i id="line" class="ri-add-line"></i>
        <i id="imageinsert" class="ri-image-line"></i>
        <i id="video" class="ri-film-line"></i> 
        <i id="code" class="ri-code-box-line"></i>
        <i id="seperator" class="ri-separator"></i>
      </div>
      </div>`
      })
    } 
  })
  blogSave.findOne({},(err,data)=>{
    console.log(data.blog,"hello")
    res.render('index', { data: data.blog });
  })
});

router.post('/saveblog',async function(req, res, next) {
  console.log(req.body.blog)
  var data = await blogSave.findOne({})
  data.blog = req.body.blog.trim()
  data.save()
})

router.post('/deleteimg',function(req, res, next) {
  console.log("C:\\Users\\Anurag\\Documents\\DEVELOPMENT\\SHERYIANS\\SheryCMS\\cms\\public\\"+req.body.file)
  fs.unlink("C:\\Users\\Anurag\\Documents\\DEVELOPMENT\\SHERYIANS\\SheryCMS\\cms\\public\\"+req.body.file,(err)=>{
    if(err){
      console.log(err)
      }
    else{
      console.log("unlinked")
    }
    })
})

router.get('/readblog',async function(req, res, next) {
  console.log(req.body.blog)
  var data = await blogSave.findOne({})
  res.render("read",{data:data.blog})
})

module.exports = router;
