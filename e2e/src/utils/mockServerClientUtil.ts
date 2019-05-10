import { IExpectation } from './IExpectations';
import { IHttpRequest } from './IHttpRequest';
import { IHttpResponse } from './IHttpResponse';

const mockServerClient = require('mockserver-client').mockServerClient;

export async function mockResponseWithDefaultHeaders(request: IHttpRequest, response: IHttpResponse): Promise<boolean> {
  return mockServerClient('localhost', 1080).mockAnyResponse({
    'httpRequest': request,
    'httpResponse': response
  }).then(() => {
    console.log('Criado mockResponseWithDefaultHeaders');
    return Promise.resolve(true);
  }, (error: any) => {
    console.log('Algo deu errado - mockResponseWithDefaultHeaders', error);
    return Promise.reject(false);
  });
}

export function mockMultipleResponseWithDefaultHeaders(expectations: Array<IExpectation>): Promise<boolean> {
  return mockServerClient('localhost', 1080).mockAnyResponse(expectations).then(() => {
    console.log('Criado mockResponseWithDefaultHeaders');
    return Promise.resolve(true);
  }, (error: any) => {
    console.log('Algo deu errado - mockResponseWithDefaultHeaders', error);
    return Promise.reject(false);
  });
}

export function mockResponseWithHeaders(request: IHttpRequest, response: IHttpResponse, headers): Promise<boolean> {
  return mockServerClient('localhost', 1080).setDefaultHeaders(headers).mockAnyResponse({
    'httpRequest': request,
    'httpResponse': response
  }).then(() => {
    console.log('Criado mockResponseWithHeaders');
    return Promise.resolve(true);
  }, (error: any) => {
    console.log('Algo deu errado - mockResponseWithHeaders', error);
    return Promise.reject(false);
  });
}

export function resetAllRequests(): Promise<boolean> {
  return mockServerClient('localhost', 1080)
    .reset().then(() => {
      console.log('Mock limpo - resetAllRequests feito com sucesso');

      return Promise.resolve(true);
    }, (error: any) => {
      console.log('Algo deu errado - resetAllRequests', error);
      return Promise.reject(false);

    });
}

export function retrieveAllActiveExpectations() {
  return mockServerClient('localhost', 1080)
    .retrieveActiveExpectations({})
    .then(activeExpectations => {

      console.log(JSON.stringify(activeExpectations));
    },
      (error) => {
        console.log(error);
      }
    );
}

export function clearExpectation(path: string, method?: string) {
  let expectation = {};
  if (method) {
    expectation = {
      path: path,
      method: method
    }
  } else {
    expectation = {
      path: path
    }
  }

  return mockServerClient('localhost', 1080)
    .clear(expectation)
    .then(() => {
      console.log(`Path: ${path} limpado!`);
    },
      (error) => {
        console.log(error);
      }
    );
}
