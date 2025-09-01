const dialogStyle = {
    width: "650px",
    height: "550px",
    zIndex: 10005,
    margin: "0 auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
};
const dBgStyle = {
    position: "absolute",
    background: "white",
    height: "calc(100% - 44px)",
    right: "0px",
    zIndex: 10003,
    opacity: "0.8",
    left: "0px",
    top: "0px",
    marginTop: "44px",
};

let progressTracker = 0;

const actionStatesIcon = {
    activate: {icon: "geSprite-active", toolTip: "Activate"},
    start: {icon: "geSprite-start", toolTip: "Start"},
    stop: {icon: "geSprite-stop", toolTip: "Stop"},
    deactivate: {icon: "geSprite-deactivate", toolTip: "Deactivate"},
    undeploy: {icon: "geSprite-undeploy", toolTip: "Undeploy"},
    applicationInfo: {icon: "geSprite-applicationInfo", toolTip: "Application Info"},
    setRoutingRules: {icon: "geSprite-setRoutingRules", toolTip: "SetRouting Rules"},
    enableDebug: {icon: "geSprite-enableDebugBtn", toolTip: "Enable Debug"},
    disableDebug: {icon: "geSprite-disableDebugBtn", toolTip: "Disable Debug"},
}
const actionStates = {
    INSTALLED: ['start', 'undeploy'],
    READY: ['activate', 'stop'],
    ACTIVE: ['deactivate'],
    ERROR: [],
}

const actionStatus = {
    start: "Installed",
    undeploy: "Installed",
    activate: "Ready",
    stop: "Ready",
    deactivate: "Active",
}

