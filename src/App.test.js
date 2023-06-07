import { renderWithProviders } from "./test-utils";
import { fireEvent, screen } from "@testing-library/react";
import App from "./App";

test("navbar component should render", () => {
  renderWithProviders(<App />);
  const element = screen.getByText(/contact app/i);
  expect(element).toBeInTheDocument();
});

test("loading should render when data contact is fetching", () => {
  renderWithProviders(<App />);
  const spinner = screen.getByTestId("loading-main-data");
  expect(spinner).toBeInTheDocument();
});

test("data contact and table should show after fetching", async () => {
  renderWithProviders(<App />);
  const tableHead = await screen.findByText(/first name/i);
  expect(tableHead).toBeInTheDocument();
});

// test("modal should show after button clicked", async () => {
//   renderWithProviders(<App />);
//   const buttonEl = await screen.findByText(/add contact/i);
//   fireEvent.click(buttonEl);

//   const modalTitle = screen.getByText(/Add New Contact/i);
//   expect(modalTitle).toBeInTheDocument();
// });

test("photo url form input should change when text inserted", () => {
  renderWithProviders(<App />);
  const photoInput = screen.getByPlaceholderText(/Photo url/i);
  const testValue = "test";

  fireEvent.change(photoInput, { target: { value: testValue } });
  expect(photoInput.value).toBe(testValue);
});

test("first name form input should change when text inserted", () => {
  renderWithProviders(<App />);
  const firstNameInput = screen.getByPlaceholderText(/first name/i);
  const testValue = "test";

  fireEvent.change(firstNameInput, { target: { value: testValue } });
  expect(firstNameInput.value).toBe(testValue);
});

test("last name form input should change when text inserted", () => {
  renderWithProviders(<App />);
  const lastNameInput = screen.getByPlaceholderText(/last name/i);
  const testValue = "test";

  fireEvent.change(lastNameInput, { target: { value: testValue } });
  expect(lastNameInput.value).toBe(testValue);
});

test("age form input should change when text inserted", () => {
  renderWithProviders(<App />);
  const ageInput = screen.getByPlaceholderText(/age/i);
  const testValue = "2";

  fireEvent.change(ageInput, { target: { value: parseInt(testValue) } });
  expect(ageInput.value).toBe(testValue);
});
