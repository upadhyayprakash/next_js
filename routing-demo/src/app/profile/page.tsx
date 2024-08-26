import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "My Profile" // ignores title.template of parent segments
    }
}

export default function Profile() {
    return <h1>Profile Page</h1>
}