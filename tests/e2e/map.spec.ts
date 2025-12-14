import { FacilityType, PermitStatus } from "@/types/enums";
import { expect, test } from "./setup";
import permits from "../fixtures/permits.json";

test.describe("Map", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("canvas.maplibregl-canvas")).toBeVisible();
  });

  test("should load the map", async ({ page }) => {
    await expect(page.locator("canvas.maplibregl-canvas")).toBeVisible();
  });

  test("should display navigation controls", async ({ page }) => {
    await expect(page.locator("button.maplibregl-ctrl-zoom-in")).toBeVisible();
    await expect(page.locator("button.maplibregl-ctrl-zoom-out")).toBeVisible();
  });

  test("should display permit markers", async ({ page }) => {
    const markers = page.locator(".maplibregl-marker");
    await expect(markers.first()).toBeVisible();
    // Fixture has 6 permits
    expect(await markers.count()).toBe(permits.length);
  });

  test("should display different marker types", async ({ page }) => {
    const markers = page.locator(".maplibregl-marker");
    await expect(markers.first()).toBeVisible();

    let foundTypes = 0;
    for (const type of Object.values(FacilityType)) {
      const count = await markers.locator(`.facility-type-${type}`).count();
      if (count > 0) foundTypes++;
    }

    expect(foundTypes).toBe(Object.values(FacilityType).length);
  });

  test("should display markers with different statuses", async ({ page }) => {
    const markers = page.locator(".maplibregl-marker");
    await expect(markers.first()).toBeVisible();

    let foundStatuses = 0;
    for (const status of Object.values(PermitStatus)) {
      const count = await markers.locator(`.permit-status-${status}`).count();
      if (count > 0) foundStatuses++;
    }

    expect(foundStatuses).toBe(Object.values(PermitStatus).length);
  });
});
