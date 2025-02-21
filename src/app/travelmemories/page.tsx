/**
 * Gallery page
 * 
 * @description Main page where the clients can access their private gallery with an ID
 * 
 */
import { Metadata } from "next";
import LinkButton, { buttonType } from "./components/LinkButton";
import LandingTravelMemories from "./components/LandingTravelMemories/LandingTravelMemories";

export const metadata: Metadata = {
    title: "Pictures",
    description: "",
};

export default function TravelMemoriesPage() {
    //TODO
    return (
        <LandingTravelMemories />
    );
}
