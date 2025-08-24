import { glob } from "glob";
import path from "path";

export default async function sitemap() {
    const baseUrl = "https://zocktech.com";
    const pagesDir = path.join(process.cwd(), "app");
    const files = await glob("**/page.js", { cwd: pagesDir });

    const routes = files.map((file) => {
        const route = file.replace(/\\/g, "/").replace(/\/page\.js$/, "");
        return {
            url: `${baseUrl}/${route}`,
            lastModified: new Date(),
        };
    });

    return routes;
}