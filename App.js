import './App.css';
import DateTimePicker from './DatePicker';

function App() {
  const handleOnSubmit = (startDate, endDate) => { console.log(startDate, endDate) };
  return (
    <div className="App">
    <DateTimePicker onSubmit={handleOnSubmit} sameEndDate />
    </div>
  );
}

export default App;
