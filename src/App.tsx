import * as React from 'react';
import './App.css';
import { useState } from 'react';
import * as synonymsArray from 'synonyms-array';
import { Col, Container, Row } from 'react-bootstrap';
import Output from './components/Output';
import Input from './components/Input';

const wordCache: Record<string, string> = {};

function handleUpdate(input: string, setOutput: (output: string) => void) {
  const result = input.split(' ').map((w, index) => {
    const cacheKey = `${w}_${index}`;
    if (wordCache[cacheKey]) {
      return wordCache[cacheKey];
    }

    if (w.length <= 3) {
      return w;
    }

    const synonyms = synonymsArray.get(w);

    if (synonyms.length === 0) {
      return w;
    }

    const synonym = synonyms[Math.floor(Math.random() * synonyms.length)];

    wordCache[cacheKey] = synonym;
    return synonym;
  });

  setOutput(result.join(' '));
}

function App() {
  const [output, setOutput] = useState('');

  return (
    <Container>
      <Row>
        <Col>
          <div className="title-container">
            <h1>Saurusify</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input updateInput={(update) => handleUpdate(update, setOutput)} />
        </Col>
        <Col>
          <Output output={output} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
