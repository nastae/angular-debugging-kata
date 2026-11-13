import { Project } from "../../core/api/models/project.model";

export const projects: Project[] = [
    {
        id: 1,
        key: 'KAN',
        name: 'Angular Debugging Kata',
        description: 'A Jira-inspired task management application used for practicing Angular debugging techniques.',
        leadId: 'user-001',
        createdAt: '2026-01-10T09:30:00Z',
        updatedAt: '2026-01-10T09:30:00Z'
    },
    {
        id: 2,
        key: 'CRM',
        name: 'Customer Relationship Management',
        description: 'Internal CRM platform for managing customers, contacts, and sales workflows.',
        leadId: 'user-002',
        createdAt: '2026-01-15T11:00:00Z',
        updatedAt: '2026-01-15T11:00:00Z'
    },
    {
        id: 3,
        key: 'SHOP',
        name: 'E-Commerce Platform',
        description: 'Online shopping platform with product catalog, orders, payments, and customer accounts.',
        leadId: 'user-003',
        createdAt: '2026-02-01T08:15:00Z',
        updatedAt: '2026-02-01T08:15:00Z'
    },
    {
        id: 4,
        key: 'MOB',
        name: 'Mobile Application',
        description: 'Cross-platform mobile application for customers and employees.',
        leadId: 'user-004',
        createdAt: '2026-02-10T13:45:00Z',
        updatedAt: '2026-02-10T13:45:00Z'
    },
    {
        id: 5,
        key: 'PAY',
        name: 'Payment Gateway',
        description: 'Service responsible for payment processing, transaction tracking, and integration with external providers.',
        leadId: 'user-001',
        createdAt: '2026-03-05T10:20:00Z',
        updatedAt: '2026-03-05T10:20:00Z'
    },
    {
        id: 6,
        key: 'HR',
        name: 'Human Resources Platform',
        description: 'Internal platform for managing employees, recruitment, onboarding, and HR processes.',
        leadId: 'user-005',
        createdAt: '2026-03-12T09:00:00Z',
        updatedAt: '2026-03-12T09:00:00Z'
    },
    {
        id: 7,
        key: 'INV',
        name: 'Inventory Management System',
        description: 'System for tracking inventory, managing warehouse operations, monitoring stock levels, and handling product shipments.',
        leadId: 'user-006',
        createdAt: '2026-03-20T10:30:00Z',
        updatedAt: '2026-03-20T10:30:00Z'
    },
    {
        id: 8,
        key: 'ANL',
        name: 'Analytics Dashboard',
        description: 'Business analytics platform for monitoring key performance indicators, generating reports, and visualizing business data.',
        leadId: 'user-007',
        createdAt: '2026-04-02T14:15:00Z',
        updatedAt: '2026-04-02T14:15:00Z'
    }
]