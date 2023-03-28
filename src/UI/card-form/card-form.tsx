import React, { Component, createRef } from 'react';
import './card-form.scss';
import { CardData, FormProps, FormState } from '../../interfaces';

class CardForm extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
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

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    this.setState({ isFormSubmitted: true });
    event.preventDefault();

    const nameInput = this.nameRef.current!;
    const surNameInput = this.surNameRef.current!;
    const dateOfBirthInput = this.dateOfBirthRef.current!;
    const countryInput = this.countryRef.current!;
    const statusInputs = this.statusRefs.map((ref) => ref.current!);
    const genderInputs = [this.maleGenderRef.current!, this.femaleGenderRef.current!];
    const notificationsInput = this.notificationsRef.current!;
    const pictureInput = this.pictureRef.current!;

    const errors: Record<string, string> = {};
    let hasErrors = false;

    // Validation checks
    if (!nameInput.value.trim()) {
      errors.name = 'Name is required';
      hasErrors = true;
    } else if (!/^[A-Z]/.test(nameInput.value)) {
      errors.name = 'Name must start with an uppercase letter';
      hasErrors = true;
    }

    if (!surNameInput.value.trim()) {
      errors.surname = 'Surname is required';
      hasErrors = true;
    } else if (!/^[A-Z]/.test(surNameInput.value)) {
      errors.surname = 'Surname must start with an uppercase letter';
      hasErrors = true;
    }

    if (!dateOfBirthInput.value.trim()) {
      errors.dateOfBirth = 'Date of birth is required';
      hasErrors = true;
    }

    if (dateOfBirthInput.value.trim() && Date.parse(dateOfBirthInput.value.trim()) >= Date.now()) {
      errors.dateOfBirth = 'Person must have already been born';
      hasErrors = true;
    }

    if (!countryInput.value.trim()) {
      errors.country = 'Country is required';
      hasErrors = true;
    }

    if (!genderInputs.some((input) => input.checked)) {
      errors.gender = 'Gender is required';
      hasErrors = true;
    }

    // Display errors if there are any
    if (hasErrors) {
      this.setState({ errors });
      return;
    }

    const cardData: CardData = {
      name: `${nameInput.value} ${surNameInput.value}`,
      dateOfBirth: dateOfBirthInput.value,
      country: countryInput.value,
      status: statusInputs
        .filter((input) => input.checked)
        .map((input) => (input.value ? input.value : '')),
      gender: genderInputs.find((input) => input.checked)?.value ?? 'unknown',
      notifications: notificationsInput.checked,
      picture: pictureInput.files![0] ? URL.createObjectURL(pictureInput.files![0]) : '',
    };

    this.props.onSubmit(cardData);

    // Reset form inputs and errors
    nameInput.value = '';
    surNameInput.value = '';
    dateOfBirthInput.value = '';
    countryInput.value = '';
    genderInputs.forEach((input) => (input.checked = false));
    notificationsInput.checked = false;
    pictureInput.value = '';
    this.statusRefs.forEach((ref) => (ref.current!.checked = false));

    this.setState({ errors: {} });
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
