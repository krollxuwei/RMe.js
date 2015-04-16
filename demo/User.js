RMe.define({
    displayName: "User",
    getInitialState:function(){
        return {name:'',age:''}
    },
    showEdit:function(){
        RMe.show({
            view:RMe.View['Edit'],
            data:{
                title:'编辑',
                onHide:this.updateInfo
            }
        })
    },
    updateInfo: function (name, age) {
        this.setState({name:name,age:age});
    },
    render:function(){
        return (
            React.createElement("div", null,
                React.createElement("div", null, this.state.name),
                React.createElement("div", null, this.state.age),
                React.createElement("input", {type: "button", onClick: this.showEdit, value: "edit"})
            )
        )
    }
})
