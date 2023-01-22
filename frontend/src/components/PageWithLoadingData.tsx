import React from "react";
import Loading from "./Loading";

//props: loadData async function
//props to WrappedComponent: loadedData and reloadDataCallback

export interface WithLoadedData<DataType> {
    loadedData: DataType;
    reloadDataCallback: () => void;
}

function PageWithLoadingData(WrappedComponent, loadData: () => any) {

    interface Props {
    }

    interface State<DataType> {
        loadedData: DataType | null;
    }

    return class PageWithLoadingData<DataType> extends React.PureComponent<Props, State<DataType>> {

        constructor(props: Props) {
            super(props);
            this.state = {loadedData: null}
        }

        componentDidMount() {
            this.reloadData();
        }

        reloadData = async () => {
            const loadedData = await loadData();
            this.setState({loadedData: loadedData});
        }

        render() {
            if (!this.state.loadedData) {
                return <Loading />
            }
            return <WrappedComponent {...this.props} loadedData={this.state.loadedData} reloadDataCallback={this.reloadData}/>
        }
    }
}
export default PageWithLoadingData;
