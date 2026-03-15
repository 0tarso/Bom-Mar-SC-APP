import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export function normalizeFontScale(size: number): number {
  const scaleW = SCREEN_WIDTH / BASE_WIDTH;
  const scaleH = SCREEN_HEIGHT / BASE_HEIGHT;
  const scale = Math.min(scaleW, scaleH); // usa a menor escala como limitante
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
}