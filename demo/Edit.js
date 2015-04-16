RMe.define({
    displayName: "Edit",
    save: function () {
        RMe.hide();
    },
    componentWillMount: function () {
        //onBeforeShow
    },
    componentDidMount: function () {
        //onShow
    },
    componentWillUnmount:function(){
        if(this.props.onHide){
            console.log('onhide');
            this.props.onHide(
                React.findDOMNode(this.refs.name).value.trim(),
                React.findDOMNode(this.refs.age).value.trim()
            );
        }
    },
    render:function(){
        return (
            React.createElement("div", null,
                React.createElement("input", {type: "text", ref:"name",  name: "name"}),
                React.createElement("input", {type: "text", ref:"age", name: "age"}),
                React.createElement("input", {type: "button", onClick: this.save, value: "保存"})
            )
        )
    }
})