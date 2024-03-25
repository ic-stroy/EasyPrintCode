import React, { useState, useEffect, useRef } from 'react';
import './main.css';

function CodeVerificationInput({ length }) {
  const [code, setCode] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (index < length - 1 && value !== '') {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if ((e.key === 'Delete' || e.key === 'Backspace') && index > 0 && code[index] === '') {
      handleChange(index - 1, '');
      inputs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    const concatenatedCode = code.join('');
    localStorage.setItem('phone_code_verify', concatenatedCode);
  }, [code]);

  return (
    <div style={{ display: 'flex' }}>
      {code.map((char, index) => (
        <input
          ref={el => (inputs.current[index] = el)}
          className='code_input_reg'
          type="number"
          name='phone'
          id='code_verify'
          maxLength={1}
          keyboardType="number-pad"
          value={char}
          onChange={e => handleChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(e, index)}
          style={{ marginRight: '12px' }}
          key={index}
        />
      ))}
    </div>
  );
}

export default CodeVerificationInput;