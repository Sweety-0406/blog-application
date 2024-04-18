import { Listing, User,Comment } from "@prisma/client";

export type SafeUser=Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt:string,
    updatedAt:string,
    emailVerified : string | null
}

export type SafeListing=Omit<
  Listing,
  "createdAt"
> & {
  createdAt:string;
}


export type SafeComment = Omit<
  Comment,
  "createdAt"
> & {
  createdAt:string
}