import { Drawer } from "expo-router/drawer";
import "../global.css";
import DrawerContent from "@/components/DrawerContent";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { AuthProvider } from "@/context/AuthContext";
export default function RootLayout() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Drawer
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerPosition: "right",
          }}
        >
          <Drawer.Screen name="index" />
          <Drawer.Screen name="settings" />
          <Drawer.Screen name="register" />
          <Drawer.Screen name="sign-in" />
          <Drawer.Screen name="wishlist" />
          <Drawer.Screen name="cart" />
        </Drawer>
      </Provider>
    </AuthProvider>
  );
}