class ManageCas extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            group: "",
            groups: [],
            groupList: [],
            applicationName: [],
            priority: "5",
            tData: {},
            expShowHide: {},
            progress: {},
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        await Promise.all([this.getGroups(), this.getApplication()])
        this.getCasAppsInGroup()
    }

    getGroups = () => {
        let self = this;
        return new Promise((resolve, reject) => {
            let casDetails = new AgnityGetAvailableCASServersHelper(
                Agnity.getDomainName(),
                this.props.essentials.getUrlParam["operationMode"],
                this.props.essentials.getUrlParam["diagram"],
                Agnity.hasUrlReadonlyParam(),
                true
            );
            casDetails.fetchData(function (response, haveError) {
                if (haveError) {
                    self.props.errorHandler(true, response.err);
                    return;
                }
                let groupList = response.map(d => d.group);
                let group = self.state.group;
                groupList = [...new Set(groupList)]
                if (self.state.group === '') {
                    group = groupList[0];
                }
                self.setState({group, groups: response, groupList}, () => {
                    resolve();
                });
            })
        })
    }

    getApplication = () => {

        return new Promise((resolve, reject) => {
            let applications = new AgnityGetAvailablePackagedApplicationsHelper(
                this.props.essentials.getUrlParam["diagram"],
                Agnity.hasUrlReadonlyParam(),
                this.props.essentials.getUrlParam["operationMode"],
                Agnity.getDomainName(),
                true
            );
            let self = this;
            applications.fetchData(function (possibleValues, haveError) {
                if (haveError) {
                    self.props.errorHandler(true, possibleValues.err);
                    return;
                }
                if (possibleValues && possibleValues.length > 0) {
                    self.setState({applicationName: possibleValues[0]}, () => {
                        resolve();
                    });
                } else {
                    resolve();
                }
            });

        })
    }

    getCasAppsInGroup = async () => {
        let tData = {};
        let self = this;
        let allReq = [];

        for (let server of this.state.groups) {
            if (server.group !== this.state.group) continue;
            let grpQuery = new AgnityGetCASApplicationsHelper(
                server.name,
                Agnity.getDomainName(),
                this.props.essentials.getUrlParam["operationMode"],
                this.props.essentials.getUrlParam["diagram"],
                Agnity.hasUrlReadonlyParam(),
                true
            )
            let req = new Promise((res, rej) => {
                grpQuery.fetchData((resp, haveError) => {
                    if (haveError) {
                        this.props.errorHandler(true, resp.err);
                        rej();
                    }
                    for (let r of resp) {
                        r.server = server;
                        if (tData[r.application]) {
                            tData[r.application].push(r);
                        } else {
                            tData[r.application] = [r];
                        }
                    }
                    self.setState({tData});
                    res();
                })
            })
            allReq.push(req);
        }
        await Promise.all(allReq);
    }

    deploy = (server) => {
        let self = this;
        return new Promise((res, reject) => {
            let casApplication = new AgnityDeployCASApplication(
                server.name,
                self.state.applicationName,
                self.state.priority,
                Agnity.hasUrlReadonlyParam(),
                this.props.essentials.getUrlParam["diagram"],
                this.props.essentials.getUrlParam["operationMode"],
                Agnity.getDomainName(),
                null, true
            );
            casApplication.deployApplication(function (response, haveError) {
                if (haveError) {
                    self.props.errorHandler(true, response.err);
                    reject();
                }
                res(response);
            });
        })
    }



    deployHandler = async () => {
        let reqs = [];
        for (let i of this.state.groups) {
            if (this.state.group !== i.group) continue;
            reqs.push(this.deploy(i));
        }
        await Promise.all(reqs);
        this.getData();
    }

    download = () => {
        return new Promise((resolve, reject) => {
            let dH = new AgnityDownloadApplicationPackage(
                this.state.applicationName,
                Agnity.hasUrlReadonlyParam(),
                this.props.essentials.getUrlParam["diagram"],
                this.props.essentials.getUrlParam["operationMode"],
                Agnity.getDomainName(),
                true
            )
            dH.downloadApplication((response, haveError) => {
                if (haveError) {
                    this.props.errorHandler(true, response.err);
                    return;
                }
                resolve(response);
            })
        })
    }

    downloadHandler = async () => {
        let response = await this.download();
        let forestName = response.forestName;
        let base64EncodedAppData = response.applicationPackage;
        let dataUri = 'data:application/octet-stream;base64,' + base64EncodedAppData;
        let fileName = forestName + '.sar';
        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', fileName);
        linkElement.click();
    }

    textHandler = (e) => {
        let self = this;
        this.setState({[e.target.name]: e.target.value}, () => {
            if (e.target.name === 'group') {
                self.getCasAppsInGroup();
            }
        })
    }

    handleActionChange = (change, data) => {
        let tData = {...this.state.tData};
        for (let i of tData[change["application"]]) {
            if (i.server.ip === data.server.ip) {
                i["STATUS"] = change["STATUS"];
            }
        }
        this.setState({tData});
    }
    expShowHideHandler = (k) => {
        let expShowHide = {
            ...this.state.expShowHide,
            [k]: k in this.state.expShowHide ? !this.state.expShowHide[k] : true
        }
        this.setState({expShowHide});
    }

    render() {
        return (
            <div style={{...this.state.progress}}>
                <div className="background" style={dBgStyle}/>

                <div className="geDialog" style={dialogStyle}>
                    <div className="AgnityDialogDiv" style={{maxHeight: "100%"}}>
                        <div className="AgnityDialogHeadingDiv">
                            <center>Manage CAS Applications</center>
                        </div>
                        <div className="AgnityDialogDetailPageDiv">
                            <table className="AgnityDialogDetailPageTwoColTable">
                                <tbody>
                                <tr>
                                    <td>
                                        <div className="AgnityFieldRow">
                                            <div className="AgnityFieldRowLabelHolder">
                                                <label className="AgnityFieldRowLabelClass"
                                                       title="Group">
                                                    Group
                                                </label>
                                            </div>
                                            <div className="AgnityFieldRowFieldHolder">
                                                <select
                                                    className="AgnityDropdownFieldClass"
                                                    value={this.state.group}
                                                    name={"group"}
                                                    onChange={this.textHandler}>
                                                    {this.state.groupList.map(grp => {
                                                        return <option key={grp} value={grp}>{grp}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="AgnityFieldRow">
                                            <div className="AgnityFieldRowLabelHolder">
                                                <label className="AgnityFieldRowLabelClass" title="Application Name">
                                                    Application Name
                                                </label>
                                            </div>
                                            <div className="AgnityFieldRowFieldHolder">
                                                <input className="AgnityTextFieldClass" type="text"
                                                       value={this.state.applicationName}
                                                       disabled={true}/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="AgnityFieldRow">
                                            <div className="AgnityFieldRowLabelHolder">
                                                <label className="AgnityFieldRowLabelClass" title="Priority">
                                                    Priority
                                                </label>
                                            </div>
                                            <div className="AgnityFieldRowFieldHolder">
                                                <input
                                                    className="AgnityTextFieldClass"
                                                    type="text"
                                                    value={this.state.priority}
                                                    onChange={this.textHandler}
                                                    name={"priority"}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td/>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="AgnityDialogDetailPageActionDiv">
                            <button className="AgnityDialogDetailPageActionButton" onClick={this.getData}>Refresh
                                Applications
                            </button>
                            <button className="AgnityDialogDetailPageActionButton" onClick={() => {
                                this.deployHandler()
                            }}>Deploy Application
                            </button>
                            <button className="AgnityDialogDetailPageActionButton" onClick={() => {
                                this.downloadHandler()
                            }}>Download Application
                            </button>
                        </div>
                        <div className="AgnityDialogListingPageDiv">
                            <div className="AgnityDialogListingPageHeadDiv">
                                <table className="AgnityDialogListingPageHeadTable">
                                    <thead className="AgnityDialogListingPageTableHead">
                                    <tr className="AgnityDialogListingPageTableHeadRow">
                                        <th>Server</th>
                                        <th>Deployer</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    {
                                        Object.keys(this.state.tData).sort().map(casApps => {
                                            return <ExpandableTableBody
                                                key={casApps}
                                                {...this.props}
                                                name={casApps}
                                                expShowHide={this.state.expShowHide}
                                                expShowHideHandler={this.expShowHideHandler}
                                                refresh={this.getData}
                                                handleActionChange={this.handleActionChange}
                                                data={this.state.tData[casApps]}/>
                                        })
                                    }
                                </table>
                            </div>
                        </div>
                        <div className="AgnityDialogActionDiv">
                            <button
                                className="AgnityDialogActionButton"
                                onClick={() => {
                                    this.props.changeApp(null);
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ExpandableTableBody extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }


    getBulkAction = () => {

        if (typeof this.props.data === 'undefined') return [];
        let allActions = this.props.data.map(act => act.STATUS);
        if (typeof this.props.data === 'undefined') return [];
        let _bulkActions = [...new Set(allActions)];
        let bulkActions = [];
        for (let i of _bulkActions) {
            if (typeof actionStates[i] === 'undefined') continue
            bulkActions.push(...actionStates[i]);
        }
        bulkActions = [...new Set(bulkActions)];
        return bulkActions;

    }

    performAction = (action, data) => {
        let self = this;

        return new Promise((resolve, reject) => {
            let casApplicationAction = new AgnityExecuteCASApplicationAction(
                data.server.name,
                data.application,
                action,
                Agnity.hasUrlReadonlyParam(),
                self.props.essentials.getUrlParam["diagram"],
                self.props.essentials.getUrlParam["operationMode"],
                Agnity.getDomainName(), true);
            casApplicationAction.executeAction(function (response, haveError) {
                if (haveError) {
                    self.props.errorHandler(true, response.err);
                    reject();
                }
                resolve(response)
            })
        })
    }


    actionHandler = async (action, data, isBulk = false) => {
        if (action === 'appInfo') {
            this.props.handleAppInfo(true, data.INFO);
            return;
        }

        let out = await this.performAction(action, data);

        if (action === 'undeploy') {
            if (isBulk) return;
            this.props.refresh();
            return;
        }
        for (let i of out.Applications) {
            if (data.application === i.application) {
                this.props.handleActionChange(i, data);
                break;
            }
        }
    }

    bulkActionHandler = async (action) => {
        let reqs = [];
        for (let i of this.props.data) {
            if (i.STATUS === actionStatus[action].toUpperCase()) {
                reqs.push(this.actionHandler(action, i, true));
            }
        }
        await Promise.all(reqs);
        this.props.refresh();
    }

    render() {
        let _bulkActions = this.getBulkAction();

        return (
            <React.Fragment>
                <tbody className="labels casManageTable" key={"labelTb"}>
                <tr className="AgnityDialogListingPageTableEntryRow" key={"labelTb1"}>
                    <td className="casTheader" colSpan="3" style={{width: "75%"}}
                        onClick={() => this.props.expShowHideHandler(this.props.name)}>
                        {this.props.name} ({this.props.data[0].appId})
                    </td>
                    <td style={{width: "25%"}} className="casTheader">
                        {
                            (_bulkActions || []).map(action => {
                                return <div
                                    className={"AgnityDialogListingPageTableEntryButton geSprite " + actionStatesIcon[action].icon}
                                    onClick={() => {
                                        this.bulkActionHandler(action)
                                    }}
                                    title={actionStatesIcon[action].toolTip + " all whose status is " + actionStatus[action]}/>
                            })
                        }
                    </td>
                </tr>
                </tbody>
                {
                    this.props.expShowHide[this.props.name] ?
                        <tbody className="casManageTable" key={"labelTb2"}>
                        {
                            this.props.data.map(row => {
                                return <tr className="AgnityDialogListingPageTableEntryRow hoverCasTable" key={row.server.name}>
                                    <td>{row.server.name + " (" + row.server.ip + " )"}</td>
                                    <td>{row.DEPLOYEDBY}</td>
                                    <td>{row.STATUS}</td>
                                    <td>
                                        {
                                            (actionStates[row.STATUS] || []).map(action => {
                                                return <div
                                                    key={action}
                                                    className={"AgnityDialogListingPageTableEntryButton geSprite " + actionStatesIcon[action].icon}
                                                    onClick={() => {
                                                        this.actionHandler(action, row)
                                                    }}
                                                    title={actionStatesIcon[action].toolTip}/>
                                            })
                                        }
                                        <div
                                            className="AgnityDialogListingPageTableEntryButton geSprite geSprite-applicationInfo"
                                            onClick={() => {
                                                this.actionHandler('appInfo', row)
                                            }}
                                            title="Application Info"/>
                                        <div
                                            className="AgnityDialogListingPageTableEntryButton geSprite geSprite-setRoutingRules"
                                            onClick={() => {
                                                this.actionHandler('setRoutingRules', row)
                                            }}
                                            title="Set Routing Rules"/>
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                        : null
                }

            </React.Fragment>
        )
    }
}

class ApplicationInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div>
            <div className="background" style={{...dBgStyle, zIndex: 10005}}/>

            <div
                className="geDialog"
                style={{
                    width: "650px",
                    height: "450px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    overflowY: "auto",
                    zIndex: 10007,
                }}
            >

                <div className="AgnityDialogDiv" style={{maxHeight: "100%"}}>
                    <div className="AgnityDialogHeadingDiv">
                        <center>CAS Application Info</center>
                    </div>
                    <div className="AgnityDialogDetailPageDiv">
                        <table className="AgnityDialogDetailPageSingleColTable">
                            <tbody>
                            <tr>
                                <td>
                                    <div className="AgnityFieldRow">
                                        <p className="AgnityTextInfo">
                                            {this.props.appInfo || ""}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="AgnityDialogActionDiv">
                        <button className="AgnityDialogActionButton" onClick={() => {
                            this.props.handleAppInfo(false)
                        }}>Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    }
}