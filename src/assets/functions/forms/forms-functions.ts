import { CardData, FormInputData, SerialFormInputData } from 'interfaces';

function getSerialFormInputData(submitData: FormInputData): SerialFormInputData {
  return {
    ...submitData,
    picture: submitData.picture?.length ? URL.createObjectURL(submitData.picture[0]) : '',
  };
}

function getCardData(submitData: SerialFormInputData): CardData {
  return {
    name: `${submitData.name} ${submitData.surName}`,
    dateOfBirth: submitData.dateOfBirth,
    country: submitData.country,
    status: submitData.status,
    gender: submitData.gender,
    notifications: submitData.notifications,
    picture: submitData.picture,
  };
}

export { getCardData, getSerialFormInputData };
