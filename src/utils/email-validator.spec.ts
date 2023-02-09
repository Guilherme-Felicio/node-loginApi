import validator from "../__mocks__/validator";

const makeSut = () => {
  return new EmailValidator();
};

describe("Email validators tests", () => {
  test("should return true if validator returns true", () => {
    const sut = makeSut();
    const isEmailValid = sut.isValid("valid_email@email.com");
    expect(isEmailValid).toBe(true);
  });

  test("should return false if validator returns false", () => {
    validator.isEmailValid = false;
    const sut = makeSut();
    const isEmailValid = sut.isValid("@@@@email.com");
    expect(isEmailValid).toBe(false);
  });

  test("should call validator with correct email", () => {
    const sut = makeSut();
    sut.isValid("anyemail@email.com");
    expect(validator.email).toBe("anyemail@email.com");
  });
});
