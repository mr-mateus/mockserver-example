import { ElementFinder, $$, $, ElementArrayFinder} from 'protractor';

export abstract class PageDefault {

  get pageHeaderTitle(): ElementFinder {
    return $('.thf-page-header-title');
  }

  get noDataText(): ElementFinder {
    return $('.thf-table-no-data span');
  }

  get showMoreButton(): ElementFinder {
    return $('thf-table div div div thf-button button.thf-button.thf-text-ellipsis');
  }

  get filter(): ElementFinder {
    return $('[name=model]');
  }

  getTableLines(): ElementArrayFinder {
    return $$('thf-table table tbody tr');
  }
  getTableLine(line: number): ElementFinder {
    return $$('thf-table table tbody tr').get(line);
  }

  getTableColumnByLine(line: number, column: number): ElementFinder {
    const lineElement = this.getTableLine(line);
    return lineElement.$$('td span').get(column);
  }
}
