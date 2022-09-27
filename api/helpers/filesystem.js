import { createHash } from 'node:crypto';
import { mkdir, rename, readFile, unlink } from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { files } from '../../littleterrarium.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hashFile = async (filePath) => {
  const hashes = ['md5', 'sha1', 'sha256'];

  if (hashes.includes(files.hash)) {
    const buffer = await readFile(filePath);
    const sum = createHash(files.hash);
    sum.update(buffer);

    return sum.digest('hex');
  }
  else throw new Error(`files.hash is not a valid algorithm. Valid algorithms: ${hashes}`);
}

// TODO: check if file exists before moving
const saveFile = async (filePath) => {
  const hash = await hashFile(filePath);
  const ext = await getImageExt(filePath);
  const { newDir, newFile, relativeDir } = await createDirectories(hash);

  const filenameFull = `${newFile}.${ext}`;
  const filenameThumb = `${newFile}-thumb.${ext}`;
  const filenameMid = `${newFile}-mid.${ext}`
  const imageFull = path.join(newDir, filenameFull);
  const imageThumb = path.join(newDir, filenameThumb);
  const imageMid = path.join(newDir, filenameMid);

  await rename(filePath, imageFull);
  
  const img = sharp(imageFull);
  await img.resize({ width: 250, height: 250, fit: 'cover'})
  .withMetadata()
  .toFile(imageThumb);

  await img.resize({ width: 750, fit: 'contain', position: 'left top' })
  .withMetadata()
  .toFile(imageMid);

  return ({
    destination: newDir,
    hash,
    path: {
      full: `${relativeDir}${filenameFull}`,
      mid: `${relativeDir}${filenameMid}`,
      thumb: `${relativeDir}${filenameThumb}`
    }
  });
}

const createDirectories = async (hash) => {
  let counter = 0;
  let newPath = '';
  while (counter + 1 < files.folder.division * 2) {
    newPath += hash.slice(counter, counter + 2) + '/';
    counter += 2;
  }

  const newFile = hash.slice(counter);
  const newDir = path.join(__dirname, '../../', files.folder.public, newPath);
  const relativeDir = `${files.folder.public}/${newPath}`
  await mkdir(newDir, { recursive: true });

  return {
    newDir,
    newFile,
    relativeDir
  };
}

// TODO: remove trailing directories
const removeFile = (filePath) => {
  return unlink(filePath);
}

const getImageExt = async (filePath) => {
  const img = sharp(filePath);
  let metadata;

  try {
    metadata = await img.metadata();
  } catch (err) {
    throw { error: 'IMG_NOT_VALID' };
  }

  return metadata.format;
}

export default {
  hashFile,
  saveFile,
  createDirectories,
  removeFile,
  getImageExt
};