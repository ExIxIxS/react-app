const nameValidator = {
  required: {
    value: true,
    message: 'required',
  },
  pattern: {
    value: /^[A-Z]/,
    message: 'must start with an uppercase letter',
  },
  minLength: {
    value: 2,
    message: 'min length - 2 letters',
  },
};

const dateValidator = {
  required: {
    value: true,
    message: 'required',
  },
  validate: (value: string): boolean | string => {
    if (Date.parse(value.trim()) >= Date.now()) {
      return 'person must have already been born';
    }

    return true;
  },
};

const countryValidator = {
  required: {
    value: true,
    message: 'required',
  },
};

const genderValidator = {
  required: {
    value: true,
    message: 'required',
  },
};

const notificationsValidator = {
  required: {
    value: true,
    message: 'required',
  },
};

const pictureValidator = {
  required: {
    value: true,
    message: 'required',
  },
};

export {
  nameValidator,
  dateValidator,
  countryValidator,
  genderValidator,
  notificationsValidator,
  pictureValidator,
};
