import React from 'react'

class Table extends React.Component{

    constructor(props){
        super(props)

        this.deleTodo = this.deleTodo.bind(this)
        this.updateTodo = this.updateTodo.bind(this)
    }

    deleTodo(e){
        this.props.idTodoDele(e.target.id)
    }

    updateTodo(e){
        this.props.idTodoUpde(e.target.id)
    }

    render(){
        var {keyWord, listTodo, sortValue} = this.props
        var listTodoElement = ''

        if(this.props.listTodo.length !== 0)
        {
            if(keyWord){
                keyWord = keyWord.toLowerCase()
                listTodo = listTodo.filter(todo=>{
                    return todo.nameTodo.toLowerCase().indexOf(keyWord) !== -1
                })
            }

            listTodo.sort((a,b)=>{
                if(a.nameTodo > b.nameTodo) return sortValue
                if(a.nameTodo < b.nameTodo) return -sortValue
                else return 0
            })

            listTodoElement = listTodo.map((todo,index) =>{
                return <tr key={todo.id}>
                            <td >{index+1}</td>
                            <td >{todo.nameTodo}</td>
                            <td > {todo.status ? <span className="status-active">kích hoạt</span> : <span className="status-hidden">Ẩn</span>}</td>
                            <td className="table-action">
                                <button className="btn btn-primary" id={todo.id} onClick={this.updateTodo}>Sửa</button>
                                <button className="btn btn-danger ml-12" id={todo.id} onClick={this.deleTodo}>Xóa</button>
                            </td>
                        </tr>
            })
        }else{
            listTodoElement = <tr >
                                <td colSpan={4}>Chưa có công việc !!!</td>
                            </tr>
            }
        return (
            <div className="container ">
                <table className="table">
                    <thead>
                        <tr>
                            <th width="50px">Stt</th>
                            <th >Tên</th>
                            <th width="130px">Trạng thái</th>
                            <th width="200px" className="table-action">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        { listTodoElement }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table