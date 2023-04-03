import { FieldErrors, FieldValues } from 'react-hook-form';

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
  picture: string | URL;
}

interface CardData extends CardProps {}

interface CardWrapperProps {
  cards: CardData[];
}

interface HeaderLink {
  to: string;
  label: string;
}

interface HeaderProps {
  links: HeaderLink[];
}

type SubmitCardCallBack = (data: CardData) => void;

interface FormInputData {
  name: string;
  surName: string;
  dateOfBirth: string;
  country: string;
  status: string[];
  gender: string;
  notifications: boolean;
  picture: FileList;
}

type CustomFieldErrors = {
  [key: string]: {
    message: string;
  };
};

interface FormErrorProps {
  errors: CustomFieldErrors | FieldErrors<FieldValues>;
  name: string;
}

export type {
  User,
  CardProps,
  CardData,
  CardWrapperProps,
  HeaderProps,
  HeaderLink,
  SubmitCardCallBack,
  FormInputData,
  FormErrorProps,
};
