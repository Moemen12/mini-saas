import { test, expect } from '@playwright/test';
import { AuthPage } from './AuthPage';
import { ProjectsPage } from './ProjectsPage';

test.describe('Authentication Flows', () => {
    let authPage: AuthPage;
    let projectsPage: ProjectsPage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        projectsPage = new ProjectsPage(page);
    });

    test('should allow a user to sign up', async () => {
        await authPage.navigateToSignup();
        const testEmail = `test-${Date.now()}@example.com`;
        await authPage.signup('Test User', testEmail, 'Password123!');

        // After signup, user should be redirected to dashboard
        await expect(projectsPage.page).toHaveURL(/.*\/dashboard/);
    });

    test('should allow a user to log out', async () => {
        await projectsPage.navigate();
        await projectsPage.login('moemensaadeh936@gmail.com', 'AB12??cd');

        await authPage.logout();
        // Verify we are back on the sign-in page
        await expect(authPage.page).toHaveURL(/.*\/auth\/signin/);
    });
});
