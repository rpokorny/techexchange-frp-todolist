import * as Immutable from 'immutable';

/**
 * Model that represents a single Todo
 */
export default Immutable.Record({
    id: null, //The id will be the URI of the todo on the server.
              //This is a strategy that I picked up from the semantic web community
    name: '',
    completed: false
});
