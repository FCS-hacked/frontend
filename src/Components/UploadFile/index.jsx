import { Component } from "react";
export default class UploadFiles extends Component {

  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",

      fileInfos: [],
    };
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
    this.props.setSelectedFile(event.target.files[0]);

  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
    } = this.state;

    return (
      <div className="ml-10 pt-10">
        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        <label className="btn btn-default">
          <input type="file" onChange={this.selectFile} />
        </label>

    

        <div className="alert alert-light" role="alert">
          {message}
        </div>

        <div className="">
          <div className="my-3">List of Files</div>
          <ul className="">
            {fileInfos &&
              fileInfos.map((file, index) => (
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}