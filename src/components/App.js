import { useState } from 'react';
import { authService } from '../firebase';
import AppRouter from './Router';

function App() {
  const [isLoggedin,setIsLoggedin]= useState(authService.currentUser);
  return (
    <div className="App">
      <AppRouter isLoggedin={isLoggedin}/>
      <footer>&copy;{new Date().getFullYear()}Talim</footer>
    </div>
  );
}

export default App;
