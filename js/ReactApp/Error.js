class Error extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {

        return (
            <div
                className="geDialog"
                style={{
                    width: "400px",
                    height: "350px",
                    zIndex: 10006,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    overflowY: "auto"
                }}
            >
                <div className="AgnityDialogDiv" style={{maxHeight: "100%"}}>
                    <div className="AgnityDialogHeadingDiv">
                        <center>Error</center>
                    </div>
                    <div className="AgnityDialogErrorMsgDiv">
                        <img src="../images/critical.png"/>
                        <div className="AgnityDialogErrorContentDiv">
                            <p>
                                The following error occurred on sending your request to server.
                                Contact your admin.
                            </p>
                            <p>
                                {this.props.errorMsg}
                            </p>
                        </div>
                    </div>
                    <div className="AgnityDialogActionDiv">
                        <button className="AgnityDialogActionButton" onClick={() => {this.props.errorHandler(false)}}>Close</button>
                    </div>
                </div>
            </div>
        )
    }

}