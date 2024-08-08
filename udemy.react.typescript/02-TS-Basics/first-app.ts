let userName: string = 'Max';

// this works fine
userName = 'Joe';

// this will throw an error
// userName = 5;

let userID: string | number = 'abc123'; // this is a union type

// this works
userID = 5;
userID = 'Joe';

// this will throw an error
// userID = true;


