var Buttons = React.createClass({
  render: function() {
    return (
      <div className="buttons">
        <MUIButton disabled={ this.props.disabled } flat={ this.props.flat } raised={ this.props.raised } large={ this.props.large }>Button</MUIButton>
        <MUIButton disabled={ this.props.disabled } flat={ this.props.flat } raised={ this.props.raised } large={ this.props.large } type="primary">Button</MUIButton>
        <MUIButton disabled={ this.props.disabled } flat={ this.props.flat } raised={ this.props.raised } large={ this.props.large } type="danger">Button</MUIButton>
        <MUIButton disabled={ this.props.disabled } flat={ this.props.flat } raised={ this.props.raised } large={ this.props.large } type="accent">Button</MUIButton>
      </div>
    );
  }
});

var NormalButtons = React.createClass({
  render: function() {
    return (
      <div className="mui-panel">
        <h3>Normal buttons</h3>
        <Buttons />
        <Buttons disabled={ true } />
      </div>
    );
  }
});

var FlatButtons = React.createClass({
  render: function() {
    return (
      <div className="mui-panel">
        <h3>Flat buttons</h3>
        <Buttons flat={ true } />
        <Buttons flat={ true } disabled={ true } />
      </div>
    );
  }
});

var RaisedButtons = React.createClass({
  render: function() {
    return (
      <div className="mui-panel">
        <h3>Raised buttons</h3>
        <Buttons raised={ true } />
        <Buttons raised={ true } disabled={ true } />
      </div>
    );
  }
});

var LargeButtons = React.createClass({
  render: function() {
    return (
      <div className="mui-panel">
        <h3>Large buttons</h3>
        <Buttons large={ true } />
        <Buttons large={ true } disabled={ true } />
      </div>
    );
  }
});

var FloatingButtons = React.createClass({
  render: function() {
    return (
      <div className="mui-panel">
        <h3>Floating action buttons</h3>
        <MUIRoundButton>+</MUIRoundButton>
        <MUIRoundButton mini={ true } onClick={ function () { alert('Really tiny'); } }>+</MUIRoundButton>
      </div>
    );
  }
});

React.render(<NormalButtons />, document.getElementById('normal-buttons'));
React.render(<FlatButtons />, document.getElementById('flat-buttons'));
React.render(<RaisedButtons />, document.getElementById('raised-buttons'));
React.render(<LargeButtons />, document.getElementById('large-buttons'));
React.render(<FloatingButtons />, document.getElementById('floating-buttons'));