var DocumentBox = React.createClass({

  mixins: [ParseReact.Mixin],
  observe: function() {
    var type = this.props.type
    return {
      documents: (new Parse.Query('template')).equalTo("type", type).ascending('createdAt')
    }
  },

  getInitialState: function() {
    return {
      activeDocId: -1,
      previewImage: '',
      documentUrl: '',
      documentLink: '',
      sourceName: '',
      authorName: '',
    }
  },

  handleActiveChange: function(doc, index){
    this.setState({
      activeDocId: index,
      previewImage: doc.preview.url(),
      documentUrl: doc.file.url(),
      documentLink: doc.link,
      sourceName: doc.source,
      authorName: doc.author,
    })

  },

  render: function() {

    var preview;
    if (this.state.activeDocId != -1){
        preview = <Preview imageSrc={this.state.previewImage} documentUrl={this.state.documentUrl} authorName={this.state.authorName}/>;
      } else {
        preview = (
          <div className="documentBoxDefaultState">
            Select a document, please.
          </div>
        )
      }

    return (
      <div className="documentBox">
        <DocumentList activeId={this.state.activeDocId} data={this.data.documents} activeChange={this.handleActiveChange}/>
        {preview}
      </div>
    );
  }
});

var Preview = React.createClass({

  render: function() {

    var button = <NormalButtons />
    return (
      <div className='documentPreview'>
        <a href={this.props.documentUrl} target='_blank'>
          <img src={this.props.imageSrc}/>
        </a>
        <div className="mui-panel">
          <NormalButtons />
          <p>By {this.props.authorName}</p>
        </div>
      </div>
    )
  }
})

var DocumentList = React.createClass({

  activate: function(doc, index){
    this.props.activeChange(doc,index);
  },
  render: function() {
    var documents = this.props.data.map(function(doc, index) {
      var classes = React.addons.classSet({
          'document': true,
          'active': index === this.props.activeId // this.props.isActive
        });
      return (
        <div className={classes} key={index} onClick={this.activate.bind(this, doc, index)}>
          {doc.name}
        </div>
      );

    }, this);

    return(
      <div className='documentList'>
        {documents}
      </div>
    );
  }

});

var Button = React.createClass({
  render: function() {
    return (
      <div className="buttons">
        <MUIButton type="accent" disabled={ this.props.disabled } flat={ this.props.flat } raised={ this.props.raised } large={ this.props.large }>Download</MUIButton>
        <MUIButton type="primary" disabled={ this.props.disabled } flat={ this.props.flat } raised={ this.props.raised } large={ this.props.large }>Buy</MUIButton>
      </div>
    );
  }
});

var NormalButtons = React.createClass({
  render: function() {
    return (
      <Button disabled={ false } large={ true }/>
    );
  }
});























