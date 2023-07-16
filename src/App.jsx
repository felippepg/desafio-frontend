import { useEffect } from 'react';
import { api } from './services/api';

function App() {
  useEffect(() => {
    api
      .get('transacao')
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  });
  return (
    <>
      <p>Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
