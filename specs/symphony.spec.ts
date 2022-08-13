import {browser} from "protractor"
import NavbarComponent from "../pages/NavbarComponent";
import BrowserUtils from "../utils/BrowserUtils";
import CareersPage from "../pages/CareersPage.po";
import JobOpening from "../types/JobOpening";
import {readFileAsJson, writeToFile} from "../utils/FileUtils";
import AboutUsPage from "../pages/AboutUsPage.po";


describe('Symphony test suite', async () => {
    let navbarComponent: NavbarComponent = new NavbarComponent();
    let careersPage: CareersPage = new CareersPage();
    let aboutUsPage: AboutUsPage = new AboutUsPage();
    let expectedMetaDetailsCategories = readFileAsJson('./data/metaDetailsCategories.json');

    //window maximize is defined in protractor.conf.ts and is done before every execution
    it('Opens the home page and maximizes window', async () => {
        await browser.get('https://symphony.is/');
    })

    it('Navigates to `About us` page and verifies the sidebar items', async () => {
        await navbarComponent.clickAboutUsNavButton();
        await BrowserUtils.waitUntilUrlContains('about-us');

        let metaDetailsCategories = await aboutUsPage.getMetaDetailsCategoriesContent();

        expect(metaDetailsCategories).toEqual(expectedMetaDetailsCategories);
    })

    it('Counts the number of open positions', async () => {
        await navbarComponent.clickCurrentOpenings();
        await BrowserUtils.waitUntilUrlContains('current-openings');

        let jobCount = await careersPage.getJobOpeningsCount();
        //TODO review
        expect(jobCount).toEqual(78);
    })

    it('Retrieves all job openings titles and locations', async () => {
        await navbarComponent.clickCurrentOpenings();
        await BrowserUtils.waitUntilUrlContains('current-openings');

        let jobOpenings: Array<JobOpening> = await careersPage.getAllJobsTitleAndLocation();
        writeToFile('./output/jobOpenings.txt', jobOpenings.map(job => `${job.title}, ${job.location}`));
    })

})