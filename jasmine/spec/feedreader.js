/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has url', function() {
            for(var i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe(0);
            }
         });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.Testing for a type of string and length>0.
         */
         it('has name', function() {
            for(var i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(typeof allFeeds[i].name === 'string').toBe(true);
                expect(allFeeds[i].name.length > 0).toBe(true);
            }
         });
    });


    /* This is a new test suite named "The menu" */
    describe('The menu', function() {

        /* This is a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('the menu is hidden', function() {
            expect($('body').attr('class','menu-hidden')).toBeDefined();
         });

         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('the menu changes when icon is clicked',function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    /* This is a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         //use beforeEach and done function because loadFeed() is asynchronous .
         beforeEach(function(done) {
            loadFeed(1,done);        
         });

         it('have entry element when the loadFeed function is done', function() {
            expect($('.feed').find('.entry')).toBeDefined();
         });


        //use afterEach to set back to the iniatial statement, avoiding errors.
         afterEach(function (done) {
            loadFeed(0, done);
        });
    });

    /* This is a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {

        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         $('.feed').empty();
         
         // set currentFeed outside, for further comparing.
         var currentFeed;

         beforeEach(function(done) {
            //get the current content of feed.
            currentFeed = $('.feed').html();
            loadFeed(1,done);        
         });

         it('content actually changes when a new feed loads', function() {
            //get the refreshed content of feed,then comparing it with the initial one.
            var refreshedFeed = $('.feed').html();
            expect(currentFeed).not.toBe(refreshedFeed);
         });

         //use afterEach to set back to the iniatial statement, avoiding errors.
         afterEach(function (done) {
            loadFeed(0, done);
        });
    });
}());