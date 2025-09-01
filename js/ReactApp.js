// 'use strict';


const e = React.createElement;

let bgStyleForDialog = {
    position: 'absolute',
    background: 'white',
    height: 'calc(100% - 44px)',
    right: '0px',
    zIndex: 1,
    opacity: '0.8',
    left: '0px',
    top: '0px',
    marginTop: '44px'
}


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedApp: null,
            essentials: {},
            haveError: false,
            errorMsg : "",
            showAppInfo : false,
            appInfo : '',
            error : false
        };
    }

    componentDidMount() {
        this.listener();
    }

    listener = () => {
        let self = this;
        window.addEventListener('message', function (e) {
            if (e.data.r_data) {
                self.setState({essentials: e.data.r_data}, () => {
                    self.changeApp(e.data.r_data.operation);
                })
            }
        });
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        }, () => {
            console.log(errorInfo);
        })
    }

    changeApp = selectedApp => {
        this.setState({selectedApp})
    }

    errorHandler = (haveError, errorMsg) => {
        this.setState({ haveError, errorMsg })
    }

    handleAppInfo = (show, appInfo) => {
        this.setState({showAppInfo : show, appInfo });
    }

    render() {
        if (this.state.selectedApp === null) return;

        return (
            <div>
                {
                    this.state.selectedApp === 'manageCas' ?
                        <ManageCas
                            changeApp={this.changeApp}
                            essentials={this.state.essentials}
                            errorHandler = {this.errorHandler}
                            handleAppInfo = {this.handleAppInfo}
                        /> : null
                }
                {
                    this.state.haveError ? <Error
                        changeApp={this.changeApp}
                        essentials={this.state.essentials}
                        errorMsg={this.state.errorMsg}
                        errorHandler = {this.errorHandler}
                    /> : null
                }
                { this.state.showAppInfo ? <ApplicationInfo appInfo={this.state.appInfo} handleAppInfo={this.handleAppInfo} /> : null }
            </div>
        )
    }
}

document.querySelectorAll('.reactApp')
    .forEach(domContainer => {
        const commentID = parseInt(domContainer.dataset.commentid, 10);
        const root = ReactDOM.createRoot(domContainer);
        root.render(
            e(Main, {commentID: commentID})
        );
    });