import { View, Text, SectionList, SectionListProps } from 'react-native'
import React, { useEffect } from 'react'
import BeachCard from '../BeachCard';
import { COLORS } from '@/src/Theme/Colors';
import { updateFavorite } from '@/src/services/updateFavorite';
import { useUserBeachs } from '@/src/contexts/UserBeachsContext';
import { BeachLocalization } from '@/src/types';


interface Props extends SectionListProps<any> {
  data: BeachLocalization[]
}


const BeachSectionList = ({ data, ...rest }: Props) => {
  const { handleUpdateFavorite } = useUserBeachs()


  const toggleFavorite = async (item) => {
    await handleUpdateFavorite(item)
  }

  return (
    <SectionList
      contentContainerStyle={{ paddingBottom: 150 }}
      sections={data}
      showsVerticalScrollIndicator={false}

      keyExtractor={(item, index) => item.complemento + item.local}
      renderItem={({ item }) => (
        <BeachCard
          beach={item}
          onPress={() => toggleFavorite(item)}
        />)}
      renderSectionHeader={({ section }) => (
        <View style={{
          backgroundColor: "#f3f3f3",
          // elevation: 1,
          // zIndex: 1000,
          // opacity: 0.5
        }}>
          <Text style={{
            fontSize: 20,
            paddingLeft: 10,
            fontWeight: "900",
            color: COLORS.BLUE_PRIMARY,
            paddingTop: 20,
            paddingBottom: 10

          }}>{section.title}</Text>
        </View>
      )}
      stickySectionHeadersEnabled
      renderSectionFooter={(props) => (
        <Text style={{
          textAlign: 'right',
          color: COLORS.TEXT_GRAY,
          paddingRight: 5
        }}>{props.section.data.length} {props.section.data.length > 1 ? "praias" : "praia"}</Text>)
      }
      {...rest}


    />
  )
}

export default BeachSectionList