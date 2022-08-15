import {browser, ExpectedConditions} from "protractor";

export default class BrowserUtils {

    private static urlTimeout = 10000;

    public static async waitUntilUrlContains(urlPart: string, timeout: number = this.urlTimeout): Promise<boolean> {
        return browser.wait(ExpectedConditions.urlContains(urlPart), timeout,
            `URL didnt contain ${urlPart} after ${timeout / 1000} seconds`
        );
    }

    public static async doesUrlContain(urlPart: string): Promise<boolean> {
        return (await browser.getCurrentUrl()).includes(urlPart);
    }
}