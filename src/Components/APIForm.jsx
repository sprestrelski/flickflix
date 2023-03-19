const APIForm = ({inputs, handleChange, onSubmit}) => {

    return (
        <div className="discover-container">
            <div className="filter-container">
            </div>
            <button type="submit" className="button" onClick={onSubmit}>
                Flick 🔀
            </button>
        </div>
    );
};

export default APIForm;