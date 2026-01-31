import { Share } from "react-native";
import { Beach } from "../types";
import { Toast } from "toastify-react-native";

export async function shareText(item: Beach, situation: "PRÓPRIA" | "IMPRÓPRIA") {
  let message = ''
  let url = `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`
  if (situation === "PRÓPRIA") {
    message = `🌊 ${item.praia} está própria para banho!\n\n📍Pra ser mais exato:\n${item.complemento}\nAproveite o dia na praia! 🏖️\n\nBaixe o app Bom Mar SC e fique atualizado💡\n\nVeja a localização no mapa:\n${url}`
  } else {
    message = `🌊 ${item.praia} está imprópria para banho!\n\nPra ser mais exato:\n${item.complemento}\n\nCuide-se e evite riscos à saúde. ⚠️\n\nBaixe o app Bom Mar SC e fique atualizado💡`
  }



  try {
    await Share.share({ title: "Bom Mar SC", message: message });
  } catch (error) {
    Toast.error("Erro ao compartilhar com app");
  }
}