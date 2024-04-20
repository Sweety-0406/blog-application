import getCurrentUser from "../action/getCurrentUser";
import { getListings } from "../action/getListings";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";
import prisma from "@/app/libs/prismadb";
//@ts-ignore
export default function PropertiesPage({ currentUser, listings }) {
    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login!"
            />
        );
    }

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No properties found."
                subtitle="Looks like you have no properties."
            />
        );
    }

    return (
        <PropertiesClient
            currentUser={currentUser}
            listings={listings}
        />
    );
}

export async function getServerSideProps() {
    try {
        // Fetch currentUser and listings here
        const currentUser = await getCurrentUser();
        const listings = await getListings({
            userId: currentUser?.id
        });

        return {
            props: {
                currentUser,
                listings
            }
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                currentUser: null,
                listings: []
            }
        };
    }
}
