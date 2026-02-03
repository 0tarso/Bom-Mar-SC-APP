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
import NotFoundAnimation from '../NotFound';



export type Beach = {

}

const BeachList = () => {

  const { beachs, loadingBeachs, loadingFavorites, errorFetchBeach } = useUserBeachs()

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
              <View style={{ justifyContent: 'center', alignItems: 'center', height: '90%' }}>

              </View>
            )}

          </View>
        )}

        {errorFetchBeach && (
          <>
            <NotFoundAnimation />
            <Text style={{
              fontFamily: "MontserratBold",
              marginTop: 40
            }}>Algo errado aconteceu. Tente novamente.</Text>
          </>
        )}

      </View>

    </View>
  )
}

export default BeachList