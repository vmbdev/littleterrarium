/**
 * Prisma Client develops the interfaces, yet it doesn't include
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

export interface BaseItem { }

export interface Location extends BaseItem, PrismaLocation {
  plants?: Plant[],
}

export interface Plant extends BaseItem, PrismaPlant {
  photos?: Photo[],
  specie?: Specie
}

export interface User extends BaseItem, PrismaUser {
  locations?: Location[],
  plants?: Plant[],
  photos?: Photo[]
}

export interface Specie extends BaseItem, PrismaSpecie {
  plants?: Plant[]
}

export interface Photo extends BaseItem, PrismaPhoto {

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