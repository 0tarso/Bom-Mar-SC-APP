//React ================================================
import { View, Text, SectionList, TouchableOpacity, Keyboard, TextInput, FlatList, useWindowDimensions } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'

//Components ================================================
import { CategorySelector } from '../CategorySelector';
import BeachSectionList from '../BeachSectionList';
import LoadingWave from '../LoadingWave';
import Feather from '@expo/vector-icons/Feather';

//Styles ================================================
import { styles } from './styles';


//Actions ================================================
import { filterData } from './actions';

//Context-hook ================================================
import { useUserBeachs } from '@/src/contexts/UserBeachsContext';

//Types ================================================
import { BeachLocalization } from '@/src/types';
import NotFoundAnimation from '../NotFound';
import { COLORS } from '@/src/Theme/Colors';
import { CustomModal } from '../CustomModal';
import { normalize } from '@/src/utils/mapPraiaCidade';
import { useLocation } from '@/src/hooks/useLocation';
import { getNearestBeaches } from '@/src/utils/getNearestBeaches';


const BeachList = () => {
  const { height } = useWindowDimensions()
  const { location } = useLocation()
  const { beachs, loadingBeachs, errorFetchBeach } = useUserBeachs()

  const sectionListRef = useRef<SectionList>(null);

  const [beachSituationSelected, setBeachSituationSelected] = useState<"PRÓPRIA" | "IMPRÓPRIA">(
    "PRÓPRIA"
  );

  const [filteredBeachs, setFilteredBeachs] = useState<BeachLocalization[] | []>([])

  const [modalVisible, setModalVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef(null)

  const praiasProximas = useMemo(() => {
    if (!location) return [];

    return getNearestBeaches(
      beachs,
      location.latitude,
      location.longitude,
      50 // raio em km
    );
  }, [beachs, location]);

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
    filterData(beachs, setFilteredBeachs, beachSituationSelected)
  }, [beachSituationSelected, beachs]);

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [modalVisible])


  const handleShowModal = () => {
    setModalVisible(true)
    // console.log(beachs)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    setSearchQuery('')
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.titleHeader}>Praias</Text> */}

      <CustomModal
        visible={modalVisible}
        onClose={handleCloseModal}
        animationIn={'fadeIn'}
        animationOut={'fadeOutUp'}
      >
        <View style={{ backgroundColor: COLORS.GRAY_BACKGROUND }}>
          <View style={styles.searchModalContainer}>
            <TextInput
              ref={inputRef}
              placeholder="Busque pela cidade..."
              placeholderTextColor="#aaa"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />
          </View>
          <View style={{
            paddingHorizontal: 10,
            marginTop: 10
          }}>

            <CategorySelector value={beachSituationSelected} onChange={setBeachSituationSelected} />
          </View>

          <View style={{ height: 800, paddingHorizontal: 10 }}>
            {searchQuery !== '' && (
              <BeachSectionList
                data={filteredBeachs.filter(b =>
                  normalize(b.title).includes(normalize(searchQuery))
                )}
              />
            )}

            {searchQuery === '' && (
              <BeachSectionList
                data={praiasProximas}
              />
            )}
          </View>
        </View>

      </CustomModal >

      <View style={[styles.searchModalButton]}>
        <TouchableOpacity
          hitSlop={10}
          delayPressIn={100}
          onPress={handleShowModal}
        >
          <Feather name="search" size={24} color={COLORS.BLUE_ENABLE} />
        </TouchableOpacity>
      </View>

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
              <View style={{}}>

              </View>
            )}

          </View>
        )}

        {errorFetchBeach && (
          <>
            <NotFoundAnimation />
            <Text style={{
              fontFamily: "MontserratBold",
            }}>Algo errado aconteceu. Tente novamente.</Text>
          </>
        )}

      </View>

    </View >
  )
}

export default BeachList