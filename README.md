# Uhuraapp

[![Build Status](https://travis-ci.org/uhuraapp/uhura-frontend.svg?branch=master)](https://travis-ci.org/uhuraapp/uhura-frontend)<br />[![Test Coverage](https://codeclimate.com/github/uhuraapp/uhura-frontend/badges/coverage.svg)](https://codeclimate.com/github/uhuraapp/uhura-frontend/coverage)<br />[![Code Climate](https://codeclimate.com/github/uhuraapp/uhura-frontend/badges/gpa.svg)](https://codeclimate.com/github/uhuraapp/uhura-frontend)<br />[![devDependency Status](https://david-dm.org/uhuraapp/uhura-frontend/dev-status.svg)](https://david-dm.org/uhuraapp/uhura-frontend#info=devDependencies) <br />
----

## Uhura Issues Flow

<pre>.
           Issues
Uservoice   /   \
     \     /     \
     #inbox    #bug+#verified   Pull Request
        \                 \      /
       #planning  ->  #milestone  -> Deploy -> Production
          /              /
    Roadmap       #bug #verified
                       /
                    #bug
</pre>


This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* clone this repository: `git clone git@github.com:uhuraapp/uhura-frontend.git`
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
