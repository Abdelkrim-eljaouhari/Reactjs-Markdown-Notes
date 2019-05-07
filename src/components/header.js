import React from "react";

class Header extends React.Component {
  onAddChange = () => {
    this.props.onAddChange("this is from span in header");
  };
  render() {
    return (
      <div className="header">
        <h1>React js Markdown Notes</h1>
        <span className="header-add-note" onClick={this.onAddChange}>
          <i className="fas fa-plus-circle" />
        </span>
      </div>
    );
  }
}

export default Header;
