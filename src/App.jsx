// import { useEffect } from 'react';
// import { api } from './services/api';
import './main.css';

function App() {
  // useEffect(() => {
  //   api
  //     .get('transacao')
  //     .then((response) => console.log(response.data))
  //     .catch((error) => console.log(error));
  // });
  return (
    <div className="bg-red-500 flex flex-col items-center justify-center h-screen w-screen">
      <div className="bg-white flex flex-col w-3/4 h-3/4">
        <div className="bg-blue-500 flex justify-between p-4">
          <input className="bg-orange-500 w-1/5" type="text" />
          <input className="bg-orange-500 w-1/5" type="text" />
          <input className="bg-orange-500 w-2/5" type="text" />
        </div>

        <div className="flex justify-end pr-4">
          <input
            className="bg-orange-500 w-1/5 mt-2 mb-2 p-1"
            type="button"
            value="pesquisar"
          />
        </div>

        <div className="bg-purple-500 w-full h-full p-4">
          <div className="bg-green-500 w-full h-full"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
