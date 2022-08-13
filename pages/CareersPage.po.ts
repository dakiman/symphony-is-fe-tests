import {BasePageObject} from "./BasePageObject";
import {by, element, ElementFinder} from "protractor";
import JobOpening from "../types/JobOpening";

export class CareersPage extends BasePageObject {
    //TODO review selector
    private allJobOpeningCards = element.all(by.css('li[class="currentOpenings--job  "]'));
    private jobOpeningContainer = element(by.className('currentOpenings--jobs'));

    public async getJobOpeningsCount(): Promise<number> {
        await this.waitForJobsToBeVisible();
        return this.allJobOpeningCards.count();
    }

    public async getAllJobsTitleAndLocation(): Promise<Array<JobOpening>> {
        await this.waitForJobsToBeVisible();
        return this.allJobOpeningCards.map(async (job) => {
            let title = await job.element(by.className('currentOpenings--job-title')).getText();
            let location = await job.element(by.className('currentOpenings--job-locationWrapper')).getText();
            return {title, location};
        })
    }

    private async waitForJobsToBeVisible(): Promise<void> {
        await this.waitForElementToBeVisible(this.jobOpeningContainer);
    }
}