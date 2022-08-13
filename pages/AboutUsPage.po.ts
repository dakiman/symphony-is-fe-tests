import BasePageObject from "./BasePageObject";
import {by, element} from "protractor";

export default class AboutUsPage extends BasePageObject {
    private metaDetailsCategories = element.all(by.css('section > ul > li > strong'));

    public async getMetaDetailsCategoriesContent(): Promise<Array<string>> {
        return this.metaDetailsCategories.map(async (category) => {
            return category.getText();
        });
    }

}