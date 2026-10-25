import { test, expect } from "@playwright/test";
import { pagePractice, bookPages } from "../../book.js";
test("all lessons open; page-by-page study persists without inventing streaks", async ({
  page,
  context,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/#lesson/23/124");
  await expect(
    page.getByRole("heading", { name: "Count diptote plurals", exact: true }),
  ).toBeVisible();
  await page.goto("/#lesson/1/6");
  await expect(
    page.getByRole("tab", { name: "Study the pages" }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(page.locator('[data-mark-page="6"]')).toBeDisabled();
  const q = pagePractice(bookPages[5]);
  await page
    .locator('input[data-page-answer="6"]')
    .evaluateAll(
      (els, answer) => els.find((e) => e.value === answer).click(),
      q.correct,
    );
  await expect(page.locator(".page-feedback")).toContainText("Correct");
  await page.locator('[data-source-check="6"]').check();
  await page.locator('[data-mark-page="6"]').click();
  await expect(page.locator('[data-mark-page="6"]')).toContainText(
    "Page studied",
  );
  const s = await page.evaluate(
    () => JSON.parse(localStorage.getItem("arabic-journey-v2")).data,
  );
  expect(s.pages["6"]).toBeTruthy();
  expect(s.activity).toEqual({});
  expect(s.completed).toEqual({});
  await page.reload();
  await expect(page.locator('[data-mark-page="6"]')).toContainText(
    "Page studied",
  );
  await page
    .getByRole("button", { name: "Next page →", exact: true })
    .first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Ask, confirm, correct", exact: true }),
  ).toBeVisible();
  await page.locator(".book-page-select").first().selectOption("12");
  await expect(
    page.getByRole("heading", {
      name: "Read without the pictures",
      exact: true,
    }),
  ).toBeVisible();
  await page.locator('[data-view="book"]').first().click();
  await page.locator(".page-directory summary").click();
  await expect(page.locator(".page-tile")).toHaveCount(128);
  await page.locator('.page-tile[data-book-page="128"]').click();
  await expect(
    page.getByRole("heading", { name: "Finish with an honest record" }),
  ).toBeVisible();
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await context.setOffline(true);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Finish with an honest record" }),
  ).toBeVisible();
  await context.setOffline(false);
  expect(errors).toEqual([]);
});
test("install banner is visible immediately and supports dismissal and guidance", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".install-nudge")).toBeVisible();
  await page.locator('.install-nudge [data-action="install"]').click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText(
    "Installation is handled by your browser",
  );
  await page.getByRole("button", { name: "Got it", exact: true }).click();
  await page.locator("[data-dismiss-install]").click();
  await expect(page.locator(".install-nudge")).toHaveCount(0);
  await page.reload();
  await expect(page.locator(".install-nudge")).toHaveCount(0);
});
test("available native install prompt is invoked on the user click", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => {
    window.installCalls = 0;
    const e = new Event("beforeinstallprompt");
    e.prompt = () => {
      window.installCalls++;
      return Promise.resolve();
    };
    e.userChoice = Promise.resolve({ outcome: "accepted" });
    window.dispatchEvent(e);
  });
  await page.locator('.install-nudge [data-action="install"]').click();
  expect(await page.evaluate(() => window.installCalls)).toBe(1);
  await page.evaluate(() => window.dispatchEvent(new Event("appinstalled")));
  await expect(page.locator(".install-nudge")).toHaveCount(0);
});
test("iPhone installation uses Safari Share instructions", async ({
  browser,
}) => {
  const context = await browser.newContext({
    baseURL: process.env.TEST_URL || "http://localhost:4173",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1",
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/");
  await page.locator('.install-nudge [data-action="install"]').click();
  await expect(page.getByRole("dialog")).toContainText("On iPhone or iPad");
  await expect(page.getByRole("dialog")).toContainText("Share");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await context.close();
});
