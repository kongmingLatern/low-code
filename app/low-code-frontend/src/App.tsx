import RenderTemplate from '@packages/renderer-core/renderTemplate'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';

function App() {
	const [state] = useState(useLocation().state)

	return <RenderTemplate element={state}></RenderTemplate>

}
export default App
