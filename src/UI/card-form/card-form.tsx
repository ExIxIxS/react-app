import React from 'react';
import { useForm } from 'react-hook-form';
import FormError from '../form-error/form-error';
import {
  countryValidator,
  dateValidator,
  genderValidator,
  nameValidator,
  notificationsValidator,
  pictureValidator,
} from '../../assets/validators/form-validators';
import { CardData, FormInputData, SubmitCardCallBack } from '../../interfaces';

import './card-form.scss';

function getCardData(submitData: FormInputData): CardData {
  return {
    name: `${submitData.name} ${submitData.surName}`,
    dateOfBirth: submitData.dateOfBirth,
    country: submitData.country,
    status: submitData.status,
    gender: submitData.gender,
    notifications: submitData.notifications,
    picture: submitData.picture?.length ? URL.createObjectURL(submitData.picture[0]) : '',
  };
}

function CardForm({ addCardCallBack }: { addCardCallBack: SubmitCardCallBack }): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormInputData>({
    mode: 'onSubmit',
    shouldFocusError: false,
  });

  function onSubmit(data: FormInputData, event?: React.BaseSyntheticEvent): void {
    event?.preventDefault();
    const cardData = getCardData(data);
    addCardCallBack(cardData);
    reset();
  }

  function onError(): void {}

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit, onError)} encType="multipart/form-data">
      <div className="form__group">
        <label className="form__label" htmlFor="name-input">
          Name:
        </label>
        <input
          className="form__input"
          type="text"
          id="name-input"
          {...register('name', { ...nameValidator })}
        />
        <FormError errors={errors} name="name" />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="surname-input">
          Surname:
        </label>
        <input
          className="form__input"
          type="text"
          id="surname-input"
          {...register('surName', { ...nameValidator })}
        />
        <FormError errors={errors} name="surName" />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="dob-input">
          Date of Birth:
        </label>
        <input
          className="form__input"
          type="date"
          id="dob-input"
          {...register('dateOfBirth', { ...dateValidator })}
        />
        <FormError errors={errors} name="dateOfBirth" />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="country-select">
          Country:
        </label>
        <select
          className="form__input"
          id="country-select"
          {...register('country', { ...countryValidator })}
        >
          <option value="">Select a country</option>
          <option value="usa">USA</option>
          <option value="canada">Canada</option>
          <option value="uk">UK</option>
          <option value="poland">Poland</option>
        </select>
        <FormError errors={errors} name="country" />
      </div>
      <div className="form__group">
        <label className="form__label">Status:</label>
        <div className="form__checkbox-group">
          <label className="form__checkbox-label">
            <input
              className="form__input  form__input--checkbox"
              type="checkbox"
              value="married"
              {...register('status')}
            />
            Married
          </label>
        </div>
        <div className="form__checkbox-group">
          <label className="form__checkbox-label">
            <input
              className="form__input form__input--checkbox"
              type="checkbox"
              value="parent"
              {...register('status')}
            />
            Parent
          </label>
        </div>
        <FormError errors={errors} name="status" />
      </div>

      <div className="form__group">
        <label className="form__label">Gender:</label>
        <input
          type="radio"
          id="male-radio"
          value="male"
          className="form__input form__input--radio"
          {...register('gender', { ...countryValidator })}
        />
        <label htmlFor="male-radio" className="form__label form__label--radio">
          Male
        </label>
        <input
          type="radio"
          id="female-radio"
          value="female"
          className="form__input form__input--radio"
          {...register('gender', { ...genderValidator })}
        />
        <label htmlFor="female-radio" className="form__label form__label--radio">
          Female
        </label>
        <FormError errors={errors} name="gender" />
      </div>
      <div className="form__group">
        <label className="form__label">Notifications:</label>
        <input
          type="checkbox"
          id="notifications-checkbox"
          className="form__input form__input--checkbox"
          {...register('notifications', { ...notificationsValidator })}
        />
        <label htmlFor="notifications-checkbox" className="form__label form__label--checkbox">
          Receive notifications
        </label>
        <FormError errors={errors} name="notifications" />
      </div>
      <div className="form__group">
        <label htmlFor="picture-upload" className="form__label">
          Picture:
        </label>
        <input
          type="file"
          id="picture-upload"
          accept="image/*"
          className="form__input form__input--picture"
          {...register('picture', { ...pictureValidator })}
        />
        <FormError errors={errors} name="picture" />
      </div>

      <button type="submit" className="form__submit-button">
        Submit
      </button>

      {isSubmitSuccessful && Object.keys(errors).length === 0 && (
        <div className="form__form-submition-message">Form submitted successfully!</div>
      )}
    </form>
  );
}

export default CardForm;
