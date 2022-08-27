import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import { Themes } from "../styles/globalStyles";

export const optionsTheme = [
  { label: "Theme 1", value: Themes.theme1 },
  { label: "Theme 2", value: Themes.theme2 },
];

export const optionsData = [
  {
    label: "Data 1",
    value: "https://run.mocky.io/v3/476d7474-9066-4da5-b40d-8990f09f5f3d",
  },
  {
    label: "Data 2",
    value: "https://run.mocky.io/v3/c83e8d8a-0a8e-44be-bef8-c08bc2837a9c",
  },
];

async function creatPdf({
  doc,
  elements,
}: {
  doc: jsPDF;
  elements: HTMLCollectionOf<Element>;
}) {
  let top = 20;
  const padding = 10;

  for (let i = 0; i < elements.length; i++) {
    const el = elements.item(i) as HTMLElement;
    const imgData = await htmlToImage.toPng(el);

    let elHeight = el.offsetHeight;
    let elWidth = el.offsetWidth;

    const pageWidth = doc.internal.pageSize.getWidth();

    if (elWidth > pageWidth) {
      const ratio = pageWidth / elWidth;
      elHeight = elHeight * ratio - padding;
      elWidth = elWidth * ratio - padding;
    }

    const pageHeight = doc.internal.pageSize.getHeight();

    if (top + elHeight > pageHeight) {
      doc.addPage();
      top = 20;
    }

    doc.addImage(imgData, "PNG", padding, top, elWidth, elHeight, `image${i}`);
    top += elHeight;
  }
}

export const downloadPdf = async () => {
  const doc = new jsPDF("p", "px"); // (1)

  const elements = document.getElementsByClassName("hydro-chart"); // (2)

  await creatPdf({ doc, elements }); // (3-5)

  doc.save("HydroChart.pdf");
};
