import React, {useState} from 'react';
import {AppRegistry, Button, NativeModules, Text, View} from 'react-native';
import {Tabs} from 'react-native-screens';

function Page() {
  const [width, setWidth] = useState(0);
  const [nativeWidth, setNativeWidth] = useState(null);
  function toggleSidebar() {
    setNativeWidth(null);
    NativeModules.SidebarProbe.toggleSidebar();
  }

  function measurePage() {
    NativeModules.SidebarProbe.measurePage(setNativeWidth);
  }

  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}
      onLayout={event => setWidth(event.nativeEvent.layout.width)}>
      <Text style={{fontSize: 22, color: 'black'}}>React onLayout · {width} pt</Text>
      {nativeWidth != null && <Text style={{fontSize: 22, color: 'black'}}>UIKit page · {nativeWidth} pt</Text>}
      <Button title="Toggle sidebar" onPress={toggleSidebar} />
      <Button title="Measure UIKit page" onPress={measurePage} />
    </View>
  );
}

function App() {
  const [selection, setSelection] = useState({selectedScreenKey: 'One', baseProvenance: 0});
  return (
    <Tabs.Host
      ios={{tabBarControllerMode: 'tabSidebar'}}
      navStateRequest={selection}
      onTabSelected={({nativeEvent}) => setSelection({
        selectedScreenKey: nativeEvent.selectedScreenKey,
        baseProvenance: nativeEvent.provenance,
      })}>
      {['One', 'Two'].map(name => (
        <Tabs.Screen key={name} screenKey={name} title={name}>
          <Page />
        </Tabs.Screen>
      ))}
    </Tabs.Host>
  );
}

AppRegistry.registerComponent('FrameProbe', () => App);
