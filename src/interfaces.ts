interface User {
  id: string;
  avatar: string;
  name: string;
}

interface CardProps {
  name: string;
  dateOfBirth: string;
  country: string;
  status: string[];
  gender: string;
  notifications: boolean;
  picture: string | null;
}

interface CardData {
  name: string;
  dateOfBirth: string;
  country: string;
  status: string[];
  gender: string;
  notifications: boolean;
  picture: string | null;
}

interface CardWrapperProps {
  cards: CardData[];
}

interface SearchProps {
  // Define the props here
}

interface SearchState {
  searchQuery: string;
}

interface HeaderProps {
  // Define your props types here
}

interface HeaderState {
  // Define your state types here
}

interface FormProps {
  initialCards: CardData[];
  onSubmit: (cardData: CardData) => void;
}

interface FormState {
  name: string;
  surname: string;
  dateOfBirth: string;
  country: string;
  status: string[];
  gender: string;
  notifications: boolean;
  picture: string;
  errors: { [key: string]: string };
  isFormSubmitted: boolean; // Include isFormSubmitted in the state type definition
  nameError: string;
  surNameError: string;
  dateOfBirthError: string;
  countryError: string;
}

interface SubmitData {
  nameInput: HTMLInputElement | null;
  surNameInput: HTMLInputElement | null;
  dateOfBirthInput: HTMLInputElement | null;
  countryInput: HTMLSelectElement | null;
  statusInputs: HTMLInputElement[] | null;
  genderInputs: HTMLInputElement[] | null;
  notificationsInput: HTMLInputElement | null;
  pictureInput: HTMLInputElement | null;
  errors: Record<string, string>;
}

export type {
  User,
  CardProps,
  CardData,
  CardWrapperProps,
  SearchProps,
  SearchState,
  HeaderProps,
  HeaderState,
  FormProps,
  FormState,
  SubmitData,
};
