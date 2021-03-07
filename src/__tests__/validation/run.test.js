import { runValidation } from '../../validation/run'

const validInput = {
  runDescription: "bob",
  runDate: "252424a2525"
};

describe('Login', () => {
  describe('invalid form data', () => {
    [
      { name: "empty form", formData: {} },
      {
        name: "invalid email: missing '@'",
        formData: {
          runDescription: "a",
          runDate: '25/12111/1999'
        }
      },
      // {
      //   name: "invalid email: missing domain",
      //   formData: {
      //     email: "test@email",
      //     password: validInput.password
      //   }
      // },
      // {
      //   name: "invalid email: missing server",
      //   formData: {
      //     email: "test@.com",
      //     password: validInput.password
      //   }
      // },
      // {
      //   name: "invalid email: empty string",
      //   formData: {
      //     email: "",
      //     password: validInput.password
      //   }
      // },
      // {
      //   name: "invalid password: too short",
      //   formData: {
      //     email: validInput.email,
      //     password: "Sh0rt"
      //   }
      // },
    ].forEach(testCase => {
      it(`should return false for ${testCase.name}`, () => {
        expect(runValidation.isValidSync(testCase.formData)).toBeFalsy();
      });
    });
  })

  describe('valid form data', () => {
    [
      { name: "valid form", formData: validInput },
    ].forEach(testCase => {
      it(`should return true for ${testCase.name}`, () => {
        expect(runValidation.isValidSync(testCase.formData)).toBeTruthy();
      });
    });
  })
})
