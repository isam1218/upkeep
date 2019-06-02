import React from 'react';
// import logo from './upkeep-logo.png';
import styled from 'styled-components';
import OrderForm from './OrderForm';
import backgroundImg from './danger.jpg';


const OrderListWrapper = styled.div`
h2 {
    margin: auto;
    padding-top: 20px;
    text-align: center;
    color: beige;
    font-size: 30px;
    width: fit-content;
}

.back-btn {
    float: right;
    height: 30px;
    width: 100px;
    font-size: 16px;
    background-color: gold;
    margin: 12px 50px;
}

background-image: url(${backgroundImg});
.container {
    max-height: 700px;
    overflow-y: auto;
    
    ul {
        border: 1px solid lightgray;
        background-color: white;
        width: 60%;
        min-height: 180px;
        background-color: #F5F5F5;
        margin: auto;
        margin-top: 20px;
        margin-bottom: 20px;
        color: #333;
        padding: 10px;
        list-style: none;
        text-align: left;
    }

    li {
        margin-bottom:10px
    }
}
`;

class OrderList extends React.Component {
    state = {
        back:false
    };

    goBack = () => {
        this.setState({
            back: true
        });
    }

     render(){
        const orderList = this.props.orderList;
         if(this.state.back){
            return <OrderForm deleteData={this.props.deleteData} postData={this.props.postData} getData={this.props.getData} handleInputChange={this.props.handleInputChange} title={this.props.title} description={this.props.description} priority={this.props.priority} dueDate={this.props.dueDate} />;
        }
        return (
            <OrderListWrapper>
                <button className="back-btn" onClick={()=>this.goBack()}>Go Back</button>
                <h2>Work Order List</h2>
                <div className="container">
                
            {(()=>{
            return orderList && orderList.map((item,index)=>(
            
            <ul>
                <li>
                   <h4>{item.title}</h4>
                </li>
                <li>
                <strong>{item.description ? 'Description: ' : ''}</strong><br/>
                {item.description}
                </li>
                <li>
                <strong>{item.priority === 0 || item.priority > 0 ? 'Work Priority: ' : ''}</strong><br/>
                {item.priority}
                </li>
                <li>
                    <strong>{item.dueDate ? 'Due Date: ' : ''}</strong><br/>
                {new Date(item.dueDate).toLocaleDateString()}
                </li>
            </ul>
            
            ))
        })()}
        </div>
            </OrderListWrapper>
        );
     }
    
}

export default OrderList;