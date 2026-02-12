import { test, expect } from '@playwright/test';
import { AuthPage } from './AuthPage';
import { ProjectsPage } from './ProjectsPage';

const TEST_USER = {
    name: 'Test User',
    email: 'e2e-test@example.com',
    password: 'Test123!@#'
};

test.describe('Authentication Flows', () => {
    let authPage: AuthPage;
    let projectsPage: ProjectsPage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        projectsPage = new ProjectsPage(page);
    });

    test('should allow a user to sign up', async () => {
        await authPage.navigateToSignup();
        const uniqueEmail = `test-${Date.now()}@example.com`;
        await authPage.signup(TEST_USER.name, uniqueEmail, TEST_USER.password);
        await expect(projectsPage.page).toHaveURL(/.*\/dashboard/);
    });

    test('should allow a user to log in and log out', async () => {
        // Step 1: Create user
        await authPage.navigateToSignup();
        const uniqueEmail = `test-${Date.now()}@example.com`;
        await authPage.signup(TEST_USER.name, uniqueEmail, TEST_USER.password);

        // Step 2: Logout
        await authPage.logout();
        await expect(authPage.page).toHaveURL(/.*\/auth\/signin/);

        // Step 3: Login again
        await projectsPage.login(uniqueEmail, TEST_USER.password);
        await expect(projectsPage.page).toHaveURL(/.*\/dashboard/);
    });
});