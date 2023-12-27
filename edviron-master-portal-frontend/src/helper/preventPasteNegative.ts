export const preventPasteNegative = (e: any) => {
  const clipboardData = e.clipboardData || window.Clipboard;
  const pastedData = parseFloat(clipboardData.getData("text"));
  if (pastedData < 0) {
    e.preventDefault();
  }
};
