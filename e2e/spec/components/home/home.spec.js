describe('basics', function () {
    var input;
    var display;
    var button;

    beforeEach(function () {
        // http://localhost:9000/sample.html を開く
        browser.get('/#/home');
        // 各要素を取得
        input = element(by.model("home.todo"));
        display = element(by.binding("home.todos"));
        button = element(by.tagName("input"));
    });

    it('should be to upper value', function () {
        // input要素に文字列を入力
        input.sendKeys('test');
        // ボタンをクリック
        button.click();
        // displayTextに"TEST"と表示されていることを確認
        // expect(display.getText()).toEqual("TEST");
        console.log(display);
    });
});