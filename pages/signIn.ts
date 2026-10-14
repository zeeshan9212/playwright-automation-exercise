import { Page, Locator, expect } from "@playwright/test";
import users from "../test-data/users.json";

export class SignIn {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    const form = page.locator("form").filter({ hasText: "Login" });
    this.emailInput = form.getByPlaceholder("Email Address");
    this.passwordInput = form.getByPlaceholder("Password");
    this.loginButton = form.getByRole("button", { name: "Login" });
    this.logoutLink = page.getByRole("link", { name: /Logout/ });
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoggedIn() {
    await expect(this.logoutLink).toBeVisible();
  }

  async expectLoginError() {
    await expect(
      //exact true means message will match the exactly same text as in the users.json file
      this.page.getByText(users.messages.loginError, { exact: true }),
    ).toBeVisible();
  }
}
