import { FacilityType, PermitStatus } from "@/types/enums";
import { expect, test } from "./setup";

test.describe("Legend", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load the legend", async ({ page }) => {
    await expect(page.locator("#legend")).toBeVisible();
  });

  test("should display legend items", async ({ page }) => {
    const legendTypeItems = page.locator("#legend").locator(".legend-type-item");
    const legendStatusItems = page.locator("#legend").locator(".legend-status-item");

    await expect(legendTypeItems).toHaveCount(Object.values(FacilityType).length);
    await expect(legendStatusItems).toHaveCount(Object.values(PermitStatus).length);
  });

  test("should toggle type filter on click", async ({ page }) => {
    const legendTypeItems = page.locator("#legend").locator(".legend-type-item");

    for (let i = 0; i < Object.values(FacilityType).length; i++) {
      const item = legendTypeItems.nth(i);
      const initialOpacity = await item.evaluate((el) => getComputedStyle(el).opacity);

      await item.click();
      const toggledOpacity = await item.evaluate((el) => getComputedStyle(el).opacity);
      expect(toggledOpacity).not.toBe(initialOpacity);

      await item.click();
      const revertedOpacity = await item.evaluate((el) => getComputedStyle(el).opacity);
      expect(revertedOpacity).toBe(initialOpacity);
    }
  });
});
