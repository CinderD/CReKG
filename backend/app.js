const express = require('express')
const app = express()
const port = 5001
const cors = require('cors')
const multer = require('multer')

// Headers("Access-Control-Allow-Origin: *");
var corsOptions = {
  credentials:true,
  origin:'http://localhost:3000',
  optionsSuccessStatus:200
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, 'contract.txt')
  },
})

const upload = multer({ storage: storage })
  

app.use(cors(corsOptions))
app.post('/image', upload.single('file'), function (req, res) {
  res.json({})
})


app.get('/', function(req, res) {
  var spawn = require("child_process").spawn;
      

  var process = spawn('python',["./contract_handler.py"] );

  // Takes stdout data from script which executed
  // with arguments and send this data to res object
  process.stdout.on('data', function(data) {

      console.log(`${data}`)
      res.send(`${data}`);
  } )

})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

