import { clsx, type ClassValue } from "clsx";
import { Session, getServerSession } from "next-auth";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

function tokenPayload(session: Session | null) {
  return {
    role: session?.user?.name,
    id: session?.user?.email,
  };
}

export async function getAccessToken() {
  const session = await getServerSession();
  const accessToken = jwt.sign(tokenPayload(session), process.env.JWT_SECRET as string);
  return accessToken;
}
