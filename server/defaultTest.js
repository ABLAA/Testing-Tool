
exports.aaa = async function (test) {
    let testTimeoutId;
    let client ;
    let clientId;

    try {
        // Init object
        client = new sdk.Client();
        client = Client.getMaximalClient(); //maximal client
        sdk.utils.logObject(client);
        clientId = client.getId();

        logger.log("");
        logger.log("-----------------------------------------------------------------------------------------------");
        logger.log(" Create client with maximal data");
        logger.log("-----------------------------------------------------------------------------------------------");

        testTimeoutId = setTimeout(function () {
            logger.log("testTimeout()");
            test.ok(false);
            test.done();
        }, 10000);

        // Setup HTTP request
        sdk.utils.logTitle('post client');
        client = await api.postClient('OFR', client);
            try {
                // Test result
                clearTimeout(testTimeoutId);
                logger.log("ClientId = " + clientId);
                sdk.utils.logObject(client);
                let execptedcontact = ["contact@client.com"];
                let expectedProtocol = {};
                let expectedName = "ClientName";
                // test.strictEqual(result.data.mco, "OFR");
                test.strictEqual(client.getId(), clientId);
                test.deepEqual(client.getContacts(), execptedcontact, "execpted_contact");
                test.strictEqual(client.getSubjectType(), "pairwise");
                test.strictEqual(client.getType(), "ISE2");
                test.notEqual(client.getServiceName(), undefined);
                test.notEqual(client.getServiceKey(), undefined);
                test.notEqual(client.getInitialServiceKey(), undefined);
                test.strictEqual(client.getName(), expectedName);
                test.strictEqual(client.getUri(), "");
                test.strictEqual(client.getLogoUri(), "");
                test.strictEqual(client.getPolicyUri(), "");
                test.strictEqual(client.getTosUri(), "");
                test.deepEqual(client.getProtocols(), expectedProtocol, "expected_protocol");
                test.done();
            } catch (exception) {
                logger.log("catched exception: " + exception);
                if (testTimeoutId) {
                    clearTimeout(testTimeoutId);
                }
                test.ok(false);
                test.done();
            }
        
    } catch (exception) {
        logger.log("catched exception: " + exception);
        if (testTimeoutId) {
            clearTimeout(testTimeoutId);
        }
        test.ok(false);
        test.done();
    }
};