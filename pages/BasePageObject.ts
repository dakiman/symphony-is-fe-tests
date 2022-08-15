import {browser, ElementFinder, ExpectedConditions} from "protractor";

export default abstract class BasePageObject {

    protected async waitForElementToBeClickableAndClick(selector: ElementFinder): Promise<void> {
        await browser.wait(ExpectedConditions.elementToBeClickable(selector), 10000,
            `Element ${selector.locator().value} was not CLICKABLE within 10 seconds...`
        );
        await selector.click();
    }

    protected async waitForElementToBeVisible(selector: ElementFinder): Promise<void> {
        await browser.wait(ExpectedConditions.visibilityOf(selector), 10000,
            `Element ${selector.locator().value} was not VISIBLE within 10 seconds...`
        );
    }

    protected async hoverOverElement(selector: ElementFinder): Promise<void> {
        await browser.actions().mouseMove(selector).perform();
    }

}