import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '@/src/Theme/Colors'
import { CategorySelector } from '../CategorySelector';

const BeachList = () => {

  const [category, setCategory] = useState<"proprias" | "improprias">(
    "proprias"
  );

  return (
    <View style={{
      // backgroundColor: '#bacdff',
      paddingHorizontal: 20
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.BLUE_PRIMARY,
        marginBottom: 10,
        marginTop: 10
      }}>Praias</Text>

      <CategorySelector value={category} onChange={setCategory} />
    </View>
  )
}

export default BeachList