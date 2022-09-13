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
  pictureFile: Blob
}

export interface Plant extends PrismaPlant {
  photos?: Photo[],
  specie?: Specie
}

export interface User extends PrismaUser {
  locations?: Location[],
  plants?: Plant[],
  photos?: Photo[]
}

export interface Specie extends PrismaSpecie {
  plants?: Plant[]
}

export interface Photo extends PrismaPhoto {

}

export const Light = {
  ...PrismaLight,
  FULLSUN: 'Full sun',
  PARTIALSUN: 'Partial sun',
  SHADE: 'Shade',
}

export const Condition = {
  ...PrismaCondition,
  BAD: 'On the line',
  POOR: 'Holding on to life',
  GOOD: 'I guess it\'s fine',
  VERYGOO: 'Looking dapper',
  EXCELLENT: 'Prime example of its specie',
}

export { Role, UserStatus }