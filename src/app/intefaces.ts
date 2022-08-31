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
  Photo,
  Role,
  UserStatus,
  Light,
  Condition,
} from "@prisma/client";

export interface Location extends PrismaLocation {
  plants?: Plant[],
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

export { Photo, Role, UserStatus, Light, Condition }