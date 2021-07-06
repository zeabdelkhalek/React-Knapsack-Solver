import React, { Component } from "react";
import { Badge } from "reactstrap";

class ObjectUI extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { item } = this.props;
    return (
      <div style={{ marginRight: "6%" }}>
        {/* <Badge color="secondary">ID:{item.getItem().index}</Badge> */}
        <Badge color="danger">Weight:{item.getItem().weight}</Badge>
        <Badge color="success">Value:{item.getItem().value}</Badge>
        <Badge color="secondary">Count:{item.count}</Badge>
      </div>
    );
  }
}

export default ObjectUI;
