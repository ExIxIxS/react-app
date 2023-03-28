import React, { Component, createRef } from 'react';

import { CardData, FormProps, FormState, SubmitData } from '../../interfaces';

import './card-form.scss';

const initialFormState = {
  name: '',
  surname: '',
  dateOfBirth: '',
  country: '',
  status: [],
  gender: '',
  notifications: false,
  picture: '',
  errors: {},
  isFormSubmitted: false,
  nameError: '',
  surNameError: '',
  dateOfBirthError: '',
  countryError: '',
};

class CardForm extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = { ...initialFormState };
  }

  private nameRef = createRef<HTMLInputElement>();
  private surNameRef = createRef<HTMLInputElement>();
  private dateOfBirthRef = createRef<HTMLInputElement>();
  private countryRef = createRef<HTMLSelectElement>();
  private statusRefs = [createRef<HTMLInputElement>(), createRef<HTMLInputElement>()];
  private maleGenderRef = createRef<HTMLInputElement>();
  private femaleGenderRef = createRef<HTMLInputElement>();
  private notificationsRef = createRef<HTMLInputElement>();
  private pictureRef = createRef<HTMLInputElement>();

  private createSubmitDataObj(): SubmitData {
    return {
      nameInput: this.nameRef.current!,
      surNameInput: this.surNameRef.current!,
      dateOfBirthInput: this.dateOfBirthRef.current!,
      countryInput: this.countryRef.current!,
      statusInputs: this.statusRefs.map((ref) => ref.current!),
      genderInputs: [this.maleGenderRef.current!, this.femaleGenderRef.current!],
      notificationsInput: this.notificationsRef.current!,
      pictureInput: this.pictureRef.current!,
      errors: {},
    };
  }

  private validateForm(submitData: SubmitData) {
    let hasErrors = false;

    if (!submitData) {
      return;
    }

    if (!submitData.nameInput?.value.trim()) {
      submitData.errors.name = 'Name is required';
      hasErrors = true;
    } else if (!/^[A-Z]/.test(submitData.nameInput.value)) {
      submitData.errors.name = 'Name must start with an uppercase letter';
      hasErrors = true;
    }

    if (!submitData.surNameInput?.value.trim()) {
      submitData.errors.surname = 'Surname is required';
      hasErrors = true;
    } else if (!/^[A-Z]/.test(submitData.surNameInput.value)) {
      submitData.errors.surname = 'Surname must start with an uppercase letter';
      hasErrors = true;
    }

    if (!submitData.dateOfBirthInput?.value.trim()) {
      submitData.errors.dateOfBirth = 'Date of birth is required';
      hasErrors = true;
    }

    if (
      submitData.dateOfBirthInput?.value.trim() &&
      Date.parse(submitData.dateOfBirthInput.value.trim()) >= Date.now()
    ) {
      submitData.errors.dateOfBirth = 'Person must have already been born';
      hasErrors = true;
    }

    if (!submitData.countryInput?.value.trim()) {
      submitData.errors.country = 'Country is required';
      hasErrors = true;
    }

    if (!submitData.genderInputs?.some((input) => input.checked)) {
      submitData.errors.gender = 'Gender is required';
      hasErrors = true;
    }

    if (hasErrors) {
      this.setState({ errors: submitData.errors });
      return;
    }
  }

  private resetForm(submitData: SubmitData): void {
    if (!submitData) {
      return;
    }

    submitData.nameInput!.value = '';
    submitData.surNameInput!.value = '';
    submitData.dateOfBirthInput!.value = '';
    submitData.countryInput!.value = '';
    submitData.genderInputs!.forEach((input) => (input.checked = false));
    submitData.notificationsInput!.checked = false;
    submitData.pictureInput!.value = '';
    this.statusRefs.forEach((ref) => (ref.current!.checked = false));
    this.setState({ errors: {} });
  }

  private getCardData(submitData: SubmitData): CardData {
    return {
      name: `${submitData.nameInput?.value} ${submitData.surNameInput?.value}`,
      dateOfBirth: submitData.dateOfBirthInput?.value ?? '',
      country: submitData.countryInput?.value ?? '',
      status: submitData.statusInputs
        ? submitData.statusInputs
            .filter((input) => input.checked)
            .map((input) => (input.value ? input.value : ''))
        : [],
      gender: submitData.genderInputs?.find((input) => input.checked)?.value ?? 'unknown',
      notifications: submitData.notificationsInput ? submitData.notificationsInput.checked : false,
      picture: submitData.pictureInput?.files![0]
        ? URL.createObjectURL(submitData.pictureInput.files![0])
        : '',
    };
  }

  private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    this.setState({ isFormSubmitted: true });
    event.preventDefault();

    const submitData = this.createSubmitDataObj();
    this.validateForm(submitData);

    if (!Object.keys(submitData.errors).length) {
      const cardData = this.getCardData(submitData);
      this.props.onSubmit(cardData);
      this.resetForm(submitData);
    }
  };

  render() {
    const { isFormSubmitted, errors } = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form__group">
          <label className="form__label" htmlFor="name-input">
            Name:
          </label>
          <input
            className="form__input"
            type="text"
            id="name-input"
            name="name"
            ref={this.nameRef}
          />
          {errors.name && isFormSubmitted && <span className="form__error">{errors.name}</span>}
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="surname-input">
            Surname:
          </label>
          <input
            className="form__input"
            type="text"
            id="surname-input"
            name="surname"
            ref={this.surNameRef}
          />
          {errors.surname && isFormSubmitted && (
            <span className="form__error">{errors.surname}</span>
          )}
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="dob-input">
            Date of Birth:
          </label>
          <input
            className="form__input"
            type="date"
            id="dob-input"
            name="dateOfBirth"
            ref={this.dateOfBirthRef}
          />
          {errors.dateOfBirth && isFormSubmitted && (
            <span className="form__error">{errors.dateOfBirth}</span>
          )}
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="country-select">
            Country:
          </label>
          <select className="form__input" id="country-select" name="country" ref={this.countryRef}>
            <option value="">Select a country</option>
            <option value="usa">USA</option>
            <option value="canada">Canada</option>
            <option value="uk">UK</option>
          </select>
          {errors.country && isFormSubmitted && (
            <span className="form__error">{errors.country}</span>
          )}
        </div>
        <div className="form__group">
          <label className="form__label">Status:</label>
          <div className="form__checkbox-group">
            <label className="form__checkbox-label">
              <input
                className="form__checkbox-input"
                type="checkbox"
                name="status"
                value="married"
                ref={this.statusRefs[0]}
              />
              Married
            </label>
          </div>
          <div className="form__checkbox-group">
            <label className="form__checkbox-label">
              <input
                className="form__checkbox-input"
                type="checkbox"
                name="status"
                value="parent"
                ref={this.statusRefs[1]}
              />
              Parent
            </label>
          </div>
          {errors.status && isFormSubmitted && <span className="form__error">{errors.status}</span>}
        </div>

        <div className="form__group">
          <label className="form__label">Gender:</label>
          <input
            type="radio"
            id="male-radio"
            name="gender"
            value="male"
            className="form__input"
            ref={this.maleGenderRef}
          />
          <label htmlFor="male-radio" className="form__label form__label--radio">
            Male
          </label>
          <input
            type="radio"
            id="female-radio"
            name="gender"
            value="female"
            className="form__input"
            ref={this.femaleGenderRef}
          />
          <label htmlFor="female-radio" className="form__label form__label--radio">
            Female
          </label>
          {errors.gender && isFormSubmitted && <span className="form__error">{errors.gender}</span>}
        </div>
        <div className="form__group">
          <label className="form__label">Notifications:</label>
          <input
            type="checkbox"
            id="notifications-checkbox"
            name="notifications"
            className="form__input"
            ref={this.notificationsRef}
          />
          <label htmlFor="notifications-checkbox" className="form__label form__label--checkbox">
            Receive notifications
          </label>
          {errors.notifications && isFormSubmitted && (
            <span className="form__error">{errors.notifications}</span>
          )}
        </div>
        <div className="form__group">
          <label htmlFor="picture-upload" className="form__label">
            Picture:
          </label>
          <input
            type="file"
            id="picture-upload"
            name="picture"
            accept="image/*"
            className="form__input"
            ref={this.pictureRef}
          />
          {errors.picture && isFormSubmitted && (
            <span className="form__error">{errors.picture}</span>
          )}
        </div>
        <button type="submit" className="form__submit-button">
          Submit
        </button>

        {isFormSubmitted && Object.keys(errors).length === 0 && (
          <div className="form__form-submition-message">Form submitted successfully!</div>
        )}
      </form>
    );
  }
}

export default CardForm;
