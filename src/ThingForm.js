import React from "react";
import { connect } from "react-redux";
import { createThing } from "./store";
import axios from "axios";

const ThingForm = ({ createThing }) => {
  return (
    <div>
      <button onClick={createThing}>Add a new thing</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createThing: () => {
      dispatch(createThing({ name: Math.random() }));
    },
  };
};

export default connect(null, mapDispatchToProps)(ThingForm);
