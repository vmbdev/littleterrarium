/**
 * Get the files uploaded through multer and handles them.
 * At the moment, it hashes the file, creates a folder with it and moves
 * the file there. Then, it modifies req.file for the next middleware to know.
 */

import FileSystem from '../helpers/filesystem.js';

const image = async (req, res, next) => {
  try {
    const publicFile = await FileSystem.saveFile(req.file.path);
    req.file.destination = publicFile.destination;
    req.file.filename = publicFile.filename;
    req.file.path =publicFile.path;
  } catch (e) {
    if ((e.error) && (e.error === 'IMG_NOT_VALID')) return next({ error: e.error, code: 400 });
    else return next({ code: 500 });
  }

  next();
}

export default {
  image,
};