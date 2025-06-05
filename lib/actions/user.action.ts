export async function uploadAvatarToServer(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload-avatar", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");

  return data.url;
}