import { UsersPage } from './users.po';
import { IHttpRequest } from '../utils/IHttpRequest';
import { IHttpResponse } from '../utils/IHttpResponse';
import { mockResponseWithDefaultHeaders, clearExpectation } from '../utils/mockServerClientUtil';
import { first20, otherUsers } from './users.mock';

const usersPage: UsersPage = new UsersPage();

fdescribe('UserPage', () => {
    it('deve apresentar a lista de usuários', async () => {
        await clearExpectation('/api/users');

        const requestFirst20: IHttpRequest = {
            method: 'GET',
            path: '/api/users',
            queryStringParameters: {
                'page': ['0'],
                'size': ['20']
            }
        };

        const responseFirst20: IHttpResponse = {
            statusCode: 200,
            body: JSON.stringify({
                hasNext: true,
                items: first20
            })
        };

        await mockResponseWithDefaultHeaders(requestFirst20, responseFirst20);
        await usersPage.navigateTo();

        expect(await usersPage.getColumLines()).toEqual(20);
    });

    it('deve fazer a paginação', async () => {
        await clearExpectation('/api/users');

        const requestFirst20: IHttpRequest = {
            method: 'GET',
            path: '/api/users',
            queryStringParameters: {
                'page': ['0'],
                'size': ['20']
            }
        };

        const responseFirst20: IHttpResponse = {
            statusCode: 200,
            body: JSON.stringify({
                hasNext: true,
                items: first20
            })
        };

        await mockResponseWithDefaultHeaders(requestFirst20, responseFirst20);


        await usersPage.navigateTo();

        expect(await usersPage.getColumLines()).toEqual(20);

        const requestOthers: IHttpRequest = {
            method: 'GET',
            path: '/api/users',
            queryStringParameters: {
                'page': ['1'],
                'size': ['20']
            }
        };

        const responseOthers: IHttpResponse = {
            statusCode: 200,
            body: JSON.stringify({
                hasNext: true,
                items: otherUsers
            })
        };

        await mockResponseWithDefaultHeaders(requestOthers, responseOthers);
        await usersPage.getMoreUsers();

        expect(await usersPage.getColumLines()).toEqual(33);
    });

    fit('deve filtrar pelo nome', async () => {
        await clearExpectation('/api/users');

        const requestFilterByName: IHttpRequest = {
            method: 'GET',
            path: '/api/users',
            queryStringParameters: {
                'page': ['0'],
                'size': ['20'],
                'name': ['Elias']
            }
        };

        const responseFilterByName: IHttpResponse = {
            statusCode: 200,
            body: JSON.stringify({
                hasNext: true,
                items: [{ name: 'Elias Michalczuk Ribeiro da Silva', team: 'YMS', perfil: 'Front-End' }]
            })
        };

        await mockResponseWithDefaultHeaders(requestFilterByName, responseFilterByName);


        const requestFirst20: IHttpRequest = {
            method: 'GET',
            path: '/api/users',
            queryStringParameters: {
                'page': ['0'],
                'size': ['20']
            }
        };

        const responseFirst20: IHttpResponse = {
            statusCode: 200,
            body: JSON.stringify({
                hasNext: true,
                items: first20
            })
        };

        await mockResponseWithDefaultHeaders(requestFirst20, responseFirst20);

        await usersPage.navigateTo();

        expect(await usersPage.getColumLines()).toEqual(20);
        
        await usersPage.filterByName('Elias');
        expect(await usersPage.getColumLines()).toEqual(1);
    });
});
