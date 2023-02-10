/* eslint-disable @typescript-eslint/ban-ts-comment */

const mockedValidator = {
  isEmailValid: true,
  email: "",
  isEmail: function (email: string) {
    this.email = email;
    return this.isEmailValid;
  },
};

export default mockedValidator;
