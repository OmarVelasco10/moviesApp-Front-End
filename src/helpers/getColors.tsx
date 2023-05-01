import ImageColors from "react-native-image-colors";

export const getImageColors = async (uri: string) => {
  let primary;
  let secondary;
  try {
    const colors = await ImageColors.getColors(uri, {});

    switch (colors.platform) {
      case "android":
        // android result properties
        primary = colors.dominant;
        secondary = colors.average;
        break;
      case "ios":
        // iOS result properties
        primary = colors.primary;
        secondary = colors.secondary;
        break;
      default:
        throw new Error("Unexpected platform key");
    }
  } catch (error) {
    console.log(error);
  }
  return [primary, secondary];
};
