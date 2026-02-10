import { pgTable, uuid, text, timestamp, date, numeric, pgEnum } from 'drizzle-orm/pg-core';
import { authUsers } from './users';

export const statusEnum = pgEnum('project_status', ['active', 'on hold', 'completed']);

export const projects = pgTable('projects', {
    id: uuid('id').defaultRandom().primaryKey(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    userId: uuid('user_id').notNull().references(() => authUsers.id, { onDelete: "cascade" }),
    name: text('name').notNull(),
    status: statusEnum('status').default('active').notNull(),
    deadline: date('deadline'),
    assignedTo: text('assigned_to'),
    budget: numeric('budget', { precision: 12, scale: 2 }).default('0'),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;