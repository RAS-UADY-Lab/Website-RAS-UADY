import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { asunto, asuntoPers, email, nombre, mensaje } = body;

    // 1. Validación básica
    if (!email || !nombre || !mensaje) {
      return NextResponse.json(
        { exito: false, mensaje: "Por favor, completa todos los campos correctamente." },
        { status: 400 }
      );
    }

    // 2. Lógica de Asunto
    const mapaAsuntos: Record<string, string> = {
      "1": "Duda", "2": "Sugerencia", "3": "Opinión",
      "4": "Reporte/Queja", "5": "Invitación", "6": "Otro"
    };
    const asuntoTexto = mapaAsuntos[asunto] || "Asunto desconocido";
    const asuntoCompleto = `Web RAS - ${asunto === "6" && asuntoPers ? asuntoPers : asuntoTexto}`;

    // 3. Configuración del servidor de correo (SMTP Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // 4. Construcción del mensaje
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Te lo envías a ti mismo (ras.fiuady@gmail.com)
      replyTo: email, // Para que al darle "Responder" en Gmail, le escribas al usuario
      subject: asuntoCompleto,
      text: `Este mensaje fue enviado por: ${nombre}\nE-mail: ${email}\nAsunto: ${asuntoCompleto}\n\nMensaje:\n${mensaje}\n\nEnviado el ${new Date().toLocaleString('es-MX')}`,
    };

    // 5. Envío
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ exito: true, mensaje: "¡Mensaje enviado con éxito! Gracias por contactarnos." });
    
  } catch (error) {
    console.error("Error enviando correo:", error);
    return NextResponse.json(
      { exito: false, mensaje: "Error al enviar el mensaje. Intenta de nuevo más tarde o contáctanos por nuestras redes sociales." },
      { status: 500 }
    );
  }
}