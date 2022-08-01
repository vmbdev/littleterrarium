/**
 * Fills the database with the name of the species.
 * The CSV files from http://www.theplantlist.org/ are used as references.
 */
import { createInterface } from 'node:readline';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { PrismaClient } from "@prisma/client";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, '/res/species.csv');

const prisma = new PrismaClient();
const readline = createInterface({ input: createReadStream(file) });
const species = [];

readline.on('line', (line) => {
  const parts = line.replace(/['"]+/g, '').split(',');
  let name = `${parts[4]} ${parts[6]}`;

  if (parts[7] && parts[8]) name += ` ${parts[7]} ${parts[8]}`;

  species.push({
    family: parts[2],
    name
  });
});

readline.on('close', async () => {
  let bulkCreate;
  try {
    bulkCreate = await prisma.specie.createMany({ data: species });
  } catch(err) {
    console.log(`Error when inserting the data: ${err}`);
  }

  console.log(`Inserted ${bulkCreate.count} species into the database`);
});