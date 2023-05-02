import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

function getRTKFetchErrorMessage(error: FetchBaseQueryError | SerializedError | undefined): string {
  if (error) {
    if ('status' in error) {
      return `Fetch error: ${error.status} ${error.data}`;
    } else if ('name' in error) {
      return `Serialized error: ${error.name} ${error.message}`;
    }
  }

  return 'Unknown RTKFetchError Error';
}

export { getRTKFetchErrorMessage };
