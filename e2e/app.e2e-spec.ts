import { NbaBracketCompetitionPage } from './app.po';

describe('nba-bracket-competition App', () => {
  let page: NbaBracketCompetitionPage;

  beforeEach(() => {
    page = new NbaBracketCompetitionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
