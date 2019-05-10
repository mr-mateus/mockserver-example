import { browser, $, ElementFinder } from 'protractor';

export class HomePage {
    async navigateTo() {
        await browser.get('http://localhost:4200/home');
    }    

    getTotalOfParticipants() {
        return $('#total-of-participants');
    }

    getWithoutParticipants() {
        return $('#without-participants');
    }
}