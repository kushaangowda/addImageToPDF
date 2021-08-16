const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

const addSignToPDF = async ({ pathToPDF, pathToImage, pages, x, y, width, height }) => {
	try {
		const pdfDoc = await PDFDocument.load(fs.readFileSync(pathToPDF));
		const img = await pdfDoc.embedPng(fs.readFileSync(pathToImage));
		const imagePages = pdfDoc.getPages();

		for (let i = 0; i < pages.length; i++) {
			if (pages[i] >= 0 && pages[i] < imagePages.length) {
				imagePages[pages[i]].drawImage(img, {
					x,
					y,
					width,
					height,
				});
			}
		}

		const pdfBytes = await pdfDoc.save();
		const newFilePath = `${path.basename(pathToPDF, ".pdf")}-result.pdf`;
		fs.writeFileSync(newFilePath, pdfBytes);
	} catch (err) {
		console.log(error);
	}
};

const pdfParams = {
	pathToPDF: "./test.pdf",
	pathToImage: "./test.png",
	pages: [0],
	x: 0,
	y: 0,
	width: 30,
	height: 20,
};

addSignToPDF(pdfParams);
