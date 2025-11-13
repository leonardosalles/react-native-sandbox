import React, {useEffect, useState} from 'react';
import {SafeAreaView, Button, Text} from 'react-native';

export default function App() {
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    if (global.NativeMath) console.log('NativeMath activated');
    else console.warn('NativeMath not loaded yet');
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>JSI Shared C++ (iOS + Android)</Text>
      <Button
        title="Add (2+3)"
        onPress={() => setResult(global.NativeMath.add(2, 3))}
      />
      <Button
        title="Multiply (4×5)"
        onPress={() => setResult(global.NativeMath.multiply(4, 5))}
      />
      {result !== null && <Text style={{marginTop: 10}}>Result: {result}</Text>}
    </SafeAreaView>
  );
}
