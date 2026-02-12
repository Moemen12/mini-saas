import { ROUTES } from '@/config/routes';
import { Page, Locator, expect } from '@playwright/test';

export class ProjectsPage {
    readonly page: Page;
    readonly projectTable: Locator;
    readonly projectRows: Locator;
    readonly createButton: Locator;
    readonly modalTitle: Locator;
    readonly assignedToSelect: Locator;

    readonly nameInput: Locator;
    readonly statusSelect: Locator;
    readonly deadlineInput: Locator;
    readonly budgetInput: Locator;
    readonly submitFormButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.projectTable = page.locator('table');
        this.projectRows = page.locator('tbody tr').filter({ hasNotText: 'No projects found' });
        this.createButton = page.getByRole('button', { name: /New Project/i });
        this.modalTitle = page.getByRole('heading', { level: 2 });
        this.assignedToSelect = page.locator('select[name="assigned_to"]');

        this.nameInput = page.locator('input[name="name"]');
        this.statusSelect = page.locator('select[name="status"]');
        this.deadlineInput = page.locator('input[name="deadline"]');
        this.budgetInput = page.locator('input[name="budget"]');
        this.submitFormButton = page.locator('button[type="submit"]');
    }

    async navigate() {
        await this.page.goto(ROUTES.PROJECTS);
    }

    async login(email: string, pass: string) {
        await this.page.waitForLoadState('networkidle');
        const currentUrl = this.page.url();
        if (currentUrl.includes(ROUTES.AUTH.SIGNIN)) {
            await this.page.fill('input[type="email"]', email);
            await this.page.fill('input[name="password"]', pass);
            await this.page.click('button[type="submit"]');
            await this.page.waitForURL(url =>
                url.pathname === ROUTES.DASHBOARD || url.pathname === ROUTES.PROJECTS,
                { timeout: 15000 }
            );
            if (this.page.url().endsWith(ROUTES.DASHBOARD)) {
                await this.page.goto(ROUTES.PROJECTS);
            }
        }
        await expect(this.projectTable).toBeVisible({ timeout: 10000 });
    }

    async openCreateModal() {
        await this.createButton.click();
    }

    async fillProjectForm(data: { name: string, status: string, deadline: string, budget: string, assignedTo?: string }) {
        await this.nameInput.fill(data.name);
        await this.statusSelect.selectOption(data.status);
        await this.deadlineInput.fill(data.deadline);
        await this.budgetInput.fill(data.budget);
        if (data.assignedTo) {
            await this.assignedToSelect.selectOption(data.assignedTo);
        }
        await this.submitFormButton.click();

        await expect(this.page.locator('role=dialog')).not.toBeVisible();
    }

    async openEditModalForProject(index: number) {
        const row = this.projectRows.nth(index);
        const menuButton = row.locator('button').filter({ hasText: /more_vert|actions/i });
        await menuButton.click();

        const editButton = this.page.locator('button, [role="menuitem"]').filter({ hasText: /edit/i });
        await editButton.first().click();
    }

    async deleteProject(index: number) {
        const row = this.projectRows.nth(index);
        const menuButton = row.locator('button').filter({ hasText: /more_vert|actions/i });
        await menuButton.click();

        const deleteButton = this.page.locator('button, [role="menuitem"]').filter({ hasText: /delete/i });

        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });

        await deleteButton.first().click();

        await this.page.waitForTimeout(1000);
    }
}
