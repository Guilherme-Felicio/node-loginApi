import validator from "../__mocks__/validator";

describe("Email validators tests", () => {
  class EmailValidator {
    isValid(email: string) {
      return validator.isEmail(email);
    }
  }

  test("should return true if validator returns true", () => {
    const sut = new EmailValidator();
    const isEmailValid = sut.isValid("valid_email@email.com");
    expect(isEmailValid).toBe(true);
  });

  test("should return false if validator returns false", () => {
    validator.isEmailValid = false;
    const sut = new EmailValidator();
    const isEmailValid = sut.isValid("@@@@email.com");
    expect(isEmailValid).toBe(false);
  });
});
