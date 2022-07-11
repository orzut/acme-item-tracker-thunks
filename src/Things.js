import React from "react";
import ThingForm from "./ThingForm";
import { connect } from "react-redux";
import { deleteThing, updateThing } from "./store";

const Things = ({ things, users, deleteThing, increment, updateThing }) => {
  return (
    <div>
      <h1>Things</h1>
      <div id="header">
        <p>Name</p>
        <p>Owner</p>
        <p>Ranking</p>
      </div>
      <ul>
        {things.map((thing) => {
          const user = users.find((user) => user.id === thing.userId) || {};

          return (
            <li id="things" key={thing.id}>
              {thing.name} owned by {user.name || "nobody"}
              <div>
                <select
                  defaultValue={thing.userId}
                  onChange={(ev) => updateThing(thing, ev.target.value)}
                >
                  <option value="">-- nobody --</option>
                  {users.map((user) => {
                    return (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div id="ranking">
                {thing.ranking}
                <button onClick={() => increment(thing, -1)}>-</button>
                <button onClick={() => increment(thing, 1)}>+</button>
                <button onClick={() => deleteThing(thing)}>x</button>
              </div>
            </li>
          );
        })}
      </ul>
      <ThingForm />
    </div>
  );
};

export default connect(
  (state) => {
    return {
      things: state.things,
      users: state.users,
    };
  },
  (dispatch) => {
    return {
      updateThing: (thing, userId) => {
        thing = { ...thing, userId: userId * 1 };
        dispatch(updateThing(thing));
      },
      increment: (thing, dir) => {
        thing = { ...thing, ranking: thing.ranking + dir };
        dispatch(updateThing(thing));
      },
      deleteThing: (thing) => {
        dispatch(deleteThing(thing));
      },
    };
  }
)(Things);
