/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and empty 
         */
        it('Are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Here I Written a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL defined also not empty',function () {
            allFeeds.forEach(function(fd) {
                expect(fd.url).toBeDefined();
                expect(fd.url.length).not.toBe(0);
            });
        });

        
        /* The test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('The name defined also not empty',function() {
            allFeeds.forEach(function(fd){
                expect(fd.name).toBeDefined();//check and insure is defined
                expect(typeof fd.name).toEqual('string');
                expect(fd.name.length).toBeGreaterThan(0);
            });
        });
    });


    /* new test suite named "The menu" */
    describe('The menu',function() {
        //test that ensures the menu element is hidden by default.
        it('Is hidden by default',function() {
           expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        
        
        //test that ensures the menu changes visibility when the menu icon is clicked.
        it('Become visiblity when icon clicked',function() {
            var hamMenu = $('.menu-icon-link');
            
            hamMenu.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // This tests for menu hide.
            hamMenu.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

         

    /* The a new test suite named "Initial Entries" */
    describe('Initial Entries',function() {
        
        /* Test that ensures when the loadFeed function is called and
         * completes its work. BeforeEach allows for use of asynchronous loaadFeed()
        */
        beforeEach(function(loaded) {
           loadFeed(0, function() {
               loaded();
           });
        });
        
        //Tests that there is at least one entry in feeds.
        it('Have to called also contain at least one feed', function() {
            expect($('.entry').length).toBeGreaterThan(0);
        });
        
    });
        

    
    /*Written a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        //test that ensures when a new feed is loaded by loadFeed().
        var $feedOne;
        var $feedTwo;
        
        beforeEach(function(done){
            loadFeed(0, function() {
               feedOne =  $('.feed').html();
               done();
            });
        });
        
        
        it('Must change feed also content loading feed', function(done) {
            loadFeed(1,function() {
                feedTwo = $('.feed').html();
                expect(feedTwo).not.toEqual(feedOne);
                done();
            });
        });
    });
       
}());








