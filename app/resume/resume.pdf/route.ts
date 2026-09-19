import fs from "node:fs";
import path from "node:path";

export async function GET() {
  const primaryPath = path.join(
    process.cwd(),
    "public",
    "resume",
    "Tanisha_Gupta_Resume.pdf"
  );
  const secondaryPath = path.join(
    process.cwd(),
    "public",
    "resume",
    "resume.pdf"
  );

  const targetPath = fs.existsSync(primaryPath)
    ? primaryPath
    : fs.existsSync(secondaryPath)
      ? secondaryPath
      : null;

  if (!targetPath) {
    return new Response("Resume file not found", { status: 404 });
  }

  // Ensure resume.pdf is kept in sync on disk
  try {
    if (targetPath === primaryPath) {
      fs.copyFileSync(primaryPath, secondaryPath);
    }
  } catch (err) {
    console.error("Error syncing resume files:", err);
  }

  const fileBuffer = fs.readFileSync(targetPath);

  return new Response(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(fileBuffer.length),
      "Content-Disposition": 'inline; filename="Tanisha_Gupta_Resume.pdf"',
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
