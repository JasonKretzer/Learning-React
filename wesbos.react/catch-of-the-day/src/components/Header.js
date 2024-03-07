import React from "react";

// class Header extends React.Component {
//   render() {
//     return (
      // <header className="top">
      //   <h1>Catch
      //     <span className="ofThe">
      //       <span className="of">Of</span>
      //       <span className="the">The</span>
      //     </span>
      //     Day
      //   </h1>
      //   <h3 className="tagline">
      //     <span>{this.props.tagline}</span>
      //   </h3>
      // </header>
//     );
//   }
// }

// In the case where you are just passing in props and returning a bit of jsx
// you can just use a stateless functional component -- which evidently
// is a bit more performant

// this sfc will also use
// - implicit return
// - not deconstructing the props ie. ({ tagline }) in the argument list
// - no parentheses in the argument list since only using the one arg
const Header = props => (
  <header className="top">
    <h1>Catch
      <span className="ofThe">
        <span className="of">Of</span>
        <span className="the">The</span>
      </span>
      Day
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
);

export default Header;