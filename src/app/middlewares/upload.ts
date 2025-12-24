// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// const uploadDir = path.join(__dirname, '../../public/upload');

// // Ensure upload directory exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: uploadDir,
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// export const upload = multer({ storage });
