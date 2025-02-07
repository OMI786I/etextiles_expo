import { Drawer } from "expo-router/drawer";
import "../global.css";
import DrawerContent from "@/components/DrawerContent";

export default function RootLayout() {
  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
      }}
    >
      <Drawer.Screen name="index" />
      <Drawer.Screen name="settings" />
    </Drawer>
  );
}
