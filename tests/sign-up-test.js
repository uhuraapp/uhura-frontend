var email =  "user-"+(Math.random()*100)+"@x.com"

casper.test.begin('Sign Up New User', 2, function suite(test) {
  casper.start("http://127.0.0.1:3002/enter", function() {
    test.assertExists('form[action="/users/sign_up"]', "Sign Up form is found");

    this.fill('form[action="/users/sign_up"]', {
      email: email,
      password: "abc123"
    }, true);
  });

  casper.then(function() {
    test.assertTitle("Dashboard - Uhura App", "title is ok");
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('Sign Up Old User', 4, function suite(test) {
  casper.start("http://127.0.0.1:3002/enter", function() {
    test.assertExists('form[action="/users/sign_up"]', "Sign Up form is found");

    this.fill('form[action="/users/sign_up"]', {
      email: email,
      password: "abc123"
    }, true);
  });

  casper.then(function() {
    test.assertTitle("Uhura App - Podcasts Manager - Listen your podcasts Here!", "home title");
    test.assertUrlMatch(/\/#sign-in/, "sign in open");
    test.assertVisible('#sign-in');
  });

  casper.run(function() {
    test.done();
  });
});
