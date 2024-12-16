const FilterByNameForm = (props) => {
  const { searchTerm, setSearchTerm } = props;
  return (
    <form>
      <div>
        filter shown with
        <input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
    </form>
  );
};

export default FilterByNameForm;
