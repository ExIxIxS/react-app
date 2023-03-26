interface User {
  id: string;
  avatar: string;
  name: string;
}

interface CardProps {
  name: string;
  surname: string;
  dateOfBirth: string;
  country: string;
  status: string[];
  gender: string;
  notifications: boolean;
  picture: string | null;
}

interface CardData {
  name: string;
  surname: string;
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

export type {
  User,
  CardProps,
  CardData,
  CardWrapperProps,
  SearchProps,
  SearchState,
  HeaderProps,
  HeaderState,
};
