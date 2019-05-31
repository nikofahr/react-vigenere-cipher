import React from 'react';

import './Form.css';

const Form = props => {
  return (
    <form className="form" onSubmit={event => event.preventDefault()}>
      <input
        className="input"
        placeholder="Text"
        onChange={props.onChangeText}
        value={props.valueText}
      />

      <input
        className="input"
        placeholder="Key"
        onChange={props.onChangeKey}
        value={props.valueKey}
      />

      <input
        className="input"
        placeholder="Encryption"
        onChange={props.onChangeEnc}
        value={props.valueEnc}
      />

      <input
        className="input"
        placeholder="Decryption"
        value={props.valueDec}
        readOnly
      />

      <button className="button-enc" onClick={props.onEncryptButton}>
        Enkripsi
      </button>
      <button className="button-dec" onClick={props.onDecryptButton}>
        Dekripsi
      </button>
      <button className="button-res" onClick={props.onResetButton}>
        Reset
      </button>
    </form>
  );
};

export default Form;
