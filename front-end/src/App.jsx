import { BrowserRouter } from 'react-router';

import { AppRouters } from './BrowserRoutes/approutes';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRouters />
      </BrowserRouter>
    </>
  );
}

export default App;
