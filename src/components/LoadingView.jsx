import {ActivityIndicator, Text, View} from "react-native";

const LoadingView = ({statusMsg}) => {
  return (
      <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={80} color="#0000ff"/>
          <Text className="text-black dark:text-white mt-5">{statusMsg}</Text>
          <Text className="text-black dark:text-white absolute bottom-5">Disclaimer: Not many toilets known to database.</Text>
      </View>
  )
}

export default LoadingView;