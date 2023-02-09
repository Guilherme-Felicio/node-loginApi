/* eslint-disable @typescript-eslint/ban-ts-comment */
const validator = {
  isEmailValid: true,
  isEmail: function (email: string) {
    return this.isEmailValid;
  },
};

export default validator;
