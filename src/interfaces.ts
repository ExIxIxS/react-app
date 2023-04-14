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
  picture: FileList | undefined;
}

type SerialFormInputData = Pick<
  FormInputData,
  'name' | 'surName' | 'dateOfBirth' | 'country' | 'status' | 'gender' | 'notifications'
> &
  Pick<CardData, 'picture'>;

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

type NotificationCallBack = (arg: string) => void;

type SearchProgressCallBack = (arg: boolean) => void;

type AuthorCallBack = (arg: RestAuthor) => void;

type SearchStateCallBack = NotificationCallBack;

interface RestAuthor {
  wikipedia: string | undefined;
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
  birth_date: string | undefined;
  entity_type: string;
  photos: number[];
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
  clickHandler: () => void;
}

interface ProgressBarProps {
  isInProgress: boolean;
}

interface NotificationProps {
  notification: string;
}

interface TestUserResponse {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: RestAuthor[];
}

interface Link {
  to: string;
  label: string;
}

interface SearchQueryState {
  value: string;
}

interface SearchResultState {
  value: RestAuthorData[];
}

interface FormSubmitResultState {
  value: SerialFormInputData;
}

interface AppStoreState {
  searchQuery: SearchQueryState;
  searchResult: SearchResultState;
  formSubmitResult: FormSubmitResultState;
}

type SearchQuerySelector = (state: AppStoreState) => string;

type SearchResultSelector = (state: AppStoreState) => RestAuthorData[];

type FormSubmitResultSelector = (state: AppStoreState) => SerialFormInputData;

export type {
  User,
  CardProps,
  CardData,
  CardWrapperProps,
  HeaderProps,
  HeaderLink,
  SubmitCardCallBack,
  FormInputData,
  SerialFormInputData,
  FormErrorProps,
  RestCardProps,
  RestAuthorData,
  RestSearchData,
  SearchCallBack,
  RestAuthor,
  AuthorCallBack,
  AuthorCardData,
  CardAuthorProps,
  NotificationCallBack,
  SearchProgressCallBack,
  ProgressBarProps,
  NotificationProps,
  TestUserResponse,
  Link,
  AppStoreState,
  SearchStateCallBack,
  SearchQueryState,
  SearchQuerySelector,
  SearchResultState,
  SearchResultSelector,
  FormSubmitResultSelector,
};
