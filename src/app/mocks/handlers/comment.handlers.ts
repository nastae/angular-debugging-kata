import { http, HttpResponse } from "msw";
import { comments } from "../data/comments";

export const commentHandlers = [

    http.get('/api/comments', () => {
        return HttpResponse.json(comments)
    })
]