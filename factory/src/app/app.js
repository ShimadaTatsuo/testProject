const normal = document.getElementById('normal');
const warning = document.getElementById('warning');
const error = document.getElementById('error');

/*
normal.addEventListener('click', function () {
  text.value = 'normal';
  text.style.background = '#ffffff';
  text.style.color = '#000000';
});

warning.addEventListener('click', function () {
  text.value = 'warning';
  text.style.background = '#ffff00';
  text.style.color = '#000000';
});

error.addEventListener('click', function () {
  text.value = 'error';
  text.style.background = '#ff0000';
  text.style.color = '#ffffff';
});
*/

// todo
// ファイル分割、jsならの省略 改善余地は色々

class Form {
  constructor() {
    this.stateFactory = new stateFactory();
    this.text = document.getElementById('text');
  }
  buttonClick() {
    const self = this;
    normal.addEventListener('click', function () {
      self.changeTextBox(self.stateFactory.Normal());
    });
    warning.addEventListener('click', function () {
      self.changeTextBox(self.stateFactory.Warning());
    });
    error.addEventListener('click', function () {
      self.changeTextBox(self.stateFactory.Error());
    });
  }
  changeTextBox(state) {
    state.change(this.text);
  }
}

class abstractState {
  change(text) {
    text.value = this.getText();
    text.style.background = this.getBackColor();
    text.style.color = this.getFontColor();
  }
  getText() {
    return ''
  }
  getBackColor() {
    return ''
  }
  getFontColor() {
    return ''
  }
}

class NormalState extends abstractState {
  getText() {
    return 'Normal'
  }
  getBackColor() {
    return '#ffffff'
  }
  getFontColor() {
    return '#000000'
  }
}

class WarningState extends abstractState {
  getText() {
    return 'Warning'
  }
  getBackColor() {
    return '#ffff00'
  }
  getFontColor() {
    return '#000000'
  }
}

class ErrorState extends abstractState {
  getText() {
    return 'Error'
  }
  getBackColor() {
    return '#ff0000'
  }
  getFontColor() {
    return '#ffffff'
  }
}

class stateFactory {
  constructor() {
    this.normal = new NormalState()
    this.warning = new WarningState()
    this.error = new ErrorState()
  }
  Normal() {
    return this.normal
  }
  Warning() {
    return this.warning
  }
  Error() {
    return this.error
  }
}

const form = new Form()
form.buttonClick();
