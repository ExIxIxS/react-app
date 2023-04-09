import { rest } from 'msw';

const testUserResponse = {
  numFound: 1,
  start: 0,
  numFoundExact: true,
  docs: [
    {
      key: 'OL9634136A',
      type: 'author',
      name: 'Epic React',
      top_work: 'Project 369',
      work_count: 7,
      _version_: '1759853456457203726',
    },
  ],
};

const testAuthorResponse = {
  remote_ids: { isni: '0000000080960298', wikidata: 'Q148234', viaf: '17220001' },
  type: { key: '/type/author' },
  birth_date: '1 September 1875',
  photos: [9234146, 5542192],
  source_records: ['amazon:1435139763', 'bwb:9781090851673'],
  alternate_names: ['Edgar Burroughs', 'Burroughs,Edgar Rice'],
  death_date: '19 March 1950',
  name: 'Edgar Rice Burroughs',
  location: 'Encino, CA',
  key: '/authors/OL146605A',
  bio: 'Edgar Rice Burroughs was born in Chicago, Illinois, the son of a businessman.  During the Chicago influenza epidemic in 1891, he spent half a year on his brothers\' ranch on the Raft River in Idaho.  He attended the Phillips Academy in Andover, Massachusetts and then the Michigan Military Academy, from which he graduated in 1895.  He failed the entrance exam for West Point, and so became an enlisted soldier with the 7th U.S. Cavalry in Fort Grant, Arizona Territory.  He was discharged in 1897, having been found ineligible for service due to a heart problem.\r\n\r\nHe drifted, working odd jobs at ranches across Idaho, then came to work at his father\'s firm in 1899.  He married Emma Centennia Hulbert in 1900.  In 1904 he left his job and found less regular work, ending up back in Chicago.  He held several low-wage jobs for the next seven years, then, while working as a pencil sharpener wholesaler, he began to write fiction in 1911.  He began reading pulp fiction magazines and decided to aim his fiction toward getting published in these magazines.  His first published story, "Under the Moons of Mars," was serialized in The All-Story magazine in 1912.  He began writing full-time and his first published novel, Tarzan of the Apes, was published in October of 1912.\r\n\r\nIn 1919 he purchased a ranch north of Los Angeles, California which he named "Tarzana," a name which was later adopted by the citizens of the community that sprang up around the ranch.  In 1923 he set up Edgar Rice Burroughs, Inc. and began printing his own books.  He divorced Emma in 1934 and married former actress Florence Gilbert Dearholt in 1935.  In 1941, when Pearl Harbor, Hawaii was attacked, he was a resident of Hawaii and he volunteered to become the oldest war correspondent for the U.S. during World War II.  He divorced his second wife in 1942.  After the war he moved back to Encino, California, where, after many health problems, he died of a heart attack in March of 1950.  Over the course of his writing career he wrote almost seventy novels.',
  personal_name: 'Edgar Rice Burroughs',
  wikipedia: 'http://en.wikipedia.org/wiki/Edgar_Rice_Burroughs',
  latest_revision: 16,
  revision: 16,
  created: { type: '/type/datetime', value: '2008-04-01T03:28:50.625462' },
  last_modified: { type: '/type/datetime', value: '2022-12-21T22:19:00.288631' },
};

const baseUrl = 'https://openlibrary.org'; // API root url
const authorId = 'OL146605A';

const restTestHandlers = [
  //  https://openlibrary.org/search/authors.json
  rest.get(baseUrl + '/search/authors.json', (request, resolver, context) => {
    const query = request.url.searchParams.get('q');

    if (query === 'invalidQuery') {
      return resolver(context.status(404));
    }

    if (query === 'nothing') {
      return resolver(context.status(200), context.json([]));
    }

    return resolver(context.status(200), context.json(testUserResponse));
  }),
  // https://openlibrary.org/authors/OL146605A.json
  rest.get(baseUrl + '/authors/' + authorId + '.json', (request, resolver, context) => {
    return resolver(context.status(200), context.json(testAuthorResponse));
  }),
  // https://openlibrary.org/authors/invalid.json
  rest.get(baseUrl + '/authors/' + 'invalid' + '.json', (request, resolver, context) => {
    return resolver(context.status(404));
  }),
];

export default restTestHandlers;
