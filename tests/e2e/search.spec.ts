import { PermitStatus } from "@/types/enums";
import { expect, test } from "./setup";
import permits from "../fixtures/permits.json";

test.describe("Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load the search bar", async ({ page }) => {
    await expect(page.locator("#search")).toBeVisible();
  });

  test("should show search results with expected data", async ({ page }) => {
    const searchInput = page.locator("#search input[type='text']");
    await expect(searchInput).toBeVisible();

    // Search for "taco" - should match "Taco Truck SF" from fixture
    const tacoPermit = permits.find((p) => p.applicant.toLowerCase().includes("taco"));
    await searchInput.fill("taco");
    await searchInput.focus();

    const resultsList = page.locator("#search ul");
    await expect(resultsList).toBeVisible();

    // Should find exactly 1 result matching "taco"
    const results = resultsList.locator("li");
    await expect(results).toHaveCount(1);

    // Verify the result contains expected data from fixture
    const firstResult = results.first();
    await expect(firstResult.locator("p", { hasText: tacoPermit!.applicant })).toBeVisible();
    await expect(firstResult.locator("p", { hasText: tacoPermit!.address })).toBeVisible();
    await expect(firstResult.locator("p", { hasText: tacoPermit!.fooditems })).toBeVisible();
    await expect(firstResult.locator("span", { hasText: tacoPermit!.status })).toBeVisible();
  });

  test("should show search results when searching by address", async ({ page }) => {
    const searchInput = page.locator("#search input[type='text']");

    // Search for "Mission" - should match permits with "Mission" in address
    const missionPermits = permits.filter((p) => p.address.toLowerCase().includes("mission"));
    await searchInput.fill("mission");
    await searchInput.focus();

    const resultsList = page.locator("#search ul");
    await expect(resultsList).toBeVisible();

    const results = resultsList.locator("li");
    await expect(results).toHaveCount(missionPermits.length);

    // Verify the first result contains expected data from fixture
    const firstResult = results.first();
    await expect(firstResult.locator("p", { hasText: missionPermits[0].applicant })).toBeVisible();
    await expect(firstResult.locator("p", { hasText: missionPermits[0].address })).toBeVisible();
    await expect(firstResult.locator("p", { hasText: missionPermits[0].fooditems })).toBeVisible();
    await expect(firstResult.locator("span", { hasText: missionPermits[0].status })).toBeVisible();
  });

  test("should show search results when searching by food items", async ({ page }) => {
    const searchInput = page.locator("#search input[type='text']");

    // Search for "pizza" - should match permits with "pizza" in fooditems
    const pizzaPermits = permits.filter((p) => p.fooditems.toLowerCase().includes("pizza"));
    await searchInput.fill("pizza");
    await searchInput.focus();

    const resultsList = page.locator("#search ul");
    await expect(resultsList).toBeVisible();

    const results = resultsList.locator("li");
    await expect(results).toHaveCount(pizzaPermits.length);

    // Verify the first result contains expected data from fixture
    const firstResult = results.first();
    await expect(firstResult.locator("p", { hasText: pizzaPermits[0].applicant })).toBeVisible();
    await expect(firstResult.locator("p", { hasText: pizzaPermits[0].address })).toBeVisible();
    await expect(firstResult.locator("p", { hasText: pizzaPermits[0].fooditems })).toBeVisible();
    await expect(firstResult.locator("span", { hasText: pizzaPermits[0].status })).toBeVisible();
  });

  test("should filter results by status", async ({ page }) => {
    const searchInput = page.locator("#search input[type='text']");

    // Search for something that matches multiple permits
    await searchInput.fill("st"); // matches Market St, Mission St, etc.
    await searchInput.focus();

    const resultsList = page.locator("#search ul");
    await expect(resultsList).toBeVisible();

    // Get initial count
    const initialCount = await resultsList.locator("li").count();
    expect(initialCount).toBeGreaterThan(1);

    // Click on APPROVED filter to toggle it off
    const approvedFilter = page.locator("#search").getByRole("button", { name: "APPROVED" });
    await approvedFilter.click();

    // Count should decrease (we have 2 APPROVED permits in fixture)
    const filteredCount = await resultsList.locator("li").count();
    expect(filteredCount).toBeLessThan(initialCount);
  });

  test("should show all status filter buttons", async ({ page }) => {
    const searchInput = page.locator("#search input[type='text']");
    await searchInput.fill("a");
    await searchInput.focus();

    // Wait for filter section to appear
    const filterSection = page.locator("#search").locator("text=Filter by Status");
    await expect(filterSection).toBeVisible();

    // Verify all status filters are present
    for (const status of Object.values(PermitStatus)) {
      await expect(page.locator("#search").getByRole("button", { name: status })).toBeVisible();
    }
  });

  test("should clear search results when clicking clear button", async ({ page }) => {
    const searchInput = page.locator("#search input[type='text']");
    await searchInput.fill("taco");
    await searchInput.focus();

    const resultsList = page.locator("#search ul");
    await expect(resultsList).toBeVisible();

    // Click clear button (the X icon)
    const clearButton = page.locator("#search button").filter({ has: page.locator("svg.h-4.w-4") });
    await clearButton.click();

    await expect(resultsList).not.toBeVisible();
    await expect(searchInput).toHaveValue("");
  });
});
