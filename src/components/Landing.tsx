import { LandingPosts } from "@/components/LandingPosts"
import { HeroSection } from "@/components/HeroSection"
import { FeaturesGrid } from "@/components/FeaturesGrid"
import { CTA } from "@/components/CTA"
import { SplitSections } from "@/components/SplitSections"

export function Landing() {
    return (
        <>
            <HeroSection />
            <FeaturesGrid />
            <LandingPosts />
            <SplitSections />
            <CTA />
        </>
    )
}
