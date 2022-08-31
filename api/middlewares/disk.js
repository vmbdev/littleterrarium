/**
 * Get the files uploaded through multer and handles them.
 * At the moment, it hashes the file, creates a folder with it and moves
 * the file there. Then, it creates req.disk for the next middleware to know.
 */

import FileSystem from '../helpers/filesystem.js';

const processFile = async (file) => {
  const diskFile = await FileSystem.saveFile(file.path);

  diskFile.fieldname = file.fieldname;
  diskFile.mimetype = file.mimetype;
  diskFile.size = file.size;

  return diskFile;
}

export const image = async (req, res, next) => {
  if (req.file) {
    req.disk = {};
    try {
      req.disk.file = await processFile(req.file);
      req.disk.file.url = `${req.protocol}://${req.get('host')}/${req.disk.file.path}`;
    } catch (e) {
      if (e.error && (e.error === 'IMG_NOT_VALID')) return next({ error: e.error });
      else return next({ code: 500 });
    }
  }

  next();
}

export const gallery = async (req, res, next) => {
  if (req.files) {
    req.disk = {};
    req.disk.files = [];
    for (const file of req.files) {
      try {
        const diskFile = await processFile(file);
        diskFile.url = `${req.protocol}://${req.get('host')}/${diskFile.path}`;
        req.disk.files.push(diskFile);
      } catch (e) {
        if (e.error && (e.error === 'IMG_NOT_VALID')) return next({ error: e.error });
        else return next({ code: 500 });
      }
    }
  }

  next();
}

export default {
  image,
  gallery
};