import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import FileExpanded from './file-expanded'
import File from './file-expanded'

class FileLeft extends Component {

  render() {
    console.log(this.props.activeFileLeft)
    let leftList = ''
       if (this.props.activeFileLeft == -1) {
            if (this.props.similarities == true) {
                leftList = this.props.files.filter(file => file.similarities.length > 0)
                leftList = leftList.map(file =>
                    <File
                        file={file}
                        key={file.id}
                        setActiveFile={this.props.setActiveFileLeft}
                    />
                )
               return(<div>{leftList}</div>)                
            }        
            else {             
                leftList = this.props.files.map(file =>
                    <File
                        file={file}
                        key={file.id}
                        setActiveFile={this.props.setActiveFileLeft}                        
                    />
                )
                console.log(this.props.files)
               return(<div>{this.props.files.map(file => <File file={file} key={file.id} setActiveFile={this.props.setActiveFileLeft}/> )} </div>)
            }
        }
        /*else if (this.props.activeFileLeft  > 0) {
            leftList = this.props.files.filter(file => file.id == this.props.activeFileLeft).map((file) =>
                <FileExpanded
                    file={file}
                    key={file.id}
                />
            )
           return(leftList)
        }*/
}

}

function mapStateTopProps(state) {
    return {
        files: state.fileReducer.files,
        activeFileLeft: state.fileReducer.activeFileLeft,
        activeFileRight: state.fileReducer.activeFileRight,
        similarities: state.fileReducer.similarities
    }
}

export default connect(mapStateTopProps)(FileLeft)
