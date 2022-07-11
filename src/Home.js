import React from "react";
import { connect } from "react-redux";

const Home = ({ users, things, topRankedThings, topRankedUsers }) => {
  return (
    <div>
      <h1>Home</h1>
      <p>
        Here at the Acme Item Tracker Corp we have {users.length} users and{" "}
        {things.length} things!
      </p>
      <h2>Top Ranked Things</h2>
      <ul>
        {topRankedThings.map((thing) => {
          return <li key={thing.id}>{thing.name}</li>;
        })}
      </ul>
      <h2>Top Ranked Users</h2>
      <ol>
        {topRankedUsers.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ol>
    </div>
  );
};

const mapSToP = (s) => {
  const topRank = Math.max(...s.things.map((thing) => thing.ranking));
  const topRankedThings = s.things.filter((thing) => thing.ranking === topRank);
  const topRankedUsers = s.users
    .sort((a, b) => b.ranking - a.ranking)
    .slice(0, 5);
  return {
    users: s.users,
    things: s.things,
    topRankedThings,
    topRankedUsers,
  };
};

export default connect(mapSToP)(Home);
