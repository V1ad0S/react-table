import { useState, useEffect } from 'react';
import Table from './elements/Table';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/react-table/mockdata.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => console.error(error));
  }, []);

  const columns = [
    { field: 'id', label: '', isSticky: false },
    { field: 'record_name', label: 'Название записи', isSticky: true },
    { field: 'start', label: 'Начало', isSticky: false },
    { field: 'duration', label: 'Длительность', isSticky: true },
    { field: 'channels', label: 'Каналы', isSticky: false },
    { field: 'employee', label: 'Сотрудник', isSticky: false },
    { field: 'data_size', label: 'Данные', isSticky: false },
    { field: 'mock_1', label: 'Mock 1', isSticky: false },
    { field: 'mock_2', label: 'Mock 2', isSticky: false },
    { field: 'mock_3', label: 'Mock 3', isSticky: false },
    { field: 'mock_4', label: 'Mock 4', isSticky: false },
    { field: 'mock_5', label: 'Mock 5', isSticky: false },
  ]

  return (
    <div className='App'>
      {/* {!data ? <Table columns={columns} data={data} /> : <h1>Empty</h1>} */}
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
