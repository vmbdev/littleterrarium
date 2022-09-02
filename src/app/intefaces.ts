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
  Light,
  Condition,
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

export { Role, UserStatus, Light, Condition }