import logo from './logo.svg';
import './App.css';
import AppRouter from './routes/AppRouter';
import Order from '../src/components/Order'
function App() {
  return (
    <div className="App">
     <AppRouter></AppRouter>
     {/* <Order/> */}
    </div>
  );
}

export default App;
