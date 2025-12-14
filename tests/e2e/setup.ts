import { test } from "@playwright/test";
import permits from "../fixtures/permits.json";

test.beforeEach(async ({ page }) => {
  await page.route("**/resource/rqzj-sfat.json", (route) => {
    route.fulfill({ json: permits });
  });
});
