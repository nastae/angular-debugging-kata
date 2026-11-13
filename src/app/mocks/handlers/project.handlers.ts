import { http, HttpResponse } from "msw";
import { projects } from "../data/projects";
import { Project } from "../../core/api/models/project.model";

export const projectHandlers = [

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
    }),

    http.post('/api/projects', async ({ request }) => {
        const project = await request.json() as Project;

        const newProject: Project = {
            ...project,
            id: Math.max(...projects.map(p => p.id), 0) + 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        projects.push(newProject);

        return HttpResponse.json(newProject, {
            status: 201
        })
    }),

    http.put('/api/projects/:id', async ({ params, request }) => {
        const id = Number(params['id']);

        const index = projects.findIndex(
            project => project.id === id
        );

        if (index === -1) {
            return HttpResponse.json(
                { message: 'Project not found' },
                { status: 404 }
            );
        }

        const body = await request.json() as Project;

        const updatedProject: Project = {
            ...projects[index],
            name: body.name,
            description: body.description,
            leadId: body.leadId,
            updatedAt: new Date().toISOString()
        }

        projects[index] = updatedProject;

        return HttpResponse.json(updatedProject);
    }),

    http.delete('/api/projects/:id', ({ params }) => {
        const id = Number(params['id']);

        const index = projects.findIndex(
            project => project.id === id
        );

        if (index === -1) {
            return HttpResponse.json(
                { message: 'Project not found' },
                { status: 404 }
            );
        }

        projects.splice(index, 1);

        return new HttpResponse(null, {
            status: 204
        })
    })
];