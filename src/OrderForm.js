import React from 'react';
// import logo from './upkeep-logo.png';
import styled from 'styled-components';
import OrderList from './OrderList';
import App from './App';
import backgroundImg from './danger.jpg';
import CreateOrder from './CreateOrder';

const OrderWrapper = styled.div`
text-align: center;
display: flex;
height: 100%;
margin: auto;
justify-content: center;
align-items: center;
background-image: url(${backgroundImg});

.logout {
    background-color:gray !important;
}

button {
    height: 60px;
    font-size: 16px;
    margin: 20px;
    background-color: gold;
    width: 150px;
}
`;

class OrderForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showCreateOrder: false,
            showOrderList: false,
            orderList: [],
            loggedIn: true
        };
    }

    handleBtnClick=(type)=>{
        this.props.getData('https://api.onupkeep.com/api/v2/work-orders', 
        {},localStorage.sessionToken)
        .then(data =>{
           this.setState({
               orderList: data.results
           });
        });
        this.setState({
            [type]: true
        });
    }

    handleLogout=()=>{
        this.props.deleteData('https://api.onupkeep.com/api/v2/auth/', {})
        .then(data =>{
            this.setState({
                loggedIn: false
            });
           });
    }


     render(){
         if(!this.state.loggedIn){
            return <App/>;
         }
         if(this.state.showOrderList){
        return(
            <OrderList deleteData={this.props.deleteData} postData={this.props.postData} getData={this.props.getData} orderList={this.state.orderList} handleInputChange={this.props.handleInputChange} title={this.props.title} description={this.props.description} priority={this.props.priority} dueDate={this.props.dueDate} />
        )
         }
         else if(this.state.showCreateOrder){
            return <CreateOrder deleteData={this.props.deleteData} postData={this.props.postData} getData={this.props.getData} orderList={this.state.orderList} handleInputChange={this.props.handleInputChange} title={this.props.title} description={this.props.description} priority={this.props.priority} dueDate={this.props.dueDate} />;
         }
         else{
             return(<OrderWrapper>
                 <button onClick={()=>this.handleBtnClick("showCreateOrder")}>
                    Create Order
                 </button>
                 <button onClick={()=>this.handleBtnClick("showOrderList")}>
                    Show Order List
                 </button><br/>

                 <button className="logout" onClick={()=>this.handleLogout()}>
                    Logout
                 </button>
             </OrderWrapper>);
         }
     }
    
}

export default OrderForm;