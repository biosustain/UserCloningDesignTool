import { UserPrimerClientPage } from './app.po';

describe('user-primer-client App', function() {
  let page: UserPrimerClientPage;

  beforeEach(() => {
    page = new UserPrimerClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
