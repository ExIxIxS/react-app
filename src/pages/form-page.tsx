import CardWrapper from '../UI/card-wrapper/card-wrapper';
import CardForm from '../UI/card-form/card-form';
import { getNewCard } from '../assets/functions/handlers/event-handler-functions';
import { useStoreFormSubmitResults } from '../assets/functions/hooks/redux.hooks';

function FormPage() {
  const [formSubmitResults, setFormSubmitResults] = useStoreFormSubmitResults();

  return (
    <>
      <CardForm addCardCallBack={setFormSubmitResults} />
      <CardWrapper cards={formSubmitResults.map((formSubmit) => getNewCard(formSubmit))} />
    </>
  );
}

export default FormPage;
