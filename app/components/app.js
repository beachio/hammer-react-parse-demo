Parse.initialize("yl15iLrGL4Wb31gasfCSojl4Pj4Yhwj0MMd17EyW", "qxWQwqVXxXz1JTrsRMwsjyAyBvQ2VGPb1J9TX2xt");

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
            <Tab>Templates</Tab>
            <Tab>Themes</Tab>
            <Tab>Tools</Tab>
          </TabList>
          <TabPanel>
            <DocumentBox type='template'/>
          </TabPanel>
          <TabPanel>
            <DocumentBox type='theme'/>
          </TabPanel>
          <TabPanel>
            <DocumentBox type='tools'/>
          </TabPanel>
        </Tabs>

      </div>
    );
  }
});

React.render(<App/>, document.getElementById('react-container'));