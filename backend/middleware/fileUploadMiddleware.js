//const multer = require('multer');
//const path = require('path');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
   
//       const uploadPath = path.join(__dirname, '..', 'uploads/');
//       cb(null, uploadPath); // Folder where the files will be stored
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname); // Unique file name
//     },
//   });
  
//   const upload = multer({ storage: storage });

//   module.exports = upload;


  const multer = require('multer');

// Configure multer to store files in memory
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;