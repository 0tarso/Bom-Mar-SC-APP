//React ================================================
import { View, Text, SectionList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

//Components ================================================
import { CategorySelector } from '../CategorySelector';
import BeachSectionList from '../BeachSectionList';
import LoadingWave from '../LoadingWave';

//Styles ================================================
import { styles } from './styles';


//Actions ================================================
import { filterData } from './actions';

//Context-hook ================================================
import { useUserBeachs } from '@/src/contexts/UserBeachsContext';

//Types ================================================
import { BeachLocalization } from '@/src/types';



export type Beach = {

}

const BeachList = () => {

  const { beachs, loadingBeachs, loadingFavorites } = useUserBeachs()

  const sectionListRef = useRef<SectionList>(null);

  const [beachSituationSelected, setBeachSituationSelected] = useState<"PRÓPRIA" | "IMPRÓPRIA">(
    "PRÓPRIA"
  );

  const [filteredBeachs, setFilteredBeachs] = useState<BeachLocalization[] | []>([])

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
  }, [beachSituationSelected]);


  useEffect(() => {
    // console.log(beachs)

    filterData(beachs, setFilteredBeachs, beachSituationSelected)
  }, [beachSituationSelected, beachs]);



  return (
    <View style={styles.container}>
      {/* <Text style={styles.titleHeader}>Praias</Text> */}

      <CategorySelector value={beachSituationSelected} onChange={setBeachSituationSelected} />

      <View style={{ flex: 1 }}>

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