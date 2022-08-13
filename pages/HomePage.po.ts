import {BasePageObject} from "./BasePageObject";
import {browser, by, element, ElementFinder} from "protractor";

export class HomePage extends BasePageObject {
    private aboutUsNavButton = element(by.cssContainingText('span[class="header--nav-label"]', 'About Us'));
    private careersNavButton = element(by.cssContainingText('span[class="header--nav-label"]', 'Careers'));
    private currentOpeningsNavButton = element(by.css('a[href="/careers#current-openings"]'))
    private metaDetailsCategories = element.all(by.css('section > ul > li > strong'));

    public async clickAboutUsNavButton(): Promise<void> {
        await this.waitForElementToBeClickableAndClick(this.aboutUsNavButton);
    }

    public async getMetaDetailsCategoriesContent(): Promise<Array<string>> {
        return this.metaDetailsCategories.map(async (category) => {
            return category.getText();
        });
    }

    public async clickCurrentOpenings(): Promise<void> {
        await this.hoverOverElement(this.careersNavButton);
        await this.waitForElementToBeClickableAndClick(this.currentOpeningsNavButton);
    }
}