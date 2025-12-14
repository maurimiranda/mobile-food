import { test as base } from "@playwright/test";
import permits from "../fixtures/permits.json";

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route("**/resource/rqzj-sfat.json", (route) => {
      route.fulfill({ json: permits });
    });
    await use(page);
  },
});

export { expect } from "@playwright/test";
