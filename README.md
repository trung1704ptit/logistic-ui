## Features

- Elegant and customizable UI using `Tailwindcss` and `Ant Design`.
- Single page application using `React Router`.
- Mock API request using `reqres`.
- Powerful layout and table using `@ant-design/pro-components`.
- Code splitting and lazy loading component using `@loadable/component`.
- State management using `react-redux` and `@reduxjs/toolkit`.
- Persistent redux state using `redux-persist`.
- Loading progress bar using `nprogress`.
- `ESLint` and `Prettier` enabled.
- Option to enable Progressive Web App (PWA). (Only available in production build)
- Axios interceptor enabled to handle API authorization.
- Automated workflow for checking new Pull Request.


## Usage

- Clone the project and change directory.

  ```shell
  git clone https://github.com/arifszn/reforge.git
  cd reforge
  ```

- Install dependencies.

  ```shell
  npm install
  ```

- Run dev server.

  ```shell
  npm run dev
  ```


- run docker
  ```shell
  scp -r dist user@your-vps-ip:/dist
  ```

- Finally, visit [`http://localhost:5173`](http://localhost:5173) from your browser. Credentials can be found above.

## Config

Settings including app name, theme color, meta tags, etc. can be controlled from one single file **`config.ts`** located at the project's root.

```ts
//config.ts
const CONFIG = {
  appName: 'Reforge',
  enablePWA: true,
  theme: {
    accentColor: '#818cf8',
    sidebarLayout: 'mix',
    showBreadcrumb: true,
  },
  metaTags: {
    title: 'Reforge',
    description:
      'An out-of-box UI solution for enterprise applications as a React boilerplate.',
    imageURL: 'logo.svg',
  },
};

export default CONFIG;
```
