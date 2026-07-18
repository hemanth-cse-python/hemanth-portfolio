import { toast } from "sonner";

export type AssetLike = {
  url?: string;
  original_filename?: string;
};

/**
 * Fetches an asset and forces a browser download. Shows a friendly
 * toast when the file is missing or the network request fails.
 */
export async function downloadAsset(
  asset: AssetLike | undefined | null,
  fallbackName = "file.pdf",
  label = "File",
): Promise<void> {
  if (!asset?.url) {
    toast.error(`${label} is not available yet`, {
      description: "Please check back soon — the file will be added shortly.",
    });
    return;
  }

  try {
    const res = await fetch(asset.url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = asset.original_filename || fallbackName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch {
    toast.error(`Couldn't download ${label.toLowerCase()}`, {
      description: "Opening the file in a new tab instead.",
    });
    window.open(asset.url, "_blank", "noreferrer");
  }
}
