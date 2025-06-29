import { generatePageMetadata } from "@config/seo";
import HomePage from "@design-system/pages/HomePage";
import { getPageConfig } from "@lib/services/api-service";

export async function generateMetadata() {
  try {
    const pageConfig = await getPageConfig("homepage");

    return generatePageMetadata({
      title: pageConfig?.seoTitle,
      description: pageConfig?.seoDescription,
      openGraph: {
        title: pageConfig?.seoTitle,
        description: pageConfig?.seoDescription,
      },
      twitter: {
        title: pageConfig?.seoTitle,
        description: pageConfig?.seoDescription,
      },
    });
  } catch (error) {
    console.warn("Failed to fetch page config for metadata, using defaults", error.message);
    return generatePageMetadata();
  }
}

export default function Home() {
  return <HomePage />;
}
