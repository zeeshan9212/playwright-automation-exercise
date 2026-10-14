// import { test, expect } from "@playwright/test";

// test("has title", async ({ page }) => {
//   await page.goto("https://www.automationexercise.com/login");

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Automation Exercise/);
// });

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" }),
//   ).toBeVisible();
// });

// test("successful signin with correct credentials", async ({ page }) => {
//   await page.goto("https://www.automationexercise.com/login");

//   const loginForm = page.locator("form").filter({ hasText: "Login" });
//   const signinEmail = page
//     .locator("form")
//     .filter({ hasText: "Login" })
//     .getByPlaceholder("Email Address");

//   const signinpassword = page
//     .locator("form")
//     .filter({ hasText: "Login" })
//     .getByPlaceholder("Password");

//   await expect(signinEmail).toBeVisible();
//   await expect(signinpassword).toBeVisible();

//   await signinEmail.fill("zeeshansharif92@gmail.com");
//   await signinpassword.fill("TEst123");

//   console.log("signin email:", await signinEmail.inputValue());
//   await page.getByRole("button", { name: "Login" }).click();

//   await expect(page.getByText("Logout")).toBeVisible();

//   await expect(
//     page.getByText("Full-Fledged practice website").first(),
//   ).toBeVisible();
//   await expect(page.getByText("Logged in as")).toBeVisible();
// });

import { test, expect } from "@playwright/test";
import "dotenv/config";
import { SignIn } from "../pages/signin";
import users from "../test-data/users.json";

test("valid login", async ({ page }) => {
  const signIn = new SignIn(page);
  await signIn.goto();
  await signIn.login(process.env.Email!, process.env.PASSWORD!);
  await signIn.expectLoggedIn();
});

// test("wrong password shows error", async ({ page }) => {
//   const loginPage = new SignIn(page);
//   await loginPage.goto();
//   await loginPage.login(
//     users.wrongPassword.email,
//     users.wrongPassword.password,
//   );
//   await expect(page.getByText(users.errorMessage)).toBeVisible();
// });

test("Invalid login", async ({ page }) => {
  const signin = new SignIn(page);
  await signin.goto();
  await signin.login(
    users.invalidLogins[0].email,
    users.invalidLogins[0].password,
  );
  await signin.expectLoginError();
});
