describe("Email validators tests", () => {
  class EmailValidator {
    isValid(email: string) {
      return true;
    }
  }

  test("should return true if validator returns true", () => {
    const sut = new EmailValidator();
    const isEmailValid = sut.isValid("valid_email@email.com");
    expect(isEmailValid).toBe(true);
  });
});
