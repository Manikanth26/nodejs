exports.Vehicle = class Vehicle {
    _speed = 0;
    accelerate(amount) {
      this._speed += amount;
    }
    brake(amount) {
      this._speed -= amount;
      if (this._speed < 0) {
        this._speed = 0;
      }
    }
    get speed() {
      return this._speed;
    }
  }

  