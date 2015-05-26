describe('Home', function () {

  beforeEach(function () {
    browser.get('/#/home');
  });

  it('should be to upper value', function () {

    element(by.model("home.todo")).sendKeys('write a protractor test');
    element(by.name("add")).click();
    
    var todoList = element.all(by.repeater('todo in home.todos'));
    expect(todoList.count()).toEqual(1);
  });
});