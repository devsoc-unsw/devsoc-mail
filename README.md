# devsoc mail

epic training program project

# Workshop 3 - React Hooks

Author: Lachlan Shoesmith

## Task 1: Tracking Inputs

You might remember from last week's workshop that we have an `Input` component, which acts as a Reactified version of the `<input />` HTML element you know and love. Or hate.

Right now, the `Input` component doesn't actually store anything typed into it anywhere useful. It's up to you to change that!

> 💁‍♀️ Tip: Consider installing the [React Developer Tools](https://react.dev/learn/react-developer-tools), which lets you inspect components and view their internal state.

> ❗️ Hint: Read the example in the React documentation [here](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable).

## Task 2: Passing State Around

Great - now whenever we type into our `Input` component, the typed value is reflected in the component's state! However, our `Input` components themselves won't be responsible for actually doing anything with this data. We need to _lift this state up_ to the respective parent component of each `Input`.

Discuss with the people around you how you could possibly perform this state lifting, and then implement it. Once `Input` adheres to this pattern, try display a user's email on the `LoginPage` in some capacity (but outside of the relevant `Input`).

> ❗️ Hint: In JavaScript, functions are [first-class citizens](https://en.wikipedia.org/wiki/First-class_citizen). One benefit of this is that functions can be passed as arguments.

## Task 3: Signing Users In

Let's take a break from exploring React concepts for a moment and discuss how we can log users in. You may have seen or used the [`localStorage` API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage#examples) offered by web browsers before. If not, review the examples in the aforementioned link.

Essentially, `localStorage` lets us access a website-specific\* hash map. This object holds unique _keys_. Each key has a _value_ associated with it. Importantly, both keys and values must be strings. If you wanted to store another object as a value in `localStorage`, you'd need to `JSON.stringify()` it first.

\*Not super important to know for this exercise, but it's also protocol specific. That is, https://google.com and http://google.com will have different corresponding `Storage` objects.

Anyway, you should now be storing a user's email and password in the `LoginPage` component once they've typed it in. Your challenge is to store this information in `localStorage` under the key `userData`, according to the following schema:

```js
{
   email: 'email_goes_here',
   password: 'password_goes_here_no_dont_try_hash_it_yet',
   loginTime: new Date(),
}
```

This data should be added to `localStorage` only once the `AuthButton` has been clicked.

> ❗️ Hint: You might find [this Stack Overflow answer](https://stackoverflow.com/a/65541747/3991859) helpful in terms of figuring out how to get your button working.
> ❗️ Hint: You could combine your desired `onClick` behaviour for `AuthButton` with the existing `onClick` functionality in `AuthButton`.
> ❗️ Hint: Consider looking into how to represent [function types in TypeScript](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-type-expressions) when updating the `AuthButton` props.

## Task 4: Checking If Users Are Signed In

My `LoginPage` component looks something like this:

```jsx
const LoginPage = () => {
  const userDataObject = localStorage.getItem("userData");
  if (userDataObject != null) {
    alert("User is already logged in.");
  }
  return <>...</>;
};
```

If I am indeed signed in, this seems to pop up kind of erratically. I only want to check if a user is logged in once: when the page first loads. Discuss with the people around you why this might occur and what a working alternative to the given example could be.

> ❗️ Hint: By calling a browser API like `localStorage`, we are _connecting to an external system_. Does React have a means of handling these?

## Task 5: Writing Good Passwords

On the `RegisterPage`, I want to tell users if their passwords are good or not. Thus, I will give them a score based on which condition they satisfy:

- A _poor_ password has less than 8 characters.
- A _good_ password has between 8 and 12 characters, inclusive.
- A _great_ password has 12 or more characters and at least two numbers.

> 🤭 Aside: This is not genuine password advice. I am not liable for any account compromising that happens if you do follow this advice.

To display this information, I can update my `RegisterPage` to look something like this.

```jsx
const RegisterPage = () => {
  const [score, setScore] = useState("");

  return (
    <>
      <img src={Logo}></img>
      <form id="login-box">
        <h2>Register</h2>
        <Input text="Email" />
        <Input text="Password" />
        <Input text="Confirm password" />
        <p>{passwordScore}</p>
        <AuthButton to="/mail">Register</AuthButton>
        <p>
          Already got an account? <Link to="/">Log in</Link>
        </p>
      </form>
    </>
  );
};
```

You have a few tasks before you:

1. Store the `Input` values in state somewhere accessible to `RegisterPage`.
2. Using `useEffect`, write a method that runs every time the password value changes.

> ❗️ Hint: Note that a 'dependency list' in a `useEffect` should contain all of the reactive values used by the method passed into `useEffect`.

> ❗️ Hint: `str.match(/\d/g)` will check if the string `str` contains numbers. The numbers themselves will be returned in an array. Recall that the length of an array can be checked with `.length`.

## Task 6: Writing Good Passwords, And Checking Them Better

Our `useEffect` example is sound, but maybe inefficient. We know that [we don't need Effects to handle user events](https://react.dev/learn/you-might-not-need-an-effect#how-to-remove-unnecessary-effects). How can we optimise our code from the previous task by removing the `useEffect` while keeping the [side effect](<https://en.wikipedia.org/wiki/Side_effect_(computer_science)>) of updating our `passwordScore` when the password itself is updated?

> ❗️ Hint: You are probably immediately updating the password state when the corresponding `Input` is changed. Could you write a function that still updates this state, but also performs the additional checks we currently have in an Effect? This function could then be called every time your `Input` changes.
