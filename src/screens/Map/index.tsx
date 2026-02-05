import { useLocation } from '@/src/hooks/useLocation';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import map from "@/src/webview/leaflet.html"
import { useUserBeachs } from '@/src/contexts/UserBeachsContext';
import { transformBeachesToLeaflet } from '@/src/utils/transformBeachesToLeaflet';
import { CustomModal } from '@/src/components/CustomModal';
import BeachInfoModal from '@/src/components/BeachInfoModal';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '@/src/Theme/Colors';
import { styles } from './styles';
import { useIsFocused } from '@react-navigation/native';
import { Toast } from 'toastify-react-native';
import { useBeachInterstitial } from '@/src/hooks/useBeachInterstitial';


export default function MapScreen() {

  const isFocused = useIsFocused()
  const webViewRef = useRef<WebView>(null);
  const { beachs } = useUserBeachs();
  const { location } = useLocation();
  const { maybeShowAd } = useBeachInterstitial()

  const [selectedBeach, setSelectedBeach] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);


  const [webReady, setWebReady] = useState(false)

  function sendMarkers(markers) {
    webViewRef.current.injectJavaScript(`
      window.setMarkers(${JSON.stringify(markers)});
      true;
    `);
  }

  function sendUserLocation(location) {
    webViewRef.current.injectJavaScript(`
      window.updateUserLocation(${location.latitude}, ${location.longitude});
      true;
    `);
  }

  useEffect(() => {
    if (isFocused && webReady) {
      webViewRef.current.injectJavaScript(`
      window.refreshMap();
      true;
    `);
    }
  }, [isFocused, webReady])

  useEffect(() => {

    if (!webReady) return
    const markers = transformBeachesToLeaflet(beachs);
    if (markers.length === 0) return

    webViewRef.current.injectJavaScript(`
    window.updateMarkers(${JSON.stringify(markers)});
    true;`
    );

    sendMarkers(markers)

    if (!location) return
    sendUserLocation(location)

  }, [beachs, location?.updated_at, webReady]);

  async function handleMessage(event: any) {
    try {
      const message = JSON.parse(event.nativeEvent.data)

      if (message.type === 'MARKER_CLICK') {
        await maybeShowAd()
        setSelectedBeach(message.payload)
        setModalVisible(true)
      }
    } catch (e) {
      Toast.info('Erro ao buscar praia :(')
    }
  }

  return (
    <View
      style={{ flex: 1 }}
    >
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={selectedBeach?.praia}
      >
        <BeachInfoModal beach={selectedBeach} />
      </CustomModal>

      <View style={styles.subtitleContainer}>
        <View style={styles.subTitle}>
          <FontAwesome name='map-marker' color={COLORS.GREEN} size={24} />
          <Text style={styles.subTitleText}>PRÓPRIA</Text>
        </View>
        <View style={styles.subTitle}>
          <FontAwesome name='map-marker' color={COLORS.RED_CAUTION} size={24} />
          <Text style={styles.subTitleText}>IMPRÓPRIA</Text>
        </View>
      </View>
      <WebView
        ref={webViewRef}
        source={map}
        javaScriptEnabled
        domStorageEnabled
        onLoadEnd={() => setWebReady(true)}
        onBlur={() => setWebReady(false)}
        onMessage={(event) => handleMessage(event)}
        style={{ flex: 1, zIndex: 0, position: "absolute", width: "100%", height: "100%" }}
      />

    </View>

  );
}


