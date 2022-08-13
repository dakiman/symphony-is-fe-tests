import BasePageObject from "./BasePageObject";
import {by, element} from "protractor";

export default class NavbarComponent extends BasePageObject {
    private aboutUsNavButton = element(by.cssContainingText('span[class="header--nav-label"]', 'About Us'));
    private careersNavButton = element(by.cssContainingText('span[class="header--nav-label"]', 'Careers'));
    private currentOpeningsNavButton = element(by.css('a[href="/careers#current-openings"]'))

    public async clickAboutUsNavButton(): Promise<void> {
        await this.waitForElementToBeClickableAndClick(this.aboutUsNavButton);
    }

    public async clickCurrentOpenings(): Promise<void> {
        await this.hoverOverElement(this.careersNavButton);
        await this.waitForElementToBeClickableAndClick(this.currentOpeningsNavButton);
    }
}