import React, { Component } from "react";
import axios from 'axios';
import Select from 'react-select';
import {TinyButton  as ScrollUpButton} from "react-scroll-up-button"; 
import { Card, Row, Col, Button, Collapse, Form ,Spinner } from "react-bootstrap";
import TextareaAutosize from "react-autosize-textarea";

import { BsPencilSquare, BsDownload, BsPlus,BsArrowClockwise,BsChevronDoubleUp,BsChevronDoubleDown,BsCheck,BsXSquare } from "react-icons/bs";
import testCase1 from "./testCase1.js";
import "./style.css";

var fileDownload = require('js-file-download');
const ClientApiattributes = [
  { label: "client_id", value: 1 },
  { label: "client_name", value: 2 },
  { label: "mco", value: 4 },
  { label: "client_secret", value: 5 },
  { label: "redirect_uri", value: 6 },
];

var API="http://localhost:8080";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileContent: "",
      authorName: "author name",
      authorEmail: "authorName@sofrecom.com",
      testName: "defaultTest",
      configurationFile: "",
      api: "client",
      apiVersion: "V5",
      error: "",
      open: false,
      edit: true,
      steps: "1",
      testCases: [
        {
          key: "1",
          name: "actionTestCase",
          nameTestCase: "nameTestCase1",
          apis: testCase1,
        }
            ],
      nameTestCase: "",
      apiTestCase: "",
      actionTestCase: "",
      clientApiVersion: "",
      createType :"createDefault",
      inProgress : false,
      updatedAttributes : "",
      dataToPut : [],
      newValue : "",
      newValue2 :"",
      attributToUpdate : "",
      addAttribute : false

    };
  }

  componentDidMount = () => {
    
    axios.get(`${API}/`) //https://server-stageoidc.cloud.okteto.net
    .then(res => {
      const fileContent = res.data.fileContent;
      this.setState({ fileContent });
      console.log(fileContent)
    })
  
   };
  handleChange = async (event) => {
    console.log(event.target.value);
    if (event.target.name === "apiTestCase")
    await this.setState({ [event.target.name]: event.target.value,dataToPut:[],actionTestCase:"",
    clientApiVersion:"",createType :"createDefault"});
    else if(event.target.name === "clientApiVersion") {
    await this.setState({ [event.target.name]: event.target.value,actionTestCase:"",createType :"createDefault"});
    }
    else
    this.setState({ [event.target.name]: event.target.value});
    

  }
  handleNewValue = async (event) => {
    await this.setState({ [event.target.name]: event.target.value });
  }

  handlePutChange = async (opt) => {    
      await this.setState({ attributToUpdate: opt.label });    
  }
  addAttributeToUpdate = async () => {
    if (this.state.newValue !== "" && this.state.attributToUpdate !== "")
    {
    let dataToPut = await this.state.dataToPut.filter(item => item.attribut !== this.state.attributToUpdate ); 
    await dataToPut.push({ "attribut" : this.state.attributToUpdate,"newValue" : this.state.newValue}); 
    await this.setState({dataToPut});
    console.log(this.state.dataToPut);
    this.setState({newValue :"" });
    }
  };

  deleteAttribut = async (attributName) => {
    let dataToPut = await this.state.dataToPut.filter(item => item.attribut !== attributName)
    await this.setState({dataToPut});
  }

  handleNewValue2 = async (event) => {
    await this.setState({ [event.target.name]: event.target.value });
    let dataToPut = this.state.dataToPut;
  
    dataToPut.map(item =>{
      (item.attribute === this.state.attributToUpdate) ?
      item[this.state.attributToUpdate] = this.state.newValue2 :
       dataToPut.push({ "attribut" : this.state.attributToUpdate,"newValue" : this.state.newValue2});
       return 0 ;
    });
    this.setState({dataToPut});
    console.log(this.state.dataToPut); 
  }

  handlePutChange2 = async (opt) => {    
      await this.setState({ attributToUpdate: opt.label });
      let dataToPut = this.state.dataToPut;
      await dataToPut.push({ [opt.label] : this.state.newValue2 });     
      this.setState({dataToPut});
      console.log(this.state.dataToPut);
    
  }

  editText = (str) => {
    return str.replace(/(?:\r\n|\r|\n)/g, "\n");
  };
  generateFile = async (e) => {
    e.preventDefault();
    await this.setState({ inProgress: true, testName: "test"+ Math.floor(Math.random() * 100000)});
    let authorIdentity = `@author ${this.state.authorName} ( ${this.state.authorEmail} ) `;     
    let data = {
      "authorIdentity" : authorIdentity,
      "testFile" : this.state.testName 
    } ;
    console.log("author : \n");
    await console.log(authorIdentity);
    axios.post(`${API}/write`, data )
      .then(res => {
        this.setState({ fileContent :res.data.fileContent,
        inProgress:false });
    });
  
  };
  addTearDown = async (e) => {
    e.preventDefault();
    this.setState({inProgress:true});
    let data = {
      "testFile" : this.state.testName
    };
    axios.post(`${API}/tearDown`, data )
    .then(res => {
      this.setState({ fileContent :res.data.fileContent,
      inProgress:false
    });
  });
  }

  addTestCase = async (e) => {
    if ((this.state.actionTestCase !== "update") || 
    (this.state.actionTestCase === "update" && this.state.dataToPut.length  ) ){
      e.preventDefault();
      this.setState({inProgress:true});
      let data = {
        "testFile" : this.state.testName,
        "testCaseName" : this.state.nameTestCase1,
        "action" : this.state.actionTestCase,
        "version" : this.state.clientApiVersion,
        "dataToPut" : this.state.dataToPut,
        "createClientType" : this.state.createType
      } ;
      axios.post(`${API}/testCase`, data )
      .then(res => {
        this.setState({
        fileContent :res.data.fileContent,
        inProgress:false,
        });
      });
    }
    else {
      e.preventDefault();
     alert("please add attributes to update")
    }
  }
  setOpen = (bool) => {
    this.setState({ open: !bool });
  };

  enableEditing = (bool) => {
    this.setState({ edit: !bool });
    console.log(this.state.edit);
  };

  handleSteps = (event) => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
    let testCases = this.state.testCases;
    this.setState(testCases);
    console.log(this.state.testCases);
  };

  render() {
    return (
      <div>
          <div style={{
          //backgroundColor:"#eff0ed",
          //backgroundImage:`url(${bg})`,
          padding:"3px"}}>
            <Form  style ={{marginLeft : "380px",marginTop:"35px"}} onSubmit={(e) => this.generateFile(e)}>
              <Row style={{marginRight:"0px"}}>
              <Col sm="3">
              <Form.Label style={{fontWeight: "bold",fontSize:"14px"}}>
                Author name   :
              </Form.Label>             
              <input
                placeholder={this.state.authorName}
                name="authorName"
                type="text"
                onChange={(e) => this.handleChange(e)}
                required
                className="input"   />
              </Col>
              <Col sm={3} style={{marginLeft:"20px"}}>
              <Form.Label style={{fontWeight: "bold",fontSize:"14px"}}>
                Author email  :
              </Form.Label>
               <input
                placeholder={this.state.authorEmail}
                name="authorEmail"
                type="email"
                onChange={(e) => this.handleChange(e)}
                required
                className="input"    />          
              </Col>
            
              <Col sm ={2} style={{padding:"0px",marginLeft:"20px"}} >
                <button 
                  type="submit"                
                  className="button"
                  style={{marginTop:"31px",marginLeft:"20px" }}
                  >
                <BsArrowClockwise />               
                 </button>
                </Col>
              </Row>
            </Form>
          </div>
         <div>
           <button
              onClick={() => this.setOpen(this.state.open)}
              className="button"    
              style={{
              float: 'right',
              margin:"15px",
              marginRight:"29px",
              width:"10%",
                }}    >
            {this.state.open ? <BsChevronDoubleUp/> : <BsChevronDoubleDown/>}
           </button>  
             </div>         
              <Collapse in={this.state.open}>
                <Card
                  id="example-collapse-text"
                  style={{ width: "96%", marginLeft: "31px",marginBottom:"10px"
                  ,borderRadius:"0px",border: "2px solid rgb(158, 158, 158)" ,padding:"15px"}}  >
                    <Form 
                        onSubmit={(e) => this.addTestCase(e)}>
                      <Form.Group
                        as={Row}
                        controlId="exampleForm.SelectCustomSizeLg" >
                      </Form.Group>
                      {this.state.testCases.map((item) =>
                        item.key <= this.state.steps ? (
                          <Form.Group as={Row} key={item.key}>
                            <Form.Label column sm={2} style={{fontWeight: "bold"}}>
                             Test case Name :
                            </Form.Label>
                            <Col sm={3}>
                              <input
                                onChange={(e) => this.handleChange(e)}
                                type="text"
                                placeholder="enter test Case name"
                                className="input"
                                name={item.nameTestCase} 
                                required  />
                            </Col>
                            <Col sm={1}>
                              <Form.Label
                              style={{marginTop:"7px",fontWeight:"bold"}}>Status  : </Form.Label> 
                                </Col>
                            <Col sm={1}>
                              <Form.Check
                                style={{marginTop:"7px"}}
                                onChange={(e) => this.handleChange(e)}
                                label="success" 
                                type="radio"
                                name="status"
                                checked  /> 
                                </Col>
                                <Col sm={1}>           
                              <Form.Check
                                style={{marginTop:"8px"}}
                                onChange={(e) => this.handleChange(e)}
                                label="failure"
                                type="radio"
                                name="status"
                                />
                            </Col>
                            <Col sm={12}>
                              <fieldset onChange={(e) => this.handleChange(e)}>
                                <Form.Group as={Row}>
                                  <Col>
                                    <Row style={{marginLeft:"0px",marginTop:"15px"}} >
                                      {item.apis.map((api) => (
                                        <Col key={api.key}>
                                          <label className="container" >{api.nameApi}
                                          <input
                                            type="radio"
                                            name={api.name}
                                            id={api.nameApi}
                                            value={api.nameApi}    />
                                          <span className="checkmark"></span>
                                          </label>                                          
                                        </Col>
                                      ))}
                                    </Row>
                                    {item.apis.map((api) =>
                                      this.state.apiTestCase === api.nameApi 
                                        ? this.state.apiTestCase === "Client" 
                                          ? this.state.clientApiVersion === ""
                                            ? api.versions.map((version) => 
                                            <div key={version.nameVersion}>
                                                <Col sm={{ offset: api.offset }}  >
                                                  <fieldset  onChange={(e) => this.handleChange(e)}
                                                  defaultValue={ version.nameVersion}>
                                                    <Form.Check
                                                      type="radio"
                                                      label={version.nameVersion}
                                                      name={version.name}
                                                      id={version.nameVersion}
                                                      value={version.nameVersion} />
                                                  </fieldset>
                                              </Col>
                                            </div>                                         
                                            )
                                            : api.versions.map((version) => (
                                              <div key={version.nameVersion}>
                                                <Col sm={{ offset: api.offset }}>
                                                <fieldset onChange={(e) =>this.handleChange(e)} >
                                                    <Form.Check
                                                      type="radio"
                                                      label={version.nameVersion}
                                                      name={version.name}
                                                      id={version.nameVersion}
                                                      value={version.nameVersion}
                                                       />
                                                  </fieldset>
                                                </Col>
                                                {version.actions.map(
                                                  (action) =>
                                                    version.nameVersion === this.state.clientApiVersion ? 
                                                    action === "update" ?   
                                                <Col 
                                                  key={action}
                                                  sm={{ offset: version.offset , span: 4}}>                                                 
                                                 <fieldset >
                                                  <Form.Check
                                                    size ="sm"
                                                    type="radio"
                                                    label={action}
                                                    name={item.name}
                                                    id={action}
                                                    value={action}
                                                  />
                                                 </fieldset> 
                                                { this.state.actionTestCase === "update" && (                                                  
                                                <Form.Row>
                                                <Col sm ={{offset:0}} style={{marginTop:"5px"}}>
                                                 <Select 
                                                  className='filter'
                                                  onChange={(opt) => this.handlePutChange(opt)} 
                                                  options={ClientApiattributes} />
                                                 </Col>
                                                 <Col style={{marginTop:"5px"}}>
                                                  <Form.Control 
                                                   onChange={(e) =>this.handleNewValue(e)}
                                                   name="newValue"
                                                   value= {this.state.newValue}
                                                   disabled={this.state.actionTestCase !== "update"} 
                                                   placeholder="new value" />
                                                 </Col>
                                                 <Col sm={1}>
                                                 <Button  
                                                     variant="light"          
                                                     style={{marginTop:"5px"}}   
                                                     onClick={() => this.addAttributeToUpdate(this.state.addAttribute)}>
                                                       <BsCheck />
                                                   </Button>
                                                  </Col>
                                                    </Form.Row>) }  
                                                    <ul style={{marginTop:"10px"}}>
                                                   { this.state.dataToPut.length ?                                              
                                                     this.state.dataToPut.map(item=> {
                                                     return <li key ={item.key}>{item.attribut} : {item.newValue} 
                                                     <BsXSquare style={{marginLeft :"30px",color:"red"}} 
                                                     onClick={()=> this.deleteAttribut(item.attribut)}/>
                                                     </li>
                                                   }): null }
                                               </ul>                                                                                                                                                                                                                       
                                                </Col>                                               
                                                    :   
                                                    action === "create" ?
                                                    <Form.Row key={action}>
                                                    <Col                                                    
                                                    sm={{ offset: version.offset ,span: 1}}
                                                    style={{marginLeft:"120px"}}>
                                                   <fieldset  onChange={(e) =>this.handleChange(e)}>
                                                      <Form.Check
                                                        type="radio"
                                                        label={action}
                                                        name={item.name}
                                                        id={action}
                                                        value={action}
                                                      />
                                                    </fieldset>
                                                    </Col>
                                                    {this.state.actionTestCase === "create" &&
                                                    <Col sm ={2}>                                                     
                                                    <select className="select"
                                                      name="createType"
                                                      onChange={(e)=>this.handleChange(e)}>
                                                      <option value="createDefault">Default</option>
                                                      <option value="createMaximal">Maximal</option>
                                                      <option value="createMinimal">Minimal</option>
                                                      <option value="createCostomized" >Costomized</option>
                                                    </select>
                                                    </Col>  
                                                    }
                                                    </Form.Row>
                                                    :                                           
                                                <Col
                                                  key={action}
                                                  sm={{ offset: version.offset ,span: 1}}>
                                                 <fieldset  onChange={(e) =>this.handleChange(e)}>
                                                    <Form.Check
                                                      type="radio"
                                                      label={action}
                                                      name={item.name}
                                                      id={action}
                                                      value={action}
                                                    />
                                                  </fieldset>
                                                </Col>    
                                                    : null                                            
                                                )}
                                              </div>
                                            ))
                                          : api.actions.map((action) => (
                                            action === "update" ?                                           
                                              <Col 
                                                key={action}
                                                sm={{ offset: api.offset , span: 4}}  >
                                                <fieldset                                                 
                                                 onChange={(e) =>this.handleChange(e)}>
                                                  <Form.Check
                                                    size ="sm"
                                                    type="radio"
                                                    label={action}
                                                    name={item.name}
                                                    id={action}
                                                    value={action}
                                                  />
                                                </fieldset>                        
                                            { this.state.actionTestCase === "update" && (                   
                                             <Form.Row>
                                                 <Col sm ={{offset:0}} style={{marginTop:"5px"}}>
                                                 <Select 
                                                  name="attributToUpdate"
                                                  onChange={(opt) => this.handlePutChange(opt)} 
                                                  size="sm" options={ClientApiattributes} />
                                                 </Col>
                                                 <Col style={{marginTop:"5px"}}>
                                                  <Form.Control 
                                                   onChange={(e) =>this.handleNewValue(e)}
                                                   name="newValue"
                                                   value={this.state.newValue}
                                                   disabled={this.state.actionTestCase !== "update"} 
                                                   placeholder="new value" />
                                                 </Col>
                                                 <Col sm={1}>
                                                   <Button  
                                                     variant="light"          
                                                     style={{marginTop:"5px",borderRadius:"0px"}}   
                                                     onClick={() => this.addAttributeToUpdate(this.state.addAttribute)}>
                                                       <BsCheck />
                                                   </Button>
                                                  </Col>
                                               </Form.Row> ) }   
                                        
                                               <ul style={{marginTop:"10px"}}>
                                               {this.state.dataToPut.length ?                                              
                                               this.state.dataToPut.map(item=> {
                                                 return <li key ={item.key}>{item.attribut} : {item.newValue} 
                                                 <BsXSquare style={{marginLeft :"30px",color:"red"}} 
                                                 onClick={()=> this.deleteAttribut(item.attribut)}/>
                                                 </li>
                                                 
                                               }): null }
                                               </ul>
                                              </Col>  
                                                                                       
                                              :
                                              <Col
                                                key={action}
                                                sm={{ offset: api.offset ,span: 3}} >
                                                <fieldset onChange={(e) =>this.handleChange(e)}>
                                                  <Form.Check
                                                    type="radio"
                                                    label={action}
                                                    name={item.name}
                                                    id={action}
                                                    value={action}
                                                  />
                                                </fieldset>
                                              </Col>     ))
                                        : null   )}
                                  </Col>
                                </Form.Group>
                              </fieldset>
                            </Col>
                          </Form.Group>
                        ) : null    )}
                      <Form.Group as={Row} controlId="formHorizontalCheck">
                      <Col></Col>
                      <Col sm={1}>
                      <button 
                           type="submit"                
                           className="button"                            
                           style={{marginTop:"0px"}}   
                           >
                          <BsPlus />
                      </button>
                          </Col>
                      </Form.Group>                                  
                      <Form.Group >
                      <Form.Label style={{fontWeight: "bold"}} >Finally :</Form.Label>
                      <Row style={{marginLeft:"0px",marginTop:"15px"}}>
                       <Col  sm={{span : 3 }} style={{marginTop :"5px"}} >                   
                       <label className="container" >Add Tear Down automatically
                          <input
                            style={{marginTop:"4px"}}
                            type="radio"
                            onChange={(e) => this.handleChange(e)}
                            checked
                          />
                          <span className="checkmark"></span>
                       </label>
                        </Col>
                        <Col sm={1}>
                          <button 
                           type="submit"                
                           className="button"                            
                           onClick={(e) => this.addTearDown(e)}      
                           style={{marginTop:"0px"}}  
                           >
                          <BsPlus />
                      </button>                       
                        </Col>
                        </Row>
                      </Form.Group>
                    </Form>                 
                </Card>
              </Collapse>
                    {this.state.fileContent.length ? ( 
                                         
                      <h6 style={{fontSize: "15px", marginTop: "15px",marginLeft:"28px",fontWeight: "bold"}}>
                        {"/" + this.state.testName + ".js"}
                        <button
                        className="button"
                        style={{
                        marginLeft:"10px",color:"white",borderRadius:"0px",
                        fontSize:"10px",padding:"5px"}}    
                        onClick={() => this.enableEditing(this.state.edit)}    >
                      <BsPencilSquare /> edit
                      </button>
                      <button
                        className="button"
                        style={{
                        marginLeft:"10px",marginRight:"10px",color:"white",borderRadius:"0px",
                        fontSize:"10px",padding:"5px"}}
                        onClick={()=>fileDownload(this.state.fileContent, this.state.testName + ".js")}>                    
                      <BsDownload/> Download
                      </button>
                      
                      </h6>
                    ) : null
                  }                               
                {this.state.fileContent.length ? 
                  <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      {/* <Form.Label>{this.state.testName + ".js"}</Form.Label> */}
                      {/* <Form.Control as="textarea" rows="8" cols="50"   onChange={e=> this.handleChange(e)} 
                      name = "fileContent"/> */}                    
                     { this.state.inProgress ?
                     <center>                
                       <Spinner style={{  flex: 1,
                          marginTop:140,
                          marginBottom:240,
                          justifyContent: 'center',
                          alignItems:'center',
                          marginLeft:150}} 
                          animation="border" role="status">
                       <span className="sr-only">Loading...</span>
                       </Spinner>                                 
                     </center>
                     :
                     <center>
                       <TextareaAutosize
                        value={this.state.fileContent}
                        name="fileContent"
                        onChange={(e) => this.handleChange(e)}
                        disabled={this.state.edit}
                        style={{
                          width: "96%",
                          background: "url(http://i.imgur.com/2cOaJ.png)",
                          backgroundAttachment: "local",
                          backgroundRepeat: "no-repeat",
                          paddingLeft: "35px",
                          bordercolor: "#ccc",
                          fontSize: "13px",
                          marginBottom:"20px",
                          border : "2px solid rgb(158, 158, 158)"
                        }} />
                      </center> }
                    </Form.Group>
                  </Form>
                 :  this.state.inProgress ?
                 <center>                
                 <Spinner style={{  flex: 1,
                          marginTop:140,
                          marginBottom:240,
                          justifyContent: 'center',
                          alignItems:'center',
                          marginLeft:150}} 
                          animation="border" role="status">
                       <span className="sr-only">Loading...</span>
                  </Spinner>                               
               </center>                 
                      :
                      <center>
                      <TextareaAutosize
                        rows={20}
                        placeholder="Generated file will be loaded here"
                        name="fileContent2"
                        onChange={(e) => this.handleChange(e)}
                        style={{
                          width: "96%",
                          background: "url(http://i.imgur.com/2cOaJ.png)",
                          backgroundAttachment: "local",
                          backgroundRepeat: "no-repeat",
                          paddingLeft: "35px",
                          bordercolor: "#ccc",
                          fontSize: "13px",
                          marginBottom:"20px",
                          border : "2px solid rgb(158, 158, 158)"
                        }}
                        disabled
                      />
                    </center>
                  }
                  <ScrollUpButton 
                   ToggledStyle={{right: 100}}
                   StopPosition={0}
                   ShowAtPosition={150}
                   EasingType='easeOutCubic'
                   AnimationDuration={500}
                   style={{backgroundColor:"white",border : "2px solid rgb(41, 41, 41)",marginRight:"15px",
                   width:"45px",height:"45px"}}
                   />
              </div>
    );
  }
}

export default Test;
