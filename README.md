# User Management App
Small React app that lists users, supports client-side search, shows a user details page, and lets you add a local user to the top of the list.
## Features Breakdown
### Users List
- **Loads**: From https://jsonplaceholder.typicode.com/users with native fetch.
- **Displays cards**: Name, email, company.

### Search
- Client-side, by name or email.

### User Details
- **Click a card to open**: /users/:id
- **Shows address, phone, website**

### Add User
- **Form with validation**: Name and email required.
- **On submit** Creates a local user and prepends it to the list.

## How To Run
1. Clone the repo:
   ```bash
   git clone https://github.com/diellzacitaku/user-management.git
   cd user-management
   ```

2. Install the packages:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

## Technologies Used

### Frontend
- **React**
- **Vite**


## File Structure

This project follows the folder structure based on [this StackOverflow answer](https://stackoverflow.com/questions/55221433/is-there-an-official-style-guide-or-naming-convention-for-react-based-projects) I found:

```
├── src
|   ├── components // stateful and stateless reusable components that just display "stuff" -- stateful components change and manipulate the UI
|   ├── pages // utilize components/containers to display something when visiting a "/route"
|   ├── app // aka "<App />" that combines "routes", redux and other top-level supporting files into one place
|   ├── styles // shared and/or global styles used by all "components"
|   ├── services // service app files
|   └── main.jsx // a simple file that "ReactDOM.render"s the "App"
|
└── vite.config.js

Component structure:
└── components
    └── Input
        ├── index.js // all required code/styles to be exported
        └── styles.scss // styles required by "index.js"
```
