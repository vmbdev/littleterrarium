/**
 * Prisma Client creates the interfaces, yet it doesn't include
 * the relations. Here we do it.
 * We also re-export the rest of the data to import everything
 * from here
 */

import {
  User as PrismaUser,
  Location as PrismaLocation,
  Plant as PrismaPlant,
  Specie as PrismaSpecie,
  Photo as PrismaPhoto,
  Role,
  UserStatus,
  Light as PrismaLight,
  Condition as PrismaCondition,
} from "@prisma/client";

export interface Location extends PrismaLocation {
  plants?: Plant[],
  _count?: any,
  pictureFile: File,
  pictures: any
}

export interface Plant extends PrismaPlant {
  photos?: Photo[],
  specie?: Specie
}

export interface User extends PrismaUser {
  locations?: Location[],
  plants?: Plant[],
  photos?: Photo[],
  avatar: any,
  preferences: any,
}

export interface Specie extends PrismaSpecie {
  plants?: Plant[]
}

export interface Photo extends PrismaPhoto {
  pictureFiles: File[],
  images: any
}

export const Light: { [key: string]: any } = {
  ...PrismaLight,
  FULLSUN: {
    desc: 'Full sun',
    verbose: 'Sun shines over the whole day',
  },
  PARTIALSUN: {
    desc: 'Partial sun',
    verbose: 'Sun is here for a few hours each day',
  },
  SHADE: {
    desc: 'Shade',
    verbose: 'Sun is not allowed here',
  },
}

export const Condition: { [key: string]: string } = {
  ...PrismaCondition,
  BAD: 'On the line',
  POOR: 'Holding on to life',
  GOOD: 'Looks good',
  VERYGOO: 'Looking dapper',
  EXCELLENT: 'Prime example of its specie',
}

// client-side only
export const potChoices: { [key: string]: any } = {
  LT_POT_TERRACOTTA: { name: 'Terracotta', image: '/assets/pot-terracotta.jpg' },
  LT_POT_PLASTIC: { name: 'Plastic', image: '/assets/pot-plastic.jpg' },
  LT_POT_CERAMIC: { name: 'Ceramic', image: '/assets/pot-ceramic.jpg' },
  LT_POT_METAL: { name: 'Metal', image: '/assets/pot-metal.jpg' },
  LT_POT_GLASS: { name: 'Glass', image: '/assets/pot-glass.jpg' },
  LT_POT_WOOD: { name: 'Wood', image: '/assets/pot-wood.jpg' },
  LT_POT_CONCRETE: { name: 'Concrete', image: '/assets/pot-concrete.jpg' },
  LT_POT_OTHER: { name: 'Other', image: '/assets/pot-other.jpg' },
};

export { Role, UserStatus }