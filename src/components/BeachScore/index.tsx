import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '@/src/Theme/Colors'
import AnimatedProgressWheel from 'react-native-progress-wheel'
import { styles } from './styles';
import CustomTooltip from '../ToolTip';
import { FontAwesome } from '@expo/vector-icons';

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
  situation: "PRÓPRIA" | "IMPRÓPRIA",
  resultado_e_coli: string
}


export default function BeachScore(props: Props) {
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={styles.cardContainerTitle}>Tipos de banho</Text>

      <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>


        {props.situation === 'IMPRÓPRIA' && (
          <View style={[styles.container, { width: "100%", flexDirection: 'row', columnGap: 20 }]}>
            <View style={{
              position: 'absolute',
              zIndex: 20,
              right: 8,
              top: 5
            }}>
              <CustomTooltip
                text='Um ponto é considerado próprio quando em 4 das últimas 5 coletas o resultado de concentração de E. coli for inferior a 800 NMP/100mL, ressalvada também a condição que o resultado mais recente seja inferior a 2.000 NMP/100mL.'
              >
                <FontAwesome name='info-circle' size={18} color={COLORS.BLUE_DISABLE} />
              </CustomTooltip>
            </View>
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

            <View>
              <Text style={[styles.textValue, {
                width: "80%",
                textAlign: 'left',
                color: COLORS.TEXT_GRAY,
                fontSize: 16
              }]}>Praia imprópria para banho</Text>

              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>

                <View>

                  <Text style={[styles.textValue, {
                    fontSize: 12,
                    textAlign: 'left',
                    color: COLORS.TEXT_GRAY,
                    fontFamily: 'MontserratSemiBold'
                  }]}>Nível de e.coli:</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text
                      style={[styles.textValue, {
                        fontSize: 16,
                        marginTop: 0,
                        textAlign: 'left',
                        color: COLORS.TEXT_GRAY,
                        fontFamily: 'MontserratSemiBold'
                      }]}
                    >{props.resultado_e_coli}</Text>
                    <Text style={{
                      fontFamily: "MontserratRegular",
                      color: COLORS.TEXT_GRAY,
                      fontSize: 12
                    }}> NMP/100ml</Text>

                  </View>

                </View>
              </View>
            </View>
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
                  fontSize: 16,
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
                duration={1500}
                labelStyle={{
                  fontSize: 16,
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
                  fontSize: 16,
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