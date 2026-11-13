import { setupWorker } from "msw/browser";
// import { handlers } from "./handlers";
import { projectHandlers } from "./handlers/project.handlers";
import { userHandlers } from "./handlers/user.handlers";
import { issueHandlers } from "./handlers/issue.handlers";
import { commentHandlers } from "./handlers/comment.handlers";

export const worker = setupWorker(...projectHandlers, ...userHandlers, ...issueHandlers, ...commentHandlers)