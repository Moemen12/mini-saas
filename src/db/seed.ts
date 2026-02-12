import { db } from "./index";
import { projects } from "./drizzle/schema/projects";
import { faker } from "@faker-js/faker";
import { runScript } from "./runScript";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/config/env";

async function seedDatabase(userCount: number, projectCount: number) {
    console.log(`🌱 Seeding database with ${userCount} users and ${projectCount} projects...`);


    const supabase = createClient(env.SUPABASE_URL, env.SERVICE_ROLE_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });

    // 2. Users
    const userIds: string[] = [];
    for (let i = 0; i < userCount; i++) {
        const email = faker.internet.email();
        const password = faker.internet.password({
            length: 12,
            memorable: false,
            pattern: /[A-Za-z0-9!@#$%]/,
            prefix: ''
        });

        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
        });

        if (error) {
            console.error("❌ Error creating user:", error);
            continue;
        }

        if (data.user) {
            userIds.push(data.user.id);
            console.log(`✅ Created: ${email} | Password: ${password}`);
        }
    }

    console.log(`✅ Created ${userIds.length} users with FULL auth data.`);

    // 3. Projects
    const statusOptions = ['active', 'on hold', 'completed'] as const;
    for (let i = 0; i < projectCount; i++) {
        const creatorId = faker.helpers.arrayElement(userIds);
        const assigneeId = faker.helpers.maybe(() => faker.helpers.arrayElement(userIds), { probability: 0.7 });
        await db.insert(projects).values({
            id: faker.string.uuid(),
            userId: creatorId,
            name: faker.company.catchPhrase(),
            status: faker.helpers.arrayElement(statusOptions),
            deadline: faker.date.future().toISOString().split("T")[0],
            assignedTo: assigneeId,
            budget: faker.finance.amount({ min: 1000, max: 50000, dec: 2 }),
        });
    }

    console.log(`✅ Created ${projectCount} projects.`);
    console.log("✨ Seeding completed successfully!");
}

runScript("db:seed", () => seedDatabase(5, 10));