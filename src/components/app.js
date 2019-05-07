import React from "react";
import Header from "./header";
import { Component } from "react";
import moment from "moment";
import marked from "marked";
export default class App extends Component {
  state = {
    addNote: [],
    noteDate: [],
    showMarkdown: []
  };
  onAddChange = () => {
    const now = moment().format("dddd Do MMMM ,YYYY  h:mm:ss A");
    const noteDate = [...this.state.noteDate].concat(now);
    const newAddNote = [...this.state.addNote, { noteInfo: "" }];
    this.setState({ addNote: newAddNote, noteDate: noteDate });
  };
  onNoteChange = e => {
    const indexElement = e.target.id;
    let newAddNote = [...this.state.addNote];
    newAddNote[indexElement] = { noteInfo: marked(e.target.value) };
    this.setState(() => ({ addNote: newAddNote }));
  };
  onblur = e => {
    const indexElement = e.target.id;
    const newshowMarkdown = [...this.state.showMarkdown];
    newshowMarkdown[indexElement] = "hide";
    this.setState(() => ({ showMarkdown: newshowMarkdown }));
  };
  onNoteFocus = e => {
    const indexElement = e.target.id;
    const newshowMarkdown = [...this.state.showMarkdown];
    newshowMarkdown[indexElement] = "show";
    this.setState(() => ({ showMarkdown: newshowMarkdown }));
  };
  showTextarea = e => {
    const indexElement = e.target.previousSibling.id;
    const newshowMarkdown = [...this.state.showMarkdown];
    newshowMarkdown[indexElement] = "show";
    this.setState(() => ({ showMarkdown: newshowMarkdown }));
  };
  editTextArea = e => {
    const indexElement = e.target.parentNode.id;
    const newshowMarkdown = [...this.state.showMarkdown];
    newshowMarkdown[indexElement] = "hide";
    this.setState(() => ({ showMarkdown: newshowMarkdown }));
  };
  onDelteNote = e => {
    const index = e.target.id;
    const newAddNote = [...this.state.addNote];
    newAddNote.splice(index, 1);
    const newNoteDate = [...this.state.noteDate];
    newNoteDate.splice(index, 1);
    const newShowMarkdown = [...this.state.showMarkdown];
    newShowMarkdown.splice(index, 1);
    this.setState(() => {
      return {
        addNote: newAddNote,
        noteDate: newNoteDate,
        howMarkdown: newShowMarkdown
      };
    });
  };
  /*
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.addNote.length > 0) {
      localStorage.setItem("note", JSON.stringify(this.state));
    }
  };
  componentWillMount = () => {
    const stringNote = localStorage.getItem("note");
    if (stringNote !== undefined) {
      const note = JSON.parse(stringNote);
      const { addNote, noteInfo, showMarkdown } = note;
      this.setState(() => ({
        addNote,
        noteInfo,
        showMarkdown
      }));
    }
  };
  */
  render() {
    const { noteDate, showMarkdown } = this.state;
    return (
      <div className="container">
        <div className="note-wrapper">
          <Header onAddChange={this.onAddChange} />
          <div className="note-textArea-wrapper">
            {/*-- this is textarea */}
            {this.state.addNote.map((note, i) => {
              return (
                <div key={i} className="text-area">
                  <div className="text-area-header">
                    <span className="text-area-date">{noteDate[i]}</span>
                    <div className="editAndDelete">
                      <span
                        onClick={this.editTextArea}
                        className="text-area-edit"
                        id={i}
                      >
                        {showMarkdown[i] === "hide" ? (
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          />
                        ) : (
                          <i className="far fa-edit" />
                        )}
                      </span>
                      <span
                        onClick={this.onDelteNote}
                        className="text-area-delete"
                        id={i}
                      >
                        <i className="far fa-trash-alt" />
                      </span>
                    </div>
                  </div>
                  <textarea
                    className={`${showMarkdown[i]}`}
                    id={i}
                    onChange={this.onNoteChange}
                    onBlur={this.onblur}
                    onFocus={this.onNoteFocus}
                    autoFocus
                  />
                  {showMarkdown[i] === "hide" && (
                    <div
                      onClick={this.showTextarea}
                      className="showMarkdown"
                      dangerouslySetInnerHTML={{
                        __html: marked(note.noteInfo)
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
