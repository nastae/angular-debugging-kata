import { http, HttpResponse } from "msw";
import { users } from "../data/users";
import { User } from "../../core/api/models/user.model";

export const userHandlers = [

    http.get('/api/users', () => {
       return HttpResponse.json(users); 
    }),

    http.get('/api/users/:id', ({ params }) => {
        const user = users.find(
            u => u.id === params['id']
        );

        if (!user) {
            return HttpResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        return HttpResponse.json(user);
    }),

    http.post('/api/users', async ({ request }) => {
        const body = await request.json() as User;

        const fullName = body.fullName?.trim();
        const email = body.email?.trim();

        if (!fullName || !email) {
            return HttpResponse.json(
                { message: 'Full name and email are request' },
                { status: 400 }
            );
        }

        const duplicateEmail = users.some(
            user => user.email.toLowerCase() === email.toLowerCase()
        );

        if (duplicateEmail) {
            return HttpResponse.json(
                { message: `A user with the email '${duplicateEmail}' already exists.` },
                { status: 409 }
            );
        }

        const nextId = Math.max(
            0,
            ...users.map(user => {
                const match = /^user-(\d+)$/.exec(user.id);
                return match ? Number(match[1]) : 0;
            })
        ) + 1;

        const newUser: User = {
            id: `user-${nextId}`,
            fullName,
            email,
            avatarUrl: body.avatarUrl?.trim() ?? ''
        };
        
        users.push(newUser);
        return HttpResponse.json(newUser, { status: 201 });
    })
];