import { expect , Locator, Page } from "@playwright/test";

export class LandingPage{
  private page: Page;

  private searchfield: Locator;
  private searchBtn: Locator;
  private firstProduct: Locator;
 
  constructor(page: Page){
    this.page=page;

    this.searchfield = page.getByRole('combobox', { name: 'Search for anything' });
    this.searchBtn = page.getByRole('button', { name: 'Search', exact: true });
    this.firstProduct = page.locator("//span[contains(text(), 'wallet')]");
  };

  
  async searchProduct(productName: string) {
    await this.searchfield.fill(productName);
  };

  async clickOnSearchBtn() {
    await this.searchBtn.click();
    await this.page.waitForTimeout(3000);
  };

  async clickOnFirstProduct() {
    const context = this.page.context();
    const newTab = context.waitForEvent('page');
    await this.firstProduct.nth(1).click();
    const newPage = await newTab;
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  };

  
}
