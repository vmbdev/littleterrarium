/**
 * Fills the database with the name of the species.
 * The CSV files from http://www.theplantlist.org/ are used as references.
 */
import { createInterface } from 'node:readline';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertSpeciesNames = () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const file = path.join(__dirname, '/res/species.csv');
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
}


const insertSpeciesCommonNames = () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const file = path.join(__dirname, '/res/commonnames.csv');
  const readline = createInterface({ input: createReadStream(file) });
  const species = [];
  let lines = 0;
  readline.on('line', (line) => {
    lines++;
    const parts = line.replace(/['"]+/g, '').split(',');

    if (parts.length === 2) {
      species.push({
        where: { name: parts[1] },
        data: { commonName: parts[0] }
      });
    }
  });
  
  readline.on('close', async () => {
    let count = 0;

    for (const specie of species) {
      try {
        await prisma.specie.updateMany(specie);
        count++;
      } catch(err) {
        console.log(err);
      }
    }
  
    console.log(`Inserted ${count} common names (of ${lines} in the file) into the species database`);
  });
}

insertSpeciesNames();
insertSpeciesCommonNames();