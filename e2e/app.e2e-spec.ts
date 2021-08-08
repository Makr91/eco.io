import { Eco.IoPage } from './app.po';

describe('eco.io App', () => {
  let page: Eco.IoPage;

  beforeEach(() => {
    page = new Eco.IoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
