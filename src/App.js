import logo from './logo.svg';
import './App.css';
import Auth from './components/Auth';
import UserTable from './components/UserTable';
import { useState } from 'react';
import { useEffect } from 'react';
import UserFaq from './components/UserFaq';

function App() {
  const [user, setUser] = useState({
    auth_token: null,
  });
  const [showFaq, setShowFaq] = useState(false);

  const handleShowFaq = () => {
    setShowFaq(!showFaq);
  };
  useEffect(() => {
    console.log("user auth token: ", user.auth_token)
  }, [user]);

  
  return (
    <div className="App">
      { user.auth_token===null ? (
      <Auth user={setUser} />) : (
        !showFaq ?(
        <div>
          <UserTable token={user.auth_token} />
          <button onClick={handleShowFaq}>show FAQ</button>
        </div> ) : (
          <div>
            <h1>FAQ</h1>
            <UserFaq token={user.auth_token} />
            <button onClick={handleShowFaq}>show UserTable</button>
          </div>)
        
      )
}
    
    </div>
  );
}

export default App;
