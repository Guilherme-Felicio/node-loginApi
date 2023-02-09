/* eslint-disable @typescript-eslint/ban-ts-comment */
const validator = {
  isEmailValid: true,
  email: "",
  isEmail: function (email: string) {
    this.email = email;
    return this.isEmailValid;
  },
};

export default validator;
