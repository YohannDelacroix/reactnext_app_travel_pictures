import { redirect } from "next/navigation";
import { PATH_LANDING_TRAVEL_MEMORIES } from "@/constants/paths";

export default function Home() {
    redirect(PATH_LANDING_TRAVEL_MEMORIES); 
    return null; 
}
