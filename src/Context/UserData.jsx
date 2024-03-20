import React from 'react';

const Context = React.createContext();

function Provider({ children }) {
	const [data, setData] = React.useState(
		JSON.parse(window.localStorage.getItem('data')) || false,
	);

	React.useEffect(() => {
		if (data) {
			window.localStorage.setItem('data', JSON.stringify(data));
		} else {
			window.localStorage.removeItem('data');
		}
	}, [data]);

	return (
		<Context.Provider value={{ data, setData }}>
			{children}
		</Context.Provider>
	);
}

export { Provider, Context };
