  /*
    ████████ ███████  █████  ██████  ██████   ██████  ██     ██ ███    ██
       ██    ██      ██   ██ ██   ██ ██   ██ ██    ██ ██     ██ ████   ██
       ██    █████   ███████ ██████  ██   ██ ██    ██ ██  █  ██ ██ ██  ██
       ██    ██      ██   ██ ██   ██ ██   ██ ██    ██ ██ ███ ██ ██  ██ ██
       ██    ███████ ██   ██ ██   ██ ██████   ██████   ███ ███  ██   ████
    */

    // Delete all created Objects
    exports.testCase_tearDown = async function (test) {
  
        logger.log("");
        logger.log("-----------------------------------------------------------------------------------------------");
        logger.log(" Test TearDown - delete all clients");
        logger.log("-----------------------------------------------------------------------------------------------");      
                        try {
                            //Test result
                            sdk.utils.logTitle('Delete all objects created');
                            if (api.tearDown()) {
                                console.log('objects deleted successfully');
                            }
                            test.ok(true);
                            test.done();
                           
                        } catch (exception) {
                            logger.log("testCase_tearDown api.del catched exception: " + exception);
                            if (testTimeoutId) {
                                clearTimeout(testTimeoutId);
                            }
                            test.ok(false);
                            test.done();
                        }   
};