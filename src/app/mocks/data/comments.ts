import { Comment } from "../../core/api/models/comment.model";

export const comments: Comment[] = [
    {
        id: 'comment-001',
        issueId: '8',
        authorId: 'user-002',
        text: 'I can reproduce this issue. It happens when the project does not have a lead assigned.',
        createdAt: '2026-09-22T10:00:00Z'
    },
    {
        id: 'comment-002',
        issueId: '8',
        authorId: 'user-001',
        text: 'I found the issue in the project details component. Working on a fix.',
        createdAt: '2026-09-23T09:30:00Z'
    },
    {
        id: 'comment-003',
        issueId: '8',
        authorId: 'user-003',
        text: 'The problem appears to be in the project resolver.',
        createdAt: '2026-09-24T11:00:00Z'
    },
    {
        id: 'comment-004',
        issueId: '23',
        authorId: 'user-002',
        text: 'We should make company name and contact email required fields during customer registration. This will help sales representatives avoid incomplete customer records.',
        createdAt: '2026-02-02T09:15:00Z'
    },
    {
        id: 'comment-005',
        issueId: '23',
        authorId: 'user-001',
        text: 'Agreed. I would also suggest validating the email format and checking whether a customer with the same email already exists.',
        createdAt: '2026-02-02T10:30:00Z'
    },
    {
        id: 'comment-006',
        issueId: '23',
        authorId: 'user-002',
        text: 'Good idea! Let\'s prevent duplicate registrations based on email address. We can display a message saying that a customer with this email already exists.',
        createdAt: '2026-02-02T11:05:00Z'
    },
    {
        id: 'comment-007',
        issueId: '23',
        authorId: 'user-001',
        text: 'Perfect, I will include these validations in the implementation. The registration form will also show clear validation messages so users know what needs to be corrected.',
        createdAt: '2026-02-03T08:45:00Z'
    },
    {
        id: 'comment-008',
        issueId: '28',
        authorId: 'user-004',
        text: 'I noticed that the contact form accepts invalid email addresses and phone numbers. We should add validation before saving the contact.',
        createdAt: '2026-02-12T09:20:00Z'
    },
    {
        id: 'comment-009',
        issueId: '28',
        authorId: 'user-007',
        text: 'I will handle this. For email addresses, I plan to add format validation. For phone numbers, should we also validate the country code?',
        createdAt: '2026-02-12T10:15:00Z'
    },
    {
        id: 'comment-010',
        issueId: '28',
        authorId: 'user-004',
        text: 'Yes, that would be helpful. We should allow international phone numbers but make sure they contain a valid country code and enough digits.',
        createdAt: '2026-02-12T11:00:00Z'
    },
    {
        id: 'comment-011',
        issueId: '28',
        authorId: 'user-007',
        text: 'The validation is implemented and tested. Invalid email addresses and phone numbers are now rejected, while valid international numbers are accepted. Moving this to Done.',
        createdAt: '2026-02-15T14:30:00Z'
    },
    {
        id: 'comment-012',
        issueId: '31',
        authorId: 'user-006',
        text: 'The total opportunity value on the sales dashboard becomes incorrect when an opportunity moves to another pipeline stage. It looks like the previous stage value is not being recalculated.',
        createdAt: '2026-02-17T09:10:00Z'
    },
    {
        id: 'comment-013',
        issueId: '31',
        authorId: 'user-001',
        text: 'I found the problem. We are adding the opportunity value to the new stage total without removing it from the previous stage. I will update the calculation logic.',
        createdAt: '2026-02-17T10:25:00Z'
    },
    {
        id: 'comment-014',
        issueId: '31',
        authorId: 'user-006',
        text: 'Thanks! Please also make sure that moving an opportunity between stages does not change the overall pipeline value. Only the values grouped by stage should change.',
        createdAt: '2026-02-17T11:40:00Z'
    },
    {
        id: 'comment-015',
        issueId: '31',
        authorId: 'user-001',
        text: 'Fixed and tested. Opportunity values are now correctly removed from the previous stage and added to the new one. The overall pipeline value remains unchanged when an opportunity changes stages.',
        createdAt: '2026-02-20T15:20:00Z'
    },
    {
        id: 'comment-016',
        issueId: '32',
        authorId: 'user-002',
        text: 'It would be useful to include monthly revenue, the number of active opportunities, and conversion rates on the dashboard. Sales managers should be able to quickly understand how the team is performing.',
        createdAt: '2026-02-20T09:30:00Z'
    },
    {
        id: 'comment-017',
        issueId: '32',
        authorId: 'user-003',
        text: 'Agreed. I am working on the dashboard layout now. I will include summary cards for the main metrics and charts showing monthly revenue and conversion trends.',
        createdAt: '2026-02-23T13:45:00Z'
    },
    {
        id: 'comment-018',
        issueId: '33',
        authorId: 'user-003',
        text: 'The shopping cart sometimes displays an incorrect total when customers increase or decrease product quantities. Please check whether the subtotal is recalculated correctly.',
        createdAt: '2026-02-06T09:20:00Z'
    },
    {
        id: 'comment-019',
        issueId: '33',
        authorId: 'user-004',
        text: 'I found the issue. The cart was not updating the subtotal after quantity changes. I have fixed the calculation and added tests for multiple products and quantity updates. The changes are ready for review.',
        createdAt: '2026-02-09T14:30:00Z'
    },
    {
        id: 'comment-020',
        issueId: '34',
        authorId: 'user-003',
        text: 'I noticed that searching for a specific product sometimes returns unrelated items. For example, searching for "wireless headphones" also displays phone cases. We should check the search matching logic.',
        createdAt: '2026-02-07T09:15:00Z'
    },
    {
        id: 'comment-021',
        issueId: '34',
        authorId: 'user-002',
        text: 'Thanks for reporting this. I will investigate the search filters and make sure results are matched against product names and descriptions more accurately.',
        createdAt: '2026-02-07T10:40:00Z'
    },
    {
        id: 'comment-022',
        issueId: '35',
        authorId: 'user-003',
        text: 'Customers should be able to filter products by category, such as Electronics, Clothing, and Accessories. This would make it easier to find products without browsing the entire catalog.',
        createdAt: '2026-02-08T09:00:00Z'
    },
    {
        id: 'comment-023',
        issueId: '35',
        authorId: 'user-005',
        text: 'I will add category filters above the product listing. Do you think customers should be able to select multiple categories at once?',
        createdAt: '2026-02-08T10:30:00Z'
    },
    {
        id: 'comment-024',
        issueId: '35',
        authorId: 'user-003',
        text: 'For now, selecting one category at a time should be enough. Please also include an "All categories" option so customers can easily reset the filter.',
        createdAt: '2026-02-10T08:45:00Z'
    },
    {
        id: 'comment-025',
        issueId: '36',
        authorId: 'user-004',
        text: 'The registration form should include email, password, and password confirmation fields. We should also make sure customers cannot register with an email address that is already in use.',
        createdAt: '2026-02-09T09:15:00Z'
    },
    {
        id: 'comment-026',
        issueId: '36',
        authorId: 'user-006',
        text: 'I agree. I will also add password strength validation and make sure passwords are securely hashed before being stored. The form will display clear validation messages.',
        createdAt: '2026-02-10T11:20:00Z'
    },
    {
        id: 'comment-027',
        issueId: '36',
        authorId: 'user-004',
        text: 'Looks good! Please also check that the registration form works correctly on mobile devices. Once that is verified, we can approve the implementation.',
        createdAt: '2026-02-12T14:10:00Z'
    },
    {
        id: 'comment-028',
        issueId: '37',
        authorId: 'user-003',
        text: 'The product listing page takes quite a long time to load, especially when there are many products. I suspect that loading all full-size product images at once is causing the problem.',
        createdAt: '2026-02-10T09:00:00Z'
    },
    {
        id: 'comment-029',
        issueId: '37',
        authorId: 'user-007',
        text: 'I checked the network requests and confirmed that all product images are loaded immediately, even when they are below the visible area. Lazy loading should help reduce the initial loading time.',
        createdAt: '2026-02-10T10:20:00Z'
    },
    {
        id: 'comment-030',
        issueId: '37',
        authorId: 'user-003',
        text: 'That makes sense. We should also serve smaller image versions for mobile devices instead of downloading large images that are not needed.',
        createdAt: '2026-02-11T08:45:00Z'
    },
    {
        id: 'comment-031',
        issueId: '37',
        authorId: 'user-007',
        text: 'Implemented lazy loading and responsive image sizes. I also added image dimensions to prevent the product cards from jumping around while images are loading.',
        createdAt: '2026-02-13T14:30:00Z'
    },
    {
        id: 'comment-032',
        issueId: '37',
        authorId: 'user-003',
        text: 'Tested the product listing on desktop and mobile. Images load correctly, and the initial page loading feels much faster. Looks good to me!',
        createdAt: '2026-02-14T11:15:00Z'
    },
    {
        id: 'comment-033',
        issueId: '38',
        authorId: 'user-004',
        text: 'After checkout, customers should see a confirmation page with their order number, purchased products, total amount, and estimated delivery date. This will make it easier for them to verify their purchase.',
        createdAt: '2026-02-12T09:10:00Z'
    },
    {
        id: 'comment-034',
        issueId: '38',
        authorId: 'user-008',
        text: 'Should we also display the delivery address and payment method? I think having all order information in one place would be useful.',
        createdAt: '2026-02-12T10:25:00Z'
    },
    {
        id: 'comment-035',
        issueId: '38',
        authorId: 'user-004',
        text: 'Yes, definitely. Please include the delivery address and payment method, but do not display any sensitive payment details. We should also provide a link to the customer\'s order history.',
        createdAt: '2026-02-12T11:00:00Z'
    },
    {
        id: 'comment-036',
        issueId: '38',
        authorId: 'user-008',
        text: 'Sounds good. I suggest showing a clear success message at the top, followed by the order summary and delivery information. I will use the existing checkout design styles to keep the experience consistent.',
        createdAt: '2026-02-13T08:40:00Z'
    },
    {
        id: 'comment-037',
        issueId: '38',
        authorId: 'user-004',
        text: 'One more thing: please make sure refreshing the confirmation page does not create another order. It should display the existing order details.',
        createdAt: '2026-02-13T09:15:00Z'
    }
];