import { io } from "socket.io-client";
import { SERVER } from "../../api/server";

export const socket = io(SERVER);
