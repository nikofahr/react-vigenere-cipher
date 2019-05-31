import React, { Component } from 'react';
import Form from './components/Form/Form';
import Footer from './components/Footer/Footer';

class App extends Component {
  state = {
    text: '',
    key: '',
    keyTextSum: '',
    resultEnc: '',
    resultDec: '',
    passKey: ''
  };

  charChipper = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ];

  onChangeTextHandler = event => {
    // REGEX FOR STRING VALIDATION
    const letters = /^[A-Za-z\s]+$/;
    if (event.target.value.match(letters) || event.target.value === '') {
      this.setState({ text: event.target.value });
    }
  };

  onChangeKeyHandler = event => {
    const letters = /^[A-Za-z\s]+$/;
    if (event.target.value.match(letters) || event.target.value === '') {
      this.setState({ key: event.target.value });
    }
  };

  onChangeEncHandler = event => {
    this.setState({ resultEnc: event.target.value });
  };

  onEncryptionHandler = () => {
    if (this.state.text && this.state.key) {
      const resultText = [];
      const finalResult = [];
      const finalKey = [];
      const key = this.state.key.toLowerCase();
      const text = this.state.text.toLowerCase();

      // TEXT
      [...text].forEach(elText => {
        resultText.push(this.charChipper.indexOf(elText));
      });

      // Me-generete key sesuai dengan text
      let j = 0;
      let passKey = [];
      [...text].forEach((el, index) => {
        passKey[index] = key[j];

        if (el === ' ') {
          passKey[index] = ' ';
        } else {
          if (j < key.length - 1) {
            j++;
          } else {
            j = 0;
          }
        }
      });

      passKey.forEach(elKey => {
        finalKey.push(this.charChipper.indexOf(elKey));
      });

      resultText.forEach((text, index) => {
        if (finalKey[index] === -1) {
          finalResult.push(-1);
        } else {
          finalResult.push(text + finalKey[index]);
        }
      });

      // Mod proses
      const finalChipper = [];

      finalResult.forEach((result, index) => {
        if (result === -1) {
          finalChipper.push(' ');
        } else {
          const mod = result % this.charChipper.length;
          finalChipper.push(this.charChipper[mod]);
        }
      });

      this.setState({
        keyTextSum: finalResult,
        resultEnc: finalChipper.join('')
      });
    }
  };

  onDecryptionHandler = () => {
    if (this.state.resultEnc && this.state.keyTextSum) {
      const enc = this.state.keyTextSum;
      const text = this.state.text.toLowerCase();
      const key = this.state.key.toLowerCase();
      const finalKey = [];
      const finalResult = [];

      // Me-generete key sesuai dengan text
      let j = 0;
      let passKey = [];
      [...text].forEach((el, index) => {
        passKey[index] = key[j];

        if (el === ' ') {
          passKey[index] = ' ';
        } else {
          if (j < key.length - 1) {
            j++;
          } else {
            j = 0;
          }
        }
      });

      passKey.forEach(elKey => {
        if (elKey === ' ') {
          finalKey.push(-1);
        } else {
          finalKey.push(this.charChipper.indexOf(elKey));
        }
      });

      // Convert Proses for Dec
      enc.forEach((text, index) => {
        if (text === -1) {
          finalResult.push(-1);
        } else {
          finalResult.push(text - finalKey[index]);
        }
      });

      // Mod Proses to Dec
      const finalChipperDec = [];
      finalResult.forEach(result => {
        if (result === -1) {
          finalChipperDec.push(' ');
        } else {
          const mod = result % this.charChipper.length;
          finalChipperDec.push(this.charChipper[mod]);
        }
      });

      this.setState({ resultDec: finalChipperDec.join('') });
    }

    // Tanpa Text
    if (this.state.key && this.state.resultEnc && !this.state.text) {
      const key = this.state.key.toLowerCase();
      const resultEnc = this.state.resultEnc.toLowerCase();
      const finalKey = [];
      const finalEnc = [];
      const finalResult = [];

      // Me-generete key sesuai dengan text
      let j = 0;
      let passKey = [];
      [...resultEnc].forEach((el, index) => {
        passKey[index] = key[j];

        if (el === ' ') {
          passKey[index] = ' ';
        } else {
          if (j < key.length - 1) {
            j++;
          } else {
            j = 0;
          }
        }
      });

      passKey.forEach(elKey => {
        if (elKey === ' ') {
          finalKey.push(-1);
        } else {
          finalKey.push(this.charChipper.indexOf(elKey));
        }
      });

      [...resultEnc].forEach(elEnc => {
        if (elEnc === -1) {
          finalEnc.push(' ');
        } else {
          finalEnc.push(this.charChipper.indexOf(elEnc));
        }
      });

      // Convert & Mod Proses for Dec
      finalEnc.forEach((text, index) => {
        if (text === -1) {
          finalResult.push(-1);
        } else {
          const decFormula =
            text +
              this.charChipper.length -
              (finalKey[index] % this.charChipper.length) >=
            26
              ? text +
                this.charChipper.length -
                (finalKey[index] % this.charChipper.length) -
                26
              : text +
                this.charChipper.length -
                (finalKey[index] % this.charChipper.length);

          finalResult.push(decFormula);
        }
      });

      const finalChipperDec = [];
      finalResult.forEach(result => {
        if (result === -1) {
          finalChipperDec.push(' ');
        } else {
          finalChipperDec.push(this.charChipper[result]);
        }
      });

      this.setState({ resultDec: finalChipperDec.join('') });
    }
  };

  onResetHandler = () => {
    this.setState({
      text: '',
      key: '',
      resultEnc: '',
      resultDec: ''
    });
  };

  render() {
    return (
      <div>
        <Form
          onChangeText={this.onChangeTextHandler}
          onChangeKey={this.onChangeKeyHandler}
          onChangeEnc={this.onChangeEncHandler}
          valueText={this.state.text}
          valueKey={this.state.key}
          valueEnc={this.state.resultEnc}
          valueDec={this.state.resultDec}
          onEncryptButton={this.onEncryptionHandler}
          onDecryptButton={this.onDecryptionHandler}
          onResetButton={this.onResetHandler}
          valuePassKey={this.state.passKey}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
