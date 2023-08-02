import React from 'react';

interface AppProps {
  num1: number;
  num2: number;
}

const App: React.FC<AppProps> = ({ num1, num2 }) => {
  const sum = num1 + num2;

  return (
    <div>
      <h1>
        Sum of {num1} and {num2} is {sum}
      </h1>
    </div>
  );
};

export default App;
