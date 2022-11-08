import React from "react";
import "./BodyApp.css";
import Control from "./Control";
import Table from "./Table";
import Form from "./form";
import FormUpdate from "./formUpdate";

class AppBody extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showForm: false,
            isUpdate: false,
            listTodo: [],
            todoUpdate: {},
            keyWord: '',
            sortValue: 1,
        }
        this.activeBtnAdd = this.activeBtnAdd.bind(this)
        this.closeForm = this.closeForm.bind(this)
        this.getDataForm = this.getDataForm.bind(this)
        this.getDatalocal = this.getDatalocal.bind(this)
        this.deleTodo = this.deleTodo.bind(this)
        this.updateTodo = this.updateTodo.bind(this) 
    }

    componentDidMount() {
        window.addEventListener('load', this.getDatalocal())
    }
    
    componentDidUpdate(){
        localStorage.setItem('ListTodo', JSON.stringify(this.state.listTodo))
    }

    activeBtnAdd(param){
        this.setState({
            showForm: param,
            isUpdate: false,
        })
    }

    closeForm(){
        this.setState({
            showForm: false,
            isUpdate: false,
        })
    }

    getDataForm(param){
        var arrayTodo = this.state.listTodo
        
        if(this.state.isUpdate){
            var newArray = arrayTodo.filter(todo=>todo.id !== param.id)
            
            newArray.push(param)
            this.setState({
                listTodo: newArray,
                isUpdate: false,
            })
        }else{
            arrayTodo.push(param)
            this.setState({
                listTodo: arrayTodo
            })
        }
    }

    getDatalocal() {
        var listItem = JSON.parse(localStorage.getItem('ListTodo'))
        
        if(listItem){
            this.setState({
                listTodo: listItem
            })
        }
    }

    deleTodo(param){
        var NewListTodo = this.state.listTodo.filter((todo=> todo.id !== param))
        localStorage.setItem('ListTodo', JSON.stringify(NewListTodo))
        this.setState({
            listTodo: NewListTodo
        })
    }

    updateTodo(param){
        var  TodoUpdate = this.state.listTodo.filter((todo=> todo.id === param))
        this.setState({
            showForm: true, 
            isUpdate: true,
            todoUpdate: TodoUpdate[0],
        })
    }

    getKeyWord = (keyWord) =>{
        this.setState({
            keyWord: keyWord,
        })
    }

    onSort = (sortValue) => {
        this.setState({
            sortValue: sortValue
        })
    }

    render(){
         if(this.state.showForm) {
            var formElement = this.state.isUpdate ?
                                <FormUpdate 
                                        todoUpdate={this.state.todoUpdate}
                                        iscloseFormUpdate={this.closeForm}
                                        dataFormUpdate={this.getDataForm}
                                    />
                                :
                                <Form
                                    iscloseForm={this.closeForm}
                                    dataForm={this.getDataForm}
                                />
        }
        return(
            <div className="app-body">
                {formElement}
                <div className="section-right">
                    <Control showForm={this.activeBtnAdd} 
                    keyWord={this.getKeyWord}
                    sortValue={this.onSort}
                    />
                    <Table  listTodo={this.state.listTodo} 
                            idTodoDele={this.deleTodo} 
                            idTodoUpde={this.updateTodo} 
                            keyWord={this.state.keyWord}
                            sortValue = {this.state.sortValue}
                    />
                </div>
            </div>
        )
    }
}

export default AppBody