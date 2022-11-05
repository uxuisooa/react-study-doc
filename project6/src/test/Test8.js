import { useRef } from 'react';
import { useState, useEffect } from 'react';

/* 
새로고침을 했을때 값을 유지하고 싶다.
서버가 아닌 로컬에 있는 값.


*/
const Test8 = () => {
  //   const [count, setCount] = useState(1);
  const [count, setCount] = useState(
    // 데이터를 기억하게한 것이 있으면 그 값을 유지하고, 없으면 초기값 1을 넣어라.
    () => JSON.parse(localStorage.getItem('count')) || 1,
  );

  // 증가
  const increment = () => {
    setCount(count + 1);
  };
  // 감소
  const decrement = () => {
    setCount(count - 1);
  };
  // 삭제
  const onRemove = () => {
    localStorage.removeItem('count');
  };
  // 모두삭제
  const onRemoveAll = () => {
    localStorage.clear();
  };

  // 값을 바꿀 떄 마다
  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(count));
  });

  // ======================================================
  // 추가를 위한 작업.   ( 임의로 아래로 내려 씀. )
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const no = useRef(1);

  const onAdd = () => {
    setData([...data, { id: no.current++, text }]);
  };

  const changeInput = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const onDel = (id) => {
    setCount((item) => item.id !== id);
  };

  return (
    <>
      <h2>카운트{count}</h2>
      <p>
        <button onClick={increment}>증가</button>
        <button onClick={decrement}>감소</button>
        <button onClick={onRemove}>삭제</button>
        <button onClick={onRemoveAll}>모두삭제</button>
      </p>
      <hr />
      <div>
        <input type="text" onChange={changeInput} />
        <button onClick={onAdd}>추가</button>
        {data.map((item) => {
          <p key={item.id}>
            {item.id}/{item.text}
          </p>;
        })}
      </div>
    </>
  );
};

export default Test8;
