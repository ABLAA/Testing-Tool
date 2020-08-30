const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser');
const promisify = require('util').promisify;


const app = express();
const port = process.env.PORT | 8080;
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());

/* Enabling CORS */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });



const writeFilePromise = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

WriteTextToFileAsync = async (contentToWrite,testFile) => {

    try {
        await writeFilePromise(testFile,contentToWrite);
    } catch(err) {
        throw new Error(`Could not write file because of ${err} `);
    }
}

// Restore Default File
app.get('/',async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    let fileContentDefault = await fs.readFileSync('./testCases/defaultRestore.js', 'utf8');
    fileContentDefault = await fileContentDefault.toString() ;
    await fs.writeFileSync('./testCases/defaultTest.js',fileContentDefault);
    const fileContent = await readFile('./testCases/defaultTest.js', 'utf8');

    res.status(200).send( {fileContent :fileContent} )
});


// Write route
app.post('/write', async (req, res, next) => {

    try {
        var path = process.cwd();
        var bufferHead = fs.readFileSync( path + "/testCases/headSchema.txt");
        var headSchema = bufferHead.toString();
        var buffer = fs.readFileSync( path + "/testCases/testSchema.js");
        var fileContent = buffer.toString();
        var testFile = await req.body.testFile;
        var authorIdentity = await req.body.authorIdentity ;

        await testFile.includes(".") ? null : testFile = testFile + ".js"  ;

        if (fs.existsSync(testFile)) {
            const fileContent = await readFile(testFile, 'utf8');
            return res.status(200).send({fileContent : fileContent});
        }
        else {
        await testFile.includes(".") ? null : testFile = testFile + ".js"  ;            
        await fs.appendFileSync(testFile,headSchema + '\n*\n*' + authorIdentity + "\n**/\n" + fileContent, function (err) {
                if (err) throw err;
                console.log('Saved!');
              }); 

        const updatedFileContent = await readFile(testFile, 'utf8');

        console.log(updatedFileContent);
        return res.status(200).send({fileContent : updatedFileContent});
        }
    } catch (err) {
        throw new Error(`Could not write file because of ${err}`);
    
    }
});

// add TerDown route
app.post('/tearDown', async (req, res, next) => {

    try {
        var path = process.cwd();
        var buffer = fs.readFileSync(path + "/testCases/tearDown.js");
        var fileContent = buffer.toString();
   
        var testFile = await req.body.testFile;      
        await testFile.includes(".") ? null : testFile = testFile + ".js"  ;
       
        await fs.appendFileSync(testFile, "\n" + fileContent, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });

        const updatedFileContent = await readFile(testFile, 'utf8');
        console.log(updatedFileContent);

          return res.status(200).send({fileContent : updatedFileContent});
    } catch (err) {
        throw new Error(`Could not write file because of ${err}`);
    }
});

