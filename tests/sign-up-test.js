ENDPOINT = "http://127.0.0.1:3002";

var email =  "user-"+(Math.random()*144400)+"@x.com"

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
    test.assertTitle("Dashboard - Uhura App", "title is ok");
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('Sign Up Old User', 4, function suite(test) {
  casper.start(ENDPOINT+"/enter", function() {
    test.assertExists('form[action="/users/sign_up"]', "Sign Up form is found");

    this.fill('form[action="/users/sign_up"]', {
      email: email,
      password: "abc123"
    }, true);
  });

  casper.then(function() {
    test.assertUrlMatch(/\/#sign-in/, "sign in open");
    test.assertVisible('#sign-in');
        test.assertTitle("Uhura App - Podcasts Manager - Listen your podcasts Here!", "home title");

  });

  casper.run(function() {
    test.done();
  });
});
