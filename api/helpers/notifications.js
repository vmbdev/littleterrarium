import prisma from '../prismainstance.js';

const check = async () => {
  const plantsToWater = await checkProperty('waterNext');
  const plantsToFertilize = await checkProperty('fertNext');

  store(plantsToWater);
  store(plantsToFertilize);
}

const checkProperty = async (property) => {
  const plants = await prisma.plant.findMany({
    where: {
      [property]: {
        lte: new Date()
      }
    },
    select: {
      id: true,
      ownerId: true,
      [property]: true
    }
  })

  return plants;
}

const store = async (plants) => {
  for (const plant of plants) {
    const content = {};
    let type;

    if (plant.waterNext) content.waterNext = plant.waterNext;
    else if (plant.fertNext) content.fertNext = plant.fertNext;
    
    type = content.waterNext ? 'WATER' : 'FERTILIZER';

    await prisma.notification.upsert({
      where: {
        plantCare: {
          plantId: plant.id,
          type
        }
      },
      update: { content },
      create: {
        plantId: plant.id,
        ownerId: plant.ownerId,
        content,
        type
      }
    });

    // if (existingNotif)
  }
}

export default {
  check
}