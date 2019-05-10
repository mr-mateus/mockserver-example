import { IHttpRequest } from '../utils/IHttpRequest';
import { IHttpResponse } from '../utils/IHttpResponse';
import { mockResponseWithDefaultHeaders, clearExpectation } from '../utils/mockServerClientUtil';
import { LoginPage } from './login.po';
import { browser } from 'protractor';

const loginPage: LoginPage = new LoginPage();

describe('login', () => {
    it('deve realizar o login e redirecionar para a página Home', async () => {
        const user = {
            login: 'teste',
            password: 'teste'
        };
        await loginPage.navigateTo();
        const request: IHttpRequest = {
            method: 'POST',
            path: '/api/login',
            body: {
                type: 'JSON',
                json: JSON.stringify(user)
            }
        };

        const response: IHttpResponse = {
            statusCode: 200
        };

        await clearExpectation('/api/login');

        await mockResponseWithDefaultHeaders(request, response);
        await loginPage.doLogin(user.login, user.password);

        expect(await browser.getCurrentUrl()).toEqual('http://localhost:4200/home');
        await browser.sleep(5000);
    });

    it('não deve realizar o login caso não tenha sido informado login e senha', async () => {
        await loginPage.navigateTo();
        await loginPage.getButtonLogin().click();

        expect(await browser.getCurrentUrl()).toEqual('http://localhost:4200/login');
        await browser.sleep(5000);
    });
});
