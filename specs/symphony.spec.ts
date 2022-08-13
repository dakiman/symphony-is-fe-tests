import {browser} from "protractor"
import {HomePage} from "../pages/HomePage.po";
import BrowserUtils from "../utils/BrowserUtils";
import {CareersPage} from "../pages/CareersPage.po";
import JobOpening from "../types/JobOpening";
import {writeToFile} from "../utils/FileUtils";


describe('Symphony test suite', () => {
    let homePage: HomePage = new HomePage();
    let careersPage: CareersPage = new CareersPage();
    let expectedMetaDetailsCategories = [
        'HQ',
        'Founded',
        'Size',
        'Consulting Offices',
        'Engineering Hubs',
        'Clients'
    ];

    //window maximize is defined in protractor.conf.ts and is done before every test
    it('Opens the home page and maximizes window', async () => {
        await browser.get('https://symphony.is/');
    })

    it('Navigates to `About us` page and verifies the sidebar items', async () => {
        await homePage.clickAboutUsNavButton();
        await BrowserUtils.waitUntilUrlContains('about-us');

        let metaDetailsCategories = await homePage.getMetaDetailsCategoriesContent();

        expect(metaDetailsCategories).toEqual(expectedMetaDetailsCategories);
    })

    it('Counts the number of open positions', async () => {
        await homePage.clickCurrentOpenings();
        await BrowserUtils.waitUntilUrlContains('current-openings');

        let jobCount = await careersPage.getJobOpeningsCount();
        expect(jobCount).toEqual(78);
    })

    it('Retrieves all job openings titles and locations', async () => {
        await homePage.clickCurrentOpenings();
        await BrowserUtils.waitUntilUrlContains('current-openings');

        let jobOpenings: Array<JobOpening> = await careersPage.getAllJobsTitleAndLocation();
        writeToFile('./output/jobOpenings.txt', jobOpenings.map(job => `${job.title}, ${job.location}`));
    })

})