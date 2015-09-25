# "Serverless" React App with Hammer

<some reasons why it's so cool here>

#### Take
This [SlimSass](https://github.com/flywithmemsl/hammerslimsass/blob/master/slimsass.hammer?raw=true) Hammer template or initialize new Hammer project.

#### Install (if you don't have them):

* [Node.js](http://nodejs.org): `$ brew install node` on OS X
* [Bower](http://bower.io): `$ npm install -g bower`



#### Install bower components into your folder
* [React starter kit](http://facebook.github.io/react/downloads.html): `$ bower install react --save`
* [Parse SDK](https://parse.com/docs/downloads): `$ bower install parse-js-sdk --save`
* [ParseReact library](https://github.com/ParsePlatform/ParseReact): just include it manually from CDN or save its source into your project (`https://www.parsecdn.com/js/parse-react.js`).
* [ReactTabs component](https://github.com/rackt/react-tabs) (*optionnally*): `$ bower install react-tabs --save`



#### Your project structure may look like this
```
root/                   # Main application directory
|-app/                  # Your code may reside here
|--components/          # Source files of your react components
|--styles/              # Some your stylesheets
|-bower_components/     # Directory for external libraries delivered by bower
|-Build/                # Hammer's build directory
|-index.slim            # Index page of your project
```

##### Include third party libraries using Hammer tags or manually
##### Add some container for your react app
So your `index.slim` will look like this:

```
doctype html
html
  head
    <!-- @reload -->
    <!-- @stylesheet app/styles/application -->
    <!-- @javascript parse react react-with-addons react-tabs JSXTransformer -->
    script src="https://www.parsecdn.com/js/parse-react.js"
  body
    #react-container

```



### Now time to create react app
It will contain 3 components:
* Document list
* Preview
* Document box, that compose them

```js
var DocumentBox = React.createClass({

  getInitialState: function() {
    return {
      activeDocId: -1,
      previewImage: '',
      documentUrl: ''
    }
  },

  handleActiveChange: function(doc, index){
    this.setState({
      activeDocId: index,
      previewImage: doc.preview,
      documentUrl: doc.file
    })

  },

  render: function() {
    var documents = [
        {
            name: 'somename',
            file: 'http://somedomain.com/link-to-file.pdf',
            preview: 'http://somedomain.com/link-to-preview.jpg'
        }
    ]

    return (
      <div className="documentBox">
        <DocumentList activeId={this.state.activeDocId} data={documents} activeChange={this.handleActiveChange}/>
        <Preview imageSrc={this.state.previewImage} documentUrl={this.state.documentUrl}/>
      </div>
    );
  }
});

```


#### Preview is simple component, that may be described direcrly in Document Box

```js
var Preview = React.createClass({

  render: function() {
    return (
      <div className='documentPreview'>
        <a href={this.props.documentUrl} target='_blank'>
          <img src={this.props.imageSrc}/>
        </a>
      </div>
    )
  }
})
```

#### Document list, that handles clicks on each element
```
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
```


#### Now we can compose DocumentBrowser views by tabs in app.js
```
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

var App = React.createClass({
  render() {
    return (
      <div>
        <Tabs>
          <TabList>
            <Tab>Type A</Tab>
            <Tab>Type B</Tab>
            <Tab>Type C</Tab>
          </TabList>
          <TabPanel>
            <DocumentBox type='typeA'/>
          </TabPanel>
          <TabPanel>
            <DocumentBox type='typeB'/>
          </TabPanel>
          <TabPanel>
            <DocumentBox type='typeC'/>
          </TabPanel>
        </Tabs>

      </div>
    );
  }
});

React.render(<App/>, document.getElementById('react-container'));

```

#### How it might be styled (app/styles/application.sass)
```sass
html, body
  margin: 20px
  *
    box-sizing: border-box

.react-tabs [role=tablist]
  margin: 0
  li[role=tab][aria-selected=true]
    border-bottom: 1px solid #aaa

.documentBox
  display: flex
  flex-flow: row nowrap
  border-right: 1px solid #aaa
  border-bottom: 1px solid #aaa
  min-height: 600px
.documentList
  min-height: 600px
  flex: 0 0 200px
  border-right: 1px solid #aaa
  border-left: 1px solid #aaa
  overflow: hidden

  .document
    padding: 10px 30px
    border-bottom: 1px solid #aaa
    cursor: pointer
    &.active
      font-weight: bold

.documentPreview
  flex: 1 0
  padding: 30px
  img
    width: 100%

.documentBoxDefaultState
  width: 100%
  padding: 10px 20px
  font-size: 2rem
  text-align: center

```

#### Include app, document-browser components and styles into index.slim
```
doctype html
html
  head
    <!-- @reload -->
    <!-- @stylesheet app/styles/application -->
    <!-- @javascript parse react react-with-addons react-tabs JSXTransformer -->
    script src="https://www.parsecdn.com/js/parse-react.js"

  body
    #react-container
    script type="text/jsx" src="app/components/document-box.js"
    script type="text/jsx" src="app/components/app.js"
```



> NOTE: it's important to add `type="text/jsx"` for your jsx templates, so incude them avoiding Hammer @javascript tag.

#### Time to add some Parse magic
* Login on Parse.com
* Create new App
* Create new Class in Data tab
* Add some cols, for example:
  * type: string
  * name: string
  * preview: file
  * file: file
* Fill few records with your data
* Copy your App ID and Javascript API keys into head of `app.js`

```
Parse.initialize("M48MDA352i6cXXXXXXXXXXXXXXtjt6fN4KlFSumT",
                   "q3ApsBlBEkSsXXXXXXXXXXXXXXIjXcxj9CxNqrNW");
```

#### Add ParseReact mixin to DocumentBox component
```
  mixins: [ParseReact.Mixin],
  observe: function() {
    var type = this.props.type
    return {
      documents: (new Parse.Query('document')).equalTo("type", type).ascending('createdAt')
    }
  }
```

##### Now documents will be available via `this.data.documents` in this component.
##### To get url of file just add `.url()` in the end of field name.

````
...

  handleActiveChange: function(doc, index){
    this.setState({
      activeDocId: index,
      previewImage: doc.preview.url(),
      documentUrl: doc.file.url()
    })
  },

  render: function() {
    return (
      <div className="documentBox">
        <DocumentList activeId={this.state.activeDocId} data={this.data.documents} activeChange={this.handleActiveChange}/>
        <Preview imageSrc={this.state.previewImage} documentUrl={this.state.documentUrl}/>
      </div>
    );
  }
...

````

##### We can add some default state for this component
```

  render: function() {

    var preview;
      if (this.state.activeDocId != -1){
        preview = <Preview imageSrc={this.state.previewImage} documentUrl={this.state.documentUrl}/>;
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
```
> Also, you can install jsx-transformer. Run `npm install -g react-tools` in the terminal. Set your precompiler directory with `jsx js/app/ js/build/` and change react components source pathes in index.slim
