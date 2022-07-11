import React from "react";
import { connect } from "react-redux";
import {
  createUser,
  removeThingFromUser,
  deleteUser,
  updateUser,
} from "./store";

const Users = ({
  users,
  createUser,
  deleteUser,
  things,
  removeThingFromUser,
  increment,
}) => {
  return (
    <div>
      <h1>Users</h1>
      <div id="header">
        <p>Name</p>
        <p>Things</p>
        <p>Ranking</p>
      </div>
      <ul>
        {users.map((user) => {
          return (
            <li id="users" key={user.id}>
              {user.name}
              <ul>
                {things
                  .filter((thing) => thing.userId === user.id)
                  .map((thing) => {
                    return (
                      <li key={thing.id}>
                        {thing.name} ({thing.ranking})
                        <button onClick={() => removeThingFromUser(thing)}>
                          x
                        </button>
                      </li>
                    );
                  })}
              </ul>
              <div id="ranking">
                {user.ranking}
                <button onClick={() => increment(user, -1)}>-</button>
                <button onClick={() => increment(user, 1)}>+</button>
                <button onClick={() => deleteUser(user)}>x</button>
              </div>
            </li>
          );
        })}
      </ul>
      <button onClick={createUser}>Create a user</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    things: state.things,
  };
};

const mapDispatch = (dispatch) => {
  return {
    createUser: () => {
      dispatch(createUser({ name: Math.random() }));
    },
    removeThingFromUser: (thing) => {
      thing = { ...thing, userId: null };
      dispatch(removeThingFromUser(thing));
    },
    deleteUser: (user) => {
      dispatch(deleteUser(user));
    },
    increment: (user, dir) => {
      user = { ...user, ranking: user.ranking + dir };
      dispatch(updateUser(user));
    },
  };
};
export default connect(mapStateToProps, mapDispatch)(Users);
