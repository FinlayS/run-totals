import { registerValidation } from '../../validation/register'

const validInput = {
  email: 'validEmail@test.com',
  password: 'Passw0rd',
  confirmPassword: 'Passw0rd'
};

describe('Register', () => {
  describe('invalid form data', () => {
    [
      { name: "empty form", formData: {} },
      {
        name: "invalid email: missing '@'",
        formData: {
          email: "test.email.com",
          password: validInput.password,
          confirmPassword: validInput.confirmPassword
        }
      },
      {
        name: "invalid email: missing domain",
        formData: {
          email: "test@email",
          password: validInput.password,
          confirmPassword: validInput.confirmPassword
        }
      },
      {
        name: "invalid email: missing server",
        formData: {
          email: "test@.com",
          password: validInput.password,
          confirmPassword: validInput.confirmPassword
        }
      },
      {
        name: "invalid email: empty string",
        formData: {
          email: "",
          password: validInput.password,
          confirmPassword: validInput.confirmPassword
        }
      },
      {
        name: "invalid password: too short",
        formData: {
          email: validInput.email,
          password: "Sh0rt",
          confirmPassword: validInput.confirmPassword
        }
      },
      {
        name: "invalid password: no uppercase",
        formData: {
          email: validInput.email,
          password: "n0uppercase",
          confirmPassword: validInput.confirmPassword
        }
      },
      {
        name: "invalid password: no lowercase",
        formData: {
          email: validInput.email,
          password: "ALLUPPERC4SE",
          confirmPassword: validInput.confirmPassword
        }
      },
      {
        name: "invalid password: no number",
        formData: {
          email: validInput.email,
          password: "NoNumber",
          confirmPassword: validInput.confirmPassword
        }
      },
      {
        name: "invalid password: empty string",
        formData: {
          email: validInput.email,
          password: "",
          confirmPassword: validInput.confirmPassword
        }
      },
      {
        name: "invalid confirm password: empty string",
        formData: {
          email: validInput.email,
          password: validInput.password,
          confirmPassword: ""
        }
      },
    ].forEach(testCase => {
      it(`should return false for ${testCase.name}`, () => {
        expect(registerValidation.isValidSync(testCase.formData)).toBeFalsy();
      });
    });
  })

  describe('valid form data', () => {
    [
      { name: "valid form", formData: validInput },
    ].forEach(testCase => {
      it(`should return true for ${testCase.name}`, () => {
        expect(registerValidation.isValidSync(testCase.formData)).toBeTruthy();
      });
    });
  })
})
