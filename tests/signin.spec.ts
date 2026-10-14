import { test, expect } from "@playwright/test";
import "dotenv/config";
import { SignIn } from "../pages/signin";
import users from "../test-data/users.json";

test("valid login redirects to dashboard", async ({ page }) => {
  const signIn = new SignIn(page);
  await signIn.goto();
  await signIn.login(process.env.Email!, process.env.PASSWORD!);
  await signIn.expectLoggedIn();
});

test("Invalid login shows error", async ({ page }) => {
  const signin = new SignIn(page);
  await signin.goto();
  await signin.login(
    users.invalidLogins[0].email,
    users.invalidLogins[0].password,
  );
  await signin.expectLoginError();
});
