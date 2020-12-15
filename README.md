# Technician Tracker

This app is meant to represent a React usage of Mapbox GL JS and the ability to alert when technicians get near each other.

## Libraries Used

- [turfjs](https://turfjs.org/docs/#distance) -> for measuring the distance
- [react-toast-notifications](https://github.com/jossmac/react-toast-notifications) -> for a quick toasting component
- [react-map-gl](https://visgl.github.io/react-map-gl/) -> for a simplified usage of Mapbox GL JS in React.

## Reflections

I always try to offer some thoughts from the time I spent developing something.

- clean up the hooks
  - ie: the interval could be set up as a separate hook from the data pull
- separate concerns of data and view
  - Map.tsx started to get a bit heavy and I can see some of those elements moved elsewhere
- inject the JSON in an actual service that would make swapping out embedded JSON and an endpoint
- keep the formatting of the GeoJSON in the objects. I didn't realize at first that it had a particular format. Only once I integrated turfjs did I recognize I was doing unnecessary conversions.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
