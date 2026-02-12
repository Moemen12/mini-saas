import { test, expect } from '@playwright/test';
import { ProjectsPage } from './ProjectsPage';
import { AuthPage } from './AuthPage';

test.describe('Projects Dashboard E2E', () => {
    let projectsPage: ProjectsPage;
    let authPage: AuthPage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        projectsPage = new ProjectsPage(page);

        await authPage.navigateToSignup();
        const testEmail = `test-projects-${Date.now()}@example.com`;
        await authPage.signup('Test Project User', testEmail, 'Password123!');

        await expect(page).toHaveURL(/.*\/dashboard/);
        await projectsPage.navigate();
    });

    test('should display the projects list with data', async () => {
        const projectName = `Initial Project ${Date.now()}`;

        await projectsPage.openCreateModal();
        await projectsPage.fillProjectForm({
            name: projectName,
            status: 'active',
            deadline: '2026-12-31',
            budget: '1000'
        });


        await expect(projectsPage.page.getByText(projectName)).toBeVisible({ timeout: 10000 });

        await expect(projectsPage.projectTable).toBeVisible();
        const rowCount = await projectsPage.projectRows.count();
        expect(rowCount).toBeGreaterThan(0);
    });

    test('should create a new project successfully', async () => {
        const projectName = `New E2E Project ${Date.now()}`;

        await projectsPage.openCreateModal();
        await projectsPage.fillProjectForm({
            name: projectName,
            status: 'active',
            deadline: '2026-12-31',
            budget: '5000'
        });

        await projectsPage.page.getByPlaceholder('Search projects...').fill(projectName);
        await expect(projectsPage.page.getByText(projectName)).toBeVisible({ timeout: 10000 });
    });

    test('should show correct "Assigned To" value on first edit', async () => {

        const projectName = `Edit Me ${Date.now()}`;
        await projectsPage.openCreateModal();

        await projectsPage.fillProjectForm({
            name: projectName,
            status: 'active',
            deadline: '2026-12-31',
            budget: '1000',

        });

        await projectsPage.page.getByPlaceholder('Search projects...').fill(projectName);
        await expect(projectsPage.page.getByText(projectName)).toBeVisible();
        await projectsPage.openEditModalForProject(0);

        const optionsCount = await projectsPage.assignedToSelect.locator('option').count();
        if (optionsCount > 1) {
            await projectsPage.assignedToSelect.selectOption({ index: 1 });
        }

        await expect(async () => {
            const assignedToValue = await projectsPage.assignedToSelect.inputValue();
            if (optionsCount > 1) {
                expect(assignedToValue).not.toBe('');
                expect(assignedToValue).not.toBe('Unassigned');
            }
        }).toPass({ timeout: 5000 });
    });

    test('should delete a project successfully', async () => {
        const projectName = `Delete Me ${Date.now()}`;

        // Create a project first to ensure we have something to delete without affecting seeded data
        await projectsPage.openCreateModal();
        await projectsPage.fillProjectForm({
            name: projectName,
            status: 'active',
            deadline: '2026-12-31',
            budget: '1000'
        });

        // Search so it's the only one/first one
        await projectsPage.page.getByPlaceholder('Search projects...').fill(projectName);
        await expect(projectsPage.page.getByText(projectName)).toBeVisible();

        const initialCount = await projectsPage.projectRows.count();

        // Delete the first project (the one we just created)
        await projectsPage.deleteProject(0);

        // Wait for count to decrease/project to disappear
        await expect(async () => {
            const newCount = await projectsPage.projectRows.count();
            expect(newCount).toBe(initialCount - 1);
        }).toPass({ timeout: 10000 });
    });
});
