import React from 'react'

class Form extends React.Component{
    constructor(props){
        super(props)
        this.state={
            nameTodo: '',
            status: true,
            id: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.closeForm = this.closeForm.bind(this)
        this.resetForm = this.resetForm.bind(this)
    } 

    closeForm(){
        this.props.iscloseForm(false)
    }

    resetForm(){
        this.setState({
            nameTodo: '',
            status: true,
            id: '',
        })
    }

    handleChange(e){
        var name = e.target.name
        var value = e.target.value
        if(value === 'true') {
            value = true
        }
        if(value === 'false') {
            value = false
        }
        this.setState({
            [name] : value,
            id: this.randomId()
        })
    }

    handleSubmit(e){
        e.preventDefault()
        this.props.dataForm(this.state)
        this.resetForm()
    }


    // tao id ran dom
    s4(){
        return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1)
    }
    randomId(){
        return this.s4() +'-'+this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4()
    }

    render(){
        return(
            <div className="container section-left">
                <div className="container-form">
                    <div className="form-header">
                        <p className="form-title"> Thêm công việc </p>
                        <i className="fas fa-times btn-icon-close" onClick={this.closeForm}></i>
                    </div>
                    <form className="form" autoComplete="off" onSubmit={this.handleSubmit}>
                        <div className="form-items">
                            <p className="form-items-label">Tên: </p>
                            <div className="form-input-container">
                                <input
                                    type="text" 
                                    className="form-items-input" 
                                    name="nameTodo" 
                                    placeholder="thêm tên công việc ..." 
                                    onChange={this.handleChange}
                                    value={this.state.nameTodo}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-items">
                            <p className="form-items-label">Trạng thái: </p>
                                <select 
                                    name="status"
                                    className="form-items-input-select"
                                    onChange={this.handleChange}
                                    value={this.state.status}
                                >
                                    <option value={true}>Kích hoạt</option>
                                    <option value={false}>Ẩn</option>
                                </select>
                        </div>
                        <div className="form-items ">
                            <button 
                                type="submit" 
                                className="btn btn-save" 
                            >
                                Lưu lại
                            </button>
                            <button 
                                type="reset" 
                                className="btn btn-danger ml-12" 
                                onClick={this.resetForm}
                            >Xóa</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Form