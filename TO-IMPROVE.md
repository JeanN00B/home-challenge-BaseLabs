Of course this is an MVP wich objective was to solve the buy corn + rate limit, and the solution simulates an e-commerce!

- Global State (to handle properly the localStorage token + role around all the project, with a reducer or a library like redux)

- Improve components reusability

- Re-render when fetch (POST, GET, PATCH) so we get update data

- useState to handle actions like loadingState, errorState

- Axios with CORS

- Encrypt password & use JWT to authenticate requests

- Entry point that will validate if is admin or user so we get a single validation entry point

- Architecture: A better implementation of an hexagonal architecture or layers architecture (all depends of how will scale a real project)

- UI/UX (user) add a profile + display some information about the person that is logged, even we can move invoices and insights to a different page.

- useCallback to handle the store products fetching

- Separate custoHook with fetching logic, which also renders a message with the status to the client
