import { GuiteoUiPage } from './app.po';

describe('guiteo-ui App', () => {
  let page: GuiteoUiPage;

  beforeEach(() => {
    page = new GuiteoUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
