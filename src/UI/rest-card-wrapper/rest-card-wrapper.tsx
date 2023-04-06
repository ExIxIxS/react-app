import React from 'react';
import RestCard from '../rest-card/rest-card';
import './rest-card-wrapper.scss';
import { RestAuthorData } from '../../interfaces';

const MemoizedCard = React.memo(RestCard);

function RestCardWrapper({ restAuthorsData }: { restAuthorsData: RestAuthorData[] }): JSX.Element {
  return (
    <div className="card-wrapper">
      {restAuthorsData
        .filter((_, index) => index < 12)
        .map((restAuthorData: RestAuthorData) => (
          <MemoizedCard
            id={restAuthorData.key}
            name={restAuthorData.name}
            birthDate={restAuthorData.birth_date}
            topWork={restAuthorData.top_work}
            workCount={restAuthorData.work_count}
            key={restAuthorData.key}
          />
        ))}
    </div>
  );
}

export default RestCardWrapper;
