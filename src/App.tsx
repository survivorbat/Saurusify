import * as React from 'react';
import './App.css';
import { useState } from 'react';
import { synonym } from 'js-synonyms';
import { Col, Container, Row } from 'react-bootstrap';
import Output from './components/Output';
import Input from './components/Input';

const wordCache: Record<string, string> = {};

function handleUpdate(input: string, setOutput: (output: string) => void) {
  const result = input.split(/\b/).map((word, index) => {
    // Skip words that are too short
    if (word.length < 4) {
      return word;
    }

    const cacheKey = `${word}_${index}`;
    if (wordCache[cacheKey]) {
      return wordCache[cacheKey];
    }

    const synonyms = synonym(word);

    if (synonyms.length === 0) {
      return word;
    }

    const chosenSynonym = synonyms[Math.floor(Math.random() * synonyms.length)];

    wordCache[cacheKey] = chosenSynonym;
    return chosenSynonym;
  });

  setOutput(result.join(''));
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
        <Col md={6} sm={12}>
          <Input updateInput={(update) => handleUpdate(update, setOutput)} />
        </Col>
        <Col md={6} sm={12}>
          <Output output={output} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
