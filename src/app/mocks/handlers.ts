import { http, HttpResponse } from "msw";
// import { projects } from "./data";
import { projects } from "./data/projects";

export const handlers = [

    http.get('/api/projects', ()  => {
        return HttpResponse.json(projects)
    }),

    http.get('/api/projects/:id', ({ params }) => {
        const project = projects.find(
            p => p.id === Number(params['id'])  
        );

        if (!project) {
            return HttpResponse.json(
                { message: 'Project not fouind' },
                { status: 404 }
            );
        }

        return HttpResponse.json(project);
    })
];