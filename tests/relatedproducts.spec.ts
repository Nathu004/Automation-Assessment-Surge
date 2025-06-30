import { expect, test } from "@playwright/test";
import { LandingPage } from "../pages/landingPage";
import { ProductDetailPage } from "../pages/productDetailPage";

test.describe("ebay QA Assessment", () => {
  let landingPage: LandingPage;
  let productDetailPage: ProductDetailPage;

  test.beforeAll(async () => {});

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    productDetailPage = new ProductDetailPage(page);

    await test.step("Go to ebay", async () => {
      await page.goto("/");
    });
  });

  test("Search product", async () => {
    await landingPage.searchProduct("Wallet");
    await landingPage.clickOnSearchBtn();
  });

  test("Search and click on first product", async () => {
    await test.step("Search of the product", async () => {
      await landingPage.searchProduct("Wallet");
      await landingPage.clickOnSearchBtn();
    });

    await test.step("Click on first product and verify first product is opend", async () => {
      const productPage = await landingPage.clickOnFirstProduct();
      const detailPage = await new ProductDetailPage(productPage);
      await detailPage.clickBuyItNow();
    });
  });

  test("Verify related products in same category", async () => {
    await test.step("Search of the product", async () => {
      await landingPage.searchProduct("Wallet");
      await landingPage.clickOnSearchBtn();
    });

    const productPage = await landingPage.clickOnFirstProduct();

    const detailPage = await new ProductDetailPage(productPage);

    await test.step("Verify all the products in same category", async () => {
      await detailPage.verifyCategory("Wallet");
    });
  });

  test("Verify less than 6 related products are shown ", async () => {
    await test.step("Search of the product", async () => {
      await landingPage.searchProduct("Wallet");
      await landingPage.clickOnSearchBtn();
    });

    await test.step("Verify if there are less than or equal 6 related products", async () => {
      const productPage = await landingPage.clickOnFirstProduct();
      const detailPage = new ProductDetailPage(productPage);

      const count = await detailPage.countRelatedProducts();

      expect(count).toBeLessThanOrEqual(6);
    });
  });
});
