import { Page, Locator, expect } from "@playwright/test";

export class ProductDetailPage {
  private page: Page;
  private buyItNowButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buyItNowButton = page.locator('text="Buy It Now"').first();
  }

  async clickBuyItNow() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.buyItNowButton.click();
  }

  async getRelatedProductTitles() {
    const titles = this.page.locator(
      "//h2[@class='EF85']/following::h3[contains(@class, '_6rYN')]"
    );

    const count = await titles.count();
    const titleList: string[] = [];

    for (let i = 0; i < count; i++) {
      titleList.push(await titles.nth(i).innerText());
    }

    return titleList;
  }

  async verifyCategory(category: string) {
    const titles = await this.getRelatedProductTitles();

    for (const title of titles) {
      expect(title.toLowerCase()).toContain(category.toLowerCase());
    }
  }

  async countRelatedProducts() {
    const relatedProducts = await this.getRelatedProductTitles();
    return relatedProducts.length;
  }
}
