import multer from 'multer';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// store temporarily before we hash it and move it to /public
const Uploader = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../temp'));
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
      }
    })
  });
}

export default Uploader;