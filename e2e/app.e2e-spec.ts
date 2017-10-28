import { TldPage } from './app.po';

describe('tld App', () => {
  let page: TldPage;

  beforeEach(() => {
    page = new TldPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
