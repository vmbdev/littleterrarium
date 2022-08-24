import { createHash } from 'node:crypto';
import { mkdir, rename, readFile, unlink } from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readChunk } from 'read-chunk';
import imageType, { minimumBytes } from 'image-type';
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
  const [localDestination, relDestination] = await createDirectories(hash);
  const filename = `image.${ext}`;
  const fullPath = path.join(localDestination, filename);

  await rename(filePath, fullPath);
  
  return ({
    destination: localDestination,
    filename,
    hash,
    path: `${relDestination}/${filename}`,
  });
}

const createDirectories = async (hash) => {
  let counter = 0;
  let newPath = '';
  while (counter + 2 < files.folder.division * 2) {
    newPath += hash.slice(counter, counter + 2) + '/';
    counter += 2;
  }
  newPath += hash.slice(counter);
  const newDir = path.join(__dirname, '../../', files.folder.public, newPath);
  await mkdir(newDir, { recursive: true });

  return [newDir, `${files.folder.public}/${newPath}`];
}

// TODO: remove trailing directories
const removeFile = (filePath) => {
  return unlink(filePath);
}

const getImageExt = async (filePath) => {
  const buffer = await readChunk(filePath, { length: minimumBytes });
  const imgInfo = await imageType(buffer);

  if (!imgInfo) throw { error: 'IMG_NOT_VALID' };

  return imgInfo.ext;
}

export default {
  hashFile,
  saveFile,
  createDirectories,
  removeFile,
  getImageExt
};