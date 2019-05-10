import { HomePage } from './home.po';
import { IHttpRequest } from '../utils/IHttpRequest';
import { IHttpResponse } from '../utils/IHttpResponse';
import { mockResponseWithDefaultHeaders, clearExpectation } from '../utils/mockServerClientUtil';
import { browser } from 'protractor';

const homePage: HomePage = new HomePage();

describe('home', () => {
    it('deve pedir pra contratar nóis', async () => {
        const request: IHttpRequest = {
            method: 'GET',
            path: '/api/users/total'
        };

        const response: IHttpResponse = {
            statusCode: 200,
            body: '33'
        };

        await clearExpectation('/api/users/total');

        await mockResponseWithDefaultHeaders(request, response);

        await homePage.navigateTo();

        expect(await homePage.getWithoutParticipants().isPresent()).toBeFalsy();
        expect(await homePage.getTotalOfParticipants().isDisplayed()).toBeTruthy();
    });

    it('deve mostrar o total de pessoas da suíte logisticaf', async () => {
        const request: IHttpRequest = {
            method: 'GET',
            path: '/api/users/total'
        };

        const response: IHttpResponse = {
            statusCode: 200,
            body: '0'
        };

        await clearExpectation('/api/users/total');

        await mockResponseWithDefaultHeaders(request, response);

        await homePage.navigateTo();

        expect(await homePage.getTotalOfParticipants().isPresent()).toBeFalsy();
        expect(await homePage.getWithoutParticipants().isDisplayed()).toBeTruthy();
    });
});
