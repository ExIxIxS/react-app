import { CardData, FormInputData } from 'interfaces';

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

export { getCardData };
