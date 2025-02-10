import { useAuth } from "@/context/AuthContext";
import { Slot, Redirect } from "expo-router";

export default function AppLayout() {
  const { session } = useAuth();
  return !session ? <Redirect href={"/sign-in"} /> : <Slot />;
}
