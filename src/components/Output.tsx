import * as React from 'react';

interface Props {
  output: string;
}

function Output({ output }: Props) {
  return (
    <div className="panel">
      <h2>Harvest</h2>
      <textarea className="form-control" rows={8} value={output} readOnly />
    </div>
  );
}

export default Output;
