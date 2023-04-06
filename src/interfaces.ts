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

interface RestCardProps {
  id: string;
  name: string;
  birthDate: string;
  topWork: string;
  workCount: number;
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

interface RestAuthorData {
  key: string;
  text: string[];
  type: string;
  name: string;
  alternate_names: string[];
  birth_date: string;
  top_work: string;
  work_count: number;
  top_subjects: string[];
  _version_: number;
}

interface RestSearchData {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: RestAuthorData[];
}

type SearchCallBack = (arg: RestAuthorData[]) => void;

type AuthorCallBack = (arg: RestAuthor) => void;

interface RestAuthor {
  wikipedia: string;
  personal_name: string;
  key: string;
  alternate_names: string[];
  remote_ids: {
    wikidata: string;
    isni: string;
    goodreads: string;
    viaf: string;
    librarything: string;
    amazon: string;
  };
  type: {
    key: string;
  };
  links: {
    title: string;
    url: string;
    type: {
      key: string;
    };
  }[];
  name: string;
  title: string;
  birth_date: string;
  entity_type: string;
  photos: [number, number];
  source_records: string[];
  bio: {
    type: string;
    value: string;
  };
  latest_revision: number;
  revision: number;
  created: {
    type: string;
    value: string;
  };
  last_modified: {
    type: string;
    value: string;
  };
}

type AuthorCardData = Pick<
  RestAuthor,
  'photos' | 'personal_name' | 'birth_date' | 'entity_type' | 'wikipedia' | 'bio'
>;

interface CardAuthorProps {
  picture: string | URL;
  name: string;
  dateOfBirth: string;
  autorType: string;
  wikiLink: string;
  bio: string;
  clickHandler?: () => void;
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
  RestCardProps,
  RestAuthorData,
  RestSearchData,
  SearchCallBack,
  RestAuthor,
  AuthorCallBack,
  AuthorCardData,
  CardAuthorProps,
};
