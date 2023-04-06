import SearchPanel from '../UI/search-panel/search-panel';
import RestCardWrapper from '../UI/rest-card-wrapper/rest-card-wrapper';
import { useState } from 'react';

import { RestAuthorData } from 'interfaces';

function MainPage() {
  const [autors, setAutors] = useState<RestAuthorData[]>([]);

  return (
    <>
      <SearchPanel responseCallBack={setAutors} />
      <RestCardWrapper restAuthorsData={autors} />
    </>
  );
}

export default MainPage;
