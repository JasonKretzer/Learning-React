# Basic React State Notes

## What is state?
In React, "state" refers to the data that determines how a component renders and behaves. It represents the current condition or state of the component at any given time. State is managed internally within the component and can be modified over time in response to user actions, network requests, or other events.

Stateful components use state to keep track of data that may change over time, such as user input, fetched data from an API, or the visibility of certain elements. When the state changes, React automatically re-renders the component to reflect the updated state.

State is typically initialized in the constructor of a class-based component using this.state, and it can be updated using the `setState()` method. In functional components, state can be managed using the `useState()` hook.

State cannot be directly shared from the parent down to the children components. For a child to update the parent state, the update function must be passed down to the children via props.  State should also not be directly tampered with.

**In class-based components** - To update state, you make a copy of the state, update the copy, and then use setState to set the state to the copy.

**In functional components** - To update state, you make a copy of the state, update the copy, and then use the `setter` that was named in the `useState()`  hook declaration to set the state to the copy.

If you have functions that need to update state, they should be implemented in the component where the state object lives.

Overall, state is essential in React for creating dynamic and interactive user interfaces by allowing components to respond to changes and update their output accordingly.
