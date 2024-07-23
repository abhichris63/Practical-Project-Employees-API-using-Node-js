//! IMPORT REQUIRE MODULES
const http = require("http");

//! Mimic Database
const employees = [
  {id:1, name:'Abhi'},
  {id:2, name:'Chris'},
];

//! Define the handler
const requestHandler = (req,res) => {
  const {method,url} = req;
  const parts = url.split('/');
  const id = parts[2];
  //! Get all employees
  if(method === 'GET' && url === "/employees"){
    res.writeHead(200, {"Content-Type":"Application/Json"});
    res.end(JSON.stringify(employees));
  }
  //! Get Single employee
  else if(method==='GET' && parts[1]==='employees' && id){
    const employee = employees.find((emp)=>emp.id === parseInt(id));
    if(employee){
      res.writeHead(200, {"Content-Type":"application/json"});
      res.end(JSON.stringify(employee));
    }else{
      res.writeHead(200, {"Content-Type":"application/json"});
      res.end(JSON.stringify({Message: "Employee not found"}));
    }
  }
  //! Create New Employee
  else if(method==="POST" && url === "/employees"){
    let body = '';
    //* Listen to the event of making post request
    req.on("data",(chuck)=>{
      body+=chuck;
    });
    //* Send the response
    req.on("end",()=>{
      const newEmployees = JSON.parse(body);
      employees.push(newEmployees);
      res.writeHead(200, {"Content-Type":"application/json"});
      res.end(JSON.stringify({
        newEmployees,
        employees
      }));
    });
  };

};

//! Create a Server
const server = http.createServer(requestHandler);;

//! Start the server
const PORT = 3000;
server.listen(PORT,()=>{
  console.log(`The server is running on http://localhost:${PORT}`);
})
