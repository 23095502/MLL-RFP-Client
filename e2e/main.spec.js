'use strict';

describe('The main view', function() {
  var page;

  beforeEach(function() {
    browser.get('/');
    //browser.get('/#/create/overall');
    // page = require('./main.po');
    /*browser.waitForAngular();
    browser.sleep(2000);
    var contact = element(by.model('overall.customer.CONTACTNO'));
    contact.sendKeys('1234567890');*/
    //element(by.model('overall.customer.CONTACTNO'));
    //.sendKeys('1234567');
  });

  /* it('should include jumbotron with correct data', function() {
     expect(page.h1El.getText()).toBe('\'Allo, \'Allo!');
     expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/yeoman.png$/);
     expect(page.imgEl.getAttribute('alt')).toBe('I\'m Yeoman');
   });

   it('should list more than 5 awesome things', function () {
     expect(page.thumbnailEls.count()).toBeGreaterThan(5);
   });*/

  it('should have title RFP', function() {
    expect(browser.getTitle()).toEqual('RFP');
  });

});
