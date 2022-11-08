import React from 'react'

class Control extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            keyWord : '',
            isClickSort: false,
            sortValue: 1,
        }

        this.ShowForm = this.ShowForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        var name = event.target.name
        var value = event.target.value
        this.setState({
            [name] : value,
        })
    }

    onSearch = () =>{
        this.props.keyWord(this.state.keyWord)
    }

    ShowForm(){
        this.props.showForm(true)
    }

    onClearSearch = () =>{
        this.setState(state=>{
            state.keyWord = ''
            this.props.keyWord(this.state.keyWord)
        })
    }

    clickBtnSort = () =>{
        var isClick = this.state.isClickSort
        if(isClick){
            this.setState({
                isClickSort: false
            })
        }else{
            this.setState({
                isClickSort: true
            })
        }
    }

    onSort(sortValue){
        this.props.sortValue(sortValue)
        this.setState({
            sortValue: sortValue,
            isClickSort: false
        })
    }

    render(){
        var {keyWord, isClickSort, sortValue} = this.state
        var iconSortLabel

        if(keyWord.length > 0)
        {
            var btnClearSearch = <i className="fas fa-times btn-icon-clearSearch mr-8" onClick={this.onClearSearch}></i>
        }

        if(sortValue === 1){
            iconSortLabel = <i className="fas fa-sort-alpha-down ml-12"></i>
        }else{
            iconSortLabel = <i className="fas fa-sort-alpha-up ml-12"></i>
        }

        if(isClickSort){
            var sortList = <ul className="sort-list">
                                <li className={sortValue===1? "sort-items A-Z active" : "sort-items A-Z"} onClick={()=>this.onSort(1)}>
                                    <i className="fas fa-sort-alpha-down sort-icon"></i>
                                </li>
                                <li className={sortValue===-1? "sort-items Z-A active" : "sort-items Z-A"} onClick={()=>this.onSort(-1)}>
                                    <i className="fas fa-sort-alpha-up sort-icon"></i>
                                </li>
                            </ul>
                iconSortLabel = <i className="fas fa-chevron-right ml-12"></i>
        }

        return (
            <div className="container">
                <button 
                    className="btn btn-primary" 
                    onClick={this.ShowForm}
                > 
                        <i className="fas fa-plus mr-8"></i>
                        Thêm công việc
                </button>
                <div className="search-wrapper">
                    <div className="search">
                        <input  type="text" 
                                className="search-input" 
                                name="keyWord" 
                                placeholder="Nhập từ khóa..." 
                                onChange={this.handleChange}
                                value={this.state.keyWord}
                        />
                        { btnClearSearch }
                        <button className="btn btn-primary" onClick={this.onSearch}> <i className="fas fa-search"></i> Tìm kiếm</button>
                    </div>
                    <div className="sort">
                        <button className="btn btn-sort" onClick={this.clickBtnSort}>Sắp xếp { iconSortLabel }</button>
                        {sortList}
                    </div>
                </div>
            </div>
        )
    }
}

export default Control