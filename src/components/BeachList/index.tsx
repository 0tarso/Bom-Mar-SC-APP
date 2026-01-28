import { View, Text, FlatList, SectionList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS } from '@/src/Theme/Colors'
import { CategorySelector } from '../CategorySelector';
import BeachSectionList from '../BeachSectionList';
import LoadingWave from '../LoadingWave';
import { filterData } from './actions';
import { useUserBeachs } from '@/src/contexts/UserBeachsContext';



export type Beach = {

}

const BeachList = () => {

  const { beachs, loadingBeachs, loadingFavorites } = useUserBeachs()

  const sectionListRef = useRef<SectionList>(null);

  const [category, setCategory] = useState<"PRÓPRIA" | "IMPRÓPRIA">(
    "PRÓPRIA"
  );

  const [filteredBeachs, setFilteredBeachs] = useState([])

  useEffect(() => {
    if (!sectionListRef.current) return;

    const timeout = setTimeout(() => {
      sectionListRef.current?.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        animated: true,
        viewOffset: 0,
      });
    }, 50);

    return () => clearTimeout(timeout);
  }, [category]);


  useEffect(() => {
    // console.log(beachs)

    filterData(beachs, setFilteredBeachs, category)
  }, [category, beachs]);



  return (
    <View style={{
      // backgroundColor: '#bacdff',
      paddingHorizontal: 20,
      flex: 1
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.BLUE_PRIMARY,
        marginBottom: 10,
        marginTop: 10
      }}>Praias</Text>

      <CategorySelector value={category} onChange={setCategory} />

      <View style={{ flex: 1, }}>

        {loadingBeachs ? (
          <View style={{ flex: 1, justifyContent: 'center', }}>

            <LoadingWave />
          </View>
        ) : (

          <View style={{ flex: 1 }}>
            {filteredBeachs.length > 0 ? (

              <BeachSectionList
                data={filteredBeachs}
                ref={sectionListRef}
                onScrollToIndexFailed={() => {
                  sectionListRef.current?.scrollToOffset({
                    offset: 0,
                    animated: true,
                  });
                }}
              />
            ) : (
              <>
                <Text>.</Text>
              </>
            )}

          </View>
        )}



      </View>

    </View>
  )
}

export default BeachList