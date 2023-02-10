import mockedValidator from "../__mocks__/validator";
import EmailValidator from "./email-validator";

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
    mockedValidator.isEmailValid = false;
    const sut = makeSut();
    const isEmailValid = sut.isValid("@@@@email.com");
    expect(isEmailValid).toBe(false);
  });

  test("should call validator with correct email", () => {
    const sut = makeSut();
    sut.isValid("anyemail@email.com");
    expect(mockedValidator.email).toBe("anyemail@email.com");
  });
});