// add TerDown route
app.post('/testCase', async (req, res, next) => {

    try {
        var path = process.cwd();

        var testCaseClientDefault = fs.readFileSync(path + "/testCases/testCaseClientDefault.txt");
        var fileContent = testCaseClientDefault.toString();

        var testCaseClientMax = fs.readFileSync(path + "/testCases/testCaseClientMax.txt");
        var fileContent1 = testCaseClientMax.toString();
   

        var testCaseClientMin = fs.readFileSync(path + "/testCases/testCaseClientMin.txt");
        var fileContent2 = testCaseClientMin.toString();


        var testCaseGetClientV4 = fs.readFileSync(path + "/testCases/testCaseGetClientV4.txt");
        var fileContent3 = testCaseGetClientV4.toString();


        var testCaseGetClientV5 = fs.readFileSync(path + "/testCases/testCaseGetClientV5.txt");
        var fileContent4 = testCaseGetClientV5.toString();

        var testCasePutClientV5 = fs.readFileSync(path + "/testCases/testCasePutClientV5.txt");
        var fileContent5 = testCasePutClientV5.toString(); 

        var testFile =  req.body.testFile;      
        var testCaseName =  req.body.testCaseName;  
        var action =  req.body.action;    
        var version = req.body.version ;
        var dataToPut = req.body.dataToPut;
        createClientType = req.body.createClientType;
        console.log(dataToPut[0]);
    

        await testFile.includes(".") ? null : testFile = testFile + ".js"  ;

        switch (action){
            case "create" :
                switch(createClientType){
                    case "createDefault" :
                    {
                        fs.appendFileSync(testFile,"\nexports." + testCaseName + ` = async function (test) {\n` +  fileContent, function (err) {
                            if (err) throw err;
                            console.log('Saved!');
                          });
                        }
                    break;
                    case "createMaximal" :
                        {
                        fs.appendFileSync(testFile,"\nexports." + testCaseName + ` = async function (test) {\n` +  fileContent1, function (err) {
                            if (err) throw err;
                            console.log('Saved!');
                          });
                        }
                    break;
                    case "createMinimal" :
                        {
                        fs.appendFileSync(testFile,"\nexports." + testCaseName + ` = async function (test) {\n` +  fileContent2, function (err) {
                            if (err) throw err;
                            console.log('Saved!');
                          });
                        }
                    break;
                }
                break;
            case "get" :
                switch(version){
                    case "v4":
                        {
                            fs.appendFileSync(testFile,"\nexports." + testCaseName + ` = async function (test) {\n` +  fileContent3, function (err) {
                                if (err) throw err;
                                console.log('Saved!');
                              });
                            }
                    break ;
                    case "v5":
                        {
                            fs.appendFileSync(testFile,"\nexports." + testCaseName + ` = async function (test) {\n` +  fileContent4, function (err) {
                                if (err) throw err;
                                console.log('Saved!');
                              });
                            }
                    break ; 
                    default :
                    {
                        fs.appendFileSync(testFile , "", function (err) {
                            if (err) throw err;
                            console.log('Saved!');
                          });
                        }; 
                }
            break;
            case "update" :{
                if (dataToPut[0]["attribut"] =="client_id") {
                    fs.appendFileSync(testFile , `
exports.${testCaseName} = async function (test) {\n
let testTimeoutId;
let client ;
let clientId;                
try {
    clientId = client.getId();
    client.setId("${dataToPut[0]["newValue"]}"); 
    logger.log("");
    logger.log("-----------------------------------------------------------------------------------------------");
    logger.log(" update client );
    logger.log("-----------------------------------------------------------------------------------------------");
    testTimeoutId = setTimeout(function () {
        logger.log("testTimeout()");
        test.ok(false);
        test.done();
    }, 10000);
    // Setup HTTP request
    sdk.utils.logTitle('post client');
    client = await api.putClient('OFR', client);
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
 };`,
                    function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                      });
                }
                if (dataToPut[0]["attribut"] =="client_name") {
                    fs.appendFileSync(testFile , `
exports.${testCaseName} = async function (test) {\n
let testTimeoutId;
let client ;
let clientId;                
try {
    clientId = client.getId();
    client.setClientName("${dataToPut[0]["newValue"]}"); 
    logger.log("");
    logger.log("-----------------------------------------------------------------------------------------------");
    logger.log(" update client");
    logger.log("-----------------------------------------------------------------------------------------------");
    testTimeoutId = setTimeout(function () {
        logger.log("testTimeout()");
        test.ok(false);
        test.done();
    }, 10000);
    // Setup HTTP request
    sdk.utils.logTitle('post client');
    client = await api.putClient('OFR', client);
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
 };`,
                    function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                      });
                }
                };
                
            default :     
            {
                fs.appendFileSync(testFile , "", function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                  });
                }; 

        }

        const updatedFileContent = await readFile(testFile, 'utf8');
        console.log(updatedFileContent);

          return res.status(200).send({fileContent : updatedFileContent});
    } catch (err) {
        throw new Error(`Could not write file because of ${err}`);
    }
});

// Not-found route
app.use((req, res, next) => {
    res.status(404).send({ message: 'Could not find the specified route you requested!' });
});

app.listen(port,'0.0.0.0', () => console.log(`Server up and running and listening for incoming requests on port ${port}!`));