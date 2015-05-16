describe('Home', function () {

  beforeEach(function () {
    browser.get('/#/home');
  });

  it('should be to upper value', function () {

    element(by.model("home.todo")).sendKeys('write a protractor test');
    element(by.name("add")).click();
    
    var todoList = element.all(by.repeater('todo in home.todos'));
    expect(todoList.count()).toEqual(1);
    // expect(todoList.last().getText()).toEqual('write a protractor test');

//         describe('angularjs homepage todo list', function() {
//   it('should add a todo', function() {
//     browser.get('http://www.angularjs.org');

//     element(by.model('todoText')).sendKeys('write a protractor test');
//     element(by.css('[value="add"]')).click();

//     var todoList = element.all(by.repeater('todo in todos'));
//     expect(todoList.count()).toEqual(3);
//     expect(todoList.get(2).getText()).toEqual('write a protractor test');
//   });
// });
    });
});