import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);

serviceWorkerRegistration.register();
