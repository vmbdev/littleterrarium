import { Role } from "@prisma/client";
import prisma from "../prismainstance.js";

export const generateAuth = (req, res, next) => {
  req.auth = {};
  req.auth.userId = (
    req.body.userId ? Number.parseInt(req.body.userId)
    : req.params.userId ? Number.parseInt(req.params.userId)
    : req.session.userId
  );
  next();
}

// only allow if it's signed in, and if the data modifying is his/her or if he/she's an admin
export const self = (req, res, next) => {
  if (!req.session.signedIn) return next({ code: 401 });
  else if ((req.auth.userId !== req.session.userId) && (req.session.role !== Role.ADMIN)) {
    return next({ code: 403 });
  }

  next();
}

export const admin = (req, res, next) => {
  if (!req.session.signedIn || (req.session.role !== Role.ADMIN)) return next({ code: 403 });

  next();
}

export const signedIn = (req, res, next) => {
  if (!req.session.signedIn) return next({ code: 403 });

  next();
}

export const check = (model, idField) => {
  return async (req, res, next) => {
    let idValue;

    if (req.body[idField]) idValue = Number.parseInt(req.body[idField]);
    else if (req.params[idField]) idValue = Number.parseInt(req.params[idField]);
    else return next();
    
    if (prisma[model]) {
      try {
        await prisma[model].findFirstOrThrow({
          where: {
            id: Number.parseInt(idValue),
            ownerId: req.auth.userId
          }
        });
      } catch (err) {
        return next({ code: 403 });
      }
    }

    next();
  }
}

export default {
  self,
  admin,
  signedIn,
  check
};