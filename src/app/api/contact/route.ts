import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { asunto, asuntoPers, email, nombre, mensaje } = body;

    // 1. Validación básica de seguridad
    if (!email || !nombre || !mensaje) {
      return NextResponse.json(
        { exito: false, mensaje: "Por favor, completa todos los campos correctamente." },
        { status: 400 }
      );
    }

    // 2. Formateo y Lógica de Asunto
    const mapaAsuntos: Record<string, string> = {
      "1": "Duda", "2": "Sugerencia", "3": "Opinión",
      "4": "Reporte/Queja", "5": "Invitación", "6": "Otro"
    };
    const asuntoTexto = mapaAsuntos[asunto] || "Asunto desconocido";
    const asuntoCompleto = `Web RAS - ${asunto === "6" && asuntoPers ? asuntoPers : asuntoTexto}`;

    // 3. Configuración dinámica de Correos (Adaptable a futuros dominios)
    const DESTINATION_EMAIL = process.env.CONTACT_EMAIL || "ras.fiuady@gmail.com";
    // Nota: Hasta tener un dominio propio verificado en Resend, los correos deben enviarse desde onboarding@resend.dev
    const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev"; 

    // 4. Envío de Correo mediante la API REST de Resend (Compatible con Cloudflare Workers)
    const resendReq = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: `Contacto Web RAS <${SENDER_EMAIL}>`,
        to: [DESTINATION_EMAIL],
        reply_to: email, // Permite responder directamente al usuario desde Gmail
        subject: asuntoCompleto,
        text: `NUEVO MENSAJE DESDE LA PLATAFORMA WEB\n\nNombre: ${nombre}\nCorreo: ${email}\nAsunto: ${asuntoCompleto}\n\nMensaje:\n${mensaje}\n\n------------------------\nEnviado el ${new Date().toLocaleString('es-MX')}`,
      })
    });

    if (!resendReq.ok) {
      const errorData = await resendReq.json();
      throw new Error(errorData.message || "Error en la API de Resend");
    }

    return NextResponse.json({ exito: true, mensaje: "¡Mensaje enviado con éxito! Gracias por contactarnos." });
    
  } catch (error: any) {
    console.error("Error enviando correo:", error.message);
    return NextResponse.json(
      { exito: false, mensaje: "Error de conexión temporal. Intenta de nuevo más tarde o contáctanos por nuestras redes." },
      { status: 500 }
    );
  }
}