import React from 'react';
// import logo from './upkeep-logo.png';
import styled from 'styled-components';
import OrderList from './OrderList';
import OrderForm from './OrderForm';
import backgroundImg from './danger.jpg';



const CreateOrderWrapper = styled.div`
height: 100%;
background-image: url(${backgroundImg});
.create-order-container {
    width: 60%;
    height: 400px;
    margin: auto;
    border: 1px solid lightgray;
    background-color: white;
    padding: 25px;

    h3 {
        margin: auto;
        margin-bottom: 20px;
        width: 200px;
        color: #333;
        
    }

    input {
        width: 100%;
        padding: 0px;
        height: 30px;
        margin: 10px 0px;
        background-color: #F5F5F5;
        border: 1px solid lightgray;
    }

    label {
        width: 100%;
        padding: 0px;
        height: 30px;
        margin: 10px 0px;
    }

    .submit-btn {
    display: block;
    padding: 10px 0px;
    font-size: 16px;
    background-image: none;
    background-color: gold;
    margin: 10px;
    width: 100px;
    float: right;
    }

    select {
        height: 35px;
        width: 100%;
        border-image: none;
        border-width: 0;
        background-color: #F5F5F5;
        border: 1px solid lightgray;
        margin: 10px 0px;
    }
}
`;

class CreateOrder extends React.Component {
    state = {
        back:false,
        showList:false
    }

    handleSubmit = () => {
        
        this.props.postData('https://api.onupkeep.com/api/v2/work-orders/', 
        {
            title: this.props.title,
            description:this.props.description,
            priority: this.props.priority,
            dueDate: this.props.dueDate
        },localStorage.sessionToken)
        .then(data =>{
            this.props.getData('https://api.onupkeep.com/api/v2/work-orders', 
            {},localStorage.sessionToken)
            .then(data =>{
               this.setState({
                   orderList: data.results
               });
            
            this.setState({
                showList: true
            });
        });
        });
    }

    goBack = () => {
        this.setState({
            back: true
        });
    }

     render(){
        const handleInputChange = this.props.handleInputChange;
        if(this.state.showList){
            return <OrderList deleteData={this.props.deleteData} postData={this.props.postData} getData={this.props.getData} orderList={this.state.orderList} handleInputChange={this.props.handleInputChange} title={this.props.title} description={this.props.description} priority={this.props.priority} dueDate={this.props.dueDate}/>
        }
        if(this.state.back){
            return <OrderForm deleteData={this.props.deleteData} postData={this.props.postData} getData={this.props.getData} handleInputChange={this.props.handleInputChange} title={this.props.title} description={this.props.description} priority={this.props.priority} dueDate={this.props.dueDate} />
        }
        return (
        <CreateOrderWrapper>
            <div className="create-order-container">
            <h3>Create Work Order</h3>
                <div className="title">
                    <label>Title</label>               
                    <input type="text" name="title" onChange={(event)=>handleInputChange(event)}/>
                </div>

                <div className="description">
                    <label>Description</label>
                    <input type="text" name="description" onChange={(event)=>handleInputChange(event)}/>
                </div>

                <div className="priority">
                    <label>Priority</label>

                    <select name="priority" onChange={(event)=>handleInputChange(event)}>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>

                <div className="due-date">
                <label>Due Date</label>
                <input type="date" name="dueDate" onChange={(event)=>handleInputChange(event)} />
                </div>
                
                <button  className="submit-btn" onClick={this.handleSubmit} >Save</button>
                <button  className="submit-btn" onClick={this.goBack} >Back</button>

            </div>

        </CreateOrderWrapper>
        );
     }
    
}

export default CreateOrder;