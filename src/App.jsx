import people from './data/people.json'
import DataTable from './components/DataTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <DataTable rows={people}/>
    </div>
  );
}

export default App;
