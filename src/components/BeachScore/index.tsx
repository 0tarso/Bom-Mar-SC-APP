import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '@/src/Theme/Colors'
import AnimatedProgressWheel from 'react-native-progress-wheel'
import { styles } from './styles';

interface Props {
  score: {
    adulto: {
      score: number;
      label: "Não recomendado" | "Atenção" | "Bom" | "Excelente";
    };
    crianca: {
      score: number;
      label: "Não recomendado" | "Atenção" | "Bom" | "Excelente";
    };
    surf: {
      score: number;
      label: "Fraco" | "Regular" | "Bom" | "Clássico";
    };
  },
  situation: "PRÓPRIA" | "IMPRÓPRIA"
}


export default function BeachScore(props: Props) {
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={styles.cardContainerTitle}>Tipos de banho</Text>

      <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>

        {props.situation === 'IMPRÓPRIA' && (
          <View style={[styles.container, { width: "100%", flexDirection: 'row', columnGap: 20 }]}>
            <AnimatedProgressWheel
              size={100}
              width={20}
              color={COLORS.RED_CAUTION}
              progress={0}
              animateFromValue={100}
              backgroundColor="#aa5151"
              delay={500}
              duration={1000}
              labelStyle={{ fontFamily: "MontserratBold", color: COLORS.RED_CAUTION }}
              showProgressLabel
            />

            <Text style={[styles.textValue, { width: "70%", textAlign: 'left', color: COLORS.TEXT_GRAY }]}>Praia imprópria para banho</Text>
          </View>
        )}


        {props.situation === "PRÓPRIA" && (
          <>

            <View style={styles.container}>
              <AnimatedProgressWheel
                size={60}
                width={10}
                color={
                  props.score?.adulto?.label === 'Excelente' || props.score?.adulto?.label === 'Bom'
                    ? COLORS.GREEN
                    : props?.score?.adulto.label === 'Atenção'
                      ? '#e6bf25'
                      : COLORS.RED_CAUTION
                }
                progress={props?.score?.adulto?.score}
                animateFromValue={0}
                backgroundColor={props.score?.adulto?.label === 'Excelente' || props.score?.adulto?.label === 'Bom'
                  ? "#ccfdd2"
                  : props.score?.adulto.label === 'Atenção'
                    ? '#968334'
                    : "#aa5151"}
                duration={1000}
                labelStyle={{
                  fontFamily: "MontserratSemiBold",
                  color: props.score?.adulto?.label === 'Excelente' || props.score?.adulto?.label === 'Bom'
                    ? COLORS.GREEN
                    : props.score?.adulto?.label === 'Atenção'
                      ? '#e6bf25'
                      : COLORS.RED_CAUTION
                }}
                showProgressLabel
              />

              <View>
                <Text style={styles.textValue}>{props?.score?.adulto?.label}</Text>
                <Text style={styles.textLabel}>Adulto</Text>
              </View>

            </View>
            <View style={styles.container}>
              <AnimatedProgressWheel
                size={60}
                width={10}
                delay={500}
                color={
                  props.score?.crianca?.label === 'Excelente' || props.score?.crianca?.label === 'Bom'
                    ? COLORS.GREEN
                    : props.score.crianca.label === 'Atenção'
                      ? '#eaca4b'
                      : COLORS.RED_CAUTION
                }
                progress={props?.score.crianca.score}
                animateFromValue={0}
                backgroundColor={props.score.crianca.label === 'Excelente' || props.score.crianca.label === 'Bom'
                  ? "#ccfdd2"
                  : props.score.crianca.label === 'Atenção'
                    ? '#968334'
                    : "#aa5151"}
                duration={1000}
                labelStyle={{
                  fontFamily: "MontserratSemiBold",
                  color: props.score.crianca.label === 'Excelente' || props.score.crianca.label === 'Bom'
                    ? COLORS.GREEN
                    : props.score.crianca.label === 'Atenção'
                      ? '#eaca4b'
                      : COLORS.RED_CAUTION
                }}
                showProgressLabel
              />

              <View>
                <Text style={styles.textValue}>{props?.score?.crianca?.label}</Text>
                <Text style={styles.textLabel}>Infantil</Text>
              </View>

            </View>
            <View style={styles.container}>
              <AnimatedProgressWheel
                size={60}
                width={10}
                delay={1000}
                color={
                  props.score?.surf?.label === 'Bom' || props.score?.surf?.label === 'Clássico'
                    ? COLORS.GREEN
                    : props.score?.surf?.label === 'Regular'
                      ? '#eaca4b'
                      : COLORS.RED_CAUTION
                }
                progress={props?.score?.surf?.score}
                animateFromValue={0}
                backgroundColor={props.score?.surf?.label === 'Bom' || props.score?.surf?.label === 'Clássico'
                  ? "#ccfdd2"
                  : props.score?.surf?.label === 'Regular'
                    ? '#968334'
                    : "#aa5151"}
                duration={1000}
                labelStyle={{
                  fontFamily: "MontserratSemiBold",
                  color: props.score?.surf?.label === 'Bom' || props.score?.surf?.label === 'Clássico'
                    ? COLORS.GREEN
                    : props.score?.surf?.label === 'Regular'
                      ? '#eaca4b'
                      : COLORS.RED_CAUTION
                }}
                showProgressLabel
              />

              <View>
                <Text style={styles.textValue}>{props?.score?.surf?.label}</Text>
                <Text style={styles.textLabel}>Surf</Text>
              </View>

            </View>
          </>
        )}

      </View>
    </View>
  )
}