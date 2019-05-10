import { browser, ElementFinder, $, promise } from 'protractor';

export async function checkUrls(url: string) {
  return browser.wait(() => {
    return browser.getCurrentUrl().then((currentUrl: string) => {
      return currentUrl.indexOf(url) > -1;
    });
  }, 1000, 'url has not changed');
}

export function findElementByName(name: string, cssSelector?: string): ElementFinder {
  if (!cssSelector) {
    cssSelector = '';
  }
  return $(`[name=${name}] ${cssSelector}`);
}

/*Devido a um equivoco do selenium, getText de input element sempre retorna vazio
  FAQ https://github.com/angular/protractor/blob/master/docs/faq.md */
export function getInputText(inputElement: ElementFinder): promise.Promise<string> {
  return inputElement.getAttribute('value');
}
