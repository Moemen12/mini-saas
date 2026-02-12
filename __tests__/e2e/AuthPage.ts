import { ROUTES } from '@/config/routes';
import { Page, Locator } from '@playwright/test';

export class AuthPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly nameInput: Locator;
    readonly submitButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('input[type="email"]');
        // Use name attribute to distinguish from confirm password
        this.passwordInput = page.locator('input[name="password"]');
        this.nameInput = page.locator('input[name="name"]');
        this.submitButton = page.locator('button[type="submit"]');
        this.logoutButton = page.getByRole('button', { name: /logout|sign out/i });
    }

    async navigateToSignup() {
        await this.page.goto(ROUTES.AUTH.SIGNUP);
    }

    async signup(name: string, email: string, pass: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(pass);
        // Fill confirm password if it exists
        const confirmPass = this.page.locator('input[name="confirmPassword"]');
        if (await confirmPass.isVisible()) {
            await confirmPass.fill(pass);
        }
        await this.submitButton.click();
    }

    async logout() {
        // Look for logout button in the whole page first
        const directLogout = this.page.getByRole('button', { name: /logout|sign out/i });
        if (await directLogout.isVisible()) {
            await directLogout.click();
        } else {
            // Try profile menu
            const profileMenu = this.page.getByRole('button', { name: /profile|user/i });
            await profileMenu.click();
            await this.logoutButton.click();
        }
        await this.page.waitForURL(`**${ROUTES.AUTH.SIGNIN}`);
    }
}
