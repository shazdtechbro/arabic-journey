import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("landing and lesson accessibility", async ({ page }) => {
  await page.goto("/");
  let r = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(
    r.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  await page.locator('[data-view="learn"]').first().click();
  await page.locator('[data-day="1"]').click();
  r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(
    r.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
});
