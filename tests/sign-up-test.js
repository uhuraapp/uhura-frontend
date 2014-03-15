ENDPOINT = "http://127.0.0.1:3002";

var email =  "test-user-"+(Math.random()*144400)+"@x.com";

casper.test.setUp(function(done) {
    casper.start(ENDPOINT + "/users/sign_out").then(function() {
    }).run(done);
});

casper.test.begin('Sign Up New User', 4, function suite(test) {
  casper.start(ENDPOINT+"/enter", function() {
    test.assertExists('form[action="/users/sign_up"]', "Sign Up form is found");
    test.assertExists('a[href="/auth/google"]', "google link is found");
    test.assertExists('a[href="/auth/facebook"]', "facebook link is found");

    this.fill('form[action="/users/sign_up"]', {
      email: email,
      password: "abc123"
    }, true);
  });

  casper.then(function() {
    test.assertTitle("Add Channel", "title is ok");
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('Sign Up Old User', 5, function suite(test) {
  casper.start(ENDPOINT+"/enter", function() {
    test.assertExists('form[action="/users/sign_up"]', "Sign Up form is found");

    this.fill('form[action="/users/sign_up"]', {
      email: email,
      password: "abc123"
    }, true);
  });

  casper.then(function() {
    this.waitForUrl(/login/, function() {
      test.assertExists('form[action="/users/sign_in"]', "Sign Up form is found");
      test.assertExists('a[href="/auth/google"]', "google link is found");
      test.assertExists('a[href="/auth/facebook"]', "facebook link is found");
      test.assertTitle("Sign In - UhuraApp", "home title");
    });
  });

  casper.run(function() {
    test.done();
  });
});
