/* global describe */
const Router = require('./router');

describe('router.js', function() {
  beforeEach(function() {
    spyOn(Router.prototype, 'main');
    this.router = new Router();
    this.router.navigate('', {trigger: true});
  });

  it('should call main() method', function() {
    expect(this.router.main).toHaveBeenCalled();
  });
});