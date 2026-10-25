import { test, expect } from "@playwright/test";
import { questions } from "../../assessment.js";
async function answer(page, n, wrong = false) {
  if (n <= 23)
    await page.getByRole("tab", { name: "Concepts & assessment" }).click();
  for (const [i, q] of questions(n).entries()) {
    if (q.type === "fill")
      await page.locator(`#answer-${i}`).fill(wrong ? "wrong" : q.correct);
    else
      await page.locator(`input[name="q${i}"]`).evaluateAll(
        (els, { correct, wrong }) => {
          const el = els.find((e) =>
            wrong ? e.value !== correct : e.value === correct,
          );
          el.click();
        },
        { correct: q.correct, wrong },
      );
  }
}
test("complete journey, retries, persistence, graduation, mobile, offline", async ({
  page,
  context,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Your first 30 days/ }),
  ).toBeVisible();
  await page.locator('[data-action="start"]').first().click();
  await page.getByLabel("What should we call you?").fill("Sanni Test");
  await page.getByLabel("Why Arabic?").fill("Understand the grammar");
  await page.getByLabel("Daily study time").fill("18:00");
  await page
    .getByRole("button", { name: "Start learning →", exact: true })
    .click();
  await expect(page.getByText(/As-salāmu/)).toBeVisible();
  await page.locator('[data-day="1"]').first().click();
  await page.getByRole("tab", { name: "Concepts & assessment" }).click();
  await page.locator('[data-word="0"]').click();
  await page.locator('[data-word="1"]').click();
  await expect(page.locator("#word-feedback")).toContainText("Correct");
  await answer(page, 1, true);
  await page.locator('[data-action="grade"]').click();
  await expect(page.locator("#quiz")).toContainText("0 / 5");
  await page.locator('[data-action="retry"]').click();
  await answer(page, 1);
  await page.locator('[data-action="grade"]').click();
  await expect(page.locator("#quiz")).toContainText("5 / 5");
  await page.reload();
  await expect(page.locator(".lessonhead").first()).toContainText("LESSON 1");
  await page.locator('[data-view="dashboard"]').first().click();
  for (let n = 2; n <= 30; n++) {
    await page.locator(`[data-day="${n}"]`).first().click();
    await expect(page.locator(".lessonhead").first()).toContainText(
      n <= 23 ? "LESSON " + n : "DAY " + String(n).padStart(2, "0"),
    );
    await answer(page, n);
    await page.locator('[data-action="grade"]').click();
    await expect(page.locator("#quiz")).toContainText("This day is saved");
    if (n < 30) await page.locator('[data-view="dashboard"]').first().click();
  }
  await page.locator('[data-view="certificate"]').last().click();
  await expect(page.locator(".certname")).toHaveText("Sanni Test");
  await expect(page.locator(".cert")).toContainText("1");
  const downloadPromise = page.waitForEvent("download");
  await page.locator('[data-action="png"]').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("arabic-journey-certificate.png");
  await download.saveAs("test-results/certificate.png");
  await page.pdf({
    path: "test-results/certificate.pdf",
    printBackground: true,
  });
  await page.screenshot({
    path: "test-results/graduation.png",
    fullPage: true,
  });
  await page.locator('[data-view="progress"]').first().click();
  const exportPromise = page.waitForEvent("download");
  await page.locator('[data-action="export"]').click();
  const backup = await exportPromise;
  await backup.saveAs("test-results/backup.json");
  await page.locator("#profile-name").fill("Renamed Learner");
  await page.locator('[data-action="save-name"]').click();
  page.once("dialog", (d) => d.accept());
  await page.locator("#import-file").setInputFiles("test-results/backup.json");
  await expect(page.locator("#profile-name")).toHaveValue("Sanni Test");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('[data-view="dashboard"]').last().click();
  await expect(page.locator(".mobilebar")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".status-offline")).toContainText("Offline");
  await page.locator('[data-view="learn"]').last().click();
  await page.locator('[data-day="23"]').click();
  await expect(
    page.getByRole("heading", { name: "Diptotes in the genitive" }),
  ).toBeVisible();
  expect(
    await page
      .locator(".arabic")
      .first()
      .evaluate((e) => getComputedStyle(e).fontFamily),
  ).toContain("Noto Naskh Arabic");
  await context.setOffline(false);
  expect(errors).toEqual([]);
});
test("keyboard, open lessons and navigation", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip")).toBeFocused();
  await page.locator('[data-view="learn"]').first().click();
  await expect(page.locator('[data-day="2"]')).toBeEnabled();
  await expect(page.locator('[data-day="30"]')).toBeEnabled();
  await page.locator('[data-day="1"]').click();
  await page.getByRole("tab", { name: "Concepts & assessment" }).click();
  await expect(page.locator('[data-action="grade"]')).toBeDisabled();
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "30 days. A stronger foundation." }),
  ).toBeVisible();
});
