export const downloadUri = (uri: string, filename: string) => {
  var link = document.createElement("a");
  link.style.display = "none";
  link.setAttribute("download", filename);
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  link.remove();
};
