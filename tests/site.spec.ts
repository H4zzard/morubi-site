import { expect, test } from "@playwright/test";

const routes = ["/", "/produto", "/live", "/intelligence", "/manager", "/coach", "/integracoes", "/seguranca", "/precos", "/demo", "/privacidade", "/termos", "/cookies"];

async function rejectOptionalCookies(page: import("@playwright/test").Page) {
  const button = page.getByRole("button", { name: "Recusar não essenciais" });
  if (await button.isVisible().catch(() => false)) {
    await button.evaluate(element => (element as HTMLButtonElement).click());
    await expect(page.getByRole("dialog", { name: "Aviso de cookies" })).toBeHidden();
  }
}

test("all public routes render without runtime errors", async ({ page }) => {
  test.setTimeout(90_000);
  const errors: string[] = [];
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", error => errors.push(error.message));
  for (const route of routes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), route).toBeLessThan(400);
    await expect(page.locator("body"), route).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("homepage is responsive and interactive", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await rejectOptionalCookies(page);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("A Morubi consegue");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: testInfo.outputPath("hero.png") });
  await page.getByRole("button", { name: /Marina Alves/ }).click();
  await expect(page.getByRole("dialog", { name: /Performance de Marina Alves/ })).toBeVisible();
  await page.getByRole("button", { name: "Fechar" }).click();
  await page.locator("#faq").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "A Morubi substitui meu CRM?" }).click();
  await expect(page.getByText(/camada de inteligência sobre a operação/)).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("homepage.png"), fullPage: true });
  expect(errors).toEqual([]);
});

test("demo exposes the complete narrative", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/demo", { waitUntil: "networkidle" });
  await rejectOptionalCookies(page);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Uma conversa alimenta todo o sistema");
  await page.getByRole("button", { name: "Ir para Manager" }).click();
  await expect(page.getByText("Agora imagine isso acontecendo em todas.")).toBeVisible();
});

test("homepage stays within every supported viewport", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One Chromium project is enough for the viewport matrix.");
  const widths = [375, 390, 430, 768, 1024, 1280, 1440, 1920];
  await page.setViewportSize({ width: widths[0], height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  await rejectOptionalCookies(page);

  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 768 ? 900 : 1000 });
    await page.waitForTimeout(100);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${width}px viewport`).toBeLessThanOrEqual(1);
  }

  await page.setViewportSize({ width: 1280, height: 900 });
  const flow = page.getByTestId("system-flow").first();
  await flow.scrollIntoViewIfNeeded();
  await expect(flow).toBeInViewport();
  await page.waitForTimeout(500);
  const alignment = await flow.evaluate(element => {
    const children = [...element.children].map(child => child.getBoundingClientRect());
    const bounds = element.getBoundingClientRect();
    return {
      flowCenter: (Math.min(...children.map(rect => rect.left)) + Math.max(...children.map(rect => rect.right))) / 2,
      containerCenter: bounds.left + bounds.width / 2,
    };
  });
  expect(Math.abs(alignment.flowCenter - alignment.containerCenter)).toBeLessThanOrEqual(2);
  await flow.screenshot({ path: testInfo.outputPath("system-flow-desktop.png") });

  await page.setViewportSize({ width: 375, height: 900 });
  await flow.scrollIntoViewIfNeeded();
  const mobileOffsets = await flow.locator("span").evaluateAll(elements => {
    const parent = elements[0]?.parentElement?.getBoundingClientRect();
    if (!parent) return [];
    const center = parent.left + parent.width / 2;
    return elements.map(element => {
      const rect = element.getBoundingClientRect();
      return Math.abs(rect.left + rect.width / 2 - center);
    });
  });
  expect(Math.max(...mobileOffsets)).toBeLessThanOrEqual(2);
  await flow.screenshot({ path: testInfo.outputPath("system-flow-mobile.png") });
});

test("live product sequence settles without reopening", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Animation behavior only needs one browser project.");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "networkidle" });
  await rejectOptionalCookies(page);
  const firstDemo = page.locator("main").getByText("Pergunta sugerida").first();
  await expect(firstDemo).toBeVisible({ timeout: 5_000 });
  await page.waitForTimeout(5_000);
  await expect(firstDemo).toBeVisible();
  await expect(page.getByRole("button", { name: "Preço", pressed: true }).first()).toBeVisible();
});
