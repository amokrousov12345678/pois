
interface LimitedView {
    requestPath: string; //path in format /search/findByFirstNameAndLastName?firstName={firstName}&lastName={lastName}
    //name of param should be equal to name of attribute in grid (to hide it when filtering)
    paramValues: Object[]; //values for {key}
}

export default LimitedView;
