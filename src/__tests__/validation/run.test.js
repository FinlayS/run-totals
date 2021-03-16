import { runValidation } from "../../validation/run"

const validInput = {
  description: "Run Fast",
  date: "01/01/21"
};

describe("Add Run", () => {
  describe("invalid form data", () => {
    [
      { name: "empty form", formData: {} },
      {
        name: "invalid date",
        formData: {
          description: validInput.description,
          date: "3/13/23"
        }
      },
      {
        name: "incomplete date",
        formData: {
          description: validInput.description,
          date: "3/13/YY"
        }
      },
      {
        name: "empty date",
        formData: {
          description: validInput.description,
          date: ""
        }
      },
      {
        name: "empty description",
        formData: {
          description: "",
          date: validInput.date
        }
      },
    ].forEach(testCase => {
      it(`should return false for ${testCase.name}`, () => {
        expect(runValidation.isValidSync(testCase.formData)).toBeFalsy();
      });
    });
  })

  describe("valid form data", () => {
    [
      { name: "valid form", formData: validInput },
    ].forEach(testCase => {
      it(`should return true for ${testCase.name}`, () => {
        expect(runValidation.isValidSync(testCase.formData)).toBeTruthy();
      });
    });
  })
})
