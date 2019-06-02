import React from 'react';
import logo from './upkeep-logo.png';
import backgroundImg from './maintenance.jpg';
import styled from 'styled-components';
import OrderForm from './OrderForm';



const LoginWrapper = styled.div`
    width:100%;
    height:100%;
    padding:10px;
    margin:auto;
    background-image: url(${backgroundImg});

    .App {
      text-align: center;
    }
    
    .App-logo {
      // animation: App-logo-spin infinite 20s linear;
      width:200px;
      pointer-events: none;
    }
    
    .App-header {
      width: 400px;
      margin: auto;
      background-color: white;
      text-align: center;
      box-shadow: 0px 0px 10px black;
      padding: 30px;
      margin-top: 40px;
      
      button {
        display: block;
        margin: auto;
        padding: 10px 25px;
        /* height: 30px; */
        font-size: 16px;
        /* width: 200px; */
        margin-top: 20px;
        background-color: orange;
      }
    }
    
    .App-link {
      color: #61dafb;
    }
    
    @keyframes App-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    input {
      height: 30px;
      margin: 5px;
      width: 250px;
    }
`;

class App extends React.Component {
  constructor(props){
    super(props);

  this.state = {
      email:'',
      password: '',
      loggedIn: false,
      title: '',
      description: '',
      priority: 0,
      dueDate:''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleInputChange (e) { 
    const name = e.target.name;

      if(name !== "dueDate"){
          this.setState({
            [name]: e.target.value
          });
      }
      else{
        this.setState({
          [name]: new Date(e.target.value).getTime()
        });
      }
  }

  deleteData(url = '', data = {},token = '') {
    // Default options are marked with *
      return fetch(url, {
          method: 'DELETE', 
          mode: 'cors', 
          cache: 'no-cache', 
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
              'Session-Token': token
          },
          redirect: 'follow', 
          referrer: 'no-referrer',
      })
      .then(response => {
        localStorage.removeItem("sessionToken");
      });
    }

  getData(url = '', data = {},token = '') {
    // Default options are marked with *
      return fetch(url, {
          method: 'GET', 
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin', 
          headers: {
              'Content-Type': 'application/json',
              'Session-Token': token
          },
          redirect: 'follow', 
          referrer: 'no-referrer', 
      })
      .then(response => response.json());
    }

  postData(url = '', data = {},token = '') {
    // Default options are marked with *
      return fetch(url, {
          method: 'POST',
          mode: 'cors', 
          cache: 'no-cache', 
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
              'Session-Token': token
          },
          redirect: 'follow', 
          referrer: 'no-referrer', 
          body: JSON.stringify(data), 
      })
      .then(response => response.json());
    }

    handleKeyPress = (event) => {
      if (event.keyCode === 13) {
        this.handleLogin();
      }
    }

  handleLogin=()=>{
    this.postData('https://api.onupkeep.com/api/v2/auth/', {email: this.state.email, password:this.state.password})
  .then(data =>{
     localStorage.setItem("sessionToken",data.result.sessionToken);
     this.setState({
       loggedIn : true
     });
  }) 
  .catch(error => {
    console.error(error);
  });

  }



  render(){

    if(!this.state.loggedIn){
        return (
        <LoginWrapper onLoad={this.attemptLogin}>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <input type="text" name="email" placeholder="Enter Email Address" onChange={(event)=>this.handleInputChange(event)}/>
            <input type="password" name="password" placeholder="Enter Password" onChange={(event)=>this.handleInputChange(event)} />
            <button onClick={this.handleLogin}>Login</button>
          </header>
        </LoginWrapper>
      );
    }
    else {
      return <OrderForm deleteData={this.deleteData} postData={this.postData} getData={this.getData} handleInputChange={this.handleInputChange} title={this.state.title} description={this.state.description} priority={this.state.priority} dueDate={this.state.dueDate} />;
    }
  }
}

export default App;
