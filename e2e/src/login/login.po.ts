import { browser, $, ElementFinder } from 'protractor';

export class LoginPage {
    async navigateTo() {
        await browser.get('http://localhost:4200/login');
    }

    getLoginInput(): ElementFinder {
        return $('[name=login] input');
    }

    getPaswordInput(): ElementFinder {
        return $('[name=password] input');
    }

    getButtonLogin(): ElementFinder {
        return $('thf-button button');
    }

    async doLogin(login: string, password: string) {
        await this.getLoginInput().sendKeys(login);
        await this.getPaswordInput().sendKeys(password);
        await this.getButtonLogin().click();
    }
}