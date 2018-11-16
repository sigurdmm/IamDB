import { shallow } from 'enzyme';

// Note we're not using the default exported version
import { HomePage } from '../HomePage';

const mockedHomePage = spy => shallow(<HomePage
  allMedia={[]}
  loading={false}
  error={null}
  limit={4}
  offset={0}
  total={100}
  type={null}
  query={''}
  hasSearched={false}
  updateSearchFields={() => null}
  sortDirection={1}
  sortField={''}
  searchMedia={spy}/>);

describe('<HomePage/>', () => {
  it('should render properly', () => {
    const spy = jest.fn();
    const wrapper = mockedHomePage(spy);
    expect(wrapper).toBeTruthy();
  });

  it('should call searchMedia with query on onSubmit', () => {
    const spy = jest.fn();
    const query = 'The Dark Knight';
    mockedHomePage(spy).instance().onSearchSubmit(query);
    expect(spy.mock.calls[0][0]).toBe(query);
  });

  it('should call searchMedia with type on onToggle', () => {
    const spy = jest.fn();
    const type = 'movie';

    mockedHomePage(spy).instance().onToggle(type);
    expect(spy.mock.calls[0][1]).toBe(type);
  });

  it('should call searchMedia with newSortField on onSort', () => {
    const spy = jest.fn();
    const newSortField = 'movie';

    mockedHomePage(spy).instance().onSort(newSortField);
    expect(spy.mock.calls[0][4]).toBe(newSortField);
  });

  it('should call searchMedia with newSortDirection on onDirectionClick', () => {
    const spy = jest.fn();
    const newSortDirection = -1;

    mockedHomePage(spy).instance().onDirectionClick(newSortDirection);
    expect(spy.mock.calls[0][5]).toBe(newSortDirection);
  });

  it('should call searchMedia with newOffset on doPagination', () => {
    const spy = jest.fn();
    const newOffset = 4;

    mockedHomePage(spy).instance().doPagination(newOffset);
    expect(spy.mock.calls[0][3]).toBe(newOffset);
  });
});
