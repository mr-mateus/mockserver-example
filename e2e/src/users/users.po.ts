import { browser, $$, $ } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class UsersPage {
    async navigateTo() {
        await browser.get('http://localhost:4200/users');
    }


    async getColumLines() {
        return await $$('thf-table tbody tr').count();
    }

    async getMoreUsers() {
        await $('thf-button button').click();
    }

    async filterByName(name: string){
        await $('.thf-page-list-filter-wrapper input').sendKeys(name);
        await $('.thf-page-list-filter-wrapper input').sendKeys(protractor.Key.ENTER);
    }
}