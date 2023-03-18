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

  const labels = [
    "",
    "Название записи",
    "Начало",
    "Длительность",
    "Каналы",
    "Сотрудник",
    "Данные",
    "Mock 1",
    "Mock 2",
    "Mock 3",
    "Mock 4",
    "Mock 5",
  ];

  const widths_in_em = [
    4,
    20,
    12,
    10,
    6,
    12,
    7,
    7,
    10,
    10,
    18,
    18,
  ];

  const sticky_idxes = [1, 3];

  return (
    <div className='App'>
      {(data.length !== 0) ?
        <Table
          data={data}
          labels={labels}
          stickyIndexes={sticky_idxes}
          widths={widths_in_em}
        />
        : <h1>Empty</h1>}
    </div>
  );
}

export default App;
