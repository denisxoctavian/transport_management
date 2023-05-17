import jsPDF from "jspdf";
import 'jspdf-autotable';
import { RepositoryService } from "src/services/repository.service";

export function printPdf(transport:any,hour:any,date:any,location:any){
  const doc = new jsPDF();
  const logoImg = new Image();
  logoImg.src = 'assets/imgs/logo.png';
  
  doc.addImage(logoImg, 'PNG', 5, 0, 30, 30);
  doc.setFontSize(18);
  doc.setFont('', 'bold');
  doc.text(`TRANSPORT APPOINTMENT FOR TRANSPORT ID${transport}`, 25, 30);
  doc.setFontSize(10);
  doc.setFont('', 'normal');
  doc.text(
    'This is your appointment in PDF format. Try not to lose it; the location manager will ask for it when you arrive.',
    10,
    60
  );
  doc.text('This appointment has been arranged to provide transportation services for Draexlmaier Group.', 10, 67);
  doc.text('Appointment Details:', 10, 80);
  doc.setFont('', 'bold');
  doc.text(`Date: ${date}`, 10, 100);
  doc.text(`Time: ${hour}`, 10, 110);
  doc.text(`Drop-off Location: ${location}`, 10, 120);
  doc.setFont('', 'normal');
  doc.text(
    'Please ensure that you are ready and available at the drop-off location at least 10 minutes before the scheduled time.',
    10,
    150
  );
  doc.text(
    'If there are any changes or if you need to reschedule the appointment, kindly contact our customer support team as soon as possible.',
    10,
    157
  );
  doc.text(
    'We appreciate your cooperation and look forward to providing you with a safe and comfortable transportation experience.',
    10,
    164
  );
  doc.text(
    'Should you have any further questions or require additional information, please do not hesitate to reach out to us.',
    10,
    171
  );
  doc.text('Thank you for helping us improve our services.', 10, 178);

  const signatureText = 'Signature:';
  const signatureX = 130;
  const signatureY = 230;
  const signatureNameX = signatureX;
  const signatureNameY = 232;
  doc.setFontSize(10);
  doc.setFont('', 'bold');
  doc.text(signatureText, signatureX, signatureY);
  doc.line(signatureNameX+20, 230, signatureNameX + 55, 230);
  doc.setFontSize(3);
  doc.setFont('', 'normal');
  doc.text('*signature of location manager', signatureNameX, signatureNameY);
  
  // Footer background rectangle
  const footerColor = '#026d79';
  const footerHeight = 10;
  const footerWidth = doc.internal.pageSize.getWidth();
  const footerX = 0;
  const footerY = doc.internal.pageSize.getHeight() - footerHeight;
  doc.setFillColor(footerColor);
  doc.rect(footerX, footerY, footerWidth, footerHeight, 'F');
  
  // Footer text
  const footerText = 'All Rights Reserved ©2023 Draexlmaier';
  const footerTextWidth = doc.getStringUnitWidth(footerText) * 15 / doc.internal.scaleFactor;
  const footerTextX = (footerWidth - footerTextWidth) / 2 +20;
  const footerTextY = footerY + (footerHeight / 2) + 2;
  doc.setFontSize(8);
  doc.setTextColor('#ffffff');
  doc.text(footerText, footerTextX, footerTextY);
  
  // Save the PDF
  doc.save(`transport_appointment${transport}.pdf`);
  
}