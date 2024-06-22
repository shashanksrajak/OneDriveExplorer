import { io } from "socket.io-client";

const isBrowser = typeof window !== "undefined";

export const socket = isBrowser ? io(process.env.NEXT_PUBLIC_API_ENDPOINT) : {};