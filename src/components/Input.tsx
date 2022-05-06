import * as React from 'react';
import { useState } from 'react';

interface Props {
  updateInput: (input: string) => void;
}

function Input({ updateInput }: Props) {
  const [input, setInput] = useState('');

  function handleUpdate(newInput: string) {
    setInput(newInput);
    updateInput(newInput);
  }

  return (
    <div className="panel">
      <h2>Input</h2>
      <textarea
        className="form-control"
        rows={10}
        value={input}
        onChange={(e) => handleUpdate(e.target.value)}
      />
    </div>
  );
}

export default Input;
